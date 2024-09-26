import Sidebar from "@/components/admin/Sidebar";
import React from "react";
import NavBar from "@/components/admin/NavBar";
import UsersTable from "./utils/UsersTable";

const AdminUsers: React.FC = () => {
  return (
    <>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 overflow-hidden">
          {/* Navbar */}
          <NavBar />
          {/* Main content */}
          <main className="flex-1 overflow-y-auto p-8">
            <UsersTable />
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
