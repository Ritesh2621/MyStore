import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const CustomerProfile = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["access_token"]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user profile from the API
  const fetchUserProfile = async () => {
    try {
      const profileResponse = await axios.get(
        "http://localhost:4000/auth/profile",
        { withCredentials: true } // Ensures cookies are sent
      );
      setUser(profileResponse.data);
    } catch (error) {
      console.error("Error fetching profile:", error.response?.data || error.message);
      if (error.response) {
        console.error("Error details:", error.response); // Log full error details
      }
      if (error.response?.status === 401) {
        console.error("Unauthorized, redirecting to login...");
        navigate("/login");
      } else {
        alert("Failed to fetch user profile. Please try again later.");
      }
    } finally {
      setIsLoading(false); // Set loading state to false once the request is done
    }
  };

  useEffect(() => {
    if (!cookies.access_token) {
      console.error("No access token found, redirecting to login.");
      navigate("/login");
      return;
    }
    fetchUserProfile();
  }, [cookies.access_token, navigate]);

  const handleLogout = () => {
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.clear();
    navigate("/");
  };


  // Show a loading message if the profile is still being fetched
  if (isLoading) {
    return <div>Loading your profile...</div>;
  }

  // If no user data is available, show an error message
  if (!user) {
    console.log("User state is still null or undefined");
    return <div>No user data found. Please try again later.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-24 mb-16 p-6 bg-gradient-to-b from-indigo-100 via-white to-indigo-100 shadow-lg rounded-xl">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 space-y-6 md:space-y-0">
        <div className="flex items-center space-x-6">
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full shadow-md"
            />
          ) : (
            <div className="w-24 h-24 bg-blue-400 text-white text-2xl flex items-center justify-center rounded-full shadow-md">
              {user?.name ? user.name.charAt(0).toUpperCase() : "?"}
            </div>
          )}
          <div>
            <h2 className="text-3xl font-bold text-indigo-700">{user?.name || "User"}</h2>
            <p>{user?.email || "Email not available"}</p>
            <p>{user?.phone || "Phone not available"}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default CustomerProfile;
