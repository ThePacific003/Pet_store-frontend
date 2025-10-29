import React, { useEffect, useState } from "react";
import { useAdminStore } from "../store/useAdminStore"; // adjust path
import { axiosInstance } from "../Axios/axiosinc";

const GetAllPets = () => {
  const {getAllPets, restock,update} = useAdminStore();
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null); // ✅ initially no category selected
    // const[buttonClicked,setButtonClicked]=useState(false);


    // Selected pet for update
const [selectedPet, setSelectedPet] = useState(null);

// Form data for update
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

// Image file for preview
const [imageFile, setImageFile] = useState(null);


const handleUpdatePet = (pet) => {
  setSelectedPet(pet);
  setFormData({
    breed: pet.breed || "",
    age: pet.age || "",
    gender: pet.gender || "",
    price: pet.price || "",
    description: pet.description || "",
    imageUrl: pet.imageUrl || "",
    availability: pet.availability,
    category: pet.category || "",
    listingType: pet.listingType || "",
    quantityInStock: pet.quantityInStock || 1,
  });
};

const handleSubmitUpdate=async(e)=>{
  e.preventDefault();
  try{

    const payload={
      ...formData,
      price:Number(formData.price),
      age: Number(formData.age),
      quantityInStock: Number(formData.quantityInStock),
    }
    const response=await update(selectedPet,payload);
    

    setFilteredPets((prev) =>
      prev.map((p) => (p._id === selectedPet._id ? {...p,...formData} : p))
    );
    setPets((prev) =>
      prev.map((p) => (p._id === selectedPet._id ? {...p,...formData}: p))
    );
  
  alert("Pet updated successfully!");
    setSelectedPet(null); // close form
    setImageFile(null);
  }
  catch(error){
    alert(error.response?.data?.message || "Unable to update pet");
  }
}


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

const handleRestockPet=async(pet)=>{
  const qty=prompt("Enter quantity to restock:","0");

  if(qty===null) return;
  const quantity=Number(qty);
  if(isNaN(quantity) || quantity<0)return ;

  try{
    const response= await restock(pet,quantity);

    setFilteredPets((prev) =>(
      prev.map((p) =>
        p._id === pet._id ? response:p
      )
    ))
    setPets((prev) =>(
      prev.map((p) =>
        p._id === pet._id ? response:p
      )
    ))
    
  }
  catch(error){
      console.error("Restock error:", error);
    alert(error.response?.data?.message || "unable to restock");
  }
}

