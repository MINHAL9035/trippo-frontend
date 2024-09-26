import LoadingSpinner from "@/components/LoadingSpinner";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import HotelOwnerRoutes from "./HotelOwnerRoutes";

const UserRoutes = lazy(() => import("./UserRoutes"));
const AdminRoutes = lazy(() => import("./AdminRoutes"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/hotelOwner/*" element={<HotelOwnerRoutes />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
