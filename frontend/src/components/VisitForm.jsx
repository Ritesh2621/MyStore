// import React, { useState } from "react";
// import { X } from "lucide-react";

// const VisitForm = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [formData, setFormData] = useState({
//     name: "",
//     mobileNumber: "",
//     email: "",
//     product: "",
//     location: ""
//   });
  
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [notification, setNotification] = useState({ show: false, message: "", isSuccess: false });
  
//   const handleClose = () => {
//     setIsOpen(false);
//   };
  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
  
//   const handleSubmit = async () => {
//     if (!formData.name) {
//       showNotification("Please enter your name", false);
//       return;
//     }

//     setIsSubmitting(true);
    
//     try {
//       // Simulating API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       showNotification("Thank you for your interest! We'll be in touch soon.", true);
//       setFormData({ name: "", mobileNumber: "", email: "", product: "", location: "" });
      
//       // Close popup after successful submission
//       setTimeout(() => {
//         setIsOpen(false);
//       }, 2000);
//     } catch (error) {
//       showNotification(error.message || "Something went wrong. Please try again.", false);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  
//   const showNotification = (message, isSuccess) => {
//     setNotification({ show: true, message, isSuccess });
//     setTimeout(() => {
//       setNotification({ show: false, message: "", isSuccess: false });
//     }, 5000);
//   };
  
//   if (!isOpen) {
//     return null; // Return nothing when closed
//   }
  
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="relative flex w-full max-w-lg h-auto overflow-hidden rounded-xl">
//         {/* Left side - Teal background with illustration */}
//         <div className="bg-teal-500 p-6 w-2/5 flex flex-col justify-between text-white">
//           <div>
//             <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
//             <p className="text-teal-100 text-sm">We'd love to stay in touch with you</p>
//           </div>
          
//           <div className="flex justify-center items-end">
//             <svg 
//               width="280" 
//               height="280" 
//               viewBox="0 0 280 280" 
//               className="w-full max-w-xs"
//             >
//               <g transform="translate(30, 30)">
//                 {/* Person with money illustration */}
//                 <circle cx="160" cy="90" r="25" fill="#fff" opacity="0.8" />
//                 <rect x="150" y="115" width="20" height="45" rx="5" fill="#fff" opacity="0.8" />
//                 <rect x="135" y="140" width="15" height="35" rx="5" fill="#fff" opacity="0.8" transform="rotate(-20, 135, 140)" />
                
//                 {/* Money in hand */}
//                 <rect x="170" y="140" width="40" height="25" rx="2" fill="#fff" opacity="0.8" />
//                 <rect x="175" y="145" width="30" height="5" rx="1" fill="#60a5fa" opacity="0.6" />
//                 <rect x="175" y="155" width="20" height="5" rx="1" fill="#60a5fa" opacity="0.6" />
                  
//                 {/* Circle background for visual */}
//                 <circle cx="100" cy="120" r="80" fill="#fff" opacity="0.1" />
                
//                 {/* Cash stack */}
//                 <rect x="60" y="100" width="40" height="6" rx="1" fill="#fff" opacity="0.8" />
//                 <rect x="60" y="108" width="40" height="6" rx="1" fill="#fff" opacity="0.7" />
//                 <rect x="60" y="116" width="40" height="6" rx="1" fill="#fff" opacity="0.8" />
                
//                 {/* Phone */}
//                 <rect x="40" y="90" width="30" height="50" rx="3" fill="#fff" opacity="0.8" />
//                 <rect x="45" y="95" width="20" height="30" rx="1" fill="#60a5fa" opacity="0.4" />
//                 <circle cx="55" cy="135" r="4" fill="#60a5fa" opacity="0.4" />
                
//                 {/* Decorative elements */}
//                 <rect x="20" y="60" width="60" height="6" rx="3" fill="#fff" opacity="0.3" />
//                 <rect x="120" y="180" width="40" height="6" rx="3" fill="#fff" opacity="0.3" />
//                 <rect x="30" y="200" width="70" height="6" rx="3" fill="#fff" opacity="0.3" />
//               </g>
//             </svg>
//           </div>
//         </div>
        
//         {/* Right side - White background with form */}
//         <div className="bg-white p-6 w-3/5 relative">
//           <button 
//             onClick={handleClose}
//             className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             aria-label="Close"
//           >
//             <X size={24} />
//           </button>
          
