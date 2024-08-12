import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedAdminProps {
  component: React.ComponentType;
}

const ProtectedAdmin: React.FC<ProtectedAdminProps> = ({
  component: Component,
}) => {
  const adminInfo = useSelector(
    (state: RootState) => state.adminInfo.adminInfo
  );
  return adminInfo ? <Component /> : <Navigate to="/admin/" />;
};

export default ProtectedAdmin;
