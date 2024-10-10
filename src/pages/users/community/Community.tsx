import { useState, useEffect, useCallback, useMemo } from "react";
import { Home, MessageCircle, PlusCircle, User, Search, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import PostList from "./utils/PostList";
import CreatePostModal from "./utils/CreatePostModal";
import UsersList from "./utils/UsersList";
import CommunityProfile from "./utils/CommunityProfile";
import { getUserPost, searchUsers } from "@/service/api/community";
import handleError from "@/utils/errorHandler";
import { RootState } from "@/redux/store/store";
import { IUser } from "@/interface/user/IUser.interface";
import NavBar from "@/components/user/NavBar";
import SingleUserProfile from "./utils/SingleUserProfile";
import CommunityMessage from "./utils/CommunityMessage";

const Community = () => {
  const [activeItem, setActiveItem] = useState("Home");
  const [isCompact, setIsCompact] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<IUser[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();
  const [refreshPosts, setRefreshPosts] = useState(0);

  // ============ OPENING AND CLOSING OF NAVITEMS ===================
  const sidebarItems = [
    { name: "Home", icon: Home },
    { name: "Search", icon: Search },
    { name: "Messages", icon: MessageCircle },
    { name: "Create", icon: PlusCircle },
    { name: "Profile", icon: User },
  ];

  const handleItemClick = useCallback((itemName: string) => {
    if (itemName === "Create") {
      setIsModalOpen(true);
      return;
    }

    if (["Search", "Messages", "Notifications"].includes(itemName)) {
      setDrawerType(itemName.toLowerCase());
      setShowDrawer(true);
      setIsCompact(true);
      if (itemName !== "Search") {
        setActiveItem(itemName);
      }
      return;
    }

    setActiveItem(itemName);
    setDrawerType(null);
    setIsCompact(false);
    setShowDrawer(false);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setShowDrawer(false);
    setIsCompact(false);
    setDrawerType(null);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setActiveItem("Home");
    setRefreshPosts((prev) => prev + 1);
  }, []);
  // =======================================

  // handleSingleUserProfile
  const handleUserClick = (userName: string) => {
    console.log("fdkfj", userName);

    navigate(`/${userName}`);
    setShowDrawer(false);
    setIsCompact(false);
  };

  //=================  HANDLING SEARCH =====================
  const search = useCallback((query: string) => {
    const performSearch = async () => {
      try {
        setIsSearching(true);
        const response = await searchUsers(query);
        if (response.status === 200) {
          setSearchResults(response.data);
        }
      } catch (error) {
        handleError(error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, []);

  console.log("sjd", searchResults);

  const debouncedSearch = useMemo(() => debounce(search, 500), [search]);
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchQuery(query);
      debouncedSearch(query);
    },
    [debouncedSearch]
  );

  const renderSearchResults = () => {
    if (isSearching) {
      return (
        <div className="p-4 text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-400 mx-auto"></div>
        </div>
      );
    }

    if (searchResults.length === 0 && searchQuery.trim()) {
      return (
        <div className="p-4 text-center text-gray-500">
          No users found matching "{searchQuery}"
        </div>
      );
    }

    return (
      <div className="divide-y divide-gray-200">
        {searchResults.map((user) => (
          <div
            key={user._id}
            className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => handleUserClick(user.userName)}
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
        ))}
      </div>
    );
  };

  // ================================================================

  // ============ FETCH POST FOR SPECIFIC USER =======================
  useEffect(() => {
    const fetchUserPost = async () => {
      try {
        setIsLoading(true);
        const response = await getUserPost(userInfo.userId);
        if (response.status === 200) {
          setPosts(response.data);
        }
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPost();
  }, [userInfo.userId]);

  // =============================================

  // ========== DRAWER CONTENTS ===================

  const renderDrawerContent = () => {
    switch (drawerType) {
      case "search":
        return (
          <div className="flex flex-col h-full">
            <div className="p-4">
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                autoFocus
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              {renderSearchResults()}
            </div>
          </div>
        );
      case "messages":
        return <div className="p-4">Messages Contxcsent</div>;
      case "notifications":
        return <div className="p-4">Notifications Content</div>;
      default:
        return null;
    }
  };

  // ================= MAIN CONTENTS ==============
  const renderContent = () => {
    switch (activeItem) {
      case "Home":
        return isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
          </div>
        ) : posts.length > 0 ? (
          <PostList key={refreshPosts} />
        ) : (
          <div className=" rounded-lg  p-4">
            <h2 className="text-xl font-semibold mb-4">
              Welcome to Trippo{" "}
              <span className="text-yellow-400">Community!</span>
            </h2>
            <UsersList />
          </div>
        );
      case "Profile":
        return <CommunityProfile />;
      case "Messages":
        return <CommunityMessage />;
      case "searchresult":
        return <SingleUserProfile />;
      default:
        return null;
    }
  };

  // ================ MAIN COMPONENT RETURN =====================
  return (
    <>
      <NavBar />
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="flex flex-1">
          <div
            className={`bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ${
              isCompact ? "w-20" : "w-72"
            }`}
          >
            <Link to="/home">
              <h1
                className={`font-bold m-8 text-2xl ${
                  isCompact ? "hidden" : ""
                }`}
              >
                Trippo <span className="text-yellow-400">Community</span>
              </h1>
            </Link>

            <nav className={`${isCompact ? "px-2" : ""}`}>
              {sidebarItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleItemClick(item.name)}
                  className={`flex items-center w-full px-4 py-3 text-left transition-colors rounded-lg ${
                    activeItem === item.name && item.name !== "Search"
                      ? "bg-yellow-100 text-yellow-600"
                      : "text-gray-600 hover:bg-gray-100"
                  } ${isCompact ? "justify-center" : ""}`}
                >
                  <item.icon
                    className={isCompact ? "" : "mr-3"}
                    size={isCompact ? 24 : 20}
                  />
                  {!isCompact && <span className="text-md">{item.name}</span>}
                </button>
              ))}
            </nav>
          </div>

          {showDrawer && (
            <div className="w-96 bg-white border-r border-gray-200 shadow-lg">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="font-semibold capitalize">{drawerType}</h2>
                <button
                  onClick={handleCloseDrawer}
                  className="hover:bg-gray-100 p-1 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              {renderDrawerContent()}
            </div>
          )}

          <div className="flex-1 bg-gray-50">
            <main className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
              {renderContent()}
            </main>
          </div>
        </div>
      </div>

      <CreatePostModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Community;
