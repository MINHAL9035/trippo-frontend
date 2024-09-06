import React from "react";
import { FormikValues, useFormik } from "formik";
import { Button } from "../ui/button";
import * as yup from "yup";
import FormField from "./FromField";
import { Tag } from "antd";

interface FormProps<T extends FormikValues> {
  initialValues: T;
  validationSchema?: yup.Schema<T>;
  onSubmit: (values: T) => void;
  fields: Array<{
    id: keyof T;
    label: React.ReactNode;
    type?: "text" | "password" | "textarea";
    placeholder: string;
    rows?: number;
    required?: boolean;
  }>;
  submitButtonText?: string;
  forgotPasswordText?: React.ReactNode;
  extraButtons?: React.ReactNode;
  bottomText?: React.ReactNode;
}

const CommonForm = <T extends FormikValues>({
  initialValues,
  validationSchema,
  onSubmit,
  fields,
  submitButtonText,
  forgotPasswordText,
  extraButtons,
  bottomText,
}: FormProps<T>) => {
  const formik = useFormik<T>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
          label={
            <>
              {!field.required && <Tag color="warning">Optional</Tag>}
              {field.label}
            </>
          }
          type={field.type}
          placeholder={field.placeholder}
          value={formik.values[field.id] as string}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          onKeyDown={handleKeyDown}
          error={formik.errors[field.id] as string}
          touched={formik.touched[field.id] as boolean}
          rows={field.rows}
        />
      ))}

      {forgotPasswordText && (
        <p className="  text-red-500  cursor-pointer">{forgotPasswordText}</p>
      )}

      {extraButtons}

      {submitButtonText && (
        <Button type="submit" className="w-full">
          {submitButtonText}
        </Button>
      )}

      {bottomText}
    </form>
  );
};

export default CommonForm;
