// import React, { useState, useEffect } from 'react';
// import { useLocation } from "react-router-dom";
// import Img1 from "../assets/Img1.jpg"
// // import Img2 from "../assets/Img2.jpg"
// import Img3 from "../assets/Img3.jpg"
// import Img7 from "../assets/Img7.jpg"

// const BannerSlider = ({ title, banners = [], isFiltered }) => {
//   const location = useLocation(); // Get the current route
//   const isHomepage = location.pathname === "/"; // Check if it's the homepage

//   // Check if filtering is applied based on the location state
//   const isFilterApplied = location.state && location.state.subsubcategory !== null && location.state.subsubcategory !== undefined;

//   // Default to empty array if banners is undefined
//   const slides = Array.isArray(banners) ? banners : [];
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     // Only set up interval if we have slides
//     if (slides.length > 0) {
//       const interval = setInterval(() => {
//         setCurrentSlide((prev) => (prev + 1) % slides.length);
//       }, 5000);
//       return () => clearInterval(interval);
//     }
//   }, [slides.length]); // Use slides.length as dependency

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };

//   if (!isHomepage || isFiltered || isFilterApplied) {
//     return null; // Hide the banner on non-homepage routes or when filtered
//   }

//   // If no slides, return a placeholder
//   if (slides.length === 0) {
//     return (
//       <div className="mb-16">
//         <h2 className="text-3xl font-bold text-blue-700 mb-6">{title}</h2>
//         <div className="bg-gray-100 rounded-xl p-8 text-center">
//           <p>No banners available</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="mb-16">
//       <h2 className="text-3xl font-bold text-blue-700 mb-6">{title}</h2>

//       <div className="relative overflow-hidden rounded-xl shadow-lg">
//         <div
//           className="flex transition-transform duration-500 ease-in-out"
//           style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//         >
//           {slides.map((banner, index) => (
//             <div key={banner.key || index} className="min-w-full">
//               {banner}
//             </div>
//           ))}
//         </div>

//         {/* Slider controls - only show if we have multiple slides */}
//         {slides.length > 1 && (
//           <>
//             <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-2">
//               {slides.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => goToSlide(index)}
//                   className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'}`}
//                   aria-label={`Go to slide ${index + 1}`}
//                 />
//               ))}
//             </div>

//             {/* Arrow controls */}
//             <button
//               className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow-md"
//               onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>
//             <button
//               className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow-md"
//               onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// // Enhanced Banner template with SVG illustrations
// const createBanner = ({
//   storeName,
//   heading,
//   discountTag,
//   bgColor = "bg-blue-100",
//   accentColor = "bg-pink-400",
//   secondaryColor = "bg-blue-600",
//   illustration, // SVG illustration component
//   rightImage = null,  // URL for right image
//   buttonText = "Shop now"
// }) => {
//   return (
//     <div className={`relative w-[1250px] mx-auto h-96 ${bgColor} overflow-hidden p-6 rounded-lg`} key={storeName}>
//       <div className="flex justify-between items-center relative z-10 h-full mx-8">
//         {/* Left side content - moved away from extreme left */}
//         <div className="w-[370px]  flex flex-col items-center px-4">
//           <div className="text-lg font-bold text-blue-600 mb-2">{storeName}</div>
//           <h1 className="text-4xl font-bold text-blue-600 mb-4">
//             {heading.split(' ').map((word, idx) => (
//               <span key={idx} className="block">{word}</span>
//             ))}
//           </h1>
//           <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition duration-300 mt-2">
//             {buttonText}
//           </button>
//         </div>

//         {/* Middle image section with illustration - slightly larger */}
//         <div className="w-1/3 flex justify-center items-center h-full">
//           {illustration && (
//             <div className="relative h-4/5 w-4/5 overflow-hidden rounded-lg shadow-lg">
//               <img
//                 src={illustration}
//                 alt="Product illustration"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           )}
//         </div>