//           {/* Notification */}
//           {notification.show && (
//             <div 
//               className={`p-3 mb-4 rounded-md ${
//                 notification.isSuccess ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//               }`}
//             >
//               {notification.message}
//             </div>
//           )}
          
//           <div className="space-y-4">
//             <div>
//               <label className="block text-gray-700 text-sm font-medium mb-1">Full Name *</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="John Doe"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 required
//               />
//             </div>
            
//             <div>
//               <label className="block text-gray-700 text-sm font-medium mb-1">Email Address</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="john@example.com"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>
            
//             <div>
//               <label className="block text-gray-700 text-sm font-medium mb-1">Mobile Number</label>
//               <input
//                 type="tel"
//                 name="mobileNumber"
//                 value={formData.mobileNumber}
//                 onChange={handleChange}
//                 placeholder="+1 (555) 123-4567"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>
            
//             <div>
//               <label className="block text-gray-700 text-sm font-medium mb-1">Product Interest</label>
//               <select
//                 name="product"
//                 value={formData.product}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//               >
//                 <option value="">Select a product</option>
//                 <option value="Product A">Product A</option>
//                 <option value="Product B">Product B</option>
//                 <option value="Product C">Product C</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
            
//             <div>
//               <label className="block text-gray-700 text-sm font-medium mb-1">Your Location</label>
//               <input
//                 type="text"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//                 placeholder="City, Country"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>

//             <div className="pt-2">
//               <button
//                 onClick={handleSubmit}
//                 disabled={isSubmitting}
//                 className={`w-full px-4 py-3 text-white font-medium rounded-md shadow-sm 
//                   ${isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"}`}
//               >
//                 {isSubmitting ? "Submitting..." : "Submit"}
//               </button>
//             </div>

//             <p className="text-center text-xs text-gray-500 mt-2">
//               Your information will be securely stored and we'll only contact you regarding your inquiry.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VisitForm;


