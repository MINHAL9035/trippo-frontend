import { MapPin } from "lucide-react";
import { BsAirplane } from "react-icons/bs";
import {
  FaCamera,
  FaCircleNotch,
  FaPassport,
  FaSuitcase,
} from "react-icons/fa";
import { PiGlobeHemisphereEast } from "react-icons/pi";

const AITripLoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
        <div className="relative w-40 h-40 mx-auto mb-8">
          <FaCircleNotch className="w-40 h-40 text-yellow-400 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-32 h-32">
              <PiGlobeHemisphereEast className="w-32 h-32 text-blue-500 animate-pulse" />
              <BsAirplane className="w-10 h-10 text-gray-700 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-fly" />
              <MapPin className="w-8 h-8 text-red-500 absolute bottom-2 right-2 animate-ping" />
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-gray-800 animate-fade-in">
          Crafting Your Dream Trip
        </h2>
        <p className="text-gray-600 mb-6 animate-fade-in-delay">
          Our AI is weaving together the perfect tapestry of experiences for
          your adventure. Hang tight, your personalized journey is just moments
          away...
        </p>

        <div className="flex justify-center space-x-4 mb-6">
          <FaSuitcase
            className="text-3xl text-yellow-500 animate-bounce"
            style={{ animationDelay: "0s" }}
          />
          <FaPassport
            className="text-3xl text-green-500 animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />
          <FaCamera
            className="text-3xl text-blue-500 animate-bounce"
            style={{ animationDelay: "0.4s" }}
          />
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 animate-loading-bar"></div>
        </div>

        <p className="text-sm text-gray-500 italic animate-pulse">
          Discovering hidden gems and unforgettable experiences...
        </p>
      </div>
    </div>
  );
};

export default AITripLoadingScreen;
