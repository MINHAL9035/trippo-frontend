export interface signupInterface {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  verified?: boolean;
  createdAt?: string;
  role: "user" | "admin";
}
