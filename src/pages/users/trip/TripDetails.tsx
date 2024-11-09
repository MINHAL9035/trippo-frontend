import Footer from "@/components/user/Footer";
import NavBar from "@/components/user/NavBar";
import { getFullTripDetails } from "@/service/api/trip";
import handleError from "@/utils/errorHandler";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TripDetailsContent from "./utils_ai/TripDetailsContent";

const TripDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [fullTripDetails, setFullTripDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTripfulldetails = async () => {
      try {
        setLoading(true);
        const response = await getFullTripDetails(id);
        if (response?.status === 200) {
          setFullTripDetails(response.data);
        }
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTripfulldetails();
  }, [id]);

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Links */}
        <nav className="sticky top-16 z-50 bg-white border-b">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex space-x-8 py-4">
              <Link
                to="/hotels"
                className="text-gray-600 hover:text-yellow-500 hover:underline transition-colors"
              >
                Hotels
              </Link>
              <Link
                to="/explore"
                className="text-gray-600 hover:text-yellow-500 hover:underline transition-colors"
              >
                Attractions
              </Link>
              <Link
                to="/explore"
                className="text-gray-600 hover:text-yellow-500 hover:underline transition-colors"
              >
                Restaurants
              </Link>
            </div>
          </div>
        </nav>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading trip details...</p>
          </div>
        ) : fullTripDetails.length > 0 ? (
          <TripDetailsContent tripData={fullTripDetails} />
        ) : (
          <div className="max-w-6xl mx-auto px-4 py-12 text-center">
            <h2 className="text-2xl font-semibold mb-4">No saves yet</h2>
            <p className="text-gray-600">
              Start exploring and save places to your trip!
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default TripDetails;
