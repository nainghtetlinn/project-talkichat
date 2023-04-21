import {
  Skeleton,
  Toolbar,
  Divider,
  Stack,
  CircularProgress,
} from "@mui/material";

export const LoadingChatRoom = () => {
  return (
    <Stack direction="column" sx={{ height: "100%", overflow: "hidden" }}>
      <Toolbar>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ width: "100%" }}
        >
          <Skeleton variant="circular" width={40} height={40} />
          <Stack sx={{ width: "80%" }}>
            <Skeleton variant="text" sx={{ width: "50%" }} />
            <Skeleton variant="text" sx={{ width: "20%" }} />
          </Stack>
        </Stack>
      </Toolbar>
      <Divider />
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%", height: "100%" }}
      >
        <CircularProgress color="primary" />
      </Stack>
    </Stack>
  );
};
