import { IUser } from "@/interface/user/IUser.interface";

interface SearchResultProps {
  searchResults: IUser[];
  onUserClick: (userName: string) => void;
}

const SearchResult = ({ searchResults, onUserClick }: SearchResultProps) => {
  return (
    <div className="divide-y divide-gray-200">
      {searchResults.length ? (
        searchResults.map((user) => (
          <div
            key={user._id}
            className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => onUserClick(user.userName)}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <img
                  className="w-10 h-10 rounded-full"
                  src={user.image}
                  alt={user.fullName}
                />
              </div>
              <div className="ml-3">
                <p className="font-medium">{user.fullName}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">No results found.</p>
      )}
    </div>
  );
};

export default SearchResult;
