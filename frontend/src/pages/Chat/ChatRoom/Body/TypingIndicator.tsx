import { Avatar, AvatarGroup, Stack, Skeleton } from "@mui/material";

type Props = { users: { avatar: string; _id: string }[] };

export const TypingIndicator = ({ users }: Props) => {
  if (users.length === 0) return null;
  return (
    <Stack direction="row" justifyContent="left" spacing={1}>
      <AvatarGroup max={3} spacing="small">
        {users.map((user) => {
          return (
            <Avatar
              key={user._id}
              src={user.avatar}
              sx={{ width: 25, height: 25 }}
            />
          );
        })}
      </AvatarGroup>
      <Stack
        direction="row"
        alignItems="center"
        spacing={0.5}
        sx={{ bgcolor: "#f5f5f5", borderRadius: 100, px: 1 }}
      >
        <Skeleton variant="circular" width={12} height={12} />
        <Skeleton variant="circular" width={12} height={12} />
        <Skeleton variant="circular" width={12} height={12} />
      </Stack>
    </Stack>
  );
};
