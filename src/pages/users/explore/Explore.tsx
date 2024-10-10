import Footer from "@/components/user/Footer";
import NavBar from "@/components/user/NavBar";
import { Search, RotateCcw, Tag, Heart } from "lucide-react";

const destinationsData = [
  { name: "London", image: "/src/assets/images/explore.jpg" },
  { name: "Paris", image: "/src/assets/images/explore.jpg" },
  { name: "Rome", image: "/src/assets/images/explore.jpg" },
  { name: "New York City", image: "/src/assets/images/explore.jpg" },
  { name: "New York City", image: "/src/assets/images/explore.jpg" },
  { name: "New York City", image: "/src/assets/images/explore.jpg" },
  { name: "New York City", image: "/src/assets/images/explore.jpg" },
  { name: "New York City", image: "/src/assets/images/explore.jpg" },
  { name: "New York City", image: "/src/assets/images/explore.jpg" },
  { name: "New York City", image: "/src/assets/images/explore.jpg" },
];

const experiencesData = [
  {
    name: "Chicago Architecture River Cruise",
    image: "/src/assets/images/explore.jpg",
  },
  {
    name: "History and Hauntings of Salem Guided Walking Tour",
    image: "/src/assets/images/explore.jpg",
  },
  {
    name: "Pompeii Small Group Tour with an Archaeologist",
    image: "/src/assets/images/explore.jpg",
  },
  {
    name: "Best DMZ Tour Korea from Seoul (Red Suspension Bridge Optional)",
    image: "/src/assets/images/explore.jpg",
  },
];

const Explore = () => {
  return (
    <>
      <NavBar />
      <div className="relative">
        <img
          className="h-[300px] sm:h-[400px] md:h-[500px] w-full object-cover"
          src="/src/assets/images/explore.jpg"
          alt="Explore background"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-4 text-center">
            Wander, Explore, and Find Your <br className="hidden md:block" />
            Next Destination.
          </h1>
          <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl px-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by destination, attraction or activity"
                className="w-full py-2 sm:py-3 px-3 sm:px-4 pr-10 rounded-md bg-white text-black text-sm sm:text-base transition-all duration-300"
              />
              <Search
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-center mt-4 sm:mt-8 w-full">
            {[
              {
                icon: Search,
                text: "See what people loved with real reviews on almost everything.",
              },
              {
                icon: RotateCcw,
                text: "Most experiences can be cancelled up to 24 hours before.",
              },
              { icon: Tag, text: "Do fun stuff without breaking the bank" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center mx-2 sm:mx-4 max-w-[120px] sm:max-w-[200px] mb-4 hover:text-yellow-400"
              >
                <div className="bg-white rounded-full p-2 sm:p-3 mb-2 hover:bg-yellow-400">
                  <item.icon className="text-black" size={16} />
                </div>
                <p className="text-center text-xs sm:text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">
            Top global destinations
          </h2>
          <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
            {destinationsData.map((destination, index) => (
              <div key={index} className="flex-none w-48 sm:w-64 relative">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-32 sm:h-40 object-cover rounded-lg"
                />
                <Heart
                  className="absolute top-2 right-2 text-white"
                  size={16}
                />
                <p className="mt-2 font-semibold text-sm sm:text-base">
                  {destination.name}
                </p>
              </div>
            ))}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mt-8 sm:mt-12 mb-4">
            Top experiences worldwide
          </h2>
          <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
            {experiencesData.map((experience, index) => (
              <div key={index} className="flex-none w-48 sm:w-64 relative">
                <img
                  src={experience.image}
                  alt={experience.name}
                  className="w-full h-32 sm:h-40 object-cover rounded-lg"
                />
                <Heart
                  className="absolute top-2 right-2 text-white"
                  size={16}
                />
                <p className="mt-2 font-semibold text-sm sm:text-base line-clamp-2">
                  {experience.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Explore;
