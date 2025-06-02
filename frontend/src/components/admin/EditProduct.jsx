// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const EditProduct = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [product, setProduct] = useState({
//         title: '',
//         brand: '',
//         category: '',
//         subcategory: '',
//         subsubcategory: '',
//         description: '',
//         price: 0,
//         discountPercentage: 0,
//         quantity: 0,
//         images: [],
//         warrantyInformation: '',
//         shippingInformation: '',
//         sellerName: '',
//         rating: 0
//     });
//     const [newImage, setNewImage] = useState('');
//     const [formErrors, setFormErrors] = useState({});

//     useEffect(() => {
//         fetchProduct();
//     }, [id]);

//     const fetchProduct = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.get(`http://localhost:4000/product/${id}`);
//             setProduct(response.data);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching product:', error);
//             setError('Failed to load product details. Please try again later.');
//             setLoading(false);
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
        
//         // Handle numeric values
//         if (['price', 'discountPercentage', 'quantity', 'rating'].includes(name)) {
//             setProduct({
//                 ...product,
//                 [name]: parseFloat(value) || 0
//             });
//         } else {
//             setProduct({
//                 ...product,
//                 [name]: value
//             });
//         }
//     };

//     const handleAddImage = () => {
//         if (newImage && newImage.trim() !== '') {
//             setProduct({
//                 ...product,
//                 images: [...product.images, newImage.trim()]
//             });
//             setNewImage('');
//         }
//     };

//     const handleRemoveImage = (index) => {
//         const updatedImages = [...product.images];
//         updatedImages.splice(index, 1);
//         setProduct({
//             ...product,
//             images: updatedImages
//         });
//     };

//     const validateForm = () => {
//         const errors = {};
        
//         if (!product.title.trim()) errors.title = 'Product title is required';
//         if (!product.brand.trim()) errors.brand = 'Brand name is required';
//         if (!product.category.trim()) errors.category = 'Category is required';
//         if (!product.description.trim()) errors.description = 'Description is required';
//         if (product.price <= 0) errors.price = 'Price must be greater than 0';
//         if (product.discountPercentage < 0 || product.discountPercentage > 100) 
//             errors.discountPercentage = 'Discount must be between 0 and 100';
//         if (product.quantity < 0) errors.quantity = 'Quantity cannot be negative';
//         if (product.rating < 0 || product.rating > 5) errors.rating = 'Rating must be between 0 and 5';
        
//         setFormErrors(errors);
//         return Object.keys(errors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         if (!validateForm()) {
//             window.scrollTo(0, 0);
//             return;
//         }
        
//         try {
//             await axios.put(`http://localhost:4000/admin/edit/${id}`, product);
//             alert('Product updated successfully!');
//             navigate('/dashboard'); // Adjust this path to match your routing structure
//         } catch (error) {
//             console.error('Error updating product:', error);
//             setError('Failed to update product. Please try again.');
//             window.scrollTo(0, 0);
//         }
//     };

//     const handleCancel = () => {
//         navigate('/dashboard'); // Adjust this path to match your routing structure
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="container mx-auto p-4">
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//                     {error}
//                     <div className="mt-2">
//                         <button 
//                             onClick={() => navigate('/dashboard')} 
//                             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//                         >
//                             Back to Products
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto p-4">
//             <div className="bg-white rounded-lg shadow-lg p-6">
//                 <div className="flex justify-between items-center mb-6">
//                     <h1 className="text-3xl font-bold text-gray-800">Edit Product</h1>
//                     <button 
//                         onClick={handleCancel}
//                         className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
//                     >
//                         Cancel
//                     </button>
//                 </div>

//                 {Object.keys(formErrors).length > 0 && (
//                     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//                         <p className="font-bold">Please correct the following errors:</p>
//                         <ul className="list-disc ml-5 mt-2">
//                             {Object.values(formErrors).map((error, index) => (
//                                 <li key={index}>{error}</li>
//                             ))}
//                         </ul>
//                     </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {/* Basic Information */}
//                         <div className="bg-gray-50 p-4 rounded-lg">
//                             <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                            
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
//                                     Product Title*
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="title"
//                                     name="title"
//                                     value={product.title}
//                                     onChange={handleInputChange}
//                                     className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//                                         formErrors.title ? 'border-red-500' : ''
//                                     }`}
//                                 />
//                                 {formErrors.title && <p className="text-red-500 text-xs italic">{formErrors.title}</p>}
//                             </div>
                            
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">
//                                     Brand*
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="brand"
//                                     name="brand"
//                                     value={product.brand}
//                                     onChange={handleInputChange}
//                                     className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//                                         formErrors.brand ? 'border-red-500' : ''
//                                     }`}
//                                 />
//                                 {formErrors.brand && <p className="text-red-500 text-xs italic">{formErrors.brand}</p>}
//                             </div>
                            
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sellerName">
//                                     Seller Name
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="sellerName"
//                                     name="sellerName"
//                                     value={product.sellerName}
//                                     onChange={handleInputChange}
//                                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 />
//                             </div>
                            
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
//                                     Description*
//                                 </label>
//                                 <textarea
//                                     id="description"
//                                     name="description"
//                                     value={product.description}
//                                     onChange={handleInputChange}
//                                     rows="4"
//                                     className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//                                         formErrors.description ? 'border-red-500' : ''
//                                     }`}
//                                 ></textarea>
//                                 {formErrors.description && <p className="text-red-500 text-xs italic">{formErrors.description}</p>}
//                             </div>
//                         </div>
                        
