import {
  TextField,
  Paper,
  Typography,
  Link,
  Checkbox,
  Button,
  CircularProgress,
  FormControlLabel,
  DialogContent,
  DialogActions,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { validateLogin } from "../validators";
import { login } from "../services/user";
import { useToastContext } from "../contexts/toast";
import { useUserContext } from "../contexts/user";

export const Login = () => {
  const navigate = useNavigate();
  const { showToast } = useToastContext();
  const { putUser } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState({
    path: "",
    msg: "",
  });

  async function handleLogin() {
    setErr({ path: "", msg: "" });
    const { value, error } = validateLogin({ email, password });
    if (error) {
      setErr({
        path: error.details[0].path[0].toString(),
        msg: error.details[0].message,
      });
      return;
    }
    setLoading(true);
    try {
      const data = await login(value);
      putUser(data);
      navigate("/chat");
      showToast({ type: "success", msg: "login success" });
    } catch (error: any) {
      showToast({ type: "error", msg: error?.response?.data?.message });
    }
    setLoading(false);
  }

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        height: "100%",
      }}
    >
      <Paper elevation={4} sx={{ maxWidth: "600px" }}>
        <Typography variant="h6" textAlign="center" mt={2}>
          Login
        </Typography>
        <DialogContent>
          <TextField
            fullWidth
            placeholder="example@test.com"
            label="email"
            margin="dense"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            helperText={err.path === "email" ? err.msg : ""}
            error={err.path === "email"}
          />
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            label="password"
            margin="dense"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          <Link onClick={() => navigate("/signup")} sx={{ mr: 2 }}>
            Don't have an account?
          </Link>
          <Button
            disabled={loading}
            endIcon={
              loading ? <CircularProgress color="inherit" size={20} /> : null
            }
            type="submit"
            variant="contained"
            onClick={handleLogin}
          >
            Login
          </Button>
        </DialogActions>
      </Paper>
    </Stack>
  );
};
