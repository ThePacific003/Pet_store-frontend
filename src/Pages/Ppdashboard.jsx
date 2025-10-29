import React, { useEffect, useState } from "react";
import { useAdoptionStore} from "../Store/useAdoptionStore";
import CreatePet from "../Components/CreatePet";

const Ppdashboard = () => {
  const { providerreq,update,deletebypp } = useAdoptionStore();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
   const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await providerreq();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching provider requests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [providerreq]);

  const handleupdate=async(id , status)=>{
    try{
         await update(id,status)
        setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, adoptionStatus: status } : r))
      );
      alert("Status updated successfully")
    }
    catch(error){
        alert(error.response?.data?.message);
    }
  }

  const deletereq=async(id)=>{
    try{
      await deletebypp(id);
       setRequests((prev) => prev.filter((r) => r._id !== id));
       alert("Adoption request deleted successfully");
    }
    catch(error){
      alert(error.response?.data?.message);
    }
  }
  if (loading) return <p className="text-center mt-6">Loading requests...</p>;

   return (
    <div className="p-6">
      {/* Header + Toggle Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-[var(--c5)]">
          🐾 Provider Dashboard
        </h1>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="px-5 py-2 rounded-lg bg-[var(--c2)] text-[var(--c5)] font-semibold shadow hover:bg-[var(--c4)] hover:text-white transition"
        >
          {showForm ? "⬅️ Back to Requests" : "➕ Create Pet for Adoption"}
        </button>
      </div>

      {/* Conditional Rendering */}
      {showForm ? (
        <CreatePet />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.length === 0 ? (
            <p className="text-center col-span-full">
              No adoption requests found.
            </p>
          ) : (
            requests.map((req) => (
              <div
                key={req._id}
                className="bg-white rounded-2xl shadow-lg p-4 space-y-3 border border-gray-200"
              >
                <h2 className="text-lg font-bold text-gray-800">
                  Pet Breed: {req.pet.breed}
                </h2>
                <p>
                  <strong>Adopter Name:</strong> {req.adopter.name}
                </p>
                <p>
                  <strong>Adopter Email:</strong>{req.adopter.email}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="font-semibold text-blue-600">
                    {req.adoptionStatus}
                  </span>
                </p>
                <p>
                  <strong>Message:</strong> {req.message || "No message"}
                </p>
                <p className="text-sm text-gray-500">
                  Requested on: {new Date(req.createdAt).toLocaleDateString()}
                </p>

                {/* Status Update Dropdown */}
                <select
                  className="border rounded-md p-2 w-full focus:ring focus:ring-blue-300"
                  value={req.adoptionStatus}
                  onChange={(e) => handleupdate(req._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="delivered">Delivered</option>
                </select>

                {/* Action Buttons */}
                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => handleupdate(req._id, "approved")}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => deletereq(req._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Ppdashboard