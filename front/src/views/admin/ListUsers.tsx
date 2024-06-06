import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { listUsers, deleteUser } from "../../functions/admin";
import { formatDistanceToNow } from "date-fns";
import { Container, Button } from "@mui/material";
import { fr } from "date-fns/locale";
import EditUserModal from "../../components/EditUserModal";

function formatDateToDDMMYYYY(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function ListUsers() {
  const [userData, setUserData] = React.useState([]);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [userToUpdate, setUserToUpdate] = React.useState();

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
      renderCell: (params: any) => (
        <div style={{ display: 'flex', flexDirection: "row", alignItems: 'center', gap: '15px' }}>
          <div
            style={{
              width: 8,
              height: 8,
              backgroundColor: params.row.status == "Activated" ? "green" : "red",
              borderRadius: 50,
            }}
          ></div>
          <span>{params.row.fullName}</span>
        </div>
      ),
    },
    {
      field: "created_at",
      headerName: "Date de création",
      width: 200,
      valueGetter: (value: any) => {
        const date = new Date(value);
        return isNaN(date.getTime())
          ? ""
          : formatDateToDDMMYYYY(date);
      },
    },
    {
      field: "start_time",
      headerName: "Debut",
      width: 100,
      valueGetter: (value: any) => {
        return value === null
          ? ""
          : value
      },
    },
    {
      field: "end_time",
      headerName: "Fin",
      width: 100,
      valueGetter: (value: any) => {
        return value === null
          ? ""
          : value
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 400,
      renderCell: (params: any) => (
        <div
          style={{
            padding: "0 16px",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            gap: "30px",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleModifier(params.row)}
          >
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
    setIsLoading(true);
    await deleteUser(userId).then(() => {
      getUsersData();
      setIsLoading(false);
    });
  };

  const handleModifier = (row: any) => {
    setUserToUpdate(row);
    setShowUpdateModal(true);
    console.log("Modifier clicked for user ID:", row);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Container
        sx={{ mt: 4, mb: 4 }}
        style={{
          display: "flex",

          justifyContent: "end",
        }}
      >
      </Container>
      <div style={{ height: "auto", width: "100%" }}>
        <DataGrid
          loading={isLoading}
          rows={userData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[10]}
          getRowId={(row: any) => row.id || row._id}
          disableMultipleRowSelection
          disableRowSelectionOnClick
        />
      </div>
      <EditUserModal
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
        getUsersData={getUsersData}
        userToUpdate={userToUpdate}
        setIsLoading={setIsLoading}
      />
    </Container>
  );
}
