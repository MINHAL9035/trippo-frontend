import React, { useState } from "react";
import { message } from "antd";
import CommonForm from "@/components/form/CommonForm";
import CommonModal from "@/components/modal/CommonModal";
import { ProfileFormValues } from "@/interface/user/IProfileFormValues";
import { profileFormSchema } from "@/validation/profileFormValidation";
import { IUser } from "../../../../interface/user/IUser.interface";
import handleError from "@/utils/errorHandler";
import { editProfile } from "@/service/api/userProfileApi";

interface EditModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  UserProfile?: IUser | null;
}

const EditModal: React.FC<EditModalProps> = ({
  open,
  loading: parentLoading,
  onClose,
  UserProfile,
}) => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values: ProfileFormValues) => {
    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("currentCity", values.currentCity || "");
      formData.append("website", values.website || "");
      formData.append("aboutYou", values.aboutYou || "");
      if (values.profilePicture) {
        formData.append("profilePicture", values.profilePicture);
      }

      const response = await editProfile(formData);

      if (response.status === 200) {
        message.success("Profile updated successfully!");
        onClose();
        // Refresh the page
        window.location.reload();
      }
    } catch (error) {
      handleError(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <CommonModal
      title="Edit Profile"
      open={open}
      loading={parentLoading || submitting}
      onClose={onClose}
    >
      <CommonForm<ProfileFormValues>
        initialValues={{
          fullName: UserProfile?.fullName || "",
          currentCity: UserProfile?.currentCity || "",
          website: UserProfile?.website || "",
          aboutYou: UserProfile?.aboutYou || "",
          profilePicture: null,
        }}
        validationSchema={profileFormSchema}
        onSubmit={handleSubmit}
        fields={[
          {
            id: "profilePicture",
            placeholder: "Upload profile picture",
            type: "image-upload",
            required: true,
            maxCount: 1,
            listType: "picture-card",
          },
          {
            id: "fullName",
            label: "fullName",
            placeholder: "fullName",
            required: true,
          },
          {
            id: "currentCity",
            label: "City",
            placeholder: "City",
            required: false,
          },
          {
            id: "website",
            label: "Website",
            placeholder: "Social Link",
            required: false,
          },
          {
            id: "aboutYou",
            label: "About",
            type: "textarea",
            placeholder: "About You",
            required: false,
          },
        ]}
        submitButtonText={submitting ? "Saving..." : "Save Changes"}
      />
    </CommonModal>
  );
};

export default EditModal;
