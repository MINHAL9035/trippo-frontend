import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { Button } from "../ui/button";
import { loggingOut } from "@/redux/slices/userSlice";
import { toast } from "sonner";
import ToggleTheme from "./ToggleTheme";
import { logout } from "@/service/api/user";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const logoutResponse = await logout();
    console.log("logoutResponse", logoutResponse);
    dispatch(loggingOut());
    navigate("/login");
    toast.success("Logout Successfull!");
  };

  return (
    <nav className="shadow-md bg-card text-card-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold">Trippo</h1>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {["Home", "Explore", "Trips", "Community"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-card-foreground px-3 py-2 rounded-md text-sm font-medium relative group"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <ToggleTheme />
            {userInfo ? (
              <Link to="/logout">
                <Button
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 text-sm font-medium"
                >
                  Logout
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button className="ml-4 px-4 py-2 text-sm font-medium">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-card-foreground hover:text-primary hover:bg-background focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {["Home", "Explore", "Trips", "Community"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-card-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-card">
            <div className="flex items-center px-5">
              <ToggleTheme />
              {userInfo ? (
                <Link to="/logout">
                  <Button
                    onClick={handleLogout}
                    className="ml-4 px-4 py-2 text-sm font-medium"
                  >
                    Logout
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button className="ml-4 px-4 py-2 text-sm font-medium">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
