import { Drawer } from "antd";
import { Link, useNavigate } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { logout } from "@/service/api/user";
import { loggingOut } from "@/redux/slices/userSlice";
import { toast } from "sonner";

interface MobileNavbarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
  }

const MobileNavbar: React.FC<MobileNavbarProps> = ({ isOpen, setIsOpen }) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    dispatch(loggingOut());
    navigate("/login");
    toast.success("Logout Successful!");
  };
  return (
    <>
      <Drawer
        placement="left"
        closable={true}
        onClose={() => setIsOpen(false)}
        open={isOpen}
        key="left"
      >
        <div className="flex flex-col space-y-4">
          <Link
            to="/"
            className="block px-3 py-2 text-base font-medium text-card-foreground hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/explore"
            className="block px-3 py-2 text-base font-medium text-card-foreground hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Explore
          </Link>
          <Link
            to="/trips"
            className="block px-3 py-2 text-base font-medium text-card-foreground hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Trips
          </Link>
          <Link
            to="/community"
            className="block px-3 py-2 text-base font-medium text-card-foreground hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Community
          </Link>
          <Link
            to="/hotels"
            className="block px-3 py-2 text-base font-medium text-card-foreground hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Hotels
          </Link>
          <Link
            to="/places"
            className="block px-3 py-2 text-base font-medium text-card-foreground hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Things to Do
          </Link>
          <Link
            to="/restuarants"
            className="block px-3 py-2 text-base font-medium text-card-foreground hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Resturarnt
          </Link>
          <div className="pt-4 border-t border-card">
            <ToggleTheme />
            {userInfo ? (
              <div className="mt-4">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-card-foreground hover:bg-background"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-card-foreground hover:bg-background"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <button className="btn relative inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-yellow-100 rounded hover:bg-white group py-1.5 px-2.5 mt-4">
                  <span className="w-56 h-48 rounded bg-yellow-500 absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                  <span className="relative w-full text-left text-yellow-500 transition-colors duration-300 ease-in-out group-hover:text-white">
                    Sign In
                  </span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default MobileNavbar;
