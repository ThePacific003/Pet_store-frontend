import React, { useState } from "react";
import { useAdminStore } from "../store/useAdminStore"; // adjust path

const CreateBreed = () => {
  const { createBreed } = useAdminStore();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    purchaseBudget: "",
    monthlyBudget: "",
    experienceLevel: "",
    livingSpaceNeeds: "",
    isHypoAllergenic: false,
    suitableForVegetarians: false,
    goodWithChildren: false,
    goodWithOtherPets: false,
    prefersIndoorPet: false,
    tankSizeRequired: "",
    waterType: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBreed(formData);
      alert("Breed profile created successfully!");
      setFormData({
        name: "",
        category: "",
        purchaseBudget: "",
        monthlyBudget: "",
        experienceLevel: "",
        livingSpaceNeeds: "",
        isHypoAllergenic: false,
        suitableForVegetarians: false,
        goodWithChildren: false,
        goodWithOtherPets: false,
        prefersIndoorPet: false,
        tankSizeRequired: "",
        waterType: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Error creating breed");
    }
  };

  return (
    <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
      <h1 className="text-4xl font-extrabold text-[var(--c5)] mb-8 text-center">
        🐾 Create Breed Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 space-y-6 max-w-3xl mx-auto border-t-8 border-[var(--c2)]"
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

        {/* Category */}
        <div>
          <label className="block mb-2 font-semibold text-[var(--c3)]">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-[var(--c1)] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[var(--c2)] shadow-sm"
            required
          >
            <option value="">Select category</option>
            {["dog", "cat", "rabbit", "fish", "guinea pig"].map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Purchase Budget */}
        <div>
          <label className="block mb-2 font-semibold text-[var(--c3)]">Purchase Budget</label>
          <select
            name="purchaseBudget"
            value={formData.purchaseBudget}
            onChange={handleChange}
            className="w-full border border-[var(--c1)] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[var(--c2)] shadow-sm"
            required
          >
            <option value="">Select budget</option>
            {["low", "medium", "high"].map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Monthly Budget */}
        <div>
          <label className="block mb-2 font-semibold text-[var(--c3)]">Monthly Budget</label>
          <select
            name="monthlyBudget"
            value={formData.monthlyBudget}
            onChange={handleChange}
            className="w-full border border-[var(--c1)] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[var(--c2)] shadow-sm"
            required
          >
            <option value="">Select budget</option>
            {["low", "medium", "high"].map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block mb-2 font-semibold text-[var(--c3)]">Experience Level</label>
          <select
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            className="w-full border border-[var(--c1)] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[var(--c2)] shadow-sm"
            required
          >
            <option value="">Select experience</option>
            {["beginner", "intermediate", "expert"].map((lvl) => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>
        </div>

        {/* Living Space Needs */}
        <div>
          <label className="block mb-2 font-semibold text-[var(--c3)]">Living Space Needs</label>
          <select
            name="livingSpaceNeeds"
            value={formData.livingSpaceNeeds}
            onChange={handleChange}
            className="w-full border border-[var(--c1)] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[var(--c2)] shadow-sm"
            required
          >
            <option value="">Select space</option>
            {["apartment", "smallHouse", "largeHouse", "farm"].map((space) => (
              <option key={space} value={space}>{space}</option>
            ))}
          </select>
        </div>

        {/* Boolean Traits */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "isHypoAllergenic", label: "Hypoallergenic" },
            { name: "suitableForVegetarians", label: "Suitable for Vegetarians" },
            { name: "goodWithChildren", label: "Good with Children" },
            { name: "goodWithOtherPets", label: "Good with Other Pets" },
            { name: "prefersIndoorPet", label: "Prefers Indoor Pet" },
          ].map((trait) => (
            <label key={trait.name} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-[var(--c1)] shadow-sm">
              <input
                type="checkbox"
                name={trait.name}
                checked={formData[trait.name]}
                onChange={handleChange}
                className="accent-[var(--c2)]"
              />
              {trait.label}
            </label>
          ))}
        </div>

        {/* Fish-specific fields */}
        {formData.category === "fish" && (
          <>
            <div>
              <label className="block mb-2 font-semibold text-[var(--c3)]">Tank Size Required</label>
              <input
                type="text"
                name="tankSizeRequired"
                value={formData.tankSizeRequired}
                onChange={handleChange}
                className="w-full border border-[var(--c1)] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[var(--c2)] shadow-sm"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-[var(--c3)]">Water Type</label>
              <select
                name="waterType"
                value={formData.waterType}
                onChange={handleChange}
                className="w-full border border-[var(--c1)] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[var(--c2)] shadow-sm"
              >
                <option value="">Select water type</option>
                {["freshwater", "saltwater"].map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-[var(--c2)] text-[var(--c5)] font-extrabold text-lg shadow-md hover:bg-[var(--c4)] hover:text-white transition"
        >
          🐾 Create Breed Profile
        </button>
      </form>
    </div>
  );
};

export default CreateBreed;
