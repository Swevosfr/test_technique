import React from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import PublicRoute from "../src/pages/public/PublicRoute";
import UserRoute from "../src/pages/user/UserRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<PublicRoute />} />
          <Route path="/user/*" element={<UserRoute />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
