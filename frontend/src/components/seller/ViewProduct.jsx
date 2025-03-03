import React, { useEffect, useState } from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';

const ViewProduct = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    deliveredOrders: 0
  });
  const [timeframe, setTimeframe] = useState('weekly');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);

  useEffect(() => {
    const sellerId = localStorage.getItem('userId');
    if (!sellerId) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    fetch(`http://localhost:4000/order/orders-by-seller/${sellerId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch orders');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setOrders(data);
          calculateStats(data);
        } else {
          setOrders([]);
          setError('Invalid data format received');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const calculateStats = (ordersData) => {
    const stats = {
      totalOrders: ordersData.length,
      totalRevenue: ordersData.reduce((sum, order) => sum + order.totalAmount, 0),
      pendingOrders: ordersData.filter(order => 
        order.orderStatus.toLowerCase() !== 'delivered' && 
        order.orderStatus.toLowerCase() !== 'completed'
      ).length,
      deliveredOrders: ordersData.filter(order => 
        order.orderStatus.toLowerCase() === 'delivered' || 
        order.orderStatus.toLowerCase() === 'completed'
      ).length
    };
    
    setStats(stats);
  };

  const getChartData = () => {
    if (!orders.length) return [];
    
    const now = new Date();
    let filteredOrders;
    
    // Filter orders based on timeframe
    if (timeframe === 'weekly') {
      // Last 7 days
      const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filteredOrders = orders.filter(order => new Date(order.orderDate) >= lastWeek);
    } else if (timeframe === 'monthly') {
      // Last 30 days
      const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filteredOrders = orders.filter(order => new Date(order.orderDate) >= lastMonth);
    } else {
      // All time
      filteredOrders = [...orders];
    }
    
    // Group by date
    const groupedData = {};
    filteredOrders.forEach(order => {
      const date = new Date(order.orderDate).toLocaleDateString();
      if (!groupedData[date]) {
        groupedData[date] = {
          date,
          revenue: 0,
          orders: 0
        };
      }
      groupedData[date].revenue += order.totalAmount;
      groupedData[date].orders += 1;
    });
    
    return Object.values(groupedData);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  // Get current orders for pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Order Details Modal Component
  const OrderDetailsModal = ({ order, onClose }) => {
    if (!order) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-auto">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Order #{order.tokenNumber || order._id.substring(0, 8)}</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Order Info */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Order Details</h4>
                  <div className="mt-2 bg-gray-50 p-4 rounded-md">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-gray-500">Order Date</div>
                      <div className="text-sm font-medium">{new Date(order.orderDate).toLocaleString()}</div>
                      
                      <div className="text-sm text-gray-500">Order Status</div>
                      <div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          order.orderStatus.toLowerCase() === 'delivered' || order.orderStatus.toLowerCase() === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : order.orderStatus.toLowerCase() === 'shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.orderStatus}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-500">Total Amount</div>
                      <div className="text-sm font-medium">${order.totalAmount.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
                
                {/* Customer Info */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Customer Information</h4>
                  <div className="mt-2 bg-gray-50 p-4 rounded-md">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-gray-500">Name</div>
                      <div className="text-sm font-medium">
                        {order.customer.firstName} {order.customer.lastName}
                      </div>
                      
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="text-sm font-medium">{order.customer.email}</div>
                      
                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="text-sm font-medium">{order.customer.phone}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Shipping Address */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Shipping Address</h4>
                  <div className="mt-2 bg-gray-50 p-4 rounded-md">
                    <div className="space-y-1">
                      <p className="text-sm">{order.customer.address}</p>
                      <p className="text-sm">{order.customer.city}, {order.customer.state} {order.customer.pincode}</p>
                      <p className="text-sm">{order.customer.country}</p>
                    </div>
                  </div>
                </div>
                
                {/* Order Actions */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Actions</h4>
                  <div className="mt-2 space-y-2">
                    <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                      Update Order Status
                    </button>
                    <button className="w-full py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition">
                      Contact Customer
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Items */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Order Items</h4>
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.products.map((product, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center">
                              {product.image ? 
                                <img src={product.image} alt={product.title} className="h-10 w-10 rounded-md" /> : 
                                <span className="text-xs text-gray-500">No image</span>
                              }
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.title}</div>
                              
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${(product.price * product.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan="3" className="px-6 py-3 text-right text-sm font-medium text-gray-500">Total</td>
                      <td className="px-6 py-3 text-sm font-medium text-gray-900">${order.totalAmount.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Pagination component
  const Pagination = ({ currentPage, totalPages, onPageChange, onPrevPage, onNextPage }) => {
    // Generate page numbers to display
    const getPageNumbers = () => {
      const pages = [];
      const maxPagesToShow = 5;
      
      if (totalPages <= maxPagesToShow) {
        // Show all pages if there are fewer than maxPagesToShow
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show a window of pages around current page
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = startPage + maxPagesToShow - 1;
        
        if (endPage > totalPages) {
          endPage = totalPages;
          startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
        
        // Add first page with ellipsis if needed
        if (startPage > 1) {
          pages.unshift('...');
          pages.unshift(1);
        }
        
        // Add last page with ellipsis if needed
        if (endPage < totalPages) {
          pages.push('...');
          pages.push(totalPages);
        }
      }
      
      return pages;
    };
    
    const pageNumbers = getPageNumbers();
    
    return (
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{indexOfFirstOrder + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(indexOfLastOrder, orders.length)}
              </span>{" "}
              of <span className="font-medium">{orders.length}</span> orders
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={onPrevPage}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === 1 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              {pageNumbers.map((page, index) => (
                page === '...' ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={`page-${page}`}
                    onClick={() => onPageChange(page)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === page
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                )
              ))}
              
              <button
                onClick={onNextPage}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === totalPages 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
        
        {/* Mobile pagination */}
        <div className="flex items-center justify-between w-full sm:hidden">
          <button
            onClick={onPrevPage}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              currentPage === 1 
                ? 'text-gray-300 bg-white cursor-not-allowed' 
                : 'text-gray-700 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={onNextPage}
            disabled={currentPage === totalPages}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              currentPage === totalPages 
                ? 'text-gray-300 bg-white cursor-not-allowed' 
                : 'text-gray-700 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg font-medium text-gray-500">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
        <h3 className="text-red-800 font-medium">Error Loading Dashboard</h3>
        <p className="text-red-600">{error}</p>
        <button 
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Seller Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Total Orders</p>
          <p className="text-3xl font-bold text-gray-800">{stats.totalOrders}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-800">${stats.totalRevenue.toFixed(2)}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Pending Orders</p>
          <p className="text-3xl font-bold text-gray-800">{stats.pendingOrders}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Delivered Orders</p>
          <p className="text-3xl font-bold text-gray-800">{stats.deliveredOrders}</p>
        </div>
      </div>
      
      {/* Charts */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Sales Overview</h2>
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1 text-sm rounded-md ${timeframe === 'weekly' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setTimeframe('weekly')}
            >
              Weekly
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md ${timeframe === 'monthly' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setTimeframe('monthly')}
            >
              Monthly
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md ${timeframe === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setTimeframe('all')}
            >
              All Time
            </button>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getChartData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="orders" name="Orders" fill="#8884d8" />
              <Bar yAxisId="right" dataKey="revenue" name="Revenue ($)" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Recent Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentOrders.map(order => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.tokenNumber || order._id.substring(0, 8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.products[0].title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {`${order.customer.firstName} ${order.customer.lastName}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.orderStatus.toLowerCase() === 'delivered' || order.orderStatus.toLowerCase() === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : order.orderStatus.toLowerCase() === 'shipped'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      onClick={() => handleViewOrder(order)}
                    >
                      View
                    </button>
                   
                  </td>
                </tr>
              ))}
              
              {orders.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Component */}
        {orders.length > 0 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={paginate}
            onPrevPage={goToPrevPage}
            onNextPage={goToNextPage}
          />
        )}
      </div>
      
      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={closeModal} />
      )}
    </div>
  );
};

export default ViewProduct;