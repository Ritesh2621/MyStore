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
//   const [showAllReviews, setShowAllReviews] = useState(false);
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
//   const recommendedProducts = [];
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProductDetail = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/product/${id}`);
//         const productData = {
//           ...response.data,
//           reviews: response.data.reviews || [],
//           images: response.data.images || [],
//           brand: response.data.brand || "Data not available",
//           category: response.data.category || "Unknown",
//         };
//         setProduct(productData);
//         setSelectedImage(productData.images?.[0] || null);
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

//   useEffect(() => {
//     const checkIfInWishlist = async () => {
//       const userId = localStorage.getItem("userId");
//       if (!userId || !product?._id) return;

//       try {
//         const response = await axios.get(`http://localhost:4000/product/wishlist/${userId}`);
//         const wishlistItems = response.data?.wishlist || [];
//         if (wishlistItems.some(item => item._id === product._id)) {
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
//     updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;
//     localStorage.setItem('cartItems', JSON.stringify(updatedCart));
//     setCartItems(updatedCart);
//   };

//   const checkout = () => {
//     const singleItemCheckout = [
//       {
//         id: product?.id,
//         title: product?.title,
//         price: product?.price,
//         quantity: 1,
//         images: product?.images,
//       },
//     ];
//     const total = product?.price || 0;
//     navigate("/checkout", { state: { total, cartItems: singleItemCheckout } });
//   };

//   const backtohome = () => {
//     navigate("/");
//   };

//   const addToWishlist = async () => {
//     try {
//       const userId = localStorage.getItem("userId");
//       if (!userId || !product?._id) return;

//       await axios.post(`http://localhost:4000/product/wishlist/${userId}`, {
//         productId: product._id,
//       });

//       setIsAddedToWishlist(true);
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

//   const cartCount = cartItems?.[id] || 0;

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
//             {selectedImage && (
//               <img
//                 src={selectedImage}
//                 alt="Main Product"
//                 className="w-full h-[500px] object-contain rounded-lg shadow-lg"
//               />
//             )}
//             {product.images?.length > 1 && (
//               <div className="flex space-x-3 mt-4 overflow-x-auto">
//                 {product.images?.slice(1).map((image, index) => (
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
//             <h1 className="text-3xl font-bold text-gray-900">{product?.title}</h1>
//             <p className="text-xl font-semibold text-green-600 mt-2">
//               Rs {product?.price}{" "}
//               <span className="line-through text-gray-500">
//                 Rs {Math.round(product?.price / (1 - product?.discountPercentage / 100))}
//               </span>
//             </p>
//             <p className="text-sm text-gray-600 mt-1">{product?.discountPercentage}% off</p>

//             <div className="mt-4">
//               <h2 className="text-lg font-semibold text-gray-800">Product Description</h2>
//               <p className="text-gray-700 text-sm">{product?.description || "No description available."}</p>
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

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <p className="text-lg text-gray-600 mb-3">
//                   <span className="font-semibold">Category:</span> {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
//                 </p>
//                 <p className="text-lg font-bold text-green-600 mb-3">
//                   <span className="font-semibold">Price:</span> Rs {product?.price}
//                 </p>
//                 <p className="text-lg text-gray-600 mb-3">
//                   <span className="font-semibold">Discount:</span> {product?.discountPercentage}%
//                 </p>
//                 <p className="text-lg text-gray-600 mb-3">
//                   <span className="font-semibold">Stock:</span> {product?.stock > 0 ? `${product?.stock} items` : "Available"}
//                 </p>
//                 <p className="text-lg text-gray-600 mb-3">
//                   <span className="font-semibold">Brand:</span> {product?.brand}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-lg text-gray-600 mb-3">
//                   <span className="font-semibold">Seller Name:</span> {product?.sellerName || "N/A"}
//                 </p>
//                 <p className="text-lg text-gray-600 mb-3">
//                   <span className="font-semibold">Warranty:</span> {product?.warrantyInformation || "N/A"}
//                 </p>
//                 <p className="text-lg text-gray-600 mb-3">
//                   <span className="font-semibold">Shipping:</span> {product?.shippingInformation || "N/A"}
//                 </p>
//               </div>

//               {/* Reviews Section */}
//               <div className="grid grid-cols-3 gap-6">
//                 <div className="col-span-2">
//                   <h2 className="text-xl font-bold mb-4">Reviews</h2>
//                   <div className="space-y-4">
//                     {product.reviews?.length > 0 ? (
//                       <>
//                         <div className="bg-white p-6 shadow-lg rounded-lg w-[400px] flex-shrink-0">
//                           <div className="flex justify-between items-center mb-4">
//                             <p className="font-semibold text-lg">{product.reviews?.[0]?.reviewerName}</p>
//                             <p className="text-sm text-gray-500">{product.reviews?.[0]?.date}</p>
//                           </div>
//                           <p className="text-lg font-semibold text-gray-800 mb-1">
//                             {product.reviews?.[0]?.rating}/5
//                           </p>
//                           <div className="flex mb-4">
//                             {[...Array(5)].map((_, starIndex) => (
//                               <span
//                                 key={starIndex}
//                                 className={`text-xl ${starIndex < product.reviews?.[0]?.rating ? 'text-yellow-500' : 'text-gray-300'}`}
//                               >
//                                 ★
//                               </span>
//                             ))}
//                           </div>
//                           <p className="text-gray-600">{product.reviews?.[0]?.comment}</p>
//                         </div>

