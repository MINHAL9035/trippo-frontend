export interface FormFieldProps {
  id: string;
  label?: React.ReactNode;
  type?: "text" | "password" | "textarea" | "autocomplete" | "date";
  placeholder: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
  touched?: boolean;
  rows?: number;
  required?: boolean;
}
