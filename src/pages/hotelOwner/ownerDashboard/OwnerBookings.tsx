import { useEffect, useState } from "react";
import SideBarComponent from "@/components/hotelDashboard/SideBarComponent";
import { Eye, Menu, CheckCircle, XCircle } from "lucide-react";
import BookingsTable from "./utils/BookingsTable";
import BookingCard from "./utils/BookingCard";
import handleError from "@/utils/errorHandler";
import { getBookings } from "@/service/api/hotelOwner";
import {
  BookingsState,
  IBookingDetails,
} from "@/interface/user/IBookingInterface";

const OwnerBookings = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "completed" | "cancelled">(
    "all"
  );
  const [bookings, setBookings] = useState<BookingsState>({
    all: [],
    completed: [],
    cancelled: [],
  });

  const getActiveBookings = () => {
    return bookings[activeTab] || bookings.all;
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookings();
        if (response?.status === 200) {
          const allBookings = response.data as IBookingDetails[];
          const completed = allBookings.filter(
            (booking) => booking.status === "completed"
          );
          const cancelled = allBookings.filter(
            (booking) => booking.status === "cancelled"
          );

          setBookings({
            all: allBookings,
            completed,
            cancelled,
          });
        }
      } catch (error) {
        handleError(error);
      }
    };
    fetchBookings();
  }, []);
  console.log("set", bookings);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for larger screens */}
      <div className="hidden md:block">
        <SideBarComponent collapsed={collapsed} />
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-64 bg-white">
            <SideBarComponent collapsed={false} />
          </div>
        </div>
      )}

      <div className="flex flex-col flex-1 w-full">
        {/* Header */}
        <nav className="bg-white shadow-sm p-4 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                if (window.innerWidth >= 768) {
                  setCollapsed(!collapsed);
                } else {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }
              }}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="text-xl font-semibold text-gray-800">Hotels</div>
            <div className="w-6" />
          </div>
        </nav>

        {/* Main content */}
        <div className="container mx-auto p-4 md:p-6 overflow-auto">
          {/* Tabs */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === "all"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Eye className="w-5 h-5 mr-2" />
              All Bookings
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === "completed"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Completed
            </button>
            <button
              onClick={() => setActiveTab("cancelled")}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === "cancelled"
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <XCircle className="w-5 h-5 mr-2" />
              Cancelled
            </button>
          </div>

          <div className="bg-white rounded-lg shadow">
            {/* Mobile view */}
            <div className="md:hidden space-y-4">
              {getActiveBookings().map((booking:IBookingDetails) => (
                <BookingCard key={booking._id}  booking={booking} />
              ))}
            </div>

            {/* Desktop view */}
            <BookingsTable bookings={getActiveBookings()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerBookings;
