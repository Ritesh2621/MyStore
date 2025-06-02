// import React, { useState } from 'react';

// const MoreAbout = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   // Category data without images
//   const categories = [
    
//     {
//       id: 2,
//       title: "Electronics & Accessories",
//       items: ["Smart Watches", "Bluetooth Earphones", "Headphones", "CCTV Cameras", "Mobile Chargers"]
//     },
//     {
//       id: 3,
//       title: "Home & Kitchen",
//       items: ["Cookers", "Food Processors", "Kitchen Gloves", "Thermos & Flasks", "Water Bottles"]
//     },
//     {
//       id: 4,
//       title: "Men's Fashion",
//       items: ["Men Dhoti Kurtas", "Formal Shirts", "Leather Jackets", "Denim Jeans", "Velvet Sherwanis"]
//     },
//     {
//       id: 5,
//       title: "Women's Fashion",
//       items: ["Designer Lehenga", "Chikankari Kurtis", "Silk Saree", "Phulkari Dupatta", "Black Kurta"]
//     },
//     {
//       id: 6,
//       title: "Personal Care",
//       items: ["Face Steamers", "Hair Care", "Beard Oil", "Deodorants", "Body Scrub"]
//     }
//   ];

//   return (
//     <div className="bg-gray-50 w-full py-4">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
//           {/* Expandable Header Button */}
//           <button 
//             className="w-full flex justify-between items-center p-4 text-left" 
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             <span className="text-lg font-medium text-gray-700">More About Mystore</span>
//             <svg 
//               className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
//               fill="none" 
//               viewBox="0 0 24 24" 
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//             </svg>
//           </button>
          
//           {/* Expandable Content */}
//           {isOpen && (
//             <div className="p-4 pt-2 border-t border-gray-200">
//               <div className="space-y-6">
//                 {/* Section 1 */}
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-800 mb-3">Discover a World of Affordable Fashion & Everyday Essentials</h3>
//                   <p className="text-gray-600">
//                     Upgrade your wardrobe and stock your home with the latest trends and essentials at unbeatable prices. MyStore offers a vast selection of products across all categories, ensuring you find everything you need at a fraction of the cost.
//                   </p>
//                 </div>
                
//                 {/* Section 2 */}
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-800 mb-3">Shop Millions of Products Across All Categories</h3>
//                   <p className="text-gray-600">
//                     From trendy fashion finds to essential homeware, MyStore is your one-stop shop for everything you need. Explore millions of products across 650+ categories, ensuring you find the perfect item for any occasion.
//                   </p>
                  
//                   {/* Category Grid */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//                     {categories.map((category) => (
//                       <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow p-3">
//                         <h4 className="font-medium text-gray-800 mb-2">{category.title}</h4>
//                         <div className="flex flex-wrap gap-1">
//                           {category.items.map((item, idx) => (
//                             <span 
//                               key={idx} 
//                               className="inline-block text-xs text-purple-700 hover:text-purple-900 cursor-pointer"
//                             >
//                               {item}{idx < category.items.length - 1 ? " | " : ""}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
                
//                 {/* Section 3 */}
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-800 mb-3">Latest Women's Fashion Is Right Here</h3>
                  
//                   {/* Featured product grid */}
//                   <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
//                     {[1, 2, 3, 4].map((item) => (
//                       <div key={item} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow p-2">
//                         <h5 className="text-sm font-medium text-gray-800 truncate">Trendy Fashion Item {item}</h5>
//                         <div className="flex justify-between items-center mt-1">
//                           <span className="text-sm font-bold text-gray-900">₹499</span>
//                           <span className="text-xs text-gray-500 line-through">₹999</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
                
//                 {/* Section 4 */}
//                 <div>
//                   <h4 className="text-lg font-medium text-gray-800 mb-3">Western Wear for Women</h4>
//                   <p className="text-gray-600">
//                     Are you looking to revamp your wardrobe with stylish and affordable pieces? Look no further than MyStore's extensive collection of women's western wear. Find trendy dresses, casual jeans, and comfortable tops suitable for any occasion. We constantly update our inventory with the latest trends, ensuring you stay on top of your fashion game. Browse our collection of funky jewelry and accessories to complete your look and express your unique style.
//                   </p>
//                 </div>
                
//                 {/* Accessories section without images */}
//                 <div>
//                   <h4 className="text-lg font-medium text-gray-800 mb-3">Accessories and Jewellery</h4>
//                   <div className="flex flex-wrap gap-3 mt-2">
//                     {["Bracelets", "Earrings", "Necklace", "Watches"].map((item, idx) => (
//                       <div key={idx} className="border border-gray-200 rounded p-2 text-center">
//                         <span className="text-sm text-gray-700">{item}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
                
//                 {/* Become a seller section */}
//                 <div className="bg-purple-50 p-4 rounded-lg">
//                   <h3 className="text-lg font-medium text-blue-800 mb-2">More Than Just Shopping</h3>
//                   <p className="text-blue-700 text-sm">
//                     Apart from shopping and browsing, you can also earn money! Become a seller on MyStore and turn your passion into profit. Explore our wholesale pricing, easily share products with your network, and earn a commission on every sale.
//                   </p>
//                   <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
//                     Become a Seller
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MoreAbout;

// movile view code 
import React, { useState } from 'react';