//                         {!showAllReviews && product.reviews?.length > 1 && (
//                           <button
//                             className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//                             onClick={() => {
//                               setShowAllReviews(true);
//                               setShowSidebar(true);
//                             }}
//                           >
//                             Show All Reviews
//                           </button>
//                         )}
//                       </>
//                     ) : (
//                       <p className="text-gray-600">No reviews available.</p>
//                     )}
//                   </div>
//                 </div>

//                 {showSidebar && (
//                   <div className="fixed top-0 right-0 h-full bg-white shadow-lg w-[450px] p-6 overflow-y-auto">
//                     <button
//                       className="absolute top-2 right-2 text-gray-500"
//                       onClick={() => setShowSidebar(false)}
//                     >
//                       ✖
//                     </button>
//                     <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">All Reviews</h2>
//                     {product.reviews?.slice(1).map((review, index) => (
//                       <div key={index} className="mb-4 p-4 border-b border-gray-200">
//                         <p className="font-semibold">{review?.reviewerName}</p>
//                         <p className="text-sm text-gray-500">{review?.date}</p>
//                         <p className="text-lg font-semibold">{review?.rating}/5</p>
//                         <div className="flex mb-2">
//                           {[...Array(5)].map((_, starIndex) => (
//                             <span
//                               key={starIndex}
//                               className={`text-xl ${starIndex < review?.rating ? 'text-yellow-500' : 'text-gray-300'}`}
//                             >
//                               ★
//                             </span>
//                           ))}
//                         </div>
//                         <p className="text-gray-600">{review?.comment}</p>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Recommended Products */}
//               <div>
//                 <p className="text-xl font-semibold text-gray-800">Recommended Products</p>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
//                   {recommendedProducts.map((item) => (
//                     <div
//                       key={item?.id}
//                       className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
//                       onClick={() => navigate(`/product/${item?._id}`)}
//                     >
//                       <img
//                         src={item?.images?.[0]}
//                         alt={item?.title}
//                         className="w-full h-40 object-contain mb-4"
//                       />
//                       <p className="text-lg font-semibold text-gray-800">{item?.title}</p>
//                       <p className="text-sm text-gray-600 mt-2">{item?.category}</p>
//                       <p className="text-lg font-bold text-green-600 mt-2">Rs. {item?.price}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;


// mobile view 

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { IoArrowBackCircleSharp } from "react-icons/io5";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
// import { BsStarFill, BsStar } from "react-icons/bs";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [cartItems, setCartItems] = useState({});
//   const [showAllReviews, setShowAllReviews] = useState(false);
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
//   const [activeTab, setActiveTab] = useState("details");
//   const [recommendedProducts, setRecommendedProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProductDetail = async () => {
//       setLoading(true); // Ensure loading state is set when ID changes
//       try {
//         const response = await axios.get(`http://localhost:4000/product/${id}`);
//         const productData = {
//           ...response.data,
//           reviews: response.data.reviews || [],
//           images: response.data.images || [],
//           brand: response.data.brand || "Data not available",
//           category: response.data.category || "Unknown",
//         };
//         setProduct(productData);
//         setSelectedImage(productData.images?.[0] || null);
//         setLoading(false);

//         // Reset tabs and states when product changes
//         setActiveTab("details");
//         setShowAllReviews(false);
//         setShowSidebar(false);

//         // Fetch recommended products
//         if (productData.category) {
//           fetchRecommendedProducts(productData.category, productData._id);
//         }
//       } catch (error) {
//         console.error("Error fetching product detail:", error);
//         setLoading(false);
//       }
//     };

//     const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
//     setCartItems(storedCartItems);
//     fetchProductDetail();
//   }, [id]); // This will re-run when ID changes

//   const fetchRecommendedProducts = async (category, currentProductId) => {
//     try {
//       const response = await axios.get(`http://localhost:4000/products/category/${category}`);
//       // Filter out current product and limit to 4 products
//       const filtered = response.data.filter(item => item._id !== currentProductId).slice(0, 4);
//       setRecommendedProducts(filtered);
//     } catch (error) {
//       console.error("Error fetching recommended products:", error);
//     }
//   };

//   useEffect(() => {
//     const checkIfInWishlist = async () => {
//       const userId = localStorage.getItem("userId");
//       if (!userId || !product?._id) return;

