import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock } from "lucide-react";
import { Trip } from "@/interface/user/aitripListing.interface";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GoogleApi";

const TimeOfDay = {
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
} as const;

type TimeOfDayType = (typeof TimeOfDay)[keyof typeof TimeOfDay];

interface PhotoUrls {
  [key: string]: {
    [key: string]: string;
  };
}

const PlacesToVisit: React.FC<{ trip: Trip | null }> = ({ trip }) => {
  const [photoUrls, setPhotoUrls] = useState<PhotoUrls>({});

  useEffect(() => {
    if (trip) {
      fetchAllPhotos();
    }
  }, [trip]);

  const fetchAllPhotos = async () => {
    if (!trip) return;

    const days = Object.keys(trip.tripData.itinerary);
    const timeSlots: TimeOfDayType[] = ["morning", "afternoon", "evening"];
    const newPhotoUrls: PhotoUrls = {};

    for (const day of days) {
      newPhotoUrls[day] = {};
      for (const timeSlot of timeSlots) {
        const placeName = trip.tripData.itinerary[day][timeSlot].placeName;
        if (placeName) {
          try {
            const data = { textQuery: placeName };
            const res = await GetPlaceDetails(data);
            if (res.data.places[0]?.photos?.[0]) {
              const photoUrl = PHOTO_REF_URL.replace(
                "{NAME}",
                res.data.places[0].photos[0].name
              );
              newPhotoUrls[day][timeSlot] = photoUrl;
            }
          } catch (error) {
            console.error(`Error fetching photo for ${placeName}:`, error);
          }
        }
      }
    }

    setPhotoUrls(newPhotoUrls);
  };

  if (!trip) return null;

  const days = Object.keys(trip.tripData.itinerary);
  const timeSlots: TimeOfDayType[] = ["morning", "afternoon", "evening"];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Places to Visit</h2>
      <div className="space-y-8">
        {days.map((day, index) => {
          const schedule = trip.tripData.itinerary[day];
          return (
            <div key={day} className="space-y-4">
              <h3 className="text-xl font-semibold capitalize">
                Day {index + 1}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {timeSlots.map((timeOfDay) => {
                  const placeData = schedule[timeOfDay];
                  return (
                    <Card key={timeOfDay} className="overflow-hidden">
                      <div className="relative h-48">
                        {placeData?.placeImageUrl &&
                          photoUrls[day]?.[timeOfDay] && (
                            <img
                              src={photoUrls[day][timeOfDay]}
                              alt={placeData.placeName}
                              className="w-full h-full object-cover"
                            />
                          )}
                      </div>
                      <CardContent className="p-4 space-y-3">
                        <h4 className="font-semibold capitalize">
                          {timeOfDay}: {placeData?.placeName} 
                        </h4>
                        <p className="text-sm text-gray-600">
                          {placeData?.placeDetails}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock size={16} />
                          {placeData?.time}
                        </div>
                        {placeData?.geoCoordinates && (
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <MapPin size={16} />
                            {placeData?.geoCoordinates}
                          </div>
                        )}
                        {placeData?.ticketPricing && (
                          <p className="text-sm font-medium">
                            Entry: {placeData?.ticketPricing}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlacesToVisit;
