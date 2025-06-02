// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaFileDownload, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import icons
// import { ChevronRight } from "lucide-react";
// import { CheckCircle, Truck, Clock } from "lucide-react";

// const ITEMS_PER_PAGE = 5; // Number of items per page

// const OrderHistory = ({ userId: propUserId }) => {
//     const [orderHistory, setOrderHistory] = useState([]);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [billDetails, setBillDetails] = useState(null);
//     const [font, setFont] = useState("sans-serif");

//     // Get the userId from props or localStorage
//     const userId = propUserId || localStorage.getItem('userId');

//     // Status icon and color mapping
//     const getStatusIcon = (status) => {
//         switch(status) {
//             case 'Delivered':
//                 return {
//                     icon: <CheckCircle size={16} className="mr-1" />,
//                     color: 'bg-green-100 text-green-600'
//                 };
//             case 'Shipped':
//                 return {
//                     icon: <Truck size={16} className="mr-1" />,
//                     color: 'bg-blue-100 text-blue-600'
//                 };
//             case 'Pending':
//                 return {
//                     icon: <Clock size={16} className="mr-1" />,
//                     color: 'bg-yellow-100 text-yellow-600'
//                 };
//             default:
//                 return {
//                     icon: null,
//                     color: 'bg-gray-100 text-gray-600'
//                 };
//         }
//     };

//     useEffect(() => {
//         const fetchOrderHistory = async () => {
//             try {
//                 if (!userId) {
//                     setError('User ID not found');
//                     setLoading(false);
//                     return;
//                 }

//                 const response = await axios.get(`http://localhost:4000/auth/history/${userId}`);
//                 console.log(response.data); // Log the response to ensure you get the correct data
//                 setOrderHistory(response.data); // Update state with the fetched data
//             } catch (err) {
//                 setError('Failed to fetch order history');
//             } finally {
//                 setLoading(false); // Ensure loading is set to false once the data is fetched
//             }
//         };

//         fetchOrderHistory(); // Make the API call only if userId exists
//     }, [userId]);

//     // Pagination logic
//     const totalPages = Math.ceil(orderHistory.length / ITEMS_PER_PAGE);
//     const currentOrders = orderHistory.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

//     const handlePrevPage = () => {
//         if (currentPage > 1) setCurrentPage(currentPage - 1);
//     };

//     const handleNextPage = () => {
//         if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//     };

//     const handleGenerateBill = (order) => {
//         setBillDetails(order);
//     };

//     const handleDownload = () => {
//         if (!billDetails) return;

//         // Create a simple text format for the bill
//         const billText = `
//             Bill for Token: ${billDetails.tokenNumber}
//             Name: ${billDetails.customer.firstName} ${billDetails.customer.lastName}
//             Phone: ${billDetails.customer.phone}
//             Email: ${billDetails.customer.email}
//             Order Status: ${billDetails.orderStatus}
//             Products:
//             ${billDetails.products.map(product => `
//                 - ${product.title} - Quantity: ${product.quantity} - Price: Rs ${product.price}
//             `).join('')}
//             Total Amount: Rs ${billDetails.totalAmount}
//         `;

//         // Create a Blob with the bill text content
//         const blob = new Blob([billText], { type: 'text/plain;charset=utf-8' });

//         // Create a temporary link element to trigger the download
//         const link = document.createElement('a');
//         link.href = URL.createObjectURL(blob);
//         link.download = `Bill_${billDetails.tokenNumber}.txt`; // Set the file name
//         link.click(); // Trigger the download
//     };

//     if (loading) {
//         return <p className="text-gray-600 text-center py-8">Loading...</p>;
//     }

//     return (
//         <div className="bg-gray-100 min-h-screen">
//             {/* Sticky Header */}
//             <div className="bg-white sticky top-0 z-10 p-4 shadow-sm">
//                 <h2 className="text-xl font-bold text-gray-800">Your Orders</h2>
//             </div>

//             <div className="p-4">
//                 {error && <p className="text-red-500 text-center">{error}</p>}

