import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import handleError from "@/utils/errorHandler";
import { getAllUsers } from "@/service/api/community";
import { IUser } from "@/interface/user/IUser.interface";

const UsersList = () => {
  const [allUsers, setAllUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await getAllUsers();
        if (response.status === 200) {
          setAllUsers(response.data);
        }
      } catch (error) {
        handleError(error);
      }
    };
    fetchAllUsers();
  }, [setAllUsers]);

  console.log("sf", allUsers);

  return (
    <div className=" text-black p-6 max-w-md mx-auto font-sans">
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <div>
            <h2 className="text-md font-bold">
              Find friends and accounts that you like
            </h2>
          </div>
        </div>
        <button className="bg-blue-500 text-white px-3 py-1 rounded-sm text-sm font-semibold float-right -mt-9">
          Next
        </button>
      </div>

      <div className="relative mb-6">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-100 text-black pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 text-sm"
        />
      </div>

      <ul className="space-y-4">
        {allUsers.map((user) => (
          <li key={user._id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={user.image}
                alt={user.fullName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="flex items-center">
                  <p className="font-semibold text-sm">{user.fullName}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => {}}
              className={`px-3 py-1 rounded-full text-sm font-semibold `}
            >
              follow
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
