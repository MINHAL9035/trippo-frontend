import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registrationSchema } from "@/validation/formValidation";
import { signupInterface } from "@/interface/user/registerInterface";
import { googleLogin, signUp } from "@/service/api/user";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import handleError from "@/utils/errorHandler";
import CommonForm from "../../../../components/form/Form";
import { toast } from "sonner";
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";
import google from "../../../../assets/animations/google.json";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/redux/slices/userSlice";

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoogleSignup = useGoogleLogin({
    onSuccess: async (response: TokenResponse) => {
      console.log("GOOGLERESPONSE", response);

      try {
        const responseData = await googleLogin(response);
        console.log("my google backend resposne", responseData);
        if (responseData?.status === 201) {
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
    <CommonForm<signupInterface>
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user",
      }}
      validationSchema={registrationSchema}
      onSubmit={async (values) => {
        setIsSubmitting(true);
        try {
          const response = await signUp(values);
          if (response?.status === 201) {
            toast.success("OTP sent successfully. Please check your email.");
            navigate("/otp", { state: { email: response.data.user.email } });
          }
        } catch (error) {
          setIsSubmitting(false);
          handleError(error);
        }
      }}
      fields={[
        { id: "firstName", label: "First Name", placeholder: "First Name" },
        { id: "lastName", label: "Last Name", placeholder: "Last Name" },
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
        {
          id: "confirmPassword",
          label: "Confirm Password",
          type: "password",
          placeholder: "Confirm the password",
        },
      ]}
      submitButtonText={isSubmitting ? "Signing Up..." : "Sign Up"}
      extraButtons={
        <Button
          onClick={() => handleGoogleSignup()}
          className="w-full"
          variant="outline"
          type="button"
        >
          Sign Up with{" "}
          <Lottie className="w-16 ml-2" animationData={google} loop={true} />
        </Button>
      }
      bottomText={
        <p className="text-center">
          Already a member?{" "}
          <Link to="/login" className="text-yellow-500 hover:underline">
            Log In
          </Link>
        </p>
      }
    />
  );
};

export default Form;
