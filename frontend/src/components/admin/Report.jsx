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
  const [reports, setReports] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchReports();
  }, [selectedPeriod, selectedYear]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/admin/reports?period=${selectedPeriod}&year=${selectedYear}`);
      setReports(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reports:', error);
      setError('Failed to load reports. Please try again later.');
      setLoading(false);
    }
  };

  // Utility function to generate random colors
  const generateColors = (count) => {
    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', 
      '#FF9F40', '#8AC926', '#1982C4', '#6A4C93', '#FF595E',
      '#FFCA3A', '#8AC926', '#1982C4', '#6A4C93', '#FF595E'
    ];
    
    // If we need more colors than our predefined list, generate them
    if (count > colors.length) {
      for (let i = colors.length; i < count; i++) {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        colors.push(`rgba(${r}, ${g}, ${b}, 0.8)`);
      }
    }
    
    return colors.slice(0, count);
  };

  // Data configuration for various charts
  const getPieChartData = (data, labelKey) => {
    if (!data || !data.length) return { labels: [], datasets: [{ data: [] }] };
    
    const backgroundColors = generateColors(data.length);
    
    return {
      labels: data.map(item => item._id),
      datasets: [
        {
          label: labelKey,
          data: data.map(item => item.count),
          backgroundColor: backgroundColors,
          hoverBackgroundColor: backgroundColors.map(color => color.replace('0.8', '1')),
          borderWidth: 1,
          borderColor: '#fff',
        },
      ],
    };
  };

  const getRevenueData = () => {
    // Sample revenue data - replace with actual data from your API
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const revenueData = reports.revenueData || months.map(() => Math.floor(Math.random() * 10000));
    
    return {
      labels: months,
      datasets: [
        {
          label: 'Revenue',
          data: revenueData,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Target',
          data: months.map(() => 7500), // Example target line
          backgroundColor: 'transparent',
          borderColor: 'rgba(255, 99, 132, 0.8)',
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 0,
        }
      ],
    };
  };

  const getOrdersByStatusData = () => {
    const statuses = reports.orderStatusStats || [
      { _id: 'Pending', count: 45 },
      { _id: 'Processing', count: 30 },
      { _id: 'Shipped', count: 20 },
      { _id: 'Delivered', count: 85 },
      { _id: 'Cancelled', count: 10 }
    ];
    
    const backgroundColors = [
      'rgba(255, 206, 86, 0.8)',   // Yellow for Pending
      'rgba(54, 162, 235, 0.8)',   // Blue for Processing
      'rgba(75, 192, 192, 0.8)',   // Green-Blue for Shipped
      'rgba(75, 192, 75, 0.8)',    // Green for Delivered
      'rgba(255, 99, 132, 0.8)'    // Red for Cancelled
    ];

    return {
      labels: statuses.map(item => item._id),
      datasets: [
        {
          data: statuses.map(item => item.count),
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map(color => color.replace('0.8', '1')),
          borderWidth: 1,
        },
      ],
    };
  };

  const getOrdersByCategoryData = () => {
    // If actual data is available, use it, otherwise use sample data
    let categoryData = reports.orderCategoryStats || [];
    
    // If no data is available (even from API), use our predefined categories with sample data
    if (!categoryData.length) {
      categoryData = [
        { _id: 'Clothes', count: 135 },
        { _id: 'Jewellery', count: 87 },
        { _id: 'Home Furnishing', count: 76 },
        { _id: 'Beauty and Health Care', count: 95 },
        { _id: 'Electronics', count: 142 },
        { _id: 'Books', count: 56 },
        { _id: 'Toys', count: 43 }
      ];
    }
    
    // Sort data by count in descending order
    categoryData.sort((a, b) => b.count - a.count);
    
    const backgroundColors = generateColors(categoryData.length);
    
    return {
      labels: categoryData.map(item => item._id),
      datasets: [
        {
          data: categoryData.map(item => item.count),
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map(color => color.replace('0.8', '1')),
          borderWidth: 1,
        },
      ],
    };
  };

  const getTopProductsData = () => {
    const products = reports.topProducts || [
      { _id: 'Product A', count: 120 },
      { _id: 'Product B', count: 98 },
      { _id: 'Product C', count: 86 },
      { _id: 'Product D', count: 65 },
      { _id: 'Product E', count: 59 }
    ];
    
    // Sort products by count in descending order
    products.sort((a, b) => b.count - a.count);
    
    return {
      labels: products.map(item => item._id),
      datasets: [
        {
          label: 'Sales Count',
          data: products.map(item => item.count),
          backgroundColor: 'rgba(75, 192, 192, 0.8)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  // Revenue chart options
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Revenue'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 0
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '₹' + value.toLocaleString();
          }
        }
      }
    }
  };

  // Top products bar chart options
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Top Selling Products'
      }
    },
    scales: {
      x: {
        beginAtZero: true
      }
    }
  };

  // Pie chart options
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  // Calculate summary statistics
  const getSummaryStats = () => {
    // In a real application, these would come from your API
    return {
      totalOrders: reports.totalOrders || 354,
      totalRevenue: reports.totalRevenue || 285400,
      averageOrderValue: reports.averageOrderValue || 806.2,
      totalUsers: reports.totalUsers || 1245,
      conversionRate: reports.conversionRate || 3.2,
    };
  };

  const stats = getSummaryStats();

  // Display loading indicator
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  // Display error message
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
          
          {/* Period selector */}
          <div className="flex space-x-2">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[2023, 2024, 2025].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
            <div className="text-gray-500 text-sm">Total Orders</div>
            <div className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</div>
            <div className="text-green-500 text-sm flex items-center mt-1">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              8.5% vs last month
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
            <div className="text-gray-500 text-sm">Total Revenue</div>
            <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
            <div className="text-green-500 text-sm flex items-center mt-1">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              12.3% vs last month
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
            <div className="text-gray-500 text-sm">Avg. Order Value</div>
            <div className="text-2xl font-bold">₹{stats.averageOrderValue.toLocaleString()}</div>
            <div className="text-red-500 text-sm flex items-center mt-1">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
              2.1% vs last month
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
            <div className="text-gray-500 text-sm">Total Users</div>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <div className="text-green-500 text-sm flex items-center mt-1">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              5.7% vs last month
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
            <div className="text-gray-500 text-sm">Conversion Rate</div>
            <div className="text-2xl font-bold">{stats.conversionRate}%</div>
            <div className="text-green-500 text-sm flex items-center mt-1">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              0.8% vs last month
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Over Time */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="h-80">
              <Line data={getRevenueData()} options={lineOptions} />
            </div>
          </div>
          
          {/* Top Products */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="h-80">
              <Bar data={getTopProductsData()} options={barOptions} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders by Status */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-4 text-center">Orders by Status</h3>
            <div className="h-64">
              <Doughnut data={getOrdersByStatusData()} options={pieOptions} />
            </div>
          </div>
          
          {/* Orders by Category - MODIFIED */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-4 text-center">Orders by Category</h3>
            <div className="h-64">
              <Pie 
                data={getOrdersByCategoryData()} 
                options={pieOptions}
              />
            </div>
          </div>
          
          {/* User Statistics */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-4 text-center">User Demographics</h3>
            <div className="h-64">
              <PolarArea 
                data={getPieChartData(reports.userStats || [], 'User Statistics')}
                options={{
                  ...pieOptions,
                  plugins: {
                    ...pieOptions.plugins,
                    legend: {
                      ...pieOptions.plugins.legend,
                      position: 'bottom'
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;