import React from "react";

const CategorySidebar = ({ activeCategory, setActiveCategory, priceRange, setPriceRange }) => {
  const categories = ["All Categories", "Jewellery", "Clothes", "Home Furnishing"];
  const priceRanges = ["All Price", "0-500", "501-1000", "1001-5000", "5001+"];

  const handleCategoryChange = (category) => {
    if (activeCategory === category) {
      setActiveCategory(""); // Deselect if the same category is clicked again
    } else {
      setActiveCategory(category);
    }
  };

  const handlePriceRangeChange = (range) => {
    if (priceRange === range) {
      setPriceRange(""); // Deselect if the same price range is clicked again
    } else {
      setPriceRange(range);
    }
  };

  return (
    <div className="w-64 p-4 border-r">
      {/* Category Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Category</h2>
        {categories.map((category) => (
          <label key={category} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={activeCategory === category}
              onChange={() => handleCategoryChange(category)} // Toggle category selection
            />
            {category}
          </label>
        ))}
      </div>

      {/* Price Range Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Price</h2>
        {priceRanges.map((range) => (
          <label key={range} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={priceRange === range}
              onChange={() => handlePriceRangeChange(range)} // Toggle price range selection
            />
            {range}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategorySidebar;
