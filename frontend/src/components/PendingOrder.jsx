import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ITEMS_PER_PAGE = 5; // Number of orders per page

const PendingOrder = () => {
    const [activeSection, setActiveSection] = useState('pending');
    const [orders, setOrders] = useState({
        pending: [],
        shipped: [],
        delivered: [],
    });
    const [error, setError] = useState('');

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch orders on component mount
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Updated API requests according to the new route
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
                console.log(pendingResponse.data);
                console.log(shippedResponse.data);
                console.log(deliveredResponse.data);
                
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch orders');
            }
        };
        fetchOrders();
    }, []); // Empty dependency array to run once when the component mounts

    const updateStatus = async (orderId, newStatus) => {
        try {
            const response = await axios.patch(`http://localhost:4000/partner/${orderId}/status`, { orderStatus: newStatus });
            const updatedOrder = response.data.order;

            // Update the relevant sections based on the new status
            setOrders((prev) => {
                const updatedOrders = { ...prev };
                // Remove the order from its current section
                ['pending', 'shipped', 'delivered'].forEach((status) => {
                    updatedOrders[status] = updatedOrders[status].filter(order => order._id !== orderId);
                });
                // Add the order to the new section
                updatedOrders[newStatus].push(updatedOrder);
                return updatedOrders;
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update order status');
        }
    };

    // Pagination helper functions
    const totalPages = (ordersList) => Math.ceil(ordersList.length / ITEMS_PER_PAGE);
    const currentOrders = (ordersList) => ordersList.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = (ordersList) => {
        if (currentPage < totalPages(ordersList)) setCurrentPage(currentPage + 1);
    };

    // Render table with pagination
    const renderOrdersTable = (ordersList, actions) => (
        <>
            <table className="min-w-full border-collapse border border-gray-300 mb-4">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Phone</th>
                        <th className="border border-gray-300 px-4 py-2">City</th>
                        <th className="border border-gray-300 px-4 py-2">Address</th>
                        <th className="border border-gray-300 px-4 py-2">Pincode</th>
                        <th className="border border-gray-300 px-4 py-2">Products</th>
                        <th className="border border-gray-300 px-4 py-2">Total Cost</th>
                        {actions && <th className="border border-gray-300 px-4 py-2">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {currentOrders(ordersList).map((order) => (
                        <tr key={order._id}>
                            <td className="border border-gray-300 px-4 py-2">{order.customer.firstName + " " + order.customer.lastName}</td>
                            <td className="border border-gray-300 px-4 py-2">{order.customer.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{order.customer.phone}</td>
                            <td className="border border-gray-300 px-4 py-2">{order.customer.city}</td>
                            <td className="border border-gray-300 px-4 py-2">{order.customer.address}</td>
                            <td className="border border-gray-300 px-4 py-2">{order.customer.pincode}</td>
                            <td className="border border-gray-300 px-8 py-1">
                                {order.products.map((product) => (
                                    <div key={product._id}>
                                        {product.title} (Quantity: {product.quantity})
                                    </div>
                                ))}
                            </td>
                                <td className="border border-gray-300 px-4 py-2">Rs {order.totalAmount}</td>
                            {actions && (
                                <td className="border border-gray-300 px-4 py-2">
                                    {actions(order)}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination controls */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages(ordersList)}</span>
                <button
                    onClick={() => handleNextPage(ordersList)}
                    disabled={currentPage === totalPages(ordersList)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </>
    );

    return (
        <div className="flex mt-[50px] mb-[50px]">
            {/* Sidebar for section navigation */}
            <div className="w-[250px] p-3 border-r border-gray-300">
                <h2 className="text-xl font-bold mb-4">Order Sections</h2>
                <button
                    onClick={() => { setActiveSection('pending'); setCurrentPage(1); }}
                    className={`w-full py-2 mb-2 rounded ${activeSection === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Pending Orders
                </button>
                <button
                    onClick={() => { setActiveSection('shipped'); setCurrentPage(1); }}
                    className={`w-full py-2 mb-2 rounded ${activeSection === 'shipped' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Shipped Orders
                </button>
                <button
                    onClick={() => { setActiveSection('delivered'); setCurrentPage(1); }}
                    className={`w-full py-2 mb-2 rounded ${activeSection === 'delivered' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Delivered Orders
                </button>
            </div>

            {/* Main content area */}
            <div className="w-[1500px] p-4">
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {activeSection === 'pending' && (
                    <>
                        <h2 className="text-2xl font-semibold mb-4">Pending Orders</h2>
                        {orders.pending.length > 0 ? renderOrdersTable(orders.pending, (order) => (
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={() => updateStatus(order._id, 'shipped')}
                            >
                                Mark as Shipped
                            </button>
                        )) : <p className="text-center">No pending orders found.</p>}
                    </>
                )}

                {activeSection === 'shipped' && (
                    <>
                        <h2 className="text-2xl font-semibold mb-4">Shipped Orders</h2>
                        {orders.shipped.length > 0 ? renderOrdersTable(orders.shipped, (order) => (
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                onClick={() => updateStatus(order._id, 'delivered')}
                            >
                                Mark as Delivered
                            </button>
                        )) : <p className="text-center">No shipped orders found.</p>}
                    </>
                )}

                {activeSection === 'delivered' && (
                    <>
                        <h2 className="text-2xl font-semibold mb-4">Delivered Orders</h2>
                        {orders.delivered.length > 0 ? renderOrdersTable(orders.delivered) : <p className="text-center">No delivered orders found.</p>}
                    </>
                )}
            </div>
        </div>
    );
};

export default PendingOrder;
