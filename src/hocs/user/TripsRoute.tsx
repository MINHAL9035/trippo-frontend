import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";

interface TripsRouteProps {
  component: React.ComponentType;
  noAuthComponent: React.ComponentType;
}

const TripsRoute: React.FC<TripsRouteProps> = ({
  component: Component,
  noAuthComponent: NoAuthComponent,
}) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  return userInfo ? <Component /> : <NoAuthComponent />;
};

export default TripsRoute;