//                         {/* Category Information */}
//                         <div className="bg-gray-50 p-4 rounded-lg">
//                             <h2 className="text-xl font-semibold mb-4">Category Information</h2>
                            
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
//                                     Category*
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="category"
//                                     name="category"
//                                     value={product.category}
//                                     onChange={handleInputChange}
//                                     className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//                                         formErrors.category ? 'border-red-500' : ''
//                                     }`}
//                                 />
//                                 {formErrors.category && <p className="text-red-500 text-xs italic">{formErrors.category}</p>}
//                             </div>
                            
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subcategory">
//                                     Subcategory
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="subcategory"
//                                     name="subcategory"
//                                     value={product.subcategory}
//                                     onChange={handleInputChange}
//                                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 />
//                             </div>
                            
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subsubcategory">
//                                     Sub-subcategory
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="subsubcategory"
//                                     name="subsubcategory"
//                                     value={product.subsubcategory}
//                                     onChange={handleInputChange}
//                                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 />
//                             </div>
                            
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
//                                     Rating (0-5)
//                                 </label>
//                                 <input
//                                     type="number"
//                                     step="0.1"
//                                     min="0"
//                                     max="5"
//                                     id="rating"
//                                     name="rating"
//                                     value={product.rating}
//                                     onChange={handleInputChange}
//                                     className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//                                         formErrors.rating ? 'border-red-500' : ''
//                                     }`}
//                                 />
//                                 {formErrors.rating && <p className="text-red-500 text-xs italic">{formErrors.rating}</p>}
//                             </div>
//                         </div>
//                     </div>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {/* Pricing and Inventory */}
//                         <div className="bg-gray-50 p-4 rounded-lg">
//                             <h2 className="text-xl font-semibold mb-4">Pricing & Inventory</h2>
                            
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
//                                     Price (₹)*
//                                 </label>
//                                 <input
//                                     type="number"
//                                     step="0.01"
//                                     id="price"
//                                     name="price"
//                                     value={product.price}
//                                     onChange={handleInputChange}
//                                     className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//                                         formErrors.price ? 'border-red-500' : ''
//                                     }`}
//                                 />
//                                 {formErrors.price && <p className="text-red-500 text-xs italic">{formErrors.price}</p>}
//                             </div>
                            
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discountPercentage">
//                                     Discount Percentage (%)
//                                 </label>
//                                 <input
//                                     type="number"
//                                     step="0.1"
//                                     min="0"
//                                     max="100"
//                                     id="discountPercentage"
//                                     name="discountPercentage"
//                                     value={product.discountPercentage}
//                                     onChange={handleInputChange}
//                                     className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//                                         formErrors.discountPercentage ? 'border-red-500' : ''
//                                     }`}
//                                 />
//                                 {formErrors.discountPercentage && <p className="text-red-500 text-xs italic">{formErrors.discountPercentage}</p>}
//                             </div>
                            
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
//                                     Quantity in Stock
//                                 </label>
//                                 <input
//                                     type="number"
//                                     id="quantity"
//                                     name="quantity"
//                                     value={product.quantity}
//                                     onChange={handleInputChange}
//                                     className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//                                         formErrors.quantity ? 'border-red-500' : ''
//                                     }`}
//                                 />
//                                 {formErrors.quantity && <p className="text-red-500 text-xs italic">{formErrors.quantity}</p>}
//                             </div>
//                         </div>
                        
//                         {/* Additional Information */}
//                         <div className="bg-gray-50 p-4 rounded-lg">
//                             <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
                            
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="warrantyInformation">
//                                     Warranty Information
//                                 </label>
//                                 <textarea
//                                     id="warrantyInformation"
//                                     name="warrantyInformation"
//                                     value={product.warrantyInformation}
//                                     onChange={handleInputChange}
//                                     rows="3"
//                                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 ></textarea>
//                             </div>
                            
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shippingInformation">
//                                     Shipping Information
//                                 </label>
//                                 <textarea
//                                     id="shippingInformation"
//                                     name="shippingInformation"
//                                     value={product.shippingInformation}
//                                     onChange={handleInputChange}
//                                     rows="3"
//                                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 ></textarea>
//                             </div>
//                         </div>
//                     </div>
                    
//                     {/* Product Images */}
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                         <h2 className="text-xl font-semibold mb-4">Product Images</h2>
                        