import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const VisitForm = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    product: "",
    location: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", isSuccess: false });
  const [products, setProducts] = useState([]);
  
  // Fetch product categories when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Use the correct API endpoint to fetch product categories
        const response = await fetch("http://localhost:4000/product/products-by-category/:category");
        const data = await response.json();
        
        // Ensure products is always an array
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data && typeof data === 'object') {
          // If data is an object with products array inside
          const productsArray = data.products || data.data || [];
          setProducts(Array.isArray(productsArray) ? productsArray : []);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };
    
    fetchProducts();
  }, []);
  
  const handleClose = () => {
    setIsOpen(false);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async () => {
    if (!formData.name) {
      showNotification("Please enter your name", false);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Save visit data to database
      const saveResponse = await fetch("http://localhost:4000/visit/visit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!saveResponse.ok) {
        throw new Error("Failed to save visit data");
      }
      
      // Send notification email/SMS if email or phone provided
      if (formData.email || formData.mobileNumber) {
        const notifyResponse = await fetch("http://localhost:4000/visit/visit/notify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            mobileNumber: formData.mobileNumber,
            name: formData.name
          }),
        });
        
        if (!notifyResponse.ok) {
          console.warn("Notification might not have been sent");
        }
      }
      
      showNotification("Thank you for your interest! We'll be in touch soon.", true);
      setFormData({ name: "", mobileNumber: "", email: "", product: "", location: "" });
      
      // Close popup after successful submission
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    } catch (error) {
      showNotification(error.message || "Something went wrong. Please try again.", false);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const showNotification = (message, isSuccess) => {
    setNotification({ show: true, message, isSuccess });
    setTimeout(() => {
      setNotification({ show: false, message: "", isSuccess: false });
    }, 5000);
  };
  
  if (!isOpen) {
    return null; // Return nothing when closed
  }
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="relative flex flex-col md:flex-row w-full max-w-lg h-auto overflow-hidden rounded-xl">
        {/* Left side - Teal background with illustration */}
        <div className="bg-blue-500 p-4 md:p-6 w-full md:w-2/5 flex flex-col justify-between text-white">
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Welcome!</h2>
            <p className="text-teal-100 text-xs md:text-sm">We'd love to stay in touch with you</p>
          </div>
          
          <div className="flex justify-center items-end">
            <svg 
              width="280" 
              height="180" 
              viewBox="0 0 280 280" 
              className="w-full max-w-xs hidden md:block"
            >
              <g transform="translate(30, 30)">
                {/* Person with money illustration */}
                <circle cx="160" cy="90" r="25" fill="#fff" opacity="0.8" />
                <rect x="150" y="115" width="20" height="45" rx="5" fill="#fff" opacity="0.8" />
                <rect x="135" y="140" width="15" height="35" rx="5" fill="#fff" opacity="0.8" transform="rotate(-20, 135, 140)" />
                
                {/* Money in hand */}
                <rect x="170" y="140" width="40" height="25" rx="2" fill="#fff" opacity="0.8" />
                <rect x="175" y="145" width="30" height="5" rx="1" fill="#60a5fa" opacity="0.6" />
                <rect x="175" y="155" width="20" height="5" rx="1" fill="#60a5fa" opacity="0.6" />
                  
                {/* Circle background for visual */}
                <circle cx="100" cy="120" r="80" fill="#fff" opacity="0.1" />
                
                {/* Cash stack */}
                <rect x="60" y="100" width="40" height="6" rx="1" fill="#fff" opacity="0.8" />
                <rect x="60" y="108" width="40" height="6" rx="1" fill="#fff" opacity="0.7" />
                <rect x="60" y="116" width="40" height="6" rx="1" fill="#fff" opacity="0.8" />
                
                {/* Phone */}
                <rect x="40" y="90" width="30" height="50" rx="3" fill="#fff" opacity="0.8" />
                <rect x="45" y="95" width="20" height="30" rx="1" fill="#60a5fa" opacity="0.4" />
                <circle cx="55" cy="135" r="4" fill="#60a5fa" opacity="0.4" />
                
                {/* Decorative elements */}
                <rect x="20" y="60" width="60" height="6" rx="3" fill="#fff" opacity="0.3" />
                <rect x="120" y="180" width="40" height="6" rx="3" fill="#fff" opacity="0.3" />
                <rect x="30" y="200" width="70" height="6" rx="3" fill="#fff" opacity="0.3" />
              </g>
            </svg>
            
            {/* Simplified mobile illustration */}
            <svg 
              width="120" 
              height="100" 
              viewBox="0 0 120 100" 
              className="w-1/2 my-2 md:hidden"
            >
              <g transform="translate(10, 10) scale(0.4)">
                {/* Simplified illustration for mobile */}
                <circle cx="160" cy="90" r="25" fill="#fff" opacity="0.8" />
                <rect x="150" y="115" width="20" height="45" rx="5" fill="#fff" opacity="0.8" />
                <rect x="170" y="140" width="40" height="25" rx="2" fill="#fff" opacity="0.8" />
                <circle cx="100" cy="120" r="80" fill="#fff" opacity="0.1" />
                <rect x="60" y="100" width="40" height="6" rx="1" fill="#fff" opacity="0.8" />
                <rect x="60" y="108" width="40" height="6" rx="1" fill="#fff" opacity="0.7" />
              </g>
            </svg>
          </div>
        </div>
        
        {/* Right side - White background with form */}
        <div className="bg-white p-4 md:p-6 w-full md:w-3/5 relative">
          <button 
            onClick={handleClose}
            className="absolute top-2 md:top-4 right-2 md:right-4 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          
          {/* Notification */}
          {notification.show && (
            <div 
              className={`p-2 md:p-3 mb-3 md:mb-4 text-sm rounded-md ${
                notification.isSuccess ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {notification.message}
            </div>
          )}
          
          <div className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-gray-700 text-xs md:text-sm font-medium mb-1">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Full Name"
                className="w-full px-2 md:px-3 py-1 md:py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-xs md:text-sm font-medium mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-2 md:px-3 py-1 md:py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-xs md:text-sm font-medium mb-1">Mobile Number</label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="+91 Mobile Number"
                className="w-full px-2 md:px-3 py-1 md:py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-xs md:text-sm font-medium mb-1">Product Interest</label>
              <select
                name="product"
                value={formData.product}
                onChange={handleChange}
                className="w-full px-2 md:px-3 py-1 md:py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select a product</option>
                {Array.isArray(products) && products.length > 0 && 
                  products.map(product => (
                    <option key={product._id || Math.random().toString()} value={product._id || product.name}>
                      {product.name || product.title || product.productName || "Product"}
                    </option>
                  ))
                }
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 text-xs md:text-sm font-medium mb-1">Your Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
                className="w-full px-2 md:px-3 py-1 md:py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="pt-1 md:pt-2">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-white font-medium rounded-md shadow-sm 
                  ${isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"}`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>

            <p className="text-center text-xs text-gray-500 mt-1 md:mt-2">
              Your information will be securely stored and we'll only contact you regarding your inquiry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitForm;