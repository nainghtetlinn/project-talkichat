import CloseIcon from "@mui/icons-material/Close";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import EditIcon from "@mui/icons-material/Edit";
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
import { ChatType, UserType } from "../../../../../@types";
import { RenameGroupChat } from "./RenameGroupChat";
import { AddMembers } from "./AddMembers";
import { GroupUsersList } from "./GroupUsersList";

import { useState } from "react";
import { useUserContext } from "../../../../../contexts/user";

type Props = {
  open: boolean;
  onClose: () => void;
  chat: ChatType;
  users: UserType[];
};

export const GroupProfile = ({ open, onClose, chat, users }: Props) => {
  const { _id } = useUserContext();

  const [rename, setRename] = useState(false);
  const [add, setAdd] = useState(false);

  return (
    <>
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
          {chat.groupAdmin._id === _id ? (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-around"
            >
              <IconButton onClick={() => setRename(true)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => setAdd(true)}>
                <PersonAddAlt1Icon />
              </IconButton>
            </Stack>
          ) : null}
        </DialogTitle>
        <DialogContent sx={{ minWidth: 400 }}>
          <GroupUsersList users={chat.users} adminId={chat.groupAdmin._id} />
        </DialogContent>
      </Dialog>

      <RenameGroupChat
        open={rename}
        onClose={() => setRename(false)}
        groupName={chat.chatName}
      />

      <AddMembers open={add} onClose={() => setAdd(false)} />
    </>
  );
};
