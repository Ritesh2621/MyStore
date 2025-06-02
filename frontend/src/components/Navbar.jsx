// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaCartShopping } from 'react-icons/fa6';
// import { FaStore } from 'react-icons/fa';
// import { IoBagCheckSharp } from "react-icons/io5";
// import { useCookies } from 'react-cookie';
// import { FaUser } from "react-icons/fa";

// const Navbar = ({ searchQuery, setSearchQuery }) => {
//   const [isDropdownVisible, setIsDropdownVisible] = useState(false);
//   const [cookies, setCookie] = useCookies(["access_token"]);
//   const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
//   const navigate = useNavigate();

//   // Update local state when the parent prop changes
//   useEffect(() => {
//     setLocalSearchQuery(searchQuery);
//   }, [searchQuery]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setSearchQuery(localSearchQuery); // Update the parent state
    
//     // If user is not on home or products page, navigate to products
//     navigate("/"); 
//   };

//   const handleLogout = () => {
//     setCookie("access_token", "", { path: '/' });
//     window.localStorage.removeItem("userId");
//     window.localStorage.removeItem("userRole");
//     window.location.href = "/";
//   };

//   const token = cookies.access_token;

//   const getUserRole = (token) => {
//     if (!token) return null;
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     return payload.role;
//   };

//   const userRole = getUserRole(token);
//   const dropdownRef = useRef(null);

//   const handleDropdownClick = () => {
//     setIsDropdownVisible(!isDropdownVisible);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownVisible(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   return (
//     <nav className="bg-blue-500 text-white p-4 flex flex-col lg:flex lg:flex-row justify-between items-center relative">
//       <div className='w-full flex flex-row justify-between items-center'>
//         {/* Left side: Store Logo */}
//         <div className="text-2xl font-bold font-mono flex items-center gap-2">
//           <FaStore />
//           <Link to="/">MyStore</Link>
//         </div>
        
//         {/* Search form */}
//         <form onSubmit={handleSearch} className="flex items-center space-x-2 ml-auto mr-4">
//           <input
//             type="text"
//             value={localSearchQuery}
//             onChange={(e) => setLocalSearchQuery(e.target.value)}
//             placeholder="Search products..."
//             className="w-64 px-3 py-1 text-black rounded border border-gray-300"
//           />
//           <button
//             type="submit"
//             className="bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-800"
//           >
//             Search
//           </button>
//         </form>

//         {/* Right side: Cart, Login/Logout */}
//         <div className="flex gap-4 ml-auto items-center"> 
//           {!token ? (
//             <>
//               <Link to="/cart" className="flex items-center gap-2 hover:text-gray-300 transition">
//                 <FaCartShopping size={20} />
//                 Cart
//               </Link>
//               <Link to="/login" className="flex items-center gap-2 hover:text-gray-300 transition">
//                 <FaUser size={20} /> 
//                 Login
//               </Link>
//             </>
//           ) : (
//             <>
//               {userRole === 'partner' && (
//                 <>
//                   <Link to="/pending-order" className="p-4 hover:bg-white hover:text-black rounded-2xl flex items-center gap-2 transition">Order-Details</Link>
//                   <Link to="/update-track" className="p-4 hover:bg-white hover:text-black rounded-2xl flex items-center gap-2 transition">Track</Link>
//                   <div className="relative" ref={dropdownRef}>
//                     <FaUser size={20} onClick={handleDropdownClick} /> 
//                     {isDropdownVisible && (
//                       <div className="absolute bg-white p-7 shadow-md rounded-md mt-2 w-48 z-10 right-0 ">
//                         <p className="text-lg text-center text-black my-2 font-bold">{userRole.toUpperCase()}</p>
//                         <button onClick={handleLogout} className="p-4 bg-red-500 text-white rounded-xl cursor-pointer w-full">
//                           Logout
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </>
//               )}

