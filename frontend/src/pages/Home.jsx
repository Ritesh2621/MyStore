// import React, { useState, useEffect } from 'react';
// import CategorySidebar from '../components/CategorySidebar';
// import ProductPage from '../components/ProductPage';
// import MenuBar from '../components/MenuBar';
// import CategorySlider from '../components/CategorySlider';
// import BannerSlider from '../components/BannerSlider';

// const Home = ({ searchQuery, products }) => {
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
//   const [selectedRatings, setSelectedRatings] = useState([]);
//   const [selectedDiscounts, setSelectedDiscounts] = useState([]);
//   const [selectedSubsubcategory, setSelectedSubsubcategory] = useState(null);

//   // If there's a search query, show just the ProductPage section with search results
//   // Otherwise show the full home page with sliders, etc.
//   return (
//     <>
//       {searchQuery ? (
//         // Search results view
//         <div className="w-full">
//           <div className="p-4 bg-blue-100 text-blue-800 text-center">
//             <h2 className="text-xl font-semibold">Search Results for: "{searchQuery}"</h2>
//           </div>
//           <div className="flex">
//             <CategorySidebar
//               selectedCategories={selectedCategories}
//               setSelectedCategories={setSelectedCategories}
//               selectedPriceRanges={selectedPriceRanges}
//               setSelectedPriceRanges={setSelectedPriceRanges}
//               selectedRatings={selectedRatings}
//               setSelectedRatings={setSelectedRatings}
//               selectedDiscounts={selectedDiscounts}
//               setSelectedDiscounts={setSelectedDiscounts}
//             />
//             <ProductPage
//               selectedCategories={selectedCategories}
//               selectedPriceRanges={selectedPriceRanges}
//               selectedRatings={selectedRatings}
//               selectedDiscounts={selectedDiscounts}
//               products={products}
//               searchQuery={searchQuery}
//             />
//           </div>
//         </div>
//       ) : (
//         // Regular home page view
//         <>
//           <MenuBar setSelectedSubsubcategory={setSelectedSubsubcategory} />
//           <CategorySlider />
//           <BannerSlider />
//           <div className="flex">
//             <CategorySidebar
//               selectedCategories={selectedCategories}
//               setSelectedCategories={setSelectedCategories}
//               selectedPriceRanges={selectedPriceRanges}
//               setSelectedPriceRanges={setSelectedPriceRanges}
//               selectedRatings={selectedRatings}
//               setSelectedRatings={setSelectedRatings}
//               selectedDiscounts={selectedDiscounts}
//               setSelectedDiscounts={setSelectedDiscounts}
//             />
//             <ProductPage
//               selectedCategories={selectedCategories}
//               selectedPriceRanges={selectedPriceRanges}
//               selectedRatings={selectedRatings}
//               selectedDiscounts={selectedDiscounts}
//               products={products}
//               searchQuery={searchQuery}
//             />
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import ProductPage from '../components/ProductPage';
import MenuBar from '../components/MenuBar';
import CategorySlider from '../components/CategorySlider';
import BannerSlider from '../components/BannerSlider';
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Home = ({ searchQuery, products }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [selectedSubsubcategory, setSelectedSubsubcategory] = useState(null);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  
  // Filter options arrays
  const categories = ["All Categories", "Lunknawi Kurties", "Bedsheet", "Dohar", "Ladies Sandles", "Painting", "Toys"];
  const priceRanges = ["All Price", "0-500", "501-1000", "1001-5000", "5001+"];
  const ratings = ["All Ratings", "1 Star & Up", "2 Stars & Up", "3 Stars & Up", "4 Stars & Up", "5 Stars"];
  const discounts = ["All Discounts", "10% Off & Up", "20% Off & Up", "30% Off & Up", "40% Off & Up"];

  // State for tracking open/closed filter sections
  const [openSections, setOpenSections] = useState({
    category: true,
    price: false,
    rating: false,
    discount: false
  });
  
  // Count total products
  const totalProducts = "1000+";

  // Handle toggling filter sections
  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle selections
  const toggleSelection = (selected, setSelected, value) => {
    setSelected(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (showMobileSidebar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showMobileSidebar]);

  // Filter section component for reuse
  const FilterSection = ({ title, items, selectedItems, setSelectedItems, isOpen, sectionId }) => (
    <div className="border-b py-4">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => toggleSection(sectionId)}
      >
        <h3 className="text-base font-medium text-gray-800">{title}</h3>
        {isOpen ? 
          <IoIosArrowDropup className="text-gray-500" size={20} /> : 
          <IoIosArrowDropdown className="text-gray-500" size={20} />
        }
      </div>
      
      {isOpen && (
        <div className="mt-3 space-y-2">
          {items.map((item) => (
            <label key={item} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 text-purple-700 border-gray-300 rounded"
                checked={selectedItems.includes(item)}
                onChange={() => toggleSelection(selectedItems, setSelectedItems, item)}
              />
              <span className="text-sm text-gray-700">{item}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
  
  // Integrated Category Section for Mobile View
  const MobileFilterSections = () => {
    // These filter sections match those in the image
    const filterSections = [
      { id: 'category', title: 'Category', items: categories },
      { id: 'price', title: 'Price Range', items: priceRanges },
      { id: 'rating', title: 'Ratings', items: ratings },
      { id: 'discount', title: 'Discounts', items: discounts }
    ];
    
    return (
      <div className="w-full bg-white md:hidden">
        {filterSections.map((section) => (
          <div key={section.id} className="border-b border-gray-200">
            <div 
              className="flex justify-between items-center cursor-pointer p-4"
              onClick={() => toggleSection(section.id)}
            >
              <h3 className="text-base font-medium text-gray-800">{section.title}</h3>
              {openSections[section.id] ? 
                <IoIosArrowDropup className="text-gray-500" size={20} /> : 
                <IoIosArrowDropdown className="text-gray-500" size={20} />
              }
            </div>
            
            {openSections[section.id] && (
              <div className="px-4 pb-4 space-y-2">
                {section.items.map((item) => (
                  <label key={item} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-purple-700 border-gray-300 rounded"
                      checked={
                        section.id === 'category' ? selectedCategories.includes(item) :
                        section.id === 'price' ? selectedPriceRanges.includes(item) :
                        section.id === 'rating' ? selectedRatings.includes(item) :
                        section.id === 'discount' ? selectedDiscounts.includes(item) : 
                        false
                      }
                      onChange={() => {
                        if (section.id === 'category') toggleSelection(selectedCategories, setSelectedCategories, item);
                        else if (section.id === 'price') toggleSelection(selectedPriceRanges, setSelectedPriceRanges, item);
                        else if (section.id === 'rating') toggleSelection(selectedRatings, setSelectedRatings, item);
                        else if (section.id === 'discount') toggleSelection(selectedDiscounts, setSelectedDiscounts, item);
                      }}
                    />
                    <span className="text-sm text-gray-700">{item}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Desktop Sidebar Component
  const DesktopSidebar = () => (
    <div className="hidden md:block w-64 border-r bg-white">
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-gray-800">FILTERS</h2>
        </div>
        <p className="text-sm text-gray-500 mb-4">{totalProducts} Products</p>
        
        <FilterSection 
          title="Category" 
          sectionId="category"
          items={categories} 
          selectedItems={selectedCategories}
          setSelectedItems={setSelectedCategories}
          isOpen={openSections.category}
        />
        
        <FilterSection 
          title="Price Range" 
          sectionId="price"
          items={priceRanges} 
          selectedItems={selectedPriceRanges}
          setSelectedItems={setSelectedPriceRanges}
          isOpen={openSections.price}
        />
        
        <FilterSection 
          title="Ratings" 
          sectionId="rating"
          items={ratings} 
          selectedItems={selectedRatings}
          setSelectedItems={setSelectedRatings}
          isOpen={openSections.rating}
        />
        
        <FilterSection 
          title="Discounts" 
          sectionId="discount"
          items={discounts} 
          selectedItems={selectedDiscounts}
          setSelectedItems={setSelectedDiscounts}
          isOpen={openSections.discount}
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-screen-xl mx-auto">
      {searchQuery ? (
        // Search results view
        <div className="w-full">
          <div className="p-4 bg-blue-100 text-blue-800 text-center">
            <h2 className="text-xl font-semibold">Search Results for: "{searchQuery}"</h2>
          </div>
          
          {/* Sort and filter bar for mobile */}
          <div className="flex justify-between items-center bg-white p-4 border-b md:hidden">
            <button 
              onClick={() => setShowMobileSidebar(true)}
              className="flex items-center gap-2 text-gray-700"
            >
              <FaFilter />
              <span>Filter</span>
            </button>
            
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Sort by:</span>
              <select className="border-none text-sm font-medium appearance-none bg-transparent">
                <option>Relevance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>
          </div>
          
          {/* Mobile Filter Dropdowns (only visible on mobile) */}
          <MobileFilterSections />
          
          {/* Desktop: Sidebar and Products side by side */}
          <div className="flex flex-col md:flex-row">
            {/* Desktop Sidebar (hidden on mobile) */}
            <DesktopSidebar />
            
            {/* Product grid */}
            <div className="w-full md:flex-1">
              <ProductPage
                selectedCategories={selectedCategories}
                selectedPriceRanges={selectedPriceRanges}
                selectedRatings={selectedRatings}
                selectedDiscounts={selectedDiscounts}
                products={products}
                searchQuery={searchQuery}
              />
            </div>
          </div>
          
          {/* Mobile sidebar drawer */}
          {showMobileSidebar && (
            <>
              {/* Overlay */}
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                onClick={() => setShowMobileSidebar(false)}
              />

              {/* Sidebar */}
              <div className="fixed inset-y-0 left-0 z-50 w-4/5 max-w-sm bg-white shadow-lg md:hidden overflow-y-auto">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-medium">Filters</h2>
                    <button onClick={() => setShowMobileSidebar(false)}>
                      <IoClose size={24} />
                    </button>
                  </div>

                  {/* Filter content */}
                  <div className="flex-1 overflow-y-auto p-4">
                    <p className="text-sm text-gray-500 mb-4">{totalProducts} Products</p>
                    
                    <FilterSection 
                      title="Category" 
                      sectionId="category"
                      items={categories} 
                      selectedItems={selectedCategories}
                      setSelectedItems={setSelectedCategories}
                      isOpen={openSections.category}
                    />
                    
                    <FilterSection 
                      title="Price Range" 
                      sectionId="price"
                      items={priceRanges} 
                      selectedItems={selectedPriceRanges}
                      setSelectedItems={setSelectedPriceRanges}
                      isOpen={openSections.price}
                    />
                    
                    <FilterSection 
                      title="Ratings" 
                      sectionId="rating"
                      items={ratings} 
                      selectedItems={selectedRatings}
                      setSelectedItems={setSelectedRatings}
                      isOpen={openSections.rating}
                    />
                    
                    <FilterSection 
                      title="Discounts" 
                      sectionId="discount"
                      items={discounts} 
                      selectedItems={selectedDiscounts}
                      setSelectedItems={setSelectedDiscounts}
                      isOpen={openSections.discount}
                    />
                  </div>

                  {/* Apply button */}
                  <div className="p-4 border-t">
                    <button 
                      className="w-full bg-purple-800 text-white py-3 rounded font-medium"
                      onClick={() => setShowMobileSidebar(false)}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        // Regular home page view
        <>
          <MenuBar setSelectedSubsubcategory={setSelectedSubsubcategory} />
          <CategorySlider />
          <BannerSlider />
          
          {/* Sort and filter bar for mobile */}
          <div className="flex justify-between items-center bg-white p-4 border-b md:hidden">
            <button 
              onClick={() => setShowMobileSidebar(true)}
              className="flex items-center gap-2 text-gray-700"
            >
              <FaFilter />
              <span>Filter</span>
            </button>
            
            {/* <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Sort by:</span>
              <select className="border-none text-sm font-medium appearance-none bg-transparent">
                {/* <option>Relevance</option> */}
                {/* <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option> */}
              {/* </select>
            </div> */} 
          </div>
          
          {/* Mobile Filter Dropdowns (only visible on mobile) */}
          <MobileFilterSections />
          
          {/* Desktop: Sidebar and Products side by side */}
          <div className="flex flex-col md:flex-row">
            {/* Desktop Sidebar (hidden on mobile) */}
            <DesktopSidebar />
            
            {/* Product grid */}
            <div className="w-full md:flex-1">
              <ProductPage
                selectedCategories={selectedCategories}
                selectedPriceRanges={selectedPriceRanges}
                selectedRatings={selectedRatings}
                selectedDiscounts={selectedDiscounts}
                products={products}
                searchQuery={searchQuery}
              />
            </div>
          </div>
          
          {/* Mobile sidebar drawer */}
          {showMobileSidebar && (
            <>
              {/* Overlay */}
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                onClick={() => setShowMobileSidebar(false)}
              />

              {/* Sidebar */}
              <div className="fixed inset-y-0 left-0 z-50 w-4/5 max-w-sm bg-white shadow-lg md:hidden overflow-y-auto">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-medium">Filters</h2>
                    <button onClick={() => setShowMobileSidebar(false)}>
                      <IoClose size={24} />
                    </button>
                  </div>

                  {/* Filter content */}
                  <div className="flex-1 overflow-y-auto p-4">
                    <p className="text-sm text-gray-500 mb-4">{totalProducts} Products</p>
                    
                    <FilterSection 
                      title="Category" 
                      sectionId="category"
                      items={categories} 
                      selectedItems={selectedCategories}
                      setSelectedItems={setSelectedCategories}
                      isOpen={openSections.category}
                    />
                    
                    <FilterSection 
                      title="Price Range" 
                      sectionId="price"
                      items={priceRanges} 
                      selectedItems={selectedPriceRanges}
                      setSelectedItems={setSelectedPriceRanges}
                      isOpen={openSections.price}
                    />
                    
                    <FilterSection 
                      title="Ratings" 
                      sectionId="rating"
                      items={ratings} 
                      selectedItems={selectedRatings}
                      setSelectedItems={setSelectedRatings}
                      isOpen={openSections.rating}
                    />
                    
                    <FilterSection 
                      title="Discounts" 
                      sectionId="discount"
                      items={discounts} 
                      selectedItems={selectedDiscounts}
                      setSelectedItems={setSelectedDiscounts}
                      isOpen={openSections.discount}
                    />
                  </div>

                  {/* Apply button */}
                  <div className="p-4 border-t">
                    <button 
                      className="w-full bg-purple-800 text-white py-3 rounded font-medium"
                      onClick={() => setShowMobileSidebar(false)}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;