import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdCurrencyRupee, MdLocalOffer } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";

const ProductPage = ({
  selectedCategories = [],
  selectedPriceRanges = [],
  selectedRatings = [],
  selectedDiscounts = [],
  products = [],
  searchQuery = "",
}) => {
  const [searchInput, setSearchInput] = useState(searchQuery || "");
  const navigate = useNavigate();
  const location = useLocation();
  const selectedSubsubcategory = location.state?.subsubcategory;

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [showSearchbar, setShowSearchbar] = useState(false);

  // Update searchInput when searchQuery changes
  useEffect(() => {
    setSearchInput(searchQuery || "");
  }, [searchQuery]);

  const filterProducts = (product) => {
    // Filter by search query first (highest priority)
    if (
      searchQuery && 
      !product.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
  
    // Then apply other filters if they exist
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes("All Categories") &&
      !selectedCategories.includes(product.category)
    ) {
      return false;
    }
  
    if (
      selectedPriceRanges.length > 0 &&
      !selectedPriceRanges.includes("All Price") &&
      !selectedPriceRanges.some((range) => {
        const [min, max] = range.split("-").map(Number);
        return product.price >= min && (max ? product.price <= max : true);
      })
    ) {
      return false;
    }
  
    if (
      selectedRatings.length > 0 &&
      !selectedRatings.includes("All Ratings") &&
      !selectedRatings.some((rating) => {
        const ratingValue = parseInt(rating.split(" ")[0]);
        return product.rating >= ratingValue;
      })
    ) {
      return false;
    }
  
    if (
      selectedDiscounts.length > 0 &&
      !selectedDiscounts.includes("All Discounts") &&
      !selectedDiscounts.some((discount) => {
        const discountValue = parseInt(discount.split("%")[0]);
        return product.discountPercentage >= discountValue;
      })
    ) {
      return false;
    }
  
    if (selectedSubsubcategory && product.subsubcategory !== selectedSubsubcategory) {
      return false;
    }
  
    return true;
  };

  const filteredProducts = products.filter(filterProducts);

  // Reset to first page when filters change and update total pages
  useEffect(() => {
    setTotalPages(Math.ceil(filteredProducts.length / productsPerPage));
    setCurrentPage(1);
  }, [
    filteredProducts.length,
    productsPerPage,
    selectedCategories,
    selectedPriceRanges,
    selectedRatings,
    selectedDiscounts,
    searchInput,
  ]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        endPage = 3;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2;
      }

      if (startPage > 2) {
        pageNumbers.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const handleProductsPerPageChange = (e) => {
    setProductsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Update URL with search query or implement your search logic
    navigate(`/search?q=${encodeURIComponent(searchInput)}`);
  };

  return (
    <div className="bg-gray-50">
      {/* Mobile Search Bar */}
      {/* {showSearchbar && (
        <div className="fixed inset-0 bg-white z-50 py-2 px-3">
          <form onSubmit={handleSearch} className="flex items-center">
            <button
              type="button"
              onClick={() => setShowSearchbar(false)}
              className="mr-2 text-gray-500"
            >
              <FaChevronLeft />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <IoIosSearch className="absolute left-3 top-3 text-gray-500 text-lg" />
            </div>
            <button
              type="submit"
              className="ml-2 px-4 py-2 text-sm font-medium text-pink-600"
            >
              Search
            </button>
          </form>
        </div>
      )} */}

      {/* Mobile Search Trigger */}
      {/* <div className="sm:hidden sticky top-0 z-10 bg-white flex items-center p-3 shadow-md">
        <button
          onClick={() => setShowSearchbar(true)}
          className="w-full bg-gray-100 text-left text-gray-500 py-2 px-4 rounded-md flex items-center"
        >
          <IoIosSearch className="mr-2" />
          <span>Search products</span>
        </button>
      </div> */}

      <div className="w-full max-w-7xl mx-auto px-2 py-2 sm:px-6 lg:px-8">
        {/* Results Summary and Display Options */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 sm:mb-4 gap-2">
          <p className="text-gray-600 text-xs sm:text-sm">
            Showing {filteredProducts.length > 0 ? indexOfFirstProduct + 1 : 0} -{" "}
            {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
          </p>

          <div className="flex items-center self-start sm:self-auto">
            <label htmlFor="productsPerPage" className="mr-2 text-gray-600 text-xs sm:text-sm">
              Show:
            </label>
            <select
              id="productsPerPage"
              className="border rounded py-1 px-2 text-xs sm:text-sm bg-white shadow-sm focus:outline-none"
              value={productsPerPage}
              onChange={handleProductsPerPageChange}
            >
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={36}>36</option>
            </select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-8 sm:py-16 px-2 sm:px-4 bg-white rounded-lg shadow-sm">
            <p className="text-lg sm:text-2xl text-gray-600">No products found matching your search criteria.</p>
            <p className="mt-2 sm:mt-4 text-sm sm:text-base text-gray-500">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <>
            {/* Product Grid - Mobile View */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
              {currentProducts.map((product) => (
                <div
                  key={product.id || product._id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  {/* Product Image */}
                  <div className="relative h-44 sm:h-48 overflow-hidden bg-gray-50">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="p-2 flex-grow flex flex-col">
                    <h3 className="text-xs sm:text-sm font-medium line-clamp-2 min-h-10 text-gray-800">
                      {product.title}
                    </h3>
                    
                    {/* Price Section */}
                    <div className="mt-1 flex items-center flex-wrap">
                      <div className="flex items-center">
                        <MdCurrencyRupee className="text-gray-900 text-sm" />
                        <span className="text-base sm:text-lg font-bold text-gray-900">
                          {product.price}
                        </span>
                      </div>
                      
                      {product.discountPercentage > 0 && (
                        <>
                          <div className="ml-2 flex items-center text-xs text-gray-500">
                            <MdCurrencyRupee className="text-xs" />
                            <span className="line-through">
                              {Math.round(product.price / (1 - product.discountPercentage / 100))}
                            </span>
                          </div>
                          <span className="ml-2 text-xs font-medium text-green-600">
                            {product.discountPercentage}% off
                          </span>
                        </>
                      )}
                    </div>
                    
                    {/* Additional Info */}
                    <div className="mt-1 flex flex-col">
                      {/* Delivery */}
                      <div className="text-xs text-gray-500">
                        Free Delivery
                      </div>
                      
                      {/* Rating */}
                      <div className="mt-1.5 flex items-center">
                        <span className="bg-green-600 text-white px-1.5 py-0.5 text-xs rounded flex items-center">
                          {product.rating}★
                        </span>
                        <span className="ml-1 text-xs text-gray-500">
                          {Math.floor(Math.random() * 500) + 100} Reviews
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 sm:mt-8 mb-4">
                <nav className="flex items-center bg-white px-2 py-1 rounded-lg shadow-sm">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`mx-1 px-2 py-1 rounded-md flex items-center justify-center ${
                      currentPage === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-blue-600 hover:bg-pink-50"
                    }`}
                    aria-label="Previous page"
                  >
                    <FaChevronLeft size={12} className="sm:text-sm" />
                  </button>

                  <div className="hidden sm:flex">
                    {getPageNumbers().map((number, index) => (
                      <button
                        key={index}
                        onClick={() => number !== "..." && paginate(number)}
                        className={`mx-1 w-8 h-8 flex items-center justify-center rounded-md ${
                          number === currentPage
                            ? "bg-blue-600 text-white font-medium"
                            : number === "..."
                            ? "text-gray-500 cursor-default"
                            : "text-blue-600 hover:bg-pink-50"
                        }`}
                      >
                        {number}
                      </button>
                    ))}
                  </div>

                  {/* Mobile pagination display */}
                  <div className="flex sm:hidden items-center">
                    <span className="px-3 py-1 text-xs">
                      {currentPage} / {totalPages}
                    </span>
                  </div>

                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`mx-1 px-2 py-1 rounded-md flex items-center justify-center ${
                      currentPage === totalPages
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-blue-600 hover:bg-pink-50"
                    }`}
                    aria-label="Next page"
                  >
                    <FaChevronRight size={12} className="sm:text-sm" />
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductPage;