import { useEffect, useState } from "react";
import { DollarSign, Calendar } from "lucide-react";
import SideBarComponent from "@/components/hotelDashboard/SideBarComponent";
import handleError from "@/utils/errorHandler";
import { getDashboardDetails } from "@/service/api/hotelOwner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

const OwnerDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [ownerDashboard, setOwnerDashboard] = useState();
  const { ownerInfo } = useSelector((state: RootState) => state.hotelOwner);
  console.log("hi", ownerInfo);

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
  console.log("sd", ownerDashboard);

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Total Bookings
                </h3>
                <Calendar className="text-blue-500" size={24} />
              </div>
              <p className="text-3xl font-bold text-blue-600">
                {ownerDashboard}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Total Revenue
                </h3>
                <DollarSign className="text-green-500" size={24} />
              </div>
              <p className="text-3xl font-bold text-green-600">₹89,750</p>
              <p className="text-sm text-gray-500 mt-2">+8% from last month</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OwnerDashboard;
