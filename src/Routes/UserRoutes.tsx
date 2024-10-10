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
import Community from "@/pages/users/community/Community";
import SingleUserProfile from "@/pages/users/community/utils/SingleUserProfile";
import BookingSuccessPage from "@/pages/users/hotels/BookingSuccessPage";
const LandingPage = lazy(() => import("@/pages/users/homeScreen/LandingPage"));

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
        <Route path="/home" element={<WithAuth component={Home} />} />
        <Route path="/profile" element={<WithAuth component={UserProfile} />} />
        <Route path="/profile/viewBookingDetails" element={<WithAuth component={UserProfile} />} />
        <Route path="/trips" element={<WithAuth component={TripList} />} />
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
        <Route path="/explore" element={<WithAuth component={Explore} />} />
        <Route path="/community" element={<WithAuth component={Community} />} />
        <Route
          path="/:userName"
          element={<WithAuth component={SingleUserProfile} />}
        />
      </Routes>
    </Suspense>
  );
};

export default UserRoutes;
