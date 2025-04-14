import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../Login'
import Users from './Users';
import Orders from './Orders';
import Products from './Products';
import Report from './Report';
import Partner from './Partner';
import { 
  Users as UsersIcon, 
  Package as PackageIcon, 
  Store as SellerIcon,
  ShoppingCart as OrdersIcon, 
  PieChart as ReportsIcon, 
  Handshake as PartnersIcon,
  Search as SearchIcon,
  Bell as BellIcon,
  User as UserIcon,
  Menu as MenuIcon,
  X as CloseIcon
} from 'lucide-react';
import Seller from './Seller';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('users');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { id: 'users', label: 'Users', icon: <UsersIcon size={18} /> },
    { id: 'partner', label: 'Partners', icon: <PartnersIcon size={18} /> },
    { id: 'seller', label: 'Sellers', icon: <SellerIcon size={18} /> },
    { id: 'orders', label: 'Orders', icon: <OrdersIcon size={18} /> },
    { id: 'products', label: 'Products', icon: <PackageIcon size={18} /> },
    { id: 'reports', label: 'Reports', icon: <ReportsIcon size={18} /> }
  ];

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button 
          onClick={toggleMobileSidebar} 
          className="p-2 bg-white rounded-md shadow-md"
        >
          {isMobileSidebarOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:block w-64 bg-white shadow-lg">
        <div className="h-full flex flex-col">
          <div className="p-5 border-b">
            <h1 className="text-xl font-bold text-blue-600">AdminPanel</h1>
          </div>
          
          <nav className="flex-grow p-5">
            <ul className="space-y-2">
              {navItems.map(item => (
                <li key={item.id}>
                  <button 
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center w-full p-3 rounded-lg text-sm font-medium transition-colors
                      ${activeSection === item.id 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                    {item.id === 'orders' && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        +
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-5 border-t mt-auto">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <UserIcon size={18} />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Admin User</p>
                <p className="text-xs text-gray-500">admin@company.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Sidebar - Mobile */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-20 lg:hidden">
          <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={toggleMobileSidebar}></div>
          <div className="absolute inset-y-0 left-0 w-64 bg-white shadow-lg z-30">
            <div className="h-full flex flex-col">
              <div className="p-5 border-b flex justify-between items-center">
                <h1 className="text-xl font-bold text-blue-600">AdminPanel</h1>
                <button onClick={toggleMobileSidebar}>
                  <CloseIcon size={20} />
                </button>
              </div>
              
              <nav className="flex-grow p-5">
                <ul className="space-y-2">
                  {navItems.map(item => (
                    <li key={item.id}>
                      <button 
                        onClick={() => {
                          setActiveSection(item.id);
                          setIsMobileSidebarOpen(false);
                        }}
                        className={`flex items-center w-full p-3 rounded-lg text-sm font-medium transition-colors
                          ${activeSection === item.id 
                            ? 'bg-blue-50 text-blue-600' 
                            : 'text-gray-600 hover:bg-gray-100'}`}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.label}
                        {item.id === 'orders' && (
                          <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            12
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
              
              <div className="p-5 border-t mt-auto">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <UserIcon size={18} />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">Admin User</p>
                    <p className="text-xs text-gray-500">admin@company.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Nav */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-900 lg:hidden">
                Dashboard
              </h1>
              
              <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="max-w-lg w-full lg:max-w-xs relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon size={16} className="text-gray-400" />
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white 
                      placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 
                      focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search..."
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <button className="p-2 mr-4 text-gray-400 hover:text-gray-500 relative">
                  <BellIcon size={20} />
                  {notifications > 0 && (
                    <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
                
                <div className="hidden sm:block">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      <UserIcon size={16} />
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">Admin</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          <div className="pb-5 border-b border-gray-200 mb-5 flex justify-between items-center">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
              {navItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
            </h2>
            <div className="flex space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Export
              </button>
          
            </div>
          </div>


          {/* Content Sections */}
          <div className="bg-white rounded-lg shadow">
            {activeSection === 'users' && <Users />}
            {activeSection === 'partner' && <Partner/>}
            {activeSection === 'seller' && <Seller/>}
            {activeSection === 'orders' && <Orders />}
            {activeSection === 'products' && <Products />}
            {activeSection === 'reports' && <Report />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;