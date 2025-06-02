// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const ITEMS_PER_PAGE = 5; // Number of records per page
// const UpdateTrack = () => {
//     const [trackingRecords, setTrackingRecords] = useState([]);
//     const [selectedRecord, setSelectedRecord] = useState(null);
//     const [status, setStatus] = useState('');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [filters, setFilters] = useState({
//         tokenNumber: '',
//         name: '',
//         phone: '',
//         address: '',
//         status: ''
//     });

//     // Fetch all tracking records for the partner
//     useEffect(() => {
//         const fetchTrackingRecords = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4000/partner/orders'); // Adjust endpoint for orders
//                 setTrackingRecords(response.data);
//                 console.log(response.data);
//             } catch (err) {
//                 setError(err.response?.data?.message || 'Failed to fetch tracking records');
//             }
//         };
//         fetchTrackingRecords();
//     }, []);

//     // Handle form submission to update tracking record status
//     const handleUpdate = async (e) => {
//         e.preventDefault();
    
//         // Validation for invalid status update
//         if (
//             (selectedRecord.orderStatus === 'shipped' && status === 'pending') ||
//             (selectedRecord.orderStatus === 'delivered' && (status === 'pending' || status === 'shipped'))
//         ) {
//             setError('Cannot update the status as requested.');
//             return;
//         }
    
//         try {
//             const updatedRecord = { orderStatus: status }; // Send the status update
//             await axios.patch(`http://localhost:4000/partner/${selectedRecord._id}/status`, updatedRecord); // Adjust endpoint for updating status
//             setSuccess('Tracking record updated successfully!');
//             setStatus(''); // Reset status
//             setSelectedRecord(null); // Reset selected record
//             const response = await axios.get('http://localhost:4000/partner/orders'); // Refetch data after update
//             setTrackingRecords(response.data);
//         } catch (err) {
//             setError(err.response?.data?.message || 'Failed to update tracking record');
//         }
//     };
    
//     // Filter orders based on filters
//     const filteredOrders = () => {
//         return trackingRecords.filter(order => {
//             const tokenNumber = (order.tokenNumber?.toString() || '').toLowerCase(); // Ensure it's a string
//             const fullName = `${order.customer?.firstName} ${order.customer?.lastName}`.toLowerCase();
//             const phone = order.userOwner?.phone?.toLowerCase() || '';
//             const address = order.customer?.address?.toLowerCase() || '';
//             const status = order.orderStatus?.toLowerCase() || '';
    
//             return (
//                 (filters.tokenNumber === '' || tokenNumber.includes(filters.tokenNumber.toLowerCase())) &&
//                 (filters.name === '' || fullName.includes(filters.name.toLowerCase())) &&
//                 (filters.phone === '' || phone.includes(filters.phone.toLowerCase())) &&
//                 (filters.address === '' || address.includes(filters.address.toLowerCase())) &&
//                 (filters.status === '' || status.includes(filters.status.toLowerCase()))
//             );
//         });
//     };
    
//     const filteredOrdersData = filteredOrders(); // Get the filtered orders data
//     const totalPages = Math.ceil(filteredOrdersData.length / ITEMS_PER_PAGE); // Calculate total pages based on filtered data
//     const currentRecords = filteredOrdersData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE); // Get records for the current page

//     const handlePrevPage = () => {
//         if (currentPage > 1) setCurrentPage(currentPage - 1);
//     };

//     const handleNextPage = () => {
//         if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//     };

//     const handleFilterChange = (e, key) => {
//         setFilters(prev => ({ ...prev, [key]: e.target.value }));
//         setCurrentPage(1); // Reset to the first page when a filter is applied
//     };

//     return (
//         <>
//             <div className="flex flex-col items-center mt-[50px] mb-[50px]">
//                 <div className="w-full overflow-auto">
//                     <h2 className="text-3xl font-bold text-center mb-6">All Orders</h2>
//                     {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//                     {success && <p className="text-green-500 text-center mb-4">{success}</p>}
                    
//                     {/* Filters Row */}
//                     <div className="mb-6 flex justify-between">
//                         {Object.keys(filters).map((key) => (
//                             <div key={key} className="flex flex-col w-1/5">
//                                 <label className="text-sm font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
//                                 <input
//                                     type="text"
//                                     className="border rounded w-full p-2"
//                                     placeholder={`Search ${key}...`}
//                                     value={filters[key]}
//                                     onChange={(e) => handleFilterChange(e, key)}
//                                 />
//                             </div>
//                         ))}
//                     </div>

