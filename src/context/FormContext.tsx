import { createContext, useState } from "react";

type FormState = "forgotPassword" | "otp" | "changePassword";

export interface FormContextProps {
  formState: FormState;
  setFormState: (state: FormState) => void;
}

export const  FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [formState, setFormState] = useState<FormState>("forgotPassword");
  return (
    <FormContext.Provider value={{ formState, setFormState }}>
      {children}
    </FormContext.Provider>
  );
};
