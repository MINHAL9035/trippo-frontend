import { IMessage } from "@/pages/community/utils/ChatInterface";
import { io, Socket } from "socket.io-client";
interface IGroup {
  _id: string;
  name: string;
  members: string[];
  createdAt: Date;
}
class SocketService {
  private socket: Socket | null = null;
  connect() {
    this.socket = io("http://localhost:3000");
    this.socket.on("connect", () => {
      console.log("Connected to WebSocket");
    });
    this.socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket");
    });
  }
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
  register(userId: string) {
    if (this.socket) {
      this.socket.emit("register", userId);
    }
  }
  sendMessage(message: IMessage) {
    if (this.socket) {
      this.socket.emit("sendMessage", { message });
    }
  }
  onNewMessage(callback: (message: IMessage) => void) {
    if (this.socket) {
      this.socket.on("newMessage", (data: IMessage) => {
        callback(data);
      });
    }
  }
  likePost(postId: string, userId: string) {
    if (this.socket) {
      this.socket.emit("likePost", { postId, userId });
    }
  }
  onNewNotification(callback: (notification: string) => void) {
    if (this.socket) {
      this.socket.on("new_notification", callback);
    }
  }
  onPostLiked(
    callback: (data: {
      postId: string;
      userId: string;
      likes: string[];
    }) => void
  ) {
    if (this.socket) {
      this.socket.on("post_liked", callback);
    }
  }
  // Group-related methods
  createGroup(groupData: { name: string; members: string[] }) {
    if (this.socket) {
      this.socket.emit("createGroup", groupData);
    }
  }

  sendGroupMessage(groupId: string, message: Omit<IMessage, "_id">) {
    if (this.socket) {
      this.socket.emit("sendGroupMessage", { groupId, message });
    }
  }

  onGroupCreated(callback: (group: IGroup) => void) {
    if (this.socket) {
      this.socket.on("groupCreated", callback);
    }
  }

  onGroupMessage(
    callback: (data: { groupId: string; message: IMessage }) => void
  ) {
    if (this.socket) {
      this.socket.on("groupMessage", callback);
    }
  }

  onUserJoinedGroup(
    callback: (data: { groupId: string; userId: string }) => void
  ) {
    if (this.socket) {
      this.socket.on("userJoinedGroup", callback);
    }
  }

  removeAllListeners() {
    if (this.socket) {
      this.socket.removeAllListeners();
    }
  }
}
export const socketService = new SocketService();