//                     <table className="min-w-full border-collapse border border-gray-300 shadow-lg">
//                         <thead className="bg-gray-100">
//                             <tr>
//                                 <th className="border border-gray-300 px-4 py-2 text-left">Token Number</th>
//                                 <th className="border border-gray-300 px-4 py-2 text-left">Customer Name</th>
//                                 <th className="border border-gray-300 px-4 py-2 text-left">Customer Phone</th>
//                                 <th className="border border-gray-300 px-2 py-2 text-left">Address</th>
//                                 <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
//                                 <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {currentRecords.map((record) => (
//                                 <tr key={record._id} className="hover:bg-gray-100">
//                                     <td className="border border-gray-300 px-4 py-2">{record.tokenNumber}</td>
//                                     <td className="border border-gray-300 px-4 py-2">{record.customer?.firstName} {record.customer?.lastName || 'Unknown'}</td>
//                                     <td className="border border-gray-300 px-4 py-2">{record.userOwner?.phone || 'N/A'}</td>
//                                     <td className="border border-gray-300 px-2 py-2">{record.customer?.address || 'N/A'}</td>
//                                     <td className="border border-gray-300 px-4 py-2">{record.orderStatus}</td>
//                                     <Link to={`/order/${record._id}`} className="border border-gray-300 bg-blue-500 hover:bg-blue-700 text-white px-2 pb-5">
//                                         <span className='mr-0'> 
//                                             View Details
//                                         </span>
//                                     </Link>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>

//                     {/* Pagination Controls */}
//                     {totalPages > 1 && (
//                         <div className="flex justify-center items-center mt-8 space-x-4">
//                             <button
//                                 onClick={handlePrevPage}
//                                 disabled={currentPage === 1}
//                                 className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
//                             >
//                                 Previous
//                             </button>
//                             <span className="text-lg font-semibold">
//                                 Page {currentPage} of {totalPages}
//                             </span>
//                             <button
//                                 onClick={handleNextPage}
//                                 disabled={currentPage === totalPages}
//                                 className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
//                             >
//                                 Next
//                             </button>
//                         </div>
//                     )}
//                 </div>

//                 {/* Update Tracking Section */}
//                 <div className="w-[650px] mt-8 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
//                     <h2 className="text-2xl font-bold text-center mb-6">Update Tracking</h2>
                    
//                     <div className="mb-4">
//                         <label className="block font-semibold mb-1">Select Order:</label>
//                         <select
//                             value={selectedRecord ? selectedRecord._id : ''}
//                             onChange={(e) => {
//                                 const record = trackingRecords.find(rec => rec._id === e.target.value);
//                                 setSelectedRecord(record);
//                                 setStatus(record ? record.orderStatus : '');
//                             }}
//                             className="border rounded w-full p-2"
//                         >
//                             <option value="">-- Select an Order --</option>
//                             {trackingRecords.map((record) => (
//                                 <option key={record.tokenNumber} value={record._id}>
//                                     Order ID: {record.tokenNumber}, Customer: {record.customer?.firstName} {record.customer?.lastName || 'Unknown'}, Status: {record.orderStatus}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     {selectedRecord && (
//                         <form onSubmit={handleUpdate}>
//                             <div className="mb-4">
//                                 <label className="block font-semibold mb-1">Current Status:</label>
//                                 <select
//                                     value={status}
//                                     onChange={(e) => setStatus(e.target.value)}
//                                     className="border rounded w-full p-2"
//                                 >
//                                     <option value="">-- Select Status --</option>
//                                     <option value="pending">Pending</option>
//                                     <option value="shipped">Shipped</option>
//                                     <option value="delivered">Delivered</option>
//                                 </select>
//                             </div>
//                             <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600">
//                                 Update Status
//                             </button>
//                         </form>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default UpdateTrack;