//       try {
//         const response = await axios.get(`http://localhost:4000/product/wishlist/${userId}`);
//         const wishlistItems = response.data?.wishlist || [];
//         if (wishlistItems.some(item => item._id === product._id)) {
//           setIsAddedToWishlist(true);
//         } else {
//           setIsAddedToWishlist(false);
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
//     updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;
//     localStorage.setItem('cartItems', JSON.stringify(updatedCart));
//     setCartItems(updatedCart);
//   };

//   const checkout = () => {
//     const singleItemCheckout = [
//       {
//         id: product?.id,
//         title: product?.title,
//         price: product?.price,
//         quantity: 1,
//         images: product?.images,
//       },
//     ];
//     const total = product?.price || 0;
//     navigate("/checkout", { state: { total, cartItems: singleItemCheckout } });
//   };

//   const backtohome = () => {
//     navigate("/");
//   };

//   const addToWishlist = async () => {
//     try {
//       const userId = localStorage.getItem("userId");
//       if (!userId || !product?._id) return;

//       await axios.post(`http://localhost:4000/product/wishlist/${userId}`, {
//         productId: product._id,
//       });

//       setIsAddedToWishlist(true);
//       alert('Product added to wishlist!');
//     } catch (error) {
//       console.error("Error adding to wishlist:", error);
//       alert('Failed to add product to wishlist');
//     }
//   };

//   // Handle navigation to recommended product
//   const handleRecommendedProductClick = (productId) => {
//     // Scroll to top before navigation
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     navigate(`/product/${productId}`);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <div className="flex flex-col items-center">
//           <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 mb-3"></div>
//           <p className="text-lg font-medium text-gray-700">Loading product...</p>
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

//   const cartCount = cartItems?.[id] || 0;
//   const originalPrice = Math.round(product?.price / (1 - product?.discountPercentage / 100));

//   // Function to render star ratings
//   const renderStars = (rating) => {
//     return (
//       <div className="flex">
//         {[...Array(5)].map((_, i) => (
//           i < Math.floor(rating) ? 
//             <BsStarFill key={i} className="text-yellow-400 text-sm" /> : 
//             <BsStar key={i} className="text-gray-300 text-sm" />
//         ))}
//         <span className="ml-1 text-xs text-gray-500">({rating})</span>
//       </div>
//     );
//   };

//   // Function to render trusted badge
//   const renderTrustedBadge = () => {
//     if (product?.trusted === 'Yes') {
//       return (
//         <div className="flex items-center bg-green-50 px-2 py-1 rounded-md">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//           </svg>
//           <span className="ml-1 text-xs font-medium text-green-700">Trusted Seller</span>
//         </div>
//       );
//     }
//     return null;
//   };

//   // Function to get proper image URL
//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return '';
//     // If the image path already includes http, return as is
//     if (imagePath.startsWith('http')) return imagePath;
//     // If it starts with a slash, prepend the base URL
//     if (imagePath.startsWith('/')) return `http://localhost:4000${imagePath}`;
//     // Otherwise, assume it needs both
//     return `http://localhost:4000/${imagePath}`;
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* Top Navigation */}
//       <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3 flex items-center">
//         <IoArrowBackCircleSharp
//           size={28}
//           onClick={backtohome}
//           className="text-gray-700 cursor-pointer hover:text-gray-900"
//         />
//         <h1 className="ml-4 text-lg font-medium truncate flex-1">
//           {product?.title}
//         </h1>
//         <div onClick={addToWishlist} className="cursor-pointer">
//           {isAddedToWishlist ? (
//             <AiFillHeart className="text-xl text-red-500" />
//           ) : (
//             <AiOutlineHeart className="text-xl text-gray-700 hover:text-red-500" />
//           )}
//         </div>
//       </div>

//       {/* Image Carousel */}
//       <div className="bg-white mb-2">
//         <div className="relative w-full h-72">
//           {selectedImage && (
//             <img
//               src={getImageUrl(selectedImage)}
//               alt="Product"
//               className="w-full h-full object-contain"
//               onError={(e) => {
//                 e.target.src = '/api/placeholder/300/300';
//               }}
//             />
//           )}
//         </div>

//         {product.images?.length > 1 && (
//           <div className="flex overflow-x-auto px-4 py-2 gap-2 no-scrollbar">
//             {product.images?.map((image, index) => (
//               <img
//                 key={index}
//                 src={getImageUrl(image)}
//                 alt={`Thumbnail ${index + 1}`}
//                 className={`w-16 h-16 object-contain border rounded cursor-pointer ${
//                   selectedImage === image ? 'border-blue-500' : 'border-gray-200'
//                 }`}
//                 onClick={() => setSelectedImage(image)}
//                 onError={(e) => {
//                   e.target.src = '/api/placeholder/64/64';
//                 }}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Product Info */}
//       {/* Product Info */}
//       <div className="bg-white px-4 py-3 mb-2">
//         <h1 className="text-lg font-medium text-gray-800">{product?.title}</h1>

