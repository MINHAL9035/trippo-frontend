import { useState } from "react";

import { DollarSign, Users, TrendingUp, Calendar } from "lucide-react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
import SideBarComponent from "@/components/hotelDashboard/SideBarComponent";

// const revenueData = [
//   { name: "Jan", revenue: 4000 },
//   { name: "Feb", revenue: 3000 },
//   { name: "Mar", revenue: 5000 },
//   { name: "Apr", revenue: 4500 },
//   { name: "May", revenue: 6000 },
//   { name: "Jun", revenue: 7000 },
// ];

const OwnerDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBarComponent collapsed={collapsed} />
      <div className="flex flex-col flex-1">
        <nav className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="text-xl font-semibold text-gray-800">Dashboard</div>
            <div className="flex items-center"></div>
          </div>
        </nav>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome back, John!
            </h1>
            <p className="text-gray-600">
              Here's an overview of your hotel portfolio performance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Total Bookings
                </h3>
                <Calendar className="text-blue-500" size={24} />
              </div>
              <p className="text-3xl font-bold text-blue-600">1,234</p>
              <p className="text-sm text-gray-500 mt-2">+12% from last month</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Total Revenue
                </h3>
                <DollarSign className="text-green-500" size={24} />
              </div>
              <p className="text-3xl font-bold text-green-600">$89,750</p>
              <p className="text-sm text-gray-500 mt-2">+8% from last month</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Occupancy Rate
                </h3>
                <Users className="text-purple-500" size={24} />
              </div>
              <p className="text-3xl font-bold text-purple-600">76%</p>
              <p className="text-sm text-gray-500 mt-2">+5% from last month</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Avg. Daily Rate
                </h3>
                <TrendingUp className="text-orange-500" size={24} />
              </div>
              <p className="text-3xl font-bold text-orange-600">$120</p>
              <p className="text-sm text-gray-500 mt-2">+3% from last month</p>
            </div>
          </div>
          {/* <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Revenue Overview
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div> */}
        </main>
      </div>
    </div>
  );
};

export default OwnerDashboard;
