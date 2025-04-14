import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Search, ChevronDown, ChevronUp, ShoppingBag, Users, Package } from 'lucide-react';

// Dashboard layout component
const Seller = () => {
  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [sellerProducts, setSellerProducts] = useState([]);
  const [sellerOrders, setSellerOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    totalSellers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    const fetchSellers = async () => {
        try {
            console.log('Fetching sellers...');
            const response = await fetch('http://localhost:4000/admin/sellers', { method: 'GET', credentials: 'include' });
            const data = await response.json();
            console.log('Fetched data:', data);
            if (response.ok) {
                // Transform the data to include id property (mapped from _id)
                const transformedSellers = data.map(seller => ({
                    ...seller,
                    id: seller._id, // Add id property based on _id
                    productCount: 0, // Initialize with defaults if not present
                    orderCount: 0,
                    revenue: 0
                }));
                setSellers(transformedSellers);
                console.log("Updated sellers state:", transformedSellers);
            } else {
                setError(data.message || 'Failed to fetch sellers');
                console.error('Error:', data.message);
            }
        } catch (error) {
            setError('Failed to fetch sellers. Please try again.');
            console.error('Fetch error:', error);
        }
    };
    fetchSellers();
  }, []);

  // Calculate overall statistics when sellers are loaded
  useEffect(() => {
    if (sellers.length > 0) {
      const productCount = sellers.reduce((sum, seller) => sum + (seller.productCount || 0), 0);
      const orderCount = sellers.reduce((sum, seller) => sum + (seller.orderCount || 0), 0);
      const revenue = sellers.reduce((sum, seller) => sum + (seller.revenue || 0), 0);

      setStats({
        totalSellers: sellers.length,
        totalProducts: productCount,
        totalOrders: orderCount,
        totalRevenue: revenue
      });
    }
  }, [sellers]);

  // Fetch products for a specific seller
  const fetchSellerProducts = async (sellerId) => {
    if (!sellerId) return;
    
    try {
      setLoading(true);
      setError(null);
      // Log the sellerId being used
      console.log('Fetching products for seller ID:', sellerId);
      
      // Use the original _id from the seller object
      const response = await fetch(`http://localhost:4000/supplier/products-by-seller/${sellerId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Product response:', data);
      
      // Check if the data is an array directly
      if (Array.isArray(data)) {
        setSellerProducts(data);
      } 
      // Check if data.products exists and is an array
      else if (data.products && Array.isArray(data.products)) {
        setSellerProducts(data.products);
      }
      // Check if data has success property but products array is missing
      else if (data.success && !data.products) {
        setSellerProducts([]);
        console.warn('API returned success but no products array');
      } 
      // Handle unexpected response format
      else {
        console.error('Unexpected API response format:', data);
        setError('Received unexpected data format from server');
        setSellerProducts([]);
      }
    } catch (err) {
      console.error('Error fetching seller products:', err);
      setError(err.message || 'Failed to fetch seller products. Please try again.');
      setSellerProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders for a specific seller
  const fetchSellerOrders = async (sellerId) => {
    if (!sellerId) return;
    
    try {
      setLoading(true);
      setError(null);
      // Log the sellerId being used
      console.log('Fetching orders for seller ID:', sellerId);
      
      // Use the original _id from the seller object
      const response = await fetch(`http://localhost:4000/order/orders-by-seller/${sellerId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Orders response:', data);
      
      // Check if the data is an array directly
      if (Array.isArray(data)) {
        setSellerOrders(data);
      } 
      // Check if data.orders exists and is an array
      else if (data.orders && Array.isArray(data.orders)) {
        setSellerOrders(data.orders);
      }
      // Check if data has success property but orders array is missing
      else if (data.success && !data.orders) {
        setSellerOrders([]);
        console.warn('API returned success but no orders array');
      } 
      // Handle unexpected response format
      else {
        console.error('Unexpected API response format:', data);
        setError('Received unexpected data format from server');
        setSellerOrders([]);
      }
    } catch (err) {
      console.error('Error fetching seller orders:', err);
      setError(err.message || 'Failed to fetch seller orders. Please try again.');
      setSellerOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle seller selection
  const handleSellerSelect = (seller) => {
    setSelectedSeller(seller);
    // Use the _id property directly instead of the mapped id property
    const sellerIdToUse = seller._id || seller.id;
    console.log('Selected seller with ID:', sellerIdToUse);
    
    // Reset previous data before fetching new data
    setSellerProducts([]);
    setSellerOrders([]);
    
    fetchSellerProducts(sellerIdToUse);
    fetchSellerOrders(sellerIdToUse);
  };

  // Filter sellers based on search term
  const filteredSellers = sellers.filter(seller => 
    seller.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seller.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate chart data from actual sellers data
  const sellerPerformanceData = sellers.slice(0, 5).map(seller => ({
    name: seller.name,
    products: seller.productCount || 0,
    orders: seller.orderCount || 0
  }));

  // Format date function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold text-gray-800">Seller Dashboard</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4">
        {/* Error notification */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
            <button className="ml-4 font-bold" onClick={() => setError(null)}>✕</button>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Total Sellers" 
            value={stats.totalSellers} 
            icon={<Users className="h-8 w-8 text-blue-500" />}
            color="blue"
          />
          <StatCard 
            title="Total Products" 
            value={stats.totalProducts} 
            icon={<Package className="h-8 w-8 text-green-500" />}
            color="green"
          />
          <StatCard 
            title="Total Orders" 
            value={stats.totalOrders} 
            icon={<ShoppingBag className="h-8 w-8 text-purple-500" />}
            color="purple"
          />
          <StatCard 
            title="Total Revenue" 
            value={`₹${stats.totalRevenue.toLocaleString()}`} 
            icon={<span className="text-2xl text-yellow-500">₹</span>}
            color="yellow"
          />
        </div>

        {/* Seller Performance Chart */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">Top Seller Performance</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              {sellerPerformanceData.length > 0 ? (
                <BarChart
                  data={sellerPerformanceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="products" fill="#4ade80" name="Products" />
                  <Bar dataKey="orders" fill="#a78bfa" name="Orders" />
                </BarChart>
              ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-500">
                  No data available
                </div>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Seller List and Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Seller List */}
          <div className="bg-white p-4 rounded shadow lg:col-span-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Sellers List</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search sellers..."
                  className="pl-8 pr-4 py-2 border rounded"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            {loading && !sellers.length ? (
              <div className="text-center py-4">Loading sellers...</div>
            ) : (
              <div className="overflow-y-auto max-h-96">
                {filteredSellers.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">No sellers found</div>
                ) : (
                  filteredSellers.map((seller) => (
                    <div 
                      key={seller.id || seller._id} 
                      className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${(selectedSeller?.id === seller.id || selectedSeller?._id === seller._id) ? 'bg-blue-50' : ''}`}
                      onClick={() => handleSellerSelect(seller)}
                    >
                      <div className="font-medium">{seller.name}</div>
                      <div className="text-sm text-gray-500">{seller.email}</div>
                      <div className="text-xs mt-1">
                        <span className="mr-3">{seller.productCount || 0} products</span>
                        <span>{seller.orderCount || 0} orders</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Seller Details */}
          <div className="lg:col-span-2">
            {selectedSeller ? (
              <div>
                {/* Seller Info */}
                <div className="bg-white p-4 rounded shadow mb-6">
                  <h2 className="text-xl font-semibold mb-2">{selectedSeller.name}</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500">Email</p>
                      <p>{selectedSeller.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Phone</p>
                      <p>{selectedSeller.phone || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Joined</p>
                      <p>{new Date(selectedSeller.createdAt || Date.now()).toLocaleDateString() || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Status</p>
                      <p className="text-green-500">
                        Active
                      </p>
                    </div>
                  </div>
                </div>

                {/* Seller Products */}
                <ExpandableSection 
                  title="Products" 
                  count={sellerProducts.length}
                  loading={loading}
                >
                  {sellerProducts.length === 0 && !loading ? (
                    <div className="text-center py-4 text-gray-500">No products found for this seller</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sellerProducts.map((product) => (
                            <tr key={product._id || product.id} className="border-b">
                              <td className="px-4 py-2 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 bg-gray-200 rounded mr-3"></div>
                                  <div>{product.title}</div>
                                </div>
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap">₹{product.price}</td>
                              <td className="px-4 py-2 whitespace-nowrap">{product.category}</td>
                              <td className="px-4 py-2 whitespace-nowrap">{product.quantity || product.stock || 'N/A'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </ExpandableSection>

                {/* Seller Orders */}
                <ExpandableSection 
                  title="Orders" 
                  count={sellerOrders.length}
                  loading={loading}
                >
                  {sellerOrders.length === 0 && !loading ? (
                    <div className="text-center py-4 text-gray-500">No orders found for this seller</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Token Number</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sellerOrders.map((order) => (
                            <tr key={order._id || order.id} className="border-b">
                              <td className="px-4 py-2 whitespace-nowrap font-medium">
                                {order.tokenNumber || order.products?.tokenNumber || 'N/A'}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                {order.customer?.firstName || order.firstName || ''} {order.customer?.lastName || order.lastName || ''}
                                <div className="text-xs text-gray-500">
                                  {order.customer?.email || order.email || order.userOwner?.email || 'N/A'}
                                </div>
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                {formatDate(order.orderDate || order.date || order.createdAt || Date.now())}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                ₹{order.totalAmount?.toFixed(2) || order.amount?.toFixed(2) || '0.00'}
                              </td>
                              <td className="px-4 py-2">
                                {order.products && Array.isArray(order.products) ? (
                                  <div>
                                    {order.products.map((product, idx) => (
                                      <div key={idx} className="text-sm mb-1">
                                        {product.title || 'Product'} x{product.quantity || 1}
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <span>N/A</span>
                                )}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                <StatusBadge status={order.orderStatus || order.status || 'pending'} />
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                <button className="text-blue-600 hover:text-blue-800 text-sm">
                                  View Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </ExpandableSection>

                {/* Customer Details Modal - Could be implemented later */}
              </div>
            ) : (
              <div className="bg-white p-8 rounded shadow text-center">
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">Select a seller to view details</h3>
                <p className="text-gray-500">Click on any seller from the list to view their products and orders</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    blue: "border-blue-200 bg-blue-50",
    green: "border-green-200 bg-green-50",
    purple: "border-purple-200 bg-purple-50",
    yellow: "border-yellow-200 bg-yellow-50"
  };

  return (
    <div className={`border rounded-lg p-4 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div>
          {icon}
        </div>
      </div>
    </div>
  );
};

// Expandable Section Component
const ExpandableSection = ({ title, children, count, loading }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-white rounded shadow mb-6 overflow-hidden">
      <div 
        className="p-4 font-medium flex justify-between items-center cursor-pointer border-b"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <span>{title}</span>
          {count !== undefined && <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 rounded-full">{count}</span>}
        </div>
        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </div>
      
      {isExpanded && (
        <div className="p-4">
          {loading ? (
            <div className="text-center py-4">Loading data...</div>
          ) : (
            children
          )}
        </div>
      )}
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusStyles = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'processing': 'bg-blue-100 text-blue-800',
    'shipped': 'bg-purple-100 text-purple-800',
    'delivered': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800'
  };

  const style = statusStyles[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';

  return (
    <span className={`px-2 py-1 text-xs rounded ${style}`}>
      {status || 'Unknown'}
    </span>
  );
};

export default Seller;