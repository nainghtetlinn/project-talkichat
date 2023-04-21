import EditIcon from "@mui/icons-material/Edit";
import {
  Stack,
  Box,
  Avatar,
  TextField,
  FormControlLabel,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useUserContext } from "../../../../contexts/user";
import { updateUser } from "../../../../services/user";

type Props = { open: boolean; onClose: () => void };

export const Profile = ({ open, onClose }: Props) => {
  const { avatar, username, email, token, putUser } = useUserContext();
  const [updateable, setUpdateable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>(username);
  const [newAvatarUrl, setNewAvatarUrl] = useState<string>(avatar || "");
  const [newAvatarFile, setNewAvatarFile] = useState<any>(null);

  function handleClose() {
    setNewAvatarUrl(avatar || "");
    setName(username);
    setNewAvatarFile(null);
    setUpdateable(false);
    onClose();
  }

  function handleAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0] || null;
      const imgUrl = URL.createObjectURL(file);
      setNewAvatarUrl(imgUrl);
      setNewAvatarFile(file);
      setUpdateable(true);
    }
  }

  function handleUpdate() {
    if (!updateable) return;
    setLoading(true);
    updateUser({ token, avatarFile: newAvatarFile, username: name })
      .then((data) => {
        putUser(data);
        setLoading(false);
        setNewAvatarUrl(data.avatar || "");
        setName(data.username);
        setNewAvatarFile(null);
        setUpdateable(false);
        onClose();
      })
      .catch((err: AxiosError) => {
        const res = err.response?.data as any;
        const msg = res.message || "Something went wrong";
        enqueueSnackbar(msg, { variant: "error" });
        setLoading(false);
      });
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogContent>
        <Stack direction="row" spacing={2}>
          <Stack alignItems="center" spacing={1}>
            <Avatar
              alt={username}
              src={newAvatarUrl}
              sx={{ width: 120, height: 120 }}
            >
              {username[0]}
            </Avatar>

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
                  component="span"
                  endIcon={<EditIcon />}
                  sx={{ textTransform: "capitalize" }}
                >
                  Upload
                </Button>
              }
            />
          </Stack>
          <Box>
            <TextField
              fullWidth
              margin="dense"
              type="text"
              label="username"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setUpdateable(true);
              }}
            />
            <TextField
              fullWidth
              margin="dense"
              type="text"
              value={email}
              label="email"
              disabled
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          sx={{ textTransform: "capitalize" }}
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          variant="contained"
          disabled={!updateable || loading}
          sx={{ textTransform: "capitalize" }}
          endIcon={
            loading ? <CircularProgress size={20} color="inherit" /> : null
          }
          onClick={handleUpdate}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};
