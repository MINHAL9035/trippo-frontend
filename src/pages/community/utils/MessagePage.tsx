import { Link, useNavigate, useParams } from "react-router-dom";
import { Home, Search, MessageCircle, Heart, PlusSquare } from "lucide-react";
import { useEffect, useState } from "react";
import SearchDrawer from "./SearchDrawer";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import { getSearchedUserDetail } from "@/service/api/community";
import handleError from "@/utils/errorHandler";
import ChatInterface from "./ChatInterface";
import { IUser } from "@/interface/user/IUser.interface";
import socket from "@/service/socket.service";
import ToggleTheme from "@/components/user/ToggleTheme";
import {
  IGroup,
  IMessageListUser,
} from "@/interface/community/message.interface";

const MessagePage = () => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userList, setUserList] = useState<IMessageListUser[]>([]);
  const [groupList, setGroupList] = useState<IGroup[]>([]);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const { userName } = useParams<{ userName: string }>();
  const [userProfile, setUserProfile] = useState<IUser | null>(null);

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("Socket connected");
      socket.emit("getGroups", { userId: userInfo.userId });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.emit("getUserMessageList", { userId: userInfo.userId });

    socket.on("userList", (users) => {
      setUserList(users);
    });

    socket.on("groupList", (groups) => {
      setGroupList(groups);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("messageList");
      socket.off("userList");
      socket.off("groupList");
      socket.disconnect();
    };
  }, [userInfo.userId]);

  console.log("my groups", groupList);

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
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  const handleMessageListClick = (userName: string) => {
    navigate(`/message/${userName}`);
  };

  const handleGroupListClick = (groupId: string) => {
    navigate(`/group/${groupId}`);
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
    },
    { icon: <Heart className="w-6 h-6" />, label: "Notifications" },
    { icon: <PlusSquare className="w-6 h-6" />, label: "Create" },
  ];

  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <div className="fixed left-0 h-full border-r  p-4 transition-all duration-300 w-28 ">
        <div className="flex items-center mb-8 font-bold">
          <Link to="/home" className="flex items-center justify-center text-lg">
            <div className="flex items-center ml-5 text-3xl">T</div>
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
              className="flex items-center p-3 hover:bg-gray-100 rounded-lg justify-center"
            >
              {item.icon}
            </button>
          ))}
        </nav>
      </div>
      {/* Drawer */}
      <div className="fixed left-32 h-full border-r  transition-all duration-300 z-10 w-80">
        <div className="p-4 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Messages</h2>
            {/* <MessageDropdown /> */}
          </div>
          <div className="space-y-4">
            {userList.length > 0 ? (
              userList.map((user) => (
                <div
                  onClick={() => handleMessageListClick(user.userName)}
                  key={user._id}
                  className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  <img
                    src={user.image}
                    alt={user.fullName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">{user.fullName}</h3>
                    <p className="text-gray-500">{user.userName}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4">
                No messages or groups
              </div>
            )}

            {groupList.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mt-6">Groups</h3>
                {groupList.map((group) => (
                  <div
                    onClick={() => handleGroupListClick(group.groupId)}
                    key={group._id}
                    className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                  >
                    <img
                      src="/images/groupImage.jpg"
                      alt={group.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium">{group.name}</h3>
                      <p className="text-gray-500">
                        {group.members.length} members
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Search Drawer */}
      <SearchDrawer isSearchOpen={isSearchOpen} onClose={handleCloseSearch} />

      {/* Main Content */}
      <main className="flex-1 transition-all duration-300 ml-[450px]">
        <ChatInterface userData={userProfile} />
      </main>
    </div>
  );
};
export default MessagePage;
