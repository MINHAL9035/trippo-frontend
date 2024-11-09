import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Navigation, Phone, MapPin, Star, Utensils } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IExplorePlaces } from "@/interface/user/explore.interface";
import PlaceFavoriteDrawer from "./PlaceFavoriteDrawer";

interface PlaceDetailsProps {
  place: IExplorePlaces;
}

const PlaceDetails = ({ place }: PlaceDetailsProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleFavoriteClick = () => {
    setIsDrawerOpen(true);
  };

  const renderRating = (rating: string) => (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Number(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-muted-foreground">
        {rating} ({place.num_reviews} reviews)
      </span>
    </div>
  );

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300  custom-scrollbar ">
        <div className="flex flex-col md:flex-row">
          {/* Image and Status */}
          <div className="relative w-full md:w-2/5 h-64 md:h-auto">
            <img
              src={place?.photo?.images?.medium.url}
              alt={place.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
              <div className="absolute bottom-4 left-4">
                <Badge variant={place.is_closed ? "destructive" : "secondary"}>
                  {place.is_closed ? "Closed" : "Open"}
                </Badge>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute top-4 right-4 rounded-full bg-white/90"
                      onClick={handleFavoriteClick}
                    >
                      <Heart className="w-4 h-4 " />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Add to favorites</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 space-y-4">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-2xl font-bold">{place.name}</h2>
                {place.price && <Badge variant="outline">{place.price}</Badge>}
              </div>
              {place.rating && renderRating(place.rating)}
            </div>

            {/* Cuisines */}
            {place.cuisine?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {place.cuisine.map((cuisine, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-primary/10"
                  >
                    <Utensils className="w-3 h-3 mr-1" />
                    {cuisine.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {place.address && (
                <div className="flex gap-2">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-sm text-muted-foreground">
                      {place.address}
                    </div>
                  </div>
                </div>
              )}
              {place.phone && (
                <div className="flex gap-2">
                  <Phone className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-sm text-muted-foreground">
                      {place.phone}
                    </div>
                  </div>
                </div>
              )}
              {place.distance_string && (
                <div className="flex gap-2">
                  <Navigation className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <div className="font-medium">Distance</div>
                    <div className="text-sm text-muted-foreground">
                      {place.distance_string}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
      <PlaceFavoriteDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        place={place}
      />
    </>
  );
};

export default PlaceDetails;
