import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./components/ProductPage.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import CartPage from "./components/CartPage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  const [activeSection, setActiveSection] = React.useState("all categories");
  return (
    <>
       <Router>
       <Navbar setActiveSection={setActiveSection} />
      <ScrollToTop>
    
      <Routes>
        <Route path="/" element={<ProductPage activeSection={activeSection} setActiveSection={setActiveSection} />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    
      </ScrollToTop>
    </Router>
    
    </>
  );
}

export default App;