//                 {loading ? (
//                     <p className="text-gray-600 text-center py-8">Loading...</p>
//                 ) : orderHistory.length > 0 ? (
//                     <>
//                         {/* Order List */}
//                         <div className="space-y-4">
//                             {currentOrders.map((order) => (
//                                 <div
//                                     key={order._id}
//                                     className="bg-white rounded-lg shadow-md p-4"
//                                     style={{ fontFamily: font }}
//                                 >
//                                     {/* Order Header */}
//                                     <div className="flex justify-between items-start mb-3">
//                                         <div>
//                                             <p className="text-sm text-gray-500">
//                                                 {new Date(order.orderDate).toLocaleDateString()}
//                                             </p>
//                                             <p className="text-sm text-gray-700">
//                                                 Order ID: {order._id}
//                                             </p>
//                                         </div>
//                                         <span 
//                                             className={`text-xs px-2 py-1 rounded-full ${
//                                                 order.orderStatus === 'Cancelled' 
//                                                     ? 'bg-red-100 text-red-600' 
//                                                     : 'bg-green-100 text-green-600'
//                                             }`}
//                                         >
//                                             {order.orderStatus}
//                                         </span>
//                                     </div>

//                                     {/* Product List */}
//                                     {order.products.map((product) => (
//                                         <div 
//                                             key={product._id} 
//                                             className="flex items-center space-x-4 mt-4 pb-4 border-b border-gray-100 last:border-b-0"
//                                         >
//                                             <img
//                                                 src={product.images && product.images.length > 0 ? product.images[0] : 'fallback_image_url'}
//                                                 alt={product.title}
//                                                 className="w-20 h-20 rounded-md object-cover"
//                                             />
//                                             <div className="flex-grow">
//                                                 <h3 className="text-sm font-semibold">{product.title}</h3>
//                                                 <p className="text-xs text-gray-500">
//                                                     Token Number: {order.tokenNumber}
//                                                 </p>
//                                                 <p className="text-sm font-medium">
//                                                     Qty: {product.quantity} | Rs {product.price}
//                                                 </p>
//                                             </div>
//                                             <button
//                                                 onClick={() => handleGenerateBill(order)}
//                                                 className="text-gray-500 hover:text-gray-700"
//                                             >
//                                                 <ChevronRight size={20} />
//                                             </button>
//                                         </div>
//                                     ))}
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Pagination Controls */}
//                         <div className="flex justify-center items-center mt-6 space-x-4">
//                             <button
//                                 onClick={handlePrevPage}
//                                 disabled={currentPage === 1}
//                                 className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
//                                     currentPage === 1 
//                                         ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
//                                         : 'bg-white text-gray-700 shadow-md hover:bg-gray-50'
//                                 }`}
//                             >
//                                 <FaChevronLeft />
//                                 <span>Previous</span>
//                             </button>
//                             <span className="text-sm text-gray-600">
//                                 Page {currentPage} of {totalPages}
//                             </span>
//                             <button
//                                 onClick={handleNextPage}
//                                 disabled={currentPage === totalPages}
//                                 className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
//                                     currentPage === totalPages 
//                                         ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
//                                         : 'bg-white text-gray-700 shadow-md hover:bg-gray-50'
//                                 }`}
//                             >
//                                 <span>Next</span>
//                                 <FaChevronRight />
//                             </button>
//                         </div>
//                     </>
//                 ) : (
//                     <p className="text-center text-gray-600">No order history found.</p>
//                 )}

//                 {/* Bill Modal */}
//                 {billDetails && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
//                         <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-6">Bill for Token: {billDetails.tokenNumber}</h2>
//                             <div className="space-y-4">
//                                 <p className="text-gray-700"><strong>Name:</strong> {billDetails.customer.firstName} {billDetails.customer.lastName}</p>
//                                 <p className="text-gray-700"><strong>Phone:</strong> {billDetails.customer.phone}</p>
//                                 <p className="text-gray-700"><strong>Email:</strong> {billDetails.customer.email}</p>
//                                 <p className="text-gray-700"><strong>Order Status:</strong> {billDetails.orderStatus}</p>
//                                 <h4 className="font-semibold text-lg text-gray-800 mt-6">Products:</h4>
//                                 <ul className="list-disc list-inside space-y-2">
//                                     {billDetails.products.map((product) => (
//                                         <li key={product._id} className="text-gray-700">
//                                             <strong>{product.title}</strong> - Quantity: {product.quantity} - Price: Rs {product.price}
//                                         </li>
//                                     ))}
//                                 </ul>
//                                 <p className="font-bold text-xl text-gray-800 mt-6">Total Amount: Rs {billDetails.totalAmount}</p>
//                             </div>
//                             <div className="flex justify-end space-x-4 mt-8">
//                                 <button
//                                     onClick={() => setBillDetails(null)}
//                                     className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
//                                 >
//                                     <FaTimes />
//                                     <span>Close</span>
//                                 </button>
//                                 <button
//                                     onClick={handleDownload}
//                                     className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
//                                 >
//                                     <FaFileDownload />
//                                     <span>Download</span>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default OrderHistory;

