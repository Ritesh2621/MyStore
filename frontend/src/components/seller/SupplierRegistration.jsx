// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const SupplierRegistration = () => {
//   const [activeTab, setActiveTab] = useState('tax');
//   const [taxOption, setTaxOption] = useState('enrolment');
//   const [formData, setFormData] = useState({
//     userId: '',
//     uinNumber: '',
//     gstNumber: '',
//     address: '',
//     pincode: '',
//     city: '',
//     bankAccount: '',
//     ifsc: '',
//     bankName: '',
//     upiId: '',
//     businessName: '',
//     businessType: '',
//     contactNumber: '',
//     productCategory: ''
//   });
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState(null);
//   // State to track expanded FAQ items
//   const [expandedFaqs, setExpandedFaqs] = useState({
//     1: true, // First FAQ is expanded by default
//     2: false,
//     3: false,
//   });

//   useEffect(() => {
//     const storedUserId = localStorage.getItem('userId');
//     if (storedUserId) {
//       setFormData((prevData) => ({
//         ...prevData,
//         userId: storedUserId
//       }));
//     } else {
//       console.error("No userId found in localStorage");
//     }
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setMessage(null);

//     // If not on the supplier tab, just go to the next tab
//     if (activeTab !== 'supplier') {
//       goToNextTab();
//       return;
//     }

//     // Otherwise, submit the form
//     try {
//       const response = await axios.post("http://localhost:4000/supplier/register", formData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       setMessage(response.data.message);
//       console.log("Registration successful:", response.data);
//     } catch (err) {
//       if (err.response) {
//         setError(err.response.data.message || "An error occurred on the server.");
//         console.error("Error from server:", err.response.data);
//       } else {
//         setError("Something went wrong. Please try again later.");
//         console.error("Unexpected error:", err);
//       }
//     }
//   };

//   // Function to toggle FAQ expansion
//   const toggleFaq = (faqId) => {
//     setExpandedFaqs(prev => ({
//       ...prev,
//       [faqId]: !prev[faqId]
//     }));
//   };

//   // Function to go to the next tab
//   const goToNextTab = () => {
//     const tabOrder = ['tax', 'pickup', 'bank', 'supplier'];
//     const currentIndex = tabOrder.indexOf(activeTab);
//     if (currentIndex < tabOrder.length - 1) {
//       setActiveTab(tabOrder[currentIndex + 1]);
//     }
//   };

//   // Get button text based on active tab
//   const getButtonText = () => {
//     return activeTab === 'supplier' ? 'Register' : 'Continue';
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
   

//       {/* Main Content */}
//       <main className="flex-1 max-w-6xl mx-auto py-6 px-4 md:px-6 w-full">
//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Left Section - Forms */}
//           <div className="w-full md:w-7/12">
//             {/* Tabs */}
//             <div className="flex border-b mb-6">
//               <div 
//                 className={`flex items-center px-4 py-3 cursor-pointer border-b-2 ${activeTab === 'tax' ? 'border-pink-500 text-pink-500' : 'border-transparent'}`}
//                 onClick={() => setActiveTab('tax')}
//               >
//                 <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-2 ${activeTab === 'tax' ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}>
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                   </svg>
//                 </div>
//                 <span>Tax Details</span>
//               </div>
//               <div 
//                 className={`flex items-center px-4 py-3 cursor-pointer border-b-2 ${activeTab === 'pickup' ? 'border-pink-500 text-pink-500' : 'border-transparent'}`}
//                 onClick={() => setActiveTab('pickup')}
//               >
//                 <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-2 ${activeTab === 'pickup' ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}>
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                   </svg>
//                 </div>
//                 <span>Pickup Address</span>
//               </div>
//               <div 
//                 className={`flex items-center px-4 py-3 cursor-pointer border-b-2 ${activeTab === 'bank' ? 'border-pink-500 text-pink-500' : 'border-transparent'}`}
//                 onClick={() => setActiveTab('bank')}
//               >
//                 <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-2 ${activeTab === 'bank' ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}>
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
//                   </svg>
//                 </div>
//                 <span>Bank Details</span>
//               </div>
//               <div 
//                 className={`flex items-center px-4 py-3 cursor-pointer border-b-2 ${activeTab === 'supplier' ? 'border-pink-500 text-pink-500' : 'border-transparent'}`}
//                 onClick={() => setActiveTab('supplier')}
//               >
//                 <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-2 ${activeTab === 'supplier' ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}>
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                   </svg>
//                 </div>
//                 <span>Supplier Details</span>
//               </div>
//             </div>

