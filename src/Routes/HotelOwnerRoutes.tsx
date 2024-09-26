import WithOtpProtection from "@/hocs/hotelOwner/WithOtpProtection";
import LandingPage from "@/pages/hotelOwner/LandingPage";
import SuccessPage from "@/pages/hotelOwner/registration/SuccessPage";
import { Route, Routes } from "react-router-dom";
import DetailsStepperForm from "@/pages/hotelOwner/ownerDetailsStepperForm/DetailsStepperForm";
import OwnerDashboard from "@/pages/hotelOwner/ownerDashboard/OwnerDashboard";
import OwnerHotels from "@/pages/hotelOwner/ownerDashboard/OwnerHotels";

const HotelOwnerRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route
          path="/ownerDetails"
          element={<WithOtpProtection component={DetailsStepperForm} />}
        /> */}
        <Route path="/ownerDetails" element={<DetailsStepperForm />} />
        <Route
          path="/requested_success"
          element={<WithOtpProtection component={SuccessPage} />}
        />
        <Route path="/ownerDashboard" element={<OwnerDashboard />} />
        <Route path="/ownerHotels" element={<OwnerHotels />} />
      </Routes>
    </>
  );
};

export default HotelOwnerRoutes;
