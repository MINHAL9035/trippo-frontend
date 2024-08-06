import LandingPage from "@/pages/users/HomeScreen/LandingPage";
import Otp from "@/pages/users/Registration/Otp";
import Register from "@/pages/users/Registration/Register";
import Login from "@/pages/users/auth/Login";

import { Route, Routes } from "react-router-dom";
export const UserRouters = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<Otp />} />
    </Routes>
  );
};

export default UserRouters;
