import React, { useState } from "react";
import { axiosInstance } from"../Axios/axiosinc";
import toast from "react-hot-toast";
import { useRecommendationStore } from "../Store/useRecommendationStore";
const Recommendation = () => {
  const [formData, setFormData] = useState({
    category: "",
    purchaseBudget: "",
    monthlyBudget: "",
    experienceLevel: "",
    livingSpaceNeeds: "",
    isHypoallergenic: "",
    suitableForVegetarians: "",
    goodWithOtherPets: "",
    prefersIndoorPet: "",
  });
  const{recommend} = useRecommendationStore()

  const [recommendations, setRecommendations] = useState([]);

  // Handle radio change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fetch recommendations from backend
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
     await recommend(formData);
    // setRecommendations(rec.data);
    // console.log(rec);
    
  } catch (error) {
    console.error("Error fetching recommendations:", error);
  }
};

  // Fields with radio options
  const fields = [
    {
      name: "category",
      label: "Pet Category",
      options: ["dog", "cat", "rabbit", "fish", "guinea pig"],
    },
    {
      name: "purchaseBudget",
      label: "Purchase Budget",
      options: ["low", "medium", "high"],
    },
    {
      name: "monthlyBudget",
      label: "Monthly Budget",
      options: ["low", "medium", "high"],
    },
    {
      name: "experienceLevel",
      label: "Experience Level",
      options: ["beginner", "intermediate", "expert"],
    },
    {
      name: "livingSpaceNeeds",
      label: "Living Space Needs",
      options: ["apartment", "small house", "large house", "farms"],
    },
    {
      name: "isHypoallergenic",
      label: "Hypoallergenic",
      options: ["true", "false"],
    },
    {
      name: "suitableForVegetarians",
      label: "Suitable for Vegetarians",
      options: ["true", "false"],
    },
    {
      name: "goodWithOtherPets",
      label: "Good with Other Pets",
      options: ["true", "false"],
    },
    {
      name: "prefersIndoorPet",
      label: "Prefers Indoor Pet",
      options: ["true", "false"],
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--c2)] py-12 px-6 font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-[var(--c5)] mb-8">
          🐾 Find Your Perfect Pet Recommendation
        </h1>

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {fields.map((field, i) => (
            <div key={i} className="flex flex-col">
              <label className="mb-3 font-semibold text-[var(--c1)] text-lg">
                {field.label}
              </label>
              <div className="flex flex-wrap gap-3">
                {field.options.map((opt, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center px-4 py-2 rounded-full cursor-pointer border transition
                      ${
                        formData[field.name] === opt
                          ? "bg-[var(--c5)] text-white border-[var(--c5)]"
                          : "bg-gray-100 text-black border-gray-300 hover:bg-[var(--c2)]"
                      }`}
                  >
                    <input
                      type="radio"
                      name={field.name}
                      value={opt}
                      checked={formData[field.name] === opt}
                      onChange={handleChange}
                      className="hidden"
                    />
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 flex justify-center mt-8">
            <button
              type="submit"
              className="bg-[var(--c5)] text-white px-10 py-3 rounded-full text-lg font-semibold hover:bg-[var(--c3)] transition transform hover:scale-105"
            >
              Get Recommendations
            </button>
          </div>
        </form>

        {/* Selected Values */}
        <div className="mt-12 bg-[var(--c1)] text-white rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">Your Selected Preferences:</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {Object.entries(formData).map(([key, value], i) =>
              value ? (
                <li key={i} className="text-lg">
                  <span className="font-semibold capitalize">{key}:</span>{" "}
                  {value}
                </li>
              ) : null
            )}
          </ul>
        </div>

        {/* Recommendations Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-[var(--c5)] text-center mb-8">
            Recommended Breeds for You
          </h2>

          {recommendations.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">
              No recommendations yet. Please fill the form above.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommendations.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition transform hover:-translate-y-2"
                >
                  <img
                    src={item.image || "https://via.placeholder.com/300"}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold text-[var(--c3)] mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Category: {item.category} <br />
                    Budget: {item.purchaseBudget}, Monthly: {item.monthlyBudget}{" "}
                    <br />
                    Experience: {item.experienceLevel} <br />
                    Living Space: {item.livingSpaceNeeds}
                  </p>
                  <a
                    href={`/shop/${item._id}`}
                    className="bg-[var(--c2)] text-[var(--c5)] px-5 py-2 rounded-full font-semibold hover:bg-[var(--c3)] hover:text-white transition"
                  >
                    Buy Now
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