//             {/* Tax Details Tab Content */}
//             {activeTab === 'tax' && (
//               <div className="mb-6">
//                 <h2 className="text-lg font-medium mb-4">Choose your tax option</h2>
                
//                 <div className="mb-4">
//                   <label className="flex items-center mb-2">
//                     <input
//                       type="radio"
//                       name="taxOption"
//                       className="w-5 h-5 text-pink-500"
//                       checked={taxOption === 'enrolment'}
//                       onChange={() => setTaxOption('enrolment')}
//                     />
//                     <span className="ml-2 text-gray-800 font-medium">Enrolment ID / UIN</span>
//                     <span className="ml-2 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">For Non-GST sellers</span>
//                     <span className="ml-2 cursor-pointer text-gray-400">
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                     </span>
//                   </label>
//                   <p className="text-sm text-gray-600 ml-7 mb-3">Register with Enrolment ID / UIN and sell locally in your registered state without GST.</p>
                  
//                   <div className="ml-7">
//                     <div className="flex mb-3">
//                       <input
//                         type="text"
//                         name="uinNumber"
//                         placeholder="Enter Enrolment ID / UIN"
//                         className="w-full md:w-64 border rounded p-2 mr-2"
//                         value={formData.uinNumber}
//                         onChange={handleInputChange}
//                       />
//                       <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded">
//                         Verify
//                       </button>
//                     </div>
                    
//                     <div className="bg-gray-50 p-3 rounded mb-3">
//                       <p className="text-sm text-gray-700 mb-2">Don't have Enrolment ID / UIN / GST Number?</p>
//                       <div className="flex items-center">
//                         <a href="#" className="flex items-center text-sm text-red-600 mr-4">
//                           <svg className="w-5 h-5 mr-1 text-red-600" fill="currentColor" viewBox="0 0 20 20">
//                             <path d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 3C10.8 3 11.5 3.7 11.5 4.5C11.5 5.3 10.8 6 10 6C9.2 6 8.5 5.3 8.5 4.5C8.5 3.7 9.2 3 10 3ZM13 14.5C13 15.3 12.3 16 11.5 16H8.5C7.7 16 7 15.3 7 14.5V12.5C7 11.7 7.7 11 8.5 11H9V8.5C9 7.7 9.7 7 10.5 7H11C11.8 7 12.5 7.7 12.5 8.5V11H13C13.8 11 14.5 11.7 14.5 12.5V14.5H13Z" />
//                           </svg>
//                           Learn how to get it
//                         </a>
//                         <a href="#" className="text-sm text-blue-600">Apply for EID</a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className="flex items-center mb-2">
//                     <input
//                       type="radio"
//                       name="taxOption"
//                       className="w-5 h-5 text-pink-500"
//                       checked={taxOption === 'gstin'}
//                       onChange={() => setTaxOption('gstin')}
//                     />
//                     <span className="ml-2 text-gray-800 font-medium">GSTIN number</span>
//                     <span className="ml-2 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">Regular & Composition GST sellers</span>
//                   </label>
//                   <p className="text-sm text-gray-600 ml-7">for Regular and Composition GST sellers.</p>
//                 </div>
//               </div>
//             )}

