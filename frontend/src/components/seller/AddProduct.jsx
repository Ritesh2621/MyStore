// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {Link} from 'react-router-dom'

// const AddProduct = () => {
//   const [newProduct, setNewProduct] = useState({
//     title: '',
//     description: '',
//     category: '',
//     subcategory: '',
//     subsubcategory: '',
//     price: '',
//     discountPercentage: '',
//     rating: '0',
//     brand: '',
//     images: [''],
//     reviews: [],
//     sellername: '',
//     quantity: '',
//     warrantyInformation: '',
//     shippingInformation: ''
//   });

//   const [products, setProducts] = useState([]);
//   const [sellerId, setSellerId] = useState('');
//   const [isFormVisible, setIsFormVisible] = useState(false);

//   useEffect(() => {
//     const sellerIdFromStorage = localStorage.getItem('userId'); 
//     if (sellerIdFromStorage) {
//       setSellerId(sellerIdFromStorage);
//     }
//   }, []);

//   useEffect(() => {
//     if (sellerId) {
//       // Fetch products for the specific seller
//       axios
//         .get(`http://localhost:4000/supplier/products-by-seller/${sellerId}`)
//         .then((response) => {
//           setProducts(response.data);
//         })
//         .catch((error) => {
//           console.error('There was an error fetching products!', error);
//         });
//     }
//   }, [sellerId]); // Re-fetch products whenever sellerId changes

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewProduct({
//       ...newProduct,
//       [name]: value
//     });
//   };

//   const handleImageChange = (e, index) => {
//     const newImages = [...newProduct.images];
//     newImages[index] = e.target.value;
//     setNewProduct({
//       ...newProduct,
//       images: newImages
//     });
//   };

//   const handleEditProduct = (productId) => {
//     // Navigate to edit page or open edit modal with the product ID
//     window.location.href = `/admin/product/edit/${productId}`;
// };

//   const addImageField = () => {
//     setNewProduct({
//       ...newProduct,
//       images: [...newProduct.images, '']
//     });
//   };

//   const handleAddProduct = (e) => {
//     e.preventDefault();

//     // Basic validation for required fields
//     const requiredFields = ['title', 'description', 'category', 'price', 'discountPercentage',
//       'brand', 'sellername', 'quantity', 'warrantyInformation', 'shippingInformation'];

//     for (const field of requiredFields) {
//       if (!newProduct[field]) {
//         alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`);
//         return;
//       }
//     }

//     // Validate at least one image
//     if (newProduct.images.length === 0 || !newProduct.images[0]) {
//       alert('Please add at least one product image URL');
//       return;
//     }

//     const newProductItem = {
//       ...newProduct,
//       price: parseFloat(newProduct.price),
//       discountPercentage: parseFloat(newProduct.discountPercentage),
//       rating: parseFloat(newProduct.rating),
//       sellerId, // Use the sellerId from state
//       images: newProduct.images.filter(url => url.trim() !== '')
//     };

//     // Send the product data to the API (matching backend route)
//     axios
//       .post('http://localhost:4000/product/product', newProductItem)  // Make sure this matches the backend route
//       .then((response) => {
//         console.log('Product added successfully:', response.data);
//         // Update products state with the new product
//         setProducts([...products, response.data.data]);  // `response.data.data` contains the newly created product
        
//         // Hide form and reset
//         setIsFormVisible(false);
//         setNewProduct({
//           title: '',
//           description: '',
//           category: '',
//           subcategory: '',
//           subsubcategory: '',
//           price: '',
//           discountPercentage: '',
//           rating: '0',
//           brand: '',
//           images: [''],
//           reviews: [],
//           sellername: '',
//           quantity: '',
//           warrantyInformation: '',
//           shippingInformation: '',
//         });
//       })
//       .catch((error) => {
//         console.error('There was an error adding the product!', error);
//       });
//   };


//   return (
//     <div>
//       {/* Product Inventory Section */}
//       <div className="mb-6 flex justify-between items-center">
//         <h2 className="text-xl font-semibold text-gray-800">Your Product Inventory</h2>
//         <div className="flex space-x-2">
//           <button 
//             className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//             </svg>
//             Export
//           </button>
//           <button 
//             onClick={() => setIsFormVisible(!isFormVisible)} 
//             className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 flex items-center"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//             </svg>
//             {isFormVisible ? 'Cancel' : 'Add New Product'}
//           </button>
//         </div>
//       </div>

//       {/* Add Product Form */}
//       {isFormVisible && (
//         <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-100">
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="text-lg font-semibold text-gray-800">Add New Product</h3>
//             <button 
//               onClick={() => setIsFormVisible(false)}
//               className="text-gray-400 hover:text-gray-500"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//               </svg>
//             </button>
//           </div>
          
//           <form onSubmit={handleAddProduct}>
//             {/* Tabs for Form Sections */}
//             <div className="border-b border-gray-200 mb-6">
//               <nav className="-mb-px flex space-x-8">
//                 <button type="button" className="border-b-2 border-blue-500 py-4 px-1 text-sm font-medium text-blue-600">
//                   Product Details
//                 </button>
//                 <button type="button" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
//                   Images & Media
//                 </button>
//                 <button type="button" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
//                   Pricing & Inventory
//                 </button>
//               </nav>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {/* Left Column - Basic Info */}
//               <div className="md:col-span-2 space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Product Title*</label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={newProduct.title}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Enter product title"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
//                   <textarea
//                     name="description"
//                     value={newProduct.description}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Enter product description"
//                     rows="4"
//                   />
//                 </div>
                
//                 {/* Images */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Product Images*</label>
//                   <div className="space-y-2">
//                     {newProduct.images.map((image, index) => (
//                       <div key={index} className="flex">
//                         <input
//                           type="text"
//                           value={image}
//                           onChange={(e) => handleImageChange(e, index)}
//                           className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mr-2"
//                           placeholder="Enter image URL"
//                         />
//                         {index === newProduct.images.length - 1 && (
//                           <button
//                             type="button"
//                             onClick={addImageField}
//                             className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                               <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
//                             </svg>
//                             Add
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
              
//               {/* Right Column - Categories & Pricing */}
//               <div className="space-y-6">
//                 <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
//                   <h4 className="font-medium text-gray-700 mb-3">Categories</h4>
                  
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
//                       <input
//                         type="text"
//                         name="category"
//                         value={newProduct.category}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="e.g. Electronics"
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
//                       <input
//                         type="text"
//                         name="subcategory"
//                         value={newProduct.subcategory}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="e.g. Laptops"
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Sub-subcategory</label>
//                       <input
//                         type="text"
//                         name="subsubcategory"
//                         value={newProduct.subsubcategory}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="e.g. Gaming Laptops"
//                       />
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
//                   <h4 className="font-medium text-gray-700 mb-3">Price & Stock</h4>
                  
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)*</label>
//                       <input
//                         type="number"
//                         name="price"
//                         value={newProduct.price}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="0.00"
//                         min="0"
//                         step="0.01"
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)*</label>
//                       <input
//                         type="number"
//                         name="discountPercentage"
//                         value={newProduct.discountPercentage}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="0"
//                         min="0"
//                         max="100"
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Quantity*</label>
//                       <input
//                         type="text"
//                         name="quantity"
//                         value={newProduct.quantity}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="Stock quantity"
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Brand*</label>
//                       <input
//                         type="text"
//                         name="brand"
//                         value={newProduct.brand}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="Brand name"
//                       />
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
//                   <h4 className="font-medium text-gray-700 mb-3">Shipping & Warranty</h4>
                  
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Warranty*</label>
//                       <input
//                         type="text"
//                         name="warrantyInformation"
//                         value={newProduct.warrantyInformation}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="e.g. 1 year limited warranty"
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Shipping*</label>
//                       <input
//                         type="text"
//                         name="shippingInformation"
//                         value={newProduct.shippingInformation}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="e.g. Free shipping, 3-5 days"
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Seller Name*</label>
//                       <input
//                         type="text"
//                         name="sellername"
//                         value={newProduct.sellername}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="Your business name"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Form Actions */}
//               <div className="md:col-span-3 border-t pt-6 flex justify-end space-x-3">
//                 <button
//                   type="button"
//                   onClick={() => setIsFormVisible(false)}
//                   className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                 >
//                   Add Product
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Product Table */}
//       <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Product
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Category
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Price
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Discount
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Stock
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 {/* <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th> */}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {products.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
//                     No products found. Add your first product to get started.
//                   </td>
//                 </tr>
//               ) : (
//                 products.map((product) => (
//                   <tr key={product.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="h-10 w-10 flex-shrink-0 rounded-md bg-gray-100 flex items-center justify-center">
//                           {product.images && product.images.length > 0 ? (
//                             <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center overflow-hidden">
//                               <span className="text-xs text-gray-500">IMG</span>
//                             </div>
//                           ) : (
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                             </svg>
//                           )}
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900 truncate max-w-xs">{product.title}</div>
//                           <div className="text-sm text-gray-500">{product.brand}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{product.category}</div>
//                       {product.subcategory && (
//                         <div className="text-sm text-gray-500">{product.subcategory}</div>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
//                       ${product.price.toFixed(2)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
//                       {product.discountPercentage > 0 ? (
//                         <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                           {product.discountPercentage}%
//                         </span>
//                       ) : (
//                         <span className="text-gray-500">-</span>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
//                       {product.quantity}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-center">
//                       <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
//                         Active
//                       </span>
//                     </td>
//                     {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <button onClick={handleEditProduct} className="text-blue-600 hover:text-blue-900 mr-3">
//                         Edit
//                       </button>
//                       <button className="text-red-600 hover:text-red-900">
//                         Delete
//                       </button>
//                     </td> */}
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;

// mobile view 

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    subsubcategory: '',
    price: '',
    discountPercentage: '',
    rating: '0',
    brand: '',
    images: [''],
    reviews: [],
    sellername: '',
    quantity: '',
    warrantyInformation: '',
    shippingInformation: ''
  });

  const [products, setProducts] = useState([]);
  const [sellerId, setSellerId] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const sellerIdFromStorage = localStorage.getItem('userId'); 
    if (sellerIdFromStorage) {
      setSellerId(sellerIdFromStorage);
    }
  }, []);

  useEffect(() => {
    if (sellerId) {
      // Fetch products for the specific seller
      axios
        .get(`http://localhost:4000/supplier/products-by-seller/${sellerId}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error('There was an error fetching products!', error);
        });
    }
  }, [sellerId]); // Re-fetch products whenever sellerId changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  const handleImageChange = (e, index) => {
    const newImages = [...newProduct.images];
    newImages[index] = e.target.value;
    setNewProduct({
      ...newProduct,
      images: newImages
    });
  };

  const handleEditProduct = (productId) => {
    // Navigate to edit page or open edit modal with the product ID
    window.location.href = `/admin/product/edit/${productId}`;
  };

  const addImageField = () => {
    setNewProduct({
      ...newProduct,
      images: [...newProduct.images, '']
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    // Basic validation for required fields
    const requiredFields = ['title', 'description', 'category', 'price', 'discountPercentage',
      'brand', 'sellername', 'quantity', 'warrantyInformation', 'shippingInformation'];

    for (const field of requiredFields) {
      if (!newProduct[field]) {
        alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`);
        return;
      }
    }

    // Validate at least one image
    if (newProduct.images.length === 0 || !newProduct.images[0]) {
      alert('Please add at least one product image URL');
      return;
    }

    const newProductItem = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      discountPercentage: parseFloat(newProduct.discountPercentage),
      rating: parseFloat(newProduct.rating),
      sellerId, // Use the sellerId from state
      images: newProduct.images.filter(url => url.trim() !== '')
    };

    // Send the product data to the API (matching backend route)
    axios
      .post('http://localhost:4000/product/product', newProductItem)  // Make sure this matches the backend route
      .then((response) => {
        console.log('Product added successfully:', response.data);
        // Update products state with the new product
        setProducts([...products, response.data.data]);  // `response.data.data` contains the newly created product
        
        // Hide form and reset
        setIsFormVisible(false);
        setNewProduct({
          title: '',
          description: '',
          category: '',
          subcategory: '',
          subsubcategory: '',
          price: '',
          discountPercentage: '',
          rating: '0',
          brand: '',
          images: [''],
          reviews: [],
          sellername: '',
          quantity: '',
          warrantyInformation: '',
          shippingInformation: '',
        });
      })
      .catch((error) => {
        console.error('There was an error adding the product!', error);
      });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      {/* Product Inventory Section - Responsive Header */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Your Product Inventory</h2>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button 
            className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </button>
          <button 
            onClick={() => setIsFormVisible(!isFormVisible)} 
            className="px-3 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 flex items-center flex-grow sm:flex-grow-0 justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {isFormVisible ? 'Cancel' : 'Add New Product'}
          </button>
        </div>
      </div>

      {/* Add Product Form - Responsive */}
      {isFormVisible && (
        <div className="mb-8 bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Add New Product</h3>
            <button 
              onClick={() => setIsFormVisible(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleAddProduct}>
            {/* Tabs for Form Sections - Mobile Friendly */}
            <div className="border-b border-gray-200 mb-6 overflow-x-auto">
              <nav className="-mb-px flex space-x-4 sm:space-x-8 whitespace-nowrap">
                <button 
                  type="button" 
                  onClick={() => setActiveTab('details')}
                  className={`border-b-2 py-3 px-1 text-sm font-medium ${
                    activeTab === 'details' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Product Details
                </button>
                <button 
                  type="button"
                  onClick={() => setActiveTab('media')}
                  className={`border-b-2 py-3 px-1 text-sm font-medium ${
                    activeTab === 'media' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Images & Media
                </button>
                <button 
                  type="button"
                  onClick={() => setActiveTab('pricing')}
                  className={`border-b-2 py-3 px-1 text-sm font-medium ${
                    activeTab === 'pricing' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Pricing & Inventory
                </button>
              </nav>
            </div>
            
            {/* Conditional Content Based on Tab */}
            {activeTab === 'details' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Basic Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Title*</label>
                    <input
                      type="text"
                      name="title"
                      value={newProduct.title}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter product title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                    <textarea
                      name="description"
                      value={newProduct.description}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter product description"
                      rows="4"
                    />
                  </div>
                </div>
                
                {/* Right Column - Categories */}
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <h4 className="font-medium text-gray-700 mb-3">Categories</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                        <input
                          type="text"
                          name="category"
                          value={newProduct.category}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g. Electronics"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                        <input
                          type="text"
                          name="subcategory"
                          value={newProduct.subcategory}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g. Laptops"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sub-subcategory</label>
                        <input
                          type="text"
                          name="subsubcategory"
                          value={newProduct.subsubcategory}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g. Gaming Laptops"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Images*</label>
                  <div className="space-y-3">
                    {newProduct.images.map((image, index) => (
                      <div key={index} className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={image}
                          onChange={(e) => handleImageChange(e, index)}
                          className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter image URL"
                        />
                        {index === newProduct.images.length - 1 && (
                          <button
                            type="button"
                            onClick={addImageField}
                            className="inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Add Image
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-gray-500">Add URLs for your product images.</p>
                </div>
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className="grid grid-cols-1 gap-6">
                {/* Price & Stock */}
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium text-gray-700 mb-3">Price & Stock</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)*</label>
                      <input
                        type="number"
                        name="price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)*</label>
                      <input
                        type="number"
                        name="discountPercentage"
                        value={newProduct.discountPercentage}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0"
                        min="0"
                        max="100"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quantity*</label>
                      <input
                        type="text"
                        name="quantity"
                        value={newProduct.quantity}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Stock quantity"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Brand*</label>
                      <input
                        type="text"
                        name="brand"
                        value={newProduct.brand}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Brand name"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Shipping & Warranty */}
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium text-gray-700 mb-3">Shipping & Warranty</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Warranty*</label>
                      <input
                        type="text"
                        name="warrantyInformation"
                        value={newProduct.warrantyInformation}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g. 1 year limited warranty"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Shipping*</label>
                      <input
                        type="text"
                        name="shippingInformation"
                        value={newProduct.shippingInformation}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g. Free shipping, 3-5 days"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Seller Name*</label>
                      <input
                        type="text"
                        name="sellername"
                        value={newProduct.sellername}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your business name"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Form Actions - Fixed at Bottom for All Tabs */}
            <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsFormVisible(false)}
                className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 order-1 sm:order-2"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Product Table - Responsive */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Category
                </th>
                <th scope="col" className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Discount
                </th>
                <th scope="col" className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Stock
                </th>
                <th scope="col" className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 sm:px-6 py-4 text-center text-sm text-gray-500">
                    No products found. Add your first product to get started.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-md bg-gray-100 flex items-center justify-center">
                          {product.images && product.images.length > 0 ? (
                            <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center overflow-hidden">
                              <span className="text-xs text-gray-500">IMG</span>
                            </div>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 truncate max-w-xs">{product.title}</div>
                          <div className="text-sm text-gray-500">{product.brand}</div>
                          <div className="text-xs text-gray-500 sm:hidden">{product.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-gray-900">{product.category}</div>
                      {product.subcategory && (
                        <div className="text-sm text-gray-500">{product.subcategory}</div>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm hidden md:table-cell">
                      {product.discountPercentage > 0 ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {product.discountPercentage}%
                        </span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 hidden sm:table-cell">
                      {product.quantity}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        Active
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Mobile View Pagination */}
        {products.length > 0 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{products.length}</span> of{' '}
                  <span className="font-medium">{products.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    1
                  </span>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Quick Stats - Show on small screens */}
      {products.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:hidden">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm font-medium text-gray-500">Total Products</div>
            <div className="mt-1 text-2xl font-semibold text-gray-900">{products.length}</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm font-medium text-gray-500">Active Products</div>
            <div className="mt-1 text-2xl font-semibold text-gray-900">{products.length}</div>
          </div>
        </div>
      )}

      {/* Empty State - Better Mobile Experience */}
      {products.length === 0 && !isFormVisible && (
        <div className="text-center py-12 px-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding your first product to your inventory.</p>
          <div className="mt-6">
            <button
              onClick={() => setIsFormVisible(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Product
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;