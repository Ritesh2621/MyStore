import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiCirclePlus, CiCircleMinus } from 'react-icons/ci';

const CartPage = () => {
  const [cartItems, setCartItems] = useState({});
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart items from localStorage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    setCartItems(storedCartItems);
    calculateTotal(storedCartItems);
  }, []);

  const calculateTotal = (cartItems) => {
    let totalAmount = 0;
    Object.keys(cartItems).forEach((itemId) => {
      const product = cartItems[itemId];
      totalAmount += product.price * product.quantity;
    });
    setTotal(totalAmount);
  };

  const updateCartItem = (itemId, newQuantity) => {
    const updatedCart = { ...cartItems };
    if (newQuantity <= 0) {
      delete updatedCart[itemId]; // Remove item if quantity is 0 or less
    } else {
      updatedCart[itemId].quantity = newQuantity;
    }
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const removeFromCart = (itemId) => {
    const updatedCart = { ...cartItems };
    delete updatedCart[itemId]; // Remove item from cart
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const checkout = () => {
    // Redirect to checkout with cart items and total
    navigate('/checkout', { state: { cartItems, total } });
  };

  const cartItemsList = Object.keys(cartItems).map((itemId) => {
    const product = cartItems[itemId];
    const productImage = product.images && product.images[0] ? product.images[0] : '/path/to/default-image.jpg'; // Default image fallback

    return (
      <div key={itemId} className="flex items-center justify-between bg-white shadow-lg rounded-lg p-4 mb-4">
        <div className="flex items-center">
          <img src={productImage} alt={product.title} className="w-16 h-16 object-contain mr-4" />
          <div>
            <h3 className="font-semibold text-lg text-gray-800">{product.title}</h3>
            <p className="text-gray-600">Rs {product.price}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <CiCircleMinus
            onClick={() => updateCartItem(itemId, product.quantity - 1)}
            className="cursor-pointer h-6 w-6 text-gray-600"
          />
          <span className="text-lg font-medium">{product.quantity}</span>
          <CiCirclePlus
            onClick={() => updateCartItem(itemId, product.quantity + 1)}
            className="cursor-pointer h-6 w-6 text-gray-600"
          />
          <button
            onClick={() => removeFromCart(itemId)}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Remove
          </button>
        </div>
      </div>
    );
  });

  if (Object.keys(cartItems).length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-800">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Shopping Cart</h2>
        <div className="space-y-4">{cartItemsList}</div>

        <div className="flex justify-between items-center mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Total: Rs {total}</h3>
          <button
            onClick={checkout}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
