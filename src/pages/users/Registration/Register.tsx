import Lottie from "lottie-react";
import registerLight from "@/assets/animations/registerLight.json";
import registerDark from "@/assets/animations/registerDark.json";
import RegistrationForm from "./utils/RegistrationForm";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { useTheme } from "@/context/theme-provider";
import NavBar from "@/components/user/NavBar";
const words = [
  {
    text: "Welcome",
  },
  {
    text: "to",
  },
  {
    text: "Trippo",
    className: "text-yellow-500 dark:text-yellow-500",
  },
];

const Register = () => {
  const { theme } = useTheme();
  const animationData = theme === "dark" ? registerDark : registerLight;

  const formRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      animationRef.current,
      { x: "100%", opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      formRef.current,
      { x: "-100%", opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <>
      <NavBar />
      <div className="w-full h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 ">
        <div className="w-full max-w-6xl flex flex-col sm:flex-row justify-evenly rounded-lg overflow-hidden">
          <div
            ref={formRef}
            className="hidden sm:flex flex-col items-center justify-center p-4 sm:p-8 w-full sm:w-1/2 lg:w-1/2 xl:w-1/3 2xl:w-1/4"
          >
            <TypewriterEffectSmooth className="ml-14" words={words} />
            <p className="text-sm sm:text-base text-center -mt-4">
              <span className="text-yellow-500">Your ultimate</span> companion
              for seamless trip planning
            </p>
            <Lottie
              className="w-full max-w-sm"
              animationData={animationData}
              loop={true}
            />
          </div>
          <div
            ref={animationRef}
            className="flex items-center justify-center p-4 sm:p-8 w-full sm:w-1/2"
          >
            <RegistrationForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