//         <div className="flex items-baseline mt-1">
//           <span className="text-xl font-bold text-gray-900">₹{product?.price}</span>
//           {product?.discountPercentage > 0 && (
//             <>
//               <span className="ml-2 text-sm line-through text-gray-500">₹{originalPrice}</span>
//               <span className="ml-2 text-sm font-medium text-green-600">{product?.discountPercentage}% off</span>
//             </>
//           )}
//         </div>

//         {product?.rating && (
//           <div className="mt-2">
//             {renderStars(product.rating)}
//           </div>
//         )}

//         <div className="mt-2 flex items-center gap-2">
//           {product?.stock !== undefined && (
//             <div className="text-xs font-medium">
//               {product.stock > 0 ? (
//                 <span className="text-green-600">In Stock: {product.stock} items left</span>
//               ) : (
//                 <span className="text-red-600">Out of Stock</span>
//               )}
//             </div>
//           )}

//           {product?.availability && product.availability !== 'Available' && (
//             <div className="text-xs font-medium">
//               <span className={`px-2 py-1 rounded ${
//                 product.availability === 'Coming Soon' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
//               }`}>
//                 {product.availability}
//               </span>
//             </div>
//           )}
//         </div>

//         {renderTrustedBadge()}
//       </div>

//       {/* Tabs for Details/Reviews */}
//       <div className="bg-white mb-2">
//         <div className="flex border-b">
//           <button 
//             className={`flex-1 py-3 text-center text-sm font-medium ${
//               activeTab === 'details' 
//                 ? 'text-blue-500 border-b-2 border-blue-500' 
//                 : 'text-gray-600 hover:text-gray-800'
//             }`}
//             onClick={() => setActiveTab('details')}
//           >
//             Details
//           </button>
//           <button 
//             className={`flex-1 py-3 text-center text-sm font-medium ${
//               activeTab === 'reviews' 
//                 ? 'text-blue-500 border-b-2 border-blue-500' 
//                 : 'text-gray-600 hover:text-gray-800'
//             }`}
//             onClick={() => setActiveTab('reviews')}
//           >
//             Reviews ({product.reviews?.length || 0})
//           </button>
//         </div>

//         <div className="p-4">
//           {activeTab === 'details' ? (
//             <>
//               <div className="mb-4">
//                 <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
//                 <p className="text-sm text-gray-700 leading-relaxed">
//                   {product?.description || "No description available."}
//                 </p>
//               </div>

//               <div className="grid grid-cols-2 gap-y-3 text-sm mb-4">
//                 <div>
//                   <span className="text-gray-500">Brand:</span>
//                   <span className="ml-1 text-gray-900">{product?.brand}</span>
//                 </div>
//                 <div>
//                   <span className="text-gray-500">Category:</span>
//                   <span className="ml-1 text-gray-900 capitalize">{product?.category}</span>
//                 </div>
//                 <div>
//                   <span className="text-gray-500">Seller:</span>
//                   <span className="ml-1 text-gray-900">{product?.sellerName || "N/A"}</span>
//                 </div>
//                 <div>
//                   <span className="text-gray-500">Warranty:</span>
//                   <span className="ml-1 text-gray-900">{product?.warrantyInformation || "N/A"}</span>
//                 </div>
//               </div>

//               {product?.shippingInformation && (
//                 <div className="mb-4">
//                   <h3 className="text-sm font-medium text-gray-500 mb-1">Shipping</h3>
//                   <p className="text-sm text-gray-700">{product.shippingInformation}</p>
//                 </div>
//               )}
//             </>
//           ) : (
//             <div className="space-y-4">
//               <div className="flex justify-between items-center mb-3">
//                 <h2 className="text-base font-medium text-gray-800">Customer Reviews</h2>
//                 <span className="text-sm text-gray-600">
//                   {product.reviews?.length || 0} {product.reviews?.length === 1 ? 'Review' : 'Reviews'}
//                 </span>
//               </div>

//               {/* Reviews Summary */}
//               {product.reviews?.length > 0 ? (
//                 <div className="bg-gray-50 p-3 rounded-lg mb-4">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <div className="flex items-center">
//                         <span className="text-xl font-bold text-gray-900">
//                           {product.rating?.toFixed(1) || '0.0'}
//                         </span>
//                         <span className="text-sm text-gray-600 ml-1">out of 5</span>
//                       </div>
//                       <div className="mt-1">
//                         {renderStars(product.rating || 0)}
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <span className="text-sm text-gray-600">Based on</span>
//                       <p className="text-sm font-medium text-gray-800">{product.reviews.length} reviews</p>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="bg-gray-50 p-4 rounded-lg text-center mb-4">
//                   <p className="text-sm text-gray-500">No reviews yet for this product.</p>
//                 </div>
//               )}

