import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

export default function NonUserRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/signUp" element={<SignUp/>} />
                <Route path="/*" element={<Login/>} />
            </Routes>
        </div>
    );
}