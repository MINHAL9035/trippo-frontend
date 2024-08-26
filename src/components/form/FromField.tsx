import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import clsx from "clsx";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  onKeyDown,
  error,
  touched,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleToggleVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="space-y-1">
      <Label
        htmlFor={id}
        className={clsx({ "text-red-500": error && touched })}
      >
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          name={id}
          type={type === "password" && isPasswordVisible ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          error={!!(error && touched)}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={handleToggleVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            {isPasswordVisible ? (
              <FaRegEyeSlash className="h-5 w-5 text-gray-500" />
            ) : (
              <FaEye className="h-5 w-5 text-gray-500" />
            )}
          </button>
        )}
        {error && touched && (
          <p className="text-xs text-red-500 absolute mt-1">{error}</p>
        )}
      </div>
    </div>
  );
};

export default FormField;
