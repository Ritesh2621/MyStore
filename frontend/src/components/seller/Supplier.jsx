// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Supplier = () => {
//   const [phone, setPhone] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   // Handle phone number change
//   const handlePhoneChange = (e) => {
//     setPhone(e.target.value);
//   };

//   // Check phone number on form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (!phone || phone.length !== 10 || !/^\d+$/.test(phone)) {
//       setError("Please enter a valid 10-digit phone number.");
//       return;
//     }

//     fetch("http://localhost:4000/supplier/check-seller", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ phone }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           setSuccess(true);
//           setError("");
//         } else {
//           setError(data.message || "An error occurred. Please try again.");
//           setSuccess(false);
//         }
//       })
//       .catch((err) => {
//         setError("An error occurred. Please try again.");
//         setSuccess(false);
//       });
//   };

//   return (
//     <div className="bg-blue-50 min-h-screen">
//       {/* Hero Section */}
//       <div className="bg-white py-20 px-6 shadow-sm">
//         <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto gap-12">
//           <div className="text-center md:text-left md:w-1/2">
//             <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
//               Become a Supplier
//             </span>
//             <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
//               Sell online to 14 Cr+ customers at{" "}
//               <span className="text-blue-600">0% Commission</span>
//             </h1>
//             <p className="text-gray-600 mt-6 text-lg">
//               Grow your business across India with our seller-friendly platform
//             </p>
//             <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
//               <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-semibold">
//                 New!
//               </span>
//               <p className="text-gray-700">
//                 Don't have a GSTIN? You can still sell.{" "}
//                 <button className="text-blue-600 font-medium hover:underline focus:outline-none">
//                   Know more
//                 </button>
//               </p>
//             </div>

//             {/* Phone Number Input */}
//             <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 w-full max-w-md mx-auto md:mx-0">
//               <div className="flex items-center shadow-md rounded-lg overflow-hidden w-full bg-white border border-gray-200">
//                 <span className="px-4 py-3 bg-gray-100 text-gray-600 font-medium border-r">+91</span>
//                 <input
//                   type="text"
//                   value={phone}
//                   onChange={handlePhoneChange}
//                   placeholder="Enter Your Mobile Number"
//                   className="p-3 flex-1 outline-none"
//                   maxLength={10}
//                 />
//                 <Link
//                   to="/supplier-registration"
//                   className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-6 py-3 font-semibold"
//                 >
//                   Start Selling
//                 </Link>
//               </div>

//               {/* Error/Success message */}
//               {error && <p className="text-red-600 text-sm">{error}</p>}
//               {success && (
//                 <p className="text-green-600 text-sm">
//                   Phone number is unique. You can proceed with the registration!
//                 </p>
//               )}
//             </form>
//           </div>
//           <div className="md:w-1/2 flex justify-center">
//             <img
//               src="https://plus.unsplash.com/premium_photo-1681488262364-8aeb1b6aac56?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGUlMjBjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D"
//               alt="Supplier Banner"
//               className="w-full max-w-lg rounded-lg shadow-lg object-cover h-80"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="max-w-6xl mx-auto py-16 px-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           {[
//             { number: "11 Lakh+", text: "Trust Us to Sell Online" },
//             { number: "14 Crore+", text: "Customers Buying Across India" },
//             { number: "19000+", text: "Pincodes Supported for Delivery" },
//             { number: "700+", text: "Categories to Sell Online" },
//           ].map((item, index) => (
//             <div
//               key={index}
//               className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
//             >
//               <h2 className="text-3xl font-bold text-blue-600 mb-2">{item.number}</h2>
//               <p className="text-gray-600">{item.text}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Why Suppliers Love Section */}
//       <div className="bg-white py-16 px-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="flex flex-col lg:flex-row items-start gap-12">
//             {/* Left Side - Heading & Description */}
//             <div className="lg:w-1/2">
//               <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
//                 Benefits
//               </span>
//               <h2 className="text-3xl font-bold text-gray-900">Why Suppliers Love MyStore</h2>
//               <p className="text-gray-600 mt-4 text-lg">
//                 All the benefits that come with selling on MyStore are designed to help you sell more,
//                 and make it easier to grow your business.
//               </p>
//             </div>

