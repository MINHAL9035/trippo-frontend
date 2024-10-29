import { IGroupMessage } from "@/interface/user/group.interface";
import { IMessage } from "@/pages/users/community/utils/MessagePage";
import { io, Socket } from "socket.io-client";
interface IGroupCreateResponse {
  success: boolean;
  group?: unknown;
  error?: string;
}

class SocketService {
  public socket: Socket | null = null;

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

  // onNewNotification(callback: (notification) => void) {
  //   if (this.socket) {
  //     this.socket.on("new_notification", callback);
  //   }
  // }

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

  sendGroupMessage(groupId: string, senderId: string, content: string) {
    if (this.socket) {
      this.socket.emit("sendGroupMessage", { groupId, senderId, content });
    }
  }

  onNewGroupMessage(callback: (message: IGroupMessage) => void) {
    if (this.socket) {
      this.socket.on("newGroupMessage", callback);
    }
  }

  createGroup(groupData: {
    groupName: string;
    members: string[];
    userId: string;
  }) {
    return new Promise<IGroupCreateResponse>((resolve) => {
      if (this.socket) {
        this.socket.emit(
          "createGroup",
          groupData,
          (response: IGroupCreateResponse) => {
            resolve(response);
          }
        );
      } else {
        resolve({ success: false, error: "Socket not connected" });
      }
    });
  }
  joinGroup(groupId: string) {
    if (this.socket) {
      this.socket.emit("joinGroup", groupId);
    }
  }
}

export const socketService = new SocketService();
