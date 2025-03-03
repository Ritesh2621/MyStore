import React, { useState, useEffect } from 'react';
import CategorySidebar from '../components/CategorySidebar';
import ProductPage from '../components/ProductPage';
import axios from 'axios';
import MenuBar from '../components/MenuBar';

const Home = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedSubsubcategory, setSelectedSubsubcategory] = useState(null); // New state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/product");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProducts();
  }, []);

  // Fetch products based on selected subsubcategory
  useEffect(() => {
    if (selectedSubsubcategory) {
      const fetchFilteredProducts = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/product/products-by-subsubcategory/${selectedSubsubcategory}`);
          setProducts(response.data);
        } catch (error) {
          console.error("Error fetching products for subsubcategory:", error);
        }
      };

      fetchFilteredProducts();
    }
  }, [selectedSubsubcategory]); // Runs when subsubcategory is selected

  return (
    <>
      <MenuBar setSelectedSubsubcategory={setSelectedSubsubcategory} />
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
    </>
  );
};

export default Home;
