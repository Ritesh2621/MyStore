import React, { useState, useEffect } from "react";

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

  if (loading) {
    return <p className="text-gray-600">Loading your orders...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="py-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h1>

        {orders.length === 0 ? (
          <p className="text-gray-600">You have no orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="border-b py-4">
                <div className="mt-4">
                  <h3 className="font-semibold">Items:</h3>
                  <ul>
                    {order.products.map((item) => (
                      <li key={item._id} className="text-gray-600">
                        {item.title} (x{item.quantity}) - Rs{item.price}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <p className="text-gray-600">Name: {order.customer.firstName + " " + order.customer.lastName}</p>
                <p className="text-gray-600">Phone: {order.customer.phone}</p>
                <p className="text-gray-600">Total: ${order.totalAmount}</p>
                <p className="text-gray-600">Status: {order.orderStatus}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;