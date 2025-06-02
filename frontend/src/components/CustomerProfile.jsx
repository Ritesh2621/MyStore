// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import axios from "axios";
// import OrderHistory from "./OrderHistory";

// const CustomerProfile = () => {
//   const navigate = useNavigate();
//   const [cookies] = useCookies(["access_token"]);
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch user profile from the API
//   const fetchUserProfile = async () => {
//     try {
//       const profileResponse = await axios.get(
//         "http://localhost:4000/auth/profile",
//         { withCredentials: true } // Ensures cookies are sent
//       );
//       setUser(profileResponse.data);
//     } catch (error) {
//       console.error("Error fetching profile:", error.response?.data || error.message);
//       if (error.response) {
//         console.error("Error details:", error.response); // Log full error details
//       }
//       if (error.response?.status === 401) {
//         console.error("Unauthorized, redirecting to login...");
//         navigate("/login");
//       } else {
//         alert("Failed to fetch user profile. Please try again later.");
//       }
//     } finally {
//       setIsLoading(false); // Set loading state to false once the request is done
//     }
//   };

//   useEffect(() => {
//     if (!cookies.access_token) {
//       console.error("No access token found, redirecting to login.");
//       navigate("/login");
//       return;
//     }
//     fetchUserProfile();
//   }, [cookies.access_token, navigate]);

//   const handleLogout = () => {
//     document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     localStorage.clear();
//     navigate("/");
//   };

//   // Show a loading message if the profile is still being fetched
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-400"></div>
//       </div>
//     );
//   }

//   // If no user data is available, show an error message
//   if (!user) {
//     console.log("User state is still null or undefined");
//     return (
//       <div className="text-center p-8 text-gray-600">
//         No user data found. Please try again later.
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-100 min-h-screen pb-8">
//       {/* Header Bar */}
//       <div className="bg-white shadow-sm py-3 mb-4">
//         <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
//           <h1 className="text-lg font-medium text-gray-800">My Account</h1>
//           <button
//             onClick={handleLogout}
//             className="px-4 py-1.5 bg-red-500 text-white rounded text-sm font-medium hover:bg-red-600"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       <div className="max-w-4xl mx-auto px-4">
//         {/* User Profile Card - Similar to Order Card in Image */}
//         <div className="bg-white rounded shadow-sm mb-4">
//           <div className="border-b p-4">
//             <div className="flex justify-between items-center">
//               <div className="text-sm text-gray-500">{new Date().toDateString()}</div>
//               <div className="text-sm">
//                 Profile ID: {user._id?.substring(0, 10) || "User123456789"}
//               </div>
//             </div>
//           </div>
          
//           <div className="border-b p-4">
//             <div className="flex justify-between">
//               <div>
//                 <p className="font-medium">Name: {user?.name || "User"}</p>
//                 <p className="text-sm text-gray-600">Email: {user?.email || "Not available"}</p>
//                 {user?.phone && <p className="text-sm text-gray-600">Phone: {user.phone}</p>}
//               </div>
//               <div className="flex items-center">
//                 {user?.profilePicture ? (
//                   <img
//                     src={user.profilePicture}
//                     alt="Profile"
//                     className="w-12 h-12 rounded-full"
//                   />
//                 ) : (
//                   <div className="w-12 h-12 bg-gray-200 text-gray-600 text-xl flex items-center justify-center rounded-full">
//                     {user?.name ? user.name.charAt(0).toUpperCase() : "?"}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
          
//           {/* <div className="p-4">
//             <div className="flex justify-between items-center">
//               <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50">
//                 Edit Profile
//               </button>
//               <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50">
//                 Change Password
//               </button>
//             </div>
//           </div> */}
//         </div>
        
      
        
//         {/* Order History Component */}
//         <OrderHistory />
//       </div>
//     </div>
//   );
// };

// export default CustomerProfile;

// mobile view 
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import OrderHistory from "./OrderHistory";

const CustomerProfile = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["access_token"]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Format the date to show Indian format (DD/MM/YYYY)
  const formattedDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

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
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-400"></div>
      </div>
    );
  }

  // If no user data is available, show an error message
  if (!user) {
    console.log("User state is still null or undefined");
    return (
      <div className="text-center p-8 text-gray-600">
        No user data found. Please try again later.
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen pb-8">
      {/* Header Bar */}
      <div className="bg-white shadow-sm py-3 mb-4">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-lg font-medium text-gray-800">My Account</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-1.5 bg-red-500 text-white rounded text-sm font-medium hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* User Profile Card - Similar to Order Card in Image */}
        <div className="bg-white rounded shadow-sm mb-4">
          <div className="border-b p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="text-sm text-gray-500 mb-2 sm:mb-0">{formattedDate()}</div>
              <div className="text-sm">
                Profile ID: {user._id?.substring(0, 10) || "User123456789"}
              </div>
            </div>
          </div>
          
          <div className="border-b p-4">
            <div className="flex flex-col sm:flex-row justify-between">
              <div>
                <p className="font-medium">Name: {user?.name || "User"}</p>
                <p className="text-sm text-gray-600">Email: {user?.email || "Not available"}</p>
                {user?.phone && <p className="text-sm text-gray-600">Phone: {user.phone}</p>}
              </div>
              <div className="flex items-center mt-4 sm:mt-0">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 text-gray-600 text-xl flex items-center justify-center rounded-full">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "?"}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* <div className="p-4">
            <div className="flex justify-between items-center">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50">
                Edit Profile
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50">
                Change Password
              </button>
            </div>
          </div> */}
        </div>
        
      
        
        {/* Order History Component */}
        <OrderHistory />
      </div>
    </div>
  );
};

export default CustomerProfile;