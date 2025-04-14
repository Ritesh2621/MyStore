// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { IoArrowBackCircleSharp } from "react-icons/io5";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [cartItems, setCartItems] = useState({});
//   const [showAllReviews, setShowAllReviews] = useState(false); // bool to show all reviews
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);  // Track if product is in wishlist
//   const recommendedProducts = [];
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProductDetail = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/product/${id}`);
//         setProduct(response.data);
//         setSelectedImage(response.data.images[0]);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching product detail:", error);
//         setLoading(false);
//       }
//     };

//     const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
//     setCartItems(storedCartItems);
//     fetchProductDetail();
//   }, [id]);

//   // Check if the product is already in the wishlist when the component is mounted
//   useEffect(() => {
//     const checkIfInWishlist = async () => {
//       const userId = localStorage.getItem("userId");  // Replace with actual userId
//       if (!userId) return;

//       try {
//         const response = await axios.get(`http://localhost:4000/product/wishlist/${userId}`);
//         const wishlistItems = response.data.wishlist;
//         if (wishlistItems.some(item => item._id === product?._id)) {
//           setIsAddedToWishlist(true);
//         }
//       } catch (error) {
//         console.error("Error checking wishlist:", error);
//       }
//     };

//     if (product) {
//       checkIfInWishlist();
//     }
//   }, [product]);

//   const addToCart = (itemId) => {
//     const updatedCart = { ...cartItems };
//     if (!updatedCart[itemId]) {
//       updatedCart[itemId] = 1;
//     } else {
//       updatedCart[itemId] += 1;
//     }

//     // Save the updated cart to localStorage
//     localStorage.setItem('cartItems', JSON.stringify(updatedCart));
//     setCartItems(updatedCart);
//   };

//   const removeFromCart = (itemId) => {
//     const updatedCart = { ...cartItems };

//     if (updatedCart[itemId] > 1) {
//       updatedCart[itemId] -= 1;
//     } else {
//       delete updatedCart[itemId];
//     }

//     // Save the updated cart to localStorage
//     localStorage.setItem('cartItems', JSON.stringify(updatedCart));
//     setCartItems(updatedCart);
//   };

//   const checkout = () => {
//     const singleItemCheckout = [
//       {
//         id: product.id,
//         title: product.title,
//         price: product.price,
//         quantity: 1,
//         images: product.images,
//       },
//     ];

//     const total = product.price;

//     navigate("/checkout", { state: { total, cartItems: singleItemCheckout } });
//   };

//   const backtohome = () => {
//     navigate("/");
//   };

//   const addToWishlist = async () => {
//     try {
//       const userId = localStorage.getItem("userId");  // Replace with actual userId
//       const response = await axios.post(`http://localhost:4000/product/wishlist/${userId}`, {
//         productId: product._id,  // The product's ID to add to wishlist
//       });
//       console.log(response.data.message); // You can show a toast or notification here
//       setIsAddedToWishlist(true);  // Mark as added to wishlist
//       alert('Product added to wishlist!');
//     } catch (error) {
//       console.error("Error adding to wishlist:", error);
//       alert('Failed to add product to wishlist');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <div className="flex flex-col items-center">
//           <div className="animate-spin border-t-4 border-blue-600 border-solid rounded-full w-16 h-16 mb-4"></div>
//           <p className="text-xl font-semibold text-gray-800">Loading product details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         Product not found.
//       </div>
//     );
//   }

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   const cartCount = cartItems[id] || 0;

//   return (
//     <div className="bg-gray-100 py-8">
//       <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
//           <div className="relative flex flex-col items-center">
//             <IoArrowBackCircleSharp
//               size={40}
//               onClick={backtohome}
//               className="absolute top-4 left-4 cursor-pointer text-gray-700"
//             />
//             <img
//               src={selectedImage}
//               alt="Main Product"
//               className="w-full h-[500px] object-contain rounded-lg shadow-lg"
//             />
//             {product.images.length > 1 && (
//               <div className="flex space-x-3 mt-4 overflow-x-auto">
//                 {product.images.slice(1).map((image, index) => (
//                   <img
//                     key={index}
//                     src={image}
//                     alt={`Thumbnail ${index + 1}`}
//                     className="w-16 h-16 object-contain border rounded-md cursor-pointer hover:border-blue-500"
//                     onClick={() => setSelectedImage(image)}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="flex flex-col">
//             <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
//             <p className="text-xl font-semibold text-green-600 mt-2">
//               Rs {product.price}{" "}
//               <span className="line-through text-gray-500">
//                 Rs {Math.round(product.price / (1 - product.discountPercentage / 100))}
//               </span>
//             </p>
//             <p className="text-sm text-gray-600 mt-1">{product.discountPercentage}% off</p>

