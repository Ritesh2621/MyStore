import React from 'react';

const CategorySlider = () => {
  return (
    <div className="relative w-full h-full bg-white overflow-hidden p-6 rounded-lg">
<<<<<<< HEAD
      {/* Background decorative circles - kept but opacity reduced */}
      <div className="absolute top-0 left-0 w-20 h-20 rounded-full bg-pink-400 opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-0 right-1/3 w-32 h-32 rounded-full bg-blue-600 opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-orange-400 opacity-20 translate-x-1/3 translate-y-1/3"></div>
=======
      {/* Background decorative circles */}
      <div className="absolute top-0 left-0 w-20 h-20 rounded-full bg-pink-400 opacity-80 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-0 right-1/3 w-32 h-32 rounded-full bg-blue-600 opacity-80"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-orange-400 opacity-80 translate-x-1/3 translate-y-1/3"></div>
>>>>>>> 7ea62d898d3e0e768f7cc3be729e3316ee0f912c
      
      <div className="flex flex-col md:flex-row justify-between items-center relative z-10">
        {/* Left side content */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <div className="text-xl font-bold text-blue-600 mb-2">MYSTORE</div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 mb-4">
            <span className="block">Lowest Prices</span>
            <span className="block">Best Quality Shopping</span>
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-6 my-8">
            <div className="flex items-center">
              <div className="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-yellow-400 font-bold">Cash on delivery</span>
            </div>
            
            <div className="flex items-center">
              <div className="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span className="text-yellow-400 font-bold">Easy Returns</span>
            </div>
          </div>
          
          <button className="bg-blue-600 text-white font-bold py-4 px-12 rounded-full text-xl hover:bg-blue-700 transition duration-300">
            Shop now
          </button>
        </div>
        
        {/* Right side content with phone mockup */}
        <div className="md:w-1/2 relative">
          <div className="relative">
            {/* Phone device frame */}
            <div className="w-64 h-auto mx-auto relative z-10">
              <svg viewBox="0 0 260 530" className="w-full h-auto">
                <rect x="10" y="10" width="240" height="510" rx="30" fill="black" />
                <rect x="15" y="15" width="230" height="500" rx="26" fill="white" />
                <path d="M110,25 h40 a5,5 0 0 1 0,10 h-40 a5,5 0 0 1 0,-10 z" fill="black" />
              </svg>
              
              {/* App content inside phone */}
              <div className="absolute top-12 left-0 right-0 bottom-8 overflow-hidden flex flex-col px-4">
                {/* Store icon with awning */}
                <div className="w-full bg-white rounded-t-lg flex justify-center py-2">
                  <div className="relative w-20 h-6">
<<<<<<< HEAD
                    <div className="w-full h-1 bg-blue-400"></div>
                    <div className="absolute top-1 left-0 right-0 h-5 flex justify-between">
                      <div className="w-4 h-5 bg-blue-400 rounded-b-sm"></div>
                      <div className="w-4 h-5 bg-blue-400 rounded-b-sm"></div>
                      <div className="w-4 h-5 bg-blue-400 rounded-b-sm"></div>
                      <div className="w-4 h-5 bg-blue-400 rounded-b-sm"></div>
=======
                    <div className="w-full h-1 bg-pink-400"></div>
                    <div className="absolute top-1 left-0 right-0 h-5 flex justify-between">
                      <div className="w-4 h-5 bg-pink-400 rounded-b-sm"></div>
                      <div className="w-4 h-5 bg-pink-400 rounded-b-sm"></div>
                      <div className="w-4 h-5 bg-pink-400 rounded-b-sm"></div>
                      <div className="w-4 h-5 bg-pink-400 rounded-b-sm"></div>
>>>>>>> 7ea62d898d3e0e768f7cc3be729e3316ee0f912c
                    </div>
                  </div>
                </div>
                
                {/* Product listings */}
                <div className="flex-1 bg-white py-2">
                  <div className="flex mb-3">
<<<<<<< HEAD
                    <div className="w-1/4 bg-blue-400 h-12 rounded"></div>
=======
                    <div className="w-1/4 bg-pink-400 h-12 rounded"></div>
>>>>>>> 7ea62d898d3e0e768f7cc3be729e3316ee0f912c
                    <div className="w-3/4 pl-2">
                      <div className="h-4 bg-purple-500 w-full mb-2 rounded"></div>
                      <div className="h-4 bg-purple-400 w-3/4 rounded"></div>
                    </div>
                  </div>
                  
                  <div className="flex mb-3">
<<<<<<< HEAD
                    <div className="w-1/4 bg-blue-400 h-12 rounded"></div>
=======
                    <div className="w-1/4 bg-pink-400 h-12 rounded"></div>
>>>>>>> 7ea62d898d3e0e768f7cc3be729e3316ee0f912c
                    <div className="w-3/4 pl-2">
                      <div className="h-4 bg-purple-500 w-full mb-2 rounded"></div>
                      <div className="h-4 bg-purple-400 w-3/4 rounded"></div>
                    </div>
                  </div>
                  
                  <div className="flex mb-3">
<<<<<<< HEAD
                    <div className="w-1/4 bg-blue-400 h-12 rounded"></div>
=======
                    <div className="w-1/4 bg-pink-400 h-12 rounded"></div>
>>>>>>> 7ea62d898d3e0e768f7cc3be729e3316ee0f912c
                    <div className="w-3/4 pl-2">
                      <div className="h-4 bg-purple-500 w-full mb-2 rounded"></div>
                      <div className="h-4 bg-purple-400 w-3/4 rounded"></div>
                    </div>
                  </div>
                  
                  <div className="h-8 bg-teal-300 w-full mt-4 rounded"></div>
                </div>
                
                {/* Credit card at bottom */}
                <div className="h-12 w-36 mx-auto mt-2 bg-yellow-300 rounded-lg relative transform -rotate-6">
                  <div className="h-2 w-24 bg-gray-400 absolute top-3 left-2 rounded"></div>
                  <div className="h-2 w-6 bg-gray-600 absolute bottom-3 left-2 rounded"></div>
                </div>
              </div>
            </div>
            
            {/* Discount tags */}
            <div className="absolute top-0 right-0 text-blue-600 font-black transform rotate-6">
              <div className="text-2xl md:text-3xl">UP TO</div>
              <div className="text-4xl md:text-5xl">80% off</div>
            </div>
            
            <div className="absolute bottom-10 right-0 text-blue-600 font-black transform rotate-6">
              <div className="text-xl md:text-2xl">UP TO</div>
              <div className="text-3xl md:text-4xl">25% off</div>
            </div>
            
            {/* Sale badge */}
            <div className="absolute top-1/3 right-0 transform rotate-12">
              <div className="bg-yellow-400 text-blue-800 font-bold p-2 rounded-full flex items-center justify-center w-16 h-16">
                <div className="text-center">
                  <div className="text-xs">BIG</div>
                  <div className="text-xs">SAVING</div>
                  <div className="text-xs">DAYS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default CategorySlider;

=======
export default CategorySlider;
>>>>>>> 7ea62d898d3e0e768f7cc3be729e3316ee0f912c
