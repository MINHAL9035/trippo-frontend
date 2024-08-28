import React, { useEffect, useRef, useState } from "react";
// import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
// import { setUserInfo } from "@/redux/slices/userSlice";
import { resendOtp, verifyOtp } from "@/service/api/user";
import otpImage from "../../../assets/images/otpImage.png";
import { AxiosError } from "axios";

const Otp = () => {
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpEndTime, setOtpEndTime] = useState<number | null>(null);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const savedEndTime = localStorage.getItem("otpEndTime");
    const endTime = savedEndTime ? parseInt(savedEndTime) : Date.now() + 60000;

    setOtpEndTime(endTime);

    const calculateRemainingTime = () => {
      const remainingTime = Math.max(
        0,
        Math.round((endTime - Date.now()) / 1000)
      );
      setTimer(remainingTime);
      if (remainingTime === 0) {
        localStorage.removeItem("otpEndTime");
      }
    };

    calculateRemainingTime();

    const interval = setInterval(() => {
      calculateRemainingTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [otpEndTime]);

  const email = location.state?.email;

  const handleResend = async () => {
    try {
      const response = await resendOtp(email);
      if (response?.status === 201) {
        toast.success("OTP resent successfully");
        const newEndTime = Date.now() + 60000;
        setOtpEndTime(newEndTime);
        localStorage.setItem("otpEndTime", newEndTime.toString());
      } else {
        toast.error("Invalid.Please try again");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          const errorMessage = error.response.data.message;
          toast.error(`${errorMessage.message}`);
        } else if (error.request) {
          toast.error("No response from server. Please try again later.");
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
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

  const handleVerify = async () => {
    const otpString = otpValues.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter a 6-digit valid OTP");
      return;
    }
    const otpNumber = parseInt(otpString, 10);
    setIsVerifying(true);
    try {
      const response = await verifyOtp(email, otpNumber);
      if (response?.status === 201) {
        toast.success("OTP verified successfully");
        // dispatch(setUserInfo(user));
        navigate("/login");
      } else {
        toast.error("Invalid something went wrong");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          const errorMessage = error.response.data.message;
          toast.error(`${errorMessage.message}`);
        } else if (error.request) {
          toast.error("No response from server. Please try again later.");
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-4">
      <div className="rounded-2xl p-8 w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <img src={otpImage} alt="" />
        </div>
        <p className="text-center text-white-600 mb-6">
          We've sent a code to your email
        </p>
        <div className="flex justify-between mb-8">
          {otpValues.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-12 h-12 text-center bg-transparent text-xl font-semibold border-b-2 border-yellow-500 focus:border-yellow-500 focus:outline-none transition-colors"
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
          className="w-full py-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 disabled:bg-gray-400"
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </button>
        <div className="flex justify-between items-center">
          <button
            onClick={handleResend}
            disabled={timer > 0}
            className={`text-yellow-500 font-medium ${
              timer > 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-yellow-500"
            }`}
          >
            Resend Otp
          </button>
          <span className="text-white-500">
            {timer > 0 ? `Resend in ${timer}s` : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Otp;
