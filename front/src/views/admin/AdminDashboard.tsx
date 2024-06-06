import * as React from "react";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [open, setOpen] = React.useState(true);

  const navigate = useNavigate();


  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      video / table history
    </Container>
  );
}
