import { CheckCircle, Home, Mail } from "lucide-react";
import { Alert } from "antd";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();
  const handleReturnHome = () => {
    navigate("/hotelOwner");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="text-green-500 h-16 w-16" />
          </div>
          <CardTitle className="text-center text-2xl font-bold text-green-600">
            Registration Request Sent Successfully!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-600">
            Your registration request has been sent to Trippo officials for
            review. We appreciate your interest in joining our platform!
          </p>
          <Alert
            message="Check your email"
            description="Please check your email for further instructions regarding the next steps in your onboarding process."
            type="info"
            showIcon
            icon={<Mail className="h-5 w-5 mt-1" />}
          />
          <p className="text-center font-bold text-yellow-600">
            Thank you for choosing Trippo for your hotel management needs!
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={handleReturnHome}
            className="bg-yellow-500  text-white"
          >
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SuccessPage;
