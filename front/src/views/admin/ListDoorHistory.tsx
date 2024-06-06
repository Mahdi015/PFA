import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { listDoorHistorys, deleteDoorHistory } from "../../functions/admin";
import { formatDistanceToNow } from "date-fns";
import { Container, Button } from "@mui/material";

import { fr } from "date-fns/locale";

export default function ListDoorHistory() {
  const [doorHistoryData, setDoorHistoryData] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);

  const getDoorHistoryData = async () => {
    const res = await listDoorHistorys();
    if (res.data) {
      console.log("a", res.data);
      const formedData = res.data.map((item: any) => ({
        id: item.id,
        fullName: item.User.fullName,
        capture_date: item.capture_date,
        action: item.action,
      }));

      setDoorHistoryData(formedData);
    }
  };

  React.useEffect(() => {
    getDoorHistoryData();
  }, []);

  const handleDeleteDoorHistory = async (doorHistoryId: string) => {
    setIsLoading(true);
    await deleteDoorHistory(doorHistoryId).then(() => {
      getDoorHistoryData();
      setIsLoading(false);
    });
  };

  const columns = [
    {
      field: "fullName",
      headerName: "Nom",
      width: 200,
    },
    {
      field: "capture_date",
      headerName: "Date de création",
      width: 200,
      valueGetter: (value: any) => {
        const date = new Date(value);
        return isNaN(date.getTime())
          ? ""
          : formatDistanceToNow(date, { addSuffix: true, locale: fr });
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
    },
    {
      field: "actions",
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
            color="error"
            onClick={() => handleDeleteDoorHistory(params.row.id)}
          >
            Supprimer
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
          getRowId={(row: any) => row.id || row._id}
          disableMultipleRowSelection
          disableRowSelectionOnClick
        />
      </div>
    </Container>
  );
}
