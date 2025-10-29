import React from "react";
import AdminNav from "../Components/AdminNav"; // ✅ your sidebar component

const Admin = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-[var(--c5)] mb-6">
          Welcome to PetNest Admin Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[var(--c2)] text-[var(--c5)] p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold">Total Pets</h2>
            <p className="text-3xl font-bold mt-2">120</p>
          </div>
          <div className="bg-[var(--c3)] text-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold">Accessories</h2>
            <p className="text-3xl font-bold mt-2">85</p>
          </div>
          <div className="bg-[var(--c4)] text-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold">Orders</h2>
            <p className="text-3xl font-bold mt-2">240</p>
          </div>
          <div className="bg-[var(--c1)] text-[var(--c2)] p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold">Adoption Requests</h2>
            <p className="text-3xl font-bold mt-2">36</p>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-[var(--c3)] mb-4">
            Recent Orders
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[var(--c1)] text-white text-left">
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Item</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">#1001</td>
                  <td className="p-3">John Doe</td>
                  <td className="p-3">Golden Retriever</td>
                  <td className="p-3 text-green-600 font-semibold">Completed</td>
                  <td className="p-3">2025-09-02</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">#1002</td>
                  <td className="p-3">Sarah Lee</td>
                  <td className="p-3">Bird Cage</td>
                  <td className="p-3 text-yellow-600 font-semibold">Pending</td>
                  <td className="p-3">2025-09-01</td>
                </tr>
                <tr>
                  <td className="p-3">#1003</td>
                  <td className="p-3">Mike Johnson</td>
                  <td className="p-3">Adoption: Persian Cat</td>
                  <td className="p-3 text-blue-600 font-semibold">Processing</td>
                  <td className="p-3">2025-08-30</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
