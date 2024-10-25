import NavBar from "@/components/user/NavBar";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Home,
  MessageCircle,
  PlusCircle,
  Bell,
  User,
  Search,
} from "lucide-react";
import CreatePostModal from "../../../community/utils/CreatePostModal";
import { socketService } from "@/service/socket.service";
import {
  getMessages,
  getSearchedUserDetail,
  getUserMessageList,
} from "@/service/api/community";
import handleError from "@/utils/errorHandler";
import { IUser } from "@/interface/user/IUser.interface";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { format, isToday, isYesterday, differenceInDays } from "date-fns";

export interface IMessage {
  senderId: string;
  receiverId: string | undefined;
  content: string;
}

export interface IMessageList {
  _id: string;
  name: string;
  image: string;
  lastMessage: string;
  lastMessageDate: string;
}

const MessagePage = () => {
  const [isCompact, setIsCompact] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [messageList, setMessageList] = useState<IMessageList[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const { userName } = useParams<{ userName: string }>();
  const [userProfile, setUserProfile] = useState<IUser | null>(null);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();
  console.log("df", drawerType);

  const currentUserId = userInfo.userId;

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

  const sidebarItems = [
    { name: "Home", icon: Home },
    { name: "Search", icon: Search },
    { name: "Messages", icon: MessageCircle },
    { name: "Create", icon: PlusCircle },
    { name: "Notifications", icon: Bell },
    { name: "Profile", icon: User },
  ];

  useEffect(() => {
    setShowDrawer(true);
    setIsCompact(true);
  }, []);

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

  useEffect(() => {
    socketService.connect();
    socketService.register(currentUserId);

    socketService.onNewMessage((message: IMessage) => {
      if (
        (message.senderId === currentUserId &&
          message.receiverId === userProfile?._id) ||
        (message.senderId === userProfile?._id &&
          message.receiverId === currentUserId)
      ) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    const fetchMessages = async () => {
      try {
        if (!userProfile?._id) return;
        const response = await getMessages(currentUserId, userProfile._id);
        setMessages(response.data);
      } catch (error) {
        handleError(error);
      }
    };

    if (userProfile) {
      fetchMessages();
    }

    return () => {
      socketService.disconnect();
    };
  }, [currentUserId, userProfile]);

  const handleSendMessage = useCallback(() => {
    if (inputMessage.trim()) {
      const newMessage: IMessage = {
        senderId: currentUserId,
        receiverId: userProfile?._id,
        content: inputMessage,
      };
      socketService.sendMessage(newMessage);
      setInputMessage("");
    }
  }, [currentUserId, inputMessage, userProfile?._id]);

  useEffect(() => {
    const UserMessageList = async () => {
      try {
        const response = await getUserMessageList(userInfo.userId);
        if (response.status === 200) {
          setMessageList(response.data);
        }
      } catch (error) {
        handleError(error);
      }
    };
    UserMessageList();
  }, [userInfo.userId]);

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

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleMessageListClick = (userName: string) => {
    navigate(`/message/${userName}`);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`flex-shrink-0 border-r shadow-sm transition-all duration-300 ${
            isCompact ? "w-20" : "w-72"
          }`}
        >
          <Link to="/home">
            <h1
              className={`font-bold m-8 text-2xl ${isCompact ? "hidden" : ""}`}
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

        {/* Message list drawer */}
        {showDrawer && (
          <div className="flex-shrink-0 w-80 border-r overflow-hidden flex flex-col">
            <div className="flex-shrink-0 flex justify-between items-center p-4 border-b">
              <h2 className="font-semibold text-xl">Messages</h2>
              <div className="flex space-x-2">
                <button className="hover:bg-gray-200 p-2 rounded-full">
                  <Search size={20} />
                </button>
                <button className="hover:bg-gray-200 p-2 rounded-full">
                  <PlusCircle size={20} />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {messageList.map((message) => (
                <div
                  key={message._id}
                  className="flex items-center p-4 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleMessageListClick(message.name)}
                >
                  <div className="h-12 w-12 rounded-full mr-3 overflow-hidden">
                    <img
                      src={message.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold flex items-center">
                        {message.name}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {formatLastMessageDate(message.lastMessageDate)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main chat area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Chat header */}
          <div className="flex-shrink-0 flex px-4 h-[9.9vh] border-b items-center">
            <div className="h-12 w-12 rounded-full mr-3 overflow-hidden">
              <img
                src={userProfile?.image}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <p className="uppercase">{userProfile?.userName}</p>
          </div>

          {/* Messages area - now scrollable */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  msg.senderId === currentUserId ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    msg.senderId === currentUserId
                      ? "bg-blue-200"
                      : "bg-gray-200"
                  }`}
                >
                  {msg.content}
                </span>
              </div>
            ))}
          </div>

          {/* Message input area */}
          <div className="flex-shrink-0 border-t p-4">
            <div className="flex">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      <CreatePostModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default MessagePage;