//         {/* Right side content with image - moved away from extreme right */}
//         <div className="w-1/3 relative flex flex-col items-center px-4">
//           <div className="text-blue-600 font-black mb-4 text-center">
//             <div className="text-xl">UP TO</div>
//             <div className="text-4xl">{discountTag}</div>
//           </div>

//           {rightImage && (
//             <div className="h-3/4 w-4/5 overflow-hidden rounded-lg shadow-lg relative">
//               <img
//                 src={rightImage}
//                 alt="Featured product"
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute top-4 right-4">
//                 <div className="bg-yellow-400 text-blue-800 font-bold p-2 rounded-full flex items-center justify-center w-14 h-14">
//                   <div className="text-center">
//                     <div className="text-xs">BIG</div>
//                     <div className="text-xs">SALE</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const EcommerceBannerSliders = () => {
//   // Sample image URLs for right side
//   const sampleImages = {
//     techRight: "https://t4.ftcdn.net/jpg/03/40/36/85/360_F_340368527_JJ9AmM3oCHodZbKDW9QFhgj96nOcafsj.jpg",
//     fashionRight: "https://t4.ftcdn.net/jpg/03/40/36/85/360_F_340368527_JJ9AmM3oCHodZbKDW9QFhgj96nOcafsj.jpg",
//     homeRight: "https://t4.ftcdn.net/jpg/03/40/36/85/360_F_340368527_JJ9AmM3oCHodZbKDW9QFhgj96nOcafsj.jpg",
//     electronicsRight: "https://t4.ftcdn.net/jpg/03/40/36/85/360_F_340368527_JJ9AmM3oCHodZbKDW9QFhgj96nOcafsj.jpg",
//     apparelRight: "https://t4.ftcdn.net/jpg/03/40/36/85/360_F_340368527_JJ9AmM3oCHodZbKDW9QFhgj96nOcafsj.jpg",
//     cookwareRight: "https://t4.ftcdn.net/jpg/03/40/36/85/360_F_340368527_JJ9AmM3oCHodZbKDW9QFhgj96nOcafsj.jpg",
//     giftsRight: "https://t4.ftcdn.net/jpg/03/40/36/85/360_F_340368527_JJ9AmM3oCHodZbKDW9QFhgj96nOcafsj.jpg",
//     luxuryRight: "https://t4.ftcdn.net/jpg/03/40/36/85/360_F_340368527_JJ9AmM3oCHodZbKDW9QFhgj96nOcafsj.jpg",
//     holidayRight: "https://t4.ftcdn.net/jpg/03/40/36/85/360_F_340368527_JJ9AmM3oCHodZbKDW9QFhgj96nOcafsj.jpg",
//   };

//   // Create one banner from each category for the merged slider
//   const mergedBanners = [
//     // Top Product Banner
//     createBanner({
//       storeName: "TOP PRODUCTS",
//       heading: "Top Tech Picks for 2025",
//       discountTag: "70% off",
//       bgColor: "bg-white",
//       illustration: Img1,
//       rightImage: sampleImages.techRight
//     }),
//     // Top Discount Banner
//     createBanner({
//       storeName: "TOP DISCOUNTS",
//       heading: "Mega Discounts on Electronics",
//       discountTag: "80% off",
//       bgColor: "bg-red-50",
//       illustration: Img7,
//       rightImage: sampleImages.electronicsRight
//     }),
//     // Amazing Offers Banner
//     createBanner({
//       storeName: "AMAZING OFFERS",
//       heading: "Exclusive Gifts for Loved Ones",
//       discountTag: "40% off",
//       bgColor: "bg-purple-50",
//       illustration: Img3,
//       rightImage: sampleImages.giftsRight
//     })
//   ];

//   return (
//     <div>
//       <div className="flex justify-center items-center mx-auto px-4 py-8">
//         <div className="w-full max-w-7xl">
//           <BannerSlider title="Featured Collections" banners={mergedBanners} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EcommerceBannerSliders;

// based on mobile view code 


import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Img1 from "../assets/Img1.jpg"
// import Img3 from "../assets/Img3.jpg"
import Img7 from "../assets/Img7.jpg"

