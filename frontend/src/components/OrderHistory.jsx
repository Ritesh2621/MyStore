import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFileDownload, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import icons

const ITEMS_PER_PAGE = 5; // Number of items per page

const OrderHistory = ({ userId: propUserId }) => {
    const [orderHistory, setOrderHistory] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [billDetails, setBillDetails] = useState(null);

    // Get the userId from props or localStorage
    const userId = propUserId || localStorage.getItem('userId');

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                if (!userId) {
                    setError('User ID not found');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`http://localhost:4000/auth/history/${userId}`);
                console.log(response.data); // Log the response to ensure you get the correct data
                setOrderHistory(response.data); // Update state with the fetched data
            } catch (err) {
                setError('Failed to fetch order history');
            } finally {
                setLoading(false); // Ensure loading is set to false once the data is fetched
            }
        };

        fetchOrderHistory(); // Make the API call only if userId exists
    }, [userId]);

    // Pagination logic
    const totalPages = Math.ceil(orderHistory.length / ITEMS_PER_PAGE);
    const currentOrders = orderHistory.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleGenerateBill = (order) => {
        setBillDetails(order);
    };

    const handleDownload = () => {
        console.log("Downloading bill...");
    };

    if (loading) {
        return <p className="text-gray-600 text-center py-8">Loading...</p>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Order History</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}

            {orderHistory.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentOrders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-col justify-between min-h-[350px]" // Set a minimum height for consistency
                            >
                                <h3 className="font-semibold text-xl text-gray-700 mb-2">Token Number: {order.tokenNumber}</h3>
                                <p className="text-gray-600"><strong>Status:</strong> {order.orderStatus}</p>
                                <p className="text-gray-600"><strong>Created At:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                                <h4 className="font-semibold text-lg text-gray-700 mt-4">Products:</h4>
                                <ul className="list-disc list-inside space-y-2 mt-2 flex-grow">
                                    {order.products.map((product) => (
                                        <li key={product._id} className="text-gray-600">
                                            <div className="flex items-center space-x-3">
                                            <img
    src={product.images && product.images.length > 0 ? product.images[0] : 'fallback_image_url'} // Fallback image in case of undefined or empty array
    alt={product.title}
    className="w-12 h-12 rounded-md object-cover"
/>

                                                <div>
                                                    <strong>{product.title}</strong> - Quantity: {product.quantity} - Price: Rs {product.price}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => handleGenerateBill(order)}
                                    className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                                >
                                    View Bill
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center mt-8 space-x-4">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                                currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                        >
                            <FaChevronLeft />
                            <span>Previous</span>
                        </button>
                        <span className="text-lg font-semibold text-gray-700">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                                currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                        >
                            <span>Next</span>
                            <FaChevronRight />
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-center text-gray-600">No order history found.</p>
            )}

            {/* Bill Modal */}
            {billDetails && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Bill for Token: {billDetails.tokenNumber}</h2>
                        <div className="space-y-4">
                            <p className="text-gray-700"><strong>Name:</strong> {billDetails.customer.firstName} {billDetails.customer.lastName}</p>
                            <p className="text-gray-700"><strong>Phone:</strong> {billDetails.customer.phone}</p>
                            <p className="text-gray-700"><strong>Email:</strong> {billDetails.customer.email}</p>
                            <p className="text-gray-700"><strong>Order Status:</strong> {billDetails.orderStatus}</p>
                            <h4 className="font-semibold text-lg text-gray-800 mt-6">Products:</h4>
                            <ul className="list-disc list-inside space-y-2">
                                {billDetails.products.map((product) => (
                                    <li key={product._id} className="text-gray-700">
                                        <strong>{product.title}</strong> - Quantity: {product.quantity} - Price: Rs {product.price}
                                    </li>
                                ))}
                            </ul>
                            <p className="font-bold text-xl text-gray-800 mt-6">Total Amount: Rs {billDetails.totalAmount}</p>
                        </div>
                        <div className="flex justify-end space-x-4 mt-8">
                            <button
                                onClick={() => setBillDetails(null)}
                                className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
                            >
                                <FaTimes />
                                <span>Close</span>
                            </button>
                            <button
                                onClick={handleDownload}
                                className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
                            >
                                <FaFileDownload />
                                <span>Download</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
