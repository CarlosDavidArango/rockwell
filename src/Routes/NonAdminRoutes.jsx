import React from "react";
import { Route, Routes } from "react-router-dom";
import EmployeeList from "../pages/EmployeeList";
import EmployeeForm from "../pages/EmployeeForm";

export default function NonAdminRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<EmployeeList role={'employee'}/>} />
                <Route path="/view/:id" element={<EmployeeForm isView={true}/>}/>
                <Route path="/*" element={<EmployeeList/>} />
            </Routes>
        </div>
    );
}