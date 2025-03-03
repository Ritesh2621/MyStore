import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';
import { FaStore } from 'react-icons/fa';
import { IoBagCheckSharp } from "react-icons/io5";
import { useCookies } from 'react-cookie';
import { FaUser } from "react-icons/fa";

const Navbar = ({ onSearch }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [cookies, setCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCookie("access_token", "", { path: '/' });
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("userRole");
    window.location.href = "/";
  };

  const token = cookies.access_token;

  const getUserRole = (token) => {
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  };

  const userRole = getUserRole(token);
  const dropdownRef = useRef(null);

  const handleDropdownClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-blue-500 text-white p-4 flex flex-col lg:flex lg:flex-row justify-between items-center relative">
      <div className='w-full flex flex-row justify-between items-center'>
        {/* Left side: Store Logo */}
        <div className="text-2xl font-bold font-mono flex items-center gap-2">
          <FaStore />
          <Link to="/">MyStore</Link>
        </div>

        {/* Right side: Cart, Login/Logout */}
        <div className="flex gap-4 ml-auto items-center"> 
          {!token ? (
            <>
              <Link to="/cart" className="flex items-center gap-2 hover:text-gray-300 transition">
                <FaCartShopping size={20} />
                Cart
              </Link>
              <Link to="/login" className="flex items-center gap-2 hover:text-gray-300 transition">
                <FaUser size={20} /> 
                Login
              </Link>
            </>
          ) : (
            <>
              {userRole === 'partner' && (
                <>
                  <Link to="/pending-order" className="p-4 hover:bg-white hover:text-black rounded-2xl flex items-center gap-2 transition">Order-Details</Link>
                  <Link to="/update-track" className="p-4 hover:bg-white hover:text-black rounded-2xl flex items-center gap-2 transition">Track</Link>
                  <div className="relative" ref={dropdownRef}>
                    <FaUser size={20} onClick={handleDropdownClick} /> 
                    {isDropdownVisible && (
                      <div className="absolute bg-white p-7 shadow-md rounded-md mt-2 w-48 z-10 right-0 ">
                        <p className="text-lg text-center text-black my-2 font-bold">{userRole.toUpperCase()}</p>
                        <button onClick={handleLogout} className="p-4 bg-red-500 text-white rounded-xl cursor-pointer w-full">
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}

              {userRole === 'user' && (
                <>
                  <Link to="/supplier" className="flex items-center gap-2 hover:text-gray-300 transition">
                    Become a Supplier
                  </Link>
                  <Link to="/cart" className="flex items-center gap-2 hover:text-gray-300 transition">
                    <FaCartShopping size={20} />
                    Cart
                  </Link>
                  <Link to="/myorders" className="flex items-center gap-2 hover:text-gray-300 transition">
                    <IoBagCheckSharp size={20} />
                    My Orders
                  </Link>
                  <Link to="/wishlist" className="flex items-center gap-2 hover:text-gray-300 transition">
                    <IoBagCheckSharp size={20} />
                    Wishlist
                  </Link>
                  <Link to="/profile" className="flex items-center gap-2 hover:text-gray-300 transition">
                    <FaUser size={20} /> 
                    Profile
                  </Link>
                </>
              )}

              {userRole === 'admin' && (
                <>
                  <Link to="/dashboard" className="p-4 hover:bg-white hover:text-black rounded-2xl flex items-center transition">Dashboard</Link>
                  <div className="relative" ref={dropdownRef}>
                    <FaUser size={20} onClick={handleDropdownClick} /> 
                    {isDropdownVisible && (
                      <div className="absolute bg-white p-7 shadow-md rounded-md mt-2 w-48 z-10 right-0 ">
                        <p className="text-lg text-center text-black my-2 font-bold">{userRole.toUpperCase()}</p>
                        <button onClick={handleLogout} className="p-4 bg-red-500 text-white rounded-xl cursor-pointer w-full">
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
              {userRole === 'seller' && (
                <>
                  <Link to="/supplier-dashboard" className="p-4 hover:bg-white hover:text-black rounded-2xl flex items-center transition">Dashboard</Link>
                  <Link to="/cart" className="flex items-center gap-2 hover:text-gray-300 transition">
                    <FaCartShopping size={20} />
                    Cart
                  </Link>
                  <Link to="/myorders" className="flex items-center gap-2 hover:text-gray-300 transition">
                    <IoBagCheckSharp size={20} />
                    My Orders
                  </Link>
                  <Link to="/wishlist" className="flex items-center gap-2 hover:text-gray-300 transition">
                    <IoBagCheckSharp size={20} />
                    Wishlist
                  </Link>
                  <div className="relative" ref={dropdownRef}>
                    <FaUser size={20} onClick={handleDropdownClick} /> 
                    {isDropdownVisible && (
                      <div className="absolute bg-white p-7 shadow-md rounded-md mt-2 w-48 z-10 right-0 ">
                        <p className="text-lg text-center text-black my-2 font-bold">{userRole.toUpperCase()}</p>
                        <button onClick={handleLogout} className="p-4 bg-red-500 text-white rounded-xl cursor-pointer w-full">
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
