import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  TextField,
  Paper,
  Typography,
  Link,
  Checkbox,
  Button,
  CircularProgress,
  Avatar,
  FormControlLabel,
  DialogContent,
  DialogActions,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { validateSignup } from "../validators";
import { signup } from "../services/user";
import { useToastContext } from "../contexts/toast";
import { useUserContext } from "../contexts/user";

export const Signup = () => {
  const navigate = useNavigate();
  const { showToast } = useToastContext();
  const { putUser } = useUserContext();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  const [avatarFile, setAvatarFile] = useState<null | any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirm, setConfirm] = useState("");

  const [err, setErr] = useState({
    path: "",
    msg: "",
  });

  function handleAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const imgUrl = URL.createObjectURL(e.target.files[0]);
      setAvatarUrl(imgUrl);
      setAvatarFile(e.target.files[0]);
    }
  }

  async function handleSignup() {
    if (password !== confirm) {
      setErr({ path: "confirm", msg: "confirm your password" });
      return;
    }
    setErr({ path: "", msg: "" });
    const { value, error } = validateSignup({ email, password, username });
    if (error) {
      setErr({
        path: error.details[0].path[0].toString(),
        msg: error.details[0].message,
      });
      return;
    }
    setLoading(true);
    try {
      const data = await signup({ ...value, avatarFile });
      putUser(data);
      navigate("/chat");
      showToast({ type: "success", msg: "signup success" });
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
          Signup
        </Typography>
        <DialogContent>
          <Stack alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Avatar sx={{ width: 80, height: 80 }} src={avatarUrl} />
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="avatar"
              type="file"
              onChange={handleAvatar}
            />
            <label htmlFor="avatar">
              <Button
                variant="contained"
                component="span"
                endIcon={<FileUploadIcon />}
              >
                Upload
              </Button>
            </label>
          </Stack>
          <TextField
            fullWidth
            placeholder="John Doe"
            label="username"
            margin="dense"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            helperText={err.path === "username" ? err.msg : ""}
            error={err.path === "username"}
          />
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
          <TextField
            fullWidth
            type="password"
            label="confirm password"
            margin="dense"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            helperText={err.path === "confirm" ? err.msg : ""}
            error={err.path === "confirm"}
          />
        </DialogContent>
        <DialogActions>
          <Link onClick={() => navigate("/login")} sx={{ mr: 2 }}>
            Already have an account?
          </Link>
          <Button
            disabled={loading}
            endIcon={
              loading ? <CircularProgress color="inherit" size={20} /> : null
            }
            type="submit"
            variant="contained"
            onClick={handleSignup}
          >
            Signup
          </Button>
        </DialogActions>
      </Paper>
    </Stack>
  );
};
