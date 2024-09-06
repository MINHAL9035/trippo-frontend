import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import LoginFormFeilds from "./LoginFormFeilds";

const LoginForm = () => {
  return (
    <Card className="w-full max-w-md mx-auto shadow-none border-none">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">Sign In</CardTitle>
        <CardDescription>
          Get started with <span className="text-yellow-500">Trippo!</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginFormFeilds />
      </CardContent>
    </Card>
  );
};

export default LoginForm;
