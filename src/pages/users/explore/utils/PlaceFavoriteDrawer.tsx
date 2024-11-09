import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { BsBagPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import {
  IExplorePlaces,
  IExploreTrip,
} from "@/interface/user/explore.interface";
import { getMyTrips, savePlaceToTrip } from "@/service/api/explore";
import handleError from "@/utils/errorHandler";
import { message } from "antd";

interface PlaceFavoriteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  place: IExplorePlaces;
}

const PlaceFavoriteDrawer = ({
  isOpen,
  onClose,
  place,
}: PlaceFavoriteDrawerProps) => {
  const [trips, setTrips] = useState<IExploreTrip[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchMyTrips = async () => {
      try {
        const response = await getMyTrips();
        if (response.status === 200) {
          setTrips(response.data);
        }
      } catch (error) {
        handleError(error);
      }
    };
    fetchMyTrips();
  }, []);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  const handleSaveToTrip = async (tripId: string) => {
    try {
      setIsSaving(true);
      const response = await savePlaceToTrip(tripId, place);

      if (response.status === 201) {
        message.success(`Saved ${place.name} to your trip!`);
        onClose();
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader className="mb-6">
          <div className="flex items-center gap-2 text-primary">
            <BsBagPlus className="w-6 h-6" />
            <SheetTitle className="text-2xl">Save to Trip</SheetTitle>
          </div>
          <SheetDescription className="text-muted-foreground">
            Save this place to your trip list for quick access
          </SheetDescription>
        </SheetHeader>

        {trips.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-lg">No trips found</h3>
              <p className="text-sm text-muted-foreground">
                Create a new trip to start saving places
              </p>
            </div>
            <Link to="/trips">
              <Button className="mt-2">
                <BsBagPlus className="mr-2" />
                Create New Trip
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex-1 overflow-hidden">
            <div
              className="space-y-4 h-full overflow-y-auto pr-4 -mr-4 scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {trips.map((trip) => (
                <div
                  key={trip._id}
                  onClick={() => handleSaveToTrip(trip._id)}
                  className="flex items-start gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                >
                  <img
                    src={trip.imageUrl}
                    alt={trip.tripName}
                    className="w-24 h-24 object-cover rounded-lg shadow-sm"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-lg">{trip.tripName}</h3>
                      <span className="text-sm text-muted-foreground bg-accent px-2 py-1 rounded">
                        {trip.destination}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {formatDate(trip.tripStartDate)} -{" "}
                        {formatDate(trip.tripEndDate)}
                      </span>
                    </div>
                  </div>
                  {isSaving && (
                    <span className="loading loading-spinner"></span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default PlaceFavoriteDrawer;
