import { IMessage } from "@/pages/users/community/utils/MessagePage";
import { io, Socket } from "socket.io-client";

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

  onNewNotification(callback: (notification) => void) {
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
}

export const socketService = new SocketService();
