import React, { useEffect, useState } from "react";
import { useAdminStore } from "../store/useAdminStore"; // adjust path
import { axiosInstance } from "../Axios/axiosinc";

const GetAllBreeds = () => {
  const { getAllBreed, updateBreed } = useAdminStore(); // make sure getAllBreeds fetches all breeds
  const [breeds, setBreeds] = useState([]);
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  const [selectedBreed, setSelectedBreed] = useState(null);

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

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const data = await getAllBreed();
        setBreeds(data || []);
      } catch (err) {
        alert(err.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBreeds();
  }, [getAllBreed]);

  const handleFilter = (category) => {
    if (activeCategory === category) {
      setActiveCategory(null);
      setFilteredBreeds([]);
    } else {
      setActiveCategory(category);
      if (category === "all") setFilteredBreeds(breeds);
      else
        setFilteredBreeds(
          breeds.filter((b) => b.category?.toLowerCase() === category)
        );
    }
  };

  const handleDeleteBreed = async (breedId) => {
    try {
      await axiosInstance.delete(`/breedprofile/deletebreed/${breedId._id}`);
      setBreeds((prev) => prev.filter((b) => b._id !== breedId._id));
      setFilteredBreeds((prev) => prev.filter((b) => b._id !== breedId._id));
      alert("Breed deleted successfully");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Unable to delete breed");
    }
  };

  const handleUpdateBreedClick = (breed) => {
    setSelectedBreed(breed);
    setFormData({
      name: breed.name || "",
      category: breed.category || "",
      purchaseBudget: breed.purchaseBudget || "",
      monthlyBudget: breed.monthlyBudget || "",
      experienceLevel: breed.experienceLevel || "",
      livingSpaceNeeds: breed.livingSpaceNeeds || "",
      isHypoAllergenic: breed.isHypoAllergenic || false,
      suitableForVegetarians: breed.suitableForVegetarians || false,
      goodWithChildren: breed.goodWithChildren || false,
      goodWithOtherPets: breed.goodWithOtherPets || false,
      prefersIndoorPet: breed.prefersIndoorPet || false,
      tankSizeRequired: breed.tankSizeRequired || "",
      waterType: breed.waterType || "",
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateBreed({ _id: selectedBreed._id, ...formData });
      setBreeds((prev) =>
        prev.map((b) => (b._id === updated._id ? updated : b))
      );
      setFilteredBreeds((prev) =>
        prev.map((b) => (b._id === updated._id ? updated : b))
      );
      alert("Breed updated successfully!");
      setSelectedBreed(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Unable to update breed");
    }
  };

  const categories = [
    { key: "dog", label: "🐶 Dogs" },
    { key: "cat", label: "🐱 Cats" },
    { key: "rabbit", label: "🐇 Rabbits" },
    { key: "fish", label: "🐠 Fish" },
    { key: "guinea pig", label: "🐹 Guinea Pigs" },
    { key: "all", label: "🌍 All" },
  ];

  const displayedBreeds = activeCategory ? filteredBreeds : [];

  return (
    <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
      <h1 className="text-3xl font-bold text-[var(--c5)] mb-6">All Breed Profiles</h1>

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

      {loading ? (
        <p className="text-gray-600">Loading breeds...</p>
      ) : activeCategory === null ? (
        <p className="text-gray-600">👉 Select a category to view breeds.</p>
      ) : displayedBreeds.length === 0 ? (
        <p className="text-gray-600">No breeds found in this category.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedBreeds.map((breed) => (
            <div
              key={breed._id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-[var(--c3)] mb-2">{breed.name}</h2>
              <p><span className="font-medium">Category:</span> {breed.category}</p>
              <p><span className="font-medium">Purchase Budget:</span> {breed.purchaseBudget}</p>
              <p><span className="font-medium">Monthly Budget:</span> {breed.monthlyBudget}</p>
              <p><span className="font-medium">Experience Level:</span> {breed.experienceLevel}</p>
              <p><span className="font-medium">Living Space:</span> {breed.livingSpaceNeeds}</p>
              <p><span className="font-medium">Hypoallergenic:</span> {breed.isHypoAllergenic ? "Yes" : "No"}</p>
              <p><span className="font-medium">Good With Children:</span> {breed.goodWithChildren ? "Yes" : "No"}</p>
              <p><span className="font-medium">Good With Other Pets:</span> {breed.goodWithOtherPets ? "Yes" : "No"}</p>
              <p><span className="font-medium">Prefers Indoor:</span> {breed.prefersIndoorPet ? "Yes" : "No"}</p>
              {breed.category === "fish" && (
                <>
                  <p><span className="font-medium">Tank Size Required:</span> {breed.tankSizeRequired}</p>
                  <p><span className="font-medium">Water Type:</span> {breed.waterType}</p>
                </>
              )}
              <div className="flex gap-2 mt-auto">
                <button
                  className="flex-1 py-2 bg-[var(--c1)] text-white rounded-lg hover:bg-yellow-500 transition"
                  onClick={() => handleUpdateBreedClick(breed)}
                >
                  Update
                </button>
                <button
                  className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  onClick={() => handleDeleteBreed(breed)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedBreed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="relative w-full max-w-3xl h-full sm:h-auto flex justify-center items-start sm:items-center overflow-auto">
            <form
              onSubmit={handleSubmitUpdate}
              className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 space-y-6 w-full max-h-[90vh] overflow-auto border-t-8 border-[var(--c2)] relative"
            >
              <button
                type="button"
                onClick={() => setSelectedBreed(null)}
                className="absolute top-4 right-4 text-[var(--c3)] hover:text-[var(--c2)] transition text-2xl font-bold"
              >
                &times;
              </button>

              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--c5)] mb-4 text-center">
                🐾 Update Breed Profile
              </h2>

              {/* All form fields */}
              {Object.entries(formData).map(([key, value]) => {
                if (typeof value === "boolean") {
                  return (
                    <div key={key} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-[var(--c1)] shadow-sm">
                      <input
                        type="checkbox"
                        name={key}
                        checked={value}
                        onChange={handleChange}
                        className="accent-[var(--c2)]"
                      />
                      <label className="font-semibold text-[var(--c3)]">{key}</label>
                    </div>
                  );
                } else {
                  return (
                    <div key={key}>
                      <label className="block mb-1 font-semibold text-[var(--c3)]">{key}</label>
                      <input
                        type="text"
                        name={key}
                        value={value}
                        onChange={handleChange}
                        className="w-full border border-[var(--c1)] rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-[var(--c2)] shadow-sm"
                      />
                    </div>
                  );
                }
              })}

              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-2">
                <button
                  type="button"
                  className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400 w-full sm:w-auto"
                  onClick={() => setSelectedBreed(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-[var(--c2)] text-[var(--c5)] rounded hover:bg-[var(--c4)] w-full sm:w-auto"
                >
                  Update Breed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetAllBreeds;
