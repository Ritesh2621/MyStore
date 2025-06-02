// import React from 'react';

// const CategorySlider = () => {
//   return (
//     <div className="relative w-full h-full bg-white overflow-hidden p-6 rounded-lg">

//       {/* Background decorative circles - kept but opacity reduced */}
//       <div className="absolute top-0 left-0 w-20 h-20 rounded-full bg-pink-400 opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
//       <div className="absolute top-0 right-1/3 w-32 h-32 rounded-full bg-blue-600 opacity-20"></div>
//       <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-orange-400 opacity-20 translate-x-1/3 translate-y-1/3"></div>

//       {/* Background decorative circles */}
//       <div className="absolute top-0 left-0 w-20 h-20 rounded-full bg-pink-400 opacity-80 -translate-x-1/2 -translate-y-1/2"></div>
//       <div className="absolute top-0 right-1/3 w-32 h-32 rounded-full bg-blue-600 opacity-80"></div>
//       <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-orange-400 opacity-80 translate-x-1/3 translate-y-1/3"></div>


//       <div className="flex flex-col md:flex-row justify-between items-center relative z-10">
//         {/* Left side content */}
//         <div className="md:w-1/2 mb-8 md:mb-0">
//           <div className="text-xl font-bold text-blue-600 mb-2">MYSTORE</div>

//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 mb-4">
//             <span className="block">Lowest Prices</span>
//             <span className="block">Best Quality Shopping</span>
//           </h1>

//           <div className="flex flex-col sm:flex-row gap-6 my-8">
//             <div className="flex items-center">
//               <div className="mr-3">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//               </div>
//               <span className="text-yellow-400 font-bold">Cash on delivery</span>
//             </div>

//             <div className="flex items-center">
//               <div className="mr-3">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                 </svg>
//               </div>
//               <span className="text-yellow-400 font-bold">Easy Returns</span>
//             </div>
//           </div>

//           <button className="bg-blue-600 text-white font-bold py-4 px-12 rounded-full text-xl hover:bg-blue-700 transition duration-300">
//             Shop now
//           </button>
//         </div>

//         {/* Right side content with phone mockup */}
//         <div className="md:w-1/2 relative">
//           <div className="relative">
//             {/* Phone device frame */}
//             <div className="w-64 h-auto mx-auto relative z-10">
//               <svg viewBox="0 0 260 530" className="w-full h-auto">
//                 <rect x="10" y="10" width="240" height="510" rx="30" fill="black" />
//                 <rect x="15" y="15" width="230" height="500" rx="26" fill="white" />
//                 <path d="M110,25 h40 a5,5 0 0 1 0,10 h-40 a5,5 0 0 1 0,-10 z" fill="black" />
//               </svg>

//               {/* App content inside phone */}
//               <div className="absolute top-12 left-0 right-0 bottom-8 overflow-hidden flex flex-col px-4">
//                 {/* Store icon with awning */}
//                 <div className="w-full bg-white rounded-t-lg flex justify-center py-2">
//                   <div className="relative w-20 h-6">

//                     <div className="w-full h-1 bg-blue-400"></div>
//                     <div className="absolute top-1 left-0 right-0 h-5 flex justify-between">
//                       <div className="w-4 h-5 bg-blue-400 rounded-b-sm"></div>
//                       <div className="w-4 h-5 bg-blue-400 rounded-b-sm"></div>
//                       <div className="w-4 h-5 bg-blue-400 rounded-b-sm"></div>
//                       <div className="w-4 h-5 bg-blue-400 rounded-b-sm"></div>

//                       <div className="w-full h-1 bg-pink-400"></div>
//                       <div className="absolute top-1 left-0 right-0 h-5 flex justify-between">
//                         <div className="w-4 h-5 bg-pink-400 rounded-b-sm"></div>
//                         <div className="w-4 h-5 bg-pink-400 rounded-b-sm"></div>
//                         <div className="w-4 h-5 bg-pink-400 rounded-b-sm"></div>
//                         <div className="w-4 h-5 bg-pink-400 rounded-b-sm"></div>

