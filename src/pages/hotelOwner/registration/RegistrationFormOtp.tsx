import CommonForm from "@/components/form/CommonForm";
import { setOtpVerified } from "@/redux/slices/hotelOwnerSlice";
import { hotelVerifyOtp } from "@/service/api/hotelOwner";
import { OtpSchema } from "@/validation/formValidation";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface otpInterface {
  otp: string;
}

interface RegistrationFormOtpProps {
  email: string;
}

const RegistrationFormOtp: React.FC<RegistrationFormOtpProps> = ({ email }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values: otpInterface) => {
    const otp = parseInt(values.otp, 10);
    const response = await hotelVerifyOtp(otp, email);
    if (response.status === 201) {
      dispatch(setOtpVerified(true));
      navigate("/hotelOwner/ownerDetails");
    }
  };
  return (
    <>
      <p className="mt-2 mb-4 text-sm text-gray-600">
        Otp sent to <span className="text-red-400">{email}</span>
      </p>
      <CommonForm<otpInterface>
        initialValues={{
          otp: "",
        }}
        validationSchema={OtpSchema}
        onSubmit={handleSubmit}
        fields={[
          {
            id: "otp",
            label: "otp",
            type: "text",
            placeholder: "Enter your 6 digit otp",
            required: true,
          },
        ]}
        submitButtonText={"verify"}
      />
    </>
  );
};

export default RegistrationFormOtp;
