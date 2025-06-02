// import React, { useState } from "react";
// import Img6 from "../assets/Img6.png";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Register = () => {
//   const [name, setName] = useState("");

//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
// ;
//   const [password, setPassword] = useState("");
 
//   const navigate = useNavigate();

//   const handleRegister = async (event) => {
//     event.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:4000/auth/register", {
//         name,
//         email,
//         phone,
//         password,
//       });
//       if (res.status === 200 || res.status === 201) {
//         alert("Registration Completed! Now login.");
//         navigate("/login");
//       } else {
//         alert("Registration Failed");
//       }
      
//     } catch (error) {
//       console.error(
//         "Registration error:",
//         error.response ? error.response.data : error.message
//       );
//       alert("An error occurred during registration.");
//     }
//   };

//   return (
//     <>
//     <div className="mt-[40px] flex flex-row justify-evenly">
//     <img src={Img6} alt="ok" className="h-[80vh] w-[40vw] mt-4" />
  
//     <div className=" flex flex-col justify-center items-center font-[Mukta]">
//       <p className="text-slate-600 font-semibold font-serif text-2xl m-3">
//         CREATE-ACCOUNT
//       </p>
//       <p className="text-gray-700 font-extralight text-xl mb-2">
//         Register Here to Create an Account !!
//       </p>
//       <form className="flex flex-col items-center justify-center" onSubmit={handleRegister}>
//         <input
//           className="p-4 m-3 border border-slate-500 w-[500px]"
//           type="text"
//           name="name"
//           value={name}
//           onChange={(ev) => setName(ev.target.value)}
//           placeholder=" Name"
//         />
       
//         <input
//           type="email"
//           name="email"
//           value={email}
//           onChange={(ev) => setEmail(ev.target.value)}
//           className="p-4 m-3 border border-slate-500 w-[500px]"
//           placeholder="Email"
//         />
       
//         <input
//           type="text"
//           name="phone"
//           value={phone}
//           onChange={(ev) => setPhone(ev.target.value)}
//           className="p-4 m-3 border border-slate-500 w-[500px]"
//           placeholder="Phone Number"
//         />
       
//         <input
//           className="p-4 m-3 border border-slate-500 w-[500px]"
//           type="password"
//           name="password"
//           value={password}
//           onChange={(ev) => setPassword(ev.target.value)}
//           placeholder="Password"
//         />
      
//         <button
//           type="submit"
//           className="inline-flex items-center justify-center px-6 py-4 m-2 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700"
//         >
//           Register
//         </button>
//       </form>
//       <div className="flex flex-row mb-7 gap-2">
//         <p>Already have an account?</p>
//         <Link to="/login" className="hover:underline">
//           Sign in
//         </Link>
//       </div>
//     </div>
//     </div>
//     </>
//   );
// };

// export default Register;


// import React, { useState } from "react";
// import Img6 from "../assets/Img6.png";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [phoneError, setPhoneError] = useState("");
  
//   const navigate = useNavigate();

//   const handlePhoneChange = (ev) => {
//     const phoneValue = ev.target.value;
    
//     // Only allow digits in the input
//     const digitsOnly = phoneValue.replace(/\D/g, '');
    
//     // Update the phone state with digits only
//     setPhone(digitsOnly);
    
//     // Validate phone number length
//     if (digitsOnly.length > 10) {
//       setPhoneError("Phone number should not exceed 10 digits");
//     } else {
//       setPhoneError("");
//     }
//   };

//   const handleRegister = async (event) => {
//     event.preventDefault();
    
//     // Validate before submission
//     if (phone.length > 10) {
//       setPhoneError("Phone number should not exceed 10 digits");
//       return;
//     }
    
//     try {
//       const res = await axios.post("http://localhost:4000/auth/register", {
//         name,
//         email,
//         phone,
//         password,
//       });
//       if (res.status === 200 || res.status === 201) {
//         alert("Registration Completed! Now login.");
//         navigate("/login");
//       } else {
//         alert("Registration Failed");
//       }
      
//     } catch (error) {
//       console.error(
//         "Registration error:",
//         error.response ? error.response.data : error.message
//       );
//       alert("An error occurred during registration.");
//     }
//   };

//   return (
//     <>
//     <div className="mt-[40px] flex flex-row justify-evenly items-center min-h-[80vh]">
//       <img src={Img6} alt="ok" className="h-[80vh] w-[40vw] mt-4 rounded-lg shadow-lg" />
    
//       <div className="flex flex-col justify-center items-center font-[Mukta] bg-white p-8 rounded-lg shadow-md">
//         <h1 className="text-slate-700 font-semibold font-serif text-3xl mb-3">
//           CREATE-ACCOUNT
//         </h1>
//         <p className="text-gray-700 font-light text-xl mb-6">
//           Register Here to Create an Account !!
//         </p>
//         <form className="flex flex-col items-center justify-center" onSubmit={handleRegister}>
//           <div className="w-[500px] mb-4">
//             <input
//               className="p-4 border border-slate-300 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//               type="text"
//               name="name"
//               value={name}
//               onChange={(ev) => setName(ev.target.value)}
//               placeholder="Name"
//               required
//             />
//           </div>
         
