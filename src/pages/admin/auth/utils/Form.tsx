import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "@/validation/formValidation";
import { useFormik } from "formik";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { loginInterface } from "@/interface/user/login";
import { setAdminInfo } from "@/redux/slices/adminSlice";
import { adminLogin } from "@/service/api/admin";

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
          const response = await adminLogin(values);
          console.log("my fromt", response);

          if (response?.status == 201) {
            toast.success("logged in successfully");
            dispatch(setAdminInfo(response?.data.email));
            navigate("/admin/dashboard");
          } else {
            toast.error("Invalid credentials");
          }
        } catch (error) {
          toast.error("An unexpected error occured");
        }
      },
    });
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid w-full items-center gap-4 ">
          <div className="flex flex-col space-y-2.5 min-h-[80px]">
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
          <div className="flex flex-col space-y-2.5 min-h-[80px] ">
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
        <div className="flex-col flex space-y-6 mt-4">
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </div>
      </form>
    </>
  );
};

export default Form;
