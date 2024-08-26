import Sidebar from "@/components/admin/Sidebar";
import ToggleTheme from "@/components/user/ToggleTheme";
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
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
              Dashboard
            </h1>
          </div>
          <div>
            <ToggleTheme />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Recent Bookings
            </h2>
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 dark:text-gray-400">
                  <th className="pb-3">User</th>
                  <th className="pb-3">Destination</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="py-3">John Doe</td>
                  <td className="py-3">Paris, France</td>
                  <td className="py-3">Aug 15, 2024</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="py-3">Jane Smith</td>
                  <td className="py-3">Tokyo, Japan</td>
                  <td className="py-3">Aug 18, 2024</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="py-3">Bob Johnson</td>
                  <td className="py-3">New York, USA</td>
                  <td className="py-3">Aug 20, 2024</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Popular Destinations
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-semibold mr-3">
                  1
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  Bali, Indonesia
                </span>
              </li>
              <li className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 font-semibold mr-3">
                  2
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  Santorini, Greece
                </span>
              </li>
              <li className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 font-semibold mr-3">
                  3
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  Machu Picchu, Peru
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
