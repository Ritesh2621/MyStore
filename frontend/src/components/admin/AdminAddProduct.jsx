import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, ImageIcon } from 'lucide-react';

const AdminAddProduct = () => {
    const navigate = useNavigate();
    const [productData, setProductData] = useState({
        title: '',
        description: '',
        category: '',
        subcategory: '',
        subsubcategory: '',
        price: '',
        discountPercentage: '',
        rating: 0,
        brand: '',
        images: [],
        sellername: '',
        quantity: '',
        warrantyInformation: '',
        shippingInformation: '',
        sellerId: '' 
    });

    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Categories with subcategories and sub-subcategories
    const categoryStructure = {
        'Clothes': {
            'Men': ['Shirts', 'Jeans', 'Jackets', 'T-shirts', 'Sweaters'],
            'Women': ['Dresses', 'Tops', 'Skirts', 'Jeans', 'Blouses'],
            'Unisex': ['Headphones', 'Chargers', 'Cables', 'T-shirts', 'Hats'],
            'Kids': ['T-shirts', 'Pants', 'Jackets', 'Shoes', 'Hats']
        },
        'Jewellery': {
            'Necklace': ['Gold Necklace', 'Silver Necklace', 'Pearl Necklace'],
            'Earrings': ['Gold Earrings', 'Diamond Earrings', 'Stud Earrings'],
            'Braclets': ['Leather Bracelets', 'Silver Bracelets', 'Gold Bracelets'],
            'Watches': ['Analog Watches', 'Digital Watches', 'Smart Watches']
        },
        'Home Furnishing': {
            'BedSheets and Pillow': ['Cotton Sheets', 'Silk Sheets', 'Pillow Covers'],
            'Furniture': ['Sofas', 'Beds', 'Dining Tables', 'Chairs', 'Bookshelves'],
            'Decor': ['Lighting', 'Rugs', 'Wall Art', 'Curtains', 'Candles']
        }
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddImageUrl = () => {
        if (imageUrl.trim()) {
            // Basic URL validation
            const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
            if (urlPattern.test(imageUrl)) {
                setProductData(prev => ({
                    ...prev,
                    images: [...prev.images, imageUrl.trim()]
                }));
                setImageUrl(''); // Clear the input after adding
            } else {
                alert('Please enter a valid image URL');
            }
        }
    };

    const removeImage = (indexToRemove) => {
        setProductData(prev => ({
            ...prev,
            images: prev.images.filter((_, index) => index !== indexToRemove)
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!productData.title) newErrors.title = 'Product title is required';
        if (!productData.category) newErrors.category = 'Category is required';
        if (!productData.price) newErrors.price = 'Price is required';
        if (!productData.quantity) newErrors.quantity = 'Quantity is required';
        if (productData.discountPercentage && 
            (isNaN(productData.discountPercentage) || 
             productData.discountPercentage < 0 || 
             productData.discountPercentage > 100)) {
            newErrors.discountPercentage = 'Invalid discount percentage';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const submissionData = {
                ...productData,
                price: parseFloat(productData.price),
                discountPercentage: parseFloat(productData.discountPercentage) || 0,
                quantity: parseInt(productData.quantity),
                sellerId: 'current-seller-id', // Replace with actual seller ID from context
                sellername: 'Current Seller' // Replace with actual seller name
            };

            const response = await axios.post('http://localhost:4000/product/product', submissionData);
            
            alert('Product added successfully!');
            navigate('/admin/products'); // Redirect to products list
        } catch (error) {
            console.error('Product submission error:', error);
            alert('Failed to add product. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
                <div className="px-6 py-8 sm:px-10">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-extrabold text-gray-900">Add New Product</h1>
                        <div className="text-sm text-gray-500">
                            Fields marked with * are required
                        </div>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Product Information */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Product Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={productData.title}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                                        errors.title ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Enter product name"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Brand
                                </label>
                                <input
                                    type="text"
                                    name="brand"
                                    value={productData.brand}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                    placeholder="Enter brand name"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={productData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                rows="4"
                                placeholder="Enter product description"
                            />
                        </div>

                        {/* Category Hierarchy */}
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category *
                                </label>
                                <select
                                    name="category"
                                    value={productData.category}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                                        errors.category ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                >
                                    <option value="">Select Category</option>
                                    {Object.keys(categoryStructure).map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                                {errors.category && (
                                    <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subcategory
                                </label>
                                <select
                                    name="subcategory"
                                    value={productData.subcategory}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                    disabled={!productData.category}
                                >
                                    <option value="">Select Subcategory</option>
                                    {productData.category && 
                                        Object.keys(categoryStructure[productData.category] || {}).map(subcategory => (
                                            <option key={subcategory} value={subcategory}>
                                                {subcategory}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Sub-Subcategory
                                </label>
                                <select
                                    name="subsubcategory"
                                    value={productData.subsubcategory}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                    disabled={!productData.subcategory}
                                >
                                    <option value="">Select Sub-Subcategory</option>
                                    {productData.category && productData.subcategory && 
                                        (categoryStructure[productData.category][productData.subcategory] || []).map(subsubcategory => (
                                            <option key={subsubcategory} value={subsubcategory}>
                                                {subsubcategory}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        {/* Pricing and Inventory */}
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price *
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={productData.price}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                                        errors.price ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Enter price"
                                    min="0"
                                    step="0.01"
                                />
                                {errors.price && (
                                    <p className="text-red-500 text-xs mt-1">{errors.price}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Discount Percentage
                                </label>
                                <input
                                    type="number"
                                    name="discountPercentage"
                                    value={productData.discountPercentage}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                                        errors.discountPercentage ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Enter discount %"
                                    min="0"
                                    max="100"
                                />
                                {errors.discountPercentage && (
                                    <p className="text-red-500 text-xs mt-1">{errors.discountPercentage}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Quantity *
                                </label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={productData.quantity}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                                        errors.quantity ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Enter quantity"
                                    min="0"
                                />
                                {errors.quantity && (
                                    <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
                                )}
                            </div>
                        </div>

                        {/* Image Upload Section */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Product Images
                            </label>
                            <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg">
                                <div className="flex items-center mb-4">
                                    <input
                                        type="text"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        placeholder="Enter image URL"
                                        className="flex-grow mr-2 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddImageUrl}
                                        className="bg-blue-500 text-white p-2.5 rounded-lg hover:bg-blue-600 transition-colors"
                                    >
                                        <Plus className="h-5 w-5" />
                                    </button>
                                </div>

                                {productData.images.length > 0 && (
                                    <div className="grid grid-cols-4 gap-4 mt-4">
                                        {productData.images.map((img, index) => (
                                            <div 
                                                key={index} 
                                                className="relative group"
                                            >
                                                <img 
                                                    src={img} 
                                                    alt={`Product preview ${index + 1}`} 
                                                    className="h-32 w-full object-cover rounded-lg shadow-md"
                                                />
                                                <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Additional Information */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Warranty Information</label>
                        <textarea
                            name="warrantyInformation"
                            value={productData.warrantyInformation}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            rows="3"
                            placeholder="Enter warranty details"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Shipping Information</label>
                        <textarea
                            name="shippingInformation"
                            value={productData.shippingInformation}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            rows="3"
                            placeholder="Enter shipping details"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-8 py-3 rounded-lg text-white font-semibold uppercase tracking-wider transition-all duration-300 ${
                                    isSubmitting 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
                                }`}
                            >
                                {isSubmitting ? 'Adding Product...' : 'Add Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminAddProduct;

// mobile view 

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Plus, Trash2, ImageIcon } from 'lucide-react';

// const AdminAddProduct = () => {
//     const navigate = useNavigate();
//     const [productData, setProductData] = useState({
//         title: '',
//         description: '',
//         category: '',
//         subcategory: '',
//         subsubcategory: '',
//         price: '',
//         discountPercentage: '',
//         rating: 0,
//         brand: '',
//         images: [],
//         sellername: '',
//         quantity: '',
//         warrantyInformation: '',
//         shippingInformation: '',
//         sellerId: '' 
//     });

//     const [imageUrl, setImageUrl] = useState('');
//     const [errors, setErrors] = useState({});
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const categoryStructure = {
//         'Clothes': {
//             'Men': ['Shirts', 'Jeans', 'Jackets', 'T-shirts', 'Sweaters'],
//             'Women': ['Dresses', 'Tops', 'Skirts', 'Jeans', 'Blouses'],
//             'Unisex': ['Headphones', 'Chargers', 'Cables', 'T-shirts', 'Hats'],
//             'Kids': ['T-shirts', 'Pants', 'Jackets', 'Shoes', 'Hats']
//         },
//         'Jewellery': {
//             'Necklace': ['Gold Necklace', 'Silver Necklace', 'Pearl Necklace'],
//             'Earrings': ['Gold Earrings', 'Diamond Earrings', 'Stud Earrings'],
//             'Braclets': ['Leather Bracelets', 'Silver Bracelets', 'Gold Bracelets'],
//             'Watches': ['Analog Watches', 'Digital Watches', 'Smart Watches']
//         },
//         'Home Furnishing': {
//             'BedSheets and Pillow': ['Cotton Sheets', 'Silk Sheets', 'Pillow Covers'],
//             'Furniture': ['Sofas', 'Beds', 'Dining Tables', 'Chairs', 'Bookshelves'],
//             'Decor': ['Lighting', 'Rugs', 'Wall Art', 'Curtains', 'Candles']
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setProductData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleAddImageUrl = () => {
//         if (imageUrl.trim()) {
//             const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
//             if (urlPattern.test(imageUrl)) {
//                 setProductData(prev => ({
//                     ...prev,
//                     images: [...prev.images, imageUrl.trim()]
//                 }));
//                 setImageUrl('');
//             } else {
//                 alert('Please enter a valid image URL');
//             }
//         }
//     };

//     const removeImage = (indexToRemove) => {
//         setProductData(prev => ({
//             ...prev,
//             images: prev.images.filter((_, index) => index !== indexToRemove)
//         }));
//     };

//     const validateForm = () => {
//         const newErrors = {};
//         if (!productData.title) newErrors.title = 'Product title is required';
//         if (!productData.category) newErrors.category = 'Category is required';
//         if (!productData.price) newErrors.price = 'Price is required';
//         if (!productData.quantity) newErrors.quantity = 'Quantity is required';
//         if (productData.discountPercentage && 
//             (isNaN(productData.discountPercentage) || 
//              productData.discountPercentage < 0 || 
//              productData.discountPercentage > 100)) {
//             newErrors.discountPercentage = 'Invalid discount percentage';
//         }
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;
//         setIsSubmitting(true);
//         try {
//             const submissionData = {
//                 ...productData,
//                 price: parseFloat(productData.price),
//                 discountPercentage: parseFloat(productData.discountPercentage) || 0,
//                 quantity: parseInt(productData.quantity),
//                 sellerId: 'current-seller-id',
//                 sellername: 'Current Seller'
//             };
//             await axios.post('http://localhost:4000/product/product', submissionData);
//             alert('Product added successfully!');
//             navigate('/admin/products');
//         } catch (error) {
//             console.error('Product submission error:', error);
//             alert('Failed to add product. Please try again.');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
//             <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
//                 <div className="px-4 sm:px-6 lg:px-10 py-8">
//                     <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
//                         <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Add New Product</h1>
//                         <div className="text-sm text-gray-500">Fields marked with * are required</div>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
//                         <div className="grid sm:grid-cols-2 gap-6">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Product Title *</label>
//                                 <input
//                                     type="text"
//                                     name="title"
//                                     value={productData.title}
//                                     onChange={handleChange}
//                                     className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
//                                         errors.title ? 'border-red-500' : 'border-gray-300'
//                                     }`}
//                                     placeholder="Enter product name"
//                                 />
//                                 {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
//                                 <input
//                                     type="text"
//                                     name="brand"
//                                     value={productData.brand}
//                                     onChange={handleChange}
//                                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
//                                     placeholder="Enter brand name"
//                                 />
//                             </div>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                             <textarea
//                                 name="description"
//                                 value={productData.description}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
//                                 rows="4"
//                                 placeholder="Enter product description"
//                             />
//                         </div>

//                         <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
//                                 <select
//                                     name="category"
//                                     value={productData.category}
//                                     onChange={handleChange}
//                                     className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
//                                         errors.category ? 'border-red-500' : 'border-gray-300'
//                                     }`}
//                                 >
//                                     <option value="">Select Category</option>
//                                     {Object.keys(categoryStructure).map(category => (
//                                         <option key={category} value={category}>{category}</option>
//                                     ))}
//                                 </select>
//                                 {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
//                                 <select
//                                     name="subcategory"
//                                     value={productData.subcategory}
//                                     onChange={handleChange}
//                                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                                     disabled={!productData.category}
//                                 >
//                                     <option value="">Select Subcategory</option>
//                                     {productData.category && Object.keys(categoryStructure[productData.category] || {}).map(sub => (
//                                         <option key={sub} value={sub}>{sub}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Sub-Subcategory</label>
//                                 <select
//                                     name="subsubcategory"
//                                     value={productData.subsubcategory}
//                                     onChange={handleChange}
//                                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                                     disabled={!productData.subcategory}
//                                 >
//                                     <option value="">Select Sub-Subcategory</option>
//                                     {productData.category && productData.subcategory &&
//                                         categoryStructure[productData.category][productData.subcategory]?.map(subsub => (
//                                             <option key={subsub} value={subsub}>{subsub}</option>
//                                         ))
//                                     }
//                                 </select>
//                             </div>
//                         </div>

//                         {/* You can continue styling the rest of the fields (price, discount, quantity, images, etc.) with the same responsive class approach */}

//                         <div className="text-center pt-6">
//                             <button
//                                 type="submit"
//                                 className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all"
//                                 disabled={isSubmitting}
//                             >
//                                 {isSubmitting ? 'Submitting...' : 'Add Product'}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminAddProduct;
