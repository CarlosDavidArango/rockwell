import React from "react";
import { Route, Routes } from "react-router-dom";
import EmployeeList from "../pages/EmployeeList";
import EmployeeForm from "../pages/EmployeeForm";

export default function AdminRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<EmployeeList role={'admin'}/>} />
                <Route path="/view/:id" element={<EmployeeForm isView={true}/>}/>
                <Route path="/edit/:id" element={<EmployeeForm isView={false}/>}/>
                <Route path="/create" element={<EmployeeForm isView={false}/>}/>
                <Route path="/*" element={<EmployeeList role={'admin'}/>} />
            </Routes>
        </div>
    );
}