//               {/* Reviews List */}
//               <div className="space-y-4">
//                 {product.reviews?.length > 0 ? (
//                   <>
//                     {product.reviews.slice(0, showAllReviews ? product.reviews.length : 2).map((review, index) => (
//                       <div key={index} className="border rounded-lg p-3 bg-gray-50">
//                         <div className="flex justify-between items-center mb-2">
//                           <p className="font-medium text-gray-800">{review.reviewerName}</p>
//                           <p className="text-xs text-gray-500">{review.date}</p>
//                         </div>
//                         <div className="mb-2">
//                           {renderStars(review.rating)}
//                         </div>
//                         <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
//                       </div>
//                     ))}

//                     {product.reviews.length > 2 && !showAllReviews && (
//                       <button
//                         className="w-full py-2 bg-gray-100 text-sm font-medium text-blue-600 rounded hover:bg-gray-200"
//                         onClick={() => setShowAllReviews(true)}
//                       >
//                         Load More Reviews
//                       </button>
//                     )}

//                     {showAllReviews && (
//                       <button
//                         className="w-full py-2 bg-gray-100 text-sm font-medium text-blue-600 rounded hover:bg-gray-200"
//                         onClick={() => setShowAllReviews(false)}
//                       >
//                         Show Less
//                       </button>
//                     )}
//                   </>
//                 ) : null}
//               </div>

//               {/* Show All Reviews Button */}
//               {product.reviews?.length > 0 && (
//                 <button
//                   className="w-full mt-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 rounded hover:bg-gray-50"
//                   onClick={() => setShowSidebar(true)}
//                 >
//                   View All {product.reviews.length} Reviews
//                 </button>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Recommended Products */}
//       {recommendedProducts.length > 0 && (
//         <div className="bg-white p-4 mb-2">
//           <h2 className="text-base font-medium text-gray-800 mb-3">Recommended Products</h2>
//           <div className="grid grid-cols-2 gap-3">
//             {recommendedProducts.map((item) => (
//               <div
//                 key={item?._id || item?.id}
//                 className="bg-white shadow-sm border border-gray-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200"
//                 onClick={() => handleRecommendedProductClick(item?._id)}
//               >
//                 <div className="w-full h-32 bg-gray-50 flex items-center justify-center">
//                   <img
//                     src={getImageUrl(item?.images?.[0])}
//                     alt={item?.title || 'Product'}
//                     className="w-full h-full object-contain"
//                     onError={(e) => {
//                       e.target.src = '/api/placeholder/150/120';
//                     }}
//                   />
//                 </div>
//                 <div className="p-2">
//                   <p className="text-xs text-gray-800 font-medium truncate" title={item?.title}>
//                     {item?.title}
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1 capitalize">{item?.category}</p>
//                   <div className="flex items-center justify-between mt-1">
//                     <p className="text-sm font-bold text-gray-900">₹{item?.price}</p>
//                     {item?.rating && (
//                       <div className="flex items-center">
//                         <BsStarFill className="text-yellow-400 text-xs" />
//                         <span className="text-xs text-gray-500 ml-1">{item.rating?.toFixed(1)}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Action Buttons */}
//       <div className="bg-white mx-4 mb-20 mt-4 flex items-center p-2 rounded-lg shadow">
//         {product?.stock === 0 ? (
//           <button
//             className="w-full bg-gray-300 text-gray-500 py-3 rounded-md text-sm font-medium cursor-not-allowed"
//             disabled
//           >
//             OUT OF STOCK
//           </button>
//         ) : (
//           <>
//             {!cartCount ? (
//               <button
//                 className="flex-1 bg-white border border-blue-500 text-blue-500 py-3 rounded-md text-sm font-medium mr-2 hover:bg-blue-50 transition-colors duration-200"
//                 onClick={() => addToCart(id)}
//               >
//                 ADD TO CART
//               </button>
//             ) : (
//               <button className="flex-1 bg-white border border-gray-300 text-gray-400 py-3 rounded-md text-sm font-medium mr-2" disabled>
//                 ADDED TO CART ({cartCount})
//               </button>
//             )}
//             <button
//               onClick={checkout}
//               className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md text-sm font-medium transition-colors duration-200"
//             >
//               BUY NOW
//             </button>
//           </>
//         )}
//       </div>

//       {/* Reviews Sidebar */}
//       {showSidebar && (
//         <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
//           <div className="sticky top-0 bg-white shadow-sm p-4 flex items-center">
//             <button
//               className="text-gray-500 hover:text-gray-700"
//               onClick={() => setShowSidebar(false)}
//             >
//               <IoArrowBackCircleSharp size={24} />
//             </button>
//             <h2 className="ml-4 text-lg font-medium">All Reviews</h2>
//           </div>

//           <div className="p-4">
//             {product.reviews?.map((review, index) => (
//               <div key={index} className="mb-4 p-3 border-b border-gray-100 last:border-b-0">
//                 <div className="flex justify-between items-center mb-2">
//                   <p className="font-medium text-gray-800">{review?.reviewerName}</p>
//                   <p className="text-xs text-gray-500">{review?.date}</p>
//                 </div>
//                 <div className="mb-2">
//                   {renderStars(review?.rating)}
//                 </div>
//                 <p className="text-sm text-gray-600 leading-relaxed">{review?.comment}</p>
//               </div>
//             ))}

