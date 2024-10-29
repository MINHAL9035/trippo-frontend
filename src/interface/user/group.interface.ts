export interface IGroup {
    _id: string;
    name: string;
    members: {
      userId: {
        _id: string;
        fullName: string;
        userName: string;
        image: string;
      };
      role: 'admin' | 'member';
      joinedAt: Date;
    }[];
    createdBy: {
      _id: string;
      fullName: string;
      userName: string;
      image: string;
    };
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // interfaces/message.interface.ts
  export interface IGroupMessage {
    _id: string;
    senderId: {
      _id: string;
      fullName: string;
      userName: string;
      image: string;
    };
    groupId: string;
    content: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  }