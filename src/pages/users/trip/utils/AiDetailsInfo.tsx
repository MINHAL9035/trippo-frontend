import { Trip } from "./AiDetailsHotel";

const AiDetailsInfo: React.FC<{ trip: Trip | null }> = ({ trip }) => {
  console.log("hi", trip);
  if (!trip) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <img
          className="h-[340px] w-full object-cover rounded-xl"
          src="/src/assets/images/explore.jpg"
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
