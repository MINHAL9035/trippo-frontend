import { Badge, message, Space } from "antd";
import { useEffect, useState } from "react";
import TableDropdown from "./TableDropdown";
import { IUser } from "@/interface/user/IUser.interface";
import { getUsers, updateUserStatus } from "@/service/api/admin";
import handleError from "@/utils/errorHandler";

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      const { users } = response.data as { users: IUser[] };
      setUsers(users);
    } catch (error) {
      handleError(error);
    }
  };

  const handleUserSelection = (userId: string, isSelected: boolean) => {
    setSelectedUsers((prev) =>
      isSelected ? [...prev, userId] : prev.filter((id) => id !== userId)
    );
  };

  const handleStatusUpdate = async (action: "block" | "unblock") => {
    if (selectedUsers.length === 0) {
      message.warning(
        "Please select at least one user to perform this action."
      );
      return;
    }

    try {
      await updateUserStatus(selectedUsers, action);
      message.success(
        `Users ${action === "block" ? "blocked" : "unblocked"} successfully`,
        3
      );
      fetchUsers();
      setSelectedUsers([]);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between md:flex-row space-y-4 md:space-y-0 rounded-lg p-2 m-4">
        <TableDropdown
          onBlock={() => handleStatusUpdate("block")}
          onUnblock={() => handleStatusUpdate("unblock")}
        />
      </div>
      <div className="relative overflow-x-auto  rounded-lg m-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) =>
                      setSelectedUsers(
                        e.target.checked ? users.map((user) => user._id) : []
                      )
                    }
                    checked={selectedUsers.length === users.length}
                  />
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Full Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-${user._id}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(e) =>
                        handleUserSelection(user._id, e.target.checked)
                      }
                      checked={selectedUsers.includes(user._id)}
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <img
                    src={user.image}
                    alt={user.fullName}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="px-6 py-4 font-medium">{user.fullName}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  {user.is_blocked ? (
                    <Space direction="vertical">
                      <Badge status="error" text="blocked" />
                    </Space>
                  ) : (
                    <Space direction="vertical">
                      <Badge status="success" text="unBlocked" />
                    </Space>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersTable;
