import React, { useEffect, useState } from "react";
import CommonModal from "@/components/modal/CommonModal";
import handleError from "@/utils/errorHandler";
import { profileFormSchema } from "@/validation/profileFormValidation";
import { message, UploadFile } from "antd";
import { IUser } from "@/interface/user/IUser.interface";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import { editUser } from "@/service/api/userProfileApi";

interface ProfileFormValues {
  firstName: string;
  lastName: string;
  currentCity?: string;
  website?: string;
  aboutYou?: string;
  image?: File | string;
}

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
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (UserProfile?.image) {
      const newFileList: UploadFile[] = [
        {
          uid: "-1",
          name: "profile-image",
          status: "done",
          url: UserProfile.image,
        },
      ];
      setFileList(newFileList);
    }
  }, [UserProfile]);

  const handleFileChange = (info: UploadChangeParam<UploadFile<File>>) => {
    const updatedFileList = info.fileList.map(file => ({
      ...file,
      originFileObj: file.originFileObj as RcFile,
    }));
    setFileList(updatedFileList);
  };

  return (
    <CommonModal<ProfileFormValues>
      open={open}
      loading={loading}
      onClose={onClose}
      title="Edit Details"
      initialValues={{
        firstName: UserProfile?.firstName || "",
        lastName: UserProfile?.lastName || "",
        currentCity: UserProfile?.currentCity || "",
        website: UserProfile?.website || "",
        aboutYou: UserProfile?.aboutYou || "",
        image: UserProfile?.image || "",
      }}
      validationSchema={profileFormSchema}
      onSubmit={async (values) => {
        try {
          const formData = new FormData();
          formData.append("firstName", values.firstName);
          formData.append("lastName", values.lastName);
          formData.append("currentCity", values.currentCity || "");
          formData.append("website", values.website || "");
          formData.append("aboutYou", values.aboutYou || "");

          // If there's an image, append it
          if (fileList.length > 0 && fileList[0].originFileObj) {
            formData.append("image", fileList[0].originFileObj as RcFile);
          }

          const response = await editUser(formData);
          message.success("Details updated successfully!");
          console.log("Response:", response);
        } catch (error) {
          handleError(error);
        }
      }}
      fields={[
        {
          id: "firstName",
          label: "First Name",
          type: "text",
          placeholder: "First Name",
          required: true,
        },
        {
          id: "lastName",
          label: "Last Name",
          type: "text",
          placeholder: "Last Name",
          required: true,
        },
        {
          id: "currentCity",
          label: "City",
          type: "text",
          placeholder: "Select your city",
          required: false,
        },
        {
          id: "website",
          label: "Website",
          type: "text",
          placeholder: "Enter a website link",
          required: false,
        },
        {
          id: "aboutYou",
          label: "About You",
          type: "textarea",
          placeholder: "Write about you",
          required: false,
        },
      ]}
      submitButtonText="Save Changes"
      maxImages={1}
      fileList={fileList}
      onChange={handleFileChange}
    />
  );
};

export default EditModal;
