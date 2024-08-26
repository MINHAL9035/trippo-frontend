import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Form from "./Form";
const RegistrationForm = () => {
  return (
    <Card className="w-full max-w-md mx-auto shadow-none border-none">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">Sign Up</CardTitle>
        <CardDescription>
          Get started with <span className="text-yellow-500">Trippo!</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form />
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;
