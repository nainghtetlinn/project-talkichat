import {
  Paper,
  Stack,
  TextField,
  Checkbox,
  Typography,
  Button,
  Link,
  FormControlLabel,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { validateLogin } from "../../validators";
import { login } from "../../services/user";
import { useUserContext } from "../../contexts/user";

const Login = () => {
  const navigate = useNavigate();
  const { putUser } = useUserContext();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState({
    path: "",
    msg: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;
    setUser((prev) => ({ ...prev, [name]: value }));
  }

  function handleLogin() {
    setErr({ path: "", msg: "" });
    const { value, error } = validateLogin({
      email: user.email,
      password: user.password,
    });
    if (error) {
      setErr({
        path: error.details[0].path[0].toString(),
        msg: error.details[0].message,
      });
      return;
    }
    setLoading(true);
    login(user)
      .then((data) => {
        putUser(data);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        const res = err.response?.data as any;
        const msg = res.message || "Something went wrong";
        enqueueSnackbar(msg, { variant: "error" });
        setLoading(false);
      });
  }

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100%", overflow: "hidden" }}
    >
      <Paper elevation={4} sx={{ maxWidth: "600px" }}>
        <DialogTitle>
          <Typography variant="h6" component="p" textAlign="center">
            TalkiChat - Login
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            type="text"
            placeholder="example@test.com"
            label="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            helperText={err.path === "email" ? err.msg : ""}
            error={err.path === "email"}
          />

          <TextField
            fullWidth
            margin="dense"
            type={showPassword ? "text" : "password"}
            label="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            helperText={err.path === "password" ? err.msg : ""}
            error={err.path === "password"}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={showPassword}
                onChange={() => setShowPassword((prev) => !prev)}
              />
            }
            label="Show password"
          />
        </DialogContent>
        <DialogActions>
          <Link
            onClick={() => navigate("/signup")}
            sx={{ mr: 2, cursor: "pointer" }}
          >
            Don't have an account?
          </Link>
          <Button
            disabled={loading}
            onClick={handleLogin}
            variant="contained"
            endIcon={
              loading ? <CircularProgress size={20} color="inherit" /> : null
            }
            sx={{ textTransform: "capitalize" }}
          >
            Login
          </Button>
        </DialogActions>
      </Paper>
    </Stack>
  );
};

export default Login;
