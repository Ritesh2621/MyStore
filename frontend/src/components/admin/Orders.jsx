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

   // ✂️ Everything before the return is unchanged...

return (
  <div className="bg-gray-50 min-h-screen p-4 sm:p-6">
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Orders Management</h1>
        <div className="relative w-full sm:w-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table view for md+ screens */}
      <div className="hidden md:block bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Loading and Error */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
            <p className="text-gray-600">Loading orders...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <div className="bg-red-100 text-red-700 p-4 rounded-lg inline-block mb-2">
              <X size={24} className="inline-block mr-2" />
              {error}
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentOrders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-16 text-center text-gray-500">No orders found</td>
                  </tr>
                ) : (
                  currentOrders.map(order => {
                    const status = getStatusBadge(order.orderStatus);
                    return (
                      <React.Fragment key={order._id}>
                        <tr 
                          className="hover:bg-gray-50 cursor-pointer transition-colors" 
                          onClick={() => toggleOrderDetails(order._id)}
                        >
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {order.tokenNumber ? `#${order.tokenNumber}` : 'N/A'}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {order.userOwner ? (
                              <div>
                                <div className="font-medium text-gray-900">{order.userOwner.name || 'Unnamed'}</div>
                                <div className="text-gray-500">{order.userOwner.email || 'No email'}</div>
                              </div>
                            ) : <span className="text-gray-400">No Owner</span>}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {formatDate(order.orderDate)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                            {order.totalAmount ? `$${parseFloat(order.totalAmount).toFixed(2)}` : 'N/A'}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${status.color}`}>
                              {status.icon}
                              {order.orderStatus?.charAt(0).toUpperCase() + order.orderStatus.slice(1) || 'Unknown'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                          </td>
                        </tr>
                        {expandedOrder === order._id && (
                          <tr>
                            <td colSpan="6" className="px-6 py-4 bg-gray-50">
                              <div className="border-t border-b border-gray-200 py-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Details</h3>
                                {/* More details here... */}
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
        )}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {!loading && !error && currentOrders.length === 0 && (
          <div className="text-center text-gray-500 py-6">No orders found</div>
        )}
        {!loading && !error && currentOrders.map(order => {
          const status = getStatusBadge(order.orderStatus);
          return (
            <div key={order._id} className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm font-bold text-gray-800">{order.tokenNumber ? `#${order.tokenNumber}` : 'N/A'}</div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                  {status.icon}
                  {order.orderStatus?.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {order.userOwner?.name || 'Unnamed'} <br />
                {order.userOwner?.email || 'No email'}
              </div>
              <div className="text-sm text-gray-500 mt-2">Date: {formatDate(order.orderDate)}</div>
              <div className="text-sm font-semibold mt-2">Amount: {order.totalAmount ? `$${parseFloat(order.totalAmount).toFixed(2)}` : 'N/A'}</div>
              <button 
                onClick={() => toggleOrderDetails(order._id)} 
                className="mt-3 text-sm text-blue-600 hover:text-blue-800 underline"
              >
                {expandedOrder === order._id ? 'Hide Details' : 'View Details'}
              </button>
              {expandedOrder === order._id && (
                <div className="mt-4 text-sm text-gray-700">
                  {/* Show extra order info here for mobile */}
                  <div>More order details...</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

};

export default Orders;