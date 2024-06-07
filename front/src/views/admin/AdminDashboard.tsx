import * as React from "react";
import { Container, Button, Snackbar, Alert, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AddUserModal from "../../components/AddUserModal";
import { getStats } from "../../functions/admin";
import { Line } from "react-chartjs-2";
import { ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function AdminDashboard() {
  const [open, setOpen] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [statsData, setStatsData] = React.useState<any>();
  const [pieData, setPieData] = React.useState<any>();

  const navigate = useNavigate();

  const handleVideoControl = (action: any) => {
    const videoElement = document.getElementById("video") as any;
    if (action === "play") {
      videoElement?.play();
    } else {
      videoElement?.pause();
    }
  };
  const handleGetStats = async () => {
    const res = await getStats();

    if (res.data) {
      const formedChartData = transformDataForChart(
        res.data.capture_date_distribution
      );
      const pieData = transformDataForPieChart({
        granted_count: res.data.granted_count,
        forbidden_count: res.data.forbidden_count,
      });
      setPieData(pieData);
      setStatsData(formedChartData);
    }
    console.log("statsData", statsData);
  };
  React.useEffect(() => {
    handleGetStats();
  }, []);

  const transformDataForChart = (data: any) => {
    const labels = Object.keys(data).sort();
    const values = labels.map((label) => data[label]);
    console.log(labels, values);

    return {
      labels,

      datasets: [
        {
          label: "Capture Count",
          data: values,
          fill: true,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",

          tension: 0.4, // Smooth the line
        },
      ],
    };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const transformDataForPieChart = (data: any) => {
    return {
      labels: ["Granted", "Forbiden"],
      datasets: [
        {
          data: Object.values(data),
          backgroundColor: ["#FF5733", "#36A2EB"],
          hoverBackgroundColor: ["#FF5733", "#36A2EB"],
        },
      ],
    };
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <AddUserModal
      showModal={showModal}
      setShowModal={setShowModal}
      setIsLoading={(val) => {
        setIsLoading(val);
        if (val) setSnackbarOpen(true);
      }}
    />

    <Snackbar
      open={snackbarOpen}
      autoHideDuration={2000}
      onClose={() => setSnackbarOpen(false)}
    >
      <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
        Utilisateur ajouté avec succès!
      </Alert>
    </Snackbar>

    <Grid justifyContent="center" alignItems="center" container spacing={2} direction="column">
      {/* Row 1: Button and Video */}
      <Grid item xs={12}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Button
              onClick={() => setShowModal(true)}
              variant="contained"
              endIcon={<PersonAddAltIcon />}
            >
              Ajouter un utilisateur
            </Button>
          </Grid>
    
        </Grid>
      </Grid>
      <Grid   justifyContent="center"  item xs={8}>
        <video id="video" width="60%" height="auto" autoPlay loop muted>
          <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Grid>
      <Grid justifyContent="center" alignItems="center" item>
            <Button variant="contained" onClick={() => handleVideoControl('play')}>
              Démarrer le streaming
            </Button>
      
         
            <Button variant="contained" onClick={() => handleVideoControl('pause')}>
              Arrêter le streaming
            </Button>
          </Grid>


   


    </Grid>
    <Grid item xs={12}>
        <Grid container spacing={2}>
  
          <Grid item xs={6}>
            {!!statsData && <Line options={options} data={statsData} />}
          </Grid>

      
  
        </Grid>
      </Grid>




      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {!!pieData && <div style={{ width: '100%' }}><Pie data={pieData} /></div>}
          </Grid>
        </Grid>
      </Grid>

  </Container>
  );
}
