// import React, { useState } from "react";
// import { IoIosArrowDropdown } from "react-icons/io";
// import { IoIosArrowDropup } from "react-icons/io";

// const CategorySidebar = ({
//   selectedCategories,
//   setSelectedCategories,
//   selectedPriceRanges,
//   setSelectedPriceRanges,
//   selectedRatings,
//   setSelectedRatings,
//   selectedDiscounts,
//   setSelectedDiscounts,
// }) => {
//   const categories = ["All Categories", "Jewellery", "Clothes", "Home Furnishing"];
//   const priceRanges = ["All Price", "0-500", "501-1000", "1001-5000", "5001+"];
//   const ratings = ["All Ratings", "1 Star & Up", "2 Stars & Up", "3 Stars & Up", "4 Stars & Up", "5 Stars"];
//   const discounts = ["All Discounts", "10% Off & Up", "20% Off & Up", "30% Off & Up", "40% Off & Up"];

//   const [isCategoryOpen, setIsCategoryOpen] = useState(false);
//   const [isPriceRangeOpen, setIsPriceRangeOpen] = useState(false);
//   const [isRatingOpen, setIsRatingOpen] = useState(false);
//   const [isDiscountOpen, setIsDiscountOpen] = useState(false);

//   const handleCategoryChange = (category) => {
//     setSelectedCategories((prevCategories) =>
//       prevCategories && prevCategories.includes(category)
//         ? prevCategories.filter((cat) => cat !== category)
//         : [...(prevCategories || []), category] // Ensure it is an array if prevCategories is undefined
//     );
//   };

//   const handlePriceRangeChange = (range) => {
//     setSelectedPriceRanges((prevRanges) =>
//       prevRanges && prevRanges.includes(range)
//         ? prevRanges.filter((r) => r !== range)
//         : [...(prevRanges || []), range] // Ensure it is an array if prevRanges is undefined
//     );
//   };

//   const handleRatingChange = (rating) => {
//     setSelectedRatings((prevRatings) =>
//       prevRatings && prevRatings.includes(rating)
//         ? prevRatings.filter((r) => r !== rating)
//         : [...(prevRatings || []), rating] // Ensure it is an array if prevRatings is undefined
//     );
//   };

//   const handleDiscountChange = (discount) => {
//     setSelectedDiscounts((prevDiscounts) =>
//       prevDiscounts && prevDiscounts.includes(discount)
//         ? prevDiscounts.filter((d) => d !== discount)
//         : [...(prevDiscounts || []), discount] // Ensure it is an array if prevDiscounts is undefined
//     );
//   };

//   return (
//     <div className="w-64 p-6 bg-white shadow-lg rounded-lg ">
//       {/* Category Section */}
//       <div className="mb-6">
//         <h2
//           className="text-lg font-semibold mb-3 cursor-pointer flex justify-between items-center"
//           onClick={() => setIsCategoryOpen(!isCategoryOpen)}
//         >
//           <span>Category</span>
//           <span className="transform transition-transform">
//             {isCategoryOpen ? <IoIosArrowDropup/> : <IoIosArrowDropdown/>}
//           </span>
//         </h2>
//         {isCategoryOpen && (
//           <div className="space-y-2 pl-4">
//             {categories.map((category) => (
//               <label
//                 key={category}
//                 className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
//               >
//                 <input
//                   type="checkbox"
//                   className="form-checkbox h-4 w-4 text-indigo-600"
//                   checked={selectedCategories.includes(category)}
//                   onChange={() => handleCategoryChange(category)}
//                 />
//                 <span className="text-gray-700">{category}</span>
//               </label>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Price Range Section */}
//       <div className="mb-6">
//         <h2
//           className="text-lg font-semibold mb-3 cursor-pointer flex justify-between items-center"
//           onClick={() => setIsPriceRangeOpen(!isPriceRangeOpen)}
//         >
//           <span>Price</span>
//           <span className="transform transition-transform">
//             {isPriceRangeOpen ? <IoIosArrowDropup/> : <IoIosArrowDropdown/>}
//           </span>
//         </h2>
//         {isPriceRangeOpen && (
//           <div className="space-y-2 pl-4">
//             {priceRanges.map((range) => (
//               <label
//                 key={range}
//                 className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
//               >
//                 <input
//                   type="checkbox"
//                   className="form-checkbox h-4 w-4 text-indigo-600"
//                   checked={selectedPriceRanges.includes(range)}
//                   onChange={() => handlePriceRangeChange(range)}
//                 />
//                 <span className="text-gray-700">{range}</span>
//               </label>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Rating Section */}
//       <div className="mb-6">
//         <h2
//           className="text-lg font-semibold mb-3 cursor-pointer flex justify-between items-center"
//           onClick={() => setIsRatingOpen(!isRatingOpen)}
//         >
//           <span>Rating</span>
//           <span className="transform transition-transform ">
//             {isRatingOpen ? <IoIosArrowDropup/> : <IoIosArrowDropdown/>}
//           </span>
//         </h2>
//         {isRatingOpen && (
//           <div className="space-y-2 pl-4">
//             {ratings.map((rate) => (
//               <label
//                 key={rate}
//                 className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
//               >
//                 <input
//                   type="checkbox"
//                   className="form-checkbox h-4 w-4 text-indigo-600"
//                   checked={selectedRatings.includes(rate)}
//                   onChange={() => handleRatingChange(rate)}
//                 />
//                 <span className="text-gray-700">{rate}</span>
//               </label>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Discount Section */}
//       <div className="mb-6">
//         <h2
//           className="text-lg font-semibold mb-3 cursor-pointer flex justify-between items-center"
//           onClick={() => setIsDiscountOpen(!isDiscountOpen)}
//         >
//           <span>Discount</span>
//           <span className="transform transition-transform">
//             {isDiscountOpen ? <IoIosArrowDropup/> : <IoIosArrowDropdown/>}
//           </span>
//         </h2>
//         {isDiscountOpen && (
//           <div className="space-y-2 pl-4">
//             {discounts.map((disc) => (
//               <label
//                 key={disc}
//                 className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
//               >
//                 <input
//                   type="checkbox"
//                   className="form-checkbox h-4 w-4 text-indigo-600"
//                   checked={selectedDiscounts.includes(disc)}
//                   onChange={() => handleDiscountChange(disc)}
//                 />
//                 <span className="text-gray-700">{disc}</span>
//               </label>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CategorySidebar;