// mobile view 

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 5; // Number of records per page
const UpdateTrack = () => {
    const [trackingRecords, setTrackingRecords] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        tokenNumber: '',
        name: '',
        phone: '',
        address: '',
        status: ''
    });

    // Track window size for responsive layout
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Fetch all tracking records for the partner
    useEffect(() => {
        const fetchTrackingRecords = async () => {
            try {
                const response = await axios.get('http://localhost:4000/partner/orders'); // Adjust endpoint for orders
                setTrackingRecords(response.data);
                console.log(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch tracking records');
            }
        };
        fetchTrackingRecords();
    }, []);

    // Handle form submission to update tracking record status
    const handleUpdate = async (e) => {
        e.preventDefault();
    
        // Validation for invalid status update
        if (
            (selectedRecord.orderStatus === 'shipped' && status === 'pending') ||
            (selectedRecord.orderStatus === 'delivered' && (status === 'pending' || status === 'shipped'))
        ) {
            setError('Cannot update the status as requested.');
            return;
        }
    
        try {
            const updatedRecord = { orderStatus: status }; // Send the status update
            await axios.patch(`http://localhost:4000/partner/${selectedRecord._id}/status`, updatedRecord); // Adjust endpoint for updating status
            setSuccess('Tracking record updated successfully!');
            setStatus(''); // Reset status
            setSelectedRecord(null); // Reset selected record
            const response = await axios.get('http://localhost:4000/partner/orders'); // Refetch data after update
            setTrackingRecords(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update tracking record');
        }
    };
    
    // Filter orders based on filters
    const filteredOrders = () => {
        return trackingRecords.filter(order => {
            const tokenNumber = (order.tokenNumber?.toString() || '').toLowerCase(); // Ensure it's a string
            const fullName = `${order.customer?.firstName} ${order.customer?.lastName}`.toLowerCase();
            const phone = order.userOwner?.phone?.toLowerCase() || '';
            const address = order.customer?.address?.toLowerCase() || '';
            const status = order.orderStatus?.toLowerCase() || '';
    
            return (
                (filters.tokenNumber === '' || tokenNumber.includes(filters.tokenNumber.toLowerCase())) &&
                (filters.name === '' || fullName.includes(filters.name.toLowerCase())) &&
                (filters.phone === '' || phone.includes(filters.phone.toLowerCase())) &&
                (filters.address === '' || address.includes(filters.address.toLowerCase())) &&
                (filters.status === '' || status.includes(filters.status.toLowerCase()))
            );
        });
    };
    
    const filteredOrdersData = filteredOrders(); // Get the filtered orders data
    const totalPages = Math.ceil(filteredOrdersData.length / ITEMS_PER_PAGE); // Calculate total pages based on filtered data
    const currentRecords = filteredOrdersData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE); // Get records for the current page

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleFilterChange = (e, key) => {
        setFilters(prev => ({ ...prev, [key]: e.target.value }));
        setCurrentPage(1); // Reset to the first page when a filter is applied
    };

    const renderMobileFilters = () => (
        <div className="mb-4">
            <button 
                onClick={() => setShowFilters(!showFilters)}
                className="w-full bg-gray-100 p-2 rounded-md text-left flex justify-between items-center mb-2 border"
            >
                <span className="font-medium">Filter Orders</span>
                <span>{showFilters ? '▲' : '▼'}</span>
            </button>
            
            {showFilters && (
                <div className="space-y-2 bg-white p-3 rounded-md border">
                    {Object.keys(filters).map((key) => (
                        <div key={key} className="mb-2">
                            <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                                {key}
                            </label>
                            <input
                                type="text"
                                className="border rounded w-full p-2 text-sm"
                                placeholder={`Search ${key}...`}
                                value={filters[key]}
                                onChange={(e) => handleFilterChange(e, key)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    const renderDesktopFilters = () => (
        <div className="mb-6 flex flex-wrap gap-2">
            {Object.keys(filters).map((key) => (
                <div key={key} className="flex flex-col w-1/5 min-w-[150px]">
                    <label className="text-sm font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                    <input
                        type="text"
                        className="border rounded w-full p-2"
                        placeholder={`Search ${key}...`}
                        value={filters[key]}
                        onChange={(e) => handleFilterChange(e, key)}
                    />
                </div>
            ))}
        </div>
    );

    const renderMobileOrderCards = () => (
        <div className="space-y-4 mb-4">
            {currentRecords.map((record) => (
                <div key={record._id} className="bg-white p-4 rounded-lg shadow border">
                    <div className="border-b pb-2 mb-2 flex justify-between">
                        <span className="font-bold">Token: {record.tokenNumber}</span>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                            record.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' : 
                            record.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                            'bg-yellow-100 text-yellow-800'
                        }`}>
                            {record.orderStatus}
                        </span>
                    </div>
                    <div className="space-y-1 text-sm">
                        <div><span className="font-semibold">Name:</span> {record.customer?.firstName} {record.customer?.lastName || 'Unknown'}</div>
                        <div><span className="font-semibold">Phone:</span> {record.userOwner?.phone || 'N/A'}</div>
                        <div><span className="font-semibold">Address:</span> {record.customer?.address || 'N/A'}</div>
                    </div>
                    <div className="mt-3">
                        <Link 
                            to={`/order/${record._id}`} 
                            className="block text-center bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderDesktopTable = () => (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 shadow-lg">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Token Number</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Customer Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Customer Phone</th>
                        <th className="border border-gray-300 px-2 py-2 text-left">Address</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((record) => (
                        <tr key={record._id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">{record.tokenNumber}</td>
                            <td className="border border-gray-300 px-4 py-2">{record.customer?.firstName} {record.customer?.lastName || 'Unknown'}</td>
                            <td className="border border-gray-300 px-4 py-2">{record.userOwner?.phone || 'N/A'}</td>
                            <td className="border border-gray-300 px-2 py-2">{record.customer?.address || 'N/A'}</td>
                            <td className="border border-gray-300 px-4 py-2">{record.orderStatus}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <Link to={`/order/${record._id}`} className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded">
                                    View Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderPagination = () => (
        <div className={`flex justify-center items-center mt-6 ${isMobile ? 'space-x-2' : 'space-x-4'}`}>
            <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`${isMobile ? 'px-3 py-1 text-sm' : 'px-4 py-2'} rounded ${
                    currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
            >
                {isMobile ? 'Prev' : 'Previous'}
            </button>
            <span className={`${isMobile ? 'text-sm' : 'text-lg'} font-semibold`}>
                {isMobile ? `${currentPage}/${totalPages}` : `Page ${currentPage} of ${totalPages}`}
            </span>
            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`${isMobile ? 'px-3 py-1 text-sm' : 'px-4 py-2'} rounded ${
                    currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
            >
                Next
            </button>
        </div>
    );

    return (
        <div className={`flex flex-col items-center ${isMobile ? 'mt-4 mb-4 px-3' : 'mt-[50px] mb-[50px]'}`}>
            <div className={`w-full ${isMobile ? 'max-w-full' : 'max-w-7xl'}`}>
                <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-center mb-6`}>All Orders</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}
                
                {/* Responsive Filters */}
                {isMobile ? renderMobileFilters() : renderDesktopFilters()}

                {/* Responsive Content Display */}
                {isMobile ? renderMobileOrderCards() : renderDesktopTable()}

                {/* Pagination Controls */}
                {totalPages > 1 && renderPagination()}
            </div>

        {/* Update Tracking Section - Responsive */}
<div className={`${isMobile ? 'w-full' : 'w-[650px]'} mt-8 p-4 md:p-6 border border-gray-300 rounded-lg shadow-md bg-white`}>
    <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-center mb-4`}>Update Tracking</h2>
    
    <div className="mb-4">
        <label className="block font-semibold text-sm mb-1">Select Order:</label>
        <select
            value={selectedRecord ? selectedRecord._id : ''}
            onChange={(e) => {
                const record = trackingRecords.find(rec => rec._id === e.target.value);
                setSelectedRecord(record);
                setStatus(record ? record.orderStatus : '');
            }}
            className="border rounded w-full p-1 text-sm"
        >
            <option value="">-- Select an Order --</option>
            {trackingRecords.map((record) => (
                <option key={record.tokenNumber} value={record._id}>
                    Order ID: {record.tokenNumber}, {record.customer?.firstName} {record.customer?.lastName || ''}
                </option>
            ))}
        </select>
    </div>
    {selectedRecord && (
        <form onSubmit={handleUpdate}>
            <div className="mb-4">
                <label className="block font-semibold text-sm mb-1">Current Status:</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border rounded w-full p-1 text-sm"
                >
                    <option value="">-- Select Status --</option>
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600">
                Update Status
            </button>
        </form>
    )}
</div>
        </div>
    );
};

export default UpdateTrack;
