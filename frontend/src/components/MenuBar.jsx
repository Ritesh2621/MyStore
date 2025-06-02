// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios"; // Assuming you're using axios for HTTP requests
// import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

// const MenuBar = () => {
//   const [categories, setCategories] = useState([]);
//   const [openCategory, setOpenCategory] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const menuRef = useRef(null);
//   const dropdownRef = useRef(null);
//   const timeoutRef = useRef(null);
//   const navigate = useNavigate(); // Initialize the navigate function

//   const handleMouseEnter = (categoryName) => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     setOpenCategory(categoryName);
//   };

//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => setOpenCategory(null), 100);
//   };

//   const adjustDropdownPosition = () => {
//     if (dropdownRef.current) {
//       const rect = dropdownRef.current.getBoundingClientRect();
//       if (rect.right > window.innerWidth) {
//         dropdownRef.current.style.left = "auto";
//         dropdownRef.current.style.right = "0";
//       } else {
//         dropdownRef.current.style.left = "0";
//         dropdownRef.current.style.right = "auto";
//       }
//     }
//   };

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("http://localhost:4000/product"); 
//         const products = response.data;

//         const organizedCategories = [];

//         products.forEach((product) => {
//           const { category, subcategory, subsubcategory } = product;

//           let categoryObj = organizedCategories.find((cat) => cat.name === category);
//           if (!categoryObj) {
//             categoryObj = { name: category, subcategories: [] };
//             organizedCategories.push(categoryObj);
//           }

//           let subcategoryObj = categoryObj.subcategories.find((sub) => sub.title === subcategory);
//           if (!subcategoryObj) {
//             subcategoryObj = { title: subcategory, subsubcategories: [] };
//             categoryObj.subcategories.push(subcategoryObj);
//           }

//           if (subsubcategory && !subcategoryObj.subsubcategories.includes(subsubcategory)) {
//             subcategoryObj.subsubcategories.push(subsubcategory);
//           }
//         });

//         setCategories(organizedCategories);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleSubsubcategoryClick = (subsubcategory) => {
//     setLoading(true);
//     // Pass the subsubcategory as a state to ProductPage
//     navigate("/", { state: { subsubcategory } });
//   };

//   const handleAllCategoriesClick = () => {
//     // Navigate to the ProductPage without any filters
//     navigate("/", { state: { subsubcategory: null } });
//   };

//   return (
//     <div>
//       <nav className="bg-white border-b shadow-sm" role="navigation" aria-label="Main navigation">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex justify-start space-x-6 h-14" ref={menuRef}>
//             <button
//               className="inline-flex items-center px-4 py-2 text-sm font-medium transition duration-200 rounded-md h-14 text-gray-700 hover:text-blue-600"
//               onClick={handleAllCategoriesClick}
//             >
//               All Categories
//             </button>
//             {categories.map((category, index) => (
//               <div
//                 key={index}
//                 className="relative inline-block text-left"
//                 onMouseEnter={() => handleMouseEnter(category.name)}
//                 onMouseLeave={handleMouseLeave}
//               >
//                 <button
//                   className={`inline-flex items-center px-4 py-2 text-sm font-medium transition duration-200 rounded-md h-14 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                     openCategory === category.name ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
//                   }`}
//                   onClick={() => setOpenCategory(openCategory === category.name ? null : category.name)}
//                   aria-expanded={openCategory === category.name}
//                   aria-controls={`menu-${category.name}`}
//                   aria-haspopup="true"
//                 >
//                   {category.name}
//                 </button>

//                 {openCategory === category.name && (
//                   <div
//                     ref={dropdownRef}
//                     id={`menu-${category.name}`}
//                     className="absolute left-0 mt-1 w-max z-50 bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-auto max-h-96 rounded-lg"
//                     role="menu"
//                     aria-orientation="vertical"
//                   >
//                     <div className="relative p-4 grid grid-cols-2 gap-6">
//                       {category.subcategories.map((sub, subIndex) => (
//                         <div key={subIndex} className="min-w-[180px]">
//                           <h3 className="text-sm font-semibold text-gray-900 mb-2">{sub.title}</h3>
//                           <ul className="space-y-1" role="group">
//                             {sub.subsubcategories.map((subsub, subsubIndex) => (
//                               <li key={subsubIndex}>
//                                 <button
//                                   className="block text-xs py-1 px-2 rounded-md transition-colors duration-150 text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                   onClick={() => handleSubsubcategoryClick(subsub)}
//                                 >
//                                   {subsub}
//                                 </button>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default MenuBar;



// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const MenuBar = () => {
//   const [categories, setCategories] = useState([]);
//   const [openCategory, setOpenCategory] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showAllCategories, setShowAllCategories] = useState(false);
//   const menuRef = useRef(null);
//   const dropdownRef = useRef(null);
//   const allCategoriesRef = useRef(null);
//   const timeoutRef = useRef(null);
//   const navigate = useNavigate();

//   const handleMouseEnter = (categoryName) => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     if (categoryName === "all") {
//       setShowAllCategories(true);
//       setOpenCategory(null);
//     } else {
//       setOpenCategory(categoryName);
//       setShowAllCategories(false);
//     }
//   };

//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => {
//       setOpenCategory(null);
//       setShowAllCategories(false);
//     }, 100);
//   };

//   const adjustDropdownPosition = () => {
//     if (dropdownRef.current) {
//       const rect = dropdownRef.current.getBoundingClientRect();
//       if (rect.right > window.innerWidth) {
//         dropdownRef.current.style.left = "auto";
//         dropdownRef.current.style.right = "0";
//       } else {
//         dropdownRef.current.style.left = "0";
//         dropdownRef.current.style.right = "auto";
//       }
//     }
//   };

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("http://localhost:4000/product"); 
//         const products = response.data;

//         const organizedCategories = [];

//         products.forEach((product) => {
//           const { category, subcategory, subsubcategory } = product;

//           let categoryObj = organizedCategories.find((cat) => cat.name === category);
//           if (!categoryObj) {
//             categoryObj = { name: category, subcategories: [] };
//             organizedCategories.push(categoryObj);
//           }

//           let subcategoryObj = categoryObj.subcategories.find((sub) => sub.title === subcategory);
//           if (!subcategoryObj) {
//             subcategoryObj = { title: subcategory, subsubcategories: [] };
//             categoryObj.subcategories.push(subcategoryObj);
//           }

//           if (subsubcategory && !subcategoryObj.subsubcategories.includes(subsubcategory)) {
//             subcategoryObj.subsubcategories.push(subsubcategory);
//           }
//         });

//         setCategories(organizedCategories);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleSubsubcategoryClick = (subsubcategory) => {
//     setLoading(true);
//     // Pass the subsubcategory as a state to ProductPage
//     navigate("/", { state: { subsubcategory } });
//     setOpenCategory(null);
//     setShowAllCategories(false);
//   };

//   const handleAllCategoriesClick = () => {
//     // Navigate to the ProductPage without any filters
//     navigate("/", { state: { subsubcategory: null } });
//     setShowAllCategories(false);
//   };

//   return (
//     <div>
//       <nav className="bg-white border-b shadow-sm" role="navigation" aria-label="Main navigation">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex justify-start space-x-6 h-14" ref={menuRef}>
//             {/* All Categories Button */}
//             <div
//               className="relative inline-block text-left"
//               onMouseEnter={() => handleMouseEnter("all")}
//               onMouseLeave={handleMouseLeave}
//               ref={allCategoriesRef}
//             >
//               <button
//                 className={`inline-flex items-center px-4 py-2 text-sm font-medium transition duration-200 rounded-md h-14 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   showAllCategories ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
//                 }`}
//                 onClick={() => setShowAllCategories(!showAllCategories)}
//                 aria-expanded={showAllCategories}
//                 aria-controls="menu-all-categories"
//                 aria-haspopup="true"
//               >
//                 All Categories
//               </button>

//               {/* All Categories Dropdown */}
//               {showAllCategories && (
//                 <div
//                   id="menu-all-categories"
//                   className="absolute left-0 mt-1 z-50 bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-auto max-h-96 rounded-lg"
//                   style={{ width: "max-content", minWidth: "200px" }}
//                   role="menu"
//                   aria-orientation="vertical"
//                 >
//                   <div className="relative p-4">
//                     <ul className="space-y-2">
//                       {categories.map((category, catIndex) => (
//                         <li key={catIndex}>
//                           <button
//                             className="block w-full text-left py-2 px-3 rounded-md transition-colors duration-150 text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             onClick={() => {
//                               setOpenCategory(category.name);
//                               setShowAllCategories(false);
//                             }}
//                           >
//                             {category.name}
//                           </button>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                   <div className="bg-gray-50 p-2 border-t">
//                     {/* <button
//                       onClick={handleAllCategoriesClick}
//                       className="w-full text-center text-sm py-1 font-medium text-blue-600 hover:text-blue-800"
//                     >
//                       V
//                     </button> */}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Individual Category Buttons */}
//             {categories.map((category, index) => (
//               <div
//                 key={index}
//                 className="relative inline-block text-left"
//                 onMouseEnter={() => handleMouseEnter(category.name)}
//                 onMouseLeave={handleMouseLeave}
//               >
//                 <button
//                   className={`inline-flex items-center px-4 py-2 text-sm font-medium transition duration-200 rounded-md h-14 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                     openCategory === category.name ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
//                   }`}
//                   onClick={() => setOpenCategory(openCategory === category.name ? null : category.name)}
//                   aria-expanded={openCategory === category.name}
//                   aria-controls={`menu-${category.name}`}
//                   aria-haspopup="true"
//                 >
//                   {category.name}
//                 </button>

