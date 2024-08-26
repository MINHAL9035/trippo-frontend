import LoadingSpinner from '@/components/LoadingSpinner';
import  { lazy, Suspense } from 'react';
import { Route, Routes } from "react-router-dom";

const UserRoutes = lazy(() => import("./UserRoutes"));
const AdminRoutes = lazy(() => import("./AdminRoutes"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;