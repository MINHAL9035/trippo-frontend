import { useCallback, useEffect, useState } from "react";
import BookingDetailsView from "../profileNavs/BookingDetailsView ";
import Completed from "../profileNavs/Completed";
import Cancelled from "../profileNavs/Cancelled";
import Wallet, { WalletData } from "../profileNavs/Wallet";
import handleError from "@/utils/errorHandler";
import { BookingDetails } from "@/interface/user/ICompletedBooking";
import {
  getUserBookings,
  getUserCancelledBookings,
  getUserWallet,
} from "@/service/api/userProfileApi";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";

const ProfileBottom = () => {
  const [selectedBooking, setSelectedBooking] = useState<BookingDetails | null>(
    null
  );
  const [cancelledBooking, setCancelledBooking] = useState<BookingDetails[]>(
    []
  );
  const [completedBooking, setCompletedBooking] = useState<BookingDetails[]>(
    []
  );
  const [walletDetails, setWalletDetails] = useState<WalletData | null>(null);
  const [activeTab, setActiveTab] = useState("completed");
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const tabs = [
    { id: "completed", name: "Completed Bookings" },
    { id: "cancelled", name: "Cancelled Bookings" },
    { id: "wallet", name: "Wallet" },
    // { id: "trips", name: "Trips" },
    // { id: "account", name: "Account Info" },
  ];

  const fetchCompletedBookings = async () => {
    try {
      const response = await getUserBookings();
      if (response.status === 200) {
        setCompletedBooking(response.data);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const fetchCancelledBookings = async () => {
    try {
      const response = await getUserCancelledBookings();
      if (response.status === 200) {
        setCancelledBooking(response.data);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const fetchWallet = useCallback(async () => {
    try {
      const response = await getUserWallet(userInfo.userId);
      if (response.status === 200) {
        setWalletDetails(response.data);
      }
    } catch (error) {
      handleError(error);
    }
  }, [userInfo.userId]);

  useEffect(() => {
    if (activeTab === "completed") {
      fetchCompletedBookings();
    } else if (activeTab === "wallet") {
      fetchWallet();
    } else if (activeTab === "cancelled") {
      fetchCancelledBookings();
    }
  }, [activeTab, fetchWallet]);

  const handleViewDetails = (bookingId: string) => {
    const booking = completedBooking.find(
      (booking) => booking.bookingId === bookingId
    );
    if (booking) {
      setSelectedBooking(booking);
    }
  };

  const handleBackToList = () => {
    setSelectedBooking(null);
  };

  const renderContent = () => {
    if (selectedBooking) {
      return (
        <BookingDetailsView
          booking={selectedBooking}
          onBack={handleBackToList}
        />
      );
    }

    switch (activeTab) {
      case "completed":
        return (
          <Completed
            bookings={completedBooking}
            onViewDetails={handleViewDetails}
            onBookingCancelled={fetchCompletedBookings}
          />
        );
      case "cancelled":
        return <Cancelled bookings={cancelledBooking} />;
      case "wallet":
        return <Wallet walletData={walletDetails} />;
      default:
        return (
          <Completed
            bookings={completedBooking}
            onViewDetails={handleViewDetails}
            onBookingCancelled={fetchCompletedBookings}
          />
        );
    }
  };

  return (
    <div className="rounded-lg border h-screen flex flex-col">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 pb-0">
          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedBooking(null);
                }}
                className={`pb-4 px-6 relative ${
                  activeTab === tab.id
                    ? "text-yellow-500 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.name}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 pt-0">{renderContent()}</div>
      </div>
    </div>
  );
};

export default ProfileBottom;