//               {userRole === 'user' && (
//                 <>
//                   <Link to="/supplier" className="flex items-center gap-2 hover:text-gray-300 transition">
//                     Become a Supplier
//                   </Link>
//                   <Link to="/cart" className="flex items-center gap-2 hover:text-gray-300 transition">
//                     <FaCartShopping size={20} />
//                     Cart
//                   </Link>
//                   <Link to="/myorders" className="flex items-center gap-2 hover:text-gray-300 transition">
//                     <IoBagCheckSharp size={20} />
//                     My Orders
//                   </Link>
//                   <Link to="/wishlist" className="flex items-center gap-2 hover:text-gray-300 transition">
//                     <IoBagCheckSharp size={20} />
//                     Wishlist
//                   </Link>
//                   <Link to="/profile" className="flex items-center gap-2 hover:text-gray-300 transition">
//                     <FaUser size={20} /> 
//                     Profile
//                   </Link>
//                 </>
//               )}

//               {userRole === 'admin' && (
//                 <>
//                   <Link to="/dashboard" className="p-4 hover:bg-white hover:text-black rounded-2xl flex items-center transition">Dashboard</Link>
//                   <div className="relative" ref={dropdownRef}>
//                     <FaUser size={20} onClick={handleDropdownClick} /> 
//                     {isDropdownVisible && (
//                       <div className="absolute bg-white p-7 shadow-md rounded-md mt-2 w-48 z-10 right-0 ">
//                         <p className="text-lg text-center text-black my-2 font-bold">{userRole.toUpperCase()}</p>
//                         <button onClick={handleLogout} className="p-4 bg-red-500 text-white rounded-xl cursor-pointer w-full">
//                           Logout
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </>
//               )}
//               {userRole === 'seller' && (
//                 <>
//                   <Link to="/supplier-dashboard" className="p-4 hover:bg-white hover:text-black rounded-2xl flex items-center transition">Dashboard</Link>
//                   <Link to="/cart" className="flex items-center gap-2 hover:text-gray-300 transition">
//                     <FaCartShopping size={20} />
//                     Cart
//                   </Link>
//                   <Link to="/myorders" className="flex items-center gap-2 hover:text-gray-300 transition">
//                     <IoBagCheckSharp size={20} />
//                     My Orders
//                   </Link>
//                   <Link to="/wishlist" className="flex items-center gap-2 hover:text-gray-300 transition">
//                     <IoBagCheckSharp size={20} />
//                     Wishlist
//                   </Link>
//                   <div className="relative" ref={dropdownRef}>
//                     <FaUser size={20} onClick={handleDropdownClick} /> 
//                     {isDropdownVisible && (
//                       <div className="absolute bg-white p-7 shadow-md rounded-md mt-2 w-48 z-10 right-0 ">
//                         <p className="text-lg text-center text-black my-2 font-bold">{userRole.toUpperCase()}</p>
//                         <button onClick={handleLogout} className="p-4 bg-red-500 text-white rounded-xl cursor-pointer w-full">
//                           Logout
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// mobile and desktop view down code 

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';
import { FaStore } from 'react-icons/fa';
import { IoBagCheckSharp } from "react-icons/io5";
import { useCookies } from 'react-cookie';
import { FaUser } from "react-icons/fa";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const navigate = useNavigate();

  // Update local state when the parent prop changes
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(localSearchQuery); // Update the parent state
    setMobileSearchOpen(false); // Close mobile search after submission
    
    // If user is not on home or products page, navigate to products
    navigate("/"); 
  };

  // Improved logout function
  const handleLogout = (e) => {
    // Stop event propagation to prevent dropdown conflicts
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    console.log("Logout function called");

    try {
      // Clear the cookie with explicit path and other options
      removeCookie("access_token", {
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production', // Only set 'secure' in production
      });
      console.log("Cookie removed");

      // Clear localStorage items
      localStorage.removeItem("userId");
      localStorage.removeItem("userRole");
      console.log("LocalStorage cleared");

      // Close the dropdown
      setIsDropdownVisible(false);
      
      // Close mobile menu if open
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }

      // Navigate back to the homepage (use React Router's navigate function)
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const token = cookies.access_token;

  const getUserRole = (token) => {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    } catch (error) {
      console.error("Error parsing token:", error);
      return null;
    }
  };

  const userRole = getUserRole(token);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const handleDropdownClick = (e) => {
    e.stopPropagation();
    setIsDropdownVisible(!isDropdownVisible);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleMobileSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && mobileMenuOpen) {
        // Check if the click wasn't on the menu toggle button
        if (!event.target.closest('.mobile-menu-toggle')) {
          setMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  // Create logout button component to ensure consistent styling and behavior
  const LogoutButton = ({ className }) => (
    <button
      onClick={handleLogout}
      className={className || "block w-full py-2 bg-blue-500 text-white hover:bg-blue-600 transition cursor-pointer text-center"}
    >
      Logout
    </button>
  );

  return (
    <nav className="bg-blue-500 text-white shadow-md relative">
      {/* Desktop Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="hidden md:flex md:justify-between md:items-center">
          {/* Left side: Store Logo */}
          <div className="text-2xl font-bold font-mono flex items-center gap-2">
            <FaStore />
            <Link to="/">MyStore</Link>
          </div>
          
          {/* Search form */}
          <form onSubmit={handleSearch} className="flex items-center space-x-2 mx-4 flex-grow max-w-md">
            <input
              type="text"
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-3 py-2 text-black rounded-md border border-gray-300"
            />
            <button
              type="submit"
              className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
            >
              Search
            </button>
          </form>

          {/* Right side: Cart, Login/Logout */}
          <div className="flex gap-4 items-center"> 
            {!token ? (
              <>
                <Link to="/cart" className="flex items-center gap-2 hover:text-gray-300 transition py-2">
                  <FaCartShopping size={20} />
                  Cart
                </Link>
                <Link to="/login" className="flex items-center gap-2 hover:text-gray-300 transition py-2">
                  <FaUser size={20} /> 
                  Login
                </Link>
                <Link to="/visit" className="flex items-center gap-2 hover:text-gray-300 transition py-2">
                  <FaUser size={20} /> 
                  Quick
                </Link>
              </>
            ) : (
              <>
                {userRole === 'partner' && (
                  <>
                    <Link to="/pending-order" className="px-3 py-2 hover:bg-white hover:text-blue-500 rounded-lg flex items-center gap-2 transition">Order-Details</Link>
                    <Link to="/update-track" className="px-3 py-2 hover:bg-white hover:text-blue-500 rounded-lg flex items-center gap-2 transition">Track</Link>
                    <div className="relative" ref={dropdownRef}>
                      <button 
                        onClick={handleDropdownClick} 
                        className="flex items-center gap-1 p-2 hover:bg-blue-600 rounded-full transition"
                      >
                        <FaUser size={20} />
                      </button>
                      {isDropdownVisible && (
                        <div className="absolute bg-white shadow-lg rounded-md mt-2 w-48 z-50 right-0 overflow-hidden">
                          <p className="text-base text-center text-black py-3 font-bold bg-gray-100">{userRole.toUpperCase()}</p>
                          <LogoutButton />
                        </div>
                      )}
                    </div>
                  </>
                )}

                {userRole === 'user' && (
                  <>
                    <Link to="/supplier" className="flex items-center gap-2 hover:text-gray-300 transition py-2">
                      Become a Supplier
                    </Link>
                    <Link to="/cart" className="flex items-center gap-2 hover:text-gray-300 transition py-2">
                      <FaCartShopping size={20} />
                      Cart
                    </Link>
                    <Link to="/myorders" className="flex items-center gap-2 hover:text-gray-300 transition py-2">
                      <IoBagCheckSharp size={20} />
                      My Orders
                    </Link>
                    <Link to="/wishlist" className="flex items-center gap-2 hover:text-gray-300 transition py-2">
                      <IoBagCheckSharp size={20} />
                      Wishlist
                    </Link>
                    <Link to="/visit" className="flex items-center gap-2 hover:text-gray-300 transition py-2">
                      <FaUser size={20} /> 
                      Quick
                    </Link>
                    {/* Direct Profile Link - clicking goes directly to profile page */}
                    <Link to="/profile" className="flex items-center gap-1 p-2 hover:bg-blue-600 rounded-full transition">
                      <FaUser size={20} /> 
                      Profile
                    </Link>
                    {/* Separate Logout Button */}
                    {/* <button 
                      onClick={handleLogout}
                      className="flex items-center gap-1 p-2 hover:bg-red-600 bg-red-500 rounded-full transition text-white"
                      title="Logout"
                    >
                      Logout
                    </button> */}
                  </>
                )}

                {userRole === 'admin' && (
                  <>
                    <Link to="/dashboard" className="px-3 py-2 hover:bg-white hover:text-blue-500 rounded-lg flex items-center transition">Dashboard</Link>
                    <div className="relative" ref={dropdownRef}>
                      <button 
                        onClick={handleDropdownClick} 
                        className="flex items-center gap-1 p-2 hover:bg-blue-600 rounded-full transition"
                      >
                        <FaUser size={20} />
                      </button>
                      {isDropdownVisible && (
                        <div className="absolute bg-white shadow-lg rounded-md mt-2 w-48 z-10 right-0 overflow-hidden">
                          <p className="text-base text-center text-black py-3 font-bold bg-gray-100">{userRole.toUpperCase()}</p>
                          <LogoutButton />
                        </div>
                      )}
                    </div>
                  </>
                )}
                {userRole === 'seller' && (
                  <>
                    <Link to="/supplier-dashboard" className="px-3 py-2 hover:bg-white hover:text-blue-500 rounded-lg flex items-center transition">Dashboard</Link>
                    <Link to="/cart" className="flex items-center gap-2 hover:text-gray-300 transition py-2">
                      <FaCartShopping size={20} />
                      Cart
                    </Link>
                    <Link to="/myorders" className="flex items-center gap-2 hover:text-gray-300 transition py-2">
                      <IoBagCheckSharp size={20} />
                      My Orders
                    </Link>
                    <Link to="/wishlist" className="flex items-center gap-2 hover:text-gray-300 transition py-2">
                      <IoBagCheckSharp size={20} />
                      Wishlist
                    </Link>
                    <div className="relative" ref={dropdownRef}>
                      <button 
                        onClick={handleDropdownClick} 
                        className="flex items-center gap-1 p-2 hover:bg-blue-600 rounded-full transition"
                      >
                        <FaUser size={20} />
                      </button>
                      {isDropdownVisible && (
                        <div className="absolute bg-white shadow-lg rounded-md mt-2 w-48 z-50 right-0 overflow-hidden">
                          <p className="text-base text-center text-black py-3 font-bold bg-gray-100">{userRole.toUpperCase()}</p>
                          <LogoutButton className="block w-full py-2 bg-blue-500 text-white hover:bg-blue-600 transition cursor-pointer text-center" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden">
          <div className="flex justify-between items-center py-2">
            {/* Logo */}
            <div className="text-xl font-bold font-mono flex items-center gap-2">
              <FaStore />
              <Link to="/">MyStore</Link>
            </div>

            {/* Mobile Right-side icons */}
            <div className="flex items-center gap-2">
              {/* Search Toggle Button */}
              <button 
                onClick={toggleMobileSearch}
                className="p-2 hover:bg-blue-600 rounded-full"
              >
                <FaSearch size={18} />
              </button>

              {/* Cart Icon for non-authenticated users */}
              {!token && (
                <Link to="/cart" className="p-2 hover:bg-blue-600 rounded-full">
                  <FaCartShopping size={18} />
                </Link>
              )}

              {/* User Profile Icon/Dropdown for authenticated users */}
              {token && (
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={handleDropdownClick}
                    className="p-2 hover:bg-blue-600 rounded-full"
                  >
                    <FaUser size={18} />
                  </button>
                  {isDropdownVisible && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-30 overflow-hidden">
                      <p className="text-base text-center text-black py-2 font-bold bg-gray-100">{userRole?.toUpperCase()}</p>
                      <LogoutButton className="block w-full py-2 bg-blue-500 text-white hover:bg-blue-600 transition cursor-pointer text-center" />
                    </div>
                  )}
                </div>
              )}

              {/* Menu Toggle Button */}
              <button 
                onClick={toggleMobileMenu} 
                className="mobile-menu-toggle p-2 hover:bg-blue-600 rounded-full"
              >
                {mobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {mobileSearchOpen && (
            <div className="py-2 pb-3 px-1 bg-blue-500">
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-grow px-3 py-2 text-black rounded-l-md border-0"
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-blue-700 text-white px-4 py-2 rounded-r-md hover:bg-blue-800"
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-sm z-20 md:hidden overflow-y-auto pt-16 shadow-lg"
        >
          <div className="container mx-auto px-4 py-4 bg-white bg-opacity-40 rounded-t-2xl shadow-inner backdrop-blur-sm">
            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 text-blue-600 hover:text-blue-800 transition-colors"
              aria-label="Close menu"
            >
              <FaTimes size={24} />
            </button>
            
            {/* Divider */}
            <div className="border-b border-gray-200 mb-4 mt-8"></div>
            
            {/* Mobile Menu Links */}
            <div className="flex flex-col space-y-2">
              {!token ? (
                <>
                  <Link 
                    to="/login" 
                    className="flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-blue-50 rounded-lg transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaUser size={20} className="text-blue-600" />
                    <span className="font-medium">Login</span>
                  </Link>
                  <Link 
                    to="/cart" 
                    className="flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-blue-50 rounded-lg transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaCartShopping size={20} className="text-blue-600" />
                    <span className="font-medium">Cart</span>
                  </Link>
                </>
              ) : (
                <>
                  {/* Menu items based on user role */}
                  {userRole === 'partner' && (
                    <>
                      <Link 
                        to="/pending-order" 
                        className="flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-blue-50 rounded-lg transition"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FaUser size={20} className="text-blue-600" />
                        <span className="font-medium">Order Details</span>
                      </Link>
                      <Link 
                        to="/update-track" 
                        className="flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-blue-50 rounded-lg transition"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FaUser size={20} className="text-blue-600" />
                        <span className="font-medium">Track</span>
                      </Link>
                    </>
                  )}

                  {userRole === 'user' && (
                    <>
                      <Link 
                        to="/supplier" 
                        className="flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-blue-50 rounded-lg transition"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FaUser size={20} className="text-blue-600" />
                        <span className="font-medium">Become a Supplier</span>
                      </Link>
                      <Link 
                        to="/cart" 
                        className="flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-blue-50 rounded-lg transition"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FaCartShopping size={20} className="text-blue-600" />
                        <span className="font-medium">Cart</span>
                      </Link>
                      <Link 
                        to="/myorders" 
                        className="flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-blue-50 rounded-lg transition"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <IoBagCheckSharp size={20} className="text-blue-600" />
                        <span className="font-medium">My Orders</span>
                      </Link>
                      <Link 
                        to="/wishlist" 
                        className="flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-blue-50 rounded-lg transition"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <IoBagCheckSharp size={20} className="text-blue-600" />
                        <span className="font-medium">Wishlist</span>
                      </Link>
                      <Link 
                        to="/profile" 
                        className="flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-blue-50 rounded-lg transition"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FaUser size={20} className="text-blue-600" />
                        <span className="font-medium">Profile</span>
                      </Link>
                    </>
                  )}

                  {userRole === 'admin' && (
                    <Link 
                      to="/dashboard" 
                      className="flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-blue-50 rounded-lg transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaUser size={20} className="text-blue-600" />
                      <span className="font-medium">Dashboard</span>
                    </Link>
                  )}

                  {userRole === 'seller' && (
                    <>
                      <Link 
                        to="/supplier-dashboard" 
                        className="flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-blue-50 rounded-lg transition"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FaUser size={20} className="text-blue-600" />
                        <span className="font-medium">Dashboard</span>
                      </Link>
                      <Link 
                        to="/cart" 
                        className="flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-blue-50 rounded-lg transition"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FaCartShopping size={20} className="text-blue-600" />
                        <span className="font-medium">Cart</span>
                      </Link>
                      <Link 
                        to="/myorders" 
                        className="flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-blue-50 rounded-lg transition"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <IoBagCheckSharp size={20} className="text-blue-600" />
                        <span className="font-medium">My Orders</span>
                      </Link>
                      <Link 
                        to="/wishlist" 
                        className="flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-blue-50 rounded-lg transition"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <IoBagCheckSharp size={20} className="text-blue-600" />
                        <span className="font-medium">Wishlist</span>
                      </Link>
                    </>
                  )}
                  
                  {/* Divider before logout */}
                  <div className="border-b border-gray-200 my-2"></div>
                  
                  {/* Logout Button for all authenticated users */}
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 mt-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition"
                  >
                    <FaUser size={20} />
                    <span className="font-medium">Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;