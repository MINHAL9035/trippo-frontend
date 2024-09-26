import React from "react";
import { FormikValues, useFormik } from "formik";
import { Button } from "../ui/button";
import * as yup from "yup";
import { Tag } from "antd";
import ImageUpload from "./ImageUpload";
import FormField from "./FromField";
import { FormFieldProps } from "../interface/formFeild";

interface FormProps<T extends FormikValues> {
  initialValues: T;
  validationSchema?: yup.Schema<T>;
  onSubmit: (values: T) => void;
  fields: (FormFieldProps | ImageUploadFieldProps | AutocompleteFieldProps)[];
  submitButtonText?: string;
  forgotPasswordText?: React.ReactNode;
  extraButtons?: React.ReactNode;
  bottomText?: React.ReactNode;
}

interface ImageUploadFieldProps extends Omit<FormFieldProps, "type"> {
  type: "image-upload";
  maxCount?: number;
  listType?: "text" | "picture" | "picture-card";
}

interface AutocompleteComponentProps {
  id: string;
  label: React.ReactNode;
  placeholder: string;
  value: string | null;
  onChange: (selectedPlace: string | null) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
}

interface AutocompleteFieldProps extends Omit<FormFieldProps, "type"> {
  type: "autocomplete";
  component: React.ComponentType<AutocompleteComponentProps>;
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
      {fields.map((field) => {
        if (field.type === "image-upload") {
          const imageField = field as ImageUploadFieldProps;
          return (
            <div key={field.id}>
              <label htmlFor={field.id}>
                {!field.required && <Tag color="warning">Optional</Tag>}
                {field.label}
              </label>
              <ImageUpload
                maxCount={imageField.maxCount}
                listType={imageField.listType}
                onChange={(file) => {
                  formik.setFieldValue(field.id, file);
                }}
              />
              {formik.errors[field.id] && formik.touched[field.id] && (
                <div className="text-red-500">
                  {formik.errors[field.id] as string}
                </div>
              )}
            </div>
          );
        } else if (field.type === "autocomplete") {
          const autocompleteField = field as AutocompleteFieldProps;
          const AutocompleteComponent = autocompleteField.component;
          return (
            <AutocompleteComponent
              key={field.id}
              id={field.id}
              label={
                <>
                  {!field.required && <Tag color="warning">Optional</Tag>}
                  {field.label}
                </>
              }
              placeholder={field.placeholder}
              value={formik.values[field.id] as string | null}
              onChange={(selectedPlace: string | null) => {
                formik.setFieldValue(field.id, selectedPlace);
              }}
              onBlur={() => formik.setFieldTouched(field.id, true)}
              error={formik.errors[field.id] as string}
              touched={formik.touched[field.id] as boolean}
            />
          );
        }
        return (
          <FormField
            key={field.id}
            id={field.id}
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
        );
      })}

      {forgotPasswordText && (
        <p className="text-red-500 cursor-pointer">{forgotPasswordText}</p>
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