"use client";

import { getAppointments } from '@/app/api';
import React, { useEffect, useState } from 'react';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [totalPages, setTotalPages] = useState(4);

  // Load token from localStorage
  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) setToken(t);
  }, []);





  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {

      try {
        const data = await getAppointments(status, date, page, token);
        setAppointments(data?.data || []);
        setTotalPages(data.totalPages || 1);
        console.log(data)
    
      } catch (err) {
        console.error(err);
      }
 
    };

    fetchData();
  }, [status, date, page, token]);




  

  // Update status (Complete / Cancel)
  const handleStatusChange = async (id, newStatus) => {
    if (!confirm(`Are you sure you want to mark this appointment as ${newStatus}?`)) return;
 
      await fetch("https://appointment-manager-node.onrender.com/api/v1/appointments/update-status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ appointment_id: id, status: newStatus }),
      });
    }

  
    
 

  return (
    <div className="flex mx-[240px]">
      {/* Sidebar */}
      <div className="w-[30%] bg-[#e8ebec] py-2 shadow h-screen">
        <h2 className="text-center font-semibold my-4">Doctor Dashboard</h2>
        <div className="flex flex-col">
          <button className="border border-[#aeaeae82] w-full py-4 px-3 hover:bg-blue-100">Appointment List</button>

        </div>
      </div>

      {/* Main Content */}
      <div className="w-full p-4">
        <h2 className="text-xl font-bold mb-4">Appointments</h2>

        {/* Filters */}
        <div className="flex gap-4 mb-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">All</option>
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {/* Appointment Table */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Patient Name</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                appointments.map((a) => (
                  <tr key={a._id}>
                    <td className="border p-2">{a.patient?.name}</td>
                    <td className="border p-2">{new Date(a.date).toLocaleString()}</td>
                    <td className="border p-2">{a.status}</td>
                    <td className="border p-2 space-x-2">
                      {a.status !== "COMPLETED" && (
                        <button
                          className="bg-green-500 text-white px-2 py-1 rounded"
                          onClick={() => handleStatusChange(a?.id, "COMPLETED")}
                        >
                          Complete
                        </button>
                      )}
                      {a.status !== "CANCELLED" && (
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() => handleStatusChange(a?.id, "CANCELLED")}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        <div className="mt-4 flex gap-2 items-center">
          <button
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </button>

          <span>Page {page}</span>

          <button
            className="px-3 py-1 bg-gray-300 rounded"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
