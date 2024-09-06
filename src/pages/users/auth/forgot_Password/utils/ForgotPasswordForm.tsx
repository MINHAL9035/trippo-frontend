import CommonForm from "@/components/form/CommonForm";
import { forgotPasswordSchema } from "@/validation/formValidation";
import handleError from "@/utils/errorHandler";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { forgotOtp } from "@/service/api/user";
import { message } from "antd";
import { useFormContext } from "@/context/utils/useFormContext";
import { useDispatch } from "react-redux";
import { setEmail } from "@/redux/slices/forgotPasswordSlice";

interface ForgotPasswordInterface {
  email: string;
}

interface ForgotPasswordFormProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  setLoading,
}) => {
  const { setFormState } = useFormContext();
  const dispatch=useDispatch()

  const handleSubmit = async (values: ForgotPasswordInterface) => {
    setLoading(true);
    try {
      dispatch(setEmail(values.email));
      const response = await forgotOtp(values.email);
      message.success("OTP sent successfully, please check your email.");
      setFormState("otp");
      return response.data;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="w-full max-w-md mx-auto shadow-none border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold">Forgot Password ?</CardTitle>
          <CardDescription>
            Get started with <span className="text-yellow-500">Trippo!</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CommonForm<ForgotPasswordInterface>
            initialValues={{ email: "" }}
            validationSchema={forgotPasswordSchema}
            onSubmit={handleSubmit}
            fields={[
              {
                id: "email",
                label: "Email",
                type: "text",
                placeholder: "Enter your Email",
                required: true,
              },
            ]}
            submitButtonText={"Send OTP"}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default ForgotPasswordForm;
