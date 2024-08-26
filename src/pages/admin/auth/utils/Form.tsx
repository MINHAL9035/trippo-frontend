import { useNavigate } from "react-router-dom";
import { loginSchema } from "@/validation/formValidation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { loginInterface } from "@/interface/user/login";
import { setAdminInfo } from "@/redux/slices/adminSlice";
import { adminLogin } from "@/service/api/admin";
import { useState } from "react";
import CommonForm from "@/components/form/Form";
import handleError from "@/utils/errorHandler";

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <>
      <CommonForm<loginInterface>
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={async (values: loginInterface) => {
          setIsSubmitting(true);
          try {
            const response = await adminLogin(values);
            if (response?.status == 201) {
              toast.success("logged in successfully");
              dispatch(setAdminInfo(response?.data.email));
              navigate("/admin/dashboard");
            }
          } catch (error) {
            setIsSubmitting(false);
            handleError(error);
          }
        }}
        fields={[
          {
            id: "email",
            label: "Email",
            type: "email",
            placeholder: "Enter your Email",
          },
          {
            id: "password",
            label: "Password",
            type: "password",
            placeholder: "Enter the password",
          },
        ]}
        submitButtonText={isSubmitting ? "Logging in..... " : "login"}
      />
    </>
  );
};

export default Form;
