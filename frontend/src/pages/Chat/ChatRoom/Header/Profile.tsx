import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  Typography,
  IconButton,
  Stack,
  Dialog,
  DialogContent,
} from "@mui/material";
import { UserType } from "../../../../@types";

type Props = { open: boolean; onClose: () => void; user: UserType };

export const Profile = ({ open, onClose, user }: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", top: 10, right: 10 }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ minWidth: 400 }}>
        <Stack alignItems="center" spacing={1}>
          <Avatar
            alt={user.username}
            src={user.avatar}
            sx={{ width: 120, height: 120 }}
          >
            {user.username[0]}
          </Avatar>

          <Typography variant="h5">{user.username}</Typography>
          <Typography variant="h6">{user.email}</Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
