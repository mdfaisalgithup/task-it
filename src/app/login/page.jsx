"use client"

import Link from "next/link";
import { useState } from "react";
import { login } from "../api";
import { useRouter } from "next/navigation";
 import { ToastContainer, toast } from 'react-toastify';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const [role, setRole] = useState(""); 
     const [errors, setErrors] = useState({});

const router = useRouter();

 

// validation...
  const validate = () => {
    let newErrors = {};
if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
 }

if(!password){
 newErrors.email = "Password is required";
}
// else if (password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters";
//     }


    if(role.length === 0){

         newErrors.role = "Not Selected";
    }

     setErrors(newErrors);
     return Object.keys(newErrors).length === 0;
  }






    const handleSubmit = async (e) => {
            e.preventDefault();
  if (!validate()) return;




  
const dShowD = {
  email,
  password,
  role
}


try {
    const response = await login(dShowD); 


    if (response?.data?.user?.email === email) {
      console.log("Email found in database");

      if (response?.data?.user?.role === role) {

        console.log("Email & role both correct");
        localStorage.setItem("token", response.data.token);

        if(response?.data?.user?.role === "PATIENT") {
    
    


             router.push("/patient/dashboard");
             return false
        }


          if(response?.data?.user?.role === "DOCTOR") {

             router.push("/doctor/dashboard");
             return false
        }

  


      } else {


        const notiF = `Email found but role "${role}" not matched`
       toast(notiF)
        console.log(`Email found but role "${role}" not matched`);
        return false;
      }

    } else {
      console.log("Email not registered");
      return false;
    }

  } catch (error) {
    console.error("Login failed:", error.response?.data?.message || error.message);
    alert(error.response?.data?.message);
  }


    }


    return (
        <div>
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img src="https://i.ibb.co.com/mZvpxkx/doctor-8447863-640.webp" alt="Your Company" className="mx-auto h-20 w-18" />
    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <div>
        <form onSubmit={handleSubmit}  className="space-y-6">
          <div>
              <ToastContainer />
          </div>
      <div>
        <label htmlFor="email" className="block text-sm/6 font-medium text-black">Email address</label>
        <div className="mt-2">
      <input  type="email" onChange={(e) => setEmail(e.target.value)}   className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 border-2 border-black" />

 {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm/6 font-medium text-black">Password</label>
          <div className="text-sm">
            <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">Forgot password?</a>
          </div>
        </div>
        <div className="mt-2">
          <input  value={password} type="password" required  onChange={(e) => setPassword(e.target.value)}  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 border-2 border-black" />
           {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
      </div>

<div> 
  
{/* controlled by state */}
    <select 
        value={role}             
        onChange={(e) => setRole(e.target.value)}   // update state when change
        className="border p-2 rounded"
      >
        <option disabled value="">Select Only One</option>
        <option value="DOCTOR">Doctor</option>
        <option value="PATIENT">Patient</option>
      </select>

        {errors.role && (
            <p className="text-red-500 text-sm">{errors.role}</p>
          )}
</div>

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer">Sign in</button>
      </div>
    </form>

    <div>
        <h2 className="my-2 text-blue-700"><Link href="/register">Registration</Link> </h2>
    </div>
    </div>

   
  </div>
</div>
        </div>
    );
};

export default Login;