import { Link, useNavigate, useParams } from "react-router-dom";
import { Home, Search, MessageCircle, Heart, PlusSquare } from "lucide-react";
import { useEffect, useState } from "react";
import SearchDrawer from "./SearchDrawer";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import { getSearchedUserDetail } from "@/service/api/community";
import handleError from "@/utils/errorHandler";
import { format, isToday, isYesterday, differenceInDays } from "date-fns";
import MessageDropdown from "./MessageDropdown";
import ChatInterface from "./ChatInterface";
import { IUser } from "@/interface/user/IUser.interface";

export interface IMessageList {
  _id: string;
  name: string;
  image: string;
  lastMessage: string;
  lastMessageDate: string;
}

const MessagePage = () => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const { userName } = useParams<{ userName: string }>();
  const [userProfile, setUserProfile] = useState<IUser | null>(null);

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

  const formatLastMessageDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) {
      return format(date, "p");
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else if (differenceInDays(new Date(), date) < 7) {
      return format(date, "EEEE");
    } else {
      return format(date, "MM/dd/yyyy");
    }
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  const handleMessageListClick = (userName: string) => {
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
    },
    { icon: <Heart className="w-6 h-6" />, label: "Notifications" },
    { icon: <PlusSquare className="w-6 h-6" />, label: "Create" },
  ];

  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <div className="fixed left-0 h-full border-r border-gray-200 p-4 transition-all duration-300 w-24  z-20">
        <Link to="/home">
          <div className="mb-8 font-bold text-center text-lg">T</div>
        </Link>
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
      <div className="fixed left-24 h-full border-r border-gray-200  transition-all duration-300 z-10 w-80">
        <div className="p-4 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Messages</h2>
            <MessageDropdown />
          </div>

          <div className="space-y-4">
            {messageList.length > 0 ? (
              messageList.map((message) => (
                <div
                  key={message._id}
                  onClick={() => handleMessageListClick(message.name)}
                  className="flex items-center p-4 hover:bg-gray-50 rounded-lg cursor-pointer"
                >
                  <div className="h-12 w-12 rounded-full mr-3 overflow-hidden">
                    <img
                      src={message.image}
                      alt={message.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-base">{message.name}</div>
                    <div className="text-sm text-gray-500">
                      Last message:{" "}
                      {formatLastMessageDate(message.lastMessageDate)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4">No messages</div>
            )}
          </div>
        </div>
      </div>

      {/* Search Drawer */}
      <SearchDrawer isSearchOpen={isSearchOpen} onClose={handleCloseSearch} />

      {/* Main Content */}
      <main className="flex-1 transition-all duration-300 ml-[416px]">
        <ChatInterface userData={userProfile} />
      </main>
    </div>
  );
};

export default MessagePage;
