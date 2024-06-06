import * as React from "react";
import { Box, Button, Modal, TextField, Switch } from "@mui/material";
import { updateUser } from "../functions/admin";

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
    start_time: "",
    end_time: "",
  });

  React.useEffect(() => {
    setForm({
      fullName: userToUpdate?.fullName || "",
      status: userToUpdate?.status || "",
      userId: userToUpdate?.id || "",
      start_time: userToUpdate?.start_time || "",
      end_time: userToUpdate?.end_time || "",
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
      [name]: value || null,
    }));
  };

  const handleToggleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prevForm) => ({
      ...prevForm,
      status: e.target.checked ? "Activated" : "Deactivated",
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

          <span>Status</span><br/>
          <Switch
            checked={form.status === "Activated"}
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
            value={form.start_time || ""}
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
            value={form.end_time || ""}
            InputLabelProps={{
              shrink: true,
            }}
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
