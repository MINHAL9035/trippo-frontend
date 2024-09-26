import NavBar from "@/components/admin/NavBar";
import Sidebar from "@/components/admin/Sidebar";
import React from "react";
import {
  IoPersonOutline,
  IoCartOutline,
  IoBarChartOutline,
  IoTrendingUpOutline,
} from "react-icons/io5";
import { IconType } from "react-icons/lib";

interface StatCardProps {
  title: string;
  value: string;
  icon: IconType;
  trend: number;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </p>
        <p className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
          {value}
        </p>
      </div>
      <Icon className="w-12 h-12 text-yellow-500" />
    </div>
    <p
      className={`mt-2 text-sm ${
        trend > 0 ? "text-green-500" : "text-red-500"
      }`}
    >
      {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% from last month
    </p>
  </div>
);

const Dashboard: React.FC = () => {
  const stats = [
    { title: "Total Users", value: "10,483", icon: IoPersonOutline, trend: 12 },
    { title: "Total Revenue", value: "$45,231", icon: IoCartOutline, trend: 8 },
    {
      title: "Active Trips",
      value: "1,324",
      icon: IoBarChartOutline,
      trend: -3,
    },
    {
      title: "User Growth",
      value: "+2.5%",
      icon: IoTrendingUpOutline,
      trend: 2.5,
    },
  ];
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        {/* Navbar */}
        <NavBar />
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="flex justify-between mb-6">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
              Dashboard
            </h1>
          </div>

          {/* Rest of the dashboard content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
