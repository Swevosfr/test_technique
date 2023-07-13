import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import { navbarStyles } from "./styles";
import { userNavbarItems } from "./const/userNavbarItems";

export default function UserNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprime le token du localstorage
    localStorage.removeItem("token");
    // Redirige vers la page de login
    navigate("/login");
  };

  return (
    <Drawer sx={navbarStyles.drawer} variant="permanent" anchor="left">
      <Toolbar />
      <Divider />
      <List>
        {userNavbarItems.map((item, index) => (
          <ListItem button key={item.id} onClick={() => navigate(item.route)}>
            <ListItemIcon sx={navbarStyles.icons}>{item.icon}</ListItemIcon>
            <ListItemText sx={navbarStyles.text} primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <div style={{ flexGrow: 1 }} />{" "}
      {/* This empty div will push the button to the bottom */}
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon sx={navbarStyles.icons}>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText sx={navbarStyles.text} primary="Se déconnecter" />
        </ListItem>
      </List>
    </Drawer>
  );
}
