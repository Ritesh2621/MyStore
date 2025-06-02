import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductPage from "./components/ProductPage";
import ProductDetail from "./components/ProductDetail";
import Navbar from "./components/Navbar";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import MyOrdersPage from "./components/MyOrdersPage";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Register from "./components/Register";
import CustomerProfile from "./components/CustomerProfile";
import Wishlist from "./components/Wishlist";
import UpdateTrack from "./components/UpdateTrack";
import PendingOrder from "./components/PendingOrder";
import Home from "./pages/Home";
import OrderInfo from "./components/OrderInfo";
import AdminDashboard from "./components/admin/AdminDashboard";
import Supplier from "./components/seller/Supplier";
import SupplierRegister from "./components/seller/SupplierRegistration";
import SupplierDashboard from "./components/seller/SupplierDashboard";
import EditProduct from "./components/admin/EditProduct";
import AdminAddProduct from "./components/admin/AdminAddProduct";
import MoreAbout from "./components/MoreAbout";
// import AboutUs from "./components/AboutUs";
import VisitForm from "./components/VisitForm";
import axios from "axios";

function App() {
  const [activeSection, setActiveSection] = useState("all categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  
  // Fetch all products once on app load
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

  return (
    <Router>
      <ScrollToTop>
        <Navbar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
        />
        
        <Routes>
          <Route path="/" element={
            <Home 
              searchQuery={searchQuery} 
              products={products}
            />
          } />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/products" element={
            <ProductPage 
              searchQuery={searchQuery}
              products={products}
              selectedCategories={[]}
              selectedPriceRanges={[]}
              selectedRatings={[]}
              selectedDiscounts={[]}
            />
          } />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<CustomerProfile />} />
          <Route path="/myorders" element={<MyOrdersPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/update-track" element={<UpdateTrack />} />
          <Route path="/pending-order" element={<PendingOrder />} />
          <Route path="/order/:orderId" element={<OrderInfo />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/supplier" element={<Supplier />} />
          <Route path="/supplier-registration" element={<SupplierRegister />} />
          <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
          <Route path="/admin/product/edit/:id" element={<EditProduct />} />
          <Route path="/admin/add" element={<AdminAddProduct />} />
          <Route path="/about" element={<MoreAbout />} />
            <Route path="/visit" element={<VisitForm />} />
          {/* <Route path="/aboutus" element={<AboutUs />} /> */}
          
        </Routes>

        <Footer/>
         <MoreAbout/>
      </ScrollToTop>
    </Router>
  );
}

export default App;