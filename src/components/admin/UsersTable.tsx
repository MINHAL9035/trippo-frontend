import { Badge, message, Space } from "antd";
import { useEffect, useState } from "react";
import TableDropdown from "./TableDropdown";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { IUser } from "@/interface/user/IUser.interface";
import { getUsers, updateUserStatus } from "@/service/api/admin";
import handleError from "@/utils/errorHandler";

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page: number) => {
    try {
      const response = await getUsers(page);
      const { users, totalPages } = response.data as { users: IUser[]; totalPages: number };
      setUsers(users);
      setTotalPages(totalPages);
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
      message.warning("Please select at least one user to perform this action.");
      return;
    }

    try {
      await updateUserStatus(selectedUsers, action);
      message.success(
        `Users ${action === "block" ? "blocked" : "unblocked"} successfully`,
        3
      );
      fetchUsers(currentPage); // Refresh users list after status update
      setSelectedUsers([]);
    } catch (error) {
      handleError(error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="flex items-center justify-between md:flex-row space-y-4 md:space-y-0 rounded-lg p-2 m-4">
        <TableDropdown
          onBlock={() => handleStatusUpdate("block")}
          onUnblock={() => handleStatusUpdate("unblock")}
        />
        {/* <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for users"
          />
        </div> */}
      </div>
      <div className="relative overflow-x-auto shadow-xl rounded-lg m-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
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
                First Name
              </th>
              <th scope="col" className="px-6 py-3">
                Last Name
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
                    alt={user.firstName}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {user.firstName}
                </td>
                <td className="px-6 py-4">{user.lastName}</td>
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
      <Pagination>
        <PaginationPrevious
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
        >
          Previous
        </PaginationPrevious>
        <PaginationContent>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem
              key={index + 1}
              isActive={currentPage === index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </PaginationItem>
          ))}
        </PaginationContent>
        <PaginationNext
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
        >
          Next
        </PaginationNext>
      </Pagination>
    </>
  );
};

export default UsersTable;
