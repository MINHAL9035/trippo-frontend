import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBarComponent from "@/components/hotelDashboard/SideBarComponent";
import {
  Calendar,
  Clock,
  Hotel,
  MapPin,
  Mail,
  Check,
  ChevronLeft,
} from "lucide-react";
import { BookingDetails } from "@/interface/user/ICompletedBooking";
import { getOwnerBookings } from "@/service/api/hotelOwner";
import handleError from "@/utils/errorHandler";

const BookingViewDetails = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(
    null
  );
  const { bookingId } = useParams();

  useEffect(() => {
    const fetchBooking = async (id: string) => {
      try {
        const response = await getOwnerBookings(id);
        if (response?.status === 200) {
          setBookingDetails(response.data);
        }
      } catch (error) {
        handleError(error);
      }
    };

    if (bookingId) {
      fetchBooking(bookingId);
    }
  }, [bookingId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const StatusBadge = ({ status }) => {
    const statusStyles = {
      completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
      pending: "bg-amber-50 text-amber-700 border-amber-200",
      cancelled: "bg-red-50 text-red-700 border-red-200",
    };

    return (
      <span
        className={`px-4 py-1.5 rounded-full text-sm font-medium border ${
          statusStyles[status] || statusStyles.pending
        }`}
      >
        {status.toUpperCase()}
      </span>
    );
  };

  if (!bookingDetails) return null;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <SideBarComponent collapsed={collapsed} />
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
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
                <div className="ml-4 text-xl font-semibold text-gray-800">
                  Booking Details
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <StatusBadge status={bookingDetails.status} />
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {/* Booking Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => window.history.back()}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    <span className="font-medium">Back</span>
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500">Booking ID:</span>
                  <span className="font-mono text-gray-900 bg-gray-100 px-3 py-1 rounded">
                    {bookingDetails.bookingId}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Booking Information */}
              <div className="lg:col-span-2 space-y-8">
                {/* Dates Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="grid grid-cols-2 divide-x divide-gray-200">
                    <div className="p-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-gray-500">
                          Check-in
                        </span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">
                        {formatDate(bookingDetails.checkIn)}
                      </p>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-gray-500">
                          Check-out
                        </span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">
                        {formatDate(bookingDetails.checkOut)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hotel Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                      Hotel Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {bookingDetails.hotelId.hotelName}
                          </h3>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>{`${bookingDetails.hotelId.streetAddress}, ${bookingDetails.hotelId.place}`}</span>
                          </div>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <Hotel className="w-4 h-4 mr-2" />
                            <span>{bookingDetails.hotelId.hotelType}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {bookingDetails.hotelId.amenities.map(
                            (amenity, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700"
                              >
                                {amenity}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">
                            Room Details
                          </h4>
                          {bookingDetails.hotelId.rooms.map(
                            (room) =>
                              room.roomId === bookingDetails.roomId && (
                                <div key={room.roomId} className="space-y-2">
                                  <p className="text-gray-900 font-medium">
                                    {room.type}
                                  </p>
                                  <p className="text-gray-600">
                                    ₹{room.rate.toLocaleString()} per night
                                  </p>
                                  <p className="text-gray-600">
                                    {room.capacity} guests max
                                  </p>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {room.amenities.map((amenity, index) => (
                                      <span
                                        key={index}
                                        className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800"
                                      >
                                        {amenity}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Hotel Images */}
                    {bookingDetails.hotelId.images.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-medium text-gray-900 mb-4">
                          Property Photos
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {bookingDetails.hotelId.images.map((image, index) => (
                            <div key={index} className="relative aspect-[4/3]">
                              <img
                                src={image}
                                alt={`Hotel view ${index + 1}`}
                                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Guest Information Sidebar */}
              <div className="lg:col-span-1 space-y-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                      Guest Information
                    </h2>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src={bookingDetails.userId.image}
                          alt={bookingDetails.userId.fullName}
                          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                        />
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {bookingDetails.userId.fullName}
                          </h3>
                          <p className="text-gray-500">
                            @{bookingDetails.userId.userName}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200 space-y-3">
                        <div className="flex items-center space-x-3 text-gray-600">
                          <Mail className="w-5 h-5" />
                          <span>{bookingDetails.userId.email}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-emerald-600">
                          <Check className="w-5 h-5" />
                          <span>Verified User</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Timeline */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                      Booking Timeline
                    </h2>
                    <div className="space-y-6">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Clock className="w-4 h-4 text-blue-600" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Booking Created
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatDate(bookingDetails.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                      Payment Details
                    </h2>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Room Rate</span>
                        <span className="font-medium">
                          ₹
                          {bookingDetails.hotelId.rooms
                            .find((r) => r.roomId === bookingDetails.roomId)
                            ?.rate.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Number of Nights</span>
                        <span className="font-medium">
                          {Math.ceil(
                            (new Date(bookingDetails.checkOut) -
                              new Date(bookingDetails.checkIn)) /
                              (1000 * 60 * 60 * 24)
                          )}
                        </span>
                      </div>
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Total Amount</span>
                          <span className="font-semibold text-lg">
                            ₹
                            {(
                              bookingDetails.hotelId.rooms.find(
                                (r) => r.roomId === bookingDetails.roomId
                              )?.rate *
                              Math.ceil(
                                (new Date(bookingDetails.checkOut) -
                                  new Date(bookingDetails.checkIn)) /
                                  (1000 * 60 * 60 * 24)
                              )
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingViewDetails;
