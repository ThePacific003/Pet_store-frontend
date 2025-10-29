import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../Axios/axiosinc.js";
import { useProductStore } from "../Store/useProductStore.jsx";
import { useOrderStore } from "../Store/useOrderStore.jsx";
import { usePaymentStore } from "../Store/usePaymentStore.jsx";
/**
 * SHOP PAGE BEHAVIOR
 * 1) Initial: shows "Most Bought" and "Relatable" products (no selection yet)
 * 2) Step 1: choose Main Category => Pets | Accessories
 * 3) Step 2: choose Pet Type => Dogs | Cats | Rabbit | Fish | Guinea Pig
 * 4) Grid updates accordingly; user can Add to Cart
 * 5) Cart drawer collects shipping + payment + places order (POST /orders)
 */

// Ensure the brand colors are available as CSS variables on :root
const ensureBrandVars = () => {
  if (typeof document === "undefined") return;
  const r = document.documentElement;
  const pairs = [
    ["--c1", "#515A47"],
    ["--c2", "#D7BE82"],
    ["--c3", "#7A4419"],
    ["--c4", "#755C1B"],
    ["--c5", "#400406"],
  ];
  for (const [k, v] of pairs) r.style.setProperty(k, v);
};

const MAIN_CHOICES = [
  { key: "Pet", label: "Pets" },
  { key: "Accessory", label: "Accessories" },
];

const PET_TYPES = [
  { key: "Dog", label: "Dogs 🐶" },
  { key: "Cat", label: "Cats 🐱" },
  { key: "Rabbit", label: "Rabbits 🐇" },
  { key: "Fish", label: "Fishes 🐠" },
  { key: "guinea pig", label: "Guinea Pigs 🐹" },
];

const currency = (n) => new Intl.NumberFormat("en-NP", { style: "currency", currency: "NPR", maximumFractionDigits: 0 }).format(n || 0);

