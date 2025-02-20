import React, { useState, useEffect } from 'react';
import CategorySidebar from '../components/CategorySidebar';
import ProductPage from '../components/ProductPage';
import axios from 'axios';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [priceRange, setPriceRange] = useState("0-500");
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    // You can modify this to load products based on activeCategory if you have a local dataset or continue fetching from the API
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
      />
      <ProductPage
        activeCategory={activeCategory}
        priceRange={priceRange}
        products={products}
      />
    </div>
  );
};

export default Home;
