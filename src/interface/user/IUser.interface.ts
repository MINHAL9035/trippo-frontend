export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  currentCity?: string;
  website?: string;
  aboutYou?: string;
  is_blocked: boolean;
}
