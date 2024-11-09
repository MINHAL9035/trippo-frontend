import { Trip } from "@/interface/user/aitripListing.interface";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GoogleApi";
import { useEffect, useState } from "react";

const AiDetailsInfo: React.FC<{ trip: Trip | null }> = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userInput.place,
    };
    await GetPlaceDetails(data).then((res) => {
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        res.data.places[0].photos[3].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };

  if (!trip) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <img
          className="h-[340px] w-full object-cover rounded-xl"
          src={photoUrl}
          alt=""
        />
        <div>
          <div className="my-5 flex flex-col gap-2">
            <h2 className="font-bold text-2xl">{trip.userInput.place}</h2>
            <div className="flex gap-7">
              <h2 className="p-1 px-3 bg-gray-200 rounded-md text-gray-500 text-xs md:text-md ">
                📅{trip.userInput.days} days
              </h2>
              <h2 className="p-1 px-3 bg-gray-200 rounded-md text-gray-500 text-sm">
                💰{trip.userInput.budget}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AiDetailsInfo;
