import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SideBarComponent from "@/components/hotelDashboard/SideBarComponent";
import { getFullHotelDetails } from "@/service/api/hotel";
import handleError from "@/utils/errorHandler";
import { Star, Wifi, Users, Calendar } from "lucide-react";

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

interface HotelDetails {
  _id: string;
  hotelName: string;
  streetAddress: string;
  place: string;
  state: string;
  country: string;
  isVerified: boolean;
  images: string[];
  amenities: string[];
  rooms: Room[];
  description: string;
  hotelType: string;
}

const ViewDetails: React.FC = () => {
  const location = useLocation();
  const hotelId = location.state.hotelId;
  const [collapsed] = useState(false);
  const [hotelDetails, setHotelDetails] = useState<HotelDetails | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await getFullHotelDetails(hotelId);
        if (response.status === 200) {
          setHotelDetails(response.data);
        }
      } catch (error) {
        handleError(error);
      }
    };

    fetchHotelDetails();
  }, [hotelId]);

  if (!hotelDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <SideBarComponent collapsed={collapsed} />
      <div className="flex-1  p-8">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96">
            <img
              src={hotelDetails.images[activeImage]}
              alt={`${hotelDetails.hotelName} main`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 flex space-x-2">
              {hotelDetails.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === activeImage ? "bg-white" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                {hotelDetails.hotelName}
              </h1>
              <div className="flex items-center">
                <Star className="text-yellow-400 w-6 h-6 mr-1" />
                <span className="text-lg font-semibold">
                  {hotelDetails.isVerified ? "Verified" : "Unverified"}
                </span>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{hotelDetails.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h2 className="text-xl font-semibold mb-2">Location</h2>
                <p className="text-gray-600">
                  {hotelDetails.streetAddress}, {hotelDetails.place},{" "}
                  {hotelDetails.state}, {hotelDetails.country}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Hotel Type</h2>
                <p className="text-gray-600">{hotelDetails.hotelType}</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-4">
                {hotelDetails.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                  >
                    {amenity.toLowerCase().includes("wifi") ? (
                      <Wifi className="w-4 h-4 mr-2" />
                    ) : null}
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Rooms</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotelDetails.rooms.map((room) => (
                  <div
                    key={room._id}
                    className="bg-gray-50 rounded-lg p-6 shadow-sm"
                  >
                    <h3 className="text-xl font-semibold mb-2">{room.type}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Users className="w-5 h-5 mr-2" />
                      <span>Capacity: {room.capacity}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span>Available: {room.available}</span>
                    </div>
                    <p className="text-lg font-bold text-blue-600 mb-2">
                      ${room.rate}/night
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {room.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
