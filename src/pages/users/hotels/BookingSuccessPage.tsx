import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import Footer from "@/components/user/Footer";
import NavBar from "@/components/user/NavBar";
import { getcompletedBookings } from "@/service/api/user";
import handleError from "@/utils/errorHandler";
import { format } from "date-fns";
import {
  CheckCircle,
  Calendar,
  MapPin,
  Users,
  Wifi,
  Tv,
  Snowflake,
  CreditCard,
  User,
} from "lucide-react";
import { BookingDetails } from "@/interface/user/ICompletedBooking";

const BookingSuccessPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bookingId = queryParams.get("bookingId");
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompletedBookings = async () => {
      try {
        const response = await getcompletedBookings(bookingId);
        if (response.status === 200) {
          setBookingDetails(response.data);
        }
      } catch (error) {
        handleError(error);
      }
    };
    if (bookingId) {
      fetchCompletedBookings();
    }
  }, [bookingId]);

  if (!bookingDetails) return null;

  const { checkIn, checkOut, hotelId, roomId, userId } = bookingDetails;
  const {
    hotelName,
    streetAddress,
    place,
    state,
    country,
    images,
    description,
    hotelType,
  } = hotelId;
  const room = hotelId.rooms.find((room) => room.roomId === roomId);

  const handleGoHome = () => {
    navigate("/home");
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-400 px-6 py-4">
            <div className="flex items-center">
              <CheckCircle className="text-white mr-2" size={32} />
              <h1 className="text-3xl font-bold text-white">
                Booking Confirmed!
              </h1>
            </div>
            <p className="text-blue-100 mt-1 text-lg">
              Your stay at {hotelName} is all set.
            </p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Booking Details
                </h2>
                <div className="space-y-3">
                  <p className="text-gray-600">
                    <strong>Booking ID:</strong> {bookingDetails.bookingId}
                  </p>
                  <div className="flex items-center">
                    <Calendar className="text-blue-500 mr-2" size={20} />
                    <p className="text-gray-600">
                      <strong>Check-in:</strong>{" "}
                      {format(new Date(checkIn), "PPP")}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="text-purple-500 mr-2" size={20} />
                    <p className="text-gray-600">
                      <strong>Check-out:</strong>{" "}
                      {format(new Date(checkOut), "PPP")}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <User className="text-green-500 mr-2" size={20} />
                    <p className="text-gray-600">
                      <strong>Guest:</strong> {userId.fullName}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Hotel Information
                </h2>
                <h3 className="text-xl font-medium text-gray-700">
                  {hotelName}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{hotelType}</p>
                <div className="flex items-start mt-2">
                  <MapPin className="text-red-400 mr-2 mt-1" size={20} />
                  <p className="text-gray-600">
                    {streetAddress}, {place}, {state}, {country}
                  </p>
                </div>
                <p className="text-gray-600 mt-2">{description}</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Room Details
              </h2>
              {room && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-lg font-medium text-gray-700">
                    Type: {room.type}
                  </p>
                  <div className="flex items-center mt-2">
                    <CreditCard className="text-green-500 mr-2" size={20} />
                    <p className="text-gray-600">
                      Rate: ${room.rate} per night
                    </p>
                  </div>
                  <div className="flex items-center mt-2">
                    <Users className="text-blue-500 mr-2" size={20} />
                    <p className="text-gray-600">
                      Capacity: {room.capacity} persons
                    </p>
                  </div>
                  <div className="mt-3">
                    <p className="text-gray-700 font-medium mb-2">
                      Room Amenities:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                        >
                          {amenity === "wifi" && (
                            <Wifi className="inline mr-1" size={12} />
                          )}
                          {amenity === "tv" && (
                            <Tv className="inline mr-1" size={12} />
                          )}
                          {amenity === "ac" && (
                            <Snowflake className="inline mr-1" size={12} />
                          )}
                          {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Hotel Images
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Hotel Image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                  />
                ))}
              </div>
            </div>

            <div className="mt-8 border-t pt-6">
              <p className="text-gray-600 text-center">
                Thank you for choosing {hotelName}. We hope you have a wonderful
                stay!
              </p>
            </div>

            {/* Button to go home */}
            <div className="mt-8 text-center">
              <button
                onClick={handleGoHome}
                className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingSuccessPage;