//                       </div>
//                     </div>
//                   </div>

//                   {/* Product listings */}
//                   <div className="flex-1 bg-white py-2">
//                     <div className="flex mb-3">

//                       <div className="w-1/4 bg-blue-400 h-12 rounded"></div>

//                       <div className="w-1/4 bg-pink-400 h-12 rounded"></div>

//                       <div className="w-3/4 pl-2">
//                         <div className="h-4 bg-purple-500 w-full mb-2 rounded"></div>
//                         <div className="h-4 bg-purple-400 w-3/4 rounded"></div>
//                       </div>
//                     </div>

//                     <div className="flex mb-3">

//                       <div className="w-1/4 bg-blue-400 h-12 rounded"></div>

//                       <div className="w-1/4 bg-pink-400 h-12 rounded"></div>

//                       <div className="w-3/4 pl-2">
//                         <div className="h-4 bg-purple-500 w-full mb-2 rounded"></div>
//                         <div className="h-4 bg-purple-400 w-3/4 rounded"></div>
//                       </div>
//                     </div>

//                     <div className="flex mb-3">

//                       <div className="w-1/4 bg-blue-400 h-12 rounded"></div>

//                       <div className="w-1/4 bg-pink-400 h-12 rounded"></div>

//                       <div className="w-3/4 pl-2">
//                         <div className="h-4 bg-purple-500 w-full mb-2 rounded"></div>
//                         <div className="h-4 bg-purple-400 w-3/4 rounded"></div>
//                       </div>
//                     </div>

//                     <div className="h-8 bg-teal-300 w-full mt-4 rounded"></div>
//                   </div>

//                   {/* Credit card at bottom */}
//                   <div className="h-12 w-36 mx-auto mt-2 bg-yellow-300 rounded-lg relative transform -rotate-6">
//                     <div className="h-2 w-24 bg-gray-400 absolute top-3 left-2 rounded"></div>
//                     <div className="h-2 w-6 bg-gray-600 absolute bottom-3 left-2 rounded"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Discount tags */}
//             <div className="absolute top-0 right-0 text-blue-600 font-black transform rotate-6">
//               <div className="text-2xl md:text-3xl">UP TO</div>
//               <div className="text-4xl md:text-5xl">80% off</div>
//             </div>

//             <div className="absolute bottom-10 right-0 text-blue-600 font-black transform rotate-6">
//               <div className="text-xl md:text-2xl">UP TO</div>
//               <div className="text-3xl md:text-4xl">25% off</div>
//             </div>

//             {/* Sale badge */}
//             <div className="absolute top-1/3 right-0 transform rotate-12">
//               <div className="bg-yellow-400 text-blue-800 font-bold p-2 rounded-full flex items-center justify-center w-16 h-16">
//                 <div className="text-center">
//                   <div className="text-xs">BIG</div>
//                   <div className="text-xs">SAVING</div>
//                   <div className="text-xs">DAYS</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default CategorySlider;

// // Mobile view code 


import React from 'react';

