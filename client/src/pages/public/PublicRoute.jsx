import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Login from "./login/Login";
import Register from "./register/Register";
import Error from "../../utils/Error";

export default function PublicRoute() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}
