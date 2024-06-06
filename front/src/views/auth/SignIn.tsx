import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import dotenv from "dotenv";
import { Alert } from "@mui/material";

// Load environment variables from .env file
dotenv.config();
console.log(process.env.REACT_APP_SUPABASE_URL);
const supabase = createClient(
  "https://zoyearzeplakofnlpwbl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpveWVhcnplcGxha29mbmxwd2JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2MDEyOTAsImV4cCI6MjAzMzE3NzI5MH0.jT-FjXdISIOixyVn2T-Gsd9B13UFGtz5I6YjLZLyoB8"
);

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setShowLogin(false);
    event.preventDefault();
    await supabase.auth
      .signInWithPassword({
        email,
        password,
      })
      .then((data: any) => {
        if (data.data) {
          setShowLogin(true);
        }
        if (data.data.session?.access_token) {
          localStorage.setItem("access_token", data.data.session?.access_token);
          navigate("/");
        }
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 18,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {showLogin && (
              <Alert severity="error">Invalid login credentials </Alert>
            )}{" "}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(v) => setEmail(v.target.value)}
              value={email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(v) => setPassword(v.target.value)}
              value={password}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
