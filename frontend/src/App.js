import React from "react";
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


function App() {
  const [activeSection, setActiveSection] = React.useState("all categories");

  return (
    <Router>
      <ScrollToTop>
      <Navbar setActiveSection={setActiveSection} />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/product/:id" element={<ProductDetail />} />
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
      </Routes>
    
      </ScrollToTop>
    </Router>
  );
}

export default App;