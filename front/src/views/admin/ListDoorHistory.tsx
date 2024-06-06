import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { listDoorHistorys, deleteDoorHistory } from "../../functions/admin";
import { formatDistanceToNow } from "date-fns";
import { Container, Button, Modal, Box } from "@mui/material";

import { fr } from "date-fns/locale";

export default function ListDoorHistory() {
  const [doorHistoryData, setDoorHistoryData] = React.useState([]);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const getDoorHistoryData = async () => {
    const res = await listDoorHistorys();
    if (res.data) {
      const formedData = res.data.map((item) => ({
        id: item.id,
        fullName: item.User.fullName,
        capture_date: item.capture_date,
        action: item.action,
        image_url: item.image_url,
      }));
      setDoorHistoryData(formedData);
    }
  };

  React.useEffect(() => {
    getDoorHistoryData();
  }, []);

  const handleDeleteDoorHistory = async (doorHistoryId) => {
    setIsLoading(true);
    await deleteDoorHistory(doorHistoryId).then(() => {
      getDoorHistoryData();
      setIsLoading(false);
    });
  };

  const handleOpenImage = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const columns = [
    {
      field: "fullName",
      headerName: "Nom",
      width: 200,
    },
    {
      field: "capture_date",
      headerName: "Date de détection",
      width: 200,
      valueGetter: (value) => {
        const date = new Date(value);
        return isNaN(date.getTime())
          ? ""
          : date.toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            });
      },
    },
    {
      field: "action",
      headerName: "Statut d'accès",
      width: 150,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: 5,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                backgroundColor:
                  params.value === "GRANTED" ? "green" : "red",
                borderRadius: 50,
              }}
            ></div>
            {params.value === "GRANTED" ? 'ACCORDE' : 'INTERDIT'}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 400,
      renderCell: (params) => (
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
            color="error"
            onClick={() => handleDeleteDoorHistory(params.row.id)}
          >
            Supprimer
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!params.row.image_url}
            onClick={() => handleOpenImage(params.row.image_url)}
          >
            Voir Image
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <div style={{ height: "auto", width: "100%" }}>
        <DataGrid
          loading={isLoading}
          rows={doorHistoryData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[10]}
          getRowId={(row) => row.id || row._id}
          disableMultipleRowSelection
          disableRowSelectionOnClick
        />
      </div>
      <Modal open={isModalOpen} onClose={handleCloseModal} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box sx={{ width: "auto", maxWidth: "90vw", maxHeight: "90vh", bgcolor: "background.paper", p: 2 }}>
          <img src={selectedImage} alt="Door Image" style={{ maxWidth: "400px" }} />
        </Box>
      </Modal>
    </Container>
  );
}
