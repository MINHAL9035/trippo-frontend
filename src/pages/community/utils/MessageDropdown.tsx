import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit, UsersRound } from "lucide-react";
import { searchUsers } from "@/service/api/community";
import { IUser } from "@/interface/user/IUser.interface";
import handleError from "@/utils/errorHandler";
import SearchResult from "./SearchResult";
import { useNavigate } from "react-router-dom";
import CreateGroupDropdown from "./CreateGroupDropdown";
const MessageDropdown = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<IUser[]>([]);
  const [createGroupVisible, setCreateGroupVisible] = useState(false);
  const navigate = useNavigate();

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

  const handleCreateGroup = () => {
    setCreateGroupVisible(!createGroupVisible);
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
        <div className="space-y-3">
          {!createGroupVisible && (
            <Input
              type="search"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full"
            />
          )}

          <Button
            className=" flex items-center justify-center gap-2"
            variant="outline"
            onClick={handleCreateGroup}
          >
            <UsersRound className="w-4 h-4" />
            Create New Group
          </Button>
          {createGroupVisible && (
            <CreateGroupDropdown onClose={() => setCreateGroupVisible(false)} />
          )}
          {!createGroupVisible && (
            <div className="h-64 overflow-y-auto custom-scrollbar">
              <SearchResult
                searchResults={searchResults}
                onUserClick={handleUserClick}
              />
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default MessageDropdown;
