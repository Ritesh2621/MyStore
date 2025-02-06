import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const updateQuantity = (id, change) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(item.quantity + change, 1) }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const discountedPrice =
          item.price - (item.price * item.discountPercentage) / 100;
        return total + discountedPrice * item.quantity;
      }, 0)
      .toFixed(2);
  };

  return (
    <div className="py-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row justify-between items-center border-b py-4"
              >
                <div className="flex items-center mb-4 sm:mb-0">
                  <img
                    src={item.images && item.images[0]}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <div className="flex space-x-2 p-2">
                      <p className="line-through text-gray-500">
                        ${Math.round(
                          item.price / (1 - item.discountPercentage / 100)
                        )}
                      </p>
                      <p className="text-gray-600">${item.price}</p>
                    </div>
                    <p className="text-green-600 text-sm">
                      {item.discountPercentage}% Off
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-2 text-gray-600 hover:text-gray-900"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-2 text-gray-600 hover:text-gray-900"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 text-right">
          <h2 className="text-xl font-semibold">Total: ${calculateTotal()}</h2>
        </div>
        <div className="mt-6 text-right">
          <Link
            to="/checkout"
            state={{ total: calculateTotal(), cartItems }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
