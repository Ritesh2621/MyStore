import React, { useState, useEffect } from 'react';
import CategorySidebar from '../components/CategorySidebar';
import ProductPage from '../components/ProductPage';
import axios from 'axios';

const Home = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/product");
        console.log("Fetched products:", response.data); // Log products
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
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedPriceRanges={selectedPriceRanges}
        setSelectedPriceRanges={setSelectedPriceRanges}
        selectedRatings={selectedRatings}
        setSelectedRatings={setSelectedRatings}
        selectedDiscounts={selectedDiscounts}
        setSelectedDiscounts={setSelectedDiscounts}
      />
      <ProductPage
        selectedCategories={selectedCategories}
        selectedPriceRanges={selectedPriceRanges}
        selectedRatings={selectedRatings}
        selectedDiscounts={selectedDiscounts}
        products={products}
      />
    </div>
  );
};

export default Home;
