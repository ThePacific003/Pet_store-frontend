import React, { useState } from "react";
import { useAdminStore } from "../store/useAdminStore"; // adjust path

const CreatePet = () => {
  const {createPet} = useAdminStore();

  const [formData, setFormData] = useState({
    breed: "",
    age: "",
    gender: "",
    price: "",
    description: "",
    imageUrl: "",   
    availability: true,
    category: "",
    listingType: "",
    quantityInStock: 1,
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

  // Handle image upload
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
      const payload = { ...formData };
      await createPet(payload);
      alert("Pet created successfully!");
      setFormData({
        breed: "",
        age: "",
        gender: "",
        price: "",
        description: "",
        imageUrl: "",
        availability: true,
        category: "",
        listingType: "",
        quantityInStock: 1,
      });
      setImageFile(null);
    } catch (error) {
      alert(error.message?.data?.message);
    }
  };

  return (
   <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
  <h1 className="text-4xl font-extrabold text-[var(--c5)] mb-8 text-center">
    🐾 Create Pet
  </h1>

  <form
    onSubmit={handleSubmit}
    className="bg-white shadow-xl rounded-2xl p-8 space-y-8 max-w-3xl mx-auto border-t-8 border-[var(--c2)]"
  >
    {/* Breed */}
    <div>
      <label className="block mb-2 font-semibold text-[var(--c3)]">Breed</label>
      <input
        type="text"
        name="breed"
        value={formData.breed}
        onChange={handleChange}
        className="w-full border border-[var(--c1)] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[var(--c2)] shadow-sm"
        required
      />
    </div>

    {/* Age */}
    <div>
      <label className="block mb-2 font-semibold text-[var(--c3)]">Age</label>
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        className="w-full border border-[var(--c1)] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[var(--c2)] shadow-sm"
        required
      />
    </div>

    {/* Gender */}
    <div>
      <label className="block mb-2 font-semibold text-[var(--c3)]">Gender</label>
      <div className="flex gap-6">
        {["male", "female"].map((g) => (
          <label
            key={g}
            className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border border-[var(--c1)] hover:bg-[var(--c2)] hover:text-[var(--c5)] transition"
          >
            <input
              type="radio"
              name="gender"
              value={g}
              checked={formData.gender === g}
              onChange={handleChange}
              className="accent-[var(--c2)]"
            />
            <span className="capitalize">{g}</span>
          </label>
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

  {/* Hidden File Input */}
  <input
    type="file"
    accept="image/*"
    id="imageUpload"
    onChange={handleImageUpload}
    className="hidden"
  />

  {/* Custom Upload Button */}
  <label
    htmlFor="imageUpload"
    className="flex items-center justify-center w-24 h-24 border-2 border-dashed border-[var(--c2)] rounded-lg cursor-pointer text-[var(--c2)] hover:bg-[var(--c2)] hover:text-[var(--c5)] transition"
  >
    <span className="text-4xl font-bold">+</span>
  </label>

  {/* Preview */}
  {formData.imageUrl && (
    <img
      src={formData.imageUrl}
      alt="Preview"
      className="mt-4 h-48 w-full object-cover rounded-lg shadow-md border border-[var(--c2)]"
    />
  )}
</div>

    {/* Availability */}
    <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg border border-[var(--c1)] shadow-sm">
      <input
        type="checkbox"
        name="availability"
        checked={formData.availability}
        onChange={handleChange}
        className="accent-[var(--c2)]"
      />
      <label className="font-semibold text-[var(--c3)]">Available</label>
    </div>

    {/* Category */}
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

    {/* Listing Type */}
    <div>
      <label className="block mb-2 font-semibold text-[var(--c3)]">Listing Type</label>
      <div className="flex gap-6">
        {["adoption", "sale"].map((l) => (
          <label
            key={l}
            className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border border-[var(--c1)] hover:bg-[var(--c2)] hover:text-[var(--c5)] transition"
          >
            <input
              type="radio"
              name="listingType"
              value={l}
              checked={formData.listingType === l}
              onChange={handleChange}
              className="accent-[var(--c2)]"
            />
            <span className="capitalize">{l}</span>
          </label>
        ))}
      </div>
    </div>

    {/* Quantity in Stock */}
    <div>
      <label className="block mb-2 font-semibold text-[var(--c3)]">Quantity in Stock</label>
      <input
        type="number"
        name="quantityInStock"
        value={formData.quantityInStock}
        onChange={handleChange}
        min="1"
        className="w-full border border-[var(--c1)] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[var(--c2)] shadow-sm"
      />
    </div>

    {/* Submit */}
    <button
      type="submit"
      className="w-full py-3 rounded-lg bg-[var(--c2)] text-[var(--c5)] font-extrabold text-lg shadow-md hover:bg-[var(--c4)] hover:text-white transition"
    >
      🚀 Create Pet
    </button>
  </form>
</div>

  );
};

export default CreatePet;