const BannerSlider = ({ title, banners = [], isFiltered }) => {
  const location = useLocation();
  const isHomepage = location.pathname === "/";
  const isFilterApplied = location.state?.subsubcategory !== null && location.state?.subsubcategory !== undefined;

  const slides = Array.isArray(banners) ? banners : [];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [slides.length]);

  const goToSlide = (index) => setCurrentSlide(index);

  if (!isHomepage || isFiltered || isFilterApplied) return null;

  if (slides.length === 0) {
    return (
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">{title}</h2>
        <div className="bg-gray-100 rounded-xl p-8 text-center">
          <p>No banners available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">{title}</h2>
      <div className="relative overflow-hidden rounded-xl shadow-lg">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((banner, index) => (
            <div key={index} className="min-w-full">
              {banner}
            </div>
          ))}
        </div>

        {slides.length > 1 && (
          <>
            <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                />
              ))}
            </div>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow-md"
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            >
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow-md"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            >
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const createBanner = ({
  storeName,
  heading,
  discountTag,
  bgColor = "bg-blue-100",
  illustration,
  rightImage,
  buttonText = "Shop now"
}) => {
  return (
    <div className={`relative w-full max-w-screen-xl mx-auto h-auto md:h-96 ${bgColor} overflow-hidden p-4 md:p-6 rounded-lg`} key={storeName}>
      <div className="flex flex-col md:flex-row justify-between items-center h-full gap-4">
        {/* Left */}
        <div className="w-full md:w-1/3 flex flex-col items-center text-center md:text-left">
          <div className="text-lg font-bold text-blue-600 mb-2">{storeName}</div>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
            {heading.split(' ').map((word, idx) => (
              <span key={idx} className="block">{word}</span>
            ))}
          </h1>
          <button className="bg-blue-600 text-white font-bold py-2 px-6 md:px-8 rounded-full hover:bg-blue-700 transition duration-300">
            {buttonText}
          </button>
        </div>

        {/* Middle */}
        <div className="w-full md:w-1/3 flex justify-center items-center h-40 md:h-4/5">
          {illustration && (
            <img src={illustration} alt="Product illustration" className="w-full h-full object-cover rounded-lg shadow-lg" />
          )}
        </div>

        {/* Right */}
        <div className="w-full md:w-1/3 flex flex-col items-center text-center md:text-right">
          <div className="text-blue-600 font-black mb-2">
            <div className="text-xl">UP TO</div>
            <div className="text-3xl md:text-4xl">{discountTag}</div>
          </div>
          {rightImage && (
            <div className="relative h-40 md:h-3/4 w-4/5 overflow-hidden rounded-lg shadow-lg mt-2">
              <img src={rightImage} alt="Featured" className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2">
                <div className="bg-yellow-400 text-blue-800 font-bold p-2 rounded-full w-12 h-12 flex items-center justify-center">
                  <div className="text-xs leading-tight text-center">
                    BIG<br />SALE
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EcommerceBannerSliders = () => {
  const sampleImages = {
    techRight: "https://t4.ftcdn.net/jpg/03/40/36/85/360_F_340368527_JJ9AmM3oCHodZbKDW9QFhgj96nOcafsj.jpg",
    electronicsRight: "https://t4.ftcdn.net/jpg/03/40/36/85/360_F_340368527_JJ9AmM3oCHodZbKDW9QFhgj96nOcafsj.jpg",
  };

  const mergedBanners = [
    createBanner({
      storeName: "TOP PRODUCTS",
      heading: "Top Tech Picks for 2025",
      discountTag: "70% off",
      bgColor: "bg-white",
      illustration: Img1,
      rightImage: sampleImages.techRight
    }),
    createBanner({
      storeName: "TOP DISCOUNTS",
      heading: "Mega Discounts on Electronics",
      discountTag: "80% off",
      bgColor: "bg-red-50",
      illustration: Img7,
      rightImage: sampleImages.electronicsRight
    }),
  ];

  return (
    <BannerSlider title="Featured Deals" banners={mergedBanners} />
  );
};

export default EcommerceBannerSliders;