//             {/* Right Side - Features List */}
//             <div className="lg:w-1/2 bg-[#F8FAFF] p-8 rounded-2xl shadow-md border border-gray-100">
//               {[
//                 {
//                   icon: "💰",
//                   title: "0% Commission Fee",
//                   desc: "Suppliers selling on MyStore keep 100% of their profit by not paying any commission."
//                 },
//                 {
//                   icon: "🛡️",
//                   title: "0 Penalty Charges",
//                   desc: "Sell online without the fear of order cancellation charges with 0 Penalty for late dispatch or order cancellations."
//                 },
//                 {
//                   icon: "📈",
//                   title: "Growth for Every Supplier",
//                   desc: "From small to large and unbranded to branded, MyStore fuels growth for all suppliers, even those without a GSTIN."
//                 },
//                 {
//                   icon: "✅",
//                   title: "Ease of Doing Business",
//                   desc: "✓ Easy Product Listing  ✓ Lowest Cost Shipping  ✓ 7-Day Payment Cycle from the delivery date"
//                 }
//               ].map((item, index) => (
//                 <div key={index} className="flex items-start gap-4 py-5 border-b last:border-none">
//                   <div className="text-2xl bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center shrink-0">
//                     {item.icon}
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
//                     <p className="text-gray-600 mt-1">{item.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Exclusive Supplier+ Rewards Section */}
//       <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
//         <div className="max-w-6xl mx-auto px-6">
//           <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
//             Special Offers
//           </span>
//           <h2 className="text-3xl font-bold text-gray-900 mb-8">
//             Exclusive Supplier+ Rewards for the first 30 days
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
//             <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex items-start gap-6">
//               <div className="text-3xl bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center shrink-0">
//                 📢
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-900">
//                   Free catalog visibility of ₹600
//                 </h3>
//                 <p className="text-gray-600 mt-2">
//                   Run advertisements for your catalogs to increase the
//                   visibility of your products and get more orders. Currently,
//                   not available for sellers who don't have a Regular GSTIN.
//                 </p>
//               </div>
//             </div>
//             <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex items-start gap-6">
//               <div className="text-3xl bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center shrink-0">
//                 ❌
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-900">
//                   No Order Cancellation Charges
//                 </h3>
//                 <p className="text-gray-600 mt-2">
//                   Cancel orders that you can't fulfill for unforeseen reasons
//                   without worrying about penalties.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Experiences Section */}
//       <div className="max-w-6xl mx-auto px-6 py-16">
//         <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
//           Testimonials
//         </span>
//         <h2 className="text-3xl font-bold text-gray-900 mb-8">
//           Experiences suppliers love to talk about
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {[1, 2, 3].map((num) => (
//             <div key={num} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//               <img 
//                 src={`/api/placeholder/400/250`} 
//                 alt={`Supplier ${num}`} 
//                 className="w-full h-48 object-cover" 
//               />
//               <div className="p-6">
//                 <div className="flex items-center mb-4">
//                   <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
//                     👤
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-gray-900">Supplier Name</h4>
//                     <p className="text-sm text-gray-500">Business Owner</p>
//                   </div>
//                 </div>
//                 <p className="text-gray-600">
//                   "MyStore has completely transformed my business. The zero commission model helped me increase my profit margins significantly."
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* How It Works Section */}
//       <div className="bg-white py-16 px-6">
//         <div className="max-w-6xl mx-auto">
//           <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
//             Getting Started
//           </span>
//           <h2 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
//             {[
//               { 
//                 step: "Step 1", 
//                 icon: "📝", 
//                 title: "Register as a Supplier", 
//                 desc: "Sign up with your mobile number and business details to start selling." 
//               },
//               { 
//                 step: "Step 2", 
//                 icon: "📦", 
//                 title: "List Your Products", 
//                 desc: "Upload your product catalog with images and descriptions to attract buyers." 
//               },
//               { 
//                 step: "Step 3", 
//                 icon: "🚀", 
//                 title: "Start Receiving Orders", 
//                 desc: "Get orders from millions of customers across India and grow your business." 
//               }
//             ].map((item, index) => (
//               <div key={index} className="bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow p-8 border border-gray-100 relative">
//                 <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold py-1 px-2 rounded">
//                   {item.step}
//                 </div>
//                 <div className="text-4xl mb-4">{item.icon}</div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
//                 <p className="text-gray-600">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Call to Action Section */}
//       <div className="bg-blue-600 py-16 px-6">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-3xl font-bold text-white mb-6">
//             Ready to grow your business with MyStore?
//           </h2>
//           <p className="text-blue-100 mb-8 text-lg">
//             Join thousands of successful suppliers and start selling today.
//           </p>
//           <Link
//             to="/supplier-registration"
//             className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors shadow-md"
//           >
//             Start Selling Now
//           </Link>
//         </div>
//       </div>

    
//     </div>
//   );
// };

// export default Supplier;

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Supplier = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Handle phone number change
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  // Check phone number on form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!phone || phone.length !== 10 || !/^\d+$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    fetch("http://localhost:4000/supplier/check-seller", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSuccess(true);
          setError("");
        } else {
          setError(data.message || "An error occurred. Please try again.");
          setSuccess(false);
        }
      })
      .catch((err) => {
        setError("An error occurred. Please try again.");
        setSuccess(false);
      });
  };

  return (
    <div className="bg-blue-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-white py-12 md:py-20 px-4 md:px-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto gap-8 md:gap-12">
          <div className="text-center md:text-left w-full md:w-1/2">
            <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
              Become a Supplier
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Sell online to 14 Cr+ customers at{" "}
              <span className="text-blue-600">0% Commission</span>
            </h1>
            <p className="text-gray-600 mt-4 md:mt-6 text-base md:text-lg">
              Grow your business across India with our seller-friendly platform
            </p>
            <div className="mt-4 md:mt-6 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-semibold">
                New!
              </span>
              <p className="text-gray-700">
                Don't have a GSTIN? You can still sell.{" "}
                <button className="text-blue-600 font-medium hover:underline focus:outline-none">
                  Know more
                </button>
              </p>
            </div>

            {/* Phone Number Input */}
            <form onSubmit={handleSubmit} className="mt-6 md:mt-8 flex flex-col gap-4 w-full max-w-md mx-auto md:mx-0">
              <div className="flex flex-col sm:flex-row items-center shadow-md rounded-lg overflow-hidden w-full bg-white border border-gray-200">
                <div className="flex w-full sm:w-auto">
                  <span className="px-3 md:px-4 py-3 bg-gray-100 text-gray-600 font-medium border-r">+91</span>
                  <input
                    type="text"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="Enter Your Mobile Number"
                    className="p-3 flex-1 outline-none w-full"
                    maxLength={10}
                  />
                </div>
                <Link
                  to="/supplier-registration"
                  className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-6 py-3 font-semibold w-full sm:w-auto text-center"
                >
                  Start Selling
                </Link>
              </div>

              {/* Error/Success message */}
              {error && <p className="text-red-600 text-sm">{error}</p>}
              {success && (
                <p className="text-green-600 text-sm">
                  Phone number is unique. You can proceed with the registration!
                </p>
              )}
            </form>
          </div>
          <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
            <img
              src="/api/placeholder/600/400"
              alt="Supplier Banner"
              className="w-full max-w-lg rounded-lg shadow-lg object-cover h-64 md:h-80"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto py-12 md:py-16 px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { number: "11 Lakh+", text: "Trust Us to Sell Online" },
            { number: "14 Crore+", text: "Customers Buying Across India" },
            { number: "19000+", text: "Pincodes Supported for Delivery" },
            { number: "700+", text: "Categories to Sell Online" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">{item.number}</h2>
              <p className="text-gray-600 text-sm md:text-base">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Suppliers Love Section */}
      <div className="bg-white py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-8 md:gap-12">
            {/* Left Side - Heading & Description */}
            <div className="w-full lg:w-1/2">
              <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                Benefits
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Why Suppliers Love MyStore</h2>
              <p className="text-gray-600 mt-4 text-base md:text-lg">
                All the benefits that come with selling on MyStore are designed to help you sell more,
                and make it easier to grow your business.
              </p>
            </div>

            {/* Right Side - Features List */}
            <div className="w-full lg:w-1/2 bg-[#F8FAFF] p-6 md:p-8 rounded-2xl shadow-md border border-gray-100 mt-6 lg:mt-0">
              {[
                {
                  icon: "💰",
                  title: "0% Commission Fee",
                  desc: "Suppliers selling on MyStore keep 100% of their profit by not paying any commission."
                },
                {
                  icon: "🛡️",
                  title: "0 Penalty Charges",
                  desc: "Sell online without the fear of order cancellation charges with 0 Penalty for late dispatch or order cancellations."
                },
                {
                  icon: "📈",
                  title: "Growth for Every Supplier",
                  desc: "From small to large and unbranded to branded, MyStore fuels growth for all suppliers, even those without a GSTIN."
                },
                {
                  icon: "✅",
                  title: "Ease of Doing Business",
                  desc: "✓ Easy Product Listing  ✓ Lowest Cost Shipping  ✓ 7-Day Payment Cycle from the delivery date"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 py-4 md:py-5 border-b last:border-none">
                  <div className="text-xl md:text-2xl bg-blue-100 h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 mt-1 text-sm md:text-base">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Exclusive Supplier+ Rewards Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
            Special Offers
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
            Exclusive Supplier+ Rewards for the first 30 days
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
              <div className="text-2xl md:text-3xl bg-blue-100 h-14 w-14 md:h-16 md:w-16 rounded-full flex items-center justify-center shrink-0">
                📢
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 text-center md:text-left">
                  Free catalog visibility of ₹600
                </h3>
                <p className="text-gray-600 mt-2 text-sm md:text-base text-center md:text-left">
                  Run advertisements for your catalogs to increase the
                  visibility of your products and get more orders. Currently,
                  not available for sellers who don't have a Regular GSTIN.
                </p>
              </div>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
              <div className="text-2xl md:text-3xl bg-blue-100 h-14 w-14 md:h-16 md:w-16 rounded-full flex items-center justify-center shrink-0">
                ❌
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 text-center md:text-left">
                  No Order Cancellation Charges
                </h3>
                <p className="text-gray-600 mt-2 text-sm md:text-base text-center md:text-left">
                  Cancel orders that you can't fulfill for unforeseen reasons
                  without worrying about penalties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Experiences Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
          Testimonials
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
          Experiences suppliers love to talk about
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3].map((num) => (
            <div key={num} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={`/api/placeholder/400/250`} 
                alt={`Supplier ${num}`} 
                className="w-full h-40 md:h-48 object-cover" 
              />
              <div className="p-4 md:p-6">
                <div className="flex items-center mb-4">
                  <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    👤
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Supplier Name</h4>
                    <p className="text-xs md:text-sm text-gray-500">Business Owner</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm md:text-base">
                  "MyStore has completely transformed my business. The zero commission model helped me increase my profit margins significantly."
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
            Getting Started
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                step: "Step 1", 
                icon: "📝", 
                title: "Register as a Supplier", 
                desc: "Sign up with your mobile number and business details to start selling." 
              },
              { 
                step: "Step 2", 
                icon: "📦", 
                title: "List Your Products", 
                desc: "Upload your product catalog with images and descriptions to attract buyers." 
              },
              { 
                step: "Step 3", 
                icon: "🚀", 
                title: "Start Receiving Orders", 
                desc: "Get orders from millions of customers across India and grow your business." 
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 md:p-8 border border-gray-100 relative">
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold py-1 px-2 rounded">
                  {item.step}
                </div>
                <div className="text-3xl md:text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm md:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-blue-600 py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
            Ready to grow your business with MyStore?
          </h2>
          <p className="text-blue-100 mb-6 md:mb-8 text-base md:text-lg">
            Join thousands of successful suppliers and start selling today.
          </p>
          <Link
            to="/supplier-registration"
            className="inline-block bg-white text-blue-600 px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold text-base md:text-lg hover:bg-blue-50 transition-colors shadow-md"
          >
            Start Selling Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Supplier;