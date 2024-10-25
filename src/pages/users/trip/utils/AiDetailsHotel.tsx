import { Link } from "react-router-dom";

const AiDetailsHotel = ({ trip }) => {
  if (!trip) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-5 ">
          {trip.tripData.hotelOptions.map((item, index) => (
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
                  className="rounded-xl"
                  src="/src/assets/images/home1.jpg"
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
          ))}
        </div>
      </div>
    </>
  );
};

export default AiDetailsHotel;
