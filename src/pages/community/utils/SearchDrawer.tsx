import { IUser } from "@/interface/user/IUser.interface";
import { searchUsers } from "@/service/api/community";
import handleError from "@/utils/errorHandler";
import { X, Search } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import SearchResult from "./SearchResult";
import { useNavigate } from "react-router-dom";

interface SearchDrawerProps {
  isSearchOpen: boolean;
  onClose: () => void;
}

const SearchDrawer = ({ isSearchOpen, onClose }: SearchDrawerProps) => {
  const [searchResults, setSearchResults] = useState<IUser[]>([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleUserClick = (userName: string) => {
    navigate(`/${userName}`);
  };
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
    setQuery(newQuery);
  };

  useEffect(() => {
    if (query) debounceSearch(query);
  }, [query, debounceSearch]);

  useEffect(() => {
    if (!isSearchOpen) {
      setSearchResults([]);
      setQuery("");
    }
  }, [isSearchOpen]);

  return (
    <div
      className={`fixed left-28 top-0 h-full  transition-all duration-300 z-10 ${
        isSearchOpen ? "w-80 border-r " : "w-0"
      } overflow-hidden`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Search</h2>
          <button
            onClick={onClose}
            className="p-2 hover:text-yellow-400 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search ..."
            value={query}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
        <div className="mt-4">
          <SearchResult
            searchResults={searchResults}
            onUserClick={handleUserClick}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchDrawer;