//           <div className="w-[500px] mb-4">
//             <input
//               type="email"
//               name="email"
//               value={email}
//               onChange={(ev) => setEmail(ev.target.value)}
//               className="p-4 border border-slate-300 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//               placeholder="Email"
//               required
//             />
//           </div>
         
//           <div className="w-[500px] mb-4">
//             <input
//               type="text"
//               name="phone"
//               value={phone}
//               onChange={handlePhoneChange}
//               className={`p-4 border ${phoneError ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'} w-full rounded-lg focus:outline-none focus:ring-2 ${phoneError ? 'focus:ring-red-500' : 'focus:ring-blue-500'} transition-all`}
//               placeholder="Phone Number"
//               maxLength={10}
//               required
//             />
//             {phoneError && <p className="text-red-500 text-sm mt-1 ml-1">{phoneError}</p>}
//           </div>
         
//           <div className="w-[500px] mb-6">
//             <input
//               className="p-4 border border-slate-300 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//               type="password"
//               name="password"
//               value={password}
//               onChange={(ev) => setPassword(ev.target.value)}
//               placeholder="Password"
//               required
//             />
//           </div>
        
//           <button
//             type="submit"
//             className="w-[500px] py-4 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
//           >
//             Register
//           </button>
//         </form>
//         <div className="flex flex-row mt-6 gap-2">
//           <p className="text-gray-600">Already have an account?</p>
//           <Link to="/login" className="text-blue-600 font-medium hover:underline">
//             Sign in
//           </Link>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default Register;


// mobile view 

import React, { useState } from "react";
import Img6 from "../assets/Img6.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [phoneError, setPhoneError] = useState("");
  
  const navigate = useNavigate();

  const handlePhoneChange = (ev) => {
    const phoneValue = ev.target.value;
    
    // Only allow digits in the input
    const digitsOnly = phoneValue.replace(/\D/g, '');
    
    // Update the phone state with digits only
    setPhone(digitsOnly);
    
    // Validate phone number length
    if (digitsOnly.length > 10) {
      setPhoneError("Phone number should not exceed 10 digits");
    } else {
      setPhoneError("");
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    
    // Validate before submission
    if (phone.length > 10) {
      setPhoneError("Phone number should not exceed 10 digits");
      return;
    }
    
    try {
      const res = await axios.post("http://localhost:4000/auth/register", {
        name,
        email,
        phone,
        password,
      });
      if (res.status === 200 || res.status === 201) {
        alert("Registration Completed! Now login.");
        navigate("/login");
      } else {
        alert("Registration Failed");
      }
      
    } catch (error) {
      console.error(
        "Registration error:",
        error.response ? error.response.data : error.message
      );
      alert("An error occurred during registration.");
    }
  };

  return (
    <>
    <div className="mt-6 md:mt-10 px-4 md:px-8 flex flex-col md:flex-row justify-center md:justify-evenly items-center min-h-[80vh] gap-8">
      {/* Image - Hidden on mobile, visible on medium screens and up */}
      <img 
        src={Img6} 
        alt="ok" 
        className="hidden md:block h-auto max-h-[80vh] w-full md:w-[45%] lg:w-[40vw] rounded-lg shadow-lg object-cover" 
      />
    
      <div className="w-full md:w-[50%] lg:w-[40%] flex flex-col justify-center items-center font-[Mukta] bg-white p-4 md:p-8 rounded-lg shadow-md">
        <h1 className="text-slate-700 font-semibold font-serif text-2xl md:text-3xl mb-2 md:mb-3 text-center">
          CREATE-ACCOUNT
        </h1>
        <p className="text-gray-700 font-light text-lg md:text-xl mb-4 md:mb-6 text-center">
          Register Here to Create an Account !!
        </p>
        <form className="flex flex-col items-center justify-center w-full" onSubmit={handleRegister}>
          <div className="w-full mb-4">
            <input
              className="p-3 md:p-4 border border-slate-300 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              type="text"
              name="name"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              placeholder="Name"
              required
            />
          </div>
         
          <div className="w-full mb-4">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className="p-3 md:p-4 border border-slate-300 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Email"
              required
            />
          </div>
         
          <div className="w-full mb-4">
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={handlePhoneChange}
              className={`p-3 md:p-4 border ${phoneError ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'} w-full rounded-lg focus:outline-none focus:ring-2 ${phoneError ? 'focus:ring-red-500' : 'focus:ring-blue-500'} transition-all`}
              placeholder="Phone Number"
              maxLength={10}
              required
            />
            {phoneError && <p className="text-red-500 text-sm mt-1 ml-1">{phoneError}</p>}
          </div>
         
          <div className="w-full mb-5 md:mb-6">
            <input
              className="p-3 md:p-4 border border-slate-300 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              type="password"
              name="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              placeholder="Password"
              required
            />
          </div>
        
          <button
            type="submit"
            className="w-full py-3 md:py-4 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Register
          </button>
        </form>
        <div className="flex flex-row mt-5 md:mt-6 gap-2 justify-center">
          <p className="text-gray-600">Already have an account?</p>
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;