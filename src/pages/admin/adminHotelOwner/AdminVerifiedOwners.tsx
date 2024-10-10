import Sidebar from "@/components/admin/Sidebar";
import NavBar from "@/components/admin/NavBar";
import OwnerTable from "./utils/OwnerTable";
const AdminVerifiedOwners = () => {
  return (
    <>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 overflow-hidden">
          {/* Navbar */}
          <NavBar />
          {/* Main content */}
          <main className="flex-1 overflow-y-auto p-8">
            <OwnerTable />
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminVerifiedOwners;
