import React, { useEffect } from "react";
import { useState } from "react";
import { Select } from "@mui/material";
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';


//mapeo de las posibles areas de trabajo, en una app de verdad se traerian de la db

const areas =  [
    {"name": "kitchen", "jobs": ["chef", "sous chef", "line cook", "prep cook"]},
    {"name": "services", "jobs": ["waiter", "bartender", "host", "busser"]},
]

export default function CustomComboBox({label, value, onChange, nombreArea, disabled}) {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        setJobs(areas.find((a) => a.name == nombreArea).jobs);
    }, [nombreArea]);


    return (
        <>
            <FormLabel>{label}</FormLabel>
            <Select
                value={value}
                onChange={onChange}
                size="small"
                disabled={disabled}
            >
            { 
                jobs.map((job) => {
                    return (
                        <MenuItem key = {job} value={job}>{job}</MenuItem>
                    )
                })
            }
            </Select>
        </>
    );
}