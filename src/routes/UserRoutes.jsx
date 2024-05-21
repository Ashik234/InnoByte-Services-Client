import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PublicRoutes from "./Protected/PublicRoutes";

function UserRoutes() {
  return (
    <Routes>
       <Route exact path="/register" element={<PublicRoutes><Register /></PublicRoutes>} />
      <Route exact path="/login" element={<PublicRoutes><Login /></PublicRoutes>} />
    </Routes>
  )
}

export default UserRoutes