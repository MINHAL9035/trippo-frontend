import Lottie from "lottie-react";
import google from "@/assets/animations/google.json";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "@/validation/formValidation";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/redux/slices/userSlice";
import { toast } from "sonner";
import { loginInterface } from "@/interface/user/login";
import { googleLogin, login } from "@/service/api/user";
import handleError from "@/utils/errorHandler";
import CommonForm from "@/components/form/Form";
import { useState } from "react";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoogleSignup = useGoogleLogin({
    onSuccess: async (response: TokenResponse) => {
      try {
        const responseData = await googleLogin(response);
        if (responseData.status === 201) {
          dispatch(setUserInfo(responseData.data.email));
          navigate("/");
        }
      } catch (error) {
        handleError(error);
      }
    },
    onError: (error) => {
      handleError(error);
    },
  });

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
            console.log("my frontend ", values);
            const response = await login(values);
            if (response?.status == 201) {
              toast.success("logged in successfully");
              dispatch(setUserInfo(response?.data.email));
              navigate("/");
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
        extraButtons={
          <Button
            onClick={() => handleGoogleSignup()}
            className="w-full"
            variant="outline"
            type="button"
          >
            Sign In with{" "}
            <Lottie className="w-16 ml-2" animationData={google} loop={true} />
          </Button>
        }
        bottomText={
          <p className="text-center">
            Already a member?{" "}
            <Link to="/register" className="text-yellow-500 hover:underline">
              SignUp
            </Link>
          </p>
        }
      />
    </>
  );
};

export default Form;
