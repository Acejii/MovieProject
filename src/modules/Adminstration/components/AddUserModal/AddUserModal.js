import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import "./addUserModal.scss";
import UserContentModal from "../UserContentModal";

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

const AddUserModal = ({ onReload }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="edit">
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        Thêm người dùng
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
            Thêm người dùng
          </h1>
          <UserContentModal setOpen={setOpen} onReload={onReload} />
        </Box>
      </Modal>
    </div>
  );
};

export default AddUserModal;
