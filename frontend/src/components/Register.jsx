import React, { useState } from "react";
import Img6 from "../assets/Img6.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
;
  const [password, setPassword] = useState("");
 
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
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
    <div className="mt-[40px] flex flex-row justify-evenly">
    <img src={Img6} alt="ok" className="h-[80vh] w-[40vw] mt-4" />
  
    <div className=" flex flex-col justify-center items-center font-[Mukta]">
      <p className="text-slate-600 font-semibold font-serif text-2xl m-3">
        CREATE-ACCOUNT
      </p>
      <p className="text-gray-700 font-extralight text-xl mb-2">
        Register Here to Create an Account !!
      </p>
      <form className="flex flex-col items-center justify-center" onSubmit={handleRegister}>
        <input
          className="p-4 m-3 border border-slate-500 w-[500px]"
          type="text"
          name="name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          placeholder=" Name"
        />
       
        <input
          type="email"
          name="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          className="p-4 m-3 border border-slate-500 w-[500px]"
          placeholder="Email"
        />
       
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={(ev) => setPhone(ev.target.value)}
          className="p-4 m-3 border border-slate-500 w-[500px]"
          placeholder="Phone Number"
        />
       
        <input
          className="p-4 m-3 border border-slate-500 w-[500px]"
          type="password"
          name="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          placeholder="Password"
        />
      
        <button
          type="submit"
          className="inline-flex items-center justify-center px-6 py-4 m-2 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700"
        >
          Register
        </button>
      </form>
      <div className="flex flex-row mb-7 gap-2">
        <p>Already have an account?</p>
        <Link to="/login" className="hover:underline">
          Sign in
        </Link>
      </div>
    </div>
    </div>
    </>
  );
};

export default Register;