import { IUser } from "@/interface/user/IUser.interface";

export const SearchCreateResult = ({
  user,
  toggleUserSelection,
  selectedUsers,
}: {
  user: IUser;
  toggleUserSelection: (user: IUser) => void;
  selectedUsers: IUser[];
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-100">
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          checked={selectedUsers.some((u) => u._id === user._id)}
          onChange={() => toggleUserSelection(user)}
          className="form-checkbox h-5 w-5 text-indigo-600"
        />
        <div>
          <p className="font-medium">{user.userName}</p>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
    </div>
  );
};
