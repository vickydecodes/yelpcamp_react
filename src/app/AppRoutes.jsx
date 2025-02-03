import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import { AuthProvider } from "../contexts/AuthContext";
import { ApiProvider } from "../contexts/ApiContext";
import Campground from "../pages/Campground/Campground";
import Main from "../pages/Main/Main";
import Camping from "../pages/Campings/Camping";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <ApiProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/campgrounds' element={<Main/>}/>
          <Route path='/campings' element={<Camping/>}/>
          <Route path='/campgrounds/:id' element={<Main/>}/>
        </Routes>
      </ApiProvider>
    </AuthProvider>
  );
}
