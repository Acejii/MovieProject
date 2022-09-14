import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./editUserModal.scss";
import EditUserContent from "../EditUserContent";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "550px",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditUserModal = ({ open, setOpen, userSelected, onReload }) => {
  const handleClose = () => setOpen(false);
  return (
    <div className="edit">
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
            Chỉnh sửa thông tin người dùng
          </h1>
          <EditUserContent
            setOpen={setOpen}
            userSelected={userSelected}
            onReload={onReload}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default EditUserModal;
