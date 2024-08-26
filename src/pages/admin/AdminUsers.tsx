import Sidebar from "@/components/admin/Sidebar";
import React from "react";
import ToggleTheme from '@/components/user/ToggleTheme';
import UsersTable from "@/components/admin/UsersTable";

const AdminUsers: React.FC = () => {
  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-900 h-screen flex ">
        <Sidebar />
        <main className=" flex-1 overflow-y-auto">
          <div className="flex justify-end p-2">
            <ToggleTheme/>
          </div>
         <UsersTable/>
        </main>
      </div>
    </>
  );
};

export default AdminUsers;
