import Lottie from "lottie-react";
// import registerLight from "@/assets/animations/registerLight.json";
// import registerDark from "@/assets/animations/registerDark.json";
import adminAnimation from "@/assets/animations/adminAnimation.json";
// import { useTheme } from "@/components/theme-provider";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import AdminLoginForm from "./utils/AdminLoginForm";

const words = [
  {
    text: "Welcome",
  },
  {
    text: "back,",
  },

  {
    text: " Admin",
    className: "text-blue-500 dark:text-blue-500",
  },
];

const AdminLogin = () => {
  // const { theme } = useTheme();
  // const animationData = theme === "dark" ? registerDark : registerLight;
  return (
    <div className="w-full h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl flex flex-col sm:flex-row justify-evenly rounded-lg overflow-hidden">
        {/* This div will be hidden on screens 625px wide and below */}
        <div className="hidden sm:flex flex-col items-center justify-center p-4 sm:p-8 w-full sm:w-1/2">
          <TypewriterEffectSmooth className="ml-16" words={words} />
          <p className="text-sm sm:text-base text-center -mt-4">
            <span className="text-blue-500">Access the dashboard </span> to
            manage users, content, and settings.
          </p>
          <Lottie
            className="w-full max-w-sm"
            animationData={adminAnimation}
            loop={true}
          />
        </div>
        <div className="flex items-center justify-center p-4 sm:p-8 w-full sm:w-1/2">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
