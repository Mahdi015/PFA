import * as React from "react";
import { Box, Button, Modal, TextField, Switch } from "@mui/material";
import { addUser } from "../functions/admin";

interface AddUserModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddUserModal({
  showModal,
  setShowModal,
  setIsLoading,
}: AddUserModalProps) {
  const [userData, setUserData] = React.useState({
    fullName: "",
    status: "Activated",
    start_time: "",
    end_time: "",
  });

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
    await addUser(userData).then(() => {
      setShowModal(false);
      setIsLoading(false);
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value || null,
    }));
  };

  const handleToggleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      status: e.target.checked ? "Activated" : "Deactivated",
    }));
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
            id="fullName"
            label="Nom"
            name="fullName"
            autoComplete="fullName"
            onChange={handleChange}
          />

          <span>Status</span><br/>
          <Switch
            checked={userData.status === "Activated"}
            onChange={handleToggleChange}
            name="status"
            color="primary"
          />

          <TextField
            margin="normal"
            fullWidth
            id="start_time"
            label="Start Time"
            type="time"
            name="start_time"
            value={userData.start_time || ""}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            fullWidth
            id="end_time"
            label="End Time"
            type="time"
            name="end_time"
            value={userData.end_time || ""}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
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
