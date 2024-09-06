import CommonForm from "@/components/form/CommonForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFormContext } from "@/context/utils/useFormContext";
import { RootState } from "@/redux/store/store";
import { changePassword } from "@/service/api/user";
import handleError from "@/utils/errorHandler";
import { ChangePasswordSchema } from "@/validation/formValidation";
import { message } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface changePasswordInterface {
  password: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const email = useSelector((state: RootState) => state.forgotPassword.email);
  const { setFormState } = useFormContext();
  const navigate = useNavigate();
  const handleSubmit = async (values: changePasswordInterface) => {
    try {
      const response = await changePassword(values.password, email);
      if (response.status === 200) {
        message.success("password changed successfully");
        navigate("/login");
        setFormState("forgotPassword");      
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <Card className="w-full max-w-md mx-auto shadow-none border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold">change Password </CardTitle>
          <CardDescription>
            Get started with <span className="text-yellow-500">Trippo!</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CommonForm<changePasswordInterface>
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={ChangePasswordSchema}
            onSubmit={handleSubmit}
            fields={[
              {
                id: "password",
                label: "New Password",
                type: "password",
                placeholder: "Enter the password",
                required: true,
              },
              {
                id: "confirmPassword",
                label: "Confirm Password",
                type: "password",
                placeholder: "Confirm the password",
                required: true,
              },
            ]}
            submitButtonText={"submit"}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default ChangePassword;