//             {product.reviews?.length === 0 && (
//               <div className="text-center py-8">
//                 <p className="text-gray-500">No reviews available for this product.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetail;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsStarFill, BsStar } from "react-icons/bs";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cartItems, setCartItems] = useState({});
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetail = async () => {
      setLoading(true); // Ensure loading state is set when ID changes
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

        // Reset tabs and states when product changes
        setActiveTab("details");
        setShowAllReviews(false);
        setShowSidebar(false);

        // Fetch recommended products
        if (productData.category) {
          fetchRecommendedProducts(productData.category, productData._id);
        }
      } catch (error) {
        console.error("Error fetching product detail:", error);
        setLoading(false);
      }
    };

    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    setCartItems(storedCartItems);
    fetchProductDetail();
  }, [id]); // This will re-run when ID changes

  const fetchRecommendedProducts = async (category, currentProductId) => {
    try {
      const response = await axios.get(`http://localhost:4000/products/category/${category}`);
      // Filter out current product and limit to 4 products
      const filtered = response.data.filter(item => item._id !== currentProductId).slice(0, 4);
      setRecommendedProducts(filtered);
    } catch (error) {
      console.error("Error fetching recommended products:", error);
    }
  };

  useEffect(() => {
    const checkIfInWishlist = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId || !product?._id) return;

      try {
        const response = await axios.get(`http://localhost:4000/product/wishlist/${userId}`);
        const wishlistItems = response.data?.wishlist || [];
        if (wishlistItems.some(item => item._id === product._id)) {
          setIsAddedToWishlist(true);
        } else {
          setIsAddedToWishlist(false);
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

  // Handle navigation to recommended product
  const handleRecommendedProductClick = (productId) => {
    // Scroll to top before navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 mb-3"></div>
          <p className="text-lg font-medium text-gray-700">Loading product...</p>
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
  const originalPrice = Math.round(product?.price / (1 - product?.discountPercentage / 100));

  // Function to render star ratings
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          i < Math.floor(rating) ?
            <BsStarFill key={i} className="text-yellow-400 text-sm" /> :
            <BsStar key={i} className="text-gray-300 text-sm" />
        ))}
        <span className="ml-1 text-xs text-gray-500">({rating})</span>
      </div>
    );
  };

  // Function to render trusted badge
  const renderTrustedBadge = () => {
    if (product?.trusted === 'Yes') {
      return (
        <div className="flex items-center bg-green-50 px-2 py-1 rounded-md mt-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="ml-1 text-xs font-medium text-green-700">Trusted Seller</span>
        </div>
      );
    }
    return null;
  };

  // Function to render availability badge
  const renderAvailabilityBadge = () => {
    if (product?.availability) {
      return (
        <div className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium">
          {product.availability}
        </div>
      );
    }
    return null;
  };

  // // Function to get proper image URL
  // const getImageUrl = (imagePath) => {
  //   if (!imagePath) return '';
  //   // If the image path already includes http, return as is
  //   if (imagePath.startsWith('http')) return imagePath;
  //   // If it starts with a slash, prepend the base URL
  //   if (imagePath.startsWith('/')) return `http://localhost:4000${imagePath}`;
  //   // Otherwise, assume it needs both
  //   return `http://localhost:4000/${imagePath}`;
  // };

  // Returns the full image URL based on the current environment (dev or prod)
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';

    // If the imagePath is already a full URL (http/https), return as is
    if (imagePath.startsWith('http')) return imagePath;

    // Determine if the app is running in production or local dev
    const isProd = window.location.hostname !== 'localhost';

    // Use appropriate base URL
    const baseUrl = isProd
      ? 'https://backendmystore.learnopedia.tech' // 🔴 Your live backend
      : 'http://localhost:4000'; // 🟢 Your local backend

    // Normalize the image path and return full URL
    return `${baseUrl}/${imagePath.replace(/^\/+/, '')}`;
  };


  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Navigation */}
      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3 flex items-center">
        <IoArrowBackCircleSharp
          size={28}
          onClick={backtohome}
          className="text-gray-700 cursor-pointer hover:text-gray-900"
        />
        <h1 className="ml-4 text-lg font-medium truncate flex-1">
          {product?.title}
        </h1>
        <div onClick={addToWishlist} className="cursor-pointer">
          {isAddedToWishlist ? (
            <AiFillHeart className="text-xl text-red-500" />
          ) : (
            <AiOutlineHeart className="text-xl text-gray-700 hover:text-red-500" />
          )}
        </div>
      </div>

      {/* Image Carousel */}
      {/* <div className="bg-white mb-2">
        <div className="relative w-full h-72">
          {selectedImage && (
            <img
              src={getImageUrl(selectedImage)}
              alt="Product"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.src = '/api/placeholder/300/300';
              }}
            />
          )}
        </div>
        
        {product.images?.length > 1 && (
          <div className="flex overflow-x-auto px-4 py-2 gap-2 no-scrollbar">
            {product.images?.map((image, index) => (
              <img
                key={index}
                src={getImageUrl(image)}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 object-contain border rounded cursor-pointer ${
                  selectedImage === image ? 'border-blue-500' : 'border-gray-200'
                }`}
                onClick={() => setSelectedImage(image)}
                onError={(e) => {
                  e.target.src = '/api/placeholder/64/64';
                }}
              />
            ))}
          </div>
        )}
      </div> */}

      {/* Image Carousel */}
