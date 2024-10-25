import { HotelInterface } from "@/interface/owner/IHotel.Interface";
import { useNavigate } from "react-router-dom";

const ResultHotelListing = ({ hotel }: { hotel: HotelInterface }) => {
    const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 flex gap-4">
      {/* Left: Main Image */}
      <div className="w-1/4 min-w-[250px]">
        <img
          src={hotel.images?.[0]}
          alt={hotel.hotelName}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Right: Hotel Details */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <div className="p-2">
            <h2 className="text-xl font-semibold text-gray-900">
              {hotel.hotelName}
            </h2>
            <p className="text-sm text-gray-600">
              {hotel.place} , {hotel.streetAddress}
            </p>
          </div>
          {/* <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">4.5</span>
                </div>
                <span className="text-sm text-gray-500">(11 Ratings)</span>
              </div> */}
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {hotel.amenities?.map((amenity, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-gray-100 rounded-md text-sm text-gray-600"
            >
              {amenity}
            </span>
          ))}
        </div>

        <div className="mt-auto flex justify-end items-end">
          <div className="text-right">
            <div className="text-2xl font-bold">
              ₹{hotel.availableRooms?.[0]?.rate}
            </div>
            <p className="text-sm text-gray-500">per night</p>
            <button
              onClick={() =>
                navigate("/hotelDetails", {
                  state: { hotelId: hotel._id },
                })
              }
              className="mt-3 bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700 transition"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultHotelListing;