//             {/* Pickup Address Tab Content */}
//             {activeTab === 'pickup' && (
//               <div className="mb-6">
//                 <h2 className="text-lg font-medium mb-4">Pickup Address</h2>
//                 <div className="mb-4">
//                   <input
//                     type="text"
//                     name="address"
//                     placeholder="Address"
//                     className="w-full border rounded p-2 mb-2"
//                     value={formData.address}
//                     onChange={handleInputChange}
//                     required
//                   />
//                   <div className="grid grid-cols-2 gap-2">
//                     <input
//                       type="text"
//                       name="pincode"
//                       placeholder="Pincode"
//                       className="border rounded p-2"
//                       value={formData.pincode}
//                       onChange={handleInputChange}
//                       required
//                     />
//                     <input
//                       type="text"
//                       name="city"
//                       placeholder="City"
//                       className="border rounded p-2"
//                       value={formData.city}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Bank Details Tab Content */}
//             {activeTab === 'bank' && (
//               <div className="mb-6">
//                 <h2 className="text-lg font-medium mb-4">Bank Details</h2>
//                 <div className="mb-4">
//                   <input
//                     type="text"
//                     name="bankAccount"
//                     placeholder="Bank Account Number"
//                     className="w-full border rounded p-2 mb-2"
//                     value={formData.bankAccount}
//                     onChange={handleInputChange}
//                     required
//                   />
//                   <input
//                     type="text"
//                     name="ifsc"
//                     placeholder="IFSC Code"
//                     className="w-full border rounded p-2 mb-2"
//                     value={formData.ifsc}
//                     onChange={handleInputChange}
//                     required
//                   />
//                   <input
//                     type="text"
//                     name="bankName"
//                     placeholder="Bank Name"
//                     className="w-full border rounded p-2 mb-2"
//                     value={formData.bankName}
//                     onChange={handleInputChange}
//                     required
//                   />
//                   <input
//                     type="text"
//                     name="upiId"
//                     placeholder="UPI ID (Optional)"
//                     className="w-full border rounded p-2"
//                     value={formData.upiId}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Supplier Details Tab Content */}
//            {/* Supplier Details Tab Content */}
// {activeTab === 'supplier' && (
//   <div className="mb-6">
//     <h2 className="text-lg font-medium mb-4">Supplier Details</h2>
//     <div className="mb-4">
//       <label className="block text-gray-700 mb-2">Business Name</label>
//       <input
//         type="text"
//         name="businessName"
//         placeholder="Enter business name"
//         className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//         value={formData.businessName}
//         onChange={handleInputChange}
//         required
//       />
//     </div>
    
//     <div className="mb-4">
//       <label className="block text-gray-700 mb-2">Business Type</label>
//       <select
//         name="businessType"
//         value={formData.businessType}
//         onChange={handleInputChange}
//         className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//       >
//         <option value="">Select business type</option>
//         <option value="Proprietorship">Proprietorship</option>
//         <option value="Partnership">Partnership</option>
//         <option value="LLP">LLP</option>
//         <option value="Private Limited">Private Limited</option>
//       </select>
//     </div>
    
//     <div className="mb-4">
//       <label className="block text-gray-700 mb-2">Contact Number</label>
//       <input
//         type="text"
//         name="contactNumber"
//         value={formData.contactNumber}
//         onChange={handleInputChange}
//         className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//         placeholder="Enter contact number"
//         required
//       />
//     </div>
    
//     <div className="mb-6">
//       <label className="block text-gray-700 mb-2">Product Category</label>
//       <select
//         name="productCategory"
//         value={formData.productCategory}
//         onChange={handleInputChange}
//         className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//       >
//         <option value="">Select main product category</option>
//         <option value="Fashion">Fashion</option>
//         <option value="Electronics">Electronics</option>
//         <option value="Home & Kitchen">Home & Kitchen</option>
//         <option value="Beauty & Personal Care">Beauty & Personal Care</option>
//         <option value="Toys & Baby Products">Toys & Baby Products</option>
//       </select>
//     </div>
//   </div>
// )}

