// import React, { useState, useEffect } from 'react';
// import { 
//   Search, 
//   CheckCircle, 
//   XCircle, 
//   Edit, 
//   Save, 
//   Filter, 
//   RefreshCw, 
//   AlertTriangle,
//   Clock,
//   X
// } from 'lucide-react';

// const ProductStatus = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [editingId, setEditingId] = useState(null);
//   const [filter, setFilter] = useState("all");
//   const [notification, setNotification] = useState(null);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [bulkAction, setBulkAction] = useState("");
//   const [updating, setUpdating] = useState(false);

//   // API base URL - adjust according to your setup
//   const API_BASE_URL = 'http://localhost:4000/admin';

//   // Availability options
//   const availabilityOptions = [
//     { value: 'Available', label: 'Available', icon: <CheckCircle size={16} className="text-green-500" /> },
//     { value: 'Coming Soon', label: 'Coming Soon', icon: <Clock size={16} className="text-blue-500" /> },
//     { value: 'Out of Stock', label: 'Out of Stock', icon: <AlertTriangle size={16} className="text-red-500" /> }
//   ];

//   // Fetch products from API using native fetch
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       // Using the correct endpoint from your backend
//       const response = await fetch(`${API_BASE_URL}/product`);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
      
//       // Handle the response data structure
//       const productsData = Array.isArray(data) ? data : data.products || [];
//       setProducts(productsData);
      
//       showNotification(`Loaded ${productsData.length} products successfully`);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       showNotification("Error loading products: " + error.message, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showNotification = (message, type = "success") => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification(null), 4000);
//   };

//   // Filter products based on search term and filter selection
//   const filteredProducts = products.filter(product => {
//     const matchesSearch = product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          product.category?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     switch (filter) {
//       case "available":
//         return matchesSearch && product.availability === 'Available';
//       case "coming-soon":
//         return matchesSearch && product.availability === 'Coming Soon';
//       case "out-of-stock":
//         return matchesSearch && product.availability === 'Out of Stock';
//       case "trusted":
//         return matchesSearch && product.trusted === true;
//       case "untrusted":
//         return matchesSearch && product.trusted === false;
//       default:
//         return matchesSearch;
//     }
//   });

//   // Handle status update for a single product
//   const updateProductStatus = async (id, updates) => {
//     setUpdating(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/product/status/${id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updates),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
      
//       // Update local state
//       setProducts(products.map(product => 
//         product._id === id ? { ...product, ...updates } : product
//       ));
      
//       showNotification("Product updated successfully");
//       setEditingId(null);
//     } catch (error) {
//       console.error('Error updating product:', error);
//       showNotification(`Error: ${error.message}`, "error");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   // Handle bulk updates
//   const handleBulkUpdate = async () => {
//     if (!bulkAction || selectedProducts.length === 0) {
//       showNotification("Please select an action and at least one product", "error");
//       return;
//     }

//     let updates = {};
//     switch (bulkAction) {
//       case "make-available":
//         updates = { availability: 'Available' };
//         break;
//       case "make-coming-soon":
//         updates = { availability: 'Coming Soon' };
//         break;
//       case "make-out-of-stock":
//         updates = { availability: 'Out of Stock' };
//         break;
//       case "mark-trusted":
//         updates = { trusted: true };
//         break;
//       case "mark-untrusted":
//         updates = { trusted: false };
//         break;
//       case "reset":
//         updates = { availability: 'Out of Stock', trusted: false };
//         break;
//       default:
//         return;
//     }

//     setUpdating(true);
//     try {
//       // Process bulk updates sequentially
//       const updatePromises = selectedProducts.map(async (id) => {
//         const response = await fetch(`${API_BASE_URL}/product/status/${id}`, {
//           method: 'PATCH',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(updates),
//         });
        
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.message  || `HTTP error! status: ${response.status}`);
//         }
        
//         return response.json();
//       });
      
//       await Promise.all(updatePromises);

//       // Update local state
//       setProducts(products.map(product => 
//         selectedProducts.includes(product._id) ? { ...product, ...updates } : product
//       ));
      
//       setSelectedProducts([]);
//       setBulkAction("");
//       showNotification(`Updated ${selectedProducts.length} products successfully`);
//     } catch (error) {
//       console.error('Error in bulk update:', error);
//       showNotification(`Error: ${error.message}, "error"`);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   // Toggle product selection for bulk actions
//   const toggleProductSelection = (id) => {
//     if (selectedProducts.includes(id)) {
//       setSelectedProducts(selectedProducts.filter(productId => productId !== id));
//     } else {
//       setSelectedProducts([...selectedProducts, id]);
//     }
//   };

//   // Handle select all checkbox
//   const toggleSelectAll = () => {
//     if (selectedProducts.length === filteredProducts.length) {
//       setSelectedProducts([]);
//     } else {
//       setSelectedProducts(filteredProducts.map(product => product._id));
//     }
//   };

//   // Get availability icon based on status
//   const getAvailabilityIcon = (status) => {
//     switch(status) {
//       case 'Available':
//         return <CheckCircle size={20} className="text-green-500" />;
//       case 'Coming Soon':
//         return <Clock size={20} className="text-blue-500" />;
//       case 'Out of Stock':
//         return <AlertTriangle size={20} className="text-red-500" />;
//       default:
//         return <XCircle size={20} className="text-gray-500" />;
//     }
//   };

//   // Handle edit cancel
//   const handleCancelEdit = (productId) => {
//     // Refresh the product data to original state
//     fetchProducts();
//     setEditingId(null);
//   };

//   return (
//    <div className="p-6 max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900">Product Status Management</h2>
//           <p className="text-gray-600 mt-1">Manage product availability and trusted status</p>
//         </div>
//         <button 
//           onClick={fetchProducts} 
//           disabled={loading}
//           className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
//         >
//           <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
//           Refresh
//         </button>
//       </div>

//       {/* Notification */}
//       {notification && (
//         <div className={`p-4 mb-6 rounded-lg text-white flex items-center justify-between ${
//           notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
//         }`}>
//           <span>{notification.message}</span>
//           <button 
//             onClick={() => setNotification(null)}
//             className="ml-4 hover:bg-white hover:bg-opacity-20 rounded p-1"
//           >
//             <X size={16} />
//           </button>
//         </div>
//       )}

//       {/* Search and Filter Controls */}
//       <div className="flex flex-col lg:flex-row gap-4 mb-6">
//         <div className="relative flex-grow">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Search size={20} className="text-gray-400" />
//           </div>
//           <input
//             type="text"
//             placeholder="Search products by title, brand, or category..."
//             className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
        
//         <div className="flex items-center gap-3">
//           <Filter size={20} className="text-gray-400" />
//           <select 
//             value={filter} 
//             onChange={(e) => setFilter(e.target.value)}
//             className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-48"
//           >
//             <option value="all">All Products</option>
//             <option value="available">Available</option>
//             <option value="coming-soon">Coming Soon</option>
//             <option value="out-of-stock">Out of Stock</option>
//             <option value="trusted">Trusted</option>
//             <option value="untrusted">Not Trusted</option>
//           </select>
//         </div>
//       </div>

//       {/* Bulk Actions */}
//       {selectedProducts.length > 0 && (
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//           <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
//             <h3 className="text-sm font-semibold text-blue-800">
//               Bulk Actions ({selectedProducts.length} selected)
//             </h3>
//             <div className="flex flex-wrap gap-3 items-center">
//               <select 
//                 value={bulkAction} 
//                 onChange={(e) => setBulkAction(e.target.value)}
//                 className="border border-blue-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Action...</option>
//                 <option value="make-available">Set Available</option>
//                 <option value="make-coming-soon">Set Coming Soon</option>
//                 <option value="make-out-of-stock">Set Out of Stock</option>
//                 <option value="mark-trusted">Mark as Trusted</option>
//                 <option value="mark-untrusted">Mark as Not Trusted</option>
//                 <option value="reset">Reset Status</option>
//               </select>
              
//               <button 
//                 onClick={handleBulkUpdate}
//                 disabled={!bulkAction || updating}
//                 className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors ${
//                   !bulkAction || updating
//                     ? 'bg-gray-300 cursor-not-allowed' 
//                     : 'bg-blue-600 hover:bg-blue-700'
//                 }`}
//               >
//                 {`updating ? 'Updating...' : Apply to ${selectedProducts.length} products`}
//               </button>
              
//               <button 
//                 onClick={() => setSelectedProducts([])}
//                 className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800"
//               >
//                 Clear Selection
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Product Table */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         {loading ? (
//           <div className="p-12 text-center">
//             <div className="flex justify-center mb-4">
//               <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
//             </div>
//             <p className="text-gray-500 font-medium">Loading products...</p>
//           </div>
//         ) : filteredProducts.length === 0 ? (
//           <div className="p-12 text-center">
//             <AlertTriangle size={48} className="mx-auto text-gray-400 mb-4" />
//             <p className="text-gray-500 font-medium">No products found</p>
//             <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filter criteria</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-4 text-left">
//                     <input 
//                       type="checkbox" 
//                       checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
//                       onChange={toggleSelectAll}
//                       className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                     />
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Product Details
//                   </th>
//                   <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Availability Status
//                   </th>
//                   <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Trusted Status
//                   </th>
//                   <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredProducts.map(product => (
//                   <tr key={product._id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <input 
//                         type="checkbox" 
//                         checked={selectedProducts.includes(product._id)}
//                         onChange={() => toggleProductSelection(product._id)}
//                         className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                       />
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center">
//                         {product.images && product.images.length > 0 ? (
//                           <img 
//                             src={product.images[0]} 
//                             alt={product.title} 
//                             className="h-12 w-12 rounded-lg object-cover mr-4 border border-gray-200"
//                           />
//                         ) : (
//                           <div className="h-12 w-12 bg-gray-100 rounded-lg mr-4 flex items-center justify-center border border-gray-200">
//                             <span className="text-xs text-gray-400 font-medium">No img</span>
//                           </div>
//                         )}
//                         <div className="min-w-0 flex-1">
//                           <div className="text-sm font-semibold text-gray-900 truncate">{product.title}</div>
//                           <div className="text-sm text-gray-500">
//                             {product.brand && <span className="mr-2">Brand: {product.brand}</span>}
//                             {product.category && <span>Category: {product.category}</span>}
//                           </div>
//                           <div className="text-xs text-gray-400 mt-1">
//                             Price: ${product.price} | Stock: {product.quantity || 0}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {editingId === product._id ? (
//                         <select 
//                           className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           value={product.availability || 'Out of Stock'}
//                           onChange={(e) => {
//                             setProducts(products.map(p => 
//                               p._id === product._id ? { ...p, availability: e.target.value } : p
//                             ));
//                           }}
//                         >
//                           {availabilityOptions.map(option => (
//                             <option key={option.value} value={option.value}>
//                               {option.label}
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         <div className="flex items-center justify-center">
//                           {getAvailabilityIcon(product.availability || 'Out of Stock')}
//                           <span className="ml-2 text-sm font-medium text-gray-700">
//                             {product.availability || 'Out of Stock'}
//                           </span>
//                         </div>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-center">
//                       {editingId === product._id ? (
//                         <select 
//                           className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           value={product.trusted ? "true" : "false"}
//                           onChange={(e) => {
//                             setProducts(products.map(p => 
//                               p._id === product._id ? { ...p, trusted: e.target.value === "true" } : p
//                             ));
//                           }}
//                         >
//                           <option value="true">Yes</option>
//                           <option value="false">No</option>
//                         </select>
//                       ) : (
//                         <div className="flex justify-center items-center">
//                           {product.trusted ? (
//                             <>
//                               <CheckCircle size={18} className="text-green-500" />
//                               <span className="ml-2 text-sm font-medium text-green-700">Yes</span>
//                             </>
//                           ) : (
//                             <>
//                               <XCircle size={18} className="text-red-500" />
//                               <span className="ml-2 text-sm font-medium text-red-700">No</span>
//                             </>
//                           )}
//                         </div>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-center">
//                       {editingId === product._id ? (
//                         <div className="flex justify-center gap-2">
//                           <button
//                             onClick={() => {
//                               const updates = {
//                                 availability: products.find(p => p._id === product._id).availability,
//                                 trusted: products.find(p => p._id === product._id).trusted
//                               };
//                               updateProductStatus(product._id, updates);
//                             }}
//                             disabled={updating}
//                             className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50 transition-colors disabled:opacity-50"
//                             title="Save changes"
//                           >
//                             <Save size={16} />
//                           </button>
//                           <button
//                             onClick={() => handleCancelEdit(product._id)}
//                             disabled={updating}
//                             className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
//                             title="Cancel editing"
//                           >
//                             <X size={16} />
//                           </button>
//                         </div>
//                       ) : (
//                         <button
//                           onClick={() => setEditingId(product._id)}
//                           className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
//                           title="Edit product status"
//                         >
//                           <Edit size={16} />
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Summary */}
//       <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm text-gray-600">
//         <div>
//           Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> of{' '}
//           <span className="font-semibold text-gray-900">{products.length}</span> products
//         </div>
//         <div className="flex items-center gap-4">
//           <div className="flex items-center gap-2">
//             <CheckCircle size={16} className="text-green-500" />
//             <span>Available: {products.filter(p => p.availability === 'Available').length}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Clock size={16} className="text-blue-500" />
//             <span>Coming Soon: {products.filter(p => p.availability === 'Coming Soon').length}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <AlertTriangle size={16} className="text-red-500" />
//             <span>Out of Stock: {products.filter(p => p.availability === 'Out of Stock').length}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ProductStatus;

// movbile view 
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  CheckCircle, 
  XCircle, 
  Edit, 
  Save, 
  Filter, 
  RefreshCw, 
  AlertTriangle,
  Clock,
  X,
  Menu,
  ChevronDown,
  Eye
} from 'lucide-react';

const ProductStatus = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [notification, setNotification] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [bulkAction, setBulkAction] = useState("");
  const [updating, setUpdating] = useState(false);
  const [mobileView, setMobileView] = useState('table'); // 'table' or 'cards'
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // API base URL - adjust according to your setup
  const API_BASE_URL = 'http://localhost:4000/admin';

  // Availability options
  const availabilityOptions = [
    { value: 'Available', label: 'Available', icon: <CheckCircle size={16} className="text-green-500" /> },
    { value: 'Coming Soon', label: 'Coming Soon', icon: <Clock size={16} className="text-blue-500" /> },
    { value: 'Out of Stock', label: 'Out of Stock', icon: <AlertTriangle size={16} className="text-red-500" /> }
  ];

  // Fetch products from API using native fetch
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Using the correct endpoint from your backend
      const response = await fetch(`${API_BASE_URL}/product`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle the response data structure
      const productsData = Array.isArray(data) ? data : data.products || [];
      setProducts(productsData);
      
      showNotification(`Loaded ${productsData.length} products successfully`);
    } catch (error) {
      console.error('Error fetching products:', error);
      showNotification("Error loading products: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Filter products based on search term and filter selection
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category?.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (filter) {
      case "available":
        return matchesSearch && product.availability === 'Available';
      case "coming-soon":
        return matchesSearch && product.availability === 'Coming Soon';
      case "out-of-stock":
        return matchesSearch && product.availability === 'Out of Stock';
      case "trusted":
        return matchesSearch && product.trusted === true;
      case "untrusted":
        return matchesSearch && product.trusted === false;
      default:
        return matchesSearch;
    }
  });

  // Handle status update for a single product
  const updateProductStatus = async (id, updates) => {
    setUpdating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/product/status/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Update local state
      setProducts(products.map(product => 
        product._id === id ? { ...product, ...updates } : product
      ));
      
      showNotification("Product updated successfully");
      setEditingId(null);
    } catch (error) {
      console.error('Error updating product:', error);
      showNotification(`Error: ${error.message}`, "error");
    } finally {
      setUpdating(false);
    }
  };

  // Handle bulk updates
  const handleBulkUpdate = async () => {
    if (!bulkAction || selectedProducts.length === 0) {
      showNotification("Please select an action and at least one product", "error");
      return;
    }

    let updates = {};
    switch (bulkAction) {
      case "make-available":
        updates = { availability: 'Available' };
        break;
      case "make-coming-soon":
        updates = { availability: 'Coming Soon' };
        break;
      case "make-out-of-stock":
        updates = { availability: 'Out of Stock' };
        break;
      case "mark-trusted":
        updates = { trusted: true };
        break;
      case "mark-untrusted":
        updates = { trusted: false };
        break;
      case "reset":
        updates = { availability: 'Out of Stock', trusted: false };
        break;
      default:
        return;
    }

    setUpdating(true);
    try {
      // Process bulk updates sequentially
      const updatePromises = selectedProducts.map(async (id) => {
        const response = await fetch(`${API_BASE_URL}/product/status/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updates),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message  || `HTTP error! status: ${response.status}`);
        }
        
        return response.json();
      });
      
      await Promise.all(updatePromises);

      // Update local state
      setProducts(products.map(product => 
        selectedProducts.includes(product._id) ? { ...product, ...updates } : product
      ));
      
      setSelectedProducts([]);
      setBulkAction("");
      showNotification(`Updated ${selectedProducts.length} products successfully`);
    } catch (error) {
      console.error('Error in bulk update:', error);
      showNotification(`Error: ${error.message}`, "error");
    } finally {
      setUpdating(false);
    }
  };

  // Toggle product selection for bulk actions
  const toggleProductSelection = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(productId => productId !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  // Handle select all checkbox
  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(product => product._id));
    }
  };

  // Get availability icon based on status
  const getAvailabilityIcon = (status) => {
    switch(status) {
      case 'Available':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'Coming Soon':
        return <Clock size={20} className="text-blue-500" />;
      case 'Out of Stock':
        return <AlertTriangle size={20} className="text-red-500" />;
      default:
        return <XCircle size={20} className="text-gray-500" />;
    }
  };

  // Handle edit cancel
  const handleCancelEdit = (productId) => {
    // Refresh the product data to original state
    fetchProducts();
    setEditingId(null);
  };

  // Mobile Card Component
  const ProductCard = ({ product }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-start space-x-3">
        <input 
          type="checkbox" 
          checked={selectedProducts.includes(product._id)}
          onChange={() => toggleProductSelection(product._id)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
        />
        
        <div className="flex-1 min-w-0">
          {/* Product Image and Title */}
          <div className="flex items-center space-x-3 mb-3">
            {product.images && product.images.length > 0 ? (
              <img 
                src={product.images[0]} 
                alt={product.title} 
                className="h-16 w-16 rounded-lg object-cover border border-gray-200 flex-shrink-0"
              />
            ) : (
              <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 flex-shrink-0">
                <span className="text-xs text-gray-400 font-medium">No img</span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 truncate">{product.title}</h3>
              <div className="text-xs text-gray-500 mt-1">
                {product.brand && <div>Brand: {product.brand}</div>}
                {product.category && <div>Category: {product.category}</div>}
                <div className="mt-1">Price: ${product.price} | Stock: {product.quantity || 0}</div>
              </div>
            </div>
          </div>

          {/* Status Information */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-600">Availability:</span>
              {editingId === product._id ? (
                <select 
                  className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={product.availability || 'Out of Stock'}
                  onChange={(e) => {
                    setProducts(products.map(p => 
                      p._id === product._id ? { ...p, availability: e.target.value } : p
                    ));
                  }}
                >
                  {availabilityOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="flex items-center">
                  {getAvailabilityIcon(product.availability || 'Out of Stock')}
                  <span className="ml-1 text-xs font-medium text-gray-700">
                    {product.availability || 'Out of Stock'}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-600">Trusted:</span>
              {editingId === product._id ? (
                <select 
                  className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={product.trusted ? "true" : "false"}
                  onChange={(e) => {
                    setProducts(products.map(p => 
                      p._id === product._id ? { ...p, trusted: e.target.value === "true" } : p
                    ));
                  }}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              ) : (
                <div className="flex items-center">
                  {product.trusted ? (
                    <>
                      <CheckCircle size={16} className="text-green-500" />
                      <span className="ml-1 text-xs font-medium text-green-700">Yes</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={16} className="text-red-500" />
                      <span className="ml-1 text-xs font-medium text-red-700">No</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 mt-4 pt-3 border-t border-gray-100">
            {editingId === product._id ? (
              <>
                <button
                  onClick={() => {
                    const updates = {
                      availability: products.find(p => p._id === product._id).availability,
                      trusted: products.find(p => p._id === product._id).trusted
                    };
                    updateProductStatus(product._id, updates);
                  }}
                  disabled={updating}
                  className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50 transition-colors disabled:opacity-50"
                  title="Save changes"
                >
                  <Save size={16} />
                </button>
                <button
                  onClick={() => handleCancelEdit(product._id)}
                  disabled={updating}
                  className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                  title="Cancel editing"
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditingId(product._id)}
                className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                title="Edit product status"
              >
                <Edit size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Product Status Management</h2>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage product availability and trusted status</p>
          </div>
          <button 
            onClick={fetchProducts} 
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors w-full sm:w-auto"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`p-4 mb-6 rounded-lg text-white flex items-center justify-between ${
            notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
          }`}>
            <span className="text-sm sm:text-base">{notification.message}</span>
            <button 
              onClick={() => setNotification(null)}
              className="ml-4 hover:bg-white hover:bg-opacity-20 rounded p-1 flex-shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors w-full justify-center"
          >
            <Filter size={16} />
            Filters & Search
            <ChevronDown size={16} className={`transform transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Search and Filter Controls */}
        <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products by title, brand, or category..."
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Filter size={20} className="text-gray-400 hidden lg:block" />
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full lg:min-w-48 text-sm sm:text-base"
              >
                <option value="all">All Products</option>
                <option value="available">Available</option>
                <option value="coming-soon">Coming Soon</option>
                <option value="out-of-stock">Out of Stock</option>
                <option value="trusted">Trusted</option>
                <option value="untrusted">Not Trusted</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile View Toggle */}
        <div className="lg:hidden mb-4 flex gap-2">
          <button
            onClick={() => setMobileView('table')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              mobileView === 'table' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Table View
          </button>
          <button
            onClick={() => setMobileView('cards')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              mobileView === 'cards' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Card View
          </button>
        </div>

        {/* Bulk Actions */}
        {selectedProducts.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-blue-800">
                Bulk Actions ({selectedProducts.length} selected)
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <select 
                  value={bulkAction} 
                  onChange={(e) => setBulkAction(e.target.value)}
                  className="border border-blue-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                >
                  <option value="">Select Action...</option>
                  <option value="make-available">Set Available</option>
                  <option value="make-coming-soon">Set Coming Soon</option>
                  <option value="make-out-of-stock">Set Out of Stock</option>
                  <option value="mark-trusted">Mark as Trusted</option>
                  <option value="mark-untrusted">Mark as Not Trusted</option>
                  <option value="reset">Reset Status</option>
                </select>
                
                <div className="flex gap-2">
                  <button 
                    onClick={handleBulkUpdate}
                    disabled={!bulkAction || updating}
                    className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors flex-1 sm:flex-none ${
                      !bulkAction || updating
                        ? 'bg-gray-300 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {updating ? 'Updating...' : `Apply to ${selectedProducts.length} products`}
                  </button>
                  
                  <button 
                    onClick={() => setSelectedProducts([])}
                    className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 whitespace-nowrap"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Display */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="flex justify-center mb-4">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              </div>
              <p className="text-gray-500 font-medium">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-12 text-center">
              <AlertTriangle size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 font-medium">No products found</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left">
                        <input 
                          type="checkbox" 
                          checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                          onChange={toggleSelectAll}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Product Details
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Availability Status
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Trusted Status
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.map(product => (
                      <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input 
                            type="checkbox" 
                            checked={selectedProducts.includes(product._id)}
                            onChange={() => toggleProductSelection(product._id)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {product.images && product.images.length > 0 ? (
                              <img 
                                src={product.images[0]} 
                                alt={product.title} 
                                className="h-12 w-12 rounded-lg object-cover mr-4 border border-gray-200"
                              />
                            ) : (
                              <div className="h-12 w-12 bg-gray-100 rounded-lg mr-4 flex items-center justify-center border border-gray-200">
                                <span className="text-xs text-gray-400 font-medium">No img</span>
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-semibold text-gray-900 truncate">{product.title}</div>
                              <div className="text-sm text-gray-500">
                                {product.brand && <span className="mr-2">Brand: {product.brand}</span>}
                                {product.category && <span>Category: {product.category}</span>}
                              </div>
                              <div className="text-xs text-gray-400 mt-1">
                                Price: ${product.price} | Stock: {product.quantity || 0}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingId === product._id ? (
                            <select 
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={product.availability || 'Out of Stock'}
                              onChange={(e) => {
                                setProducts(products.map(p => 
                                  p._id === product._id ? { ...p, availability: e.target.value } : p
                                ));
                              }}
                            >
                              {availabilityOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <div className="flex items-center justify-center">
                              {getAvailabilityIcon(product.availability || 'Out of Stock')}
                              <span className="ml-2 text-sm font-medium text-gray-700">
                                {product.availability || 'Out of Stock'}
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {editingId === product._id ? (
                            <select 
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={product.trusted ? "true" : "false"}
                              onChange={(e) => {
                                setProducts(products.map(p => 
                                  p._id === product._id ? { ...p, trusted: e.target.value === "true" } : p
                                ));
                              }}
                            >
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                            </select>
                          ) : (
                            <div className="flex justify-center items-center">
                              {product.trusted ? (
                                <>
                                  <CheckCircle size={18} className="text-green-500" />
                                  <span className="ml-2 text-sm font-medium text-green-700">Yes</span>
                                </>
                              ) : (
                                <>
                                  <XCircle size={18} className="text-red-500" />
                                  <span className="ml-2 text-sm font-medium text-red-700">No</span>
                                </>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {editingId === product._id ? (
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => {
                                  const updates = {
                                    availability: products.find(p => p._id === product._id).availability,
                                    trusted: products.find(p => p._id === product._id).trusted
                                  };
                                  updateProductStatus(product._id, updates);
                                }}
                                disabled={updating}
                                className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50 transition-colors disabled:opacity-50"
                                title="Save changes"
                              >
                                <Save size={16} />
                              </button>
                              <button
                                onClick={() => handleCancelEdit(product._id)}
                                disabled={updating}
                                className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                                title="Cancel editing"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setEditingId(product._id)}
                              className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                              title="Edit product status"
                            >
                              <Edit size={16} />
                            </button>
                          )}
                        </td>
 </tr>
                ))}
              </tbody>
            </table>
          </div>
          </>
        )}
      </div>
    

      {/* Summary */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm text-gray-600">
        <div>
          Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> of{' '}
          <span className="font-semibold text-gray-900">{products.length}</span> products
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500" />
            <span>Available: {products.filter(p => p.availability === 'Available').length}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-blue-500" />
            <span>Coming Soon: {products.filter(p => p.availability === 'Coming Soon').length}</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-red-500" />
            <span>Out of Stock: {products.filter(p => p.availability === 'Out of Stock').length}</span>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
};
export default ProductStatus;
