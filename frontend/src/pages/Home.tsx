import chatting from "../assets/undraw_chatting.svg";
import { Grid, Box, Typography, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid
        item
        lg={6}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          pr: 2,
          display: { xs: "none", lg: "block" },
        }}
      >
        <img
          src={chatting}
          alt="Chatting"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Box>
          <Stack
            direction={{ lg: "row" }}
            alignItems={{ lg: "center" }}
            spacing={1}
            sx={{ mb: 1 }}
          >
            <Typography variant="h4" fontWeight={300}>
              Stay connected with
            </Typography>
            <Typography variant="h4">TalkiChat</Typography>
          </Stack>
          <Typography sx={{ width: { sm: "80%", md: "60%" } }}>
            The app that makes communication simple and efficient. With
            real-time messaging, you can stay connected with your family and
            friends.
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 4 }}>
            <Button variant="contained" onClick={() => navigate("/signup")}>
              Signup
            </Button>
            <Button variant="outlined" onClick={() => navigate("/login")}>
              Login
            </Button>
          </Stack>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: { lg: "none", xs: "flex" },
            justifyContent: { xs: "center", sm: "right" },
            pt: { xs: 4, md: 0 },
          }}
        >
          <img
            src={chatting}
            alt="Chatting"
            style={{
              width: "60%",
              maxWidth: "450px",
              objectFit: "contain",
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
