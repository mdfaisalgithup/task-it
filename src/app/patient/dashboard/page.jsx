"use client"


import React, { useEffect, useState } from 'react';
import { createAppointment, getDoctors, getSpecializations } from '@/app/api';
import DoctorCard from '@/app/components/DoctorCard';
import AppointmentModal from '@/app/components/AppointmentModal';
import Link from 'next/link';


const DashboardPatient = () => {
      const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");
   const [specializations, setSpecializations] = useState([]);
  const [token, setToken] = useState(null); //
  const [page, setPage] = useState(1);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const[pageBtn, setPageBtn] = useState([])
  const[totalPage, setTotalPages] = useState(1)

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  console.log(token)


  // Doctor List
useEffect(() => {
  if (!token) return;

  const fetchDoctors = async () => {
    try {
      const res = await getDoctors({ page, limit: 6, search, specialization });


setDoctors(res.data)

console.log(res.totalPages)
setTotalPages(res.totalPages)


  const getPageNumbers = () => {
    let start = Math.max(page - 1, 1);
    let end = Math.min(start + 2, res?.totalPages);


    if (end - start < 2) {
      start = Math.max(end - 2, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

setPageBtn(getPageNumbers)

const spci = await getSpecializations();

setSpecializations(spci.data)



    } catch (err) {
      console.error("Failed to fetch doctors:", err);
    }
  };

  fetchDoctors();
}, [token, search, specialization, page]);
// doctor list end



// appoinment booking
  const handleBook = async (doctorId, date) => {


    console.log(date + doctorId)

    try {
      await createAppointment({ doctorId, date }, token);
      alert("Appointment booked successfully!");
      setShowModal(false);
    } catch (err) {
      alert("Failed to book appointment");
    }



  };

  // appoinment booking end
      


    return (
        <div className='mx-240px'>
            <div className='flex h-full  '>
           <div className='w-[30%] bg-[#e8ebec] py-2 h-svh shadow'>
            <h2 className='text-center font-semibold my-4'>Paitent Dashboard</h2>
 
           <div className=''>
           
         <Link href="/patient/dashboard"><button className='border-[#aeaeae82] border-1 w-full cursor-pointer  py-4 px-3 hover:bg-blue-100'>Doctor List</button></Link>

         
          
            <Link href="/patient/dashboard/my-appointments"><button className='border-[#aeaeae82] border-1 w-full cursor-pointer  py-4 px-3 hover:bg-blue-100'>My Appointments</button></Link>


           </div>
            </div>

            <div className='w-full bg-[#fef7f7] p-3'>
                 <h1 className="text-2xl font-bold mb-6">Find a Doctor</h1>

      {/* Search + Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border p-2 rounded"
        />
        <select
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Specializations</option>
          {specializations.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>


      {/* Doctors card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors?.map((doctor) => (
            
          <DoctorCard
            key={doctor?.id}
            doctor={doctor}
            onBook={(id) => {
              setSelectedDoctor(id);
              setShowModal(true);
            }}
          />
        ))
        
        
  
        }
      </div>



       {/* Pagination */}
<div className="flex justify-center mt-6 space-x-2">
      {/* Prev Button */}
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-300 cursor-pointer rounded disabled:opacity-50"
      >
        Prev
      </button>

      {/* Page Number Buttons */}
      {pageBtn?.map((num) => (
        <button
          key={num}
          onClick={() => setPage(num)}
          className={`px-4 py-2 rounded ${
            page === num ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          {num}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => setPage((p) => Math.min(p + 1, totalPage))}
        disabled={page === totalPage}
        className="px-4 py-2 cursor-pointer bg-gray-300 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>



      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={(date) => handleBook(selectedDoctor, date)}
      />

           
            </div>

            </div>

           
        </div>
    );
};

export default DashboardPatient;