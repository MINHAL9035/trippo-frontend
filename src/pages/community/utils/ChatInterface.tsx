import React, { useCallback, useEffect, useState } from "react";
import { Send } from "lucide-react";
import { IUser } from "@/interface/user/IUser.interface";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import { IMessage } from "@/interface/community/message.interface";
import socket from "@/service/socket.service";

export interface ChatInterfaceProps {
  userData: IUser | null;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ userData }) => {
  const [message, setMessage] = useState<IMessage[]>([]);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [inputMessage, setInputMessage] = useState("");
  const currentUserId = userInfo.userId;

  useEffect(() => {
    if (!userData?._id || !currentUserId) return;

    socket.emit("initializeChat", {
      currentUserId,
      otherUserId: userData._id,
    });

    const handlePreviousMessages = (previousMessages: IMessage[]) => {
      setMessage(previousMessages);
    };

    const handleNewMessage = (newMessage: IMessage) => {
      setMessage((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.on("previousMessages", handlePreviousMessages);
    socket.on("receiveMessage", handleNewMessage);

    return () => {
      socket.emit("leaveChat", {
        currentUserId,
        otherUserId: userData._id,
      });
      socket.off("previousMessages", handlePreviousMessages);
      socket.off("receiveMessage", handleNewMessage);
    };
  }, [userData?._id, currentUserId]);

  const handleSendMessage = useCallback(() => {
    const messageData = {
      senderId: currentUserId,
      receiverId: userData?._id,
      content: inputMessage.trim(),
    };

    socket.emit("sendMessage", messageData);
    setInputMessage("");
  }, [inputMessage, currentUserId, userData?._id]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col ">
      {/* Chat Header */}
      <div className="border-b  p-4 flex items-center">
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
        {message.map((msg, index) => (
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
