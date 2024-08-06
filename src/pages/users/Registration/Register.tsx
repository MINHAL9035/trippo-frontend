import Lottie from "lottie-react";
import registerLight from "@/assets/animations/registerLight.json";
import registerDark from "@/assets/animations/registerDark.json";
import { useTheme } from "@/components/theme-provider";
import RegistrationForm from "./utils/RegistrationForm";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
const words = [
  {
    text: "Welcome",
  },
  {
    text: "to",
  },
  {
    text: "Trippo",
    className: "text-blue-500 dark:text-blue-500",
  },
];

const Register = () => {
  const { theme } = useTheme();

  const animationData = theme === "dark" ? registerDark : registerLight;

  return (
    <div className="w-full h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 ">
      <div className="w-full max-w-6xl flex flex-col sm:flex-row justify-evenly rounded-lg overflow-hidden">
        <div className="hidden sm:flex flex-col items-center justify-center p-4 sm:p-8 w-full sm:w-1/2 lg:w-1/2 xl:w-1/3 2xl:w-1/4">
          <TypewriterEffectSmooth className="ml-14" words={words} />
          <p className="text-sm sm:text-base text-center -mt-4">
            <span className="text-blue-500">Your ultimate</span> companion for
            seamless trip planning
          </p>
          <Lottie
            className="w-full max-w-sm"
            animationData={animationData}
            loop={true}
          />
        </div>
        <div className="flex items-center justify-center p-4 sm:p-8 w-full sm:w-1/2">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
