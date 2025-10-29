import React, { useEffect, useState } from 'react'
import { useOrderStore } from '../Store/useOrderStore'

const Adminorders = () => {


    const [orders,setorders]=useState([]);
    const [loading,setLoading]=useState(true);
    const [search,setsearch]=useState("")
    const [searching, setSearching] = useState(false);
    const {getallorder,update,deleteorder,find}=useOrderStore();

    useEffect(() => {
    fetchorders();
  }, []);

        const fetchorders=async()=>{
            try{
                const res=await getallorder();
                setorders(res.data)
            }
            catch(error){
                alert(error.response?.data?.message);
            }
            finally{
                setLoading(false);
            }
        };


   const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) {
      alert("Please enter a name or email");
      return;
    }
    setSearching(true);
    try{
        const res=await find(search);
        setorders(res.data);
        alert ("search results loaded")
    }
    catch (error){
        alert(error.response?.data?.message || "No matching orders found")
    }
    finally{
        setSearching(false);
    }
};

const resetSearch = () => {
    setsearch("");
    fetchorders();
};

    const handleupdate=async(Id,newStatus)=>{
        try{
            await update(Id,newStatus);
            alert("order status updated")
        
        setorders((prev) =>
        prev.map((o) => (o._id === Id ? { ...o, orderStatus: newStatus } : o))
      );
    }
        catch(error){
            alert(error.response?.data?.message);
        }
    };

    const handledelete=async(id)=>{
        if(!window.confirm("Are you sure you want to delete this order?")) return;
        try{
            await deleteorder(id);
            alert("order deleted successfully");
            setorders((prev) => prev.filter((o) => o._id !== id));
        }
        catch(error){
            alert(error.response?.data?.message || "Delete failed");
        }
    }



if (loading) return <div className="text-center mt-10">Loading orders...</div>;
   return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-[var(--c1)]">All Orders</h2>

    <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          placeholder="Search by customer name or email"
          className="flex-1 border rounded-lg p-2"
        />
        <button
          type="submit"
          disabled={searching}
          className="bg-[var(--c1)] text-white px-4 py-2 rounded-lg hover:bg-[var(--c2)]"
        >
          {searching ? "Searching..." : "Search"}
        </button>
        {search && (
          <button
            type="button"
            onClick={resetSearch}
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Reset
          </button>
        )}
      </form>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-semibold text-lg mb-2 text-[var(--c1)]">
                  Order ID: {order._id}
                </h3>
                <p>
                  <strong>Customer:</strong> {order.customer?.name} (
                  {order.customer?.email})
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="capitalize">{order.orderStatus}</span>
                </p>
                <p>
                  <strong>Total Items:</strong> {order.orderItems?.length}
                </p>
                <p>
                    <strong>Payment Method:</strong>{order.paymentMethod}
                </p>
                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>

                <div className="mt-3">
                  <h4 className="font-semibold mb-1">Items:</h4>
                  <ul className="list-disc ml-4 text-sm">
                    {order.orderItems?.map((item, idx) => (
                      <li key={idx}>
                        {item.item?.name || "Unknown"} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-4 flex justify-between items-center">
                {/* Update Dropdown */}
                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    handleupdate(order._id, e.target.value)
                  }
                  className="border p-2 rounded-lg text-sm"
                >
                  <option value="processing">Processing</option>
                  <option value="verified">Verified</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                {/* Delete Button */}
                <button
                  onClick={() => handledelete(order._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Adminorders