import AdminLogin from "@/pages/admin/auth/AdminLogin";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from '@/pages/admin/AdminDashboard';

const AdminRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<AdminLogin/>} />
        <Route path="/dashboard" element={<AdminDashboard/>} />
    </Routes>
  )
};

export default AdminRoutes;
