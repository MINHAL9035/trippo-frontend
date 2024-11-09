import {
  PlaceData,
  SavedPlace,
  Trip,
} from "@/interface/user/tripDetails.interface";
import { Calendar, MapPin } from "lucide-react";

const SavedPlaceCard = ({ place }: { place: PlaceData }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <div className="relative h-48">
      <img
        src={place.photo.images.original.url}
        alt={place.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-medium">
        ⭐ {place.rating}
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-2">{place.name}</h3>
      <div className="flex items-center text-gray-600 mb-2">
        <MapPin className="w-4 h-4 mr-1" />
        <span className="text-sm">{place.address}</span>
      </div>
      <div className="flex items-center text-gray-600 mb-2">
        <span className="text-sm font-medium">{place.price}</span>
      </div>
      <div className="flex justify-between items-center mt-3">
        <span className="text-sm text-gray-500">
          {place.distance_string} away
        </span>
        <span className="text-sm text-gray-500">
          {place.num_reviews} reviews
        </span>
      </div>
    </div>
  </div>
);

const TripHeader = ({ trip }: { trip: Trip }) => (
  <div className="relative h-64 mb-8 rounded-xl overflow-hidden">
    <img
      src={trip.imageUrl}
      alt={trip.tripName}
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6">
      <h1 className="text-white text-3xl font-bold mb-2">{trip.tripName}</h1>
      <div className="flex items-center text-white space-x-4">
        <div className="flex items-center">
          <MapPin className="w-5 h-5 mr-1" />
          <span>{trip.destination}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="w-5 h-5 mr-1" />
          <span>
            {new Date(trip.tripStartDate).toLocaleDateString()} -{" "}
            {new Date(trip.tripEndDate).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const SavedPlaces = ({ savedPlaces }: { savedPlaces: SavedPlace[] }) => {
  if (!savedPlaces.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No saved places yet. Start exploring!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Saved Places</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savedPlaces.map((savedPlace) => (
          <SavedPlaceCard key={savedPlace._id} place={savedPlace.placeData} />
        ))}
      </div>
    </div>
  );
};

const TripDetailsContent = ({ tripData }: { tripData: SavedPlace[] }) => {
  if (!tripData.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <TripHeader trip={tripData[0].tripId} />
      <SavedPlaces savedPlaces={tripData} />
    </div>
  );
};

export default TripDetailsContent;
