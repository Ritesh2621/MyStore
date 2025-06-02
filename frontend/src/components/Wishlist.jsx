// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
// import { useNavigate } from "react-router-dom";
// import Wishlist from "../assets/Wishlist.png";  // Assuming you want to use a similar empty state image for Wishlist

// const WishlistPage = ({ userId }) => {
//   const navigate = useNavigate();
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     const fetchWishlistItems = async () => {
//       try {
//         const userId = localStorage.getItem("userId");
//         const response = await axios.get(`http://localhost:4000/product/wishlist/${userId}`);
//         setWishlistItems(response.data.wishlist);
//       } catch (error) {
//         console.error("Error fetching wishlist items:", error);
//       }
//     };

//     fetchWishlistItems();
//   }, [userId]);

//   useEffect(() => {
//     const calculateTotal = () => {
//       let totalAmount = 0;
//       wishlistItems.forEach(item => {
//         totalAmount += item.price;
//       });
//       setTotal(totalAmount);
//     };

//     calculateTotal();
//   }, [wishlistItems]);

//   const removeFromWishlist = async (itemId) => {
//     const userId = localStorage.getItem("userId");
  
//     try {
//       // Call backend to remove the item from wishlist
//       const response = await axios.delete(`http://localhost:4000/product/wishlist/${userId}/${itemId}`);
      
//       // Remove the item from the frontend wishlist array
//       setWishlistItems(prevItems => prevItems.filter(item => item._id !== itemId));
  
//       alert(response.data.message);  // Optional: Show success message
//     } catch (error) {
//       console.error("Error removing product from wishlist:", error);
//       alert("Failed to remove item from wishlist");
//     }
//   };
  

//   const moveToCart = (item) => {
//     let storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
//     if (storedCartItems[item._id]) {
//       storedCartItems[item._id] += 1;
//     } else {
//       storedCartItems[item._id] = 1;
//     }
//     localStorage.setItem("cartItems", JSON.stringify(storedCartItems));
//     removeFromWishlist(item._id);  
//   };

//   const emptyWishlist = () => {
//     setWishlistItems([]);
//   };

//   if (wishlistItems.length === 0) {
//     return (
//       <div className="max-w-7xl mx-auto h-[500px] flex flex-col items-center bg-white shadow-lg rounded-lg p-6 mt-[50px]">
//         <img src={Wishlist} alt="Empty Wishlist" className="w-[500px] h-[400px] p-3" />
//         <p className="font-semibold text-2xl my-3">Your wishlist is empty!</p>
//         <button onClick={() => navigate("/")} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors my-3">
//           Start Shopping
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-100 py-8">
//       <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
//         <h2 className="text-2xl font-semibold mb-4">Your Wishlist</h2>
//         <div className="space-y-4">
//           {wishlistItems.map((item) => {
//             return (
//               <div key={item._id} className="flex items-center justify-between border-b pb-4">
//                 <div className="flex items-center">
//                   <img src={item.images[0]} alt={item.title} className="w-20 h-20 object-cover mr-4" />
//                   <div>
//                     <h3 className="text-xl font-semibold">{item.title}</h3>
//                     <p className="text-gray-600">Rs {item.price}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <button
//                     onClick={() => moveToCart(item)} // Move to cart
//                     className="bg-green-500 text-white px-4 py-2 rounded-lg"
//                   >
//                     Move to Cart
//                   </button>
//                   <button
//                     onClick={() => removeFromWishlist(item._id)} // Remove from wishlist
//                     className="bg-red-600 text-white px-4 py-2 rounded-lg"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <div className="mt-6 flex justify-between items-center">
//           <p className="text-2xl font-semibold">Total: Rs {total}</p>
//           <button
//             onClick={() => navigate("/checkout", { state: { total } })}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg"
//           >
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WishlistPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Wishlist from "../assets/Wishlist.png";

const WishlistPage = ({ userId }) => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`http://localhost:4000/product/wishlist/${userId}`);
        setWishlistItems(response.data.wishlist);
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
      }
    };

    fetchWishlistItems();
  }, [userId]);

  useEffect(() => {
    const calculateTotal = () => {
      let totalAmount = 0;
      wishlistItems.forEach(item => {
        totalAmount += item.price;
      });
      setTotal(totalAmount);
    };

    calculateTotal();
  }, [wishlistItems]);

  const removeFromWishlist = async (itemId, customMessage = null) => {
    const userId = localStorage.getItem("userId");
  
    try {
      // Call backend to remove the item from wishlist       
      const response = await axios.delete(`http://localhost:4000/product/wishlist/${userId}/${itemId}`);
             
      // Remove the item from the frontend wishlist array       
      setWishlistItems(prevItems => prevItems.filter(item => item._id !== itemId));
      
      // Show attractive success message
      const messageElement = document.createElement('div');
      messageElement.className = window.innerWidth <= 768 
        ? 'fixed bottom-4 left-4 right-4 bg-green-500 text-white p-3 rounded-md text-center shadow-lg z-50' 
        : 'fixed top-4 right-4 bg-green-500 text-white p-3 rounded-md shadow-lg z-50 max-w-xs';
      messageElement.textContent = customMessage || "✨ Item removed from wishlist!";
      document.body.appendChild(messageElement);
      
      // Remove message after 3 seconds
      setTimeout(() => messageElement.remove(), 3000);
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      
      // Show attractive error message
      const errorElement = document.createElement('div');
      errorElement.className = window.innerWidth <= 768 
        ? 'fixed bottom-4 left-4 right-4 bg-red-500 text-white p-3 rounded-md text-center shadow-lg z-50' 
        : 'fixed top-4 right-4 bg-red-500 text-white p-3 rounded-md shadow-lg z-50 max-w-xs';
      errorElement.textContent = customMessage ? "Failed to move item to cart" : "Failed to remove item from wishlist";
      document.body.appendChild(errorElement);
      
      // Remove message after 3 seconds
      setTimeout(() => errorElement.remove(), 3000);
    }
  };
  
  const moveToCart = (item) => {
    try {
      // Add to cart in localStorage
      let storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
      if (storedCartItems[item._id]) {
        storedCartItems[item._id] += 1;
      } else {
        storedCartItems[item._id] = 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(storedCartItems));
      
      // Remove from wishlist with a custom message
      removeFromWishlist(item._id, "✨ Item moved to cart successfully!");
    } catch (error) {
      console.error("Error moving item to cart:", error);
      
      // Show error message
      const errorElement = document.createElement('div');
      errorElement.className = window.innerWidth <= 768 
        ? 'fixed bottom-4 left-4 right-4 bg-red-500 text-white p-3 rounded-md text-center shadow-lg z-50' 
        : 'fixed top-4 right-4 bg-red-500 text-white p-3 rounded-md shadow-lg z-50 max-w-xs';
      errorElement.textContent = "Failed to move item to cart";
      document.body.appendChild(errorElement);
      
      // Remove message after 3 seconds
      setTimeout(() => errorElement.remove(), 3000);
    }
  };

  const emptyWishlist = () => {
    setWishlistItems([]);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center bg-white shadow-lg rounded-lg p-4 md:p-6 mt-4 md:mt-12">
        <img 
          src={Wishlist} 
          alt="Empty Wishlist" 
          className="w-full max-w-xs md:max-w-md lg:max-w-lg h-auto p-2 md:p-3" 
        />
        <p className="font-semibold text-xl md:text-2xl my-2 md:my-3 text-center">Your wishlist is empty!</p>
        <button 
          onClick={() => navigate("/")} 
          className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors my-2 md:my-3 w-full md:w-auto"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-4 md:py-8 px-4 md:px-0 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Your Wishlist</h2>
        
        <div className="space-y-4">
          {wishlistItems.map((item) => {
            return (
              <div key={item._id} className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4 gap-3">
                <div className="flex items-center">
                  <img 
                    src={item.images[0]} 
                    alt={item.title} 
                    className="w-16 h-16 md:w-20 md:h-20 object-cover mr-3 md:mr-4 rounded-md" 
                  />
                  <div>
                    <h3 className="text-base md:text-xl font-semibold line-clamp-1 md:line-clamp-none">{item.title}</h3>
                    <p className="text-gray-600 text-sm md:text-base">Rs {item.price}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-end md:justify-center space-x-2 md:space-x-4 mt-2 md:mt-0">
                  <button
                    onClick={() => moveToCart(item)}
                    className="bg-green-500 text-white text-xs md:text-sm px-3 py-1 md:px-4 md:py-2 rounded-lg whitespace-nowrap"
                  >
                    Move to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="bg-red-600 text-white text-xs md:text-sm px-3 py-1 md:px-4 md:py-2 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xl md:text-2xl font-semibold">Total: Rs {total}</p>
          <button
            onClick={() => navigate("/checkout", { state: { total } })}
            className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-2 rounded-lg w-full md:w-auto"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