//             {/* Button: Continue or Register */}
//             <button 
//               className={`w-full font-medium py-3 px-4 rounded mb-4 ${
//                 activeTab === 'supplier' 
//                   ? 'bg-pink-500 text-white hover:bg-pink-600' 
//                   : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
//               }`}
//               onClick={handleSubmit}
//             >
//               {getButtonText()}
//             </button>

//             {message && <p className="text-green-600 p-2">{message}</p>}
//             {error && <p className="text-red-600 p-2">{error}</p>}
//           </div>
          
//           {/* Right Section - Information */}
//           <div className="w-full md:w-5/12">
//             {/* Info Banner */}
//             <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-start">
//               <div className="bg-purple-100 rounded-full p-2 mr-3">
//                 <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-gray-800">More than 100,000 suppliers are growing their business by selling on Meesho</p>
//               </div>
//             </div>
            
//             {/* FAQ Section */}
//             <div className="bg-white border rounded-lg p-6">
//               <h3 className="text-lg text-gray-500 font-medium mb-6">Frequently Asked Questions</h3>
              
//               {/* FAQ Item 1 */}
//               <div className="border-b pb-4 mb-4">
//                 <div 
//                   className="flex justify-between items-center mb-2 cursor-pointer" 
//                   onClick={() => toggleFaq(1)}
//                 >
//                   <h4 className="text-gray-800 font-medium">Which sellers can sell on Meesho?</h4>
//                   <svg 
//                     className={`w-5 h-5 text-gray-400 transform ${expandedFaqs[1] ? 'rotate-180' : ''} transition-transform`} 
//                     fill="none" 
//                     stroke="currentColor" 
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </div>
//                 {expandedFaqs[1] && (
//                   <div>
//                     <p className="text-gray-700 text-sm mb-2">
//                       Starting October 1st, 2023, sellers (with or without GST registration) can sell on Meesho.
//                     </p>
//                     <p className="text-gray-700 text-sm mb-2">
//                       To start selling, Non-GST sellers must obtain an Enrolment ID/UIN from the GST website (click <a href="#" className="text-blue-600">here</a> to obtain it). Watch the <a href="#" className="text-blue-600">video guide</a>.
//                     </p>
//                     <p className="text-gray-700 text-sm">
//                       Regular GST & Composite GST sellers can register using their GSTIN number. Our partner Vakilsearch can assist in obtaining a GSTIN. Click <a href="#" className="text-blue-600">here</a> to learn more.
//                     </p>
//                   </div>
//                 )}
//               </div>
              
//               {/* FAQ Item 2 */}
//               <div className="border-b pb-4 mb-4">
//                 <div 
//                   className="flex justify-between items-center cursor-pointer"
//                   onClick={() => toggleFaq(2)}
//                 >
//                   <h4 className="text-gray-800 font-medium">How can I obtain GSTIN No or Enrolment ID / UIN?</h4>
//                   <svg 
//                     className={`w-5 h-5 text-gray-400 transform ${expandedFaqs[2] ? 'rotate-90 rotate-180' : 'rotate-90'} transition-transform`} 
//                     fill="none" 
//                     stroke="currentColor" 
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//                   </svg>
//                 </div>
//                 {expandedFaqs[2] && (
//                   <div className="mt-2">
//                     <p className="text-gray-700 text-sm mb-2">
//                       You can obtain a GSTIN by registering on the GST portal (gst.gov.in). The process typically requires business registration documents, PAN details, and address verification.
//                     </p>
//                     <p className="text-gray-700 text-sm">
//                       For Enrolment ID/UIN, you need to register on the GST portal as a composition taxpayer or a small taxpayer with turnover below the GST threshold.
//                     </p>
//                   </div>
//                 )}
//               </div>
              