<div className="bg-white mb-2">
  <div className="relative w-full h-60 flex justify-center items-center">
    {selectedImage && (
      <img
        src={getImageUrl(selectedImage)}
        alt="Product"
        className="max-h-56 object-contain"
        onError={(e) => {
          e.target.src = '/api/placeholder/300/300';
        }}
      />
    )}
  </div>

  {product.images?.length > 1 && (
    <div className="flex overflow-x-auto px-4 py-2 gap-2 no-scrollbar">
      {product.images?.map((image, index) => (
        <img
          key={index}
          src={getImageUrl(image)}
          alt={`Thumbnail ${index + 1}`}
          className={`w-16 h-16 object-contain border rounded cursor-pointer ${
            selectedImage === image ? 'border-blue-500' : 'border-gray-200'
          }`}
          onClick={() => setSelectedImage(image)}
          onError={(e) => {
            e.target.src = '/api/placeholder/64/64';
          }}
        />
      ))}
    </div>
  )}
</div>



      {/* Product Info */}
      <div className="bg-white px-4 py-3 mb-2">
        <h1 className="text-lg font-medium text-gray-800">{product?.title}</h1>

        <div className="flex items-baseline mt-1">
          <span className="text-xl font-bold text-gray-900">₹{product?.price}</span>
          {product?.discountPercentage > 0 && (
            <>
              <span className="ml-2 text-sm line-through text-gray-500">₹{originalPrice}</span>
              <span className="ml-2 text-sm font-medium text-green-600">{product?.discountPercentage}% off</span>
            </>
          )}
        </div>

        {product?.rating && (
          <div className="mt-2">
            {renderStars(product.rating)}
          </div>
        )}

        <div className="mt-2 flex items-center gap-2 flex-wrap">
          {product?.stock !== undefined && (
            <div className="text-xs font-medium">
              {product.stock > 0 ? (
                <span className="text-green-600">In Stock: {product.stock} items left</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </div>
          )}

          {/* Show availability badge */}
          {renderAvailabilityBadge()}
        </div>

        {/* Show trusted badge */}
        {renderTrustedBadge()}
      </div>

      {/* Tabs for Details/Reviews */}
      <div className="bg-white mb-2">
        <div className="flex border-b">
          <button
            className={`flex-1 py-3 text-center text-sm font-medium ${activeTab === 'details'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-600 hover:text-gray-800'
              }`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
          <button
            className={`flex-1 py-3 text-center text-sm font-medium ${activeTab === 'reviews'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-600 hover:text-gray-800'
              }`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({product.reviews?.length || 0})
          </button>
        </div>

        <div className="p-4">
          {activeTab === 'details' ? (
            <>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {product?.description || "No description available."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-y-3 text-sm mb-4">
                <div>
                  <span className="text-gray-500">Brand:</span>
                  <span className="ml-1 text-gray-900">{product?.brand}</span>
                </div>
                <div>
                  <span className="text-gray-500">Category:</span>
                  <span className="ml-1 text-gray-900 capitalize">{product?.category}</span>
                </div>
                <div>
                  <span className="text-gray-500">Seller:</span>
                  <span className="ml-1 text-gray-900">{product?.sellerName || "N/A"}</span>
                </div>
                <div>
                  <span className="text-gray-500">Warranty:</span>
                  <span className="ml-1 text-gray-900">{product?.warrantyInformation || "N/A"}</span>
                </div>
                <div>
                  <span className="text-gray-500">Availability:</span>
                  <span className="ml-1 text-gray-900">
                    {product?.availability || "N/A"}
                  </span>
                </div>
                {product?.trusted && (
                  <div>
                    <span className="text-gray-500">Trusted:</span>
                    <span className="ml-1 text-gray-900">
                      {product?.trusted}
                    </span>
                  </div>
                )}
              </div>

              {product?.shippingInformation && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Shipping</h3>
                  <p className="text-sm text-gray-700">{product.shippingInformation}</p>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-base font-medium text-gray-800">Customer Reviews</h2>
                <span className="text-sm text-gray-600">
                  {product.reviews?.length || 0} {product.reviews?.length === 1 ? 'Review' : 'Reviews'}
                </span>
              </div>

              {/* Reviews Summary */}
              {product.reviews?.length > 0 ? (
                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <span className="text-xl font-bold text-gray-900">
                          {product.rating?.toFixed(1) || '0.0'}
                        </span>
                        <span className="text-sm text-gray-600 ml-1">out of 5</span>
                      </div>
                      <div className="mt-1">
                        {renderStars(product.rating || 0)}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-600">Based on</span>
                      <p className="text-sm font-medium text-gray-800">{product.reviews.length} reviews</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg text-center mb-4">
                  <p className="text-sm text-gray-500">No reviews yet for this product.</p>
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {product.reviews?.length > 0 ? (
                  <>
                    {product.reviews.slice(0, showAllReviews ? product.reviews.length : 2).map((review, index) => (
                      <div key={index} className="border rounded-lg p-3 bg-gray-50">
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-medium text-gray-800">{review.reviewerName}</p>
                          <p className="text-xs text-gray-500">{review.date}</p>
                        </div>
                        <div className="mb-2">
                          {renderStars(review.rating)}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                      </div>
                    ))}

                    {product.reviews.length > 2 && !showAllReviews && (
                      <button
                        className="w-full py-2 bg-gray-100 text-sm font-medium text-blue-600 rounded hover:bg-gray-200"
                        onClick={() => setShowAllReviews(true)}
                      >
                        Load More Reviews
                      </button>
                    )}

                    {showAllReviews && (
                      <button
                        className="w-full py-2 bg-gray-100 text-sm font-medium text-blue-600 rounded hover:bg-gray-200"
                        onClick={() => setShowAllReviews(false)}
                      >
                        Show Less
                      </button>
                    )}
                  </>
                ) : null}
              </div>

              {/* Show All Reviews Button */}
              {product.reviews?.length > 0 && (
                <button
                  className="w-full mt-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 rounded hover:bg-gray-50"
                  onClick={() => setShowSidebar(true)}
                >
                  View All {product.reviews.length} Reviews
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <div className="bg-white p-4 mb-2">
          <h2 className="text-base font-medium text-gray-800 mb-3">Recommended Products</h2>
          <div className="grid grid-cols-2 gap-3">
            {recommendedProducts.map((item) => (
              <div
                key={item?._id || item?.id}
                className="bg-white shadow-sm border border-gray-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200"
                onClick={() => handleRecommendedProductClick(item?._id)}
              >
                <div className="w-full h-32 bg-gray-50 flex items-center justify-center">
                  <img
                    src={getImageUrl(item?.images?.[0])}
                    alt={item?.title || 'Product'}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src = '/api/placeholder/150/120';
                    }}
                  />
                </div>
                <div className="p-2">
                  <p className="text-xs text-gray-800 font-medium truncate" title={item?.title}>
                    {item?.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 capitalize">{item?.category}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm font-bold text-gray-900">₹{item?.price}</p>
                    {item?.rating && (
                      <div className="flex items-center">
                        <BsStarFill className="text-yellow-400 text-xs" />
                        <span className="text-xs text-gray-500 ml-1">{item.rating?.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="bg-white mx-4 mb-20 mt-4 flex items-center p-2 rounded-lg shadow">
        {product?.stock === 0 ? (
          <button
            className="w-full bg-gray-300 text-gray-500 py-3 rounded-md text-sm font-medium cursor-not-allowed"
            disabled
          >
            OUT OF STOCK
          </button>
        ) : (
          <>
            {!cartCount ? (
              <button
                className="flex-1 bg-white border border-blue-500 text-blue-500 py-3 rounded-md text-sm font-medium mr-2 hover:bg-blue-50 transition-colors duration-200"
                onClick={() => addToCart(id)}
              >
                ADD TO CART
              </button>
            ) : (
              <button className="flex-1 bg-white border border-gray-300 text-gray-400 py-3 rounded-md text-sm font-medium mr-2" disabled>
                ADDED TO CART ({cartCount})
              </button>
            )}
            <button
              onClick={checkout}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md text-sm font-medium transition-colors duration-200"
            >
              BUY NOW
            </button>
          </>
        )}
      </div>

      {/* Reviews Sidebar */}
      {showSidebar && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="sticky top-0 bg-white shadow-sm p-4 flex items-center">
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setShowSidebar(false)}
            >
              <IoArrowBackCircleSharp size={24} />
            </button>
            <h2 className="ml-4 text-lg font-medium">All Reviews</h2>
          </div>

          <div className="p-4">
            {product.reviews?.map((review, index) => (
              <div key={index} className="mb-4 p-3 border-b border-gray-100 last:border-b-0">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium text-gray-800">{review?.reviewerName}</p>
                  <p className="text-xs text-gray-500">{review?.date}</p>
                </div>
                <div className="mb-2">
                  {renderStars(review?.rating)}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{review?.comment}</p>
              </div>
            ))}

            {product.reviews?.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No reviews available for this product.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;