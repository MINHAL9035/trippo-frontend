import React, {  useState } from "react";
import { Send } from "lucide-react";
import { IUser } from "@/interface/user/IUser.interface";
// import { socketService } from "@/service/socket.service";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import { useSocketContext } from "@/context/utils/useSocketContext";
// import { getMessages } from "@/service/api/community";
// import handleError from "@/utils/errorHandler";

export interface ChatInterfaceProps {
  userData: IUser | null;
}

export interface IMessage {
  senderId: string;
  receiverId: string | undefined;
  content: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ userData }) => {
  // const [message, setMessage] = useState<IMessage[]>([]);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [inputMessage, setInputMessage] = useState("");
  const { chat } = useSocketContext();

  const currentUserId = userInfo.userId;

  // const handleSendMessage = useCallback(() => {
  //   if (inputMessage.trim()) {
  //     const newMessage: IMessage = {
  //       senderId: currentUserId,
  //       receiverId: userData?._id,
  //       content: inputMessage,
  //     };
  //     socketService.sendMessage(newMessage);
  //     setInputMessage("");
  //   }
  // }, [currentUserId, inputMessage, userData?._id]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      chat.sendMessage(inputMessage);
      setInputMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // useEffect(() => {
  //   socketService.connect();
  //   socketService.register(currentUserId);

  //   socketService.onNewMessage((message: IMessage) => {
  //     if (
  //       (message.senderId === currentUserId &&
  //         message.receiverId === userData?._id) ||
  //       (message.senderId === userData?._id &&
  //         message.receiverId === currentUserId)
  //     ) {
  //       setMessage((prevMessages) => [...prevMessages, message]);
  //     }
  //   });

  //   const fetchMessages = async () => {
  //     try {
  //       if (!userData?._id) return;
  //       const response = await getMessages(currentUserId, userData._id);
  //       setMessage(response.data);
  //     } catch (error) {
  //       handleError(error);
  //     }
  //   };

  //   if (userData) {
  //     fetchMessages();
  //   }

  //   return () => {
  //     socketService.disconnect();
  //   };
  // }, [currentUserId, userData]);

  return (
    <div className="h-screen flex flex-col ">
      {/* Chat Header */}
      <div className="border-b border-gray-200 p-4 flex items-center">
        <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
          <img
            src={userData?.image}
            alt="dsh"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold">{userData?.userName}</h2>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.senderId === currentUserId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                msg.senderId === currentUserId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-gray-200 rounded-md px-4 py-2 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Message..."
              className="flex-1 bg-transparent outline-none"
            />
            {inputMessage.trim() && (
              <button
                type="button"
                onClick={handleSendMessage}
                className="text-blue-500 hover:text-blue-600 transition-colors"
              >
                <Send className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
