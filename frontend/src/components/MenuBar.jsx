import React, { useState, useRef, useEffect } from "react";

const categories = [
  {
    name: "Clothes",
    subcategories: [
      {
        title: "Men",
        items: ["Cotton Shirt", "Formal Shirts", "Casual T-Shirts", "Jeans", "Trousers", "Blazers", "Jackets", "Ethnic Wear"],
      },
      {
        title: "Women",
        items: ["All Sarees", "Silk Sarees", "Banarasi Silk Sarees", "Cotton Sarees", "Georgette Sarees", "Chiffon Sarees", "Salwar Kameez", "Lehengas"],
      },
    ],
  },
  {
    name: "Home Furnishing",
    subcategories: [
      {
        title: "Bed Sheets & Pillow Covers",
        items: ["Cotton Bed Sheets", "Silk Bed Sheets", "Satin Pillow Covers", "Printed Bedsheets", "Embroidered Bed Covers", "Duvet Covers", "Quilts"],
      },
      {
        title: "Curtains & Rugs",
        items: ["Window Curtains", "Door Curtains", "Cotton Rugs", "Woolen Carpets", "Doormats"],
      },
    ],
  },
  {
    name: "Jewellery",
    subcategories: [
      {
        title: "Bracelets",
        items: ["Gold Bracelets", "Silver Bracelets", "Diamond Bracelets", "Charm Bracelets", "Beaded Bracelets"],
      },
      {
        title: "Earrings",
        items: ["Stud Earrings", "Hoop Earrings", "Drop Earrings", "Jhumkas", "Chandbalis"],
      },
      {
        title: "Watches",
        items: ["Analog Watches", "Digital Watches", "Smartwatches", "Luxury Watches", "Casual Watches"],
      },
    ],
  },
];

const MenuBar = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = (categoryName) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenCategory(categoryName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenCategory(null), 100);
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
    adjustDropdownPosition();
  }, [openCategory]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenCategory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b shadow-sm " role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-start space-x-6 h-14" ref={menuRef}>
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
                          {sub.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <a
                                href="#"
                                className="block text-xs py-1 px-2 rounded-md transition-colors duration-150 text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                role="menuitem"
                              >
                                {item}
                              </a>
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
  );
};

export default MenuBar;
