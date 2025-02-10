import React, { useState, useEffect } from "react";

// The API endpoint for product details (replace with your actual API endpoint)
const API_URL = "http://localhost:4000/product/";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if the ID is valid
  const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cartItems"));

    const cart = Array.isArray(cartData)
      ? cartData
      : cartData
      ? Object.keys(cartData).map((id) => ({
          id,
          quantity: cartData[id],
        }))
      : [];

    // Log the cart before fetching product details
    console.log("Cart Data:", cartData);
    console.log("Formatted Cart:", cart);

    // Fetch product details for each item in the cart
    const fetchProductDetails = async () => {
      try {
        const updatedCart = await Promise.all(
          cart.map(async (item) => {
            // Log each item to ensure the ID is correct
            console.log("Item before ID check:", item);

            // Validate the ID before proceeding
            if (!isValidObjectId(item.id)) {
              // More detailed logging if the ID is invalid
              console.error(`Invalid ID detected: ${item.id}`);
              throw new Error(`Invalid product ID: ${item.id}`);
            }

            const response = await fetch(`${API_URL}${item.id}`);
            if (!response.ok) {
              const errorText = await response.text();
              console.error(`Error fetching details for ID: ${item.id}`);
              throw new Error(`Failed to fetch product details: ${errorText}`);
            }
            const product = await response.json();
            return {
              ...item,
              title: product.title,
              price: product.price,
              images: product.images,
              discountPercentage: product.discountPercentage,
              description: product.description,
            };
          })
        );
        setCartItems(updatedCart);
      } catch (err) {
        console.error("Error fetching product details:", err);  // More detailed error logging
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Proceed with fetching product details after cart data is prepared
    if (cart.length > 0) {
      fetchProductDetails();
    } else {
      setLoading(false); // If cart is empty, stop loading
    }
  }, []);

  const updateQuantity = (id, change) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(item.quantity + change, 1) }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const discountedPrice = item.price - (item.price * item.discountPercentage) / 100;
      return total + discountedPrice * item.quantity;
    }, 0);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <img src={item.images[0]} alt={item.title} className="h-20 w-20 object-cover rounded-lg mr-4" />
                <div>
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p>{item.description}</p>
                  <p className="text-lg font-semibold text-green-600">
                    ${item.price}{" "}
                    <span className="text-sm text-gray-500">(-{item.discountPercentage}%)</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button onClick={() => updateQuantity(item.id, -1)} className="px-4 py-2 bg-gray-200 rounded-full">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="px-4 py-2 bg-gray-200 rounded-full">+</button>
              </div>

              <button onClick={() => removeItem(item.id)} className="px-4 py-2 bg-red-500 text-white rounded-lg">
                Remove
              </button>
            </div>
          ))
        )}

        {/* Total */}
        {cartItems.length > 0 && (
          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total: ${calculateTotal().toFixed(2)}</h2>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
