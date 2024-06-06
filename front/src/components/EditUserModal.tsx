import * as React from "react";

import { Box, Button, Modal, TextField } from "@mui/material";
import { addUser, updateUser } from "../functions/admin";

interface IEditUserModal {
  showUpdateModal: boolean;
  setShowUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getUsersData: () => Promise<void>;
  userToUpdate: any;
}

export default function EditUserModal({
  showUpdateModal,
  setShowUpdateModal,
  getUsersData,
  userToUpdate,
  setIsLoading,
}: IEditUserModal) {
  const [form, setForm] = React.useState({
    fullName: "",
    status: "",
    userId: "",
  });
  React.useEffect(() => {
    console.log("userToUpdate", userToUpdate);
    setForm({
      fullName: userToUpdate?.fullName,
      status: userToUpdate?.status,
      userId: userToUpdate?.id,
    });
  }, [userToUpdate]);
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

  const handleUpdateUser = async () => {
    setIsLoading(true);
    await updateUser(form).then(() => {
      getUsersData();
      setShowUpdateModal(false);
      setIsLoading(false);
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <Modal
      open={showUpdateModal}
      onClose={() => setShowUpdateModal(false)}
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
            label="Nom d'utilisateur"
            name="fullName"
            autoComplete="fullName"
            value={form.fullName}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="status"
            label="Statut"
            name="status"
            autoComplete="status"
            value={form.status}
            onChange={handleChange}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleUpdateUser}
          >
            Confirmer
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
