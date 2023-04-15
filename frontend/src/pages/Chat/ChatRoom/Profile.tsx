import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  IconButton,
  Avatar,
  Typography,
  Stack,
} from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  username: string;
  email: string;
  avatar?: string;
};

export const Profile = ({ open, onClose, username, email, avatar }: Props) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Stack direction="row" alignItems="center" spacing={3}>
          <Avatar
            alt={username}
            src={avatar}
            sx={{ width: 120, height: 120 }}
          />
          <Stack>
            <Typography variant="h5">{username}</Typography>
            <Typography variant="subtitle1">{email}</Typography>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
