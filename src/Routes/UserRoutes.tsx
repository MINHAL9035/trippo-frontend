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
        <Route path="/profile" element={<WithAuth component={UserProfile} />} />
        <Route path="/trips" element={<WithAuth component={TripList} />} />
      </Routes>
    </Suspense>
  );
};

export default UserRoutes;
