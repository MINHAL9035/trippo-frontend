import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit, UsersRound, ArrowLeft, X } from "lucide-react";
import { searchUsers } from "@/service/api/community";
import { IUser } from "@/interface/user/IUser.interface";
import handleError from "@/utils/errorHandler";
import SearchResult from "./SearchResult";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { socketService } from "@/service/socket.service";

const MessageDropdown = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<IUser[]>([]);
  const [showGroupCreation, setShowGroupCreation] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<IUser[]>([]);
  const [groupName, setGroupName] = useState("");
  const navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const userId = userInfo.userId;

  const performSearch = useCallback(async (searchQuery: string) => {
    try {
      if (!searchQuery) {
        setSearchResults([]);
        return;
      }
      const response = await searchUsers(searchQuery);
      if (response.status === 200) {
        setSearchResults(response.data);
      }
    } catch (error) {
      handleError(error);
    }
  }, []);

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

  const handleUserClick = (userName: string) => {
    navigate(`/${userName}`);
  };

  const handleBackClick = () => {
    if (selectedMembers.length > 0 || groupName) {
      setShowConfirmDialog(true);
    } else {
      setShowGroupCreation(false);
    }
  };

  const handleConfirmBack = () => {
    setShowConfirmDialog(false);
    setShowGroupCreation(false);
    setSelectedMembers([]);
    setGroupName("");
  };

  const handleMemberSelect = (user: IUser) => {
    setSelectedMembers((prev) => {
      const isSelected = prev.some((member) => member._id === user._id);
      if (isSelected) {
        return prev.filter((member) => member._id !== user._id);
      }
      return [...prev, user];
    });
  };

  const removeMember = (userId: string) => {
    setSelectedMembers((prev) =>
      prev.filter((member) => member._id !== userId)
    );
  };

  const handleCreateGroup = async () => {
    try {
      if (!groupName || selectedMembers.length === 0 || !userId) return;

      const groupData = {
        groupName,
        members: selectedMembers.map((member) => member._id),
        userId,
      };

      const response = await socketService.createGroup(groupData);

      if (response.success) {
        socketService.joinGroup(response.group._id);

        setShowGroupCreation(false);
        setSelectedMembers([]);
        setGroupName("");
      } else {
        console.error("Failed to create group:", response.error);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gray-100 rounded-full"
        >
          <Edit className="w-5 h-5 text-gray-600" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-3 h-96" align="start">
        {!showGroupCreation ? (
          <div className="space-y-3">
            <Input
              type="search"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full"
            />
            <Button
              className="flex items-center justify-center gap-2"
              variant="outline"
              onClick={() => setShowGroupCreation(true)}
            >
              <UsersRound className="w-4 h-4" />
              Create New Group
            </Button>
            <div className="overflow-y-auto h-[calc(100%-rem)]">
              <SearchResult
                searchResults={searchResults}
                onUserClick={handleUserClick}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBackClick}
                className="hover:bg-gray-100"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <span className="font-medium">Create New Group</span>
            </div>
            <Input
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full mb-4"
            />
            <div className="text-sm text-gray-500 mb-2">Members:</div>
            <div className="flex flex-wrap gap-2 mb-4 max-h-24 overflow-y-auto">
              {selectedMembers.map((member) => (
                <div
                  key={member._id}
                  className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1"
                >
                  <span className="text-sm">{member.userName}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 rounded-full"
                    onClick={() => removeMember(member._id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
            <Input
              type="search"
              placeholder="Search users..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full"
            />
            <div className="overflow-y-auto h-[calc(100%-20rem)]">
              {searchResults.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg"
                >
                  <Checkbox
                    checked={selectedMembers.some(
                      (member) => member._id === user._id
                    )}
                    onCheckedChange={() => handleMemberSelect(user)}
                  />
                  <img
                    src={user.image}
                    alt={user.userName}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{user.fullName}</div>
                    <div className="text-sm text-gray-500">
                      @{user.userName}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              className="w-full mt-4"
              disabled={!groupName || selectedMembers.length === 0}
              onClick={handleCreateGroup}
            >
              Create Group
            </Button>
          </div>
        )}
      </PopoverContent>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Going back will clear all selected members and group information.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmBack}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Popover>
  );
};

export default MessageDropdown;
