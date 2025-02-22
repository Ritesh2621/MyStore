import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ProductPage = ({
  selectedCategories,
  selectedPriceRanges,
  selectedRatings,
  selectedDiscounts,
  products,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filterProducts = (product) => {
    // Filter by Category
    if (selectedCategories.length > 0 && !selectedCategories.includes("All Categories") && !selectedCategories.includes(product.category)) {
      return false;
    }

    // Filter by Price Range
    if (selectedPriceRanges.length > 0 && !selectedPriceRanges.includes("All Price") &&
        !selectedPriceRanges.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return product.price >= min && (max ? product.price <= max : true);
        })) {
      return false;
    }

    // Filter by Rating
    if (selectedRatings.length > 0 && !selectedRatings.includes("All Ratings") &&
        !selectedRatings.some((rating) => {
          const ratingValue = parseInt(rating.split(" ")[0]);
          return product.rating >= ratingValue;
        })) {
      return false;
    }

    // Filter by Discount
    if (selectedDiscounts.length > 0 && !selectedDiscounts.includes("All Discounts") &&
        !selectedDiscounts.some((discount) => {
          const discountValue = parseInt(discount.split("%")[0]);
          return product.discountPercentage >= discountValue;
        })) {
      return false;
    }

    // Filter by Search Query
    if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  };

  // Filtered products based on the applied filters
  const filteredProducts = products.filter(filterProducts);

  return (
    <div className="w-full p-6">
      {/* Search Box */}
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Search for products..."
          className="border p-2 rounded-lg w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="ml-2 text-xl">
          <FaSearch />
        </button>
      </div>

      {/* No Products Available Message */}
      {filteredProducts.length === 0 ? (
        <div className="text-center text-xl text-gray-600 mt-6">
          <p>No products available for this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow-lg"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-48 object-contain rounded-md mb-3"
              />
              <h3 className="mt-2 font-semibold text-lg">{product.title}</h3>
              <div className="flex justify-between mt-2">
                <div className="flex items-center">
                  <MdCurrencyRupee className="text-sm" />
                  <span className="text-xl">{product.price}</span>
                </div>
                {product.discountPercentage > 0 && (
                  <span className="bg-green-600 text-white mt-2 px-2 py-1 rounded-lg">
                    {product.rating}⭐
                  </span>
                )}
              </div>
              <div className="mt-3">
                <span className="bg-green-500 text-white py-1 px-2 rounded-full">
                  {product.discountPercentage}% Off
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
