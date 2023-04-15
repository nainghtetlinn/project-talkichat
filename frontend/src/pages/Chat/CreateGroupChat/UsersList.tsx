import {
  List,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Avatar,
} from "@mui/material";

type Props = {
  users: any[];
  handleSelect: (user: any) => void;
};

export const UsersList = ({ users, handleSelect }: Props) => {
  return (
    <List>
      {users.map((user) => {
        const { _id, username, email, avatar } = user;
        return (
          <ListItemButton key={_id} onClick={() => handleSelect(user)}>
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
