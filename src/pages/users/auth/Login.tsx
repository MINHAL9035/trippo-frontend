import Lottie from "lottie-react";
import registerLight from "@/assets/animations/registerLight.json";
import registerDark from "@/assets/animations/registerDark.json";
import { useTheme } from "@/components/theme-provider";
import LoginForm from "./utils/LoginForm";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
const words = [
  {
    text: "Welcome",
  },
  {
    text: "back,",
  },

  {
    text: " traveller",
    className: "text-yellow-400 dark:text-yellow-400",


  },
];

const Login = () => {
  const { theme } = useTheme();
  const animationData = theme === "dark" ? registerDark : registerLight;
  return (
    <div className="w-full h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-7xl flex flex-col sm:flex-row justify-evenly rounded-lg overflow-hidden">
    {/* This div will be hidden on screens 625px wide and below */}
    <div className="hidden sm:flex flex-col items-center justify-center p-4 sm:p-8 w-full sm:w-1/2">
      <TypewriterEffectSmooth className="ml-16" words={words} />
      <p className="text-sm sm:text-base text-center -mt-4">
        <span className="text-yellow-500">Log in </span> to access your travel
        plans and more
      </p>
      <Lottie
        className="w-full max-w-sm"
        animationData={animationData}
        loop={true}
      />
    </div>
    <div className="flex items-center justify-center p-4 sm:p-8 w-full sm:w-1/2">
      <LoginForm />
    </div>
  </div>
</div>

  );
};

export default Login;
