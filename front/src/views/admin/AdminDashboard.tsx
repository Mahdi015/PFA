import * as React from "react";
import { Container, Button, Snackbar, Alert, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AddUserModal from "../../components/AddUserModal";

export default function AdminDashboard() {
  const [open, setOpen] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleVideoControl = (action) => {
    const videoElement = document.getElementById("video");
    if (action === "play") {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <AddUserModal
        showModal={showModal}
        setShowModal={setShowModal}
        setIsLoading={(val: boolean) => {
          setIsLoading(val);
          if (val) setSnackbarOpen(true);
        }}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
          Utilisateur ajouté avec succès!
        </Alert>
      </Snackbar>

      <Grid container justifyContent="center" sx={{ mb: 2 }}>
        <Button
          onClick={() => setShowModal(true)}
          variant="contained"
          endIcon={<PersonAddAltIcon />}
        >
          Ajouter un utilisateur
        </Button>
      </Grid>

      <Grid container justifyContent="center">
        <video id="video" width="700" height="315" autoPlay loop muted >
          <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Grid>

      <Grid container justifyContent="center" spacing={2} sx={{ mt: 2 }}>
        <Grid item>
          <Button variant="contained" onClick={() => handleVideoControl("play")}>
            Démarrer le streaming
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => handleVideoControl("pause")}>
            Arrêter le streaming
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
