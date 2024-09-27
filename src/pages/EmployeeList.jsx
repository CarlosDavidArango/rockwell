import { React, useEffect, useState } from "react";
import { list } from "../api/functions/list";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Stack } from "@mui/material";
import { Toaster, toast } from 'sonner';
import Link from '@mui/material/Link';
import { deleteData } from "../api/functions/delete";
import { logout } from "../api/functions/auth";

// Converts timestamp to date
const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString();
};

// Converts timestamp to age
const getAge = (timestamp) => {
  const today = new Date();
  const birthDate = new Date(timestamp * 1000);
  return today.getFullYear() - birthDate.getFullYear();
};

export default function EmployeeList({ role }) {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  //sorting
  const [orderDirection, setOrderDirection] = useState('asc');



  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await list('Employee');
        setEmployees(data);
        setFilteredEmployees(data);
      } catch (error) {
        toast.error("Error fetching employees");
      }
    };
    fetchData();
  }, []);



  //elimina empleado
  const handleDelete = async (id) => {
    if (role !== 'admin') {
      toast.error("You are not authorized to delete employees");
      return;
    }
    try {
      const response = await deleteData('Employee', id);
      toast.success(response);
      setEmployees(employees.filter((employee) => employee.id !== id));
      setFilteredEmployees(filteredEmployees.filter((employee) => employee.id !== id));
    } catch (error) {
      toast.error("Error deleting employee");
    }
  };


  //gestiona filtro
  const handleSearchChange = (event, value) => {

    const search = value ? value.toLowerCase() : '';
    setFilteredEmployees(
      employees.filter((employee) => employee.Name.toLowerCase().includes(search))
    );
  };

  //logout
  const handleLogout = async () => {
    try {
      const response = await logout();
      toast.success(response);
      window.location.reload();
    } catch (error) {
      toast.error("Error logging out");
    }
  }
 //SORT POR HIRE dATE
  const handleSort= () => {
    const isAsc = orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
  
    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
      let dateA = new Date(a["HireDate"].seconds * 1000);
      let dateB = new Date(b["HireDate"].seconds * 1000);
      return isAsc ? dateA - dateB : dateB - dateA;
    });
    setFilteredEmployees(sortedEmployees);
  };
  

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: '#2C3E50' }}>
        <Toolbar sx={{ padding: 2 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#ECF0F1' }}>
            Employee Management
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid>
              { role !== 'admin' ? null :
                 <Link href="/create" style={{ textDecoration: 'none' }}>
                 <Button variant="contained" sx={{ borderRadius: 2, backgroundColor: '#3498DB', color: '#FFF' }}>
                   Create Employee
                 </Button>
               </Link>
              }
            </Grid>
            <Grid >
              <Autocomplete
                freeSolo
                options={employees.map((option) => option.Name)}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    label="Search" 
                    variant="outlined" 
                    sx={{ backgroundColor: '#FFF' }}
                  />
                )}
                onChange={handleSearchChange}
              />
            </Grid>
            <Grid >
              <Button 
                variant="outlined" 
                sx={{ borderRadius: 20, color: '#FFF', borderColor: '#FFF' }} 
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toaster />
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#34495E' }}>
            <TableRow>
              <TableCell sx={{ color: '#ECF0F1' }}>Name</TableCell>
              <TableCell align="right" sx={{ color: '#ECF0F1' }}>Age</TableCell>
              <TableCell align="right" sx={{ color: '#ECF0F1' }}>User Name</TableCell>
              <TableCell
                align="right"
                sx={{ color: '#ECF0F1', cursor: 'pointer' }}
                onClick={() => handleSort()}
              >
                Hire Date
              </TableCell>
              <TableCell align="center" sx={{ color: '#ECF0F1', width: '10%' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id} sx={{ '&:hover': { backgroundColor: '#BDC3C7' } }}>
                <TableCell align="left">{employee.Name}</TableCell>
                <TableCell align="right">{getAge(employee.Dob.seconds)}</TableCell>
                <TableCell align="right">{employee.UserName}</TableCell>
                <TableCell align="right">{formatDate(employee.HireDate.seconds)}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={2}>
                    { role !== 'admin' ? null :
                      <Button variant="outlined" color="error" onClick={() => handleDelete(employee.id)}>
                       Delete
                      </Button>
                    }
                    { role !== 'admin' ? null :
                      <Button variant="outlined" color="success">
                        <Link href={`/edit/${employee.id}`} style={{ textDecoration: 'none' }}>Edit</Link>
                      </Button>
                    }
                    <Button variant="outlined" color="secondary">
                      <Link href={`/view/${employee.id}`} style={{ textDecoration: 'none' }}>View</Link>
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
