import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SnackbarProvider } from "notistack";

import { UserContextProvider } from "./contexts/user";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    <CssBaseline />
    <QueryClientProvider client={client}>
      <UserContextProvider>
        <SnackbarProvider
          maxSnack={1}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <App />
        </SnackbarProvider>
      </UserContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
