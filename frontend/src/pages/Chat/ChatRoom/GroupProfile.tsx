import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  IconButton,
  Avatar,
  Typography,
  Stack,
  List,
  ListItemAvatar,
  ListItemText,
  ListItem,
} from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  chatName: string;
  users: any[];
};

export const GroupProfile = ({ open, onClose, chatName, users }: Props) => {
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
          <Avatar alt={chatName} sx={{ width: 120, height: 120 }}>
            {chatName[0]}
          </Avatar>
          <Stack>
            <Typography variant="h5">{chatName}</Typography>
            <Typography variant="subtitle1">{users.length} members</Typography>
          </Stack>
        </Stack>
        <List>
          {users.map((user) => {
            const { _id, username, avatar } = user;
            return (
              <ListItem key={_id}>
                <ListItemAvatar>
                  <Avatar alt={username} src={avatar} />
                </ListItemAvatar>
                <ListItemText primary={username} />
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
    </Dialog>
  );
};
