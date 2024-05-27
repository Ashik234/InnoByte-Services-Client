import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PublicRoutes from "./Protected/PublicRoutes";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import NotFoundPage from "../pages/NotFoundPage";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<NotFoundPage />} />
      <Route
        exact
        path="/register"
        element={
          <PublicRoutes>
            <Register />
          </PublicRoutes>
        }
      />
      <Route
        exact
        path="/login"
        element={
          <PublicRoutes>
            <Login />
          </PublicRoutes>
        }
      />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
      </Route>
    </Routes>
  );
}

export default UserRoutes;
