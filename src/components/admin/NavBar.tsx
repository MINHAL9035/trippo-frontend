import ToggleTheme from "@/components/user/ToggleTheme";
import { IoNotificationsOutline } from "react-icons/io5";
const NavBar = () => {
  return (
    <>
      <header className="bg-white dark:bg-gray-800 ">
        <div className="   px-4 sm:px-6 lg:px-8">
          <div className="flex items-center  h-[73PX]">
            <div className=" ml-[90%] flex items-center space-x-5">
              <button className="ml-3 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <IoNotificationsOutline className="h-6 w-6" />
              </button>
              <ToggleTheme />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
