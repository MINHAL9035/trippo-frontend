import { useState } from "react";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { loggingOut } from "@/redux/slices/userSlice";
import { toast } from "sonner";
import ToggleTheme from "./ToggleTheme";
import { logout } from "@/service/api/user";
import { PiCaretDoubleRightThin } from "react-icons/pi";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const logoutResponse = await logout();
    console.log("logoutResponse", logoutResponse);
    dispatch(loggingOut());
    navigate("/login");
    toast.success("Logout Successful!");
  };

  return (
    <nav className="  bg-card text-card-foreground">
      <div className="m mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0  w-24">
              <Link to="/">
              <h1 className="text-2xl font-bold">Trippo</h1>
              </Link>
             
            </div>
            <div className="hidden  md:block ml-96">
              <div className="flex items-baseline space-x-10">
                {[
                  { name: "Home", path: "/" },
                  { name: "Explore", path: "/explore" },
                  { name: "Trips", path: "/trips" },
                  { name: "Community", path: "/community" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-card-foreground px-3 py-2 rounded-md text-sm font-medium relative group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <ToggleTheme />
            {userInfo ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={
                      userInfo.profileImage || "/src/assets/images/profile.jpg"
                    }
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <FiChevronDown
                    className={`transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-card rounded-md shadow-lg py-1 z-10">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-card-foreground hover:bg-background"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-card-foreground hover:bg-background"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="btn relative inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-yellow-100 rounded hover:bg-white group py-1.5 px-2.5">
                  <span className="w-56 h-48 rounded bg-yellow-500 absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                  <span className="relative w-full text-left text-yellow-500 transition-colors duration-300 ease-in-out group-hover:text-white flex items-center">
                    Sign In
                    <span className="mx-2 h-4 w-px bg-yellow-200 group-hover:bg-white"></span>
                    <PiCaretDoubleRightThin />
                  </span>
                </button>
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

      {/* mobile view */}

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {[
              { name: "Home", path: "/" },
              { name: "Explore", path: "/explore" },
              { name: "Trips", path: "/trips" },
              { name: "Community", path: "/community" },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-card-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-card">
            <div className="flex items-center px-5">
              <ToggleTheme />
              {userInfo ? (
                <div className="ml-4">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <img
                      src={
                        userInfo.profileImage ||
                        "/src/assets/images/profile.jpg"
                      }
                      alt="User Avatar"
                      className="w-10 h-8 rounded-full"
                    />
                    <FiChevronDown
                      className={`transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isDropdownOpen && (
                    <div className="mt-2 space-y-1">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-card-foreground hover:bg-background"
                      >
                        Account
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-card-foreground hover:bg-background"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <button className="btn relative inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-yellow-100 rounded hover:bg-white group py-1.5 px-2.5">
                    <span className="w-56 h-48 rounded bg-yellow-500 absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                    <span className="relative w-full text-left text-yellow-500 transition-colors duration-300 ease-in-out group-hover:text-white">
                      Sign In
                    </span>
                  </button>
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
