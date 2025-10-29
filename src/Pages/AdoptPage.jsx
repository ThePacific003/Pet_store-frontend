import React, { useEffect, useState } from "react";
import { useAdoptionStore } from "../Store/useAdoptionStore";
import toast from "react-hot-toast";

const AdoptPage = () => {
  const { adoptablePets, adoptreq, myRequests, cancelRequest } = useAdoptionStore();
  const [pets, setPets] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRequests, setShowRequests] = useState(false);

  // Fetch adoptable pets
  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const data = await adoptablePets();
        setPets(data);
      } catch (err) {
        alert("Failed to load pets for adoption");
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, [adoptablePets]);

  // Adoption request
  const handleAdopt = async (petId) => {
    if (loading) return; // prevent double click
  setLoading(true);
    try {
      const message = prompt("Why do you want to adopt this pet?");
      if (!message) return;
      await adoptreq(petId, message);
      toast.success("Adoption request submitted!");
      if (showRequests) {
        const updated = await myRequests();
        setRequests(updated);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to apply for adoption");
    }
    finally{
      setLoading(false);
    }
  };

  // Cancel adoption request
  const handleCancel = async (id) => {
    try {
      await cancelRequest(id);
      toast.success("Adoption request cancelled");
      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel request");
    }
  };

  // Toggle & fetch requests only when user clicks
  const toggleRequests = async () => {
    if (!showRequests) {
      try {
        const data = await myRequests();
        setRequests(data);
      } catch (err) {
        toast.error("Failed to load your adoption requests");
      }
    }
    setShowRequests((prev) => !prev);
  };

  if (loading) {
    return <p className="text-center mt-10 text-[var(--c1)]">Loading pets...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Section 1: Adoptable pets */}
      <h2 className="text-3xl font-bold mb-6 text-[var(--c1)]">
        Pets Available for Adoption
      </h2>

      {pets.length === 0 ? (
        <p className="text-[var(--c4)]">No pets available for adoption right now.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="border rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col"
              style={{ borderColor: "var(--c3)", background: "#fff" }}
            >
              {pet.imageUrl ? (
                <img
                  src={pet.imageUrl}
                  alt={pet.breed}
                  className="w-full h-48 object-cover rounded-xl mb-4 border"
                  style={{ borderColor: "var(--c4)" }}
                />
              ) : (
                <div
                  className="w-full h-48 rounded-xl mb-4"
                  style={{ background: "var(--c2)" }}
                />
              )}
              <h3 className="text-xl font-semibold mb-1 text-[var(--c1)]">{pet.breed}</h3>
              <p className="text-sm text-[var(--c4)] mb-1">Age: {pet.age} years</p>
              <p className="text-sm text-[var(--c4)] mb-1">Gender: {pet.gender}</p>
              <p className="text-sm text-[var(--c4)] mb-1">Category: {pet.category}</p>
              <p className="text-sm text-[var(--c4)] mb-1">
                Listing Type:{" "}
                <span className="font-medium text-[var(--c3)]">{pet.listingType}</span>
              </p>
              <p className="text-sm text-[var(--c4)] mb-1">
                Stock: {pet.quantityInStock}
              </p>
              <p className="text-sm text-gray-700 mb-3">{pet.description}</p>
              <button
                onClick={() => handleAdopt(pet._id)}
                className="mt-auto px-4 py-2 rounded-xl font-medium"
                style={{ background: "var(--c5)", color: "white" }}
              >
                Adopt
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={toggleRequests}
        className="mb-6 px-4 py-2 rounded-xl font-medium"
        style={{ background: "var(--c1)", color: "white" }}
      >
        {showRequests ? "Hide" : "My Adoption Requests"}
      </button>

      {/* Section 2: My adoption requests (toggleable) */}
      {showRequests && (
        <>
          {requests.length === 0 ? (
            <p className="text-[var(--c4)]">You have not applied for any adoptions yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {requests.map((req) => (
                <div
                  key={req._id}
                  className="border rounded-2xl shadow p-4 flex flex-col"
                  style={{ borderColor: "var(--c2)", background: "#fff" }}
                >
                  {req.pet?.imageUrl ? (
                    <img
                      src={req.pet.imageUrl}
                      alt={req.pet.breed}
                      className="w-full h-40 object-cover rounded-xl mb-4 border"
                      style={{ borderColor: "var(--c4)" }}
                    />
                  ) : (
                    <div
                      className="w-full h-40 rounded-xl mb-4"
                      style={{ background: "var(--c2)" }}
                    />
                  )}
                  <h3 className="text-lg font-semibold text-[var(--c1)]">{req.pet?.breed}</h3>
                  <p className="text-sm text-[var(--c4)] mb-2">Status: {req.adoptionStatus}</p>
                  <button
                    onClick={() => handleCancel(req._id)}
                    className="mt-auto px-4 py-2 rounded-xl font-medium"
                    style={{ background: "var(--c3)", color: "white" }}
                  >
                    Cancel Request
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdoptPage;
