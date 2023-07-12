import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../../components/UserNavbar";
import Grid from "@mui/material/Grid";

export default function UserLayout() {
  return (
    <Grid container>
      <UserNavbar />
      <Outlet />
    </Grid>
  );
}
