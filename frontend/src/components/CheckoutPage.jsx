// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// const CheckoutPage = () => {
//   const { state } = useLocation();
//   const { total, cartItems } = state;
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     country: '',
//     state: '',
//     city: '',
//     address: '',
//     pincode: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmitOrder = async () => {
//     // Check if the form is valid
//     const isFormValid = Object.values(formData).every(value => value.trim() !== '');
//     if (!isFormValid) {
//       alert("Please fill in all the required fields.");
//       return;
//     }

//     try {
//       const userId = localStorage.getItem("userId");

//       if (!userId) {
//         alert("User not logged in. Please log in first.");
//         return;
//       }

//       // Create orderData object
//       const orderData = {
//         tokenNumber: Math.floor(Math.random() * 1000000), // Generate a unique token number
//         customer: {
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           phone: formData.phone,
//           country: formData.country,
//           state: formData.state,
//           city: formData.city,
//           address: formData.address,
//           pincode: formData.pincode,
//         },
//         products: Object.values(cartItems).map((item) => ({
//           title: item.title,
//           price: item.price,
//           quantity: item.quantity,
//           sellerId:item.sellerId ? item.sellerId : '67a5b37cddcc3105ff47f3cd',
//         })),
//         totalAmount: total,
//         orderStatus: 'pending', // Initial order status
//         userOwner: userId,
//       };

//       // Send the order data to the backend
//       const response = await axios.post("http://localhost:4000/order", orderData);

//       if (response.status === 201) {
//         navigate("/myorders");
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);

//       if (error.response) {
//         console.error("Backend error response:", error.response);
//       } else if (error.request) {
//         console.error("No response received:", error.request);
//         alert("No response from server, please try again.");
//       } else {
//         console.error("Unexpected error:", error.message);
//         alert("Unexpected error occurred. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="py-8 bg-gray-100">
//       <div className="max-w-6xl mx-auto flex gap-6">
//         {/* Left Section: Product & Delivery */}
//         <div className="w-2/3 bg-white shadow-lg rounded-lg p-6">
//           <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Details</h1>
//           <div className="border rounded-lg p-4">
//             {Object.values(cartItems).map((item) => (
//               <div key={item._id} className="flex items-center space-x-4 py-4">
//                 <img src={item.images[0]} alt={item.title} className="w-16 h-16 rounded-lg" />
//                 <div className="flex-1">
//                   <h2 className="text-lg font-semibold">{item.title}</h2>
//                   <p className="text-gray-600">₹{item.price}</p>
//                   <p className="text-gray-500">Quantity: {item.quantity}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Delivery Address Form */}
//           <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Delivery Details</h2>
//           <div className="border rounded-lg p-6 bg-white shadow-md">
//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleInputChange}
//                 placeholder="First Name"
//                 className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
//               />
//               <input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleInputChange}
//                 placeholder="Last Name"
//                 className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
//               />
//             </div>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               placeholder="Email"
//               className="border p-3 rounded-lg w-full mt-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
//             />
            
//             <div className="grid grid-cols-2 gap-4 mt-4">
//               <input
//                 type="text"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleInputChange}
//                 placeholder="City"
//                 className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
//               />
//               <input
//                 type="text"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleInputChange}
//                 placeholder="State"
//                 className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
//               />
//             </div>
            
//             <div className="grid grid-cols-2 gap-4 mt-4">
//               <input
//                 type="text"
//                 name="pincode"
//                 value={formData.pincode}
//                 onChange={handleInputChange}
//                 placeholder="Zip-Code"
//                 className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
//               />
//               <input
//                 type="text"
//                 name="country"
//                 value={formData.country}
//                 onChange={handleInputChange}
//                 placeholder="Country"
//                 className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
//               />
//             </div>
            
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleInputChange}
//               placeholder="Phone"
//               className="border p-3 rounded-lg w-full mt-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
//             />
            
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleInputChange}
//               placeholder="Address"
//               className="border p-3 rounded-lg w-full mt-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
//             />
//           </div>
//         </div>

//         {/* Right Section: Price Details */}
//         <div className="w-1/3 bg-white shadow-lg rounded-lg p-6 h-fit">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Price Details</h2>
//           <div className="border rounded-lg p-4">
//             <div className="flex justify-between text-lg font-semibold">
//               <p>Total Product Price</p>
//               <p>+ ₹{total}</p>
//             </div>
//             <hr className="my-2" />
//             <div className="flex justify-between text-xl font-bold">
//               <p>Order Total</p>
//               <p>₹{total}</p>
//             </div>
//           </div>

