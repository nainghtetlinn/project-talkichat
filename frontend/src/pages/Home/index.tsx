import { Grid, Stack, Box, Typography, Button } from "@mui/material";
import chatting from "../../assets/undraw_chatting.svg";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Grid container sx={{ height: "100%", overflow: "hidden", px: 3 }}>
      <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ height: "100%", p: 2 }}
        >
          <Box sx={{ maxWidth: "400px" }}>
            <img
              src={chatting}
              alt="Chatting"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Box>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
        <Stack justifyContent="center" spacing={1} sx={{ height: "100%" }}>
          <Stack
            direction="row"
            alignItems="center"
            flexWrap="wrap"
            spacing={1}
          >
            <Typography variant="h5" fontWeight={300}>
              Stay connected with
            </Typography>
            <Typography variant="h4" color="primary.main">
              TalkiChat
            </Typography>
          </Stack>
          <Typography sx={{ width: { sm: "80%", md: "60%" } }}>
            The app that makes communication simple and efficient. With
            real-time messaging, you can stay connected with your family and
            friends.
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button
              variant="contained"
              onClick={() => navigate("/signup")}
              sx={{ textTransform: "capitalize" }}
            >
              Signup
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/login")}
              sx={{ textTransform: "capitalize" }}
            >
              Login
            </Button>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Home;
