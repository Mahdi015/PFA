import * as React from "react";

import { Box, Button, Modal, TextField } from "@mui/material";
import { addUser } from "../functions/admin";

interface AddUserModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getUsersData: () => Promise<void>;
}

export default function AddUserModal({
  showModal,
  setShowModal,
  getUsersData,
  setIsLoading,
}: AddUserModalProps) {
  const [userName, setUserName] = React.useState("");
  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleAddUser = async () => {
    setIsLoading(true);
    await addUser(userName).then(() => {
      getUsersData();
      setShowModal(false);
      setIsLoading(false);
    });
  };

  return (
    <Modal
      open={showModal}
      onClose={() => setShowModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            onChange={(e) => setUserName(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleAddUser}
          >
            Ajouter utilisateur
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
