import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import ModalContent from "./ModalContent";
import "./profileEditModal.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "450px",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ProfileEditModal = ({ info, onReload }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="edit">
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Chỉnh sửa
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1
            style={{ textAlign: "center", fontSize: "20px", fontWeight: "600" }}
          >
            Chỉnh sửa thông tin cá nhân
          </h1>
          <ModalContent
            setModalOpen={setOpen}
            info={info}
            onReload={onReload}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileEditModal;