//             <div className="mt-4">
//               <h2 className="text-lg font-semibold text-gray-800">Product Description</h2>
//               <p className="text-gray-700 text-sm">{product.description}</p>
//             </div>

//             <div className="flex space-x-4 my-4">
//               {!cartCount ? (
//                 <button
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     addToCart(id);
//                   }}
//                 >
//                   Add to Cart
//                 </button>
//               ) : (
//                 <div className="px-6 py-2 text-center bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
//                   Added To Cart
//                 </div>
//               )}
//               <button
//                 onClick={checkout}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md"
//               >
//                 Buy Now
//               </button>
//               <button
//                 onClick={addToWishlist}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md"
//               >
//                 {isAddedToWishlist ? "Added to Wishlist" : "Add to Wishlist"}
//               </button>
//             </div>

//             {/* Product Details */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
//               {/* Category, Price, Discount, Stock, Brand */}
//               <div>
//                 <p className="text-lg text-gray-600 mb-3">
//                   <span className="font-semibold">Category:</span> {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
//                 </p>
//                 <p className="text-lg font-bold text-green-600 mb-3">
//                   <span className="font-semibold">Price:</span> Rs {product.price}
//                 </p>
//                 <p className="text-lg text-gray-600 mb-3">
//                   <span className="font-semibold">Discount:</span> {product.discountPercentage}%
//                 </p>
//                 <p className="text-lg text-gray-600 mb-3">
//                   <span className="font-semibold">Stock:</span> {product.stock > 0 ? `${product.stock} items` : "Available"}
//                 </p>
//                 <p className="text-lg text-gray-600 mb-3">
//                   <span className="font-semibold">Brand:</span> {product.brand ? product.brand : "Data not available"}
//                 </p>
//               </div>

//               {/* Seller, Warranty, Shipping */}
//               <div>
//                 <p className="text-lg text-gray-600 mb-3">
//                   <span className="font-semibold">Seller Name:</span> {product.sellerName}
//                 </p>
//                 <p className="text-lg text-gray-600 mb-3">
//                   <span className="font-semibold">Warranty:</span> {product.warrantyInformation}
//                 </p>
//                 <p className="text-lg text-gray-600 mb-3">
//                   <span className="font-semibold">Shipping:</span> {product.shippingInformation}
//                 </p>
//               </div>

//               {/* Reviews */}
//               <div className="grid grid-cols-3 gap-6">
//       {/* Left Section */}
//       <div className="col-span-2">
//         <h2 className="text-xl font-bold mb-4">Reviews</h2>
//         <div className="space-y-4">
//           {product.reviews.length > 0 ? (
//             <>
//               <div className="bg-white p-6 shadow-lg rounded-lg w-[400px] flex-shrink-0">
//                 <div className="flex justify-between items-center mb-4">
//                   <p className="font-semibold text-lg">{product.reviews[0].reviewerName}</p>
//                   <p className="text-sm text-gray-500">{product.reviews[0].date}</p>
//                 </div>
//                 <p className="text-lg font-semibold text-gray-800 mb-1">
//                   {product.reviews[0].rating}/5
//                 </p>
//                 <div className="flex mb-4">
//                   {[...Array(5)].map((_, starIndex) => (
//                     <span
//                       key={starIndex}
//                       className={`text-xl ${starIndex < product.reviews[0].rating ? 'text-yellow-500' : 'text-gray-300'}`}
//                     >
//                       ★
//                     </span>
//                   ))}
//                 </div>
//                 <p className="text-gray-600">{product.reviews[0].comment}</p>
//               </div>






//               {!showAllReviews && product.reviews.length > 1 && (
//                 <button
//                   className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//                   onClick={() => {
//                     setShowAllReviews(true);
//                     setShowSidebar(true);
//                     if (product.reviews.length > 3) setShowSidebar(true);
//                   }}
//                 >
//                   Show All Reviews
//                 </button>
//               )}
//             </>
//           ) : (
//             <p className="text-gray-600">No reviews available.</p>
//           )}
//         </div>
//       </div>