//               {/* FAQ Item 3 */}
//               <div className="border-b pb-4 mb-4">
//                 <div 
//                   className="flex justify-between items-center cursor-pointer"
//                   onClick={() => toggleFaq(3)}
//                 >
//                   <h4 className="text-gray-800 font-medium">What is the difference between Enrolment ID / UIN and GSTIN?</h4>
//                   <svg 
//                     className={`w-5 h-5 text-gray-400 transform ${expandedFaqs[3] ? 'rotate-90 rotate-180' : 'rotate-90'} transition-transform`} 
//                     fill="none" 
//                     stroke="currentColor" 
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//                   </svg>
//                 </div>
//                 {expandedFaqs[3] && (
//                   <div className="mt-2">
//                     <p className="text-gray-700 text-sm mb-2">
//                       GSTIN (Goods and Services Tax Identification Number) is for businesses with turnover above the GST threshold that must collect and remit GST.
//                     </p>
//                     <p className="text-gray-700 text-sm">
//                       Enrolment ID/UIN (Unique Identification Number) is for businesses below the GST threshold. These sellers don't need to collect GST but can still register on the GST portal for identification purposes.
//                     </p>
//                   </div>
//                 )}
//               </div>
              
//               {/* Help Section */}
//               <div className="mt-6 bg-gray-50 p-4 rounded-lg flex items-start">
//                 <div className="text-purple-600 mr-3">
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-gray-800 font-medium mb-1">Need help with Enrolment ID/UIN creation?</p>
//                   <p className="text-gray-600 text-sm">Call us on: 080 - 61799601</p>
//                 </div>
//                 <div className="ml-auto">
//                   <img src="/api/placeholder/100/70" alt="Meesho Store" className="h-16" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default SupplierRegistration;

