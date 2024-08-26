import { FormikValues, useFormik } from "formik";
import { Button } from "../ui/button";
import FormField from "./FromField";
import * as yup from "yup";

interface FormProps<T extends FormikValues> {
  initialValues: T;
  validationSchema: yup.Schema<T>;
  onSubmit: (values: T) => void;
  fields: Array<{
    id: keyof T;
    label: string;
    type?: string;
    placeholder: string;
  }>;
  submitButtonText: string;
  extraButtons?: React.ReactNode;
  bottomText?: React.ReactNode;
}

const CommonForm = <T extends FormikValues>({
  initialValues,
  validationSchema,
  onSubmit,
  fields,
  submitButtonText,
  extraButtons,
  bottomText,
}: FormProps<T>) => {
  const formik = useFormik<T>({
    initialValues,
    validationSchema,
    onSubmit,
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

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {fields.map((field) => (
        <FormField
          key={field.id as string}
          id={field.id as string}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          value={formik.values[field.id] as string}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          onKeyDown={handleKeyDown}
          error={formik.errors[field.id] as string}
          touched={formik.touched[field.id] as boolean}
        />
      ))}

      {extraButtons}

      <Button type="submit" className="w-full">
        {submitButtonText}
      </Button>

      {bottomText}
    </form>
  );
};

export default CommonForm;