//       {/* Right Sidebar (Visible if more than 3 reviews) */}
//       {showSidebar && (
//         <div className="fixed top-0 right-0 h-full bg-white shadow-lg w-[450px] p-6 overflow-y-auto">
//           <button
//             className="absolute top-2 right-2 text-gray-500"
//             onClick={() => setShowSidebar(false)}
//           >
//             ✖
//           </button>
//           <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">All Reviews</h2>
//           {product.reviews.slice(1).map((review, index) => (
//             <div key={index} className="mb-4 p-4 border-b border-gray-200">
//               <p className="font-semibold">{review.reviewerName}</p>
//               <p className="text-sm text-gray-500">{review.date}</p>
//               <p className="text-lg font-semibold">{review.rating}/5</p>
//               <div className="flex mb-2">
//                 {[...Array(5)].map((_, starIndex) => (
//                   <span
//                     key={starIndex}
//                     className={`text-xl ${starIndex < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
//                   >
//                     ★
//                   </span>
//                 ))}
//               </div>
//               <p className="text-gray-600">{review.comment}</p>
//             </div>
            
//           ))}
//           <button className="w-full text-center text-purple-600 font-semibold mt-4">View More ▼</button>
//         </div>
//       )}
//     </div>

    
//                {/* Recommended Products Section */}
//                <div>
//           <p className="text-xl font-semibold text-gray-800">Recommended Products</p>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6" onClick={() => navigate(`/product/${product._id}`)}>
//             {recommendedProducts.map((item) => (
//               <div key={item.id} className="bg-white shadow-md rounded-lg p-4">
//                 <img
//                   src={item.images[0]}
//                   alt={item.title}
//                   className="w-full h-40 object-contain mb-4"
//                 />
//                 <p className="text-lg font-semibold text-gray-800">{item.title}</p>
//                 <p className="text-sm text-gray-600 mt-2">{item.category}</p>
//                 <p className="text-lg font-bold text-green-600 mt-2">
//                   Rs. {item.price}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>



