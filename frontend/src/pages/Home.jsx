import React, { useState, useEffect } from 'react';
import CategorySidebar from '../components/CategorySidebar';
import ProductPage from '../components/ProductPage';
import axios from 'axios';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [priceRange, setPriceRange] = useState("0-500");
  const [rating, setRating] = useState("All Ratings");
  const [discount, setDiscount] = useState("All Discounts");
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/product");  // Replace with actual endpoint
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    
    fetchProducts();
  }, []);
  
  return (
    <div className="flex">
      <CategorySidebar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        rating={rating}       // Pass rating state to CategorySidebar
        setRating={setRating} // Pass setRating function to CategorySidebar
        discount={discount}   // Pass discount state to CategorySidebar
        setDiscount={setDiscount} // Pass setDiscount function to CategorySidebar
      />
      <ProductPage
        activeCategory={activeCategory}
        priceRange={priceRange}
        rating={rating}
        discount={discount}
        products={products}
      />
    </div>
  );
};

export default Home;
