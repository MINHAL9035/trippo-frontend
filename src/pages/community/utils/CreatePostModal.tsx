import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Modal, Upload, Button, Avatar, message, Spin } from "antd";
import { Formik, Form, Field } from "formik";
import {
  InboxOutlined,
  LeftOutlined,
  RightOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import { RootState } from "@/redux/store/store";
import { IUser } from "@/interface/user/IUser.interface";
import { userDetails } from "@/service/api/userProfileApi";
import handleError from "@/utils/errorHandler";
import AutocompleteField from "@/components/form/AutocompleteField";
import { createPost } from "@/service/api/community";
const { Dragger } = Upload;
const { confirm } = Modal;

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: () => void;
}

interface FormValues {
  description: string;
  place: string;
}

const CreatePostModal: React.FC<CreateModalProps> = ({
  isOpen,
  onClose,
  onPostCreated,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [userProfile, setUserProfile] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const hasFetchedUserProfile = useRef(false);

  useEffect(() => {
    if (userInfo.email && !hasFetchedUserProfile.current) {
      hasFetchedUserProfile.current = true;
      (async (email: string) => {
        try {
          const response = await userDetails(email);
          setUserProfile(response.data);
        } catch (error) {
          handleError(error);
        }
      })(userInfo.email);
    }
  }, [userInfo.email]);

  useEffect(() => {
    const generatePreviews = async () => {
      const urls = await Promise.all(
        fileList.map((file) => {
          return new Promise<string>((resolve) => {
            if (file.originFileObj) {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.readAsDataURL(file.originFileObj);
            } else {
              resolve("");
            }
          });
        })
      );
      setPreviewUrls(urls);
    };

    generatePreviews();
  }, [fileList]);

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : fileList.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < fileList.length - 1 ? prevIndex + 1 : 0
    );
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure you want to discard this post?",
      icon: <ExclamationCircleFilled />,
      content: "Your uploaded images and entered information will be lost.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        setFileList([]);
        onClose();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleClose = () => {
    if (fileList.length > 0) {
      showDeleteConfirm();
    } else {
      onClose();
    }
  };

  const handleSubmit = async (values: FormValues) => {
    if (fileList.length === 0) {
      message.error("Please upload at least one image");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("postImages", file.originFileObj);
      }
    });

    formData.append("description", values.description);
    formData.append("place", values.place);

    try {
      const response = await createPost(formData);
      if (response.status === 201) {
        message.success("Post created successfully");
        setFileList([]);
        onPostCreated();
        onClose();
      }
    } catch (error) {
      message.error("Failed to create post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Create New Post"
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      width={800}
      maskClosable={false}
      className={`dark:bg-black`}
    >
      <Spin spinning={isLoading} tip="Creating post...">
        <Formik
          initialValues={{ description: "", place: "" }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, errors, touched, setFieldValue }) => (
            <Form className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 pr-0 md:pr-4 mb-4 md:mb-0">
                {fileList.length > 0 ? (
                  <div className="relative">
                    <img
                      src={previewUrls[currentIndex] || ""}
                      alt={`Upload ${currentIndex + 1}`}
                      className="w-full h-80 object-cover rounded-lg"
                    />
                    <Button
                      icon={<LeftOutlined />}
                      onClick={handlePrev}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2"
                    />
                    <Button
                      icon={<RightOutlined />}
                      onClick={handleNext}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    />
                    <div className="text-center mt-2">
                      {currentIndex + 1} / {fileList.length}
                    </div>
                  </div>
                ) : (
                  <Dragger
                    multiple
                    listType="picture"
                    fileList={fileList}
                    onChange={handleChange}
                    beforeUpload={() => false}
                    className={`h-80 dark:bg-black`}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload. Strictly prohibited
                      from uploading company data or other banned files.
                    </p>
                  </Dragger>
                )}
              </div>
              <div className="w-full md:w-1/2 pl-0 md:pl-4">
                <div className="flex items-center mb-4">
                  <Avatar src={userProfile?.image} size="large" />
                  <span className="ml-2 font-bold text-lg">
                    {userProfile?.fullName}
                  </span>
                </div>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Write a caption..."
                  className="w-full p-2 mb-4 border rounded-lg resize-none h-32"
                />
                <AutocompleteField
                  id="place"
                  label="Place"
                  placeholder="Search for a place"
                  value={values.place || ""}
                  onChange={(selectedPlace) =>
                    setFieldValue("place", selectedPlace)
                  }
                  onBlur={() => setFieldValue("place", values.place)}
                  error={errors.place}
                  touched={touched.place}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={handleClose} className="mr-2">
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={isSubmitting}
                  >
                    Share
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Spin>
    </Modal>
  );
};

export default CreatePostModal;
