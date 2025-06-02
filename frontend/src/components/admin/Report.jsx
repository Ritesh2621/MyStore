// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { 
//   Chart as ChartJS, 
//   ArcElement, 
//   Tooltip, 
//   Legend, 
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   PointElement,
//   LineElement,
//   RadialLinearScale,
//   Filler
// } from 'chart.js';
// import { Pie, Bar, Line, Doughnut, PolarArea } from 'react-chartjs-2';

// // Register all required ChartJS elements
// ChartJS.register(
//   ArcElement, 
//   Tooltip, 
//   Legend, 
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   PointElement,
//   LineElement,
//   RadialLinearScale,
//   Filler
// );

// const Report = () => {
//   const [orders, setOrders] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedPeriod, setSelectedPeriod] = useState('monthly');
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [dashboardData, setDashboardData] = useState({
//     totalOrders: 0,
//     totalRevenue: 0,
//     averageOrderValue: 0,
//     totalUsers: 0,
//     conversionRate: 0,
//     revenueData: [],
//     orderStatusStats: [],
//     orderCategoryStats: [],
//     topProducts: [],
//     userStats: []
//   });

//   useEffect(() => {
//     fetchData();
//   }, [selectedPeriod, selectedYear]);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [ordersResponse, productsResponse] = await Promise.all([
//         axios.get('http://localhost:4000/order'),
//         axios.get('http://localhost:4000/product')
//       ]);
      
//       setOrders(ordersResponse.data);
//       setProducts(productsResponse.data);
      
//       // Process the data
//       processData(ordersResponse.data, productsResponse.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setError('Failed to load data. Please try again later.');
//       setLoading(false);
//     }
//   };

//   const processData = (orders, products) => {
//     // Filter orders based on selected period and year
//     const filteredOrders = filterOrdersByPeriodAndYear(orders, selectedPeriod, selectedYear);
    
//     // Calculate total orders
//     const totalOrders = filteredOrders.length;
    
//     // Calculate total revenue - using the totalAmount field from order
//     const totalRevenue = filteredOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    
//     // Calculate average order value
//     const averageOrderValue = totalOrders ? (totalRevenue / totalOrders) : 0;
    
//     // Get unique users
//     const uniqueUsers = [...new Set(filteredOrders.map(order => order.userOwner || order.customer?.email || 'Unknown'))];
//     const totalUsers = uniqueUsers.length;
    
//     // Assume a total site visitors (for conversion rate) - In a real app, this would come from analytics
//     const estimatedVisitors = totalUsers * 10; // Just a placeholder calculation
//     const conversionRate = estimatedVisitors ? ((totalOrders / estimatedVisitors) * 100).toFixed(1) : 0;
    
//     // Generate revenue data by month/period
//     const revenueData = generateRevenueData(filteredOrders, selectedPeriod);
    
//     // Generate order status statistics
//     const orderStatusStats = generateOrderStatusStats(filteredOrders);
    
//     // Generate order category statistics
//     const orderCategoryStats = generateOrderCategoryStats(filteredOrders, products);
    
//     // Generate top products
//     const topProducts = generateTopProductsStats(filteredOrders, products);
    
//     // Generate user statistics - by location (state)
//     const userStats = generateUserStats(filteredOrders);
    
//     setDashboardData({
//       totalOrders,
//       totalRevenue,
//       averageOrderValue,
//       totalUsers,
//       conversionRate,
//       revenueData,
//       orderStatusStats,
//       orderCategoryStats,
//       topProducts,
//       userStats
//     });
//   };

//   const filterOrdersByPeriodAndYear = (orders, period, year) => {
//     return orders.filter(order => {
//       // Use orderDate field for filtering
//       const orderDate = new Date(order.orderDate?.$date || order.orderDate);
//       const orderYear = orderDate.getFullYear();
      
//       if (orderYear !== year) return false;
      
//       if (period === 'yearly') return true;
      
//       if (period === 'monthly') {
//         return true;
//       }
      
//       if (period === 'weekly') {
//         // Get week number of the order
//         const orderWeek = getWeekNumber(orderDate);
//         const currentWeek = getWeekNumber(new Date());
//         return orderWeek === currentWeek;
//       }
      
//       if (period === 'daily') {
//         const today = new Date();
//         return orderDate.getDate() === today.getDate() &&
//                orderDate.getMonth() === today.getMonth();
//       }
      
//       return true;
//     });
//   };

//   const getWeekNumber = (date) => {
//     const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
//     const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
//     return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
//   };

//   const generateRevenueData = (orders, period) => {
//     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//     let revenueData = new Array(12).fill(0);
    
//     orders.forEach(order => {
//       const orderDate = new Date(order.orderDate?.$date || order.orderDate);
//       const month = orderDate.getMonth();
//       revenueData[month] += (order.totalAmount || 0);
//     });
    
//     // If period is not monthly, adjust the data structure
//     if (period === 'daily') {
//       // Get last 7 days
//       const dailyData = new Array(7).fill(0);
//       const today = new Date();
      
//       orders.forEach(order => {
//         const orderDate = new Date(order.orderDate?.$date || order.orderDate);
//         const dayDiff = Math.floor((today - orderDate) / (24 * 60 * 60 * 1000));
//         if (dayDiff >= 0 && dayDiff < 7) {
//           dailyData[6 - dayDiff] += (order.totalAmount || 0);
//         }
//       });
      
//       return dailyData;
//     }
    
//     return revenueData;
//   };

//   const generateOrderStatusStats = (orders) => {
//     const statusCounts = {};
    
//     orders.forEach(order => {
//       const status = order.orderStatus || 'Unknown';
//       statusCounts[status] = (statusCounts[status] || 0) + 1;
//     });
    
//     return Object.keys(statusCounts).map(status => ({
//       _id: status.charAt(0).toUpperCase() + status.slice(1),
//       count: statusCounts[status]
//     }));
//   };

//   const generateOrderCategoryStats = (orders, products) => {
//     // Create map of product titles to categories
//     const productMap = {};
//     products.forEach(product => {
//       productMap[product.title] = product.category;
//     });
    
//     const categoryCounts = {};
    
//     orders.forEach(order => {
//       if (order.products && Array.isArray(order.products)) {
//         order.products.forEach(item => {
//           const productTitle = item.title;
//           const category = productMap[productTitle] || 'Unknown';
//           const quantity = item.quantity || 1;
          
//           categoryCounts[category] = (categoryCounts[category] || 0) + quantity;
//         });
//       }
//     });
    
//     return Object.keys(categoryCounts).map(category => ({
//       _id: category,
//       count: categoryCounts[category]
//     }));
//   };

//   const generateTopProductsStats = (orders, products) => {
//     const productCounts = {};
    
//     orders.forEach(order => {
//       if (order.products && Array.isArray(order.products)) {
//         order.products.forEach(item => {
//           const productTitle = item.title;
//           const quantity = item.quantity || 1;
          
//           productCounts[productTitle] = (productCounts[productTitle] || 0) + quantity;
//         });
//       }
//     });
    
//     // Convert to array and sort
//     return Object.keys(productCounts)
//       .map(title => ({
//         _id: title,
//         count: productCounts[title]
//       }))
//       .sort((a, b) => b.count - a.count)
//       .slice(0, 5); // Get top 5
//   };

//   const generateUserStats = (orders) => {
//     // Count orders by state
//     const stateCounts = {};
    
//     orders.forEach(order => {
//       if (order.customer && order.customer.state) {
//         const state = order.customer.state;
//         stateCounts[state] = (stateCounts[state] || 0) + 1;
//       }
//     });
    
//     return Object.keys(stateCounts)
//       .map(state => ({
//         _id: state,
//         count: stateCounts[state]
//       }))
//       .sort((a, b) => b.count - a.count)
//       .slice(0, 5); // Get top 5 states
//   };

//   // Utility function to generate random colors
//   const generateColors = (count) => {
//     const colors = [
//       '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', 
//       '#FF9F40', '#8AC926', '#1982C4', '#6A4C93', '#FF595E',
//       '#FFCA3A', '#8AC926', '#1982C4', '#6A4C93', '#FF595E'
//     ];
    
//     return colors.slice(0, count);
//   };

//   // Data configuration for various charts
//   const getPieChartData = (data) => {
//     if (!data || !data.length) return { labels: [], datasets: [{ data: [] }] };
    
//     const backgroundColors = generateColors(data.length);
    
//     return {
//       labels: data.map(item => item._id),
//       datasets: [
//         {
//           data: data.map(item => item.count),
//           backgroundColor: backgroundColors,
//           hoverBackgroundColor: backgroundColors,
//           borderWidth: 1,
//         },
//       ],
//     };
//   };

//   const getRevenueData = () => {
//     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//     let labels = months;
    
//     if (selectedPeriod === 'daily') {
//       // Last 7 days
//       labels = [];
//       const today = new Date();
//       for (let i = 6; i >= 0; i--) {
//         const date = new Date(today);
//         date.setDate(today.getDate() - i);
//         labels.push(date.getDate() + ' ' + months[date.getMonth()]);
//       }
//     }
    
//     return {
//       labels: labels,
//       datasets: [
//         {
//           label: 'Revenue',
//           data: dashboardData.revenueData,
//           backgroundColor: 'rgba(54, 162, 235, 0.2)',
//           borderColor: 'rgba(54, 162, 235, 1)',
//           borderWidth: 2,
//           tension: 0.4,
//           fill: true,
//         },
//         {
//           label: 'Target',
//           data: labels.map(() => dashboardData.averageOrderValue * 10), // Example target line
//           backgroundColor: 'transparent',
//           borderColor: 'rgba(255, 99, 132, 0.8)',
//           borderWidth: 2,
//           borderDash: [5, 5],
//           pointRadius: 0,
//         }
//       ],
//     };
//   };

//   const getOrdersByStatusData = () => {
//     return getPieChartData(dashboardData.orderStatusStats);
//   };

//   const getOrdersByCategoryData = () => {
//     return getPieChartData(dashboardData.orderCategoryStats);
//   };

//   const getTopProductsData = () => {
//     const products = dashboardData.topProducts;
    
//     return {
//       labels: products.map(item => item._id),
//       datasets: [
//         {
//           label: 'Sales Count',
//           data: products.map(item => item.count),
//           backgroundColor: 'rgba(75, 192, 192, 0.8)',
//           borderColor: 'rgba(75, 192, 192, 1)',
//           borderWidth: 1,
//         },
//       ],
//     };
//   };

//   // Revenue chart options
//   const lineOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: `${selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} Revenue (${selectedYear})`
//       },
//       tooltip: {
//         callbacks: {
//           label: function(context) {
//             let label = context.dataset.label || '';
//             if (label) {
//               label += ': ';
//             }
//             if (context.parsed.y !== null) {
//               label += new Intl.NumberFormat('en-IN', {
//                 style: 'currency',
//                 currency: 'INR',
//                 minimumFractionDigits: 0
//               }).format(context.parsed.y);
//             }
//             return label;
//           }
//         }
//       }
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           callback: function(value) {
//             return '₹' + value.toLocaleString();
//           }
//         }
//       }
//     }
//   };

//   // Top products bar chart options
//   const barOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     indexAxis: 'y',
//     plugins: {
//       legend: {
//         display: false,
//       },
//       title: {
//         display: true,
//         text: 'Top Selling Products'
//       }
//     },
//     scales: {
//       x: {
//         beginAtZero: true
//       }
//     }
//   };

//   // Pie chart options
//   const pieOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'right',
//       },
//       tooltip: {
//         callbacks: {
//           label: function(context) {
//             const total = context.dataset.data.reduce((a, b) => a + b, 0);
//             const value = context.raw;
//             const percentage = ((value / total) * 100).toFixed(1);
//             return `${context.label}: ${value} (${percentage}%)`;
//           }
//         }
//       }
//     }
//   };

//   // Calculate month-over-month changes
//   const calculateMoMChange = (current, previous) => {
//     if (!previous) return 0;
//     return ((current - previous) / previous * 100).toFixed(1);
//   };

//   // Display loading indicator
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
//       </div>
//     );
//   }

//   // Display error message
//   if (error) {
//     return (
//       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//         <strong className="font-bold">Error: </strong>
//         <span className="block sm:inline">{error}</span>
//       </div>
//     );
//   }

//   // For demo purposes, calculate some month-over-month changes
//   const ordersMoM = calculateMoMChange(dashboardData.totalOrders, dashboardData.totalOrders * 0.92);
//   const revenueMoM = calculateMoMChange(dashboardData.totalRevenue, dashboardData.totalRevenue * 0.89);
//   const aovMoM = calculateMoMChange(dashboardData.averageOrderValue, dashboardData.averageOrderValue * 1.02);
//   const usersMoM = calculateMoMChange(dashboardData.totalUsers, dashboardData.totalUsers * 0.95);
//   const conversionMoM = calculateMoMChange(dashboardData.conversionRate, dashboardData.conversionRate * 0.98);

//   return (
//     <div className="container mx-auto p-4">
//       <div className="bg-white rounded-lg shadow-lg p-6">
//         <div className="flex flex-col md:flex-row justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">E-commerce Analytics Dashboard</h1>
          
//           {/* Period selector */}
//           <div className="flex flex-wrap space-x-2">
//             <select 
//               value={selectedPeriod}
//               onChange={(e) => setSelectedPeriod(e.target.value)}
//               className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="daily">Daily</option>
//               <option value="weekly">Weekly</option>
//               <option value="monthly">Monthly</option>
//               <option value="yearly">Yearly</option>
//             </select>
            
//             <select 
//               value={selectedYear}
//               onChange={(e) => setSelectedYear(parseInt(e.target.value))}
//               className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               {[2023, 2024, 2025].map(year => (
//                 <option key={year} value={year}>{year}</option>
//               ))}
//             </select>
            
//             <button 
//               onClick={fetchData}
//               className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               Refresh
//             </button>
//           </div>
//         </div>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
//           <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
//             <div className="text-gray-500 text-sm">Total Orders</div>
//             <div className="text-2xl font-bold">{dashboardData.totalOrders.toLocaleString()}</div>
//             <div className={`text-sm flex items-center mt-1 ${parseFloat(ordersMoM) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//               <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={parseFloat(ordersMoM) >= 0 ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"}></path>
//               </svg>
//               {Math.abs(ordersMoM)}% vs last month
//             </div>
//           </div>
          
//           <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
//             <div className="text-gray-500 text-sm">Total Revenue</div>
//             <div className="text-2xl font-bold">₹{dashboardData.totalRevenue.toLocaleString(undefined, {maximumFractionDigits: 2})}</div>
//             <div className={`text-sm flex items-center mt-1 ${parseFloat(revenueMoM) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//               <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={parseFloat(revenueMoM) >= 0 ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"}></path>
//               </svg>
//               {Math.abs(revenueMoM)}% vs last month
//             </div>
//           </div>
          
//           <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
//             <div className="text-gray-500 text-sm">Avg. Order Value</div>
//             <div className="text-2xl font-bold">₹{dashboardData.averageOrderValue.toLocaleString(undefined, {maximumFractionDigits: 2})}</div>
//             <div className={`text-sm flex items-center mt-1 ${parseFloat(aovMoM) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//               <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={parseFloat(aovMoM) >= 0 ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"}></path>
//               </svg>
//               {Math.abs(aovMoM)}% vs last month
//             </div>
//           </div>
          
//           <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
//             <div className="text-gray-500 text-sm">Total Customers</div>
//             <div className="text-2xl font-bold">{dashboardData.totalUsers.toLocaleString()}</div>
//             <div className={`text-sm flex items-center mt-1 ${parseFloat(usersMoM) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//               <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={parseFloat(usersMoM) >= 0 ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"}></path>
//               </svg>
//               {Math.abs(usersMoM)}% vs last month
//             </div>
//           </div>
          
//           <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
//             <div className="text-gray-500 text-sm">Conversion Rate</div>
//             <div className="text-2xl font-bold">{dashboardData.conversionRate}%</div>
//             <div className={`text-sm flex items-center mt-1 ${parseFloat(conversionMoM) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//               <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={parseFloat(conversionMoM) >= 0 ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"}></path>
//               </svg>
//               {Math.abs(conversionMoM)}% vs last month
//             </div>
//           </div>
//         </div>

//         {/* Charts Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
       
//           <div className="bg-white rounded-lg shadow p-4">
//             <div className="h-80">
//               <Line data={getRevenueData()} options={lineOptions} />
//             </div>
//           </div>
          
         
//           <div className="bg-white rounded-lg shadow p-4">
//             <div className="h-80">
//               <Bar data={getTopProductsData()} options={barOptions} />
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
     
//           <div className="bg-white rounded-lg shadow p-4">
//             <h3 className="text-lg font-semibold mb-4 text-center">Orders by Status</h3>
//             <div className="h-64">
//               <Doughnut data={getOrdersByStatusData()} options={pieOptions} />
//             </div>
//           </div>
          
       
//           <div className="bg-white rounded-lg shadow p-4">
//             <h3 className="text-lg font-semibold mb-4 text-center">Orders by Category</h3>
//             <div className="h-64">
//               <Pie 
//                 data={getOrdersByCategoryData()} 
//                 options={pieOptions}
//               />
//             </div>
//           </div>
          

//           <div className="bg-white rounded-lg shadow p-4">
//             <h3 className="text-lg font-semibold mb-4 text-center">Top Customer Locations</h3>
//             <div className="h-64">
//               <PolarArea 
//                 data={getPieChartData(dashboardData.userStats)}
//                 options={{
//                   ...pieOptions,
//                   plugins: {
//                     ...pieOptions.plugins,
//                     legend: {
//                       ...pieOptions.plugins.legend,
//                       position: 'bottom'
//                     }
//                   }
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Report;

// mobile view 

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler
} from 'chart.js';
import { Pie, Bar, Line, Doughnut, PolarArea } from 'react-chartjs-2';

// Register all required ChartJS elements
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler
);

const Report = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    totalUsers: 0,
    conversionRate: 0,
    revenueData: [],
    orderStatusStats: [],
    orderCategoryStats: [],
    topProducts: [],
    userStats: []
  });

  useEffect(() => {
    fetchData();
  }, [selectedPeriod, selectedYear]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersResponse, productsResponse] = await Promise.all([
        axios.get('http://localhost:4000/order'),
        axios.get('http://localhost:4000/product')
      ]);

      setOrders(ordersResponse.data);
      setProducts(productsResponse.data);
      processData(ordersResponse.data, productsResponse.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data. Please try again later.');
      setLoading(false);
    }
  };

  const processData = (orders, products) => {
    const filteredOrders = filterOrdersByPeriodAndYear(orders, selectedPeriod, selectedYear);
    const totalOrders = filteredOrders.length;
    const totalRevenue = filteredOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const averageOrderValue = totalOrders ? (totalRevenue / totalOrders) : 0;
    const uniqueUsers = [...new Set(filteredOrders.map(order => order.userOwner || order.customer?.email || 'Unknown'))];
    const totalUsers = uniqueUsers.length;
    const estimatedVisitors = totalUsers * 10;
    const conversionRate = estimatedVisitors ? ((totalOrders / estimatedVisitors) * 100).toFixed(1) : 0;
    const revenueData = generateRevenueData(filteredOrders, selectedPeriod);
    const orderStatusStats = generateOrderStatusStats(filteredOrders);
    const orderCategoryStats = generateOrderCategoryStats(filteredOrders, products);
    const topProducts = generateTopProductsStats(filteredOrders, products);
    const userStats = generateUserStats(filteredOrders);

    setDashboardData({
      totalOrders,
      totalRevenue,
      averageOrderValue,
      totalUsers,
      conversionRate,
      revenueData,
      orderStatusStats,
      orderCategoryStats,
      topProducts,
      userStats
    });
  };

  const filterOrdersByPeriodAndYear = (orders, period, year) => {
    return orders.filter(order => {
      const orderDate = new Date(order.orderDate?.$date || order.orderDate);
      const orderYear = orderDate.getFullYear();
      if (orderYear !== year) return false;
      if (period === 'yearly' || period === 'monthly') return true;
      if (period === 'weekly') {
        const orderWeek = getWeekNumber(orderDate);
        const currentWeek = getWeekNumber(new Date());
        return orderWeek === currentWeek;
      }
      if (period === 'daily') {
        const today = new Date();
        return orderDate.getDate() === today.getDate() &&
               orderDate.getMonth() === today.getMonth();
      }
      return true;
    });
  };

  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const generateRevenueData = (orders, period) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let revenueData = new Array(12).fill(0);
    orders.forEach(order => {
      const orderDate = new Date(order.orderDate?.$date || order.orderDate);
      const month = orderDate.getMonth();
      revenueData[month] += (order.totalAmount || 0);
    });
    if (period === 'daily') {
      const dailyData = new Array(7).fill(0);
      const today = new Date();
      orders.forEach(order => {
        const orderDate = new Date(order.orderDate?.$date || order.orderDate);
        const dayDiff = Math.floor((today - orderDate) / (24 * 60 * 60 * 1000));
        if (dayDiff >= 0 && dayDiff < 7) {
          dailyData[6 - dayDiff] += (order.totalAmount || 0);
        }
      });
      return dailyData;
    }
    return revenueData;
  };

  const generateOrderStatusStats = (orders) => {
    const statusCounts = {};
    orders.forEach(order => {
      const status = order.orderStatus || 'Unknown';
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });
    return Object.keys(statusCounts).map(status => ({
      _id: status.charAt(0).toUpperCase() + status.slice(1),
      count: statusCounts[status]
    }));
  };

  const generateOrderCategoryStats = (orders, products) => {
    const productMap = {};
    products.forEach(product => {
      productMap[product.title] = product.category;
    });
    const categoryCounts = {};
    orders.forEach(order => {
      if (order.products && Array.isArray(order.products)) {
        order.products.forEach(item => {
          const productTitle = item.title;
          const category = productMap[productTitle] || 'Unknown';
          const quantity = item.quantity || 1;
          categoryCounts[category] = (categoryCounts[category] || 0) + quantity;
        });
      }
    });
    return Object.keys(categoryCounts).map(category => ({
      _id: category,
      count: categoryCounts[category]
    }));
  };

  const generateTopProductsStats = (orders, products) => {
    const productCounts = {};
    orders.forEach(order => {
      if (order.products && Array.isArray(order.products)) {
        order.products.forEach(item => {
          const productTitle = item.title;
          const quantity = item.quantity || 1;
          productCounts[productTitle] = (productCounts[productTitle] || 0) + quantity;
        });
      }
    });
    return Object.keys(productCounts).map(title => ({
      _id: title,
      count: productCounts[title]
    })).sort((a, b) => b.count - a.count).slice(0, 5);
  };

  const generateUserStats = (orders) => {
    const stateCounts = {};
    orders.forEach(order => {
      if (order.customer && order.customer.state) {
        const state = order.customer.state;
        stateCounts[state] = (stateCounts[state] || 0) + 1;
      }
    });
    return Object.keys(stateCounts).map(state => ({
      _id: state,
      count: stateCounts[state]
    })).sort((a, b) => b.count - a.count).slice(0, 5);
  };

  const generateColors = (count) => {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#8AC926', '#1982C4', '#6A4C93', '#FF595E'];
    return colors.slice(0, count);
  };

  const getPieChartData = (data) => {
    if (!data || !data.length) return { labels: [], datasets: [{ data: [] }] };
    const backgroundColors = generateColors(data.length);
    return {
      labels: data.map(item => item._id),
      datasets: [{
        data: data.map(item => item.count),
        backgroundColor: backgroundColors,
        hoverBackgroundColor: backgroundColors,
        borderWidth: 1,
      }],
    };
  };

  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial' }}>
      <h2 style={{ textAlign: 'center' }}>Dashboard Report</h2>

      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
        <div style={{
          display: 'grid',
          gap: '1rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
        }}>
          <div style={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '10px' }}>
            <h3>Total Orders: {dashboardData.totalOrders}</h3>
            <h3>Total Revenue: ${dashboardData.totalRevenue.toFixed(2)}</h3>
            <h3>Average Order Value: ${dashboardData.averageOrderValue.toFixed(2)}</h3>
            <h3>Total Users: {dashboardData.totalUsers}</h3>
            <h3>Conversion Rate: {dashboardData.conversionRate}%</h3>
          </div>

          <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '10px' }}>
            <h4>Order Status</h4>
            <Pie data={getPieChartData(dashboardData.orderStatusStats)} />
          </div>

          <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '10px' }}>
            <h4>Top Products</h4>
            <Bar data={getPieChartData(dashboardData.topProducts)} />
          </div>

          <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '10px' }}>
            <h4>Category Distribution</h4>
            <Doughnut data={getPieChartData(dashboardData.orderCategoryStats)} />
          </div>

          <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '10px' }}>
            <h4>User by State</h4>
            <PolarArea data={getPieChartData(dashboardData.userStats)} />
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          div[style*='grid'] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Report;
