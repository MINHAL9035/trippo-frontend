import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { MapPin, Users, Coffee } from "lucide-react";
import { RootState } from "@/redux/store/store";
import { getSingleHotelDetails, pendingBookings } from "@/service/api/user";
import NavBar from "@/components/user/NavBar";
import Footer from "@/components/user/Footer";

interface Room {
  roomId: string;
  type: string;
  rate: number;
  capacity: number;
  available: number;
  amenities: string[];
  availableDates: string[];
  _id: string;
}

interface HotelInterface {
  _id: string;
  hotelName: string;
  place: string;
  description: string;
  amenities: string[];
  images: string[];
  rooms: Room[];
}

const HotelDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hotelDetails, setHotelDetails] = useState<HotelInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        setLoading(true);
        const response = await getSingleHotelDetails(location.state?.hotelId);
        setHotelDetails(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (location.state?.hotelId) {
      fetchHotelDetails();
    }
  }, [location.state?.hotelId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!hotelDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Hotel not found</div>
      </div>
    );
  }

  const handleBooking = async (roomId: string) => {
    try {
      const bookingData = {
        hotelId: hotelDetails._id,
        roomId: roomId,
        userId: userInfo.userId,
        checkIn: dayjs().add(1, "day").toISOString(),
        checkOut: dayjs().add(2, "day").toISOString(),
      };

      const response = await pendingBookings(bookingData);
      if (response.status === 201) {
        navigate(`/bookingDetails/${response?.data.bookingId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        {/* Hero Section with Main Image */}
        <div className="relative h-[60vh] w-full">
          <img
            src={hotelDetails.images[0] || "/src/assets/images/hotelimage.jpeg"}
            alt={hotelDetails.hotelName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40">
            <div className="container mx-auto px-4 h-full flex items-end pb-16">
              <div className="text-white">
                <h1 className="text-5xl font-bold mb-4">
                  {hotelDetails.hotelName}
                </h1>
                <div className="flex items-center text-lg">
                  <MapPin className="mr-2" />
                  <span>{hotelDetails.place}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="container mx-auto px-4 -mt-16 mb-12">
          <div className="grid grid-cols-4 gap-4">
            {hotelDetails.images.slice(1).map((image, index) => (
              <div
                key={index}
                className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={image || "/src/assets/images/hotelimage.jpeg"}
                  alt={`${hotelDetails.hotelName} view ${index + 2}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Hotel Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">
                  About the Property
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {hotelDetails.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-6">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {hotelDetails.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Coffee className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rooms */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-6">Available Rooms</h2>
                <div className="space-y-4">
                  {hotelDetails.rooms.map((room) => (
                    <div
                      key={room._id}
                      className="border rounded-lg p-4 hover:border-blue-500 transition-colors duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-medium mb-2">
                            {room.type}
                          </h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <Users className="w-4 h-4 mr-2" />
                            <span>Capacity: {room.capacity} guests</span>
                          </div>
                          <div className="flex items-center text-gray-600 mb-2">
                            <Users className="w-4 h-4 mr-2" />
                            <span>
                              No of rooms avialable: {room.available} rooms
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {room.amenities.map((amenity, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">
                            ₹{room.rate}
                          </p>
                          <p className="text-sm text-gray-500 mb-4">
                            per night
                          </p>
                          <button
                            onClick={() => handleBooking(room.roomId)}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking Summary */}
            {/* <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-4">
                <h2 className="text-xl font-semibold mb-6">Quick Booking</h2>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Check-in</p>
                      <p className="font-medium">
                        {dayjs().add(1, "day").format("MMM D, YYYY")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Check-out</p>
                      <p className="font-medium">
                        {dayjs().add(2, "day").format("MMM D, YYYY")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Users className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Guests</p>
                      <p className="font-medium">2 Adults</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Bed className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Room Type</p>
                      <p className="font-medium">Select from available rooms</p>
                    </div>
                  </div>
                  <button
                    onClick={() => selectedRoom && handleBooking(selectedRoom)}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-300"
                    disabled={!selectedRoom}
                  >
                    Proceed to Book
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HotelDetails;
