// components/DashboardStats.jsx
import React from 'react';
import { Euro, ShoppingBag, Users, Package, Percent, TrendingUp, ChevronDown, UserPlus, Smartphone } from 'lucide-react';

const DashboardStats = ({ stats, orders }) => {
  const formatCurrency = (amount) => {
    if (isNaN(amount)) return '€0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-amber-100 text-amber-800 border-amber-200',
      confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
      preparing: 'bg-orange-100 text-orange-800 border-orange-200',
      ready: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'out-for-delivery': 'bg-purple-100 text-purple-800 border-purple-200',
      delivered: 'bg-gray-100 text-gray-800 border-gray-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Updated statCards array with Total Users
  const statCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.revenue.current),
      growth: `+${stats.revenue.growth}%`,
      icon: Euro,
      gradient: 'from-emerald-500 to-emerald-600',
      bgGradient: 'from-emerald-50 to-emerald-100',
      iconBg: 'bg-emerald-500',
    },
    {
      title: 'Total Orders',
      value: stats.orders.current.toLocaleString(),
      growth: `+${stats.orders.growth}%`,
      icon: ShoppingBag,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      iconBg: 'bg-blue-500',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers?.toLocaleString() || '0',
      growth: `+${stats.userGrowth || 0}%`,
      icon: Users,
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      iconBg: 'bg-purple-500',
      description: 'Total registered users',
    },
    {
      title: 'Active Customers',
      value: stats.customers.current.toLocaleString(),
      growth: `+${stats.customers.growth}%`,
      icon: UserPlus,
      gradient: 'from-indigo-500 to-indigo-600',
      bgGradient: 'from-indigo-50 to-indigo-100',
      iconBg: 'bg-indigo-500',
      description: 'Users with orders in last 30 days',
    },
    {
      title: 'Menu Items',
      value: stats.menuItems.current,
      growth: `${stats.menuItems.growth}% growth`,
      icon: Package,
      gradient: 'from-orange-500 to-orange-600',
      bgGradient: 'from-orange-50 to-orange-100',
      iconBg: 'bg-orange-500',
    },
    {
      title: 'Active Offers',
      value: stats.activeOffers.current,
      growth: `+${stats.activeOffers.growth}%`,
      icon: Percent,
      gradient: 'from-pink-500 to-rose-600',
      bgGradient: 'from-pink-50 to-rose-100',
      iconBg: 'bg-pink-500',
    },
  ];

  // Function to calculate user-related stats
  const calculateUserStats = () => {
    const totalUsers = stats.totalUsers || 0;
    const activeCustomers = stats.customers.current || 0;
    const userGrowth = stats.userGrowth || 0;
    
    return {
      totalUsers,
      activeCustomers,
      userGrowth,
      conversionRate: activeCustomers > 0 ? ((activeCustomers / totalUsers) * 100).toFixed(1) : 0
    };
  };

  const userStats = calculateUserStats();

  return (
    <div className="space-y-10">
      {/* Stats Cards - Updated grid for 6 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-10">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`relative p-6 rounded-2xl shadow-lg border-0 bg-gradient-to-br ${stat.bgGradient} hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden`}
          >
            <div className="relative flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 leading-none">{stat.value}</p>
                </div>
                <div className={`${stat.iconBg} p-3 rounded-xl shadow-md`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              
              {stat.description && (
                <p className="text-xs text-gray-500 mb-2">{stat.description}</p>
              )}
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-2 py-1 bg-white bg-opacity-70 rounded-full">
                  <TrendingUp className="w-3 h-3 text-emerald-600" />
                  <span className="text-xs font-semibold text-emerald-700">{stat.growth}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* User Insights Section */}
      <div className="bg-white rounded-3xl shadow-lg border-0 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">User Insights</h2>
            <p className="text-sm text-gray-600 mt-1">User acquisition and engagement metrics</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{userStats.conversionRate}%</div>
              <div className="text-xs text-gray-500">Conversion Rate</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-500 p-3 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Registered Users</p>
                <p className="text-2xl font-bold text-gray-900">{userStats.totalUsers.toLocaleString()}</p>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              All users who have created an account
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-green-500 p-3 rounded-xl">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Customers</p>
                <p className="text-2xl font-bold text-gray-900">{userStats.activeCustomers.toLocaleString()}</p>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              Users with orders in last 30 days
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-purple-500 p-3 rounded-xl">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">User Growth</p>
                <p className="text-2xl font-bold text-gray-900">+{userStats.userGrowth}%</p>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              Month-over-month user increase
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-3xl shadow-lg border-0 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
            <p className="text-sm text-gray-600 mt-1">Latest customer orders from your users</p>
          </div>
          <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center gap-2 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all">
            View All <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
          </button>
        </div>
        <div className="space-y-4">
          {orders.slice(0, 5).map((order) => (
            <div
              key={order._id}
              className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-2xl shadow-lg">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{order.orderNumber || `Order #${order._id?.slice(-6)}`}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                    <Users className="w-4 h-4" />
                    {order.userId?.fullName || order.customerName || 'User'}
                    <span className="text-xs text-gray-400">
                      (ID: {order.userId?._id?.slice(-6) || 'N/A'})
                    </span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-gray-900">{formatCurrency(order.total)}</p>
                <span
                  className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;