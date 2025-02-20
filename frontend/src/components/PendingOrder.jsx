import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link to navigate
import axios from 'axios';

const ITEMS_PER_PAGE = 5;

const PendingOrder = () => {
  const [activeSection, setActiveSection] = useState('pending');
  const [orders, setOrders] = useState({ pending: [], shipped: [], delivered: [] });
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    tokenNumber: '', name: '', phone: '', address: '', products: ''
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const [pendingResponse, shippedResponse, deliveredResponse] = await Promise.all([
          axios.get('http://localhost:4000/partner/orders?status=pending'),
          axios.get('http://localhost:4000/partner/orders?status=shipped'),
          axios.get('http://localhost:4000/partner/orders?status=delivered'),
        ]);
        setOrders({
          pending: pendingResponse.data,
          shipped: shippedResponse.data,
          delivered: deliveredResponse.data,
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch orders');
      }
    };
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.patch(`http://localhost:4000/partner/${orderId}/status`, { orderStatus: newStatus });
      const updatedOrder = response.data.order;
      setOrders((prev) => {
        const updatedOrders = { ...prev };
        ['pending', 'shipped', 'delivered'].forEach((status) => {
          updatedOrders[status] = updatedOrders[status].filter(order => order._id !== orderId);
        });
        updatedOrders[newStatus].push(updatedOrder);
        return updatedOrders;
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update order status');
    }
  };

  const filteredOrders = (ordersList) => {
    return ordersList.filter(order => {
      const tokenNumber = order.customer.tokenNumber?.toLowerCase() || '';
      const fullName = `${order.customer.firstName} ${order.customer.lastName}`.toLowerCase();
      const phone = order.customer.phone?.toLowerCase() || '';
      const address = order.customer.address?.toLowerCase() || '';
      const products = order.products.map(product => product.title).join(', ').toLowerCase();

      return (
        (filters.tokenNumber === '' || tokenNumber.includes(filters.tokenNumber.toLowerCase())) &&
        (filters.name === '' || fullName.includes(filters.name.toLowerCase())) &&
        (filters.phone === '' || phone.includes(filters.phone.toLowerCase())) &&
        (filters.address === '' || address.includes(filters.address.toLowerCase())) &&
        (filters.products === '' || products.includes(filters.products.toLowerCase()))
      );
    });
  };

  const handleFilterChange = (e, key) => {
    setFilters(prev => ({ ...prev, [key]: e.target.value }));
    setCurrentPage(1);  // Reset to first page on filter change
  };

  const renderOrdersTable = (ordersList, actions) => {
    const filteredList = filteredOrders(ordersList);
    const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
    const paginatedOrders = filteredList.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    // Adjust currentPage if it exceeds totalPages
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }

    return (
      <>
        <table className="min-w-full border-collapse border border-gray-300 mb-4 shadow-lg rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              {['Token Number', 'Name','Phone', 'Address', 'Products'].map((col, index) => (
                <th key={index} className="border border-gray-300 px-2 py-2">{col}</th>
              ))}
              {actions && <th className="border border-gray-300 px-4 py-2">Actions</th>}
              <th className="border border-gray-300 px-4 py-2">More</th>
            </tr>
            <tr className="bg-gray-50">
              {Object.keys(filters).map((key, index) => (
                <th key={index} className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    className="px-2 py-1 border border-gray-300 rounded w-full"
                    placeholder={`Search ${key}...`}
                    value={filters[key]}
                    onChange={(e) => handleFilterChange(e, key)}
                  />
                </th>
              ))}
              {actions && <th className="border border-gray-300 px-4 py-2"></th>}
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map(order => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 w-[120px] py-2">{order.tokenNumber}</td>
                <td className="border border-gray-300 px-4 w-[170px] py-2">{order.customer.firstName} {order.customer.lastName}</td>
             
                <td className="border border-gray-300 px-4 w-[160px] py-2">{order.customer.phone}</td>
                <td className="border border-gray-300 px-4 w-[220px] py-2">{order.customer.address}</td>
                <td className="border border-gray-300 px-4 w-[200px] py-2">{order.products.map(p => `${p.title} (${p.quantity})`).join(', ')}</td>
                {actions && (
                  <td className="border border-gray-300 px-4 py-2">
                    {actions(order)}
                  </td>
                )}
                <td>
                  <Link to={`/order/${order._id}`} className="text-blue-500 hover:text-blue-700 px-2 ml-3  py-2">View-Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="px-4 py-2 mx-2 border rounded-lg text-sm bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50">Prev</button>
            <span className="px-4 py-2 mx-2 text-sm">Page {currentPage} of {totalPages}</span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="px-4 py-2 mx-2 border rounded-lg text-sm bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50">Next</button>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="flex mt-[50px] mb-[50px] bg-gray-50 min-h-screen">
      {/* Sidebar for section navigation */}
      <div className="w-[250px] p-6 bg-white shadow-lg rounded-lg border-r border-gray-300">
        <h2 className="text-xl font-bold mb-6 text-center">Order Sections</h2>
        <button
          onClick={() => { setActiveSection('pending'); setCurrentPage(1); }}
          className={`w-full py-3 mb-4 rounded-lg ${activeSection === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Pending Orders
        </button>
        <button
          onClick={() => { setActiveSection('shipped'); setCurrentPage(1); }}
          className={`w-full py-3 mb-4 rounded-lg ${activeSection === 'shipped' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Shipped Orders
        </button>
        <button
          onClick={() => { setActiveSection('delivered'); setCurrentPage(1); }}
          className={`w-full py-3 mb-4 rounded-lg ${activeSection === 'delivered' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Delivered Orders
        </button>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-6 bg-white rounded-lg shadow-lg">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {activeSection === 'pending' && (
          <>
            <h2 className="text-2xl font-semibold mb-6">Pending Orders</h2>
            {orders.pending.length > 0 ? renderOrdersTable(orders.pending, (order) => (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={() => updateStatus(order._id, 'shipped')}
              >
                Mark as Shipped
              </button>
            )) : <p className="text-center">No pending orders found.</p>}
          </>
        )}

        {activeSection === 'shipped' && (
          <>
            <h2 className="text-2xl font-semibold mb-6">Shipped Orders</h2>
            {orders.shipped.length > 0 ? renderOrdersTable(orders.shipped, (order) => (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                onClick={() => updateStatus(order._id, 'delivered')}
              >
                Mark as Delivered
              </button>
            )) : <p className="text-center">No shipped orders found.</p>}
          </>
        )}

        {activeSection === 'delivered' && (
          <>
            <h2 className="text-2xl font-semibold mb-6">Delivered Orders</h2>
            {orders.delivered.length > 0 ? renderOrdersTable(orders.delivered) : <p className="text-center">No delivered orders found.</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default PendingOrder;
