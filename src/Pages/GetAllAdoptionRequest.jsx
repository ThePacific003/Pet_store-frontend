import React, { useEffect, useState } from "react";
import { useAdminStore } from "../store/useAdminStore"; // adjust path

const GetAllAdoptionRequests = () => {
  const { adooption } = useAdminStore();
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        const data = await adooption();
        setAdoptions(data || []);
      } catch (err) {
        console.error("Error fetching adoption requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdoptions();
  }, [adooption]);

  return (
    <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
      <h1 className="text-3xl font-bold text-[var(--c5)] mb-6">
        Adoption Requests
      </h1>

      {loading ? (
        <p className="text-gray-600">Loading adoption requests...</p>
      ) : adoptions.length === 0 ? (
        <p className="text-gray-600">No adoption requests available.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {adoptions.map((req) => (
            <div
              key={req._id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col hover:shadow-lg transition"
            >
              {/* Pet Info */}
              <h2 className="text-xl font-semibold text-[var(--c3)] mb-2">
                🐾 {req.pet?.breed}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Pet ID: {req.pet?.id}
              </p>

              {/* Provider & Adopter Info */}
              <div className="space-y-1 text-gray-700 text-sm">
                <p>
                  <span className="font-medium">Provider:</span>{" "}
                  {req.provider?.name}
                </p>
                <p>
                  <span className="font-medium">Adopter:</span>{" "}
                  {req.adopter?.name}
                </p>
              </div>

              {/* Status */}
              <p className="mt-2 text-sm">
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`font-semibold ${
                    req.adoptionStatus === "approved"
                      ? "text-green-600"
                      : req.adoptionStatus === "pending"
                      ? "text-yellow-600"
                      : req.adoptionStatus === "rejected"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  {req.adoptionStatus}
                </span>
              </p>

              {/* Message */}
              {req.message && (
                <p className="mt-2 text-gray-600 italic">💬 {req.message}</p>
              )}

              {/* Created At */}
              <p className="mt-2 text-xs text-gray-500">
                Requested on: {new Date(req.createdAt).toLocaleDateString()}
              </p>

              {/* Actions */}
              {/* <div className="flex gap-2 mt-4">
                <button className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                  Approve
                </button>
                <button className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                  Reject
                </button>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetAllAdoptionRequests;
