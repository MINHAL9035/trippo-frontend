import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Lottie from "lottie-react";
import google from "@/assets/animations/google.json";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "@/validation/formValidation";

import { useFormik } from "formik";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/redux/slices/userSlice";
import { toast } from "sonner";
import { loginInterface } from "@/interface/user/login";
import { login } from "@/service/api/user";

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { values, handleBlur, errors, handleChange, handleSubmit, touched } =
    useFormik<loginInterface>({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: async (values: loginInterface) => {
        try {
          const response = await login(values);
          if (response?.status == 201) {
            toast.success("logged in successfully");
            dispatch(setUserInfo(response?.data.email));
            navigate("/home");
          } else {
            toast.error("invalid credentials");
          }
        } catch (error) {
          toast.error("An unexpected error occured");
        }
      },
    });
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid w-full items-center gap-4  min-h-[120px] ">
          <div className="flex flex-col space-y-2.5">
            <Label
              className={clsx({
                "text-red-500": errors.email && touched.email,
              })}
              htmlFor="email"
            >
              Email
            </Label>
            <div className="relative">
              <Input
                id="email"
                placeholder="Enter your Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={clsx({
                  "border-red-500": errors.email && touched.email,
                })}
              />
              {errors.email && touched.email && (
                <p className="text-xs text-red-500 absolute">{errors.email}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-2.5 mt-3 min-h-[80px]">
            <Label
              className={clsx({
                "text-red-500": errors.password && touched.password,
              })}
              htmlFor="password"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="Enter the password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={clsx({
                  "border-red-500": errors.password && touched.password,
                })}
              />
              {errors.password && touched.password && (
                <p className="text-xs text-red-500 absolute">
                  {errors.password}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex-col flex space-y-6 mt-2 ">
          <Button className="w-full" variant={"outline"}>
            Log In with{" "}
            <Lottie className="w-16" animationData={google} loop={true} />
          </Button>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
          <p className="text-center">
            Not a member?{" "}
            <Link to="/register" className="text-yellow-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default Form;
