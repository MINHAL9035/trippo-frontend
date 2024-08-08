import Lottie from "lottie-react";
import otp from "@/assets/animations/otp.json";
import React, { useEffect, useRef, useState } from "react";
import { resendOtp, verifyOtp } from "@/api/user";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setUserInfo } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store/store";

const Otp = () => {
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  useEffect(() => {
    const savedEndTime = localStorage.getItem("otpEndTime");
    const endTime = savedEndTime ? parseInt(savedEndTime) : Date.now() + 60000;

    if (savedEndTime) {
      const remainingTime = Math.max(
        0,
        Math.round((endTime - Date.now()) / 1000)
      );
      setTimer(remainingTime);
      if (remainingTime === 0) {
        localStorage.removeItem("otpEndTime");
      }
    } else {
      localStorage.setItem("otpEndTime", (Date.now() + 60000).toString());
    }
    const interval = setInterval(() => {
      const remainingTime = Math.max(
        0,
        Math.round((endTime - Date.now()) / 1000)
      );
      setTimer(remainingTime);

      if (remainingTime === 0) {
        clearInterval(interval);
        localStorage.removeItem("otpEndTime");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleResend = async () => {
    try {
      console.log("resend",userInfo.email);
      
      await resendOtp(userInfo.email);
      toast.success("OTP resent successfully");
      const newEndTime = Date.now() + 60000;
      setTimer(120);
      localStorage.setItem("otpEndTime", newEndTime.toString());
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  const handleChange = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // In your Otp component
  const handleVerify = async () => {
    const otpString = otpValues.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter a 6-digit valid OTP");
      return;
    }
    const otpNumber = parseInt(otpString, 10);
    setIsVerifying(true);
    try {
      await verifyOtp(userInfo.email, otpNumber);
      toast.success("OTP verified successfully");
      dispatch(setUserInfo({ ...userInfo, verified: true }));
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);

        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-4">
      <div className="rounded-2xl p-8 w-full max-w-md ">
        <div className="mb-8 flex justify-center">
          <Lottie className="w-48 h-48" animationData={otp} loop={true} />
        </div>
        <p className="text-center text-gray-600 mb-6">
          We've sent a code to your email
        </p>
        <div className="flex justify-between mb-8">
          {otpValues.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-12 h-12 text-center bg-transparent text-xl font-semibold border-b-2 border-blue-300 focus:border-blue-500 focus:outline-none transition-colors"
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>
        <button
          onClick={handleVerify}
          disabled={isVerifying}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400"
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </button>
        <div className="flex justify-between items-center">
          <button
            onClick={handleResend}
            disabled={timer > 0}
            className={`text-blue-600 font-medium ${
              timer > 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-blue-800"
            }`}
          >
            Resend Otp
          </button>
          <span className="text-gray-500">
            {timer > 0 ? `Resend in ${timer}s` : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Otp;
