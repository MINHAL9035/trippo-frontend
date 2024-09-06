import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import forgotPassword from "@/assets/animations/forgotPassword.json";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { gsap } from "gsap";
import { useFormContext } from "@/context/utils/useFormContext";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import ForgotOtp from "./ForgotOtp";
import ChangePassword from "./ChangePassword";
import LoginForm from "../utils/LoginForm";
import ForgotPasswordForm from "./utils/ForgotPasswordForm";

const words = [
  { text: "Welcome" },
  { text: "back," },
  { text: " traveller", className: "text-yellow-400 dark:text-yellow-400" },
];

const ForgotPassword = () => {
  const { formState } = useFormContext();
  const [loading, setLoading] = useState(false);

  const formRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { x: "100%", opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      animationRef.current,
      { x: "-100%", opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, [formState]);

  const renderForm = () => {
    switch (formState) {
      case "forgotPassword":
        return <ForgotPasswordForm loading={loading} setLoading={setLoading} />;
      case "otp":
        return <ForgotOtp />;
      case "changePassword":
        return <ChangePassword />;
      default:
        return <LoginForm />;
    }
  };

  return (
    <>
      <>
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <Spin
              indicator={
                <LoadingOutlined style={{ fontSize: 48, color: "#fff" }} spin />
              }
            />
          </div>
        )}
        <div className="w-full h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-7xl flex flex-col sm:flex-row justify-evenly rounded-lg overflow-hidden">
            <div
              ref={animationRef}
              className="hidden sm:flex flex-col items-center justify-center p-4 sm:p-8 w-full sm:w-1/2"
            >
              <TypewriterEffectSmooth className="ml-16" words={words} />
              <p className="text-sm sm:text-base text-center -mt-4">
                <span className="text-yellow-500">Log in </span> to access your
                travel plans and more
              </p>

              <Lottie
                className="w-full max-w-sm"
                animationData={forgotPassword}
                loop={true}
              />
            </div>
            <div
              ref={formRef}
              className="flex items-center justify-center p-4 sm:p-8 w-full sm:w-1/2"
            >
              {renderForm()}
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default ForgotPassword;
