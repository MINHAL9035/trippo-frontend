import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CommonForm from "@/components/form/CommonForm";
import { loginInterface } from "../../../interface/user/login";
import { OwnerLoginSchema } from "@/validation/formValidation";
import handleError from "@/utils/errorHandler";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ownerLogin } from "@/service/api/hotelOwner";
import { useDispatch } from "react-redux";
import { setOwnerInfo } from "@/redux/slices/hotelOwnerSlice";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (values: loginInterface) => {
    setIsSubmitting(true);
    try {
      const response = await ownerLogin(values);
      if (response.status === 201) {
        toast.success("logged in successfully");
        dispatch(
          setOwnerInfo({
            email: response?.data.email,
            ownerId: response?.data.ownerId,
          })
        );
        navigate("/hotelOwner/ownerDashboard");
      }
    } catch (error) {
      setIsSubmitting(false);
      handleError(error);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center text-2xl font-semibold">
            Owner Login
          </DialogTitle>
        </DialogHeader>
        <CommonForm<loginInterface>
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={OwnerLoginSchema}
          onSubmit={handleSubmit}
          fields={[
            {
              id: "email",
              label: "Email",
              type: "text",
              placeholder: "Enter your Email",
              required: true,
            },
            {
              id: "password",
              label: "Password",
              type: "password",
              placeholder: "Enter the password",
              required: true,
            },
          ]}
          submitButtonText={isSubmitting ? "Logging in..... " : "login"}
        />
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
