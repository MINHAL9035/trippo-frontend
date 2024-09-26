import React from "react";
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
  loading,
  onClose,
  UserProfile,
}) => {
  const handleSubmit = async (values: ProfileFormValues) => {
    console.log("sdf", values);

    try {
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("currentCity", values.currentCity || "");
      formData.append("website", values.website || "");
      formData.append("aboutYou", values.aboutYou || "");
      if (values.profilePicture) {
        formData.append("profilePicture", values.profilePicture);
      }
      const response = await editProfile(formData);
      return response;
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <CommonModal
      title="Edit Profile"
      open={open}
      loading={loading}
      onClose={onClose}
    >
      <CommonForm<ProfileFormValues>
        initialValues={{
          firstName: UserProfile?.firstName || "",
          lastName: UserProfile?.lastName || "",
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
            id: "firstName",
            label: "First Name",
            placeholder: "First Name",
            required: true,
          },
          {
            id: "lastName",
            label: "Last Name",
            placeholder: "Last Name",
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
        submitButtonText="Save Changes"
      />
    </CommonModal>
  );
};

export default EditModal;
