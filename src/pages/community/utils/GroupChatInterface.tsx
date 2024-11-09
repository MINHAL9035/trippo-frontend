import React, { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import { IGroup, IGroupMessage } from "@/interface/community/message.interface";
import socket from "@/service/socket.service";

export interface ChatInterfaceProps {
  groupData: IGroup | null;
}

const GroupChatInterface: React.FC<ChatInterfaceProps> = ({ groupData }) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<IGroupMessage[]>([]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const currentUserId = userInfo.userId;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    if (groupData?.groupId) {
      // Reset messages when changing groups
      setMessages([]);

      socket.emit("joinGroupChat", { groupId: groupData.groupId });

      // Get existing messages
      socket.emit("getGroupMessages", { groupId: groupData.groupId });

      // Listen for existing messages
      socket.on("groupMessages", (existingMessages: IGroupMessage[]) => {
        setMessages(existingMessages);
        scrollToBottom();
      });

      // Listen for new messages
      socket.on("newGroupMessage", (message: IGroupMessage) => {
        setMessages((prev) => [...prev, message]);
        scrollToBottom();
      });

      // Cleanup function
      return () => {
        socket.off("groupMessages");
        socket.off("newGroupMessage");
        socket.emit("leaveGroupChat", { groupId: groupData.groupId });
      };
    }
  }, [groupData?.groupId]);

  const handleSendMessage = () => {
    if (inputMessage.trim() && groupData?.groupId) {
      socket.emit("sendGroupMessage", {
        groupId: groupData.groupId,
        content: inputMessage.trim(),
        senderId: currentUserId,
      });
      setInputMessage("");
    }
  };

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
            src="/images/groupImage.jpg"
            alt="dsh"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold">{groupData?.name}</h2>
          <p className="text-sm text-gray-500">
            {groupData?.members.length} members
          </p>
        </div>
      </div>
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${
              message.senderId._id === currentUserId
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div className="flex items-start max-w-[70%]">
              {message.senderId._id !== currentUserId && (
                <img
                  src={message.senderId.image}
                  alt={message.senderId.fullName}
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}
              <div
                className={`rounded-lg p-3 ${
                  message.senderId._id === currentUserId
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                {message.senderId._id !== currentUserId && (
                  <p className="text-xs font-semibold mb-1">
                    {message.senderId.fullName}
                  </p>
                )}
                <p>{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {formatTime(message.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
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
export default GroupChatInterface;
