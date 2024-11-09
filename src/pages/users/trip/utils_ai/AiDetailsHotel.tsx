import { Trip } from "@/interface/user/aitripListing.interface";
import HotelCardItem from "./HotelCardItem";

const AiDetailsHotel: React.FC<{ trip: Trip | null }> = ({ trip }) => {
  if (!trip) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-5 ">
          {trip.tripData.hotelOptions.map((item, index) => (
            <HotelCardItem item={item} index={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AiDetailsHotel;
