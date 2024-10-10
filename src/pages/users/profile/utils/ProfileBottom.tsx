import { BookingDetails } from "@/interface/user/ICompletedBooking";
import { getUserBookings } from "@/service/api/userProfileApi";
import handleError from "@/utils/errorHandler";
import {
  ChevronRight,
  Hotel,
  MapPin,
  Calendar,
  CreditCard,
  ArrowLeft,
  Users,
  Mail,
  BedDouble,
} from "lucide-react";
import { useEffect, useState } from "react";

const ProfileBottom = () => {
  const [completedBooking, setCompletedBooking] = useState<BookingDetails[]>(
    []
  );
  const [activeTab, setActiveTab] = useState("completed");
  const [selectedBooking, setSelectedBooking] = useState<BookingDetails | null>(
    null
  );

  useEffect(() => {
    const userCompletedBooking = async () => {
      try {
        const response = await getUserBookings();
        if (response.status === 200) {
          setCompletedBooking(response.data);
        }
      } catch (error) {
        handleError(error);
      }
    };
    userCompletedBooking();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleViewDetails = (booking: BookingDetails) => {
    setSelectedBooking(booking);
  };

  const handleBackToList = () => {
    setSelectedBooking(null);
  };

  const BookingListView = () => (
    <>
      {completedBooking.length > 0 ? (
        <ul className="space-y-6">
          {completedBooking.map((booking) => (
            <li
              key={booking._id}
              className="bg-white rounded-lg border hover:shadow-lg transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-yellow-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Hotel className="w-8 h-8 text-yellow-500" />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {booking.hotelId.hotelName}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-500 mt-1">
                          <MapPin className="w-4 h-4" />
                          <p className="text-sm">{booking.hotelId.place}</p>
                        </div>
                      </div>

                      <ul className="grid grid-cols-2 gap-4 pt-4 border-t">
                        <li className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Check-in</p>
                            <p className="font-medium">
                              {formatDate(booking.checkIn)}
                            </p>
                          </div>
                        </li>
                        <li className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Check-out</p>
                            <p className="font-medium">
                              {formatDate(booking.checkOut)}
                            </p>
                          </div>
                        </li>
                      </ul>

                      <div className="flex items-center gap-2 text-sm text-gray-500 pt-4 border-t">
                        <CreditCard className="w-4 h-4" />
                        <span>Booking ID: {booking.bookingId}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewDetails(booking)}
                    className="flex items-center gap-2 text-yellow-500 hover:text-yellow-600 transition-colors duration-200 bg-yellow-50 hover:bg-yellow-100 px-4 py-2 rounded-lg ml-4"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center h-[400px] bg-gray-50 rounded-lg">
          <Hotel className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="font-semibold text-xl mb-2">
            No Completed Bookings Yet
          </h3>
          <p className="text-gray-500 text-center max-w-md">
            Your completed bookings will appear here once you've finished a
            trip. Start exploring hotels to begin your journey!
          </p>
        </div>
      )}
    </>
  );

  const BookingDetailsView = () => {
    if (!selectedBooking) return null;

    return (
      <div className="space-y-6">
        <button
          onClick={handleBackToList}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Bookings
        </button>

        <div className="bg-white rounded-lg border p-6 space-y-6">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-yellow-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Hotel className="w-10 h-10 text-yellow-500" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2">
                {selectedBooking.hotelId.hotelName}
              </h2>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <p>{selectedBooking.hotelId.place}</p>
              </div>
            </div>
            <div className="bg-yellow-50 px-4 py-2 rounded-lg">
              <p className="text-yellow-600 font-medium">
                Booking ID: {selectedBooking.bookingId}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 border-t border-b py-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Stay Details</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Check-in</p>
                    <p className="font-medium">
                      {formatDate(selectedBooking.checkIn)}
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Check-out</p>
                    <p className="font-medium">
                      {formatDate(selectedBooking.checkOut)}
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Guests</p>
                    <p className="font-medium">Adults, Children</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <BedDouble className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Room Type</p>
                    {selectedBooking.hotelId.rooms.map((room) => (
                      <p className="font-medium">{room.type}</p>
                    ))}
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Guest Information</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Guest Name</p>
                    <p className="font-medium">
                      {selectedBooking.userId.fullName}
                    </p>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">
                      {selectedBooking.userId.email}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-700">Payment Details</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">Total Amount</p>
                  <p className="text-2xl font-semibold">₹1000</p>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">Paid</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border h-screen flex flex-col">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 pb-0">
          <div className="flex border-b">
            {["Completed Bookings", "Trips", "Account Info"].map(
              (tab, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveTab(tab.toLowerCase().replace(" ", "-"));
                    setSelectedBooking(null);
                  }}
                  className={`pb-4 px-6 relative ${
                    activeTab === tab.toLowerCase().replace(" ", "-")
                      ? "text-yellow-500 font-medium"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                  {activeTab === tab.toLowerCase().replace(" ", "-") && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500"></div>
                  )}
                </button>
              )
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 pt-0">
          {selectedBooking ? <BookingDetailsView /> : <BookingListView />}
        </div>
      </div>
    </div>
  );
};

export default ProfileBottom;
