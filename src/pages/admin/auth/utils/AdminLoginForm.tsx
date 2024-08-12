import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Form from "./Form";

const AdminLoginForm = () => {
  return (
    <>
      <Card className="w-full max-w-md mx-auto shadow-none border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold">Admin Login</CardTitle>
          <CardDescription className="mt-2">
            Manage your platform efficiently.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form />
        </CardContent>
      </Card>
    </>
  );
};

export default AdminLoginForm;