//           <div className="mt-6">
//             <button
//               onClick={handleSubmitOrder}
//               className="bg-purple-600 text-white w-full py-3 rounded-lg font-semibold text-lg"
//             >
//               Place Order
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CheckoutPage = () => {
  const { state } = useLocation();
  const { total, cartItems } = state;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    address: '',
    pincode: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitOrder = async () => {
    // Check if the form is valid
    const isFormValid = Object.values(formData).every(value => value.trim() !== '');
    if (!isFormValid) {
      alert("Please fill in all the required fields.");
      return;
    }

    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("User not logged in. Please log in first.");
        return;
      }

      // Create orderData object
      const orderData = {
        tokenNumber: Math.floor(Math.random() * 1000000), // Generate a unique token number
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          state: formData.state,
          city: formData.city,
          address: formData.address,
          pincode: formData.pincode,
        },
        products: Object.values(cartItems).map((item) => ({
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          sellerId:item.sellerId ? item.sellerId : '67a5b37cddcc3105ff47f3cd',
        })),
        totalAmount: total,
        orderStatus: 'pending', // Initial order status
        userOwner: userId,
      };

      // Send the order data to the backend
      const response = await axios.post("http://localhost:4000/order", orderData);

      if (response.status === 201) {
        navigate("/myorders");
      }
    } catch (error) {
      console.error("Error placing order:", error);

      if (error.response) {
        console.error("Backend error response:", error.response);
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("No response from server, please try again.");
      } else {
        console.error("Unexpected error:", error.message);
        alert("Unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="py-4 bg-gray-100 px-3 sm:px-4">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-4">
        {/* Left Section: Product & Delivery */}
        <div className="w-full lg:w-2/3 bg-white shadow rounded-lg p-3 sm:p-4">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Product Details</h1>
          <div className="border rounded-lg p-2">
            {Object.values(cartItems).map((item) => (
              <div key={item._id} className="flex items-center space-x-3 py-2">
                <img src={item.images[0]} alt={item.title} className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg" />
                <div className="flex-1">
                  <h2 className="text-sm sm:text-base font-semibold">{item.title}</h2>
                  <p className="text-gray-600 text-sm">₹{item.price}</p>
                  <p className="text-gray-500 text-xs sm:text-sm">Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Address Form */}
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mt-4 mb-2">Delivery Details</h2>
          <div className="border rounded-lg p-3 bg-white shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="border p-2 rounded-lg w-full text-sm focus:outline-none focus:ring-1 focus:ring-purple-600"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="border p-2 rounded-lg w-full text-sm focus:outline-none focus:ring-1 focus:ring-purple-600"
              />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="border p-2 rounded-lg w-full text-sm mt-3 focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                className="border p-2 rounded-lg w-full text-sm focus:outline-none focus:ring-1 focus:ring-purple-600"
              />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="State"
                className="border p-2 rounded-lg w-full text-sm focus:outline-none focus:ring-1 focus:ring-purple-600"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="Zip-Code"
                className="border p-2 rounded-lg w-full text-sm focus:outline-none focus:ring-1 focus:ring-purple-600"
              />
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="Country"
                className="border p-2 rounded-lg w-full text-sm focus:outline-none focus:ring-1 focus:ring-purple-600"
              />
            </div>
            
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              className="border p-2 rounded-lg w-full text-sm mt-3 focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
            
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address"
              className="border p-2 rounded-lg w-full text-sm mt-3 focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
          </div>
        </div>

        {/* Right Section: Price Details */}
        <div className="w-full lg:w-1/3 bg-white shadow rounded-lg p-3 sm:p-4 h-fit mt-4 lg:mt-0">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Price Details</h2>
          <div className="border rounded-lg p-3">
            <div className="flex justify-between text-sm sm:text-base font-semibold">
              <p>Total Product Price</p>
              <p>+ ₹{total}</p>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-base sm:text-lg font-bold">
              <p>Order Total</p>
              <p>₹{total}</p>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={handleSubmitOrder}
              className="bg-purple-600 text-white w-full py-2 rounded-lg font-semibold text-base"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;