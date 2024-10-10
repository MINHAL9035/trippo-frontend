import AdminLogin from "@/pages/admin/auth/AdminLogin";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "@/pages/admin/adminDashboard/AdminDashboard";
import ProtectedAdmin from "@/hocs/admin/ProtectedAdmin";
import PublicAdmin from "@/hocs/admin/PublicAdmin";
import AdminUsers from "@/pages/admin/adminUsers/AdminUsers";
import AdminHotelOwners from "@/pages/admin/adminHotelOwner/AdminHotelOwners";
import AdminVerifiedOwners from "@/pages/admin/adminHotelOwner/AdminVerifiedOwners";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicAdmin component={AdminLogin} />} />
      <Route
        path="/dashboard"
        element={<ProtectedAdmin component={AdminDashboard} />}
      />
      <Route
        path="/users"
        element={<ProtectedAdmin component={AdminUsers} />}
      />
      <Route
        path="/hotelOwners"
        element={<ProtectedAdmin component={AdminHotelOwners} />}
      />
      <Route
        path="/owners"
        element={<ProtectedAdmin component={AdminVerifiedOwners} />}
      />
    </Routes>
  );
};

export default AdminRoutes;
