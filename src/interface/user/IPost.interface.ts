import { IUser } from "./IUser.interface";

export interface IPostInterface {
  createdAt: string;
  _id: string;
  userId: IUser;
  description: string;
  place: string;
  imageUrl: string[];
}