//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cartItems, setCartItems] = useState({});
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const recommendedProducts = [];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/product/${id}`);
        const productData = {
          ...response.data,
          reviews: response.data.reviews || [],
          images: response.data.images || [],
          brand: response.data.brand || "Data not available",
          category: response.data.category || "Unknown",
        };
        setProduct(productData);
        setSelectedImage(productData.images?.[0] || null);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product detail:", error);
        setLoading(false);
      }
    };

    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    setCartItems(storedCartItems);
    fetchProductDetail();
  }, [id]);

  useEffect(() => {
    const checkIfInWishlist = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId || !product?._id) return;

      try {
        const response = await axios.get(`http://localhost:4000/product/wishlist/${userId}`);
        const wishlistItems = response.data?.wishlist || [];
        if (wishlistItems.some(item => item._id === product._id)) {
          setIsAddedToWishlist(true);
        }
      } catch (error) {
        console.error("Error checking wishlist:", error);
      }
    };

    if (product) {
      checkIfInWishlist();
    }
  }, [product]);

  const addToCart = (itemId) => {
    const updatedCart = { ...cartItems };
    updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const checkout = () => {
    const singleItemCheckout = [
      {
        id: product?.id,
        title: product?.title,
        price: product?.price,
        quantity: 1,
        images: product?.images,
      },
    ];
    const total = product?.price || 0;
    navigate("/checkout", { state: { total, cartItems: singleItemCheckout } });
  };

  const backtohome = () => {
    navigate("/");
  };

  const addToWishlist = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId || !product?._id) return;

      await axios.post(`http://localhost:4000/product/wishlist/${userId}`, {
        productId: product._id,
      });

      setIsAddedToWishlist(true);
      alert('Product added to wishlist!');
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      alert('Failed to add product to wishlist');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin border-t-4 border-blue-600 border-solid rounded-full w-16 h-16 mb-4"></div>
          <p className="text-xl font-semibold text-gray-800">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        Product not found.
      </div>
    );
  }

  const cartCount = cartItems?.[id] || 0;

  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="relative flex flex-col items-center">
            <IoArrowBackCircleSharp
              size={40}
              onClick={backtohome}
              className="absolute top-4 left-4 cursor-pointer text-gray-700"
            />
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Main Product"
                className="w-full h-[500px] object-contain rounded-lg shadow-lg"
              />
            )}
            {product.images?.length > 1 && (
              <div className="flex space-x-3 mt-4 overflow-x-auto">
                {product.images?.slice(1).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-16 h-16 object-contain border rounded-md cursor-pointer hover:border-blue-500"
                    onClick={() => setSelectedImage(image)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900">{product?.title}</h1>
            <p className="text-xl font-semibold text-green-600 mt-2">
              Rs {product?.price}{" "}
              <span className="line-through text-gray-500">
                Rs {Math.round(product?.price / (1 - product?.discountPercentage / 100))}
              </span>
            </p>
            <p className="text-sm text-gray-600 mt-1">{product?.discountPercentage}% off</p>

            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-800">Product Description</h2>
              <p className="text-gray-700 text-sm">{product?.description || "No description available."}</p>
            </div>

            <div className="flex space-x-4 my-4">
              {!cartCount ? (
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md"
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(id);
                  }}
                >
                  Add to Cart
                </button>
              ) : (
                <div className="px-6 py-2 text-center bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  Added To Cart
                </div>
              )}
              <button
                onClick={checkout}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md"
              >
                Buy Now
              </button>
              <button
                onClick={addToWishlist}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md"
              >
                {isAddedToWishlist ? "Added to Wishlist" : "Add to Wishlist"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-lg text-gray-600 mb-3">
                  <span className="font-semibold">Category:</span> {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </p>
                <p className="text-lg font-bold text-green-600 mb-3">
                  <span className="font-semibold">Price:</span> Rs {product?.price}
                </p>
                <p className="text-lg text-gray-600 mb-3">
                  <span className="font-semibold">Discount:</span> {product?.discountPercentage}%
                </p>
                <p className="text-lg text-gray-600 mb-3">
                  <span className="font-semibold">Stock:</span> {product?.stock > 0 ? `${product?.stock} items` : "Available"}
                </p>
                <p className="text-lg text-gray-600 mb-3">
                  <span className="font-semibold">Brand:</span> {product?.brand}
                </p>
              </div>

              <div>
                <p className="text-lg text-gray-600 mb-3">
                  <span className="font-semibold">Seller Name:</span> {product?.sellerName || "N/A"}
                </p>
                <p className="text-lg text-gray-600 mb-3">
                  <span className="font-semibold">Warranty:</span> {product?.warrantyInformation || "N/A"}
                </p>
                <p className="text-lg text-gray-600 mb-3">
                  <span className="font-semibold">Shipping:</span> {product?.shippingInformation || "N/A"}
                </p>
              </div>

              {/* Reviews Section */}
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                  <h2 className="text-xl font-bold mb-4">Reviews</h2>
                  <div className="space-y-4">
                    {product.reviews?.length > 0 ? (
                      <>
                        <div className="bg-white p-6 shadow-lg rounded-lg w-[400px] flex-shrink-0">
                          <div className="flex justify-between items-center mb-4">
                            <p className="font-semibold text-lg">{product.reviews?.[0]?.reviewerName}</p>
                            <p className="text-sm text-gray-500">{product.reviews?.[0]?.date}</p>
                          </div>
                          <p className="text-lg font-semibold text-gray-800 mb-1">
                            {product.reviews?.[0]?.rating}/5
                          </p>
                          <div className="flex mb-4">
                            {[...Array(5)].map((_, starIndex) => (
                              <span
                                key={starIndex}
                                className={`text-xl ${starIndex < product.reviews?.[0]?.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <p className="text-gray-600">{product.reviews?.[0]?.comment}</p>
                        </div>

                        {!showAllReviews && product.reviews?.length > 1 && (
                          <button
                            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            onClick={() => {
                              setShowAllReviews(true);
                              setShowSidebar(true);
                            }}
                          >
                            Show All Reviews
                          </button>
                        )}
                      </>
                    ) : (
                      <p className="text-gray-600">No reviews available.</p>
                    )}
                  </div>
                </div>

                {showSidebar && (
                  <div className="fixed top-0 right-0 h-full bg-white shadow-lg w-[450px] p-6 overflow-y-auto">
                    <button
                      className="absolute top-2 right-2 text-gray-500"
                      onClick={() => setShowSidebar(false)}
                    >
                      ✖
                    </button>
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">All Reviews</h2>
                    {product.reviews?.slice(1).map((review, index) => (
                      <div key={index} className="mb-4 p-4 border-b border-gray-200">
                        <p className="font-semibold">{review?.reviewerName}</p>
                        <p className="text-sm text-gray-500">{review?.date}</p>
                        <p className="text-lg font-semibold">{review?.rating}/5</p>
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, starIndex) => (
                            <span
                              key={starIndex}
                              className={`text-xl ${starIndex < review?.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <p className="text-gray-600">{review?.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recommended Products */}
              <div>
                <p className="text-xl font-semibold text-gray-800">Recommended Products</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
                  {recommendedProducts.map((item) => (
                    <div
                      key={item?.id}
                      className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
                      onClick={() => navigate(`/product/${item?._id}`)}
                    >
                      <img
                        src={item?.images?.[0]}
                        alt={item?.title}
                        className="w-full h-40 object-contain mb-4"
                      />
                      <p className="text-lg font-semibold text-gray-800">{item?.title}</p>
                      <p className="text-sm text-gray-600 mt-2">{item?.category}</p>
                      <p className="text-lg font-bold text-green-600 mt-2">Rs. {item?.price}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
