import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { UserType } from "../../../../@types";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../../contexts/user";
import { accessChat } from "../../../../services/chat";

type Props = { users: UserType[]; onClose: () => void };

export const UsersList = ({ users, onClose }: Props) => {
  const navigate = useNavigate();
  const { token } = useUserContext();

  function handleAccessChat(id: string) {
    accessChat({ token, userId: id }).then((data) => {
      navigate("/chat/" + data._id);
      onClose();
    });
  }

  return (
    <List>
      {users.map((user) => {
        return (
          <ListItem key={user._id}>
            <ListItemButton onClick={() => handleAccessChat(user._id)}>
              <ListItemAvatar>
                <Avatar alt={user.username} src={user.avatar}>
                  {user.username[0]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.username} secondary={user.email} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
