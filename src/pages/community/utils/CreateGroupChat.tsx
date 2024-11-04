import React, { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UsersRound, X } from "lucide-react";
import { IUser } from "@/interface/user/IUser.interface";
import { searchUsers } from "@/service/api/community";
import handleError from "@/utils/errorHandler";
import { socketService } from "@/service/socket.service";
import { useNavigate } from "react-router-dom";

const CreateGroupChat = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [groupName, setGroupName] = useState("");
  const [searchResults, setSearchResults] = useState<IUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const performSearch = useCallback(
    async (searchQuery: string) => {
      try {
        if (!searchQuery) {
          setSearchResults([]);
          return;
        }
        const response = await searchUsers(searchQuery);
        if (response.status === 200) {
          // Filter out already selected users
          const filteredResults = response.data.filter(
            (user: IUser) =>
              !selectedUsers.some(
                (selectedUser) => selectedUser._id === user._id
              )
          );
          setSearchResults(filteredResults);
        }
      } catch (error) {
        handleError(error);
      }
    },
    [selectedUsers]
  );

  const debounceSearch = useCallback(
    (input: string) => {
      const timer = setTimeout(() => performSearch(input), 500);
      return () => clearTimeout(timer);
    },
    [performSearch]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
  };

  useEffect(() => {
    if (searchQuery) debounceSearch(searchQuery);
  }, [searchQuery, debounceSearch]);

  const handleUserSelect = (user: IUser) => {
    // Toggle user selection
    setSelectedUsers((prev) =>
      prev.some((u) => u._id === user._id)
        ? prev.filter((u) => u._id !== user._id)
        : [...prev, user]
    );
  };

  const handleUserClick = (userName: string) => {
    navigate(`/${userName}`);
  };

  const removeSelectedUser = (userId: string) => {
    setSelectedUsers((prev) => prev.filter((user) => user._id !== userId));
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim() || selectedUsers.length < 2) {
      return;
    }

    try {
      const groupData = {
        name: groupName,
        members: selectedUsers.map((user) => user._id),
      };

      // Emit socket event for group creation
      socketService.createGroup(groupData);

      // Reset form
      setGroupName("");
      setSelectedUsers([]);
      setIsDialogOpen(false);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex items-center justify-center gap-2 w-full"
          variant="outline"
        >
          <UsersRound className="w-4 h-4" />
          Create New Group
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Group Chat</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full"
          />

          <div className="flex flex-wrap gap-2">
            {selectedUsers.map((user) => (
              <Badge
                key={user._id}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {user.userName}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => removeSelectedUser(user._id)}
                />
              </Badge>
            ))}
          </div>

          <Input
            type="search"
            placeholder="Search users to add..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full"
          />

          <div className="max-h-48 overflow-y-auto">
            {searchResults.map((user) => (
              <div key={user._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedUsers.some((u) => u._id === user._id)}
                  onChange={() => handleUserSelect(user)}
                />
                <span onClick={() => handleUserClick(user.userName)}>
                  {user.userName}
                </span>
              </div>
            ))}
          </div>

          <Button
            className="w-full"
            onClick={handleCreateGroup}
            disabled={!groupName.trim() || selectedUsers.length < 2}
          >
            Create Group
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupChat;
