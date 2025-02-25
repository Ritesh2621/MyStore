import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // Assuming you're using axios for HTTP requests

const MenuBar = () => {
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
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
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/product"); // Adjust URL if needed
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

          // **Remove duplicate subsubcategories**
          if (subsubcategory && !subcategoryObj.subsubcategories.includes(subsubcategory)) {
            subcategoryObj.subsubcategories.push(subsubcategory);
          }
        });

        setCategories(organizedCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

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

  const handleSubsubcategoryClick = async (subsubcategory) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/product/products-by-subsubcategory/${subsubcategory}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products for subsubcategory:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <nav className="bg-white border-b shadow-sm" role="navigation" aria-label="Main navigation">
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

      {/* Display the products based on selected subsubcategory */}
      <div className="mt-4">
        {loading && <p>Loading products...</p>}
        {!loading && products.length === 0 && <p>No products found for this subsubcategory.</p>}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-lg">
                <img src={product.images[0]} alt={product.title} className="w-full h-48 object-contain mb-4" />
                <h4 className="text-xl font-semibold">{product.title}</h4>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-sm text-gray-800 mt-2">Price: ${product.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuBar;
