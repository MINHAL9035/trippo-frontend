import { useEffect, useState } from "react";
import CommonForm from "@/components/form/CommonForm";
import { useFormContext } from "@/context/utils/useFormContext";
import handleError from "@/utils/errorHandler";
import { OtpSchema } from "@/validation/formValidation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { verifyForgotOtp } from "@/service/api/user";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

interface forgotOtpInterface {
  otp: string;
}

const ForgotOtp = () => {
  const { setFormState } = useFormContext();
  const [timeLeft, setTimeLeft] = useState(30);
  const email = useSelector((state: RootState) => state.forgotPassword.email);
  const [isOtpExpired, setIsOtpExpired] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsOtpExpired(true);
    }
  }, [timeLeft]);

  const handleSubmit = async (values: forgotOtpInterface) => {
    try {
      const otp = parseInt(values.otp, 10);
      const response = await verifyForgotOtp(otp, email);
      if (response?.status === 201) {
        setFormState("changePassword");
      }
      return response.data;
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <Card className="w-full max-w-md mx-auto shadow-none border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold">Enter Otp</CardTitle>
          <CardDescription>
            Get started with <span className="text-yellow-500">Trippo!</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            {isOtpExpired ? (
              <span className="text-red-500 cursor-pointer hover:underline">
                {" "}
                Resend OTP?
              </span>
            ) : (
              <span className="text-red-500">{timeLeft} seconds</span>
            )}
          </div>
          <CommonForm<forgotOtpInterface>
            initialValues={{
              otp: "",
            }}
            validationSchema={OtpSchema}
            onSubmit={handleSubmit}
            fields={[
              {
                id: "otp",
                label: "otp",
                type: "text",
                placeholder: "Enter your 6 digit otp",
                required: true,
              },
            ]}
            submitButtonText={"verify"}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default ForgotOtp;
