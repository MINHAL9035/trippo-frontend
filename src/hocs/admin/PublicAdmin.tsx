import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface PublicAdminProps {
  component: React.ComponentType;
}

const PublicAdmin: React.FC<PublicAdminProps> = ({ component: Component }) => {
  const adminInfo = useSelector(
    (state: RootState) => state.adminInfo.adminInfo
  );
  return adminInfo ? <Navigate to="/admin/dashboard" /> : <Component />;
};

export default PublicAdmin;
