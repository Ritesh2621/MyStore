import React, { useState, useEffect } from "react";
import axios from "axios";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Wishlist from "../assets/Wishlist.png";  // Assuming you want to use a similar empty state image for Wishlist

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

  const removeFromWishlist = async (itemId) => {
    const userId = localStorage.getItem("userId");
  
    try {
      // Call backend to remove the item from wishlist
      const response = await axios.delete(`http://localhost:4000/product/wishlist/${userId}/${itemId}`);
      
      // Remove the item from the frontend wishlist array
      setWishlistItems(prevItems => prevItems.filter(item => item._id !== itemId));
  
      alert(response.data.message);  // Optional: Show success message
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      alert("Failed to remove item from wishlist");
    }
  };
  

  const moveToCart = (item) => {
    let storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
    if (storedCartItems[item._id]) {
      storedCartItems[item._id] += 1;
    } else {
      storedCartItems[item._id] = 1;
    }
    localStorage.setItem("cartItems", JSON.stringify(storedCartItems));
    removeFromWishlist(item._id);  
  };

  const emptyWishlist = () => {
    setWishlistItems([]);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto h-[500px] flex flex-col items-center bg-white shadow-lg rounded-lg p-6 mt-[50px]">
        <img src={Wishlist} alt="Empty Wishlist" className="w-[500px] h-[400px] p-3" />
        <p className="font-semibold text-2xl my-3">Your wishlist is empty!</p>
        <button onClick={() => navigate("/")} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors my-3">
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Wishlist</h2>
        <div className="space-y-4">
          {wishlistItems.map((item) => {
            return (
              <div key={item._id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center">
                  <img src={item.images[0]} alt={item.title} className="w-20 h-20 object-cover mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-gray-600">Rs {item.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => moveToCart(item)} // Move to cart
                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                  >
                    Move to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item._id)} // Remove from wishlist
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <p className="text-2xl font-semibold">Total: Rs {total}</p>
          <button
            onClick={() => navigate("/checkout", { state: { total } })}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