//                 {openCategory === category.name && (
//                   <div
//                     ref={dropdownRef}
//                     id={`menu-${category.name}`}
//                     className="absolute left-0 mt-1 w-max z-50 bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-auto max-h-96 rounded-lg"
//                     role="menu"
//                     aria-orientation="vertical"
//                   >
//                     <div className="relative p-4 grid grid-cols-2 gap-6">
//                       {category.subcategories.map((sub, subIndex) => (
//                         <div key={subIndex} className="min-w-[180px]">
//                           <h3 className="text-sm font-semibold text-gray-900 mb-2">{sub.title}</h3>
//                           <ul className="space-y-1" role="group">
//                             {sub.subsubcategories.map((subsub, subsubIndex) => (
//                               <li key={subsubIndex}>
//                                 <button
//                                   className="block text-xs py-1 px-2 rounded-md transition-colors duration-150 text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                   onClick={() => handleSubsubcategoryClick(subsub)}
//                                 >
//                                   {subsub}
//                                 </button>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default MenuBar;

// this is the movile view code below 

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MenuBar = () => {
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubcategory, setMobileSubcategory] = useState(null);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);
  const allCategoriesRef = useRef(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseEnter = (categoryName) => {
    // Only apply hover effects on desktop
    if (window.innerWidth >= 768) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (categoryName === "all") {
        setShowAllCategories(true);
        setOpenCategory(null);
      } else {
        setOpenCategory(categoryName);
        setShowAllCategories(false);
      }
    }
  };

  const handleMouseLeave = () => {
    // Only apply hover effects on desktop
    if (window.innerWidth >= 768) {
      timeoutRef.current = setTimeout(() => {
        setOpenCategory(null);
        setShowAllCategories(false);
      }, 100);
    }
  };

  const adjustDropdownPosition = () => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      if (rect.right > window.innerWidth) {
        dropdownRef.current.style.left = "auto";
        dropdownRef.current.style.right = "0";
      } else {
        dropdownRef.current.style.left = "0";
        dropdownRef.current.style.right = "auto";
      }
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:4000/product"); 
        const products = response.data;

        const organizedCategories = [];

        products.forEach((product) => {
          const { category, subcategory, subsubcategory } = product;

          let categoryObj = organizedCategories.find((cat) => cat.name === category);
          if (!categoryObj) {
            categoryObj = { name: category, subcategories: [] };
            organizedCategories.push(categoryObj);
          }

          let subcategoryObj = categoryObj.subcategories.find((sub) => sub.title === subcategory);
          if (!subcategoryObj) {
            subcategoryObj = { title: subcategory, subsubcategories: [] };
            categoryObj.subcategories.push(subcategoryObj);
          }

          if (subsubcategory && !subcategoryObj.subsubcategories.includes(subsubcategory)) {
            subcategoryObj.subsubcategories.push(subsubcategory);
          }
        });

        setCategories(organizedCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubsubcategoryClick = (subsubcategory) => {
    setLoading(true);
    // Pass the subsubcategory as a state to ProductPage
    navigate("/", { state: { subsubcategory } });
    setOpenCategory(null);
    setShowAllCategories(false);
    setMobileMenuOpen(false);
  };

  const handleAllCategoriesClick = () => {
    // Navigate to the ProductPage without any filters
    navigate("/", { state: { subsubcategory: null } });
    setShowAllCategories(false);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setMobileSubcategory(null);
  };

  const toggleMobileCategory = (categoryName) => {
    setMobileSubcategory(mobileSubcategory === categoryName ? null : categoryName);
  };

  return (
    <div>
      {/* Desktop Navigation */}
      <nav className="bg-white border-b shadow-sm hidden md:block" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-start space-x-6 h-14" ref={menuRef}>
            {/* All Categories Button */}
            <div
              className="relative inline-block text-left"
              onMouseEnter={() => handleMouseEnter("all")}
              onMouseLeave={handleMouseLeave}
              ref={allCategoriesRef}
            >
              <button
                className={`inline-flex items-center px-4 py-2 text-sm font-medium transition duration-200 rounded-md h-14 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  showAllCategories ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
                onClick={() => setShowAllCategories(!showAllCategories)}
                aria-expanded={showAllCategories}
                aria-controls="menu-all-categories"
                aria-haspopup="true"
              >
                All Categories
              </button>

              {/* All Categories Dropdown */}
              {showAllCategories && (
                <div
                  id="menu-all-categories"
                  className="absolute left-0 mt-1 z-50 bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-auto max-h-96 rounded-lg"
                  style={{ width: "max-content", minWidth: "200px" }}
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="relative p-4">
                    <ul className="space-y-2">
                      {categories.map((category, catIndex) => (
                        <li key={catIndex}>
                          <button
                            className="block w-full text-left py-2 px-3 rounded-md transition-colors duration-150 text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={() => {
                              setOpenCategory(category.name);
                              setShowAllCategories(false);
                            }}
                          >
                            {category.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-2 border-t">
                    {/* <button
                      onClick={handleAllCategoriesClick}
                      className="w-full text-center text-sm py-1 font-medium text-blue-600 hover:text-blue-800"
                    >
                      V
                    </button> */}
                  </div>
                </div>
              )}
            </div>

            {/* Individual Category Buttons */}
            {categories.map((category, index) => (
              <div
                key={index}
                className="relative inline-block text-left"
                onMouseEnter={() => handleMouseEnter(category.name)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium transition duration-200 rounded-md h-14 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    openCategory === category.name ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`}
                  onClick={() => setOpenCategory(openCategory === category.name ? null : category.name)}
                  aria-expanded={openCategory === category.name}
                  aria-controls={`menu-${category.name}`}
                  aria-haspopup="true"
                >
                  {category.name}
                </button>

                {openCategory === category.name && (
                  <div
                    ref={dropdownRef}
                    id={`menu-${category.name}`}
                    className="absolute left-0 mt-1 w-max z-50 bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-auto max-h-96 rounded-lg"
                    role="menu"
                    aria-orientation="vertical"
                  >
                    <div className="relative p-4 grid grid-cols-2 gap-6">
                      {category.subcategories.map((sub, subIndex) => (
                        <div key={subIndex} className="min-w-[180px]">
                          <h3 className="text-sm font-semibold text-gray-900 mb-2">{sub.title}</h3>
                          <ul className="space-y-1" role="group">
                            {sub.subsubcategories.map((subsub, subsubIndex) => (
                              <li key={subsubIndex}>
                                <button
                                  className="block text-xs py-1 px-2 rounded-md transition-colors duration-150 text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onClick={() => handleSubsubcategoryClick(subsub)}
                                >
                                  {subsub}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="bg-white border-b shadow-sm md:hidden" role="navigation" aria-label="Mobile navigation">
        <div className="px-4">
          <div className="flex justify-between items-center h-14">
            {/* Mobile Menu Button */}
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="text-gray-700 font-medium">Categories</div>
            <div className="w-10"></div> {/* Empty space for alignment */}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="px-2 pt-2 pb-4 bg-white shadow-lg">
            {/* All Categories Button */}
            <button
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 mb-1"
              onClick={handleAllCategoriesClick}
            >
              All Categories
            </button>
            
            {/* Individual Category Accordions */}
            <div className="space-y-1">
              {categories.map((category, index) => (
                <div key={index} className="border-t border-blue-100">
                  <button
                    className="w-full flex justify-between items-center px-3 py-2 text-base font-medium text-black-700 hover:text-blue-600 hover:bg-blue-50"
                    onClick={() => toggleMobileCategory(category.name)}
                    aria-expanded={mobileSubcategory === category.name}
                  >
                    <span>{category.name}</span>
                    <svg
                      className={`h-5 w-5 transform transition-transform ${mobileSubcategory === category.name ? 'rotate-180' : ''}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  
                  {/* Subcategories */}
                  {mobileSubcategory === category.name && (
                    <div className="pl-4 pr-2 py-2 bg-gray-50">
                      {category.subcategories.map((sub, subIndex) => (
                        <div key={subIndex} className="mb-4">
                          <h3 className="px-2 py-1 text-sm font-semibold text-gray-900">{sub.title}</h3>
                          <ul className="pl-2 space-y-1">
                            {sub.subsubcategories.map((subsub, subsubIndex) => (
                              <li key={subsubIndex}>
                                <button
                                  className="w-full text-left py-1 px-2 text-sm text-black-600 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                                  onClick={() => handleSubsubcategoryClick(subsub)}
                                >
                                  {subsub}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default MenuBar;



