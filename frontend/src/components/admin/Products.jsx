import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'detail'
    const itemsPerPage = 5;

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/admin/product');
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to load products. Please try again later.');
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`http://localhost:4000/admin/product/${productId}`);
                setProducts(products.filter(product => product._id !== productId));
                if (selectedProduct && selectedProduct._id === productId) {
                    setSelectedProduct(null);
                    setViewMode('list');
                }
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product. Please try again.');
            }
        }
    };

    const viewProductDetails = (product) => {
        setSelectedProduct(product);
        setViewMode('detail');
    };

    const backToList = () => {
        setSelectedProduct(null);
        setViewMode('list');
    };

    // Format price with commas and currency symbol
    const formatPrice = (price) => {
        return `₹${price.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;
    };

    // Calculate discounted price
    const calculateDiscountedPrice = (price, discountPercentage) => {
        const discountedPrice = price - (price * (discountPercentage / 100));
        return formatPrice(discountedPrice);
    };

    // Calculate pagination
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Change page handler
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Product Management Dashboard</h1>
                
                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {!loading && !error && viewMode === 'list' && (
                    <>
                        <div className="flex justify-between mb-4">
                            <h2 className="text-xl font-semibold">Products List ({products.length} total)</h2>
                            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                                Add New Product
                            </button>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Image</th>
                                        <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product Details</th>
                                        <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Pricing</th>
                                        <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock</th>
                                        <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {currentProducts.map((product) => (
                                        <tr key={product._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {product.images && product.images.length > 0 ? (
                                                    <img 
                                                        src={product.images[0]} 
                                                        alt={product.title} 
                                                        className="h-16 w-16 object-cover rounded-md"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = "/api/placeholder/200/200";
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="h-16 w-16 bg-gray-200 rounded-md flex items-center justify-center">
                                                        <span className="text-gray-500 text-xs">No image</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-gray-900">{product.title}</span>
                                                    <span className="text-gray-500 text-sm">{product.brand}</span>
                                                    <div className="flex items-center mt-1">
                                                        <div className="flex">
                                                            {[...Array(5)].map((_, i) => (
                                                                <svg 
                                                                    key={i} 
                                                                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                                                    fill="currentColor" 
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                                </svg>
                                                            ))}
                                                        </div>
                                                        <span className="text-gray-500 text-xs ml-1">({product.rating})</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{product.category}</div>
                                                <div className="text-sm text-gray-500">{product.subcategory}</div>
                                                {product.subsubcategory && (
                                                    <div className="text-xs text-gray-500">→ {product.subsubcategory}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{formatPrice(product.price)}</div>
                                                {product.discountPercentage > 0 && (
                                                    <>
                                                        <div className="text-sm text-green-600">
                                                            {calculateDiscountedPrice(product.price, product.discountPercentage)}
                                                        </div>
                                                        <div className="text-xs text-red-500">{product.discountPercentage}% off</div>
                                                    </>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    parseInt(product.quantity) > 50 ? 'bg-green-100 text-green-800' : 
                                                    parseInt(product.quantity) > 10 ? 'bg-yellow-100 text-yellow-800' : 
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {product.quantity} in stock
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => viewProductDetails(product)}
                                                    className="text-blue-600 hover:text-blue-900 mr-2"
                                                >
                                                    View
                                                </button>
                                                <button
                                                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProduct(product._id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Controls */}
                        <div className="mt-4 flex justify-center">
                            <nav className="inline-flex rounded-md shadow">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`relative inline-flex items-center px-4 py-2 rounded-l-md border ${
                                        currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                                    } text-sm font-medium`}
                                >
                                    Previous
                                </button>
                                
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => paginate(index + 1)}
                                        className={`relative inline-flex items-center px-4 py-2 border ${
                                            currentPage === index + 1 
                                            ? 'bg-blue-500 text-white' 
                                            : 'bg-white text-gray-700 hover:bg-gray-50'
                                        } text-sm font-medium`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`relative inline-flex items-center px-4 py-2 rounded-r-md border ${
                                        currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                                    } text-sm font-medium`}
                                >
                                    Next
                                </button>
                            </nav>
                        </div>
                    </>
                )}

                {!loading && !error && viewMode === 'detail' && selectedProduct && (
                    <div className="bg-white rounded-lg">
                        <div className="flex justify-between items-center mb-6">
                            <button 
                                onClick={backToList}
                                className="flex items-center text-blue-600 hover:text-blue-800"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                                </svg>
                                Back to Products
                            </button>
                            <div className="flex space-x-2">
                                <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded">
                                    Edit Product
                                </button>
                                <button 
                                    onClick={() => handleDeleteProduct(selectedProduct._id)} 
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                >
                                    Delete Product
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Product Images */}
                            <div className="lg:col-span-1 bg-gray-50 p-4 rounded-lg">
                                {selectedProduct.images && selectedProduct.images.length > 0 ? (
                                    <div>
                                        <img 
                                            src={selectedProduct.images[0]} 
                                            alt={selectedProduct.title} 
                                            className="w-full h-64 object-contain mb-4 rounded-md"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "/api/placeholder/400/300";
                                            }}
                                        />
                                        <div className="grid grid-cols-4 gap-2">
                                            {selectedProduct.images.slice(1, 5).map((img, index) => (
                                                <img 
                                                    key={index} 
                                                    src={img} 
                                                    alt={`${selectedProduct.title} - ${index + 2}`} 
                                                    className="w-full h-16 object-cover rounded-md cursor-pointer"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "/api/placeholder/100/100";
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        {selectedProduct.images.length > 5 && (
                                            <div className="text-right mt-2">
                                                <span className="text-sm text-blue-500 cursor-pointer">
                                                    +{selectedProduct.images.length - 5} more images
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="h-64 bg-gray-200 flex items-center justify-center rounded-md">
                                        <span className="text-gray-500">No images available</span>
                                    </div>
                                )}
                            </div>

                            {/* Product Details */}
                            <div className="lg:col-span-2 space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">{selectedProduct.title}</h2>
                                    <div className="flex items-center mt-2">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <svg 
                                                    key={i} 
                                                    className={`w-5 h-5 ${i < Math.floor(selectedProduct.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                                    fill="currentColor" 
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-gray-600 ml-2">{selectedProduct.rating} stars</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-lg font-medium text-gray-700 mb-2">Pricing</h3>
                                        <div className="space-y-1">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Price:</span>
                                                <span className="text-gray-900 font-medium">{formatPrice(selectedProduct.price)}</span>
                                            </div>
                                            {selectedProduct.discountPercentage > 0 && (
                                                <>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Discount:</span>
                                                        <span className="text-red-500">{selectedProduct.discountPercentage}%</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Final Price:</span>
                                                        <span className="text-green-600 font-bold">
                                                            {calculateDiscountedPrice(selectedProduct.price, selectedProduct.discountPercentage)}
                                                        </span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-lg font-medium text-gray-700 mb-2">Inventory</h3>
                                        <div className="space-y-1">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Stock Level:</span>
                                                <span className={`font-medium ${
                                                    parseInt(selectedProduct.quantity) > 50 ? 'text-green-600' : 
                                                    parseInt(selectedProduct.quantity) > 10 ? 'text-yellow-600' : 
                                                    'text-red-600'
                                                }`}>
                                                    {selectedProduct.quantity} units
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Brand:</span>
                                                <span className="text-gray-900">{selectedProduct.brand}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Seller:</span>
                                                <span className="text-gray-900">{selectedProduct.sellerName}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-gray-700 mb-2">Description</h3>
                                    <p className="text-gray-700">{selectedProduct.description}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-sm font-medium text-gray-700 mb-2">Category</h3>
                                        <div className="space-y-1">
                                            <div className="text-gray-800 font-medium">{selectedProduct.category}</div>
                                            {selectedProduct.subcategory && (
                                                <div className="text-gray-600">→ {selectedProduct.subcategory}</div>
                                            )}
                                            {selectedProduct.subsubcategory && (
                                                <div className="text-gray-600">→ {selectedProduct.subsubcategory}</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-sm font-medium text-gray-700 mb-2">Warranty</h3>
                                        <p className="text-gray-600 text-sm">{selectedProduct.warrantyInformation || "No warranty information available"}</p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-sm font-medium text-gray-700 mb-2">Shipping</h3>
                                        <p className="text-gray-600 text-sm">{selectedProduct.shippingInformation || "No shipping information available"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;