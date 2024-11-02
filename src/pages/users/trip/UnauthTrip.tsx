import { Heart, Users, Map } from "lucide-react";
import Footer from "@/components/user/Footer";
import NavBar from "@/components/user/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

const UnauthTrip = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();

  const handleAiClick = () => {
    if (userInfo) {
      navigate("/ai-create-trip");
    } else {
      navigate("/login");
    }
  };
  const handleManualClick = () => {
    if (userInfo) {
      navigate("/trips");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow container mt-9">
        <div className="text-center mb-8">
          <p className="text-sm  text-gray-600">
            Already started?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>{" "}
            to see your saved trips.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-28 mb-12">
          <div className="text-center">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold">AI</span>
            </div>
            <p className="text-sm">Get personalised with AI</p>
          </div>
          <div className="text-center">
            <Heart className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm">Save hotels, restaurants, and more</p>
          </div>
          <div className="text-center">
            <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm">Share and collab with your travel buds</p>
          </div>
          <div className="text-center">
            <Map className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm">See your saves on your custom map</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12 mt-12">
          <div className="w-full max-w-md rounded-sm shadow-lg overflow-hidden">
            <div>
              <img
                src="src/assets/images/aiTripCreate.jpg"
                alt="AI Trip Planning"
                className="w-full h-60 object-cover "
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold pl-7 mb-3">
                  Start a trip in <br />
                  seconds with <span className="text-yellow-400">AI</span>
                </h2>
                <p className="text-gray-700 dark:text-gray-200 mb-4  pl-6">
                  Answer four short questions and AI will create a custom
                  day-by-day itinerary backed by traveller reviews.
                </p>
                <button onClick={handleAiClick} className="bg-yellow-400 px-4 py-2 m-5 rounded font-semibold hover:bg-yellow-500 transition-colors">
                  Use AI
                </button>
              </div>
            </div>
          </div>
          <div className="w-full max-w-md  rounded-sm shadow-lg overflow-hidden">
            <div>
              <img
                src="src/assets/images/buildTripScratch.jpg"
                alt="Build Your Trip"
                className="w-full h-60 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold pl-7 mb-3">
                  <span className="text-yellow-400">Build</span> your trip from{" "}
                  <br />
                  scratch
                </h2>
                <p className="text-gray-700 dark:text-gray-200 mb-4  pl-6">
                  Browse top destinations, restaurants, Browse top destinations,
                  restaurants,to your itinerary <br /> as you go.
                </p>
                <button onClick={handleManualClick} className="bg-yellow-400 px-4 py-2 m-5 font-semibold rounded hover:bg-yellow-500 transition-colors">
                  Build it
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UnauthTrip;
