import {
  Skeleton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

export const LoadingChatsList = () => {
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Skeleton variant="circular" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton variant="text" sx={{ width: "50%" }} />}
          secondary={<Skeleton variant="text" />}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Skeleton variant="circular" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton variant="text" sx={{ width: "50%" }} />}
          secondary={<Skeleton variant="text" />}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Skeleton variant="circular" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton variant="text" sx={{ width: "50%" }} />}
          secondary={<Skeleton variant="text" />}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Skeleton variant="circular" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton variant="text" sx={{ width: "50%" }} />}
          secondary={<Skeleton variant="text" />}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Skeleton variant="circular" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton variant="text" sx={{ width: "50%" }} />}
          secondary={<Skeleton variant="text" />}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Skeleton variant="circular" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton variant="text" sx={{ width: "50%" }} />}
          secondary={<Skeleton variant="text" />}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Skeleton variant="circular" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton variant="text" sx={{ width: "50%" }} />}
          secondary={<Skeleton variant="text" />}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Skeleton variant="circular" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton variant="text" sx={{ width: "50%" }} />}
          secondary={<Skeleton variant="text" />}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Skeleton variant="circular" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton variant="text" sx={{ width: "50%" }} />}
          secondary={<Skeleton variant="text" />}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Skeleton variant="circular" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton variant="text" sx={{ width: "50%" }} />}
          secondary={<Skeleton variant="text" />}
        />
      </ListItem>
    </>
  );
};
