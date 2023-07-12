import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Navbar() {
  return (
    <Toolbar sx={{ flexWrap: "wrap" }}>
      <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
        Les Bons Artisans
      </Typography>
      <Button href="/login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
        Se connecter
      </Button>
      <Button href="/register" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
        S'inscrire
      </Button>
    </Toolbar>
  );
}
