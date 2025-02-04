import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiCategory } from 'react-icons/bi';
import { FaCartShopping } from 'react-icons/fa6';
import { FaStore } from 'react-icons/fa';
import { IoBagCheckSharp } from "react-icons/io5";



const Navbar = ({ setActiveSection, onSearch }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const categories = ['All Categories', 'Clothes', 'Jewellery', 'Home Furnishing'];
  const navigate = useNavigate();
  

  const dropdownRef = useRef(null);
  
  const handleCategoryClick = (category) => {
    setActiveSection(category.toLowerCase());
    navigate('/'); 
    setDropdownOpen(false); 
  };

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-blue-500 text-white p-4 flex flex-col lg:flex lg:flex-row justify-between items-center relative">
   
      <div className='w-full flex flex-row justify-between '>
      <div className="text-2xl font-bold font-mono flex items-center gap-2">
        <FaStore />
        <Link to="/">MyStore</Link>
      </div>


      <button
        className="lg:hidden text-white focus:outline-none"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      </div>

      <div className={`lg:flex lg:justify-end ${mobileMenuOpen ? 'block' : 'hidden'} flex-col items-center gap-6 w-full`}>

        <div className="flex flex-col gap-4 items-center w-full mt-4 lg:flex-row lg:justify-end lg:mt-0">
     
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-2 hover:text-gray-300 transition"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <BiCategory size={20} />
              Categories
            </button>
            {dropdownOpen && (
              <ul className="absolute bg-white text-black shadow-md rounded-md mt-2 w-48 z-10">
                {categories.map((category) => (
                  <li
                    key={category}
                    className="px-4 py-2 hover:bg-blue-500 hover:text-white transition cursor-pointer"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            )}
          </div>

  
          <Link to="/cart" className="flex items-center gap-2 hover:text-gray-300 transition">
            <FaCartShopping size={20} />
            Cart
          </Link>

   
          <Link to="/myorders" className="flex items-center gap-2 hover:text-gray-300 transition">
            <IoBagCheckSharp size={20} />
            My Orders
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;