import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoLogOut, IoHomeOutline, IoPersonOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { adminLogout } from "@/service/api/admin";
import { AdminLogout } from "@/redux/slices/adminSlice";
import { toast } from "sonner";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const logoutResponse = await adminLogout();
    console.log("logoutResponse", logoutResponse);
    dispatch(AdminLogout());
    navigate("/admin/");
    toast.success("Logout Successfull!");
  };

  const navItems = [
    { name: "Dashboard", icon: IoHomeOutline, path: "/admin/dashboard" },
    { name: "Users", icon: IoPersonOutline, path: "/admin/users" },
  ];

  return (
    <div
      className={`${
        isExpanded ? "w-64" : "w-20"
      }  bg-white h-screen dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-xl transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {isExpanded && (
          <Link to="/admin/dashboard">
            <h1 className="text-xl font-semibold">
              Trippo<span className="font-bold text-yellow-500">Admin.</span>
            </h1>
          </Link>
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
        >
          {isExpanded ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          )}
        </button>
      </div>

      <nav className="mt-6">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors duration-200"
              >
                <item.icon className="w-5 h-5 mr-3" />
                {isExpanded && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full p-4  border-gray-200 dark:border-gray-700">
        <Link
          to="/logout"
          onClick={handleLogout}
          className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors duration-200"
        >
          <IoLogOut className="w-5 h-5 mr-3" />
          {isExpanded && <span>Log out</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
