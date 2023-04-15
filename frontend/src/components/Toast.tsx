import { Alert, Snackbar, Slide } from "@mui/material";
import { useToastContext } from "../contexts/toast";

export const Toast = () => {
  const { msg, show, type, hideToast } = useToastContext();

  function handleHide(event?: React.SyntheticEvent | Event, reason?: string) {
    if (reason === "clickaway") {
      return;
    }
    hideToast();
  }

  return (
    <Snackbar
      open={show}
      autoHideDuration={3000}
      onClose={handleHide}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Slide direction="up" in={show}>
        <Alert
          variant="filled"
          severity={type}
          sx={{ textTransform: "capitalize" }}
        >
          {msg}
        </Alert>
      </Slide>
    </Snackbar>
  );
};
