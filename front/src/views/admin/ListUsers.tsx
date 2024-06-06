import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { listUsers, deleteUser } from "../../functions/admin";
import { formatDistanceToNow } from "date-fns";
import { Container, Button } from "@mui/material";

export default function ListUsers() {
  const [userData, setUserData] = React.useState([]);

  const getUsersData = async () => {
    const res = await listUsers();
    if (res.data) {
      setUserData(res.data);
    }
  };

  React.useEffect(() => {
    getUsersData();
  }, []);

  const columns = [
    {
      field: "fullName",
      headerName: "Nom",
      width: 200,
    },
    {
      field: "created_at",
      headerName: "Date de création",
      width: 200,
      valueGetter: (value) => {
        const date = new Date(value);
        return isNaN(date.getTime())
          ? ""
          : formatDistanceToNow(date, { addSuffix: true });
      },
    },
    {
      field: "status",
      headerName: "Statut",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 400,
      renderCell: (params) => (
        <div style={{ padding: '0 16px', height: '100%', display: 'flex', flexDirection: 'row', gap: '30px', alignItems: 'center' }}>
          <Button variant="contained" color="primary" onClick={() => handleModifier(params.row.id)}>
            Modifier
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteUser(params.row.id)}
          >
            Supprimer
          </Button>
        </div>
      ),
      
    },
  ];

  const handleDeleteUser = async (userId: string) => {
    await deleteUser(userId);
    getUsersData();
  };

  const handleModifier = (userId) => {
    // Handle modifier button click
    console.log("Modifier clicked for user ID:", userId);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={userData}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          getRowId={(row) => row.id || row._id}
        />
      </div>
    </Container>
  );
}
