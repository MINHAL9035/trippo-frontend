import { CreateTripResponse } from "@/interface/user/ITripCreation";
import { CalendarDays, MapPin, MoreHorizontal } from "lucide-react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const TripCard: React.FC<CreateTripResponse> = ({
  tripName,
  destination,
  imageUrl,
  tripStartDate,
  tripEndDate,
  tripId,
}) => {
  const formattedStartDate = moment(tripStartDate).format("DD MMM YYYY");
  const formattedEndDate = moment(tripEndDate).format("DD MMM YYYY");
  const navigate = useNavigate();
  const handleNavigateTodetails = () => {
    navigate(`/trips/${tripId}`);
  };
  return (
    <div className="flex border border-gray-200 rounded-lg overflow-hidden">
      <img
        src={imageUrl}
        alt={tripName}
        className="w-40 object-cover hover:cursor-pointer"
        onClick={handleNavigateTodetails}
      />
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start">
          <h2
            className="text-xl font-semibold hover:cursor-pointer"
            onClick={handleNavigateTodetails}
          >
            {tripName}
          </h2>
          <button className="text-gray-500 hover:text-gray-700">
            <MoreHorizontal size={20} />
          </button>
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-5 space-x-5">
          <MapPin size={16} className="mr-1" /> {destination}
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-3 space-x-5">
          <CalendarDays size={16} className="mr-1 " /> {formattedStartDate} -{" "}
          {formattedEndDate}
        </div>
      </div>
    </div>
  );
};

export default TripCard;
