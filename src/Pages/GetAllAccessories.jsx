import React, { useEffect, useState } from "react";
import { useAdminStore } from "../store/useAdminStore"; 
import { axiosInstance } from "../Axios/axiosinc";

const GetAllAccessories = () => {
  const { getAllAcc, restockAcc, updateacc } = useAdminStore();
  const [accessories, setAccessories] = useState([]);
  const [filteredAcc, setFilteredAcc] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  // Selected accessory for update
  const [selectedAcc, setSelectedAcc] = useState(null);

  // Form data for update
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    imageUrl: "",
    inStock: true,
    quantityInStock: 1,
  });

  // Image file preview
  const [imageFile, setImageFile] = useState(null);

  // ---- Handlers ----
  const handleUpdateAcc = (acc) => {
    setSelectedAcc(acc);
    setFormData({
      name: acc.name || "",
      price: acc.price || "",
      category: acc.category || "",
      description: acc.description || "",
      imageUrl: acc.imageUrl || "",
      inStock: acc.inStock,
      quantityInStock: acc.quantityInStock || 1,
    });
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        quantityInStock: Number(formData.quantityInStock),
      };
      const response = await updateacc(selectedAcc, payload);

      setFilteredAcc((prev) =>
        prev.map((a) => (a._id === selectedAcc._id ? { ...a, ...formData } : a))
      );
      setAccessories((prev) =>
        prev.map((a) => (a._id === selectedAcc._id ? { ...a, ...formData } : a))
      );

      alert("Accessory updated successfully!");
      setSelectedAcc(null);
      setImageFile(null);
    } catch (error) {
      alert(error.response?.data?.message || "Unable to update accessory");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setFormData({ ...formData, imageUrl: URL.createObjectURL(file) });
    }
  };

  const handleRestockAcc = async (acc) => {
    const qty = prompt("Enter quantity to restock:", "0");
    if (qty === null) return;
    const quantity = Number(qty);
    if (isNaN(quantity) || quantity < 0) return;

    try {
      const response = await restockAcc(acc, quantity);
      setFilteredAcc((prev) =>
        prev.map((a) => (a._id === acc._id ? response : a))
      );
      setAccessories((prev) =>
        prev.map((a) => (a._id === acc._id ? response : a))
      );
      
    } catch (error) {
      alert(error.response?.data?.message || "Unable to restock");
    }
  };

  const handleDeleteAcc = async (acc) => {
    try {
      await axiosInstance.delete(`/accessory/delete/${acc._id}`);
      setFilteredAcc((prev) => prev.filter((a) => a._id !== acc._id));
      setAccessories((prev) => prev.filter((a) => a._id !== acc._id));
      alert("Accessory deleted successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to delete");
    }
  };

  // ---- Fetch data ----
  useEffect(() => {
    const fetchAcc = async () => {
      try {
        const data = await getAllAcc();
        setAccessories(data || []);
      } catch (err) {
        console.error("Error fetching accessories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAcc();
  }, [getAllAcc]);

  // ---- Filter ----
  const handleFilter = (category) => {
    if (activeCategory === category) {
      setActiveCategory(null);
      setFilteredAcc([]);
    } else {
      setActiveCategory(category);
      if (category === "all") {
        setFilteredAcc(accessories);
      } else {
        setFilteredAcc(
          accessories.filter((acc) => acc.category?.toLowerCase() === category)
        );
      }
    }
  };

  // Category Buttons
  const categories = [
    { key: "dog", label: "🐶 Dog" },
    { key: "cat", label: "🐱 Cat" },
    { key: "rabbit", label: "🐇 Rabbit" },
    { key: "fish", label: "🐠 Fish" },
    { key: "guinea pig", label: "🐹 Guinea Pig" },
    { key: "all", label: "🌍 All" },
  ];

  return (
    <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
      <h1 className="text-3xl font-bold text-[var(--c5)] mb-6">All Accessories</h1>

      {/* Filter Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => handleFilter(cat.key)}
            className={`flex flex-col items-center justify-center p-6 rounded-xl text-lg font-semibold transition shadow-md
              ${
                activeCategory === cat.key
                  ? "bg-[var(--c2)] text-[var(--c5)] scale-105"
                  : "bg-[var(--c1)] text-white hover:bg-[var(--c4)]"
              }`}
          >
            <span className="text-3xl mb-2">{cat.label.split(" ")[0]}</span>
            <span>{cat.label.split(" ").slice(1).join(" ")}</span>
          </button>
        ))}
      </div>

      {/* Accessories Grid */}
      {loading ? (
        <p className="text-gray-600">Loading accessories...</p>
      ) : activeCategory === null ? (
        <p className="text-gray-600">👉 Select a category to view accessories.</p>
      ) : filteredAcc.length === 0 ? (
        <p className="text-gray-600">No accessories found in this category.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAcc.map((acc) => (
            <div
              key={acc._id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col hover:shadow-lg transition"
            >
              <img
                src={acc.imageUrl}
                alt={acc.name}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h2 className="text-xl font-semibold text-[var(--c3)] mb-1">
                {acc.name}
              </h2>

              <div className="text-gray-700 text-sm space-y-1">
                <p><span className="font-medium">ID:</span> {acc._id}</p>
                <p><span className="font-medium">Price:</span> ₹{acc.price}</p>
                <p><span className="font-medium">Category:</span> {acc.category}</p>
                <p>
                  <span className="font-medium">Availability:</span>{" "}
                  <span
                    className={`font-semibold ${
                      acc.inStock ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {acc.inStock ? "Available" : "Unavailable"}
                  </span>
                </p>
                <p><span className="font-medium">Stock:</span> {acc.quantityInStock}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-auto">
                <button
                  className="flex-1 py-2 bg-[var(--c1)] text-white rounded-lg hover:bg-yellow-500 transition"
                  onClick={() => handleUpdateAcc(acc)}
                >
                  Update
                </button>
                <button
                  className="flex-1 py-2 bg-[var(--c1)] text-white rounded-lg hover:bg-blue-600 transition"
                  onClick={() => handleRestockAcc(acc)}
                >
                  Restock
                </button>
                <button
                  className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  onClick={() => handleDeleteAcc(acc)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {selectedAcc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="relative w-full max-w-3xl h-full sm:h-auto flex justify-center items-start sm:items-center overflow-auto">
            <form
              onSubmit={handleSubmitUpdate}
              className="bg-white shadow-xl rounded-2xl p-4 sm:p-8 space-y-6 sm:space-y-8 w-full max-h-[90vh] overflow-auto border-t-8 border-[var(--c2)] relative"
            >
              {/* Close */}
              <button
                type="button"
                onClick={() => setSelectedAcc(null)}
                className="absolute top-4 right-4 text-[var(--c3)] hover:text-[var(--c2)] transition text-2xl font-bold"
              >
                &times;
              </button>

              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--c5)] mb-4 text-center">
                🎁 Update Accessory
              </h2>

              {/* Name */}
              <div>
                <label className="block mb-1 font-semibold text-[var(--c3)]">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-[var(--c1)] rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-[var(--c2)] shadow-sm"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label className="block mb-1 font-semibold text-[var(--c3)]">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  className="w-full border border-[var(--c1)] rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-[var(--c2)] shadow-sm"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block mb-1 font-semibold text-[var(--c3)]">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-[var(--c1)] rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-[var(--c2)] shadow-sm"
                  required
                />
              </div>

              {/* Image */}
              <div>
                <label className="block mb-1 font-semibold text-[var(--c3)]">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  id="imageUpload"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="imageUpload"
                  className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 border-2 border-dashed border-[var(--c2)] rounded-lg cursor-pointer text-[var(--c2)] hover:bg-[var(--c2)] hover:text-[var(--c5)] transition"
                >
                  <span className="text-3xl sm:text-4xl font-bold">+</span>
                </label>
                {formData.imageUrl && (
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="mt-2 sm:mt-4 h-40 sm:h-48 w-full object-cover rounded-lg shadow-md border border-[var(--c2)]"
                  />
                )}
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-[var(--c1)] shadow-sm">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleChange}
                  className="accent-[var(--c2)]"
                />
                <label className="font-semibold text-[var(--c3)]">In Stock</label>
              </div>

              {/* Category */}
              <div>
                <label className="block mb-2 font-semibold text-[var(--c3)] text-lg">Category</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                  {categories.filter(c => c.key !== "all").map((cat) => (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() =>
                        handleChange({ target: { name: "category", value: cat.key } })
                      }
                      className={`flex flex-col items-center justify-center p-3 sm:p-6 rounded-xl text-lg font-semibold transition shadow-md
                        ${
                          formData.category === cat.key
                            ? "bg-[var(--c2)] text-[var(--c5)] scale-105"
                            : "bg-[var(--c1)] text-white hover:bg-[var(--c4)]"
                        }`}
                    >
                      <span className="text-2xl sm:text-3xl mb-1">{cat.label.split(" ")[0]}</span>
                      <span className="text-sm sm:text-base">{cat.label.split(" ").slice(1).join(" ")}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block mb-1 font-semibold text-[var(--c3)]">Quantity in Stock</label>
                <input
                  type="number"
                  name="quantityInStock"
                  value={formData.quantityInStock}
                  onChange={handleChange}
                  min="1"
                  className="w-full border border-[var(--c1)] rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-[var(--c2)] shadow-sm"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-2">
                <button
                  type="button"
                  className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400 w-full sm:w-auto"
                  onClick={() => setSelectedAcc(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-[var(--c2)] text-[var(--c5)] rounded hover:bg-[var(--c4)] w-full sm:w-auto"
                >
                  Update Accessory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetAllAccessories;
