import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Error from "../../utils/Error";
import UserLayout from "./UserLayout";

export default function UserRoute() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}