const MoreAbout = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Category data without images
  const categories = [
    {
      id: 2,
      title: "Electronics & Accessories",
      items: ["Smart Watches", "Bluetooth Earphones", "Headphones", "CCTV Cameras", "Mobile Chargers"]
    },
    {
      id: 3,
      title: "Home & Kitchen",
      items: ["Cookers", "Food Processors", "Kitchen Gloves", "Thermos & Flasks", "Water Bottles"]
    },
    {
      id: 4,
      title: "Men's Fashion",
      items: ["Men Dhoti Kurtas", "Formal Shirts", "Leather Jackets", "Denim Jeans", "Velvet Sherwanis"]
    },
    {
      id: 5,
      title: "Women's Fashion",
      items: ["Designer Lehenga", "Chikankari Kurtis", "Silk Saree", "Phulkari Dupatta", "Black Kurta"]
    },
    {
      id: 6,
      title: "Personal Care",
      items: ["Face Steamers", "Hair Care", "Beard Oil", "Deodorants", "Body Scrub"]
    }
  ];

  // Example products derived from the provided data
  const products = [
    { id: 1, name: "Designer Lehenga", price: 1499, originalPrice: 2999 },
    { id: 2, name: "Chikankari Kurtis", price: 699, originalPrice: 1399 },
    { id: 3, name: "Silk Saree", price: 999, originalPrice: 1999 },
    { id: 4, name: "Phulkari Dupatta", price: 499, originalPrice: 999 }
  ];

  // More product categories
  const accessoryItems = ["Bracelets", "Earrings", "Necklace", "Watches"];

  return (
    <div className="bg-gray-50 w-full py-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
          {/* Expandable Header Button */}
          <button
            className="w-full flex justify-between items-center p-3 sm:p-4 text-left"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="text-base sm:text-lg font-medium text-gray-700">More About Mystore</span>
            <svg
              className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Expandable Content */}
          {isOpen && (
            <div className="p-3 sm:p-4 pt-2 border-t border-gray-200">
              <div className="space-y-4 sm:space-y-6">
                {/* Section 1 */}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">Discover a World of Affordable Fashion</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Upgrade your wardrobe and stock your home with the latest trends and essentials at unbeatable prices. MyStore offers a vast selection of products across all categories.
                  </p>
                </div>

                {/* Section 2 */}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">Shop Millions of Products</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    From trendy fashion finds to essential homeware, MyStore is your one-stop shop for everything you need across 650+ categories.
                  </p>

                  {/* Category Grid - Responsive */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mt-3">
                    {categories.map((category) => (
                      <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow p-2 sm:p-3">
                        <h4 className="font-medium text-gray-800 text-sm sm:text-base mb-1 sm:mb-2">{category.title}</h4>
                        <div className="flex flex-wrap gap-1">
                          {category.items.map((item, idx) => (
                            <span
                              key={idx}
                              className="inline-block text-xs text-purple-700 hover:text-purple-900 cursor-pointer"
                            >
                              {item}{idx < category.items.length - 1 ? " | " : ""}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 3 */}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">Latest Women's Fashion</h3>

                  {/* Featured product grid - Responsive */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-2">
                    {products.map((product) => (
                      <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow p-2">
                        <h5 className="text-xs sm:text-sm font-medium text-gray-800 truncate">{product.name}</h5>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs sm:text-sm font-bold text-gray-900">₹{product.price}</span>
                          <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 4 */}
                <div>
                  <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-2">Western Wear for Women</h4>
                  <p className="text-xs sm:text-base text-gray-600">
                    Are you looking to revamp your wardrobe with stylish and affordable pieces? MyStore's extensive collection of women's western wear includes trendy dresses, casual jeans, and comfortable tops suitable for any occasion.
                  </p>
                </div>

                {/* Accessories section - Responsive */}
                <div>
                  <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-2">Accessories and Jewellery</h4>
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3 mt-2">
                    {accessoryItems.map((item, idx) => (
                      <div key={idx} className="border border-gray-200 rounded p-2 text-center">
                        <span className="text-xs sm:text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Become a seller section - Responsive */}
                <div className="bg-purple-50 p-3 sm:p-4 rounded-lg">
                  <h3 className="text-base sm:text-lg font-medium text-blue-800 mb-1 sm:mb-2">More Than Just Shopping</h3>
                  <p className="text-xs sm:text-sm text-blue-700">
                    Apart from shopping and browsing, you can also earn money! Become a seller on MyStore and turn your passion into profit.
                  </p>
                  <button className="mt-2 sm:mt-3 bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded text-xs sm:text-sm hover:bg-blue-700 transition-colors">
                    Become a Seller
                  </button>
                </div>
                
                {/* Mobile navigation menu */}
                <div className="block sm:hidden mt-4 border-t border-gray-200 pt-3">
                  <div className="text-sm font-medium text-gray-700 mb-2">Quick Links</div>
                  <ul className="space-y-2">
                    {["Lucknawi Kurties", "Bedsheet", "Dohar", "Ladies Sandles", "Painting", "Toys"].map((item, index) => (
                      <li key={index} className={`flex items-center ${index === 2 ? "text-red-500 font-medium" : "text-gray-600"}`}>
                        {index === 2 && <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>}
                        <a href="#" className="hover:text-purple-700">{item}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoreAbout;