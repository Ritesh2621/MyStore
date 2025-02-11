import React, { useState, useEffect } from "react";
import axios from "axios";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Retrieve the cart data from localStorage
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
    const updatedCartItems = {};

    // Fetch product details for items that are in the cart but only have the ID (missing other product info)
    const fetchProductDetails = async () => {
      for (const id in storedCartItems) {
        const quantity = storedCartItems[id];

        // If the stored data is not in the expected format (missing product info), fetch from API
        if (typeof quantity === "number") {
          try {
            const response = await axios.get(`http://localhost:4000/product/${id}`);
            const product = response.data;

            updatedCartItems[id] = {
              ...product,
              quantity: quantity,
            };
          } catch (error) {
            console.error("Error fetching product details:", error);
          }
        } else {
          updatedCartItems[id] = quantity; // Use the full product data if available
        }
      }
      setCartItems(updatedCartItems);
    };

    fetchProductDetails();
  }, []);

  // Calculate the total price
  useEffect(() => {
    const calculateTotal = () => {
      let totalAmount = 0;
      Object.keys(cartItems).forEach((itemId) => {
        const product = cartItems[itemId];
        totalAmount += product.price * product.quantity;
      });
      setTotal(totalAmount);
    };

    calculateTotal(); // Recalculate total when cartItems change
  }, [cartItems]);

  const updateCartItem = (itemId, newQuantity) => {
    if (cartItems[itemId]) {
      const updatedCart = { ...cartItems };
      if (newQuantity <= 0) {
        removeFromCart(itemId);
      } else {
        updatedCart[itemId].quantity = newQuantity;
        setCartItems(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      }
    } else {
      console.error(`Item with id ${itemId} not found in the cart.`);
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCart = { ...cartItems };
    delete updatedCart[itemId];
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const checkout = () => {
    navigate("/checkout", { state: { cartItems } });
  };

  if (Object.keys(cartItems).length === 0) {
    return <div>Your cart is empty!</div>;
  }

  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
        <div className="space-y-4">
          {Object.values(cartItems).map((item) => {
            // Ensure that `item._id` exists before rendering
            if (!item._id) {
              console.error("Item is missing _id:", item);
              return null; // Skip rendering if `_id` is undefined
            }

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
                  <div className="flex items-center space-x-2">
                    <CiCircleMinus
                      onClick={() => updateCartItem(item._id, item.quantity - 1)} // Decrease quantity
                      className="cursor-pointer h-6 w-6"
                    />
                    <span className="text-lg font-medium">{item.quantity}</span>
                    <CiCirclePlus
                      onClick={() => updateCartItem(item._id, item.quantity + 1)} // Increase quantity
                      className="cursor-pointer h-6 w-6"
                    />
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)} // Remove from cart
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
            onClick={checkout}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