// mobile view 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFileDownload, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { ChevronRight } from "lucide-react";
import { CheckCircle, Truck, Clock } from "lucide-react";

const ITEMS_PER_PAGE = 5; // Number of items per page

const OrderHistory = ({ userId: propUserId }) => {
    const [orderHistory, setOrderHistory] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [billDetails, setBillDetails] = useState(null);
    const [font, setFont] = useState("sans-serif");

    // Get the userId from props or localStorage
    const userId = propUserId || localStorage.getItem('userId');

    // Status icon and color mapping
    const getStatusIcon = (status) => {
        switch(status) {
            case 'Delivered':
                return {
                    icon: <CheckCircle size={16} className="mr-1" />,
                    color: 'bg-green-100 text-green-600'
                };
            case 'Shipped':
                return {
                    icon: <Truck size={16} className="mr-1" />,
                    color: 'bg-blue-100 text-blue-600'
                };
            case 'Pending':
                return {
                    icon: <Clock size={16} className="mr-1" />,
                    color: 'bg-yellow-100 text-yellow-600'
                };
            default:
                return {
                    icon: null,
                    color: 'bg-gray-100 text-gray-600'
                };
        }
    };

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                if (!userId) {
                    setError('User ID not found');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`http://localhost:4000/auth/history/${userId}`);
                console.log(response.data);
                setOrderHistory(response.data);
            } catch (err) {
                setError('Failed to fetch order history');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderHistory();
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
        if (!billDetails) return;

        // Create a simple text format for the bill
        const billText = `
            Bill for Token: ${billDetails.tokenNumber}
            Name: ${billDetails.customer.firstName} ${billDetails.customer.lastName}
            Phone: ${billDetails.customer.phone}
            Email: ${billDetails.customer.email}
            Order Status: ${billDetails.orderStatus}
            Products:
            ${billDetails.products.map(product => `
                - ${product.title} - Quantity: ${product.quantity} - Price: Rs ${product.price}
            `).join('')}
            Total Amount: Rs ${billDetails.totalAmount}
        `;

        // Create a Blob with the bill text content
        const blob = new Blob([billText], { type: 'text/plain;charset=utf-8' });

        // Create a temporary link element to trigger the download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Bill_${billDetails.tokenNumber}.txt`; // Set the file name
        link.click(); // Trigger the download
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <p className="text-gray-600 text-center py-8">Loading...</p>
        </div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Sticky Header */}
            <div className="bg-white sticky top-0 z-10 p-4 shadow-sm">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center md:text-left">Your Orders</h2>
            </div>

            <div className="max-w-6xl mx-auto p-4">
                {error && <p className="text-red-500 text-center">{error}</p>}

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-gray-600 text-center">Loading...</p>
                    </div>
                ) : orderHistory.length > 0 ? (
                    <>
                        {/* Order List */}
                        <div className="space-y-4">
                            {currentOrders.map((order) => (
                                <div
                                    key={order._id}
                                    className="bg-white rounded-lg shadow-md p-4"
                                    style={{ fontFamily: font }}
                                >
                                    {/* Order Header */}
                                    <div className="flex flex-col md:flex-row justify-between items-start mb-3">
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                {new Date(order.orderDate).getDate().toString().padStart(2, '0')}/
                                                {(new Date(order.orderDate).getMonth() + 1).toString().padStart(2, '0')}/
                                                {new Date(order.orderDate).getFullYear()}
                                            </p>
                                            <p className="text-sm text-gray-700 mt-1 md:mt-0">
                                                Order ID: <span className="hidden md:inline">{order._id}</span>
                                                <span className="inline md:hidden">{order._id.substring(0, 8)}...</span>
                                            </p>
                                        </div>
                                        <div className={`${
                                            getStatusIcon(order.orderStatus).color
                                        } flex items-center text-xs px-3 py-1 rounded-full mt-2 md:mt-0`}>
                                            {getStatusIcon(order.orderStatus).icon}
                                            <span>{order.orderStatus}</span>
                                        </div>
                                    </div>

                                    {/* Product List */}
                                    {order.products.map((product) => (
                                        <div 
                                            key={product._id} 
                                            className="flex items-center space-x-2 md:space-x-4 mt-4 pb-4 border-b border-gray-100 last:border-b-0"
                                        >
                                            <img
                                                src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder-product.png'}
                                                alt={product.title}
                                                className="w-16 h-16 md:w-20 md:h-20 rounded-md object-cover"
                                            />
                                            <div className="flex-grow">
                                                <h3 className="text-sm font-semibold line-clamp-2">{product.title}</h3>
                                                <p className="text-xs text-gray-500">
                                                    Token: {order.tokenNumber}
                                                </p>
                                                <p className="text-sm font-medium">
                                                    Qty: {product.quantity} | Rs {product.price}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => handleGenerateBill(order)}
                                                className="text-gray-500 hover:text-gray-700 p-2"
                                                aria-label="View bill"
                                            >
                                                <ChevronRight size={20} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-center items-center mt-6 space-x-2 md:space-x-4">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className={`px-2 md:px-4 py-2 rounded-lg flex items-center space-x-1 md:space-x-2 ${
                                    currentPage === 1 
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                        : 'bg-white text-gray-700 shadow-md hover:bg-gray-50'
                                }`}
                            >
                                <FaChevronLeft />
                                <span className="hidden md:inline">Previous</span>
                            </button>
                            <span className="text-xs md:text-sm text-gray-600">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className={`px-2 md:px-4 py-2 rounded-lg flex items-center space-x-1 md:space-x-2 ${
                                    currentPage === totalPages 
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                        : 'bg-white text-gray-700 shadow-md hover:bg-gray-50'
                                }`}
                            >
                                <span className="hidden md:inline">Next</span>
                                <FaChevronRight />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64">
                        <p className="text-center text-gray-600 mb-4">No order history found.</p>
                        <p className="text-center text-sm text-gray-500">Your completed orders will appear here.</p>
                    </div>
                )}

                {/* Bill Modal */}
                {billDetails && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
                        <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg w-full max-w-md md:max-w-lg overflow-y-auto max-h-full md:max-h-[90vh]">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg md:text-2xl font-bold text-gray-800">Bill for Token: {billDetails.tokenNumber}</h2>
                                <button 
                                    onClick={() => setBillDetails(null)}
                                    className="text-gray-500 hover:text-gray-700"
                                    aria-label="Close modal"
                                >
                                    <FaTimes size={20} />
                                </button>
                            </div>
                            
                            <div className="space-y-3 md:space-y-4">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-gray-700"><strong>Name:</strong> {billDetails.customer.firstName} {billDetails.customer.lastName}</p>
                                    <p className="text-gray-700 mt-1"><strong>Phone:</strong> {billDetails.customer.phone}</p>
                                    <p className="text-gray-700 mt-1"><strong>Email:</strong> {billDetails.customer.email}</p>
                                    <p className="text-gray-700 mt-1"><strong>Order Status:</strong> {billDetails.orderStatus}</p>
                                </div>
                                
                                <div>
                                    <h4 className="font-semibold text-md md:text-lg text-gray-800 mb-2">Products:</h4>
                                    <ul className="bg-gray-50 rounded-lg divide-y divide-gray-200">
                                        {billDetails.products.map((product) => (
                                            <li key={product._id} className="p-3 text-sm md:text-base text-gray-700">
                                                <p className="font-medium">{product.title}</p>
                                                <div className="flex justify-between text-sm text-gray-600 mt-1">
                                                    <span>Quantity: {product.quantity}</span>
                                                    <span>Rs {product.price}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="font-bold text-lg md:text-xl text-gray-800">Total Amount: Rs {billDetails.totalAmount}</p>
                                </div>
                            </div>
                            
                            <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-4 mt-6">
                                <button
                                    onClick={() => setBillDetails(null)}
                                    className="flex items-center justify-center space-x-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-300 order-2 md:order-1"
                                >
                                    <FaTimes size={16} />
                                    <span>Close</span>
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300 order-1 md:order-2"
                                >
                                    <FaFileDownload size={16} />
                                    <span>Download</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;