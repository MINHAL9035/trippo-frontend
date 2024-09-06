import { Calendar, MapPin, MoreHorizontal } from "lucide-react";

interface TripCardProps {
  title: string;
  duration: string;
  location: string;
  imageUrl: string;
}

const TripCard: React.FC<TripCardProps> = ({ title, duration, location, imageUrl }) => {
  return (
    <div className="flex border border-gray-200 rounded-lg overflow-hidden">
      <img src={imageUrl} alt={title} className="w-1/3 object-cover" />
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button className="text-gray-500 hover:text-gray-700">
            <MoreHorizontal size={20} />
          </button>
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <Calendar size={16} className="mr-1" /> {duration}
          <MapPin size={16} className="ml-4 mr-1" /> {location}
        </div>
        <button className="mt-4 text-yellow-400 hover:underline text-sm">
          Add dates
        </button>
      </div>
    </div>
  );
};

export default TripCard;
