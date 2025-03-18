import React, { useState, useEffect } from 'react';
import Img1 from "../assets/Img1.jpg"

const BannerSlider = ({ title, banners = [] }) => {
  // Default to empty array if banners is undefined
  const slides = Array.isArray(banners) ? banners : [];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Only set up interval if we have slides
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [slides.length]); // Use slides.length as dependency

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // If no slides, return a placeholder
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
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((banner, index) => (
            <div key={banner.key || index} className="min-w-full">
              {banner}
            </div>
          ))}
        </div>

        {/* Slider controls - only show if we have multiple slides */}
        {slides.length > 1 && (
          <>
            <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrow controls */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow-md"
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow-md"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
};



// Enhanced Banner template with SVG illustrations
const createBanner = ({ 
  storeName, 
  heading, 
  discountTag, 
  bgColor = "bg-blue-100", 
  accentColor = "bg-pink-400", 
  secondaryColor = "bg-blue-600",
  illustration, // SVG illustration component
  rightImage = null,  // URL for right image
  buttonText = "Shop now" 
}) => {
  return (
    <div className={`relative w-[1250px] mx-auto  h-96 ${bgColor} overflow-hidden p-6 rounded-lg`} key={storeName}>
    <div className="flex justify-between items-center relative z-10 h-full mx-8">
      {/* Left side content - moved away from extreme left */}
      <div className="w-[370px]  flex flex-col items-center px-4">
        <div className="text-lg font-bold text-blue-600 mb-2">{storeName}</div>
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          {heading.split(' ').map((word, idx) => (
            <span key={idx} className="block">{word}</span>
          ))}
        </h1>
        <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition duration-300 mt-2">
          {buttonText}
        </button>
      </div>

      {/* Middle image section with illustration - slightly larger */}
      <div className="w-1/3 flex justify-center items-center h-full">
          {illustration && (
            <div className="relative h-4/5 w-4/5 overflow-hidden rounded-lg shadow-lg">
              <img 
                src={illustration} 
                alt="Product illustration" 
                className="w-full h-full object-cover" 
              />
            </div>
          )}
        </div>

      {/* Right side content with image - moved away from extreme right */}
      <div className="w-1/3 relative flex flex-col items-center px-4">
        <div className="text-blue-600 font-black mb-4 text-center">
          <div className="text-xl">UP TO</div>
          <div className="text-4xl">{discountTag}</div>
        </div>

        {rightImage && (
          <div className="h-3/4 w-4/5 overflow-hidden rounded-lg shadow-lg relative">
            <img 
              src={rightImage} 
              alt="Featured product" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute top-4 right-4">
              <div className="bg-yellow-400 text-blue-800 font-bold p-2 rounded-full flex items-center justify-center w-14 h-14">
                <div className="text-center">
                  <div className="text-xs">BIG</div>
                  <div className="text-xs">SALE</div>
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
  // Sample image URLs for right side
  const sampleImages = {
    techRight: "https://t4.ftcdn.net/jpg/03/40/36/85/360_F_340368527_JJ9AmM3oCHodZbKDW9QFhgj96nOcafsj.jpg", 
    fashionRight: "https://t4.ftcdn.net/jpg/03/40/36/85/360_F_340368527_JJ9AmM3oCHodZbKDW9QFhgj96nOcafsj.jpg", 
    homeRight: "https://t4.ftcdn.net/jpg/03/40/36/85/360_F_340368527_JJ9AmM3oCHodZbKDW9QFhgj96nOcafsj.jpg", 
    electronicsRight: "https://t4.ftcdn.net/jpg/03/40/36/85/360_F_340368527_JJ9AmM3oCHodZbKDW9QFhgj96nOcafsj.jpg", 
    apparelRight: "https://t4.ftcdn.net/jpg/03/40/36/85/360_F_340368527_JJ9AmM3oCHodZbKDW9QFhgj96nOcafsj.jpg", 
    cookwareRight: "https://t4.ftcdn.net/jpg/03/40/36/85/360_F_340368527_JJ9AmM3oCHodZbKDW9QFhgj96nOcafsj.jpg", 
    giftsRight: "https://t4.ftcdn.net/jpg/03/40/36/85/360_F_340368527_JJ9AmM3oCHodZbKDW9QFhgj96nOcafsj.jpg", 
    luxuryRight: "https://t4.ftcdn.net/jpg/03/40/36/85/360_F_340368527_JJ9AmM3oCHodZbKDW9QFhgj96nOcafsj.jpg", 
    holidayRight: "https://t4.ftcdn.net/jpg/03/40/36/85/360_F_340368527_JJ9AmM3oCHodZbKDW9QFhgj96nOcafsj.jpg", 
  };

  const topProductsBanners = [
    createBanner({
      storeName: "GADGETS GALORE",
      heading: "Top Tech Picks for 2025",
      discountTag: "70% off",
      bgColor: "bg-white",
      illustration: Img1,
      rightImage: sampleImages.techRight
    }),
    createBanner({
      storeName: "STYLE ICON",
      heading: "Premium Fashion Trends",
      discountTag: "60% off",
      bgColor: "bg-gray-100",
      illustration: Img1,
      rightImage: sampleImages.fashionRight
    }),
    createBanner({
      storeName: "HOME ESSENTIALS",
      heading: "Upgrade Your Living Space",
      discountTag: "50% off",
      bgColor: "bg-blue-50",
      illustration: Img1,
      rightImage: sampleImages.homeRight
    })
  ];

  const discountBanners = [
    createBanner({
      storeName: "ELECTRODEALS",
      heading: "Mega Discounts on Electronics",
      discountTag: "80% off",
      bgColor: "bg-red-50",
      illustration: Img1,
      rightImage: sampleImages.electronicsRight
    }),
    createBanner({
      storeName: "FASHION RUSH",
      heading: "Flash Sale on Apparel",
      discountTag: "Buy 1 Get 1",
      bgColor: "bg-yellow-50",
      illustration: Img1,
      rightImage: sampleImages.apparelRight
    }),
    createBanner({
      storeName: "KITCHEN CRAFT",
      heading: "Best Deals on Cookware",
      discountTag: "65% off",
      bgColor: "bg-green-50",
      illustration: Img1,
      rightImage: sampleImages.cookwareRight
    })
  ];

  const amazingOffersBanners = [
    createBanner({
      storeName: "GIFT PARADISE",
      heading: "Exclusive Gifts for Loved Ones",
      discountTag: "40% off",
      bgColor: "bg-purple-50",
      illustration: Img1,
      rightImage: sampleImages.giftsRight
    }),
    createBanner({
      storeName: "LUXE LIFE",
      heading: "Luxury Products at Special Prices",
      discountTag: "₹999 only",
      bgColor: "bg-indigo-50",
      illustration: Img1,
      rightImage: sampleImages.luxuryRight
    }),
    createBanner({
      storeName: "SEASON SALE",
      heading: "Holiday Essentials at Great Prices",
      discountTag: "45% off",
      bgColor: "bg-pink-50",
      illustration: Img1,
      rightImage: sampleImages.holidayRight
    })
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <BannerSlider title="Top Products" banners={topProductsBanners} />
      <BannerSlider title="Discount Deals" banners={discountBanners} />
      <BannerSlider title="Amazing Offers" banners={amazingOffersBanners} />
    </div>
  );
};

export default EcommerceBannerSliders;