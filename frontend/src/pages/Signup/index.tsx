import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  Paper,
  Stack,
  TextField,
  Checkbox,
  Avatar,
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
import { validateSignup } from "../../validators";
import { signup } from "../../services/user";
import { useUserContext } from "../../contexts/user";

const Signup = () => {
  const navigate = useNavigate();
  const { putUser } = useUserContext();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [user, setUser] = useState<{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    avatar: any;
  }>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  });
  const [err, setErr] = useState({
    path: "",
    msg: "",
  });

  function handleAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0] || null;
      const imgUrl = URL.createObjectURL(file);
      setAvatarUrl(imgUrl);
      setUser((prev) => ({ ...prev, avatar: file }));
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;
    setUser((prev) => ({ ...prev, [name]: value }));
  }

  function handleSignup() {
    setErr({ path: "", msg: "" });
    const { value, error } = validateSignup({
      username: user.username,
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
    if (user.password !== user.confirmPassword) {
      setErr({ path: "confirmPassword", msg: "confirm your password" });
      return;
    }
    setLoading(true);
    signup(user)
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
            TalkiChat - Signup
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Avatar sx={{ width: 80, height: 80 }} src={avatarUrl} />
            <FormControlLabel
              control={
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="avatar"
                  type="file"
                  onChange={handleAvatar}
                />
              }
              label={
                <Button
                  variant="contained"
                  component="span"
                  endIcon={<FileUploadIcon />}
                  sx={{ textTransform: "capitalize" }}
                >
                  Upload
                </Button>
              }
            />
          </Stack>
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
            type="text"
            placeholder="John Doe"
            label="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            helperText={err.path === "username" ? err.msg : ""}
            error={err.path === "username"}
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
          <TextField
            fullWidth
            margin="dense"
            type="password"
            label="confirm password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            helperText={err.path === "confirmPassword" ? err.msg : ""}
            error={err.path === "confirmPassword"}
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
            onClick={() => navigate("/login")}
            sx={{ mr: 2, cursor: "pointer" }}
          >
            Already have an account?
          </Link>
          <Button
            disabled={loading}
            onClick={handleSignup}
            variant="contained"
            endIcon={
              loading ? <CircularProgress size={20} color="inherit" /> : null
            }
            sx={{ textTransform: "capitalize" }}
          >
            Signup
          </Button>
        </DialogActions>
      </Paper>
    </Stack>
  );
};

export default Signup;
