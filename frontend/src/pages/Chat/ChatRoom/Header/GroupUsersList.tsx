import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { ActiveBadge } from "../../../../components";
import { UserType } from "../../../../@types";

type Props = { users: UserType[]; admin: string };

export const GroupUsersList = ({ users, admin }: Props) => {
  return (
    <List>
      {users.map((user) => {
        return (
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
                user._id === admin ? "(Admin)" : ""
              }`}
              secondary={user.email}
            />
          </ListItem>
        );
      })}
    </List>
  );
};