// mobile view 

import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

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
  const categories = ["All Categories", "Lunknawi Kurtie", "Bedsheet", "Dohar", "Ladies Sandles", "Painting", "Toys"];
  const priceRanges = ["All Price", "0-500", "501-1000", "1001-5000", "5001+"];
  const ratings = ["All Ratings", "1 Star ", "2 Stars", "3 Stars", "4 Stars", "5 Stars"];
  const discounts = ["All Discounts", "10% Off", "20% Off", "30% Off", "40% Off"];

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isPriceRangeOpen, setIsPriceRangeOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);
  const [activeMobileFilter, setActiveMobileFilter] = useState(null);

  const toggleSelection = (selected, setSelected, value) => {
    setSelected((prev) =>
      prev?.includes(value) ? prev.filter((item) => item !== value) : [...(prev || []), value]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setSelectedRatings([]);
    setSelectedDiscounts([]);
  };

  const toggleMobileFilter = (filterName) => {
    setActiveMobileFilter((prev) => (prev === filterName ? null : filterName));
  };

  const activeFiltersCount = () => {
    let count = 0;
    if (selectedCategories.length > 0 && !selectedCategories.includes("All Categories")) count += selectedCategories.length;
    if (selectedPriceRanges.length > 0 && !selectedPriceRanges.includes("All Price")) count += selectedPriceRanges.length;
    if (selectedRatings.length > 0 && !selectedRatings.includes("All Ratings")) count += selectedRatings.length;
    if (selectedDiscounts.length > 0 && !selectedDiscounts.includes("All Discounts")) count += selectedDiscounts.length;
    return count;
  };

  const activeFilters = activeFiltersCount();

  return (
    <>
      {/* Mobile Filter UI */}
      <div className="sm:hidden">
        {/* Top Filter Bar */}
        <div className="bg-white shadow-sm mb-4 sticky top-0 z-20 border-b">
          <div className="flex items-center p-3">
            <button
              className="flex items-center gap-1 text-gray-700 px-3 py-2 text-sm border-r border-gray-300 flex-1 justify-center"
              onClick={() => toggleMobileFilter("sort")}
            >
              <span>Sort</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button
              className="flex items-center gap-1 text-gray-700 px-3 py-2 text-sm flex-1 justify-center relative"
              onClick={() => toggleMobileFilter("filter")}
            >
              <FaFilter size={14} />
              <span>Filter</span>
              {activeFilters > 0 && (
                <span className="bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center absolute -top-1 -right-1">
                  {activeFilters}
                </span>
              )}
            </button>
          </div>

          {/* Active Filter Pills */}
          {activeFilters > 0 && (
            <div className="px-3 py-2 flex overflow-x-auto no-scrollbar gap-2">
              {selectedCategories.map((category) => category !== "All Categories" && (
                <div key={category} className="bg-gray-100 text-xs rounded-full px-3 py-1 flex items-center">
                  <span>{category}</span>
                  <button className="ml-1 text-gray-500" onClick={() => toggleSelection(selectedCategories, setSelectedCategories, category)}>
                    <IoClose size={14} />
                  </button>
                </div>
              ))}
              {selectedPriceRanges.map((range) => range !== "All Price" && (
                <div key={range} className="bg-gray-100 text-xs rounded-full px-3 py-1 flex items-center">
                  <span>{range}</span>
                  <button className="ml-1 text-gray-500" onClick={() => toggleSelection(selectedPriceRanges, setSelectedPriceRanges, range)}>
                    <IoClose size={14} />
                  </button>
                </div>
              ))}
              {selectedRatings.map((rating) => rating !== "All Ratings" && (
                <div key={rating} className="bg-gray-100 text-xs rounded-full px-3 py-1 flex items-center">
                  <span>{rating}</span>
                  <button className="ml-1 text-gray-500" onClick={() => toggleSelection(selectedRatings, setSelectedRatings, rating)}>
                    <IoClose size={14} />
                  </button>
                </div>
              ))}
              {selectedDiscounts.map((discount) => discount !== "All Discounts" && (
                <div key={discount} className="bg-gray-100 text-xs rounded-full px-3 py-1 flex items-center">
                  <span>{discount}</span>
                  <button className="ml-1 text-gray-500" onClick={() => toggleSelection(selectedDiscounts, setSelectedDiscounts, discount)}>
                    <IoClose size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Filter Bottom Sheet */}
        {activeMobileFilter && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setActiveMobileFilter(null)} />
            <div className="fixed bottom-0 left-0 right-0 bg-white z-40 rounded-t-2xl max-h-[85vh] overflow-y-auto">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                  <h2 className="text-lg font-semibold">
                    {activeMobileFilter === "filter" ? "Filter" : "Sort By"}
                  </h2>
                  <button className="text-gray-500 p-1 hover:bg-gray-100 rounded-full" onClick={() => setActiveMobileFilter(null)}>
                    <IoClose size={24} />
                  </button>
                </div>

                {activeMobileFilter === "filter" && (
                  <>
                    {activeFilters > 0 && (
                      <button className="text-pink-600 text-sm mb-4 hover:underline" onClick={clearAllFilters}>
                        Clear All Filters
                      </button>
                    )}

                    {/* Category */}
                    <div className="mb-4 border-b pb-2">
                      <h2 className="text-base font-semibold mb-2 cursor-pointer flex justify-between items-center" onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
                        <span>Category</span>
                        {isCategoryOpen ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
                      </h2>
                      {isCategoryOpen && (
                        <div className="space-y-1 pl-1">
                          {categories.map((category) => (
                            <label key={category} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1.5 rounded text-sm">
                              <input type="checkbox" className="form-checkbox h-4 w-4 text-pink-600" checked={selectedCategories.includes(category)} onChange={() => toggleSelection(selectedCategories, setSelectedCategories, category)} />
                              <span>{category}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    <div className="mb-4 border-b pb-2">
                      <h2 className="text-base font-semibold mb-2 cursor-pointer flex justify-between items-center" onClick={() => setIsPriceRangeOpen(!isPriceRangeOpen)}>
                        <span>Price</span>
                        {isPriceRangeOpen ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
                      </h2>
                      {isPriceRangeOpen && (
                        <div className="space-y-1 pl-1">
                          {priceRanges.map((range) => (
                            <label key={range} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1.5 rounded text-sm">
                              <input type="checkbox" className="form-checkbox h-4 w-4 text-pink-600" checked={selectedPriceRanges.includes(range)} onChange={() => toggleSelection(selectedPriceRanges, setSelectedPriceRanges, range)} />
                              <span>{range}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="mb-4 border-b pb-2">
                      <h2 className="text-base font-semibold mb-2 cursor-pointer flex justify-between items-center" onClick={() => setIsRatingOpen(!isRatingOpen)}>
                        <span>Rating</span>
                        {isRatingOpen ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
                      </h2>
                      {isRatingOpen && (
                        <div className="space-y-1 pl-1">
                          {ratings.map((rating) => (
                            <label key={rating} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1.5 rounded text-sm">
                              <input type="checkbox" className="form-checkbox h-4 w-4 text-pink-600" checked={selectedRatings.includes(rating)} onChange={() => toggleSelection(selectedRatings, setSelectedRatings, rating)} />
                              <span>{rating}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Discount */}
                    <div className="mb-4 border-b pb-2">
                      <h2 className="text-base font-semibold mb-2 cursor-pointer flex justify-between items-center" onClick={() => setIsDiscountOpen(!isDiscountOpen)}>
                        <span>Discount</span>
                        {isDiscountOpen ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
                      </h2>
                      {isDiscountOpen && (
                        <div className="space-y-1 pl-1">
                          {discounts.map((discount) => (
                            <label key={discount} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1.5 rounded text-sm">
                              <input type="checkbox" className="form-checkbox h-4 w-4 text-pink-600" checked={selectedDiscounts.includes(discount)} onChange={() => toggleSelection(selectedDiscounts, setSelectedDiscounts, discount)} />
                              <span>{discount}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CategorySidebar;
