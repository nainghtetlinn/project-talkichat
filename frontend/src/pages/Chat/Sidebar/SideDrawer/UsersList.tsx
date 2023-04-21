import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { UserType } from "../../../../@types";

type Props = { users: UserType[]; handleSelect: (user: UserType) => void };

export const UsersList = ({ users, handleSelect }: Props) => {
  return (
    <List>
      {users.map((user) => {
        return (
          <ListItem key={user._id}>
            <ListItemButton onClick={() => handleSelect(user)}>
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
