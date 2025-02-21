import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const ProductPage = ({ activeCategory, priceRange, rating, discount, products }) => {
  const [searchQuery, setSearchQuery] = useState(""); // Add state for search query
  const navigate = useNavigate(); // Initialize the navigate function

  const filterByCategory = (product) => {
    if (activeCategory === "All Categories") return true;
    return product.category === activeCategory;
  };

  const filterByPriceRange = (product) => {
    if (priceRange === "All Price") return true; // No price filtering when "All Price" is selected
    const [min, max] = priceRange.split("-").map(Number);
    return product.price >= min && (max ? product.price <= max : true);
  };

  const filterByRating = (product) => {
    if (rating === "All Ratings") return true;
    const ratingValue = parseInt(rating.split(" ")[0]); // Extract the rating value from "X Stars & Up"
    return product.rating >= ratingValue;
  };

  const filterByDiscount = (product) => {
    if (discount === "All Discounts") return true;
    const discountValue = parseInt(discount.split("%")[0]); // Extract discount value
    return product.discountPercentage >= discountValue;
  };

  const filterBySearchQuery = (product) => {
    return product.title.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const filteredProducts = products
    .filter(filterByCategory)
    .filter(filterByPriceRange)
    .filter(filterByRating) // Apply rating filter
    .filter(filterByDiscount) // Apply discount filter
    .filter(filterBySearchQuery); // Apply the search filter

  return (
    <div className="p-4 mt-6">
      <div className="flex flex-col sm:flex-row justify-between w-full mb-4">
        <h1 className="text-2xl font-bold capitalize sm:w-2/3">{activeCategory}</h1>
        <div className="flex items-center gap-2 sm:w-1/3">
          <FaSearch size={20} />
          <input
            type="text"
            placeholder="Search products..."
            className="border rounded-lg p-2 w-full"
            value={searchQuery} // Bind input value to the searchQuery state
            onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state on input change
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="cursor-pointer border rounded-lg shadow-md p-4 hover:shadow-lg transition"
              onClick={() => navigate(`/product/${product._id}`)} // Navigate to product detail page
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-48 object-contain rounded-md mb-3"
              />
              <h2 className="font-semibold text-lg">{product.title}</h2>
              <p className="text-gray-600">
                Category: {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-gray-900 font-bold mt-2 flex items-center">
                  <MdCurrencyRupee size={20} />
                  {product.price}
                </p>
                <p className="bg-green-600 text-white mt-2 p-1 rounded-lg">
                  {product.rating}⭐
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-600 text-center col-span-full">
            No products found for this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
