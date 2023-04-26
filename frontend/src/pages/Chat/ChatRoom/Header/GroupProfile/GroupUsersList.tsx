import { List } from "@mui/material";
import { UserItem } from "./UserItem";
import { UserType } from "../../../../../@types";

type Props = { users: UserType[]; adminId: string };

export const GroupUsersList = ({ users, adminId }: Props) => {
  return (
    <List>
      {users.map((user) => {
        return <UserItem key={user._id} user={user} adminId={adminId} />;
      })}
    </List>
  );
};
