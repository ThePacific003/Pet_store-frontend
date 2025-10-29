import React, { useState } from "react";
import { useAdminStore } from "../store/useAdminStore"; // adjust path

const CreateAccessory = () => {
  const { createAccessory } = useAdminStore();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    imageUrl: "",
    inStock: false,
    quantityInStock: 0,
  });

  const [imageFile, setImageFile] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle image upload (preview only for now)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setFormData({ ...formData, imageUrl: URL.createObjectURL(file) });
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
      name: formData.name,
      price: Number(formData.price), // convert to number
      category: formData.category,   // must match enum
      description: formData.description,
      imageUrl: formData.imageUrl || "",
      inStock: formData.inStock ?? true, // default true
      quantityInStock:formData.quantityInStock
    };
    console.log(payload);
    
      await createAccessory(payload);
      alert("Accessory created successfully!");

      // Reset form
      setFormData({
        name: "",
        price: "",
        category: "",
        description: "",
        imageUrl: "",
        inStock: false,
        quantityInStock: 0,
      });
      setImageFile(null);
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
      <h1 className="text-4xl font-extrabold text-[var(--c5)] mb-8 text-center">
        🎁 Create Accessory
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 space-y-8 max-w-3xl mx-auto border-t-8 border-[var(--c2)]"
      >
        {/* Name */}
        <div>
          <label className="block mb-2 font-semibold text-[var(--c3)]">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-[var(--c1)] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[var(--c2)] shadow-sm"
            required
          />
        </div>

        {/* Category (enum from schema) */}
        <div>
          <label className="block mb-3 font-semibold text-[var(--c3)] text-lg">Category</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { key: "dog", label: "🐶 Dog" },
              { key: "cat", label: "🐱 Cat" },
              { key: "rabbit", label: "🐇 Rabbit" },
              { key: "fish", label: "🐠 Fish" },
              { key: "guinea pig", label: "🐹 Guinea Pig" },
            ].map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() =>
                  handleChange({ target: { name: "category", value: cat.key } })
                }
                className={`flex flex-col items-center justify-center p-6 rounded-xl text-lg font-semibold transition shadow-md
                  ${
                    formData.category === cat.key
                      ? "bg-[var(--c2)] text-[var(--c5)] scale-105"
                      : "bg-[var(--c1)] text-white hover:bg-[var(--c4)]"
                  }`}
              >
                <span className="text-3xl mb-2">{cat.label.split(" ")[0]}</span>
                <span>{cat.label.split(" ").slice(1).join(" ")}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-semibold text-[var(--c3)]">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-[var(--c1)] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[var(--c2)] shadow-sm"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-semibold text-[var(--c3)]">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-[var(--c1)] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[var(--c2)] shadow-sm"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 font-semibold text-[var(--c3)]">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            id="imageUpload"
            onChange={handleImageUpload}
            className="hidden"
          />
          <label
            htmlFor="imageUpload"
            className="flex items-center justify-center w-24 h-24 border-2 border-dashed border-[var(--c2)] rounded-lg cursor-pointer text-[var(--c2)] hover:bg-[var(--c2)] hover:text-[var(--c5)] transition"
          >
            <span className="text-4xl font-bold">+</span>
          </label>
          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt="Preview"
              className="mt-4 h-48 w-full object-cover rounded-lg shadow-md border border-[var(--c2)]"
            />
          )}
        </div>

        {/* In Stock */}
        <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg border border-[var(--c1)] shadow-sm">
          <input
            type="checkbox"
            name="inStock"
            checked={formData.inStock}
            onChange={handleChange}
            className="accent-[var(--c2)]"
          />
          <label className="font-semibold text-[var(--c3)]">In Stock</label>
        </div>

        {/* Quantity in Stock */}
        <div>
          <label className="block mb-2 font-semibold text-[var(--c3)]">Quantity in Stock</label>
          <input
            type="number"
            name="quantityInStock"
            value={formData.quantityInStock}
            onChange={handleChange}
            min="0"
            className="w-full border border-[var(--c1)] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[var(--c2)] shadow-sm"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-[var(--c2)] text-[var(--c5)] font-extrabold text-lg shadow-md hover:bg-[var(--c4)] hover:text-white transition"
        >
          🎉 Create Accessory
        </button>
      </form>
    </div>
  );
};

export default CreateAccessory;
