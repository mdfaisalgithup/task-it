"use client"
import { useRouter } from "next/navigation";
import Link from "next/link";
import {  useEffect, useState } from "react";
import { getSpecializations, registerDoctor, registerPatient } from "../api";

  import { ToastContainer, toast } from 'react-toastify';



const Registration = () => {
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [photoUrl, setPhotoUrl] = useState("");
      const [password, setPassword] = useState("");
      const [role, setRole] = useState(""); // initially empty
     const [errors, setErrors] = useState({});
 
      const[specializations, setSpecializations] = useState("")
      const[valueSelect, setValueSelect] = useState("")
      const [success, setSuccess] = useState('');
        // const [okB, setOkB] = useState(false);
 const [succesO, setSuccesO] = useState(false);

       useEffect(() => {
    if (role === 'DOCTOR') {
      getSpecializations().then((data) => setSpecializations(data));
    }

 

  }, [role]);






    const router = useRouter();

    const handleRegisterSubmit = async (e) => {
            e.preventDefault();


if(!name){

    setErrors("name is empty")
    alert(errors)
    return false
  }
  
  if(!email){

    setErrors("email is empty")
    alert(errors)
    return false
  }

  if(!password){
    alert(errors)

    setErrors("password is empty")
    return false
  }
 
 if(!role){
    alert(errors)

    setErrors("Selected is empty")
    return false
  }
 



     
try {



 if(role == "DOCTOR") {
                const da = { 
                  name,
                  email, 
                  photo_url: photoUrl,
                  password,   
                  specialization: valueSelect }
            const dShow = await registerDoctor(da);
          setSuccess(dShow?.message);

       
      setSuccesO(dShow?.success)
       toast("Registration Sucessfully")
      function f() {
    router.push("/login");
       
      }

setTimeout(f, 5000);

        return false
            }
            

         else {
                const da = { 
                  name,
                  email,
                 photo_url: photoUrl,
                  password,
                  role }  
            


const dShow = await registerPatient(da);


console.log(dShow.message)
setSuccess(dShow?.message);




  toast("Registration Sucessfully")
      function f() {
    router.push("/login");
       
      }

setTimeout(f, 5000);

      

            }
          
}
catch (error) {
    console.error("Register failed:", error.response?.data?.message || error.message);
 
    alert(error.response?.data?.message);
  }


           
        

    }




    return (
           <div>
 
   <ToastContainer />

          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img src="https://i.ibb.co.com/mZvpxkx/doctor-8447863-640.webp" alt="Your Company" className="mx-auto h-20 w-18" />
    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">Sign Up to your account</h2>
  </div>



  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <div>
        <form onSubmit={handleRegisterSubmit}  >

         

<div className="space-y-6">


          
{
  success == success.length > 0 && <div>{success}</div>
}


       <div>
        <label htmlFor="email" className="block text-sm/6 font-medium text-black">Name:</label>
        <div className="mt-2">
      <input  type="text" onChange={(e) => setName(e.target.value)}   className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 border-2 border-black" />

        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm/6 font-medium text-black">Photo URL (optional)</label>
        <div className="mt-2">
      <input  type="text" onChange={(e) => setPhotoUrl(e.target.value)}   className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 border-2 border-black" />

        </div>
      </div>


      <div>
        <label htmlFor="email" className="block text-sm/6 font-medium text-black">Email address</label>
        <div className="mt-2">
      <input  type="email" onChange={(e) => setEmail(e.target.value)}   className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 border-2 border-black" />
        </div>
      </div>




      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm/6 font-medium text-black">Password</label>
         
        </div>
        <div className="mt-2">
          <input  value={password} type="password" required  onChange={(e) => setPassword(e.target.value)}  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 border-2 border-black" />
     
        </div>
      </div>




<div>
    <select 
        value={role}              // controlled by state
        onChange={(e) => setRole(e.target.value)}   // update state when change
        className="border p-2 rounded"
      >
        <option disabled value="">Select Only One</option>
        <option value="DOCTOR">Doctor</option>
        <option value="PATIENT">Patient</option>
      </select>
</div>




<div>
     {role === "DOCTOR" && (
          <div>
        
<div>
  <select
    value={valueSelect} // specialization state
    onChange={(e) => setValueSelect(e.target.value)} // specialization update 
    className="border p-2 rounded"
  >
    <option disabled value="">
      Specialization Select Only One
    </option>

    {specializations?.data?.map((item, index) => (
      <option key={index} value={item}>
        {item}
      </option>
    ))}
  </select>
</div>





            
          </div>
        )}
</div>



      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer">Sign Up</button>
      </div>

      </div>
    </form>

    <div>
        <h2 className="my-2 text-blue-700"><Link href="/login">Login</Link> </h2>
    </div>
    </div>

   
  </div>
</div>
        </div>
    );
};

export default Registration;