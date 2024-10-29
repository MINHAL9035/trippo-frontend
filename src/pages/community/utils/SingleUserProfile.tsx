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

import { useEffect, useRef, useState } from "react";
import {
  Home,
  Search,
  MessageCircle,
  Heart,
  PlusSquare,
  Mail,
  UserPlus,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSearchedUserDetail } from "@/service/api/community";
import handleError from "@/utils/errorHandler";
import SearchDrawer from "./SearchDrawer";
import { IUser } from "@/interface/user/IUser.interface";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import { userDetails } from "@/service/api/userProfileApi";

const SingleUserProfile = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { userName } = useParams<{ userName: string }>();
  const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);
  const [currentUser, setCurrentUser] = useState<IUserProfile | null>(null);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();
  const hasFetchedUserProfile = useRef(false);
  useEffect(() => {
    if (userInfo.email && !hasFetchedUserProfile.current) {
      hasFetchedUserProfile.current = true;
      (async (email: string) => {
        try {
          const response = await userDetails(email);
          setCurrentUser(response.data);
        } catch (error) {
          handleError(error);
        }
      })(userInfo.email);
    }
  }, [userInfo.email]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!userName) throw new Error("Username is required");
        const response = await getSearchedUserDetail(userName);
        if (response.status === 200) {
          setUserProfile(response.data);
        }
      } catch (error) {
        handleError(error);
      }
    };

    fetchProfileData();
  }, [userName]);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    setIsCollapsed(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setIsCollapsed(false);
  };

  const handleClick = (userName: string | undefined) => {
    navigate(`/message/${userName}`);
  };

  const sidebarItems = [
    {
      icon: <Home className="w-6 h-6" />,
      label: "Home",
      onClick: () => navigate("/community"),
    },
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
    { icon: <Heart className="w-6 h-6" />, label: "Notifications" },
    { icon: <PlusSquare className="w-6 h-6" />, label: "Create" },
  ];

  return (
    <div className="flex min-h-screen ">
      {/* Left Sidebar - reused from Community component */}
      <div
        className={`fixed left-0 h-full border-r border-gray-200 p-4 transition-all duration-300 ${
          isCollapsed ? "w-24" : "w-64"
        }`}
      >
        <Link to="/home">
          <div
            className={`mb-8 font-bold ${
              isCollapsed ? "text-center text-lg" : ""
            }`}
          >
            {isCollapsed ? "T" : "Trippo"}
            {!isCollapsed && <span className="text-yellow-400">Community</span>}
          </div>
        </Link>

        <nav className="space-y-4">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className={`flex items-center p-3 hover:bg-gray-100 rounded-lg ${
                isCollapsed ? "justify-center" : "space-x-4"
              }`}
            >
              {item.icon}
              {!isCollapsed && <span className="text-base">{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Search Drawer */}
      <SearchDrawer isSearchOpen={isSearchOpen} onClose={handleCloseSearch} />

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? "ml-24" : "ml-64"
        }`}
      >
        <div className="max-w-4xl mx-auto py-8 px-4">
          {/* Profile Header */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={userProfile?.image}
                    alt={userProfile?.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold">
                        {userProfile?.fullName}
                      </h1>
                      <p className="text-gray-600">@{userProfile?.userName}</p>
                    </div>
                    {userProfile?.userName !== currentUser?.userName && (
                      <div className="flex gap-3">
                        <Button
                          onClick={() => handleClick(userProfile?.userName)}
                          className="bg-yellow-400 hover:bg-yellow-500"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="outline">
                          <UserPlus className="w-4 h-4 mr-2" />
                          Follow
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-6 text-sm">
                    <div>
                      <span className="font-bold">
                        {userProfile?.posts.length}
                      </span>{" "}
                      posts
                    </div>
                    <div>
                      <span className="font-bold">2.5k</span> followers
                    </div>
                    <div>
                      <span className="font-bold">1.2k</span> following
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for Posts/About */}
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="w-full justify-start mb-6">
              <TabsTrigger value="posts">Posts</TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {userProfile?.posts.map((post) => (
                  <div
                    key={post.id}
                    className="aspect-square overflow-hidden rounded-lg"
                  >
                    <img
                      src={post.imageUrls[0]}
                      alt={post.description}
                      className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default SingleUserProfile;
