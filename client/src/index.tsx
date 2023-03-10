import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Tracts from "./Tracts/Tracts";
import TractDetail from "./Tracts/TractDetail";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: { default: "#E7EBF0" },
    primary: {
      main: "#3A3939",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/tracts" replace />,
    errorElement: <Navigate to="/tracts" replace />,
  },
  {
    path: "/tracts",
    element: <Tracts />,
  },
  {
    path: "/tracts/:id",
    element: <TractDetail />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "background.default",
          padding: "20px 40px",
          minHeight: "100vh",
        }}
      >
        <RouterProvider router={router} />
      </Box>
    </ThemeProvider>
  </React.StrictMode>
);
