import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import WithAuth from "@/hocs/user/WithAuth";
import WithoutAuth from "@/hocs/user/WithoutAuth";
import LoadingSpinner from "@/components/LoadingSpinner";
import Register from "@/pages/users/registration/Register";
import Login from "@/pages/users/auth/Login";
import Otp from "@/pages/users/registration/Otp";
import UserProfile from "@/pages/users/profile/UserProfile";
import TripList from "@/pages/users/trip/TripList";
import ForgotPassword from "@/pages/users/auth/forgot_Password/ForgotPassword";
import TripDetails from "@/pages/users/trip/TripDetails";
import Hotel from "@/pages/users/hotels/Hotel";
import SearchResults from "@/pages/users/hotels/SearchResults";
import HotelDetails from "@/pages/users/hotels/HotelDetails";
import BookingDetails from "@/pages/users/hotels/BookingDetails";
import Explore from "@/pages/users/explore/Explore";
import Home from "@/pages/users/home/Home";
import SingleUserProfile from "@/pages/community/utils/SingleUserProfile";
import BookingSuccessPage from "@/pages/users/hotels/BookingSuccessPage";
import TripsRoute from "@/hocs/user/TripsRoute";
import UnauthTrip from "@/pages/users/trip/UnauthTrip";
// import MessagePage from "@/pages/users/community/utils/MessagePage";
import AiTripCreate from "@/pages/users/trip/AiTripCreate";

import CommunityMessage from "@/pages/community/utils/CommunityMessage";
import MessagePage from "@/pages/community/utils/MessagePage";
import AiTripDetails from "@/pages/users/trip/utils_ai/AiTripDetails";

const LandingPage = lazy(() => import("@/pages/users/home/LandingPage"));
const communityPage = lazy(() => import("@/pages/community/Community"));

const UserRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/register"
          element={<WithoutAuth component={Register} />}
        />
        <Route path="/login" element={<WithoutAuth component={Login} />} />
        <Route path="/otp" element={<WithoutAuth component={Otp} />} />
        <Route
          path="/forgotPassword"
          element={<WithoutAuth component={ForgotPassword} />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<WithAuth component={UserProfile} />} />

        <Route
          path="/trips"
          element={
            <TripsRoute component={TripList} noAuthComponent={UnauthTrip} />
          }
        />
        <Route
          path="/ai-create-trip"
          element={<WithAuth component={AiTripCreate} />}
        />
        <Route
          path="/trips/:id"
          element={<WithAuth component={TripDetails} />}
        />
        <Route path="/hotels" element={<WithAuth component={Hotel} />} />
        <Route
          path="/search-results"
          element={<WithAuth component={SearchResults} />}
        />
        <Route path="/hotelDetails" element={<HotelDetails />} />
        <Route path="/bookingDetails/:bookingId" element={<BookingDetails />} />
        <Route path="/bookingSuccess" element={<BookingSuccessPage />} />
        <Route path="/explore" element={<Explore />} />
        <Route
          path="/community"
          element={<WithAuth component={communityPage} />}
        />
        <Route
          path="/message"
          element={<WithAuth component={CommunityMessage} />}
        />
        <Route
          path="/:userName"
          element={<WithAuth component={SingleUserProfile} />}
        />
        <Route
          path="/message/:userName"
          element={<WithAuth component={MessagePage} />}
        />
        <Route path="/bookingDetails/:bookingId" element={<BookingDetails />} />
        <Route path="/ai-trip-details/:tripId" element={<AiTripDetails />} />
      </Routes>
    </Suspense>
  );
};

export default UserRoutes;