export default function ShopPage() {
  const { order, getmyorder ,cancelmyorder} = useOrderStore();
  const { initiation } = usePaymentStore();
  const [mainChoice, setMainChoice] = useState(null); // "Pet" | "Accessory" | null
  const [petType, setPetType] = useState(null); // one of PET_TYPES.key | null

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  // home sections
  const [mostBought, setMostBought] = useState([]);
  const [relatable, setRelatable] = useState([]);

  // cart
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]); // { _id, name, price, image, itemType, quantity }

  // Checkout form
  const [shipping, setShipping] = useState({ country: "Nepal", city: "Kathmandu", postalCode: "44600" });
  const [paymentMethod, setPaymentMethod] = useState("CashOnDelivery"); // 'esewa' | 'khalti' | 'CashOnDelivery'

  const { createOrder, creatingOrder } = useProductStore();

  const [myOrders, setMyOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);


  useEffect(() => {
    ensureBrandVars();
  }, []);

  // Initial sections
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        // You can adjust these endpoints to match your backend
        const [mbRes, relRes] = await Promise.all([
          axiosInstance.get("/products/most-bought"),
          axiosInstance.get("/products/relatable").catch(() => ({ data: [] })),
        ]);
        setMostBought(mbRes.data || []);
        setRelatable(relRes.data || []);
      } catch (e) {
        console.error(e);
        toast.error("Failed to load homepage products");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // Fetch products when both mainChoice and petType are selected
  useEffect(() => {
    const fetchBySelection = async () => {
      if (!mainChoice || !petType) return;
      try {
        setLoading(true);

        // Unified query: /products?itemType=Pet|Accessory&petType=Dog|Cat|...
        // const url = `/products/?itemType=${encodeURIComponent(mainChoice)}&petType=${encodeURIComponent(petType)}`;

        const res = await createOrder(mainChoice, petType);
        setProducts(res || []);
      } catch (e) {
        console.error(e);
        toast.error("Could not fetch products for selection");
      } finally {
        setLoading(false);
      }
    };
    fetchBySelection();
  }, [mainChoice, petType]);

  const fetchMyOrders = async () => {
    try {
      const res = await getmyorder();
      setMyOrders(res.data);
      setShowOrders(true);
    }
    catch (error) {
      alert(error.response?.data?.message || "Failed to fetch orders")
    }
  };

  const cancel=async(id)=>{
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try{
      await cancelmyorder(id);
      setMyOrders((prev) =>
      prev.map((o) =>
        o._id === id ? { ...o, orderStatus: "cancelled" } : o
      )
    );

    setTimeout(() => {
      setMyOrders((prev) => prev.filter((o) => o._id !== id));
      console.log(`🕒 Order ${id} removed after 10 minutes`);
    }, 10 * 60 * 1000);
    }
    catch(error){
      alert(error.response?.data?.message || "Failed to fetch orders")
    }
  }

  const handleAddToCart = (p) => {
    setCart((prev) => {
      const idx = prev.findIndex((x) => x._id === p._id && x.itemType === (p.itemType || mainChoice));
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: Math.min(copy[idx].quantity + 1, 10) };
        return copy;
      }
      return [
        ...prev,
        {
          _id: p._id,
          name: p.name,
          price: p.price,
          image: p.image,
          itemType: p.itemType || (p.breed ? "Pet" : "Accessory") || mainChoice,
          quantity: 1,
        },
      ];
    });
    setCartOpen(true);
    toast.success("Added to cart");
  };

  const subtotal = useMemo(() => cart.reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0), [cart]);

  const updateQty = (id, itemType, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i._id === id && i.itemType === itemType ? { ...i, quantity: Math.max(1, Math.min(10, (i.quantity || 1) + delta)) } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const removeFromCart = (id, itemType) => setCart((prev) => prev.filter((i) => !(i._id === id && i.itemType === itemType)));

  const placeOrder = async () => {
    if (!cart.length) return toast.error("Your cart is empty");

    const payload = {
      orderItems: cart.map((i) => ({
        itemType: i.itemType, // "Pet" | "Accessory"
        item: i._id,
        quantity: i.quantity,
        price: i.price,
      })),
      totalAmount: subtotal,
      shippingAddress: shipping, // { country, city, postalCode }
      paymentMethod,
    };
    console.log(payload);


    try {
      if (paymentMethod !== 'esewa') {
        await order(payload);
        toast.success("Order placed successfully");
        setCart([]);
        setCartOpen(false);
        return;
      }


      // 1) create order (server-side should set order.paymentMethod='esewa' and status='pending')
      const orderRes = await order(payload);
      const orders = orderRes.data;


      //2) init esewa
      const initRes = await initiation(orders);
      const { uatAction: action, params } = initRes.data;



      //create and submit a hidden form to esewa
      const form = document.createElement("form");
      form.method = "POST";
      form.action = action;
      Object.entries(params).forEach(([name, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = String(value).trim();
        form.appendChild(input);
      });
      document.body.appendChild(form);
      form.submit();

    } catch (e) {
      console.error(e);
      const msg = e?.response?.data?.message || "Failed to place order";
      alert(msg);
    }
  };

  return (
    <div style={{ background: "var(--c1)", minHeight: "100vh" }} className="text-white ">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-4 pt-6 pb-4 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight">🐾 Shop</h1>
        <div className="flex items-center gap-3">
          {/* Cart Button */}
          <button
            onClick={() => setCartOpen((s) => !s)}
            className="rounded-2xl px-4 py-2 font-semibold"
            style={{ background: "var(--c2)", color: "var(--c5)" }}
          >
            Cart ({cart.length})
          </button>

          {/* To Receive Button */}
          <button
            onClick={fetchMyOrders} // 👈 make sure this function is defined
            className="rounded-2xl px-4 py-2 font-semibold"
            style={{ background: "var(--c2)", color: "var(--c5)" }}
          >
            To Receive
          </button>
        </div>


      </header>

      {/* Step 1: Main Choice */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="flex gap-3 flex-wrap">
          {MAIN_CHOICES.map((c) => {
            const active = c.key === mainChoice;
            return (
              <button
                key={c.key}
                onClick={() => {
                  setMainChoice(c.key);
                  setPetType(null); // force step 2 each time main changes
                  setProducts([]);
                }}
                className="rounded-2xl px-5 py-2 font-semibold border"
                style={{
                  background: active ? "var(--c2)" : "transparent",
                  color: active ? "var(--c5)" : "#fff",
                  borderColor: "var(--c2)",
                }}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Step 2: Pet Type (only after choosing main) */}
      {mainChoice && (
        <section className="max-w-6xl mx-auto px-4 mt-4">
          <p className="opacity-90 mb-2">
            {mainChoice === "Pet" ? "Select the pet you want" : "Select the pet to see its accessories"}
          </p>
          <div className="flex gap-2 flex-wrap">
            {PET_TYPES.map((t) => {
              const active = t.key === petType;
              return (
                <button
                  key={t.key}
                  onClick={() => setPetType(t.key)}
                  className="rounded-xl px-4 py-2 border"
                  style={{
                    background: active ? "var(--c3)" : "transparent",
                    color: active ? "#fff" : "#fff",
                    borderColor: "var(--c3)",
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">

        {!mainChoice && !petType && (
          <div className="space-y-8">
            <Section title="Most Bought" note="Popular right now">
              <ProductGrid products={mostBought} loading={loading} onAdd={handleAddToCart} />
            </Section>
            <Section title="You Might Like" note="Relatable picks for you">
              <ProductGrid products={relatable} loading={loading} onAdd={handleAddToCart} />
            </Section>
          </div>
        )}

        {mainChoice && petType && (
          <Section
            title={`${MAIN_CHOICES.find((m) => m.key === mainChoice)?.label} / ${PET_TYPES.find((p) => p.key === petType)?.label
              }`}
            note={mainChoice === "Pet" ? "Available pets" : "Accessories for this pet"}
          >
            <ProductGrid
              products={products}
              loading={loading}
              onAdd={handleAddToCart}
              fallbackMsg="No items found for this selection"
            />
          </Section>
        )}



      </main>

      {/* Cart Drawer */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        updateQty={updateQty}
        removeItem={removeFromCart}
        subtotal={subtotal}
        shipping={shipping}
        setShipping={setShipping}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        onPlaceOrder={placeOrder}
      />


      <OrderDrawer
  open={showOrders}
  onClose={() => setShowOrders(false)}
  orders={myOrders}
  onCancel={cancel}
/>

    </div>
  );
}

function Section({ title, note, children }) {
  return (
    <section>
      <div className="flex items-end justify-between mb-3">
        <h2 className="text-2xl font-bold">{title}</h2>
        {note && <span className="text-sm opacity-80">{note}</span>}
      </div>
      {children}
    </section>
  );
}


function ProductGrid({ products, loading, onAdd, fallbackMsg = "Nothing to show" }) {
  if (loading) return <SkeletonGrid />;
  if (!products?.length) return <EmptyState message={fallbackMsg} />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {products.map((p) => {
        const isPet = p.breed !== undefined; // auto-detect type

        return (
          <article
            key={p._id}
            className="rounded-2xl overflow-hidden border shadow-sm"
            style={{ borderColor: "var(--c2)", background: "rgba(255,255,255,0.06)" }}
          >
            <img
              src={p.imageUrl || p.image}
              alt={isPet ? p.breed : p.name}
              className="w-full h-44 object-cover"
            />
            <div className="p-4 space-y-1">
              {isPet ? (
                <>
                  <h3 className="text-lg font-semibold">{p.breed}</h3>
                  <p className="text-sm opacity-90 line-clamp-2">{p.description}</p>
                  <p className="text-sm opacity-80">Category: {p.category}</p>
                  <p className="text-sm opacity-80">Age: {p.age} yrs</p>
                  <p className="text-sm opacity-80">Gender: {p.gender}</p>
                  <div className="flex justify-between mt-2 items-center">
                    <p className="font-bold">{currency(p.price)}</p>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${p.availability ? "bg-green-600" : "bg-red-600"
                        }`}
                    >
                      {p.availability ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  <button
                    onClick={() => onAdd(p)}
                    disabled={!p.availability}
                    className={`w-full mt-3 rounded-xl px-4 py-2 font-semibold ${p.availability
                        ? "bg-[var(--c4)] text-white"
                        : "bg-gray-500 text-gray-200 cursor-not-allowed"
                      }`}
                  >
                    {p.availability ? "Add to Cart" : "Unavailable"}
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <p className="text-sm opacity-90 line-clamp-2">{p.description}</p>
                  <p className="text-sm opacity-80">Category: {p.category}</p>
                  <div className="flex justify-between mt-2 items-center">
                    <p className="font-bold">{currency(p.price)}</p>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${p.inStock ? "bg-green-600" : "bg-red-600"
                        }`}
                    >
                      {p.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  <button
                    onClick={() => onAdd(p)}
                    disabled={!p.inStock}
                    className={`w-full mt-3 rounded-xl px-4 py-2 font-semibold ${p.inStock
                        ? "bg-[var(--c4)] text-white"
                        : "bg-gray-500 text-gray-200 cursor-not-allowed"
                      }`}
                  >
                    {p.inStock ? "Add to Cart" : "Unavailable"}
                  </button>
                </>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}


function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden border animate-pulse" style={{ borderColor: "var(--c2)", background: "rgba(255,255,255,0.06)" }}>
          <div className="w-full h-44" style={{ background: "rgba(255,255,255,0.1)" }} />
          <div className="p-4 space-y-2">
            <div className="h-4 w-2/3" style={{ background: "rgba(255,255,255,0.15)" }} />
            <div className="h-3 w-1/2" style={{ background: "rgba(255,255,255,0.12)" }} />
            <div className="h-5 w-1/3 mt-2" style={{ background: "rgba(255,255,255,0.18)" }} />
            <div className="h-9 w-full mt-3 rounded-xl" style={{ background: "rgba(255,255,255,0.16)" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="rounded-2xl p-8 border text-center" style={{ borderColor: "var(--c2)", background: "rgba(255,255,255,0.04)" }}>
      <p className="opacity-90">{message}</p>
    </div>
  );
}

function CartDrawer({ open, onClose, items, updateQty, removeItem, subtotal, shipping, setShipping, paymentMethod, setPaymentMethod, onPlaceOrder }) {
  return (
    <div
      className=" fixed inset-0 pointer-events-none "
      style={{ display: open ? "block" : "none" }}
      aria-hidden={!open}
    >
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.4)" }} onClick={onClose} />
      {/* <aside
        className="absolute right-0 top-0 h-full w-full sm:w-[420px] pointer-events-auto flex flex-col"
        style={{ background: "#fff", color: "#111" }}
      > */}
      <aside
        className="absolute right-0 top-[90px] h-[calc(100%-64px)] w-full sm:w-[420px] pointer-events-auto flex flex-col"
        style={{ background: "#fff", color: "#111" }}
      >

        <header className="p-4 border-b flex items-center justify-between" style={{ borderColor: "#eee" }}>
          <h3 className="text-lg font-bold">Your Cart</h3>
          <button onClick={onClose} className="px-3 py-1 rounded-lg" style={{ background: "var(--c2)", color: "var(--c5)" }}>
            Close
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!items.length && <div className="text-sm text-center text-neutral-500">Cart is empty</div>}
          {items.map((i) => (
            <div key={`${i._id}-${i.itemType}`} className="flex gap-3 items-center border rounded-xl p-3" style={{ borderColor: "#eee" }}>
              {i.image ? (
                <img src={i.image} alt={i.name} className="w-16 h-16 object-cover rounded-lg" />
              ) : (
                <div className="w-16 h-16 rounded-lg" style={{ background: "#f3f3f3" }} />
              )}
              <div className="flex-1">
                <div className="font-semibold leading-tight">{i.name}</div>
                <div className="text-xs opacity-70">{i.itemType}</div>
                <div className="font-bold mt-1">{currency(i.price)}</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-2 py-1 rounded-md border" onClick={() => updateQty(i._id, i.itemType, -1)}>-</button>
                <span className="min-w-[2ch] text-center">{i.quantity}</span>
                <button className="px-2 py-1 rounded-md border" onClick={() => updateQty(i._id, i.itemType, +1)}>+</button>
              </div>
              <button className="px-2 py-1 rounded-md border" onClick={() => removeItem(i._id, i.itemType)}>Remove</button>
            </div>
          ))}
        </div>

        <div className="border-t p-4 space-y-4 sticky bottom-0 bg-white" style={{ borderColor: "#eee" }}>
          <div className="flex items-center justify-between text-sm">
            <span>Subtotal</span>
            <strong>{currency(subtotal)}</strong>
          </div>

          {/* Shipping */}
          <div className="space-y-2">
            <h4 className="font-semibold">Shipping Address</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                className="px-3 py-2 rounded-lg border"
                placeholder="Country"
                value={shipping.country}
                onChange={(e) => setShipping((s) => ({ ...s, country: e.target.value }))}
              />
              <input
                className="px-3 py-2 rounded-lg border"
                placeholder="City"
                value={shipping.city}
                onChange={(e) => setShipping((s) => ({ ...s, city: e.target.value }))}
              />
              <input
                className="px-3 py-2 rounded-lg border"
                placeholder="Postal Code"
                value={shipping.postalCode}
                onChange={(e) => setShipping((s) => ({ ...s, postalCode: e.target.value }))}
              />
            </div>
          </div>

          {/* Payment */}
          <div className="space-y-2">
            <h4 className="font-semibold">Payment Method</h4>
            <div className="flex gap-2 flex-wrap">
              {[
                { key: "esewa", label: "eSewa" },
                { key: "khalti", label: "Khalti" },
                { key: "CashOnDelivery", label: "Cash on Delivery" },
              ].map((m) => (
                <label key={m.key} className="flex items-center gap-2 text-sm border rounded-xl px-3 py-2">
                  <input
                    type="radio"
                    name="payment-method"
                    checked={paymentMethod === m.key}
                    onChange={() => setPaymentMethod(m.key)}
                  />
                  {m.label}
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={onPlaceOrder}
            className="w-full rounded-2xl px-4 py-3 font-semibold"
            style={{ background: "var(--c5)", color: "#fff" }}
            disabled={!items.length}
          >
            Place Order
          </button>
        </div>
      </aside>
    </div>
  );
}

function OrderDrawer({ open, onClose, orders, onCancel }) {
  const STATUS_COLORS = {
    Processing: "bg-yellow-500",
    Verified: "bg-blue-500",
    Shipped: "bg-purple-500",
    Delivered: "bg-green-600",
    Cancelled: "bg-red-500",
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ display: open ? "block" : "none" }}>
      <div className="absolute inset-0 bg-black bg-opacity-40" onClick={onClose} />
      <aside
        className="absolute right-0 top-[90px] h-[calc(100%-64px)] w-full sm:w-[460px] pointer-events-auto flex flex-col bg-white text-gray-900 rounded-l-2xl shadow-xl"
      >
        <header className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-bold">My Orders</h3>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg font-semibold"
            style={{ background: "var(--c2)", color: "var(--c5)" }}
          >
            Close
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!orders?.length && (
            <div className="text-center text-gray-500 mt-10">No orders yet</div>
          )}

          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-2xl shadow-sm overflow-hidden"
              style={{ borderColor: "var(--c2)" }}
            >
              {/* Header */}
              <div className="p-3 flex justify-between items-center bg-[var(--c1)] text-white">
                <div>
                  <p className="text-sm">Order #{order._id.slice(-6)}</p>
                  <p className="text-xs opacity-80">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
<span
  className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold text-white ${
    STATUS_COLORS[
      order.orderStatus?.charAt(0).toUpperCase() + order.orderStatus?.slice(1)
    ] || "bg-gray-500"
  }`}
>
  {order.orderStatus
    ? order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)
    : "Unknown"}
</span>

              </div>

              {/* Items */}
              <div className="p-3 space-y-2">
                {order.orderItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-3 items-center border-b pb-2 last:border-none"
                  >
                    <img
                      src={item.item?.image || "/placeholder.jpg"}
                      alt={item.item?.name || "Item"}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.item?.name || item.item?.breed}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-xs text-gray-500">Payment method: {order.paymentMethod}</p>
                      <p className="text-xs text-gray-500">Payment status: {order.paymentStatus}</p>

                    </div>
                    <p className="font-semibold text-sm text-right">Rs. {item.price}</p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-3 py-2 flex justify-between items-center bg-gray-50">
                <p className="text-sm font-semibold">
                  Total: Rs. {order.totalAmount}
                </p>
{["Pending", "Processing"].includes(
  order.orderStatus?.charAt(0).toUpperCase() + order.orderStatus?.slice(1)
) && (
  <button
    onClick={() => onCancel(order._id)}
    className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-md"
  >
    Cancel
  </button>
)}

              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

