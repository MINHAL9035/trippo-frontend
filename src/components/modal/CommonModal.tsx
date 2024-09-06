import React, { useState } from "react";
import { Image, Modal, Skeleton, Upload, UploadFile } from "antd";
import ImgCrop from "antd-img-crop";
import CommonForm from "../form/CommonForm";
import * as yup from "yup";
import { FormikValues } from "formik";
import { RcFile, UploadChangeParam } from "antd/es/upload";

interface ModalFormProps<T extends FormikValues> {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  title: string;
  initialValues: T;
  validationSchema: yup.Schema<T>;
  onSubmit: (values: T) => void;
  submitButtonText?: string;
  fields: Array<{
    id: keyof T;
    label: React.ReactNode;
    type?: "text" | "password" | "textarea";
    placeholder: string;
    rows?: number;
    required?: boolean;
  }>;
  allowImageUpload?: boolean;
  maxImages?: number;
  fileList?: UploadFile<RcFile>[];
  onChange?: (info: UploadChangeParam<UploadFile<RcFile>>) => void;
}

const CommonModal = <T extends FormikValues>({
  open,
  loading,
  onClose,
  onSubmit,
  title,
  initialValues,
  validationSchema,
  fields,
  submitButtonText,
  allowImageUpload = true,
  maxImages = 5,
}: ModalFormProps<T>): JSX.Element => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as File);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const onChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    setFileList(newFileList);
  };

  return (
    <Modal
      maskClosable={false}
      title={<p>{title}</p>}
      open={open}
      onCancel={onClose}
      footer={null}
      className="custom-modal"
    >
      <div className="modal-content">
        {loading ? (
          <>
            <Skeleton.Image active />
            <Skeleton active />
          </>
        ) : (
          <>
            {allowImageUpload && (
              <>
                <ImgCrop rotationSlider>
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={handlePreview}
                  >
                    {fileList.length < maxImages && "+ Upload"}
                  </Upload>
                </ImgCrop>
                {previewImage && (
                  <Image
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
              </>
            )}
            <CommonForm
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              fields={fields}
              submitButtonText={submitButtonText}
            />
          </>
        )}
      </div>
    </Modal>
  );
};

export default CommonModal;
