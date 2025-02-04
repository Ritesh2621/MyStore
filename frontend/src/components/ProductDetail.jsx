import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/product/${id}`
        );
        setProduct(response.data);
        setSelectedImage(response.data.images[0]);
        setLoading(false);

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const isProductInCart = cart.some((item) => item.id === response.data.id);
        setIsInCart(isProductInCart);
      } catch (error) {
        console.error("Error fetching product detail:", error);
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);
    if (existingProductIndex === -1) {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      setIsInCart(true);
    }
  };

  const checkout = () => {
    const singleItemCheckout = [
      {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        images: product.images,
      },
    ];

    const total = product.price;

    navigate("/checkout", { state: { total, cartItems: singleItemCheckout } });
  };

  const backtohome =()=>{
    navigate("/");
  }

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
          <img
            src={selectedImage}
            alt="Main Product"
            className="w-full h-[500px] object-contain rounded-lg shadow-lg"
          />
  
          {product.images.length > 1 && (
            <div className="flex space-x-3 mt-4 overflow-x-auto">
              {product.images.slice(1).map((image, index) => (
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
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="text-xl font-semibold text-green-600 mt-2">
            ${product.price}{" "}
            <span className="line-through text-gray-500">
              ${Math.round(product.price / (1 - product.discountPercentage / 100))}
            </span>
          </p>
          <p className="text-sm text-gray-600 mt-1">{product.discountPercentage}% off</p>
          <p className="text-sm text-yellow-600 mt-4">
            Availability: {product.availabilityStatus}
          </p>
  
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-800">Product Description</h2>
            <p className="text-gray-700 text-sm">{product.description}</p>
          </div>
  
          <div className="flex space-x-4 my-4">
            <button
              onClick={addToCart}
              className={`${
                isInCart
                  ? "bg-green-500 text-white cursor-not-allowed"
                  : "bg-yellow-400 hover:bg-yellow-500 text-black"
              } px-6 py-2 rounded-lg font-semibold shadow-md`}
              disabled={isInCart}
            >
              {isInCart ? "Added to Cart" : "Add to Cart"}
            </button>
            <button
              onClick={checkout}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md"
            >
              Buy Now
            </button>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-lg text-gray-600 mb-3">
                <span className="font-semibold">Category:</span> {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </p>
              <p className="text-lg font-bold text-green-600 mb-3">
                <span className="font-semibold">Price:</span> ${product.price}
              </p>
              <p className="text-lg text-gray-600 mb-3">
                <span className="font-semibold">Discount:</span> {product.discountPercentage}%
              </p>
              <p className="text-lg text-gray-600 mb-3">
                <span className="font-semibold">Stock:</span> {product.stock > 0 ? `${product.stock} items` : "Out of stock"}
              </p>
              <p className="text-lg text-gray-600 mb-3">
                <span className="font-semibold">Brand:</span> {product.brand ? product.brand : "Data not available"}
              </p>
            </div>
  
      
          </div>
        </div>
      </div>
  
      {/* <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Reviews</h2>
        {product.reviews.length > 0 ? (
          <Slider {...settings}>
            {product.reviews.map((review, index) => (
              <div key={index} className="p-4 border rounded-lg mb-3">
                <p className="text-lg text-gray-600">
                  <span className="font-semibold">{review.reviewerName}</span> ({review.rating} ★)
                </p>
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-gray-600">No reviews available.</p>
        )}
      </div> */}
    </div>
  </div>
  
  );
};

export default ProductDetail;