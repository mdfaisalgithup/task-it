"use client";

import { cancelAppointment, getPatientAppointments } from "@/app/api";
import Loading from "@/app/components/loading";
import { useEffect, useState } from "react";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const[pageBtn, setPageBtn] = useState([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("token");
      setToken(savedToken);
    }
  }, []);


  useEffect(() => {
    if (!token) return;

    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const daSee = await getPatientAppointments(status, page, token);
        setAppointments(daSee?.data || []);

        console.log(daSee)
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
      setLoading(false);






    };

    fetchAppointments();
  }, [status, page, token]);

  const handleCancel = async (id) => {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      await cancelAppointment(id, token);
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">My Appointments</h1>

      {/* Filter */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 rounded mb-6"
      >
        <option value="">All</option>
        <option value="PENDING">Pending</option>
        <option value="COMPLETED">Completed</option>
        <option value="CANCELLED">Cancelled</option>
      </select>

      {/* Loading */}
      {loading && <Loading />}

      {/* List */}
      <div className="space-y-4">
        {appointments.map((app) => (
          <div
            key={app?.id} // ✅ 
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{app.doctor?.name}</h3>
              <p>{app.date}</p>
              <p className="text-gray-500">Status: {app.status}</p>
            </div>
            {app.status === "PENDING" && (
              <button
                onClick={() => handleCancel(app.id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Cancel
              </button>
            )}
          </div>
        ))}
      </div>

   
    </div>
  );
}
