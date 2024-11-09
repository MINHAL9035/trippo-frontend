import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GoogleApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Hotel {
  hotelName: string;
  hotelAddress: string;
  price: string;
  rating: number;
}

interface HotelCardItemProps {
  item: Hotel;
  index: number;
}
const HotelCardItem: React.FC<HotelCardItemProps> = ({ item, index }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  useEffect(() => {
    item && GetPlacePhoto();
  }, [item]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: item.hotelName,
    };
    await GetPlaceDetails(data).then((res) => {
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        res.data.places[0].photos[3].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <Link
      to={
        `https://www.google.com/maps/search/?api=1&query=` +
        item.hotelName +
        "," +
        item.hotelAddress
      }
      target="_blank"
    >
      <div
        key={index}
        className="hover:scale-105 transition-all cursor-pointer"
      >
        <img
          className="rounded-xl h-[180px] w-full object-cover "
          src={photoUrl}
          alt=""
        />
        <div className="my-2 flex flex-col">
          <h2 className="font-medium">{item.hotelName}</h2>
          <h2 className="text-xs text-gray-400">📌 {item.hotelAddress}</h2>
          <h2 className="text-sm font-semibold">💵 {item.price}</h2>
          <h2 className="text-sm">⭐ {item.rating} stars</h2>
        </div>
      </div>
    </Link>
  );
};

export default HotelCardItem;
