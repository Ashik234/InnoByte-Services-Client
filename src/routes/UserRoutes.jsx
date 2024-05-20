import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
function UserRoutes() {
  return (
    <Routes>
      <Route exact path="/register" element={<Register />} />
    </Routes>
  )
}

export default UserRoutes