import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContextProvider } from "./contexts/toast";
import { UserContextProvider } from "./contexts/user";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    <CssBaseline />
    <QueryClientProvider client={client}>
      <ToastContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </ToastContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
