import { useEffect, useRef, useState } from "react";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { loggingOut } from "@/redux/slices/userSlice";
import { toast } from "sonner";

import { logout } from "@/service/api/user";
import { PiCaretDoubleRightThin } from "react-icons/pi";
import handleError from "@/utils/errorHandler";
import { IUser } from "@/interface/user/IUser.interface";
import { userDetails } from "@/service/api/userProfileApi";
import ToggleTheme from "./ToggleTheme";
import MobileNavbar from "./MobileNavbar";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<IUser | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logout();
    dispatch(loggingOut());
    navigate("/login");
    toast.success("Logout Successful!");
  };

  const hasFetchedUserProfile = useRef(false);

  useEffect(() => {
    if (userInfo?.email && !hasFetchedUserProfile.current) {
      hasFetchedUserProfile.current = true;
      (async (email: string) => {
        try {
          const response = await userDetails(email);
          setUserProfile(response.data);
        } catch (error) {
          handleError(error);
        }
      })(userInfo?.email);
    }
  }, [userInfo?.email]);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        setIsSticky(window.scrollY > navRef.current.offsetTop);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`bg-card text-card-foreground transition-all duration-300 ${
          isSticky ? "fixed top-0 left-0 right-0 shadow-md z-50" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Name */}
            <div className="flex items-center">
              <div className="flex-shrink-0 w-24">
                <Link to="/">
                  <h1 className="text-2xl font-bold">Trippo</h1>
                </Link>
              </div>
              {/* Desktop Menu */}
              <div className="hidden md:block ml-[30%] lg:ml-[50%] xl:ml-[40%]">
                <div className="flex items-baseline space-x-14">
                  <Link
                    to="/home"
                    className="px-3 py-2 rounded-md text-sm font-medium text-card-foreground hover:text-yellow-400 relative group"
                  >
                    Home
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                  </Link>
                  <Link
                    to="/explore"
                    className="px-3 py-2 rounded-md text-sm font-medium text-card-foreground hover:text-primary relative group"
                  >
                    Explore
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                  </Link>
                  <Link
                    to="/trips"
                    className="px-3 py-2 rounded-md text-sm font-medium text-card-foreground hover:text-primary relative group"
                  >
                    Trips
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                  </Link>
                  <Link
                    to="/community"
                    className="px-3 py-2 rounded-md text-sm font-medium text-card-foreground hover:text-primary relative group"
                  >
                    Community
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Theme Toggle and Profile Section */}
            <div className="hidden md:flex items-center space-x-4">
              <ToggleTheme />
              {userInfo ? (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <img
                      src={userProfile?.image}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-2xl"
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

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <ToggleTheme />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-card-foreground hover:text-primary hover:bg-background focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              >
                <span className="sr-only">Open main menu</span>

                <FiMenu className="block h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <MobileNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
      </nav>
      {isSticky && <div style={{ height: "64px" }} />}
    </>
  );
};

export default NavBar;
