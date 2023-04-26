import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import {
  Avatar,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import { ActiveBadge } from "../../../../../components";
import { UserType } from "../../../../../@types";

import { AxiosError } from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { enqueueSnackbar } from "notistack";
import { useUserContext } from "../../../../../contexts/user";
import { removeMember } from "../../../../../services/chat";

type Props = { user: UserType; adminId: string };

export const UserItem = ({ user, adminId }: Props) => {
  const { token, _id: loggedUserId } = useUserContext();
  const { chatId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [remove, setRemove] = useState(false);
  const handleCloseRemove = () => {
    setRemove(false);
  };

  const { mutate } = useMutation(removeMember, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["chatId", chatId]);
      handleCloseRemove();
      if (data.users.length <= 1) {
        navigate("/chat");
        queryClient.invalidateQueries("my-chats-list");
      }
    },
    onError: (err: AxiosError) => {
      const res = err.response?.data as any;
      const msg = res.message || "Something went wrong";
      enqueueSnackbar(msg, { variant: "error" });
    },
  });

  const handleRemove = () => {
    if (!chatId || !token) return;
    mutate({ groupId: chatId, token, users: [user._id] });
  };

  return (
    <>
      {loggedUserId === adminId ? (
        <ListItem key={user._id}>
          <ListItemButton
            onClick={(e) => {
              if (adminId === user._id) return;
              setAnchorEl(e.currentTarget);
            }}
          >
            <ListItemAvatar>
              <ActiveBadge isActive={user.isActive}>
                <Avatar alt={user.username} src={user.avatar}>
                  {user.username[0]}
                </Avatar>
              </ActiveBadge>
            </ListItemAvatar>
            <ListItemText
              primary={`${user.username} ${
                user._id === adminId ? "(Admin)" : ""
              }`}
              secondary={user.email}
            />
          </ListItemButton>
        </ListItem>
      ) : (
        <ListItem key={user._id}>
          <ListItemAvatar>
            <ActiveBadge isActive={user.isActive}>
              <Avatar alt={user.username} src={user.avatar}>
                {user.username[0]}
              </Avatar>
            </ActiveBadge>
          </ListItemAvatar>
          <ListItemText
            primary={`${user.username} ${
              user._id === adminId ? "(Admin)" : ""
            }`}
            secondary={user.email}
          />
        </ListItem>
      )}

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem
          onClick={() => {
            setRemove(true);
          }}
        >
          <ListItemIcon>
            <PersonRemoveAlt1Icon />
          </ListItemIcon>
          Remove
        </MenuItem>
      </Menu>
      <Dialog open={remove} onClose={handleCloseRemove}>
        <DialogTitle>Do you really want to remove?</DialogTitle>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseRemove}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleRemove}>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
