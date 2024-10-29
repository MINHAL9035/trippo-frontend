import React, {  useState } from "react";
import { Send } from "lucide-react";
import { IUser } from "@/interface/user/IUser.interface";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";

export interface ChatInterfaceProps {
  userData: IUser | null;
}



const ChatInterface: React.FC<ChatInterfaceProps> = ({ userData }) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [inputMessage, setInputMessage] = useState("");

  const currentUserId = userInfo.userId;

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
    }
  };

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
        {/* messge area */}
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
