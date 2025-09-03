

export default function DoctorCard({ doctor, onBook }) {

    console.log(doctor.id)


  return (

    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
      <img
        src={doctor.photo_url || "/default-avatar.png"}
        alt={doctor.name}
        className="w-20 h-20 rounded-full mx-auto mb-3"
      />
      <h3 className="font-bold text-center">{doctor.name}</h3>
      <p className="text-gray-500 text-center">{doctor.specialization}</p>
      <button onClick={() => onBook(doctor?.id)}
        
        className="mt-4 cursor-pointer w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Book Appointment
      </button>
    </div>

   
    
    
    

  );



}
