import React, { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import clsx from "clsx";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { FormFieldProps } from "../interface/formFeild";
import { DatePicker as AntDatePicker, Space } from "antd";
const { RangePicker } = AntDatePicker;
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

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
  rows = 3,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleToggleVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleDateRangeChange = (
    dates: [Dayjs | null, Dayjs | null] | null,
    dateStrings: [string, string]
  ) => {
    if (onChange) {
      onChange({
        target: {
          name: id,
          value: dates ? dateStrings : null,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    }
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
        {type === "textarea" ? (
          <Textarea
            id={id}
            name={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            rows={rows}
            className={clsx({ "border-red-500": error && touched })}
          />
        ) : type === "date" ? (
          <Space direction="vertical" size={12}>
            <RangePicker
              onChange={handleDateRangeChange}
              disabledDate={(current) => {
                return current && current < dayjs().startOf("day");
              }}
              format="DD-MM-YYYY"
            />
          </Space>
        ) : (
          <Input
            id={id}
            name={id}
            type={type === "password" && isPasswordVisible ? "text" : type}
            placeholder={placeholder}
            autoComplete="current-password"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            className={clsx({ "border-red-500": error && touched })}
          />
        )}
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
