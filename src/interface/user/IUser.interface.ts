export interface IUser {
  fullName?: string;
  _id: string;
  userName: string;
  email: string;
  image: string;
  currentCity?: string;
  website?: string;
  aboutYou?: string;
  is_blocked: boolean;
}
