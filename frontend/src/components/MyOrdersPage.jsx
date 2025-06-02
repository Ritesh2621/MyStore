// import React, { useState, useEffect } from "react";

// const MyOrdersPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       const userId = localStorage.getItem("userId"); // Get the user ID from localStorage

//       if (!userId) {
//         setError("User ID not found. Please log in.");
//         setLoading(false);
//         return;
//       }

//       try {
//         // Fetch orders from the API
//         const response = await fetch(`http://localhost:4000/order/${userId} `); 
//         if (!response.ok) {
//           throw new Error("Failed to fetch orders");
//         }

//         const data = await response.json();
//         console.log(data);
//         setOrders(data); // Set the orders from the response
//       } catch (error) {
//         setError(error.message); // Handle any errors during the API request
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) {
//     return <p className="text-gray-600">Loading your orders...</p>;
//   }

//   if (error) {
//     return <p className="text-red-600">{error}</p>;
//   }

//   return (
//     <div className="py-8 bg-gray-100 min-h-screen">
//       <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
//         <h1 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h1>

//         {orders.length === 0 ? (
//           <p className="text-gray-600">You have no orders yet.</p>
//         ) : (
//           <div className="space-y-6">
//             {orders.map((order) => (
//               <div key={order._id} className="border-b py-4">
//                 <div className="mt-4">
//                   <h3 className="font-semibold">Items:</h3>
//                   <ul>
//                     {order.products.map((item) => (
//                       <li key={item._id} className="text-gray-600">
//                         {item.title} (x{item.quantity}) - Rs{item.price}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
                
//                 <p className="text-gray-600">Name: {order.customer.firstName + " " + order.customer.lastName}</p>
//                 <p className="text-gray-600">Phone: {order.customer.phone}</p>
//                 <p className="text-gray-600">Total: ${order.totalAmount}</p>
//                 <p className="text-gray-600">Status: {order.orderStatus}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyOrdersPage;


// mobile view 

import React, { useState, useEffect } from "react";
import { CheckCircle, Clock, Truck } from "lucide-react";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem("userId"); // Get the user ID from localStorage

      if (!userId) {
        setError("User ID not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        // Fetch orders from the API
        const response = await fetch(`http://localhost:4000/order/${userId} `); 
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        console.log(data);
        setOrders(data); // Set the orders from the response
      } catch (error) {
        setError(error.message); // Handle any errors during the API request
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Helper function to get status indicator
  const getStatusIndicator = (status) => {
    switch (status) {
      case "Delivered":
        return {
          icon: <CheckCircle size={16} className="mr-1" />,
          color: "bg-green-100 text-green-600"
        };
      case "Shipped":
        return {
          icon: <Truck size={16} className="mr-1" />,
          color: "bg-blue-100 text-blue-600"
        };
      case "Pending":
      default:
        return {
          icon: <Clock size={16} className="mr-1" />,
          color: "bg-yellow-100 text-yellow-600"
        };
    }
  };

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg animate-pulse">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 md:p-6 max-w-md w-full">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 md:py-8 bg-gray-100 min-h-screen px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-md rounded-lg p-4 md:p-6 mb-4 md:mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Orders</h1>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white shadow-md rounded-lg p-8 text-center">
            <p className="text-gray-600 mb-2">You have no orders yet.</p>
            <p className="text-gray-500 text-sm">Your order history will appear here once you make a purchase.</p>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {orders.map((order) => {
              const statusInfo = getStatusIndicator(order.orderStatus);
              
              return (
                <div key={order._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  {/* Order Header */}
                  <div className="bg-gray-50 p-4 flex flex-col md:flex-row md:items-center md:justify-between border-b">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h2 className="font-medium text-gray-900">Order #{order._id.substring(0, 8)}</h2>
                        {order.orderDate && (
                          <span className="text-sm text-gray-500 hidden md:inline">
                            • {formatDate(order.orderDate)}
                          </span>
                        )}
                      </div>
                      {order.orderDate && (
                        <span className="text-sm text-gray-500 md:hidden block mt-1">
                          {formatDate(order.orderDate)}
                        </span>
                      )}
                    </div>
                    <div className={`flex items-center ${statusInfo.color} px-3 py-1 rounded-full text-xs font-medium mt-2 md:mt-0 self-start md:self-auto`}>
                      {statusInfo.icon}
                      <span>{order.orderStatus}</span>
                    </div>
                  </div>

                  {/* Order Content */}
                  <div className="p-4">
                    {/* Customer Info */}
                    <div className="mb-4">
                      <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                        <p className="text-sm md:text-base text-gray-600">
                          <span className="font-medium text-gray-700">Name:</span> {order.customer.firstName + " " + order.customer.lastName}
                        </p>
                        <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-0">
                          <span className="font-medium text-gray-700">Phone:</span> {order.customer.phone}
                        </p>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="mt-4 mb-4">
                      <h3 className="font-semibold text-gray-800 mb-2">Items:</h3>
                      <div className="bg-gray-50 rounded-lg divide-y divide-gray-100">
                        {order.products.map((item) => (
                          <div key={item._id} className="p-3 flex justify-between items-center">
                            <div className="flex-grow">
                              <p className="text-sm md:text-base font-medium text-gray-800">{item.title}</p>
                              <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                            <p className="text-sm md:text-base font-medium text-gray-900">Rs {item.price}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Total Amount */}
                    <div className="mt-4 pt-3 border-t flex justify-between items-center">
                      <p className="text-gray-700 font-medium">Total Amount:</p>
                      <p className="text-lg font-bold text-gray-900">Rs {order.totalAmount}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;