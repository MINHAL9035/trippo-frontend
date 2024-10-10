import * as yup from "yup";
export const profileFormSchema = yup.object().shape({
  fullName: yup
    .string()
    .matches(
      /^[a-zA-Z]+( [a-zA-Z]+)?$/,
      "Full name must only contain letters and can have only one space between the first and last name"
    )
    .min(4, "Full name must be at least 4 characters long")
    .max(50, "Full name is too long")
    .required("Full name is required"),
  currentCity: yup.string().default(""),
  website: yup.string().default("").url("Enter a valid website URL"),
  aboutYou: yup
    .string()
    .default("")
    .max(500, "About you cannot be longer than 500 characters"),
});
