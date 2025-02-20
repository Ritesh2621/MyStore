import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const OrderInfo = () => {
  const { orderId } = useParams(); // Get orderId from URL
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/partner/${orderId}`);
        setOrder(response.data); // Set the order data
      } catch (err) {
        setError('Failed to fetch order details');
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!order) return <p className="text-center">Loading order details...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-semibold text-center mb-6">Order Details</h2>

      {/* Order Token Number */}
      <div className="mb-4">
        <span className="font-bold text-lg">Token Number: </span>
        <span>{order.tokenNumber}</span>
      </div>

      {/* Customer Information */}
      <div className="border-b pb-4 mb-4">
        <h3 className="text-xl font-semibold mb-2">Customer Information</h3>
        <p><span className="font-bold">Name: </span>{order.customer.firstName} {order.customer.lastName}</p>
        <p><span className="font-bold">Email: </span>{order.customer.email}</p>
        <p><span className="font-bold">Phone: </span>{order.customer.phone}</p>
        <p><span className="font-bold">Address: </span>{order.customer.address}</p>
        <p><span className="font-bold">Country: </span>{order.customer.country}</p>
        <p><span className="font-bold">State: </span>{order.customer.state}</p>
        <p><span className="font-bold">City: </span>{order.customer.city}</p>
        <p><span className="font-bold">Pincode: </span>{order.customer.pincode}</p>
      </div>

      {/* Products */}
      <div className="border-b pb-4 mb-4">
  <h3 className="text-xl font-semibold mb-4">Products</h3>
  <ul className="space-y-4">
    {order.products.map((product, index) => (
      <li key={index} className="flex items-center justify-between space-x-4 border-b py-2">
        <div className="flex-1">
          <span className="text-lg font-medium">{product.title}</span>
        </div>
        
   
        <div className="text-right">
          <span className="text-sm text-gray-700">{product.quantity} x Rs {product.price}</span>
        </div>
      </li>
    ))}
  </ul>
</div>


      {/* Total Amount */}
      <div className="mb-4">
        <span className="font-bold text-lg">Total Amount: </span>
        <span className="text-xl text-green-600">Rs {order.totalAmount}</span>
      </div>

      {/* Order and Delivery Dates */}
      <div className="mb-4">
        <p><span className="font-bold">Order Date: </span>{new Date(order.orderDate).toLocaleDateString()}</p>
        {order.deliveryDate && <p><span className="font-bold">Delivery Date: </span>{new Date(order.deliveryDate).toLocaleDateString()}</p>}
      </div>

      {/* Order Status */}
      <div className="mb-4">
        <span className="font-bold text-lg">Order Status: </span>
        <span
          className={`px-3 py-1 rounded-full text-white ${order.orderStatus === 'pending' ? 'bg-yellow-500' : order.orderStatus === 'shipped' ? 'bg-blue-500' : 'bg-green-500'}`}
        >
          {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
        </span>
      </div>

      {/* Back Button */}
      <div className="flex justify-center">
        <Link to="/pending-order" className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600">
          Back to Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderInfo;
