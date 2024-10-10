import React, { useState, useEffect, useCallback } from "react";
import {
  LayoutGrid,
  Home,
  MessageCircle,
  PlusCircle,
  Bell,
  User,
  Search,
  X,
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import handleError from "@/utils/errorHandler";
import { IUser } from "@/interface/user/IUser.interface";
import { getSearchedUserDetail } from "@/service/api/community";
import ImageModal from "./ImageModal";
import CreatePostModal from "./CreatePostModal";
import NavBar from "@/components/user/NavBar";

interface IPost {
  id: string;
  imageUrls: string[];
  description: string;
  place: string;
  userName: string;
}

interface IUserProfile extends IUser {
  posts: IPost[];
}

const SingleUserProfile: React.FC = () => {
  const { userName } = useParams<{ userName: string }>();
  const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [activeItem, setActiveItem] = useState("Profile");
  const [isCompact, setIsCompact] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const sidebarItems = [
    { name: "Home", icon: Home },
    { name: "Search", icon: Search },
    { name: "Messages", icon: MessageCircle },
    { name: "Create", icon: PlusCircle },
    { name: "Notifications", icon: Bell },
    { name: "Profile", icon: User },
  ];

  const handleItemClick = useCallback(
    (itemName: string) => {
      if (itemName === "Create") {
        setIsModalOpen(true);
        return;
      }

      if (["Search", "Messages", "Notifications"].includes(itemName)) {
        setDrawerType(itemName.toLowerCase());
        setShowDrawer(true);
        setIsCompact(true);
        setActiveItem(itemName);
        return;
      }

      setActiveItem(itemName);
      setDrawerType(null);
      setIsCompact(false);
      setShowDrawer(false);

      if (itemName === "Home") {
        navigate("/community");
      }
    },
    [navigate]
  );

  const handleCloseDrawer = useCallback(() => {
    setShowDrawer(false);
    setIsCompact(false);
    setDrawerType(null);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        if (!userName) throw new Error("Username is required");
        const response = await getSearchedUserDetail(userName);
        if (response.status === 200) {
          setUserProfile(response.data);
        }
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [userName]);

  const openModal = (post: IPost, imageIndex: number) => {
    setSelectedPost(post);
    setModalImageIndex(imageIndex);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userProfile) {
    return <div>User not found</div>;
  }

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
                    activeItem === item.name
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
              {/* Add drawer content here */}
            </div>
          )}

          <div className="flex-1 bg-gray-50">
            <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="flex items-center gap-8 mb-8">
                <img
                  src={userProfile.image}
                  alt="Profile"
                  className="w-32 h-32 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <h2 className="text-xl font-normal">
                      {userProfile.fullName}
                    </h2>
                    <button className="bg-[#0095F6] text-white px-4 py-1.5 rounded-lg text-sm font-semibold">
                      Follow
                    </button>
                    <button className="border-gray-400 border text-black px-4 py-1.5 rounded-md text-sm font-semibold">
                      Message
                    </button>
                  </div>

                  <div className="flex gap-8 mb-4">
                    <span>
                      <strong>{userProfile.posts.length}</strong> posts
                    </span>
                    <span>
                      <strong>{2}</strong> followers
                    </span>
                    <span>
                      <strong>{3}</strong> following
                    </span>
                  </div>

                  <div>
                    <h1 className="font-semibold">{userProfile.userName}</h1>
                    <p className="text-sm">User bio here</p>
                  </div>
                </div>
              </div>

              <div className="border-t">
                <div className="flex justify-center gap-12 -mb-px">
                  <button className="flex items-center gap-2 py-4 text-sm font-semibold border-t border-black">
                    <LayoutGrid size={12} />
                    POSTS
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1">
                {userProfile.posts.map((post) => (
                  <div
                    key={post.id}
                    className="aspect-square relative group cursor-pointer"
                    onClick={() => openModal(post, 0)}
                  >
                    <img
                      src={post.imageUrls[0]}
                      alt={post.description}
                      className="w-full h-full object-cover"
                    />
                    {post.imageUrls.length > 1 && (
                      <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                        <LayoutGrid size={16} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-sm">{post.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>

      {selectedPost && (
        <ImageModal
          images={selectedPost.imageUrls}
          onClose={closeModal}
          initialIndex={modalImageIndex}
        />
      )}

      <CreatePostModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default SingleUserProfile;
