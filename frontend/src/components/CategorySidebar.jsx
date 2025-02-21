import React, { useState } from "react";

const CategorySidebar = ({
  activeCategory,
  setActiveCategory,
  priceRange,
  setPriceRange,
  rating,
  setRating,
  discount,
  setDiscount,
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
    if (activeCategory === category) {
      setActiveCategory(""); // Deselect if the same category is clicked again
    } else {
      setActiveCategory(category);
    }
    setIsCategoryOpen(false); // Close dropdown after selection
  };

  const handlePriceRangeChange = (range) => {
    if (priceRange === range) {
      setPriceRange(""); // Deselect if the same price range is clicked again
    } else {
      setPriceRange(range);
    }
    setIsPriceRangeOpen(false); // Close dropdown after selection
  };

  const handleRatingChange = (newRating) => {
    if (rating === newRating) {
      setRating(""); // Deselect if the same rating is clicked again
    } else {
      setRating(newRating);
    }
    setIsRatingOpen(false); // Close dropdown after selection
  };

  const handleDiscountChange = (newDiscount) => {
    if (discount === newDiscount) {
      setDiscount(""); // Deselect if the same discount is clicked again
    } else {
      setDiscount(newDiscount);
    }
    setIsDiscountOpen(false); // Close dropdown after selection
  };

  return (
    <div className="w-64 p-4 border-r">
      {/* Category Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 cursor-pointer" onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
          Category
        </h2>
        {isCategoryOpen && (
          <div>
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={activeCategory === category}
                  onChange={() => handleCategoryChange(category)}
                />
                {category}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 cursor-pointer" onClick={() => setIsPriceRangeOpen(!isPriceRangeOpen)}>
          Price
        </h2>
        {isPriceRangeOpen && (
          <div>
            {priceRanges.map((range) => (
              <label key={range} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={priceRange === range}
                  onChange={() => handlePriceRangeChange(range)}
                />
                {range}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 cursor-pointer" onClick={() => setIsRatingOpen(!isRatingOpen)}>
          Rating
        </h2>
        {isRatingOpen && (
          <div>
            {ratings.map((rate) => (
              <label key={rate} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={rating === rate}
                  onChange={() => handleRatingChange(rate)}
                />
                {rate}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Discount Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 cursor-pointer" onClick={() => setIsDiscountOpen(!isDiscountOpen)}>
          Discount
        </h2>
        {isDiscountOpen && (
          <div>
            {discounts.map((disc) => (
              <label key={disc} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={discount === disc}
                  onChange={() => handleDiscountChange(disc)}
                />
                {disc}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySidebar;
