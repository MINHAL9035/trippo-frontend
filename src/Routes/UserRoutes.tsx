import Login from "@/pages/users/auth/Login";
import HomePage from "@/pages/users/homeScreen/HomePage";
import LandingPage from "@/pages/users/homeScreen/LandingPage";
import Otp from "@/pages/users/registration/Otp";
import Register from "@/pages/users/registration/Register";
import { Route, Routes } from "react-router-dom";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};

export default UserRoutes;
