import React from "react";
import { Modal, Skeleton } from "antd";

interface IModalInterface {
  title?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  loading?: boolean;
  open: boolean;
  onClose: () => void;
}

const CommonModal: React.FC<IModalInterface> = ({
  title = "Default Title",
  children,
  loading = false, // loading state
  open,
  onClose,
}) => {
  return (
    <Modal
      title={title}
      open={open}
      onCancel={onClose}
      footer={null}
      maskClosable={false}
    >
      <div className="max-h-[400px] overflow-y-scroll scrollbar-hide">
        {loading ? <Skeleton active paragraph={{ rows: 10 }} /> : children}
      </div>
    </Modal>
  );
};

export default CommonModal;
