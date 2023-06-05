import React, { useState } from "react";
// Theme personalization
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

// CSS & Drawer
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";

// Navbar
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

// Material Lists
import List from "@mui/material/List";

// Icons
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";

// Layout Box & Grid
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";

// List for the menu
import { MenuItems } from "./MenuItems";

import ImageList from "@mui/material/ImageList";
import { ImageListItem } from "@mui/material";
import { logoutSessionStorage } from "../../hooks/logoutSessionStorage";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import { useNavigate } from "react-router-dom";

// Width for Drawer Menu
const drawerWidth: number = 240;

// Props form AppBar
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// Drawer Menu
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create(["width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create(["width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      // Breakpoints to Media Queries of CSS in different display sizes
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// Define Theme
const myTheme = createTheme();

// Dashboard content
export const Dashboard = () => {
  let navigate = useNavigate();
  const loggedIn = useSessionStorage("sessionToken");
  React.useEffect(() => {
    if (loggedIn) return navigate("/");
  }, loggedIn)

  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = (event: any) => {
    event.preventDefault();
    logoutSessionStorage()
  }
  return (
    <ThemeProvider theme={myTheme}>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <CssBaseline />
        {/* AppBar */}
        <AppBar position="absolute" open={open}>
          {/* Toolbar -> Actions */}
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            {/* Icon to toggle drawer */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && {
                  display: "none",
                }),
              }}
            >
              <MenuIcon />
            </IconButton>
            {/* Title of App */}
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{
                flexGrow: 1,
              }}
            >
              Todo APP
            </Typography>
            {/*  ICON to show notifications */}
            <IconButton color="inherit">
              <Badge badgeContent={10} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            {/* ICON to logout */}
            <IconButton color="inherit">
              <LogoutIcon onClick={handleLogout}/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            {/* ICON to ChevronLeftIcon */}
            <IconButton color="inherit" onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          {/* List of menu */}
          <List component="nav">{MenuItems()}</List>
        </Drawer>
        {/* Dashboard Content */}
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
          {/* Toolbar */}
          <Toolbar />
          {/* Container with the content */}
          <Container
            maxWidth="lg"
            sx={{
              mt: 4,
              mg: 4,
            }}
          >
            <Grid item xs={12} md={8} lg={9}>
              {/* <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >To-do App Page</Paper> */}
              <ImageList sx={{ with: "auto", height: "720" }} cols={1}>
                <ImageListItem>
                  <img
                    src={"https://wallpaperset.com/w/full/1/a/b/53321.jpg"}
                    loading="lazy"
                    alt="Welcome to mid game in life this year"
                  />
                </ImageListItem>
              </ImageList>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
