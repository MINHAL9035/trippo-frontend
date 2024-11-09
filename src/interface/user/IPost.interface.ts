import { IUser } from "./IUser.interface";

export interface IPostInterface {
  comments: unknown;
  createdAt: string;
  _id: string;
  userId: IUser;
  description: string;
  place: string;
  imageUrl: string[];
  likes: string[];
}