const handleDeletePet=async(pet)=>{
  try{
    await axiosInstance.delete(`/pet/delete/${pet._id}`);
    setFilteredPets((prevPets) => prevPets.filter((p) => p._id !== pet._id));
    setPets((prevPets) => prevPets.filter((p) => p._id !== pet._id));
    alert("breed deleted")
  }
  catch(error){
    alert(error.response?.data?.message );
  }
}


  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getAllPets();
        setPets(data || []);
      } catch (err) {
        console.error("Error fetching pets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [getAllPets]);

  // Toggle filter function
  const handleFilter = (category) => {
    if (activeCategory === category) {
      // ✅ If the same button clicked again → unselect
      setActiveCategory(null);
      setFilteredPets([]);
    } else {
      setActiveCategory(category);
      if (category === "all") {
        setFilteredPets(pets);
      } else {
        setFilteredPets(
          pets.filter((pet) => pet.category?.toLowerCase() === category)
        );
      }
    }
  };

  // Category Buttons with Emoji
  const categories = [
    { key: "dog", label: "🐶 Dogs" },
    { key: "cat", label: "🐱 Cats" },
    { key: "rabbit", label: "🐇 Rabbits" },
    { key: "fish", label: "🐠 Fish" },
    { key: "guinea-pigs", label: "🐹 Guinea Pigs" },
    { key: "all", label: "🌍 All" },
  ];

  return (
    <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
      <h1 className="text-3xl font-bold text-[var(--c5)] mb-6">All Pets</h1>
    
      {/* Big Filter Buttons */}
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

      {/* Pets Grid */}
      {loading ? (
        <p className="text-gray-600">Loading pets...</p>
      ) : activeCategory === null ? (
        <p className="text-gray-600">👉 Select a category to view pets.</p>
      ) : filteredPets.length === 0 ? (
        <p className="text-gray-600">No pets found in this category.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPets.map((pet) => (
            <div
              key={pet._id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col hover:shadow-lg transition"
            >
              <img
                src={pet.imageUrl}
                alt={pet.breed}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h2 className="text-xl font-semibold text-[var(--c3)] mb-1">
                {pet.breed}
              </h2>

              <div className="text-gray-700 text-sm space-y-1">
                <p><span className="font-medium">ID:</span> {pet._id}</p>
                <p><span className="font-medium">Age:</span> {pet.age}</p>
                <p><span className="font-medium">Gender:</span> {pet.gender}</p>
                <p><span className="font-medium">Price:</span> ₹{pet.price}</p>
                <p>
                  <span className="font-medium">Availability:</span>{" "}
                  <span
                    className={`font-semibold ${
                      pet.availability ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {pet.availability ? "Available" : "Unavailable"}
                  </span>
                </p>
                <p><span className="font-medium">Category:</span> {pet.category}</p>
                <p><span className="font-medium">Listing Type:</span> {pet.listingType}</p>
                 <p><span className="font-medium">Stock:</span> {pet.quantityInStock}</p>
              </div>
               {/* Action Buttons */}
      <div className="flex gap-2 mt-auto">
        <button
          className="flex-1 py-2 bg-[var(--c1)] text-white rounded-lg hover:bg-yellow-500 transition"
          onClick={() => handleUpdatePet(pet)}
        >
          Update
        </button>
        <button
          className="flex-1 py-2 bg-[var(--c1)] text-white rounded-lg hover:bg-blue-600 transition"
          onClick={() => handleRestockPet(pet)}
        >
          Restock
        </button>
        <button
          className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          onClick={() => handleDeletePet(pet)}
        >
          Delete
        </button>
      </div>
            </div>
          ))}
        </div>
      )}



{selectedPet && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="relative w-full max-w-3xl h-full sm:h-auto flex justify-center items-start sm:items-center overflow-auto">
      <form
        onSubmit={handleSubmitUpdate}
        className="bg-white shadow-xl rounded-2xl p-4 sm:p-8 space-y-6 sm:space-y-8 w-full max-h-[90vh] overflow-auto border-t-8 border-[var(--c2)] relative"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setSelectedPet(null)}
          className="absolute top-4 right-4 text-[var(--c3)] hover:text-[var(--c2)] transition text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--c5)] mb-4 text-center">
          🐾 Update Pet
        </h2>

        {/* Breed */}
        <div>
          <label className="block mb-1 font-semibold text-[var(--c3)]">Breed</label>
          <input
            type="text"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            className="w-full border border-[var(--c1)] rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-[var(--c2)] shadow-sm"
            required
          />
        </div>

        {/* Age & Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold text-[var(--c3)]">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border border-[var(--c1)] rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-[var(--c2)] shadow-sm"
              required
            />
          </div>

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
        </div>

        {/* Gender */}
        <div>
          <label className="block mb-1 font-semibold text-[var(--c3)]">Gender</label>
          <div className="flex gap-4 sm:gap-6 flex-wrap">
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

        {/* Image Upload */}
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
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
            className="accent-[var(--c2)]"
          />
          <label className="font-semibold text-[var(--c3)]">Available</label>
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-semibold text-[var(--c3)] text-lg">Category</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
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

        {/* Listing Type */}
        <div>
          <label className="block mb-1 font-semibold text-[var(--c3)]">Listing Type</label>
          <div className="flex gap-4 sm:gap-6 flex-wrap">
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
            onClick={() => setSelectedPet(null)}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmitUpdate}
            className="py-2 px-4 bg-[var(--c2)] text-[var(--c5)] rounded hover:bg-[var(--c4)] w-full sm:w-auto"
          >
            Update Pet
          </button>
        </div>
      </form>
    </div>
  </div>
)}




    </div>
  );
};

export default GetAllPets;
