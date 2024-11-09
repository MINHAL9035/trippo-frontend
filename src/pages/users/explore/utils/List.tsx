import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PlaceDetails from "./PlaceDetails";
import { IExplorePlaces } from "@/interface/user/explore.interface";
import { Spin } from "antd";

interface ListProps {
  places: IExplorePlaces[];
  type: string;
  rating: string;
  isLoading: boolean;
  setType: (value: string) => void;
  setRating: (value: string) => void;
}

const List: React.FC<ListProps> = ({
  places,
  type,
  setType,
  rating,
  setRating,
  isLoading,
}) => {
  return (
    <div className="flex flex-col h-screen p-6">
      {/* Heading */}
      <h2 className="text-2xl font-semibold mb-6">
        Restaurants, Hotels & Attractions near you
      </h2>

      {isLoading ? (
        <div className="h-[600px] flex justify-center items-center">
          <Spin />
        </div>
      ) : (
        <>
          <div className="flex gap-4 items-center mb-6">
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="restaurants">Restaurants</SelectItem>
                <SelectItem value="attractions">Attractions</SelectItem>
              </SelectContent>
            </Select>

            {/* Rating Filter */}
            <Select value={rating} onValueChange={setRating}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="4.5">4.5+</SelectItem>
                <SelectItem value="4.0">4.0+</SelectItem>
                <SelectItem value="3.5">3.5+</SelectItem>
                <SelectItem value="3.0">3.0+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="space-y-4 pr-2">
              {places?.map((place, i) => (
                <div key={i}>
                  <PlaceDetails place={place} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Filters */}
    </div>
  );
};

export default List;
