import { Home, Search, MessageCircle, Heart, PlusSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PostCard from "./postComponents/PostCard";
import EmptyState from "./postComponents/EmptyState";
import { IPostInterface } from "@/interface/user/IPost.interface";
import { useEffect, useState } from "react";
import handleError from "@/utils/errorHandler";
import { getPosts } from "@/service/api/community";
import CreatePostModal from "./utils/CreatePostModal";
import SearchDrawer from "./utils/SearchDrawer";
import ToggleTheme from "@/components/user/ToggleTheme";
import NotificationDrawer from "./utils/NotificationDrawer";

const Community = () => {
  const [posts, setPosts] = useState<IPostInterface[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      if (response.status === 200) {
        setPosts(response.data);
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleClickCreate = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    setIsCollapsed(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setIsCollapsed(false);
  };

  const handleNotificationClick = () => {
    setNotificationOpen(true);
    setIsCollapsed(true);
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
    setIsCollapsed(false);
  };

  const sidebarItems = [
    { icon: <Home className="w-6 h-6" />, label: "Home" },
    {
      icon: <Search className="w-6 h-6" />,
      label: "Search",
      onClick: handleSearchClick,
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      label: "Messages",
      onClick: () => navigate("/message"),
    },
    {
      icon: <Heart className="w-6 h-6" />,
      label: "Notifications",
      onClick: handleNotificationClick,
    },
    {
      icon: <PlusSquare className="w-6 h-6" />,
      label: "Create",
      onClick: handleClickCreate,
    },
  ];

  return (
    <>
      <div className="flex min-h-screen ">
        {/* Left Sidebar */}
        <div
          className={`fixed left-0 h-full border-r border-gray-00 p-4 transition-all duration-300 ${
            isCollapsed ? "w-28" : "w-64"
          }`}
        >
          <div className="flex items-center mb-8 font-bold">
            <Link
              to="/home"
              className={`flex items-center ${
                isCollapsed ? "justify-center text-lg" : ""
              }`}
            >
              <div className={`flex items-center ${isCollapsed && "ml-5 text-3xl"}`}>
                {isCollapsed ? "T" : "Trippo"}
                {!isCollapsed && (
                  <span className="text-yellow-400 ml-1">Community</span>
                )}
              </div>
            </Link>
            <div className="ml-3">
              {" "}
              <ToggleTheme />
            </div>
          </div>

          <nav className="space-y-4">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className={`flex items-center p-3 hover:text-yellow-400 rounded-lg ${
                  isCollapsed ? "justify-center" : "space-x-4"
                }`}
              >
                {item.icon}
                {!isCollapsed && (
                  <span className="text-base">{item.label}</span>
                )}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
              </button>
            ))}
          </nav>
        </div>

        {/* Search Drawer */}
        <SearchDrawer isSearchOpen={isSearchOpen} onClose={handleCloseSearch} />

        {/* notification Drawer */}
        <NotificationDrawer
          isNotificationOpen={isNotificationOpen}
          onClose={handleNotificationClose}
        />

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            isCollapsed ? "ml-64" : "ml-64"
          } max-w-6xl border-gray-200`}
        >
          {/* Post */}
          <div className="max-w-xl mx-auto mt-14">
            {posts.length > 0 ? (
              posts.map((post) => <PostCard key={post._id} post={post} />)
            ) : (
              <EmptyState />
            )}
          </div>
        </main>
      </div>
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onPostCreated={fetchPosts}
      />
    </>
  );
};

export default Community;
