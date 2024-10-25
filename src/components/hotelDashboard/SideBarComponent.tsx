import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { LayoutDashboard, Hotel, Settings, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ownerLogout } from "@/redux/slices/hotelOwnerSlice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { ownerLoggedOut } from "@/service/api/hotelOwner";

interface SideBarProps {
  collapsed: boolean;
}

const SideBarComponent: React.FC<SideBarProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const response = await ownerLoggedOut();
    if (response?.status === 201) {
      dispatch(ownerLogout());
      navigate("/hotelOwner/");
      toast.success("Logout Successful!");
    }
  };

  return (
    <>
      <Sidebar
        collapsed={collapsed}
        className="h-screen border-r border-gray-200"
      >
        <div className="p-4">
          <h2
            className={`text-2xl font-bold text-yellow-500 mb-4 ${
              collapsed ? "hidden" : ""
            }`}
          >
            <span className="text-black">Trippo</span>Hotels
          </h2>
        </div>
        <Menu>
          <MenuItem
            icon={<LayoutDashboard size={20} />}
            className="mb-2"
            component={<Link to="/hotelOwner/ownerDashboard" />}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            icon={<Hotel size={20} />}
            className="mb-2"
            component={<Link to="/hotelOwner/ownerHotels" />}
          >
            Hotels
          </MenuItem>
          <MenuItem
            icon={<Hotel size={20} />}
            className="mb-2"
            component={<Link to="/hotelOwner/bookings" />}
          >
            Bookings
          </MenuItem>
          <MenuItem icon={<Settings size={20} />} className="mb-2">
            Settings
          </MenuItem>
          <MenuItem
            onClick={handleLogout}
            icon={<LogOut size={20} />}
            className="mt-auto"
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
};

export default SideBarComponent;
