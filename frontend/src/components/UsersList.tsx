import {
  List,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Avatar,
} from "@mui/material";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useToastContext } from "../contexts/toast";
import { useUserContext } from "../contexts/user";
import { accessChat } from "../services/chat";

type UserType = {
  _id: string;
  username: string;
  email: string;
  avatar: string;
};
type Props = { users: UserType[]; onClose: () => void };

export const UsersList = ({ users, onClose }: Props) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useToastContext();
  const { token } = useUserContext();

  async function handleClick(id: string) {
    try {
      const data = await accessChat({ userId: id, token });
      navigate(`/chat/${data._id}`);
      onClose();
      queryClient.invalidateQueries("chats-list");
    } catch (error: any) {
      showToast({ type: "error", msg: error.message });
    }
  }

  return (
    <List>
      {users.map((user) => {
        const { _id, username, email, avatar } = user;
        return (
          <ListItemButton key={_id} onClick={() => handleClick(_id)}>
            <ListItemAvatar>
              <Avatar alt={username} src={avatar} />
            </ListItemAvatar>
            <ListItemText primary={username} secondary={email} />
          </ListItemButton>
        );
      })}
    </List>
  );
};
