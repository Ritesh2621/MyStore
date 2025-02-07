import React, { useState } from "react";
import Img5 from "../assets/Img5.png";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [_, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // Function to send OTP
  const handleEmailSubmit = async () => {
    try {
      await axios.post("http://localhost:4000/auth/login", { email });
      setOtpSent(true);
      console.log("OTP sent to:", email);
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP");
      setOtpSent(false);
    }
  };

  // Function to verify OTP
  const handleOtpSubmit = async () => {
    try {
        const res = await axios.post("http://localhost:4000/auth/login-verify", { email, otp });
        
        // Alert user upon successful OTP verification
        alert("OTP verified successfully");

        // Extract token, userId, role, and tokenNumber from response
        const { token, userId, role, tokenNumber } = res.data; // Make sure tokenNumber is part of the response

        // Set cookies and localStorage for session management
        setCookies("access_token", token); // Assuming setCookies is defined elsewhere
        window.localStorage.setItem("userId", userId);
        window.localStorage.setItem("userRole", role);
        window.localStorage.setItem('tokenNumber', tokenNumber); // Store tokenNumber
        console.log("Token Number:", tokenNumber); // Log token number for debugging
        
        // Navigate to home or dashboard after successful login
        navigate("/"); 
    } catch (error) {
        console.error("Failed to verify OTP:", error);
        alert("Failed to verify OTP: " + (error.response?.data?.message || "Unknown error"));
    }
};


  return (
    <div className="flex flex-row justify-evenly">
      <img src={Img5} alt="ok" className="h-[90vh] w-[45vw]" />
      <div className="flex flex-col justify-center items-center">
        <p className="text-slate-600 font-semibold font-serif text-2xl m-2 mb-1">
          SIGN-IN
        </p>
        <p className="text-gray-700 font-extralight text-xl m-3">
          Sign-In to your Account using OTP
        </p>

        <div className="flex flex-col items-center mt-6">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="p-4 m-3 border border-slate-500 w-[500px]"
            placeholder="Enter your Email"
            disabled={otpSent} // Disable email input once OTP is sent
          />

          {!otpSent && (
            <button
              onClick={handleEmailSubmit}
              className="inline-flex items-center justify-center px-6 py-4 m-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Send OTP
            </button>
          )}

          {otpSent && (
            <>
              <input
                type="text"
                value={otp}
                onChange={handleOtpChange}
                className="p-4 m-3 border border-slate-500 w-[500px]"
                placeholder="Enter OTP"
              />
              <button
                onClick={handleOtpSubmit}
                className="inline-flex items-center justify-center px-6 py-4 mt-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Verify OTP
              </button>
            </>
          )}
        </div>

        <div className="flex flex-row m-1 p-3 gap-2 mb-7 font-[Mukta]">
          <p>Don't have an Account?</p>
          <Link to="/signup" className="hover:underline">
            Create-Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;