import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IUser } from "@/interface/user/IUser.interface";
import { searchUsers } from "@/service/api/community";
import handleError from "@/utils/errorHandler";
import { SearchCreateResult } from "./SearchCreateResult";
import socket from "@/service/socket.service";
import { message } from "antd";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";

interface CreateGroupDropdownProps {
  onClose: () => void;
}

const CreateGroupDropdown = ({ onClose }: CreateGroupDropdownProps) => {
  const [groupName, setGroupName] = useState("");
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [userSearchResults, setUserSearchResults] = useState<IUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const performUserSearch = useCallback(async (searchQuery: string) => {
    try {
      if (!searchQuery) {
        setUserSearchResults([]);
        return;
      }
      const response = await searchUsers(searchQuery);
      if (response.status === 200) {
        setUserSearchResults(response.data);
      }
    } catch (error) {
      handleError(error);
    }
  }, []);

  const handleUserSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setUserSearchQuery(newQuery);
    debounceUserSearch(newQuery);
  };

  const debounceUserSearch = useCallback(
    (input: string) => {
      const timer = setTimeout(() => performUserSearch(input), 500);
      return () => clearTimeout(timer);
    },
    [performUserSearch]
  );

  const toggleUserSelection = (user: IUser) => {
    if (selectedUsers.some((u) => u._id === user._id)) {
      setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleCreateNewGroup = () => {
    socket.emit("createGroup", {
      groupName,
      selectedUsers: [
        ...selectedUsers.map((user) => user._id),
        userInfo.userId,
      ],
    });
    onClose();
    message.success("Group created successfully!");
  };
  return (
    <div className="space-y-3">
      <Input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="w-full"
      />
      <Input
        type="search"
        placeholder="Search users"
        value={userSearchQuery}
        onChange={handleUserSearchInput}
        className="w-full"
      />
      <div className="h-40 overflow-y-auto custom-scrollbar">
        <div className="h-40 overflow-y-auto custom-scrollbar">
          {userSearchResults.map((user) => (
            <SearchCreateResult
              key={user._id}
              user={user}
              toggleUserSelection={toggleUserSelection}
              selectedUsers={selectedUsers}
            />
          ))}
        </div>
      </div>

      <Button
        className=" flex items-center justify-center gap-2 "
        variant="outline"
        onClick={handleCreateNewGroup}
      >
        Create Group
      </Button>
    </div>
  );
};

export default CreateGroupDropdown;
