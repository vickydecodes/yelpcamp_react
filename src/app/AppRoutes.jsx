import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';


export default function AppRoutes() {
  return (
    <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
    </Routes>
  )
}
