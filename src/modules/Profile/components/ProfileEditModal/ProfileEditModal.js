import React, { useState } from "react";
import { Modal, Button } from "antd";
import "./profileEditModal.scss";
import ModalContent from "./ModalContent";

const ProfileEditModal = ({info}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="edit">
      <Button type="primary" onClick={showModal}>
        Chỉnh sửa
      </Button>
      <Modal
        title="Chỉnh sửa thông tin tài khoản"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <ModalContent setModalOpen={setIsModalOpen} info={info}/>
      </Modal>
    </div>
  );
};

export default ProfileEditModal;
