import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { 
  Package, 
  CheckCircle, 
  Truck, 
  Clock, 
  X, 
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedOrder, setExpandedOrder] = useState(null);
    const itemsPerPage = 8;

    useEffect(() => {
        fetchOrders();
    }, []);

    // Fetch orders from the API
    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:4000/admin/orders');
            setOrders(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Failed to load orders. Please try again later.');
            setLoading(false);
        }
    };

    // Get status badge styling and icon
    const getStatusBadge = (status) => {
        if (!status) return { 
            color: 'bg-gray-100 text-gray-800', 
            icon: <Package size={16} className="mr-1" /> 
        };
        
        switch(status.toLowerCase()) {
            case 'pending':
                return { 
                    color: 'bg-yellow-100 text-yellow-800', 
                    icon: <Clock size={16} className="mr-1" /> 
                };
            case 'processing':
                return { 
                    color: 'bg-blue-100 text-blue-800', 
                    icon: <Package size={16} className="mr-1" /> 
                };
            case 'shipped':
                return { 
                    color: 'bg-indigo-100 text-indigo-800', 
                    icon: <Truck size={16} className="mr-1" /> 
                };
            case 'delivered':
                return { 
                    color: 'bg-green-100 text-green-800', 
                    icon: <CheckCircle size={16} className="mr-1" /> 
                };
            case 'cancelled':
                return { 
                    color: 'bg-red-100 text-red-800', 
                    icon: <X size={16} className="mr-1" /> 
                };
            default:
                return { 
                    color: 'bg-gray-100 text-gray-800', 
                    icon: <Package size={16} className="mr-1" /> 
                };
        }
    };

    // Filter orders based on search term with proper null checks
    const filteredOrders = orders.filter(order => {
        if (!searchTerm) return true;
        
        const searchLower = searchTerm.toLowerCase();
        
        // Check token number (with null check)
        if (order.tokenNumber !== undefined && order.tokenNumber !== null && 
            order.tokenNumber.toString().includes(searchTerm)) {
            return true;
        }
        
        // Check user owner name (with null checks)
        if (order.userOwner && order.userOwner.name && 
            order.userOwner.name.toLowerCase().includes(searchLower)) {
            return true;
        }
        
        // Check user owner email (with null checks)
        if (order.userOwner && order.userOwner.email && 
            order.userOwner.email.toLowerCase().includes(searchLower)) {
            return true;
        }
        
        // Check order status (with null check)
        if (order.orderStatus && order.orderStatus.toLowerCase().includes(searchLower)) {
            return true;
        }
        
        return false;
    });

    // Calculate the orders to display on the current page
    const indexOfLastOrder = currentPage * itemsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    // Change page handler
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    // Format date with null check
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return format(date, 'MMM dd, yyyy h:mm a');
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Invalid Date';
        }
    };

    // Toggle order details
    const toggleOrderDetails = (orderId) => {
        if (expandedOrder === orderId) {
            setExpandedOrder(null);
        } else {
            setExpandedOrder(orderId);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800">Orders Management</h1>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search orders..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Display loading state */}
                    {loading && (
                        <div className="text-center py-16">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                            <p className="text-gray-600">Loading orders...</p>
                        </div>
                    )}

                    {/* Display error state */}
                    {error && (
                        <div className="text-center py-16">
                            <div className="bg-red-100 text-red-700 p-4 rounded-lg inline-block mb-2">
                                <X size={24} className="inline-block mr-2" />
                                {error}
                            </div>
                        </div>
                    )}

                    {/* Orders table */}
                    {!loading && !error && (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Order ID
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Customer
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Amount
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {currentOrders.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-16 text-center text-gray-500">
                                                    No orders found
                                                </td>
                                            </tr>
                                        ) : (
                                            currentOrders.map(order => {
                                                const status = getStatusBadge(order.orderStatus);
                                                return (
                                                    <React.Fragment key={order._id || `order-${Math.random()}`}>
                                                        <tr 
                                                            className="hover:bg-gray-50 cursor-pointer transition-colors" 
                                                            onClick={() => toggleOrderDetails(order._id)}
                                                        >
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                {order.tokenNumber !== undefined ? `#${order.tokenNumber}` : 'N/A'}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {order.userOwner ? (
                                                                    <div>
                                                                        <div className="font-medium text-gray-900">{order.userOwner.name || 'Unnamed'}</div>
                                                                        <div className="text-gray-500">{order.userOwner.email || 'No email'}</div>
                                                                    </div>
                                                                ) : (
                                                                    <span className="text-gray-400">No Owner</span>
                                                                )}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {formatDate(order.orderDate)}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                                                {order.totalAmount !== undefined ? 
                                                                    `$${parseFloat(order.totalAmount).toFixed(2)}` : 
                                                                    'N/A'}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${status.color}`}>
                                                                    {status.icon}
                                                                    {order.orderStatus ? 
                                                                        (order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)) : 
                                                                        'Unknown'}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                <button className="text-blue-600 hover:text-blue-900 mr-3">
                                                                    View
                                                                </button>
                                                            </td>
                                                        </tr>
                                                        
                                                        {/* Expanded order details */}
                                                        {expandedOrder === order._id && (
                                                            <tr>
                                                                <td colSpan="6" className="px-6 py-4 bg-gray-50">
                                                                    <div className="border-t border-b border-gray-200 py-4">
                                                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Details</h3>
                                                                        
                                                                        {/* Customer Information */}
                                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                                                            <div>
                                                                                <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Customer Information</h4>
                                                                                <div className="bg-white p-4 rounded-lg border border-gray-200">
                                                                                    {order.customer ? (
                                                                                        <>
                                                                                            <p className="text-gray-800 font-medium">
                                                                                                {order.customer.firstName || ''} {order.customer.lastName || ''}
                                                                                            </p>
                                                                                            <p className="text-gray-600">{order.customer.email || 'No email'}</p>
                                                                                            <p className="text-gray-600">{order.customer.phone || 'No phone'}</p>
                                                                                            <p className="text-gray-600 mt-2">
                                                                                                {order.customer.address || ''}, {order.customer.city || ''}<br />
                                                                                                {order.customer.state || ''}, {order.customer.country || ''} {order.customer.pincode || ''}
                                                                                            </p>
                                                                                        </>
                                                                                    ) : (
                                                                                        <p className="text-gray-500">No customer information available</p>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            <div>
                                                                                <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Order Summary</h4>
                                                                                <div className="bg-white p-4 rounded-lg border border-gray-200">
                                                                                    <div className="flex justify-between mb-2">
                                                                                        <span className="text-gray-600">Order ID:</span>
                                                                                        <span className="text-gray-900 font-medium">
                                                                                            {order.tokenNumber !== undefined ? `#${order.tokenNumber}` : 'N/A'}
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="flex justify-between mb-2">
                                                                                        <span className="text-gray-600">Date:</span>
                                                                                        <span className="text-gray-900">{formatDate(order.orderDate)}</span>
                                                                                    </div>
                                                                                    <div className="flex justify-between mb-2">
                                                                                        <span className="text-gray-600">Status:</span>
                                                                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                                                                                            {status.icon}
                                                                                            {order.orderStatus ? 
                                                                                                (order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)) : 
                                                                                                'Unknown'}
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="flex justify-between font-medium text-lg mt-4 pt-4 border-t border-gray-200">
                                                                                        <span>Total:</span>
                                                                                        <span>
                                                                                            {order.totalAmount !== undefined ? 
                                                                                                `$${parseFloat(order.totalAmount).toFixed(2)}` : 
                                                                                                'N/A'}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                        {/* Products */}
                                                                        <div>
                                                                            <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Products</h4>
                                                                            <div className="bg-white rounded-lg border border-gray-200">
                                                                                {order.products && order.products.length > 0 ? (
                                                                                    <div className="divide-y divide-gray-200">
                                                                                        {order.products.map((product, index) => (
                                                                                            <div key={product._id || `product-${index}`} className="p-4 flex items-center">
                                                                                                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                                                    <img 
                                                                                                        src={product.imageUrl || '/api/placeholder/150/150'} 
                                                                                                        alt={product.title || 'Product'} 
                                                                                                        className="h-full w-full object-cover object-center" 
                                                                                                        onError={(e) => {
                                                                                                            e.target.src = '/api/placeholder/150/150';
                                                                                                        }}
                                                                                                    />
                                                                                                </div>
                                                                                                <div className="ml-4 flex-1">
                                                                                                    <h3 className="text-base font-medium text-gray-900">{product.title || 'Unnamed Product'}</h3>
                                                                                                    <p className="mt-1 text-sm text-gray-500">
                                                                                                        Size: {product.size || 'N/A'} • Seller: {product.seller || 'Unknown'}
                                                                                                    </p>
                                                                                                </div>
                                                                                                <div className="text-right">
                                                                                                    <p className="text-sm font-medium text-gray-900">
                                                                                                        {product.price !== undefined ? 
                                                                                                            `$${parseFloat(product.price).toFixed(2)}` : 
                                                                                                            'N/A'}
                                                                                                    </p>
                                                                                                    <p className="text-sm text-gray-500">
                                                                                                        Qty: {product.quantity || 0}
                                                                                                    </p>
                                                                                                </div>
                                                                                            </div>
                                                                                        ))}
                                                                                    </div>
                                                                                ) : (
                                                                                    <div className="p-4 text-center text-gray-500">No products in this order</div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </React.Fragment>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                                    <div className="flex-1 flex justify-between sm:hidden">
                                        <button
                                            onClick={() => paginate(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                                                currentPage === 1 
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={() => paginate(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                                                currentPage === totalPages 
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            Next
                                        </button>
                                    </div>
                                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm text-gray-700">
                                                Showing <span className="font-medium">{indexOfFirstOrder + 1}</span> to{' '}
                                                <span className="font-medium">
                                                    {Math.min(indexOfLastOrder, filteredOrders.length)}
                                                </span>{' '}
                                                of <span className="font-medium">{filteredOrders.length}</span> results
                                            </p>
                                        </div>
                                        <div>
                                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                                <button
                                                    onClick={() => paginate(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                                                        currentPage === 1 
                                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                                            : 'bg-white text-gray-500 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    <ChevronLeft size={18} />
                                                </button>
                                                
                                                {/* Page Numbers */}
                                                {[...Array(totalPages).keys()].map(number => {
                                                    // Show first, last, current, and 1 page before and after current
                                                    if (
                                                        number + 1 === 1 || 
                                                        number + 1 === totalPages ||
                                                        Math.abs(currentPage - (number + 1)) <= 1
                                                    ) {
                                                        return (
                                                            <button
                                                                key={number}
                                                                onClick={() => paginate(number + 1)}
                                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                                    currentPage === number + 1
                                                                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                                }`}
                                                            >
                                                                {number + 1}
                                                            </button>
                                                        );
                                                    }
                                                    
                                                    // Show ellipsis
                                                    if (
                                                        (number + 1 === 2 && currentPage > 3) ||
                                                        (number + 1 === totalPages - 1 && currentPage < totalPages - 2)
                                                    ) {
                                                        return (
                                                            <span
                                                                key={number}
                                                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                                                            >
                                                                ...
                                                            </span>
                                                        );
                                                    }
                                                    
                                                    return null;
                                                })}
                                                
                                                <button
                                                    onClick={() => paginate(currentPage + 1)}
                                                    disabled={currentPage === totalPages}
                                                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                                                        currentPage === totalPages 
                                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                                            : 'bg-white text-gray-500 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    <ChevronRight size={18} />
                                                </button>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Orders;