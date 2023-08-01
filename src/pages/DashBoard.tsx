import { useState } from "react";

import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Button } from "@mui/material";

import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";

import Link from "@mui/material/Link";
import DrawerBar from "../components/nav-bar/DrawerBar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setState } from "../redux/state";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(setState({ state: "Dashboard" }));
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <DrawerBar />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container
            maxWidth="xl"
            sx={{ mt: 4, mb: 4, display: "flex", flexDirection: "column" }}
          >
            <div style={{ alignSelf: "flex-end", height:1000 }}>
              <Button
                sx={{ height: 50, fontSize: 16 }}
                variant="contained"
                onClick={() => {navigate("AddProduct"); dispatch(setState({ state: "Product" }));}}
              >
                Add new Product
              </Button>
            </div>

            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
