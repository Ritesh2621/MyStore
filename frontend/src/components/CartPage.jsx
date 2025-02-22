import React, { useState, useEffect } from "react";
import axios from "axios";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Cart from "../assets/Cart.jpg";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
    const updatedCartItems = {};

    const fetchProductDetails = async () => {
      for (const id in storedCartItems) {
        const quantity = storedCartItems[id];

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
          updatedCartItems[id] = quantity;
        }
      }
      setCartItems(updatedCartItems);
    };

    fetchProductDetails();
  }, []);

  useEffect(() => {
    const calculateTotal = () => {
      let totalAmount = 0;
      Object.keys(cartItems).forEach((itemId) => {
        const product = cartItems[itemId];
        totalAmount += product.price * product.quantity;
      });
      setTotal(parseFloat(totalAmount.toFixed(2))); // Ensure 2 decimal places
    };

    calculateTotal();
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
    navigate("/checkout", { state: { cartItems, total } });
  };

  const emptyCart = () => {
    navigate("/");
  };

  if (Object.keys(cartItems).length === 0) {
    return (
      <div className="max-w-7xl mx-auto h-[500px] flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-6 mt-[70px]">
        <img src={Cart} alt="img" className="w-[400px] h-[400px] p-3" />
        <p className="font-semibold text-2xl my-3">Your cart is empty!</p>
        <button
          onClick={emptyCart}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors my-3"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
        <div className="space-y-4">
          {Object.values(cartItems).map((item) => {
            if (!item._id) {
              console.error("Item is missing _id:", item);
              return null; // Skip rendering if `_id` is undefined
            }

            return (
              <div
                key={item._id}
                className="flex items-center justify-between border-b pb-4 hover:bg-gray-50 transition-colors p-4 rounded-lg"
              >
                <div className="flex items-center">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-gray-600">Rs {item.price.toFixed(2)}</p> {/* Ensure 2 decimal places */}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <CiCircleMinus
                      onClick={() => updateCartItem(item._id, item.quantity - 1)}
                      className="cursor-pointer h-6 w-6 text-gray-600 hover:text-blue-600 transition-colors"
                    />
                    <span className="text-lg font-medium">{item.quantity}</span>
                    <CiCirclePlus
                      onClick={() => updateCartItem(item._id, item.quantity + 1)}
                      className="cursor-pointer h-6 w-6 text-gray-600 hover:text-blue-600 transition-colors"
                    />
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sticky Total Section */}
        <div className="sticky bottom-0 bg-white py-4 border-t mt-6">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-semibold">Total: Rs {total.toFixed(2)}</p> {/* Ensure 2 decimal places */}
            <button
              onClick={checkout}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;