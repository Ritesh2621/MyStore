import React, { useState, useEffect } from "react";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className="py-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h1>

        {orders.length === 0 ? (
          <p className="text-gray-600">You have no orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border-b py-4">
                <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
                <p className="text-gray-600">Date: {order.date}</p>
                <p className="text-gray-600">Total: ${order.total}</p>
                <p className="text-gray-600">Status: {order.status}</p>
                <div className="mt-4">
                  <h3 className="font-semibold">Items:</h3>
                  <ul>
                    {order.items.map((item) => (
                      <li key={item.id} className="text-gray-600">
                        {item.title} (x{item.quantity}) - ${item.price}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;