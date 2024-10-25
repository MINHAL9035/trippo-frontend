import { MapPin, Home } from "lucide-react";

interface HotelInfoProps {
  hotel: {
    images: string[];
    hotelName: string;
    streetAddress: string;
    place: string;
    hotelType: string;
  };
}

const HotelInform = ({ hotel }: HotelInfoProps) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex gap-6 items-start">
        <div className="flex-shrink-0">
          <img
            src={hotel.images[0]}
            alt={hotel.hotelName}
            className="w-40 h-40 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            {hotel.hotelName}
          </h3>
          <div className="space-y-3 text-gray-600">
            <p className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-500" />
              <span>{hotel.streetAddress}, {hotel.place}</span>
            </p>
            <p className="flex items-center gap-3">
              <Home className="w-5 h-5 text-blue-500" />
              <span className="capitalize">{hotel.hotelType}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelInform;
