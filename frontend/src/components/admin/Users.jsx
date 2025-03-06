import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Search as SearchIcon, 
  Trash2 as TrashIcon, 
  Edit as EditIcon, 
  Filter as FilterIcon,
  UserPlus as UserPlusIcon,
  RefreshCw as RefreshIcon,
  Download as DownloadIcon,
  MoreVertical as MoreIcon,
  X as CloseIcon,
  ShoppingBag as ShoppingBagIcon,
  Calendar as CalendarIcon,
  Package as PackageIcon,
  MapPin as MapPinIcon,
  DollarSign as DollarSignIcon,
  CheckCircle as CheckCircleIcon,
  Clock as ClockIcon,
  Truck as TruckIcon
} from 'lucide-react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [filterBy, setFilterBy] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [userOrders, setUserOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/admin/users/customers');
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users. Please try again later.');
      setLoading(false);
    }
  };

  const fetchUserOrders = async (userId) => {
    setLoadingOrders(true);
    try {
      const response = await axios.get(`http://localhost:4000/auth/history/${userId}`);
      setUserOrders(response.data);
      setLoadingOrders(false);
    } catch (error) {
      console.error('Error fetching user orders:', error);
      setUserOrders([]);
      setLoadingOrders(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:4000/admin/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter(user => user._id !== userId));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete the user. Please try again later.');
    }
  };

  const confirmDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const viewUserDetails = async (user) => {
    setSelectedUser(user);
    await fetchUserOrders(user._id);
    setShowUserDetailsModal(true);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = React.useMemo(() => {
    const sortableUsers = [...users];
    if (sortConfig.key) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  const filteredUsers = sortedUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    
    if (filterBy === 'all') return matchesSearch;
    return matchesSearch && user.role === filterBy;
  });

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕';
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  const exportUserData = () => {
    const csvData = [
      ['Name', 'Email', 'Phone', 'Role'],
      ...filteredUsers.map(user => [
        user.name,
        user.email,
        user.phone,
        user.role
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'users.csv');
    a.click();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getOrderStatusBadge = (status) => {
    const statusStyles = {
      'delivered': 'bg-green-100 text-green-800',
      'shipped': 'bg-blue-100 text-blue-800',
      'processing': 'bg-yellow-100 text-yellow-800',
      'cancelled': 'bg-red-100 text-red-800',
      'pending': 'bg-gray-100 text-gray-800'
    };
    
    const statusIcons = {
      'delivered': <CheckCircleIcon size={14} className="mr-1" />,
      'shipped': <TruckIcon size={14} className="mr-1" />,
      'processing': <ClockIcon size={14} className="mr-1" />,
      'cancelled': <CloseIcon size={14} className="mr-1" />,
      'pending': <ClockIcon size={14} className="mr-1" />
    };
    
    return (
      <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
        {statusIcons[status] || null}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users by name, email, or phone..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2 w-full sm:w-auto">
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="user">Users</option>
                <option value="admin">Admins</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <FilterIcon size={16} className="text-gray-400" />
              </div>
            </div>
            
            <button 
              onClick={fetchUsers} 
              className="p-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Refresh"
            >
              <RefreshIcon size={16} className="text-gray-600" />
            </button>
            
            <button 
              onClick={exportUserData} 
              className="p-2 border bg-green-400 border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Export"
            >
              <DownloadIcon size={16} className="text-black font-extrabold" />
            </button>
            
            <button 
              className="p-2 bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-1"
            >
              <UserPlusIcon size={16} />
              <span className="hidden sm:inline">Add User</span>
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <CloseIcon className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center">
                        Name <span className="ml-1">{getSortIcon('name')}</span>
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('email')}
                    >
                      <div className="flex items-center">
                        Email <span className="ml-1">{getSortIcon('email')}</span>
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('phone')}
                    >
                      <div className="flex items-center">
                        Phone <span className="ml-1">{getSortIcon('phone')}</span>
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('role')}
                    >
                      <div className="flex items-center">
                        Role <span className="ml-1">{getSortIcon('role')}</span>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                        No users found matching your search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                              {user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button 
                              onClick={() => viewUserDetails(user)} 
                              className="text-blue-600 hover:text-blue-900 p-1"
                              title="View Details"
                            >
                              <MoreIcon size={16} />
                            </button>
                            <button 
                              className="text-gray-600 hover:text-gray-900 p-1"
                              title="Edit User"
                            >
                              <EditIcon size={16} />
                            </button>
                            <button 
                              onClick={() => confirmDelete(user)} 
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Delete User"
                            >
                              <TrashIcon size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{filteredUsers.length}</span> of <span className="font-medium">{users.length}</span> users
              </div>
              <div className="flex space-x-2">
                <button 
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium text-gray-700"
                  disabled={true}
                >
                  Previous
                </button>
                <button 
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium text-gray-700"
                  disabled={true}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <TrashIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900">Delete User</h3>
              <p className="mt-2 text-sm text-gray-500">
                Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
              </p>
            </div>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={() => handleDeleteUser(selectedUser?._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal with Order History */}
      {showUserDetailsModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900">User Profile & Orders</h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowUserDetailsModal(false)}
              >
                <CloseIcon size={20} />
              </button>
            </div>
            
            <div className="mt-4">
              {/* User Profile Section */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                    {selectedUser.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-medium text-gray-900">{selectedUser.name}</h4>
                    <p className="text-sm text-gray-500">{selectedUser.role}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h5 className="text-xs font-medium text-gray-500 uppercase mb-2">Contact Information</h5>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-sm font-medium">{selectedUser.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="text-sm font-medium">{selectedUser.phone}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h5 className="text-xs font-medium text-gray-500 uppercase mb-2">Account Information</h5>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-500">User ID</p>
                        <p className="text-sm font-medium truncate">{selectedUser._id}</p>
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>

              {/* Order History Section */}
              <div>
                <div className="flex items-center mb-4">
                  <ShoppingBagIcon size={20} className="text-gray-500 mr-2" />
                  <h4 className="text-lg font-medium text-gray-900">Order History</h4>
                </div>
                
                {loadingOrders ? (
                  <div className="flex justify-center items-center h-24">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : userOrders.length === 0 ? (
                  <div className="bg-gray-50 rounded-md p-6 text-center">
                    <ShoppingBagIcon size={32} className="text-gray-400 mx-auto mb-2" />
                    <h5 className="text-gray-500 mb-1">No Orders Found</h5>
                    <p className="text-sm text-gray-400">This user hasn't placed any orders yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userOrders.map((order) => (
                      <div key={order._id.$oid} className="border border-gray-200 rounded-lg overflow-hidden">
                        {/* Order Header */}
                        <div className="bg-gray-50 p-4 border-b border-gray-200">
                          <div className="flex flex-wrap justify-between items-center">
                            <div className="flex items-center mb-2 md:mb-0">
                              <span className="font-semibold text-sm mr-2">Order #</span>
                              <span className="text-sm">{order.tokenNumber || 'N/A'}</span>
                            </div>
                            <div className="flex items-center">
                              <CalendarIcon size={14} className="text-gray-500 mr-1" />
                              <span className="text-sm text-gray-500 mr-3">
                                {formatDate(order.orderDate)}
                              </span>
                              {getOrderStatusBadge(order.orderStatus)}
                            </div>
                          </div>
                        </div>
                        
                        {/* Order Products */}
                        <div className="p-4">
                          <h6 className="text-xs font-medium text-gray-500 uppercase mb-3">Products</h6>
                          <div className="space-y-3">
                            {order.products.map((product, index) => (
                              <div key={index} className="flex flex-col md:flex-row md:items-center p-3 bg-gray-50 rounded-md">
                                {/* <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded flex items-center justify-center mb-2 md:mb-0 md:mr-4">
                                  {product.imageUrl ? (
                                    <img src={product.imageUrl[0]} alt={product.title} className="w-full h-full object-cover rounded" />
                                  ) : (
                                    <PackageIcon size={24} className="text-gray-400" />
                                  )}
                                </div> */}
                                <div className="flex-grow">
                                  <h5 className="font-medium text-sm">{product.title}</h5>
                                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                                    <span>Qty: {product.quantity}</span>
                                    {product.size && <span>Size: {product.size}</span>}
                                    {product.seller && <span>Seller: {product.seller}</span>}
                                  </div>
                                </div>
                                <div className="mt-2 md:mt-0 font-medium text-sm">
                                  ${product.price}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Order Summary */}
                        <div className="bg-gray-50 p-4 border-t border-gray-200">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="flex items-center text-xs text-gray-500 mb-1">
                                <MapPinIcon size={12} className="mr-1" />
                                <span>
                                  {order.customer.city}, {order.customer.state}, {order.customer.country}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500">
                                {order.customer.address}, {order.customer.pincode}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center justify-end mb-1">
                                <DollarSignIcon size={14} className="text-gray-700 mr-1" />
                                <span className="font-semibold">${order.totalAmount.$numberDouble || order.totalAmount}</span>
                              </div>
                              <div className="text-xs text-gray-500">
                                {order.products.length} item{order.products.length !== 1 ? 's' : ''}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => setShowUserDetailsModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;