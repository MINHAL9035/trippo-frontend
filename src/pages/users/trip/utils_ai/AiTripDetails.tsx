import Footer from "@/components/user/Footer";
import NavBar from "@/components/user/NavBar";
import { getAiCreatedTrip } from "@/service/api/trip";
import handleError from "@/utils/errorHandler";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AiDetailsInfo from "./AiDetailsInfo";
import AiDetailsHotel from "./AiDetailsHotel";
import PlacesToVisit from "./PlacesToVisit";
import { Trip } from "@/interface/user/aitripListing.interface";

const AiTripDetails = () => {
  const [aiTripDetails, setAiTripDetails] = useState<Trip | null>(null);
  const { tripId } = useParams();

  useEffect(() => {
    const fetchAitrip = async () => {
      try {
        const response = await getAiCreatedTrip(tripId);
        if (response?.status === 200) {
          setAiTripDetails(response.data);
        }
      } catch (error) {
        handleError(error);
      }
    };

    fetchAitrip();
  }, [tripId]);

  console.log("getting ai trip details ", aiTripDetails);

  return (
    <>
      <NavBar />
      <div className="p-10 md:px-20 lg:px-44 xl:px-56">
        {/* Information section */}
        <AiDetailsInfo trip={aiTripDetails} />
        {/* Recommended Hotels */}
        <AiDetailsHotel trip={aiTripDetails} />
        {/* Daily plan  */}
        <PlacesToVisit trip={aiTripDetails} />
      </div>
      <Footer />
    </>
  );
};

export default AiTripDetails;
