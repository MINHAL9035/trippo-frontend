export interface signupInterface {
  id?: string;
  fullName?: string;
  userName?: string;
  email: string;
  password: string;
  confirmPassword: string;
  verified?: boolean;
  createdAt?: string;
  role: "user" | "admin";
}
