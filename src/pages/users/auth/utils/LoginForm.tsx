import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Lottie from "lottie-react";
import google from "@/assets/animations/google.json";
import { Link } from "react-router-dom";
import { loginSchema } from "@/validation/formValidation";
import { loginInterface } from "@/interface/login";
import { useFormik } from "formik";
import clsx from "clsx";

const LoginForm = () => {
  const { values, handleBlur, errors, handleChange, handleSubmit, touched } =
    useFormik<loginInterface>({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: async (values: loginInterface) => {
        console.log("my data", values);
      },
    });
  return (
    <Card className="w-full max-w-md mx-auto shadow-none border-none">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">Sign In</CardTitle>
        <CardDescription className="mt-2">
          Ready for a journey of a lifetime?
        </CardDescription>
        <CardDescription className="mt-1">
          Get started with <span className="text-blue-500">Trippo!</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4 ">
            <div className="flex flex-col space-y-2.5">
              <Label
                className={clsx({
                  "text-red-500": errors.email && touched.email,
                })}
                htmlFor="email"
              >
                Email
              </Label>
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
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="flex flex-col space-y-2.5 mt-3">
              <Label
                className={clsx({
                  "text-red-500": errors.password && touched.password,
                })}
                htmlFor="password"
              >
                Password
              </Label>
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
                <p className="text-xs text-red-500">{errors.password}</p>
              )}
            </div>
          </div>
          <div className="flex-col flex space-y-6 mt-4">
            <Button className="w-full" variant={"outline"}>
              Log In with{" "}
              <Lottie className="w-16" animationData={google} loop={true} />
            </Button>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            <p className="text-center">
              Not a member?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
