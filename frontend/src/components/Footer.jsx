import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 px-4 mt-auto">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Shop</h3>
        <ul className="space-y-2">
          <li><a href="#" className="text-gray-300 hover:text-white">New Arrivals</a></li>
          <li><a href="#" className="text-gray-300 hover:text-white">Best Sellers</a></li>
          <li><a href="#" className="text-gray-300 hover:text-white">Sale</a></li>
          <li><a href="#" className="text-gray-300 hover:text-white">All Products</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-4">Support</h3>
        <ul className="space-y-2">
          <li><a href="#" className="text-gray-300 hover:text-white">Contact Us</a></li>
          <li><a href="#" className="text-gray-300 hover:text-white">FAQs</a></li>
          <li><a href="#" className="text-gray-300 hover:text-white">Shipping</a></li>
          <li><a href="#" className="text-gray-300 hover:text-white">Returns</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-4">Company</h3>
        <ul className="space-y-2">
          <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
          <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
          <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
          <li><a href="#" className="text-gray-300 hover:text-white">Press</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-4">Subscribe</h3>
        <p className="text-gray-300 mb-4">Get updates on new products and sales</p>
        <div className="flex">
          <input 
            type="email" 
            placeholder="Your email" 
            className="px-4 py-2 rounded-l-md w-full focus:outline-none text-gray-800"
          />
          <button className="bg-indigo-600 px-4 py-2 rounded-r-md hover:bg-indigo-700">
            Subscribe
          </button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
      <p>© {new Date().getFullYear()} Your Store. All rights reserved.</p>
    </div>
  </footer>
  )
}

export default Footer