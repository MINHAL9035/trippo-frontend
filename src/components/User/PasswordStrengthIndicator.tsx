// src/components/PasswordStrengthIndicator.tsx
import React from "react";

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
}) => {
  return (
    <div>
      <ul className=" text-xs">
        <li
          className={`${
            password.length >= 8 ? "text-green-600" : "text-gray-600"
          }`}
        >
          {password.length >= 8 ? "✓" : "✗"} At least 8 characters
        </li>
        <li
          className={`${
            /[a-z]/.test(password) && /[A-Z]/.test(password)
              ? "text-green-600"
              : "text-gray-600"
          }`}
        >
          {/[a-z]/.test(password) && /[A-Z]/.test(password) ? "✓" : "✗"} Mix of
          uppercase & lowercase letters
        </li>
        <li
          className={`${
            /\d/.test(password) ? "text-green-600" : "text-gray-600"
          }`}
        >
          {/\d/.test(password) ? "✓" : "✗"} Include numbers
        </li>
        <li
          className={`${
            /[!@#$%^&*(),.?":{}|<>]/.test(password)
              ? "text-green-600"
              : "text-gray-600"
          }`}
        >
          {/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "✓" : "✗"} Include special
          characters
        </li>
      </ul>
    </div>
  );
};

export default PasswordStrengthIndicator;