// mobile view

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SupplierRegistration = () => {
  const [activeTab, setActiveTab] = useState('tax');
  const [taxOption, setTaxOption] = useState('enrolment');
  const [formData, setFormData] = useState({
    userId: '',
    uinNumber: '',
    gstNumber: '',
    address: '',
    pincode: '',
    city: '',
    bankAccount: '',
    ifsc: '',
    bankName: '',
    upiId: '',
    businessName: '',
    businessType: '',
    contactNumber: '',
    productCategory: ''
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  // State to track expanded FAQ items
  const [expandedFaqs, setExpandedFaqs] = useState({
    1: true, // First FAQ is expanded by default
    2: false,
    3: false,
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setFormData((prevData) => ({
        ...prevData,
        userId: storedUserId
      }));
    } else {
      console.error("No userId found in localStorage");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    // If not on the supplier tab, just go to the next tab
    if (activeTab !== 'supplier') {
      goToNextTab();
      return;
    }

    // Otherwise, submit the form
    try {
      const response = await axios.post("http://localhost:4000/supplier/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMessage(response.data.message);
      console.log("Registration successful:", response.data);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "An error occurred on the server.");
        console.error("Error from server:", err.response.data);
      } else {
        setError("Something went wrong. Please try again later.");
        console.error("Unexpected error:", err);
      }
    }
  };

  // Function to toggle FAQ expansion
  const toggleFaq = (faqId) => {
    setExpandedFaqs(prev => ({
      ...prev,
      [faqId]: !prev[faqId]
    }));
  };

  // Function to go to the next tab
  const goToNextTab = () => {
    const tabOrder = ['tax', 'pickup', 'bank', 'supplier'];
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    }
  };

  // Get button text based on active tab
  const getButtonText = () => {
    return activeTab === 'supplier' ? 'Register' : 'Continue';
  };

  // Render tab icon based on the tab name
  const renderTabIcon = (tabName) => {
    switch (tabName) {
      case 'tax':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
      case 'pickup':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case 'bank':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      case 'supplier':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto py-4 px-4 md:py-6 md:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Section - Forms */}
          <div className="w-full lg:w-7/12 order-2 lg:order-1">
            {/* Tabs - Desktop View */}
            <div className="hidden md:flex border-b mb-6">
              {['tax', 'pickup', 'bank', 'supplier'].map((tab) => (
                <div 
                  key={tab}
                  className={`flex items-center px-4 py-3 cursor-pointer border-b-2 ${
                    activeTab === tab ? 'border-blue-500 text-blue-500' : 'border-transparent'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-2 ${
                    activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}>
                    {renderTabIcon(tab)}
                  </div>
                  <span className="hidden sm:inline">{tab === 'tax' ? 'Tax Details' : 
                                    tab === 'pickup' ? 'Pickup Address' : 
                                    tab === 'bank' ? 'Bank Details' : 'Supplier Details'}</span>
                </div>
              ))}
            </div>

            {/* Tabs - Mobile View */}
            <div className="flex md:hidden overflow-x-auto whitespace-nowrap pb-2 mb-4 scrollbar-hide">
              {['tax', 'pickup', 'bank', 'supplier'].map((tab) => (
                <div 
                  key={tab}
                  className={`flex flex-col items-center px-3 pb-2 cursor-pointer border-b-2 mr-4 ${
                    activeTab === tab ? 'border-blue-500 text-blue-500' : 'border-transparent'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  <div className={`w-8 h-8 mb-1 flex items-center justify-center rounded-full ${
                    activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}>
                    {renderTabIcon(tab)}
                  </div>
                  <span className="text-xs">{tab === 'tax' ? 'Tax' : 
                                   tab === 'pickup' ? 'Address' : 
                                   tab === 'bank' ? 'Bank' : 'Supplier'}</span>
                </div>
              ))}
            </div>

            {/* Current Step Display - Mobile */}
            <div className="md:hidden mb-4">
              <h2 className="text-lg font-medium">
                {activeTab === 'tax' ? 'Tax Details' : 
                 activeTab === 'pickup' ? 'Pickup Address' : 
                 activeTab === 'bank' ? 'Bank Details' : 'Supplier Details'}
              </h2>
            </div>

            {/* Tax Details Tab Content */}
            {activeTab === 'tax' && (
              <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
                <h2 className="text-lg font-medium mb-4 hidden md:block">Choose your tax option</h2>
                
                <div className="mb-4">
                  <label className="flex flex-wrap items-center mb-2">
                    <input
                      type="radio"
                      name="taxOption"
                      className="w-5 h-5 text-blue-500"
                      checked={taxOption === 'enrolment'}
                      onChange={() => setTaxOption('enrolment')}
                    />
                    <span className="ml-2 text-gray-800 font-medium">Enrolment ID / UIN</span>
                    <span className="ml-0 mt-1 md:ml-2 md:mt-0 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">For Non-GST sellers</span>
                    <span className="ml-1 cursor-pointer text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  </label>
                  <p className="text-sm text-gray-600 ml-7 mb-3">Register with Enrolment ID / UIN and sell locally in your registered state without GST.</p>
                  
                  <div className="ml-7">
                    <div className="flex flex-col md:flex-row mb-3">
                      <input
                        type="text"
                        name="uinNumber"
                        placeholder="Enter Enrolment ID / UIN"
                        className="w-full md:w-64 border rounded p-2 mb-2 md:mb-0 md:mr-2"
                        value={formData.uinNumber}
                        onChange={handleInputChange}
                      />
                      <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded">
                        Verify
                      </button>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded mb-3">
                      <p className="text-sm text-gray-700 mb-2">Don't have Enrolment ID / UIN / GST Number?</p>
                      <div className="flex flex-wrap items-center">
                        <a href="#" className="flex items-center text-sm text-red-600 mr-4 mb-1 md:mb-0">
                          <svg className="w-5 h-5 mr-1 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 3C10.8 3 11.5 3.7 11.5 4.5C11.5 5.3 10.8 6 10 6C9.2 6 8.5 5.3 8.5 4.5C8.5 3.7 9.2 3 10 3ZM13 14.5C13 15.3 12.3 16 11.5 16H8.5C7.7 16 7 15.3 7 14.5V12.5C7 11.7 7.7 11 8.5 11H9V8.5C9 7.7 9.7 7 10.5 7H11C11.8 7 12.5 7.7 12.5 8.5V11H13C13.8 11 14.5 11.7 14.5 12.5V14.5H13Z" />
                          </svg>
                          Learn how to get it
                        </a>
                        <a href="#" className="text-sm text-blue-600">Apply for EID</a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="flex flex-wrap items-center mb-2">
                    <input
                      type="radio"
                      name="taxOption"
                      className="w-5 h-5 text-blue-500"
                      checked={taxOption === 'gstin'}
                      onChange={() => setTaxOption('gstin')}
                    />
                    <span className="ml-2 text-gray-800 font-medium">GSTIN number</span>
                    <span className="ml-0 mt-1 md:ml-2 md:mt-0 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">Regular & Composition GST sellers</span>
                  </label>
                  <p className="text-sm text-gray-600 ml-7">for Regular and Composition GST sellers.</p>
                </div>
              </div>
            )}

            {/* Pickup Address Tab Content */}
            {activeTab === 'pickup' && (
              <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
                <h2 className="text-lg font-medium mb-4 hidden md:block">Pickup Address</h2>
                <div className="mb-4">
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="w-full border rounded p-2 mb-3"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="pincode"
                      placeholder="Pincode"
                      className="border rounded p-2"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      className="border rounded p-2"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bank Details Tab Content */}
            {activeTab === 'bank' && (
              <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
                <h2 className="text-lg font-medium mb-4 hidden md:block">Bank Details</h2>
                <div className="mb-4">
                  <input
                    type="text"
                    name="bankAccount"
                    placeholder="Bank Account Number"
                    className="w-full border rounded p-2 mb-3"
                    value={formData.bankAccount}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="ifsc"
                    placeholder="IFSC Code"
                    className="w-full border rounded p-2 mb-3"
                    value={formData.ifsc}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="bankName"
                    placeholder="Bank Name"
                    className="w-full border rounded p-2 mb-3"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="upiId"
                    placeholder="UPI ID (Optional)"
                    className="w-full border rounded p-2"
                    value={formData.upiId}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            {/* Supplier Details Tab Content */}
            {activeTab === 'supplier' && (
              <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
                <h2 className="text-lg font-medium mb-4 hidden md:block">Supplier Details</h2>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm mb-1">Business Name</label>
                  <input
                    type="text"
                    name="businessName"
                    placeholder="Enter business name"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm mb-1">Business Type</label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select business type</option>
                    <option value="Proprietorship">Proprietorship</option>
                    <option value="Partnership">Partnership</option>
                    <option value="LLP">LLP</option>
                    <option value="Private Limited">Private Limited</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm mb-1">Contact Number</label>
                  <input
                    type="text"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter contact number"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm mb-1">Product Category</label>
                  <select
                    name="productCategory"
                    value={formData.productCategory}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select main product category</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                    <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                    <option value="Toys & Baby Products">Toys & Baby Products</option>
                  </select>
                </div>
              </div>
            )}

            {/* Button: Continue or Register */}
            <button 
              className={`w-full font-medium py-3 px-4 rounded mb-4 ${
                activeTab === 'supplier' 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
              onClick={handleSubmit}
            >
              {getButtonText()}
            </button>

            {message && <p className="text-green-600 p-2 text-center">{message}</p>}
            {error && <p className="text-red-600 p-2 text-center">{error}</p>}
          </div>
          
          {/* Right Section - Information */}
          <div className="w-full lg:w-5/12 order-1 lg:order-2">
            {/* Info Banner */}
            <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-start">
              <div className="bg-purple-100 rounded-full p-2 mr-3 flex-shrink-0">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-800 text-sm">More than 100,000 suppliers are growing their business by selling on Meesho</p>
              </div>
            </div>
            
            {/* FAQ Section */}
            <div className="bg-white border rounded-lg p-4 md:p-6 shadow-sm">
              <h3 className="text-lg text-gray-500 font-medium mb-4">Frequently Asked Questions</h3>
              
              {/* FAQ Item 1 */}
              <div className="border-b pb-3 mb-3">
                <div 
                  className="flex justify-between items-center mb-1 cursor-pointer" 
                  onClick={() => toggleFaq(1)}
                >
                  <h4 className="text-gray-800 font-medium text-sm md:text-base">Which sellers can sell on Meesho?</h4>
                  <svg 
                    className={`w-5 h-5 text-gray-400 transform ${expandedFaqs[1] ? 'rotate-180' : ''} transition-transform flex-shrink-0`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {expandedFaqs[1] && (
                  <div>
                    <p className="text-gray-700 text-xs md:text-sm mb-2">
                      Starting October 1st, 2023, sellers (with or without GST registration) can sell on Meesho.
                    </p>
                    <p className="text-gray-700 text-xs md:text-sm mb-2">
                      To start selling, Non-GST sellers must obtain an Enrolment ID/UIN from the GST website (click <a href="#" className="text-blue-600">here</a> to obtain it). Watch the <a href="#" className="text-blue-600">video guide</a>.
                    </p>
                    <p className="text-gray-700 text-xs md:text-sm">
                      Regular GST & Composite GST sellers can register using their GSTIN number. Our partner Vakilsearch can assist in obtaining a GSTIN. Click <a href="#" className="text-blue-600">here</a> to learn more.
                    </p>
                  </div>
                )}
              </div>
              
              {/* FAQ Item 2 */}
              <div className="border-b pb-3 mb-3">
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleFaq(2)}
                >
                  <h4 className="text-gray-800 font-medium text-sm md:text-base">How can I obtain GSTIN No or Enrolment ID / UIN?</h4>
                  <svg 
                    className={`w-5 h-5 text-gray-400 transform ${expandedFaqs[2] ? 'rotate-180' : ''} transition-transform flex-shrink-0`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {expandedFaqs[2] && (
                  <div className="mt-1">
                    <p className="text-gray-700 text-xs md:text-sm mb-2">
                      You can obtain a GSTIN by registering on the GST portal (gst.gov.in). The process typically requires business registration documents, PAN details, and address verification.
                    </p>
                    <p className="text-gray-700 text-xs md:text-sm">
                      For Enrolment ID/UIN, you need to register on the GST portal as a composition taxpayer or a small taxpayer with turnover below the GST threshold.
                    </p>
                  </div>
                )}
              </div>
              
              {/* FAQ Item 3 */}
              <div className="border-b pb-3 mb-3">
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleFaq(3)}
                >
                  <h4 className="text-gray-800 font-medium text-sm md:text-base">What is the difference between Enrolment ID / UIN and GSTIN?</h4>
                  <svg 
                    className={`w-5 h-5 text-gray-400 transform ${expandedFaqs[3] ? 'rotate-180' : ''} transition-transform flex-shrink-0`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {expandedFaqs[3] && (
                  <div className="mt-1">
                    <p className="text-gray-700 text-xs md:text-sm mb-2">
                      GSTIN (Goods and Services Tax Identification Number) is for businesses with turnover above the GST threshold that must collect and remit GST.
                    </p>
                    <p className="text-gray-700 text-xs md:text-sm">
                      Enrolment ID/UIN (Unique Identification Number) is for businesses below the GST threshold. These sellers don't need to collect GST but can still register on the GST portal for identification purposes.
                    </p>
                  </div>
                )}
              </div>
              
              {/* Help Section */}
              <div className="mt-4 bg-gray-50 p-3 md:p-4 rounded-lg flex items-center">
                <div className="text-purple-600 mr-3 flex-shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium text-xs md:text-sm mb-1">Need help with Enrolment ID/UIN creation?</p>
                  <p className="text-gray-600 text-xs md:text-sm">Call us on: 080 - 61799601</p>
                </div>
                <div className="ml-auto">
                  <img src="/api/placeholder/100/70" alt="Mystore Store" className="h-12 md:h-16" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupplierRegistration;