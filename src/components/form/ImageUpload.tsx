import { message, Modal, Upload, UploadFile } from "antd";
import ImgCrop from "antd-img-crop";
import { RcFile, UploadProps } from "antd/es/upload";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

interface ImageUploadProps {
  listType?: "text" | "picture" | "picture-card";
  onChange?: (file: File | null) => void;
  maxCount?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  listType = "picture-card",
  onChange,
  maxCount = 5,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handleCancel = () => setPreviewOpen(false);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    const latestFile = newFileList[newFileList.length - 1];
    if (latestFile && latestFile.originFileObj) {
      onChange?.(latestFile.originFileObj);
    } else {
      onChange?.(null);
    }
    setFileList(newFileList);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  return (
    <>
      <ImgCrop rotationSlider>
        <Upload
          listType={listType}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={beforeUpload}
          customRequest={({ onSuccess }) => {
            setTimeout(() => {
              onSuccess?.("ok");
            }, 0);
          }}
        >
          {fileList.length < maxCount && uploadButton}
        </Upload>
      </ImgCrop>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default ImageUpload;
