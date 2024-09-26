import NavBar from "@/components/admin/NavBar";
import Sidebar from "@/components/admin/Sidebar";
import HotelOwnerTable from "./utils/HotelOwnerTable";

const AdminHotelOwners = () => {
  return (
    <>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 overflow-hidden">
          {/* Navbar */}
          <NavBar />
          {/* Main content */}
          <main className="flex-1 overflow-y-auto p-8">
           <HotelOwnerTable/>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminHotelOwners;
