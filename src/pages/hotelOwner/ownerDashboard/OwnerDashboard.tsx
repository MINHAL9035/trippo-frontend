import { useEffect, useState } from "react";
import { DollarSign, Calendar } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import SideBarComponent from "@/components/hotelDashboard/SideBarComponent";
import handleError from "@/utils/errorHandler";
import { getDashboardDetails } from "@/service/api/hotelOwner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

const OwnerDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [ownerDashboard, setOwnerDashboard] = useState({
    totalBookings: 0,
    completedBooking:0,
    cancelledBooking:0,
    totalRevenue: 0,
    monthlyRevenue: [],
    yearlyRevenue: [],
  });
  const { ownerInfo } = useSelector((state: RootState) => state.hotelOwner);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getDashboardDetails(ownerInfo.ownerId);
        if (response?.status === 200) {
          setOwnerDashboard(response?.data);
        }
      } catch (error) {
        handleError(error);
      }
    };
    fetchDashboard();
  }, [ownerInfo.ownerId]);

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
              Welcome back
            </h1>
            <p className="text-gray-600">
              Here's an overview of your hotel portfolio performance.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Total Bookings
                </h3>
                <Calendar className="text-blue-500" size={24} />
              </div>
              <p className="text-3xl font-bold text-blue-600">
                {ownerDashboard.totalBookings}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Completed Bookings
                </h3>
                <Calendar className="text-blue-500" size={24} />
              </div>
              <p className="text-3xl font-bold text-blue-600">
                {ownerDashboard.completedBooking}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Cancelled Bookings
                </h3>
                <Calendar className="text-blue-500" size={24} />
              </div>
              <p className="text-3xl font-bold text-blue-600">
                {ownerDashboard.cancelledBooking}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Total Revenue
                </h3>
                <DollarSign className="text-green-500" size={24} />
              </div>
              <p className="text-3xl font-bold text-green-600">
                ₹{ownerDashboard.totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Monthly Revenue Chart */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Monthly Revenue (Current Year)
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ownerDashboard.monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => `₹${value.toLocaleString()}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3B82F6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Yearly Revenue Chart */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Yearly Revenue
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ownerDashboard.yearlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => `₹${value.toLocaleString()}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10B981"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OwnerDashboard;
