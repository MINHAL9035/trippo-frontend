import Lottie from "lottie-react";
import otp from "@/assets/animations/otp.json";
import React, { useEffect, useRef, useState } from "react";
import { verifyOtp, resendOtp } from "@/api/user";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setUserInfo } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store/store";

const Otp = () => {
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  console.log(userInfo);
  console.log(userInfo.email);

  useEffect(() => {
    const storedEndTime = localStorage.getItem("otpTimerEndTime");
    if (storedEndTime) {
      const remainingTime = Math.max(
        0,
        Math.floor((parseInt(storedEndTime) - Date.now()) / 1000)
      );
      if (remainingTime > 0) {
        setTimer(remainingTime);
        setIsResendDisabled(true);
      } else {
        setIsResendDisabled(false);
      }
    } else {
      setIsResendDisabled(false);
    }
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer - 1;
          if (newTimer <= 0) {
            clearInterval(interval);
            setIsResendDisabled(false);
            localStorage.removeItem("otpTimerEndTime");
          }
          return newTimer;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const startTimer = () => {
    const endTime = Date.now() + 60000;
    localStorage.setItem("otpTimerEndTime", endTime.toString());
    setTimer(60);
    setIsResendDisabled(true);
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
      setError("Please enter a 6-digit valid OTP");
      return;
    }
    const otpNumber = parseInt(otpString, 10);
    setIsVerifying(true);
    setError("");
    try {
      await verifyOtp(userInfo.email, otpNumber);
      toast.success("OTP verified successfully");
      dispatch(setUserInfo({ ...userInfo, verified: true }));
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "Invalid OTP. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    console.log("email", userInfo.email);
    if (!userInfo.email) {
      setError("User email not found. Please try registering again.");
      return;
    }
    setIsResending(true);
    setError("");
    try {
      await resendOtp(userInfo.email);
      startTimer();
      toast.success("New OTP sent successfully");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "Failed to resend OTP. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsResending(false);
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
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <button
          onClick={handleVerify}
          disabled={isVerifying}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400"
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </button>
        <p className="text-center mt-6 text-gray-600">
          Didn't receive the code?{" "}
          <button
            onClick={handleResend}
            disabled={isResendDisabled || isResending}
            className={`font-semibold ${
              isResendDisabled || isResending
                ? "text-gray-400"
                : "text-blue-600 hover:text-blue-700"
            }`}
          >
            {isResendDisabled
              ? `Resend in ${timer}s`
              : isResending
              ? "Resending..."
              : "Resend"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Otp;