//                         <div className="mb-4">
//                             <div className="flex space-x-2">
//                                 <input
//                                     type="text"
//                                     placeholder="Enter image URL"
//                                     value={newImage}
//                                     onChange={(e) => setNewImage(e.target.value)}
//                                     className="shadow appearance-none border rounded flex-grow py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={handleAddImage}
//                                     className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
//                                 >
//                                     Add Image
//                                 </button>
//                             </div>
//                         </div>
                        
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
//                             {product.images.map((image, index) => (
//                                 <div key={index} className="relative group">
//                                     <img
//                                         src={image}
//                                         alt={`Product ${index + 1}`}
//                                         className="h-32 w-full object-cover rounded-md border border-gray-300"
//                                         onError={(e) => {
//                                             e.target.onerror = null;
//                                             e.target.src = "/api/placeholder/200/200";
//                                         }}
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={() => handleRemoveImage(index)}
//                                         className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
//                                     >
//                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//                                         </svg>
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
                    
//                     <div className="flex justify-end space-x-4">
//                         <button
//                             type="button"
//                             onClick={handleCancel}
//                             className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded"
//                         >
//                             Save Changes
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default EditProduct;

// mobile view 

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [product, setProduct] = useState({
        title: '',
        brand: '',
        category: '',
        subcategory: '',
        subsubcategory: '',
        description: '',
        price: 0,
        discountPercentage: 0,
        quantity: 0,
        images: [],
        warrantyInformation: '',
        shippingInformation: '',
        sellerName: '',
        rating: 0
    });
    const [newImage, setNewImage] = useState('');
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:4000/product/${id}`);
            setProduct(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching product:', error);
            setError('Failed to load product details. Please try again later.');
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (['price', 'discountPercentage', 'quantity', 'rating'].includes(name)) {
            setProduct({
                ...product,
                [name]: parseFloat(value) || 0
            });
        } else {
            setProduct({
                ...product,
                [name]: value
            });
        }
    };

    const handleAddImage = () => {
        if (newImage && newImage.trim() !== '') {
            setProduct({
                ...product,
                images: [...product.images, newImage.trim()]
            });
            setNewImage('');
        }
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...product.images];
        updatedImages.splice(index, 1);
        setProduct({
            ...product,
            images: updatedImages
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!product.title.trim()) errors.title = 'Product title is required';
        if (!product.brand.trim()) errors.brand = 'Brand name is required';
        if (!product.category.trim()) errors.category = 'Category is required';
        if (!product.description.trim()) errors.description = 'Description is required';
        if (product.price <= 0) errors.price = 'Price must be greater than 0';
        if (product.discountPercentage < 0 || product.discountPercentage > 100) 
            errors.discountPercentage = 'Discount must be between 0 and 100';
        if (product.quantity < 0) errors.quantity = 'Quantity cannot be negative';
        if (product.rating < 0 || product.rating > 5) errors.rating = 'Rating must be between 0 and 5';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            window.scrollTo(0, 0);
            return;
        }

        try {
            await axios.put(`http://localhost:4000/admin/edit/${id}`, product);
            alert('Product updated successfully!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error updating product:', error);
            setError('Failed to update product. Please try again.');
            window.scrollTo(0, 0);
        }
    };

    const handleCancel = () => {
        navigate('/dashboard');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                    <div className="mt-2">
                        <button 
                            onClick={() => navigate('/dashboard')} 
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Back to Products
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 overflow-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Edit Product</h1>
                    <button 
                        onClick={handleCancel}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>

                {Object.keys(formErrors).length > 0 && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <p className="font-bold">Please correct the following errors:</p>
                        <ul className="list-disc ml-5 mt-2">
                            {Object.values(formErrors).map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Information */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Product Title*</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={product.title}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded shadow focus:outline-none ${formErrors.title ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {formErrors.title && <p className="text-red-500 text-xs italic">{formErrors.title}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Brand*</label>
                                <input
                                    type="text"
                                    name="brand"
                                    value={product.brand}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded shadow focus:outline-none ${formErrors.brand ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {formErrors.brand && <p className="text-red-500 text-xs italic">{formErrors.brand}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Seller Name</label>
                                <input
                                    type="text"
                                    name="sellerName"
                                    value={product.sellerName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded shadow focus:outline-none border-gray-300"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Description*</label>
                                <textarea
                                    name="description"
                                    value={product.description}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className={`w-full px-3 py-2 border rounded shadow focus:outline-none ${formErrors.description ? 'border-red-500' : 'border-gray-300'}`}
                                ></textarea>
                                {formErrors.description && <p className="text-red-500 text-xs italic">{formErrors.description}</p>}
                            </div>
                        </div>

                        {/* Category Information */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4">Category Information</h2>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Category*</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={product.category}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded shadow focus:outline-none ${formErrors.category ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {formErrors.category && <p className="text-red-500 text-xs italic">{formErrors.category}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Subcategory</label>
                                <input
                                    type="text"
                                    name="subcategory"
                                    value={product.subcategory}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded shadow focus:outline-none border-gray-300"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Sub-subcategory</label>
                                <input
                                    type="text"
                                    name="subsubcategory"
                                    value={product.subsubcategory}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded shadow focus:outline-none border-gray-300"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Rating (0-5)</label>
                                <input
                                    type="number"
                                    name="rating"
                                    value={product.rating}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded shadow focus:outline-none border-gray-300"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="text-right">
                        <button 
                            type="submit" 
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
