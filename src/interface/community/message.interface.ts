export interface IMessageList {
  _id: string;
  name: string;
  image: string;
  lastMessage: string;
  lastMessageDate: string;
}

export interface IMessage {
  senderId: string;
  receiverId: string | undefined;
  content: string;
  createdAt: Date;
}

export interface IMessageListUser {
  _id: string;
  fullName: string;
  userName: string;
  image: string;
}

export interface IGroup {
  groupId: string;
  _id: string;
  name: string;
  members: string[];
}


export interface IGroupMessage {
  _id: string;
  groupId: string;
  senderId: {
    _id: string;
    fullName: string;
    userName: string;
    image: string;
  };
  content: string;
  readBy: string[];
  createdAt: string;
}

export interface Comment {
  _id: string;
  userId: {
    _id: string;
    fullName: string;
    userName: string;
    image: string;
  };
  text: string;
  createdAt: string;
}