const CategorySlider = () => {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-white overflow-hidden p-4 sm:p-6 lg:p-8 rounded-2xl shadow-2xl">

      {/* Enhanced background decorative elements - responsive sizing */}
      <div className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 opacity-10 -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute top-1/4 right-0 w-20 h-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 opacity-15 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-1/4 w-18 h-18 sm:w-28 sm:h-28 lg:w-36 lg:h-36 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 opacity-12 translate-y-1/3"></div>
      <div className="absolute bottom-1/4 right-1/4 w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 opacity-8"></div>

      {/* Floating geometric shapes - responsive */}
      <div className="absolute top-1/3 left-1/4 w-4 h-4 sm:w-6 sm:h-6 bg-blue-400 rotate-45 opacity-20 animate-bounce"></div>
      <div className="absolute top-2/3 right-1/3 w-3 h-3 sm:w-4 sm:h-4 bg-blue-600 rotate-12 opacity-25"></div>
      <div className="absolute bottom-1/3 left-1/3 w-5 h-5 sm:w-8 sm:h-8 bg-blue-300 rounded-full opacity-15 animate-pulse"></div>

      {/* Main content container - responsive layout */}
      <div className="flex flex-col justify-center items-center text-center relative z-10 gap-4 sm:gap-6 lg:gap-8 h-full py-6 sm:py-8">

        {/* Brand logo with enhanced styling - responsive */}
        <div className="mb-2 sm:mb-4">
          <div className="text-xl sm:text-2xl lg:text-3xl font-black text-blue-700 mb-1 sm:mb-2 tracking-wider">
            MYSTORE
          </div>
          <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Main headline with enhanced typography - mobile optimized */}
        <div className="space-y-1 sm:space-y-2 px-2">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 leading-tight">
            Lowest Prices
          </h1>
          <h2 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-700 leading-tight">
            Best Quality Shopping
          </h2>
        </div>

        {/* Enhanced features - mobile stacked, desktop inline */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 lg:gap-6 my-4 sm:my-6 lg:my-8 w-full max-w-2xl">
          <div className="flex items-center justify-center bg-white/70 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg border border-blue-100">
            <svg className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 mr-2 sm:mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-blue-700 font-bold text-sm sm:text-base lg:text-lg">Cash on Delivery</span>
          </div>

          <div className="flex items-center justify-center bg-white/70 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg border border-blue-100">
            <svg className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 mr-2 sm:mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="text-blue-700 font-bold text-sm sm:text-base lg:text-lg">Easy Returns</span>
          </div>
        </div>

        {/* Discount badges - responsive grid */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8 max-w-4xl">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl transform rotate-3 shadow-xl">
            <div className="text-center">
              <div className="text-xs sm:text-sm font-semibold opacity-90">UP TO</div>
              <div className="text-lg sm:text-2xl lg:text-3xl font-black">80% OFF</div>
            </div>
          </div>
          
          <div className="bg-white text-blue-700 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl transform -rotate-2 shadow-xl border-2 border-blue-200">
            <div className="text-center">
              <div className="text-xs sm:text-sm font-semibold">UP TO</div>
              <div className="text-lg sm:text-2xl lg:text-3xl font-black">25% OFF</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-2 lg:py-3 rounded-full transform rotate-1 shadow-xl">
            <div className="text-center">
              <div className="text-xs font-bold">BIG SAVING</div>
              <div className="text-sm sm:text-base lg:text-lg font-black">DAYS</div>
            </div>
          </div>
        </div>

        {/* Enhanced CTA button - responsive sizing */}
        <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-3 px-8 sm:py-3 sm:px-10 lg:py-4 lg:px-12 rounded-full text-base sm:text-lg lg:text-xl hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 shadow-xl border-2 border-white/20 max-w-fit">
          <span className="flex items-center justify-center">
            Shop Now
            <svg className="ml-2 h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>

        {/* Additional trust indicators - responsive layout */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-4 mt-4 sm:mt-6 opacity-70 max-w-2xl">
          <div className="flex items-center justify-center text-blue-600">
            <svg className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs sm:text-sm font-semibold">Secure Payment</span>
          </div>
          
          <div className="flex items-center justify-center text-blue-600">
            <svg className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            <span className="text-xs sm:text-sm font-semibold">Fast Delivery</span>
          </div>
          
          <div className="flex items-center justify-center text-blue-600">
            <svg className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            <span className="text-xs sm:text-sm font-semibold">24/7 Support</span>
          </div>
        </div>
      </div>

      {/* Desktop-specific additional elements */}
      <div className="hidden lg:block">
        {/* Corner decorative elements for desktop */}
        <div className="absolute top-4 right-4 w-8 h-8 border-2 border-blue-300 rotate-45 opacity-30"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 border-2 border-blue-400 rounded-full opacity-25"></div>
      </div>

      {/* Mobile-specific optimizations */}
      <div className="block sm:hidden">
        {/* Mobile-only subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/2 w-32 h-32 border border-blue-300 rounded-full transform -translate-x-1/2"></div>
          <div className="absolute bottom-1/4 left-1/2 w-24 h-24 border border-blue-400 rounded-full transform -translate-x-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;


