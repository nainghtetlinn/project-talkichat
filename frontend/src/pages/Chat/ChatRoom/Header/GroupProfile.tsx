import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  AvatarGroup,
  Typography,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { ChatType, UserType } from "../../../../@types";
import { GroupUsersList } from "./GroupUsersList";

type Props = {
  open: boolean;
  onClose: () => void;
  chat: ChatType;
  users: UserType[];
};

export const GroupProfile = ({ open, onClose, chat, users }: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", top: 10, right: 10 }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle>
        <Stack alignItems="center" spacing={1}>
          <AvatarGroup max={3}>
            {users.map((user) => {
              return (
                <Avatar key={user._id} alt={user.username} src={user.avatar}>
                  {user.username[0]}
                </Avatar>
              );
            })}
          </AvatarGroup>
          <Typography variant="h5">{chat.chatName}</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ minWidth: 400 }}>
        <GroupUsersList users={chat.users} admin={chat.groupAdmin._id} />
      </DialogContent>
    </Dialog>
  );
};
