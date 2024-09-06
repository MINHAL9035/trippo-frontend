import * as yup from "yup";
export const profileFormSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "firstName can only contain letters, numbers, and underscores"
    )
    .min(2, "firstName must be more than 2 letters")
    .max(50, "Name is too long")
    .required("firstName is required"),
  lastName: yup
    .string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "lastName can only contain letters, numbers, and underscores"
    )
    .min(1, "lastName is required")
    .max(50, "lastName is too long")
    .required("lastName is required"),
  currentCity: yup.string().default(""),
  website: yup.string().default("").url("Enter a valid website URL"),
  aboutYou: yup
    .string()
    .default("")
    .max(500, "About you cannot be longer than 500 characters"),
});
