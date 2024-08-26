import AdminLogin from "@/pages/admin/auth/AdminLogin";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ProtectedAdmin from "@/hocs/admin/ProtectedAdmin";
import PublicAdmin from "@/hocs/admin/PublicAdmin";
import AdminUsers from "@/pages/admin/AdminUsers";

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
    </Routes>
  );
};

export default AdminRoutes;
