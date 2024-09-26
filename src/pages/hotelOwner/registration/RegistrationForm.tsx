import CommonForm from "@/components/form/CommonForm";
import { hotelOwnerEmailSchema } from "@/validation/formValidation";
import handleError from "@/utils/errorHandler";
import { hotelSentOtp } from "@/service/api/hotelOwner";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { setOwnerEmail } from "@/redux/slices/hotelOwnerSlice";
import { useState } from "react";

interface owner {
  email: string;
}

interface RegistrationFormProps {
  onSubmitSuccess: (email: string) => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmitSuccess,
  setLoading,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (values: owner) => {
    setIsSubmitting(true);
    setLoading(true);
    try {
      dispatch(setOwnerEmail(values.email));
      const response = await hotelSentOtp(values.email);
      if (response?.status === 201) {
        message.success("Otp sent successfully");
        onSubmitSuccess(values.email);
      }
      return response;
    } catch (error) {
      setIsSubmitting(false);
      setLoading(false);
      handleError(error);
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <CommonForm
        initialValues={{
          email: "",
        }}
        validationSchema={hotelOwnerEmailSchema}
        onSubmit={handleSubmit}
        fields={[
          {
            id: "email",
            label: "Email",
            type: "text",
            placeholder: "Enter your Email",
            required: true,
          },
        ]}
        submitButtonText={isSubmitting ? "Sending otp..." : "Send OTP"}
      />
    </>
  );
};

export default RegistrationForm;
