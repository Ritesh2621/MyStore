import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";

const ProductPage = ({
  selectedCategories,
  selectedPriceRanges,
  selectedRatings,
  selectedDiscounts,
  products,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const selectedSubsubcategory = location.state?.subsubcategory;
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(1);

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

    // Filter by Subsubcategory (if provided)
    if (selectedSubsubcategory && product.subsubcategory !== selectedSubsubcategory) {
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

  // Update total pages whenever filtered products or products per page changes
  useEffect(() => {
    setTotalPages(Math.ceil(filteredProducts.length / productsPerPage));
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [filteredProducts.length, productsPerPage, selectedCategories, selectedPriceRanges, selectedRatings, selectedDiscounts, searchQuery]);

  // Get current page products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // Scroll to top of product section
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // If total pages is less than max to show, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);
      
      // Calculate start and end of middle pages
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're at edges
      if (currentPage <= 2) {
        endPage = 3;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2;
      }
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push('...');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Always show last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  // Handle products per page change
  const handleProductsPerPageChange = (e) => {
    setProductsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

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

      {/* Results Info and Products Per Page */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <p className="text-gray-600 mb-2 sm:mb-0">
          Showing {filteredProducts.length > 0 ? indexOfFirstProduct + 1 : 0} - {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
        </p>
        
        <div className="flex items-center">
          <label htmlFor="productsPerPage" className="mr-2 text-gray-600">Show:</label>
          <select
            id="productsPerPage"
            className="border rounded p-1"
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

      {/* No Products Available Message */}
      {filteredProducts.length === 0 ? (
        <div className="text-center text-xl text-gray-600 mt-6">
          <p>No products available for this category.</p>
        </div>
      ) : (
        <>
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
              <div
                key={product.id || product._id}
                className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <div className="relative h-48 overflow-hidden rounded-md mb-3">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="mt-2 font-semibold text-lg line-clamp-2 h-14">{product.title}</h3>
                <div className="flex justify-between mt-2">
                  <div className="flex items-center">
                    <MdCurrencyRupee className="text-sm" />
                    <span className="text-xl font-medium">{product.price}</span>
                  </div>
                  <span className="bg-green-600 text-white px-2 py-1 rounded-lg flex items-center">
                    {product.rating}⭐
                  </span>
                </div>
                {product.discountPercentage > 0 && (
                  <div className="mt-3">
                    <span className="bg-green-500 text-white py-1 px-2 rounded-full text-sm">
                      {product.discountPercentage}% Off
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`mx-1 px-3 py-2 rounded-md ${
                    currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-blue-600 hover:bg-blue-100'
                  }`}
                  aria-label="Previous page"
                >
                  <FaChevronLeft />
                </button>
                
                {getPageNumbers().map((number, index) => (
                  <button
                    key={index}
                    onClick={() => number !== '...' ? paginate(number) : null}
                    className={`mx-1 px-3 py-1 rounded-md ${
                      number === currentPage
                        ? 'bg-blue-600 text-white'
                        : number === '...'
                        ? 'text-gray-500 cursor-default'
                        : 'text-blue-600 hover:bg-blue-100'
                    }`}
                  >
                    {number}
                  </button>
                ))}
                
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`mx-1 px-3 py-2 rounded-md ${
                    currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-blue-600 hover:bg-blue-100'
                  }`}
                  aria-label="Next page"
                >
                  <FaChevronRight />
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductPage;