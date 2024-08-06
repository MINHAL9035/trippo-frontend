import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Lottie from "lottie-react";
import google from "@/assets/animations/google.json";
import clsx from "clsx";
import PasswordStrengthIndicator from "@/components/User/PasswordStrengthIndicator";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { signupInterface } from "@/interface/registerInterface";
import { registrationSchema } from "@/validation/formValidation";
import { signUp } from "@/api/user";
import { useFormik } from "formik";
import { setUserInfo } from "@/redux/slices/userSlice";
import { toast } from "react-toastify";
import axios from "axios";

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * useFormik hook for handling the user registration form.
   *
   * @returns Formik handlers and state for form inputs, validation, and submission.
   */
  const { values, handleBlur, errors, handleChange, handleSubmit, touched } =
    useFormik<signupInterface>({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: registrationSchema,
      onSubmit: async (values: signupInterface) => {
        setIsSubmitting(true);
        try {
          const response = await signUp(values);
          const userData = {
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
          };
          dispatch(setUserInfo(userData));
          toast.success("OTP sent successfully. Please check your email.");
          navigate("/otp");
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response?.data?.message) {
              toast.error(error.response.data.message);
            } else {
              toast.error(
                "An error occurred during registration. Please try again."
              );
            }
          } else {
            toast.error("An unexpected error occurred. Please try again.");
          }
        } finally {
          setIsSubmitting(false);
        }
      },
    });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const form = event.currentTarget.form;
      if (form) {
        const index = Array.from(form.elements).indexOf(event.currentTarget);
        const nextElement = form.elements[index + 1] as HTMLElement;
        if (nextElement) {
          nextElement.focus();
        }
      }
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="firstName"
            className={clsx({
              "text-red-500": errors.firstName && touched.firstName,
            })}
          >
            First Name
          </Label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={clsx({
              "border-red-500": errors.firstName && touched.firstName,
            })}
          />
          {errors.firstName && touched.firstName && (
            <p className="text-xs text-red-500">{errors.firstName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="lastName"
            className={clsx({
              "text-red-500": errors.lastName && touched.lastName,
            })}
          >
            Last Name
          </Label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={clsx({
              "border-red-500": errors.lastName && touched.lastName,
            })}
          />
          {errors.lastName && touched.lastName && (
            <p className="text-xs text-red-500">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="email"
          className={clsx({ "text-red-500": errors.email && touched.email })}
        >
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your Email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={clsx({ "border-red-500": errors.email && touched.email })}
        />
        {errors.email && touched.email && (
          <p className="text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="password"
          className={clsx({
            "text-red-500": errors.password && touched.password,
          })}
        >
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter the password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={clsx({
              "border-red-500": errors.password && touched.password,
            })}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaRegEyeSlash size={20} /> : <FaEye size={20} />}
          </Button>
        </div>
        <PasswordStrengthIndicator password={values.password} />
        {errors.password && touched.password && (
          <p className="text-xs text-red-500">{errors.password}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="confirmPassword"
          className={clsx({
            "text-red-500": errors.confirmPassword && touched.confirmPassword,
          })}
        >
          Confirm Password
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm the password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={clsx({
              "border-red-500":
                errors.confirmPassword && touched.confirmPassword,
            })}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3"
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? (
              <FaRegEyeSlash size={20} />
            ) : (
              <FaEye size={20} />
            )}
          </Button>
        </div>
        {errors.confirmPassword && touched.confirmPassword && (
          <p className="text-xs text-red-500">{errors.confirmPassword}</p>
        )}
      </div>

      <Button className="w-full" variant="outline" type="button">
        Sign Up with{" "}
        <Lottie className="w-16 ml-2" animationData={google} loop={true} />
      </Button>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Signing Up..." : "Sign Up"}
      </Button>

      <p className="text-center">
        Already a member?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Log In
        </Link>
      </p>
    </form>
  );
};

export default Form;
