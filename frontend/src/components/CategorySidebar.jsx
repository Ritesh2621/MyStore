import React, { useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";

const CategorySidebar = ({
  selectedCategories,
  setSelectedCategories,
  selectedPriceRanges,
  setSelectedPriceRanges,
  selectedRatings,
  setSelectedRatings,
  selectedDiscounts,
  setSelectedDiscounts,
}) => {
  const categories = ["All Categories", "Jewellery", "Clothes", "Home Furnishing"];
  const priceRanges = ["All Price", "0-500", "501-1000", "1001-5000", "5001+"];
  const ratings = ["All Ratings", "1 Star & Up", "2 Stars & Up", "3 Stars & Up", "4 Stars & Up", "5 Stars"];
  const discounts = ["All Discounts", "10% Off & Up", "20% Off & Up", "30% Off & Up", "40% Off & Up"];

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isPriceRangeOpen, setIsPriceRangeOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories && prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...(prevCategories || []), category] // Ensure it is an array if prevCategories is undefined
    );
  };

  const handlePriceRangeChange = (range) => {
    setSelectedPriceRanges((prevRanges) =>
      prevRanges && prevRanges.includes(range)
        ? prevRanges.filter((r) => r !== range)
        : [...(prevRanges || []), range] // Ensure it is an array if prevRanges is undefined
    );
  };

  const handleRatingChange = (rating) => {
    setSelectedRatings((prevRatings) =>
      prevRatings && prevRatings.includes(rating)
        ? prevRatings.filter((r) => r !== rating)
        : [...(prevRatings || []), rating] // Ensure it is an array if prevRatings is undefined
    );
  };

  const handleDiscountChange = (discount) => {
    setSelectedDiscounts((prevDiscounts) =>
      prevDiscounts && prevDiscounts.includes(discount)
        ? prevDiscounts.filter((d) => d !== discount)
        : [...(prevDiscounts || []), discount] // Ensure it is an array if prevDiscounts is undefined
    );
  };

  return (
    <div className="w-64 p-6 bg-white shadow-lg rounded-lg">
      {/* Category Section */}
      <div className="mb-6">
        <h2
          className="text-lg font-semibold mb-3 cursor-pointer flex justify-between items-center"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          <span>Category</span>
          <span className="transform transition-transform">
            {isCategoryOpen ? <IoIosArrowDropup/> : <IoIosArrowDropdown/>}
          </span>
        </h2>
        {isCategoryOpen && (
          <div className="space-y-2 pl-4">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                <span className="text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Section */}
      <div className="mb-6">
        <h2
          className="text-lg font-semibold mb-3 cursor-pointer flex justify-between items-center"
          onClick={() => setIsPriceRangeOpen(!isPriceRangeOpen)}
        >
          <span>Price</span>
          <span className="transform transition-transform">
            {isPriceRangeOpen ? <IoIosArrowDropup/> : <IoIosArrowDropdown/>}
          </span>
        </h2>
        {isPriceRangeOpen && (
          <div className="space-y-2 pl-4">
            {priceRanges.map((range) => (
              <label
                key={range}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600"
                  checked={selectedPriceRanges.includes(range)}
                  onChange={() => handlePriceRangeChange(range)}
                />
                <span className="text-gray-700">{range}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating Section */}
      <div className="mb-6">
        <h2
          className="text-lg font-semibold mb-3 cursor-pointer flex justify-between items-center"
          onClick={() => setIsRatingOpen(!isRatingOpen)}
        >
          <span>Rating</span>
          <span className="transform transition-transform ">
            {isRatingOpen ? <IoIosArrowDropup/> : <IoIosArrowDropdown/>}
          </span>
        </h2>
        {isRatingOpen && (
          <div className="space-y-2 pl-4">
            {ratings.map((rate) => (
              <label
                key={rate}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600"
                  checked={selectedRatings.includes(rate)}
                  onChange={() => handleRatingChange(rate)}
                />
                <span className="text-gray-700">{rate}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Discount Section */}
      <div className="mb-6">
        <h2
          className="text-lg font-semibold mb-3 cursor-pointer flex justify-between items-center"
          onClick={() => setIsDiscountOpen(!isDiscountOpen)}
        >
          <span>Discount</span>
          <span className="transform transition-transform">
            {isDiscountOpen ? <IoIosArrowDropup/> : <IoIosArrowDropdown/>}
          </span>
        </h2>
        {isDiscountOpen && (
          <div className="space-y-2 pl-4">
            {discounts.map((disc) => (
              <label
                key={disc}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600"
                  checked={selectedDiscounts.includes(disc)}
                  onChange={() => handleDiscountChange(disc)}
                />
                <span className="text-gray-700">{disc}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySidebar;
