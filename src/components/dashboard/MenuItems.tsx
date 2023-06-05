import React, { useState } from "react";
// Material List Components
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

// Material Icon Components
import LogoutIcon from "@mui/icons-material/Logout";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import { Link } from "@mui/material";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

export const MenuItems = () => (
  <React.Fragment>
    {/* Dashboard */}
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link href="/" color="inherit" underline="none">
        <ListItemText primary="Dashboard" />
      </Link>
    </ListItemButton>
    {!useSessionStorage("sessionToken") ? (
      <>
        <ListItemButton>
          <ListItemIcon>
            <SupervisorAccountIcon />
          </ListItemIcon>
          <Link href="/login" color="inherit" underline="none">
            <ListItemText primary="Login" />
          </Link>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <Link href="/register" color="inherit" underline="none">
            <ListItemText primary="Register" />
          </Link>
        </ListItemButton>
      </>
    ) : (
      <>
      {/*  */}
        <ListItemButton>
          <ListItemIcon>
            <SupervisorAccountIcon />
          </ListItemIcon>
          <Link href="/tasks" color="inherit" underline="none">
            <ListItemText primary="Tasks" />
          </Link>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <Link href="/logout" color="inherit" underline="none">
            <ListItemText primary="Logout" />
          </Link>
        </ListItemButton>
      </>
    )}
  </React.Fragment>
);
