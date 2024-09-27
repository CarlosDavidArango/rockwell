import React, { useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
//importaciones de api
import {get} from "../api/functions/get";
import {update} from "../api/functions/update";
import { create } from "../api/functions/create";
//importaciones de UI
import { Select } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/system';
//importacion combobox trabajos
import CustomComboBox from "../components/customComboBox";
//importa sonner, libreria de toast
import { Toaster, toast } from 'sonner'
//importa modal para confirmar en caso de que el formulario este sucio
import ModalConfirm from "../components/modalConfirm";
import { Api } from "@mui/icons-material";


const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

//convierte timestamp a fecha
const toDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
//convierte fecha a timestamp
const toTimestamp = (date) => {
  return date.getTime() / 1000;

}
//convierte timestamp a edad
const getAge = (timestamp) => {
  const today = new Date();
  const birthDate = new Date(timestamp * 1000)
  let age = today.getFullYear() - birthDate.getFullYear();
  return age;
}

export default function EmployeeForm({isView}) {
  const { id } = useParams()
  const [employee, setEmployee] = useState({ Dob: { seconds: 0}, Area: '', Name: '', JobTitle : '', Country: '', TipRate: 0, HireDate: { seconds: 0 }, Status: true, UserName: '' });
  const [countryNames, setCountryNames] = useState([{ name: "United States" }, { name: "Canada" }]);
  const [isConfirmEnabled, setIsConfirmEnabled] = useState(false);
  const [initialEmployee, setInitialEmployee] = useState({});
  const [isOpen, setIsOpen] = useState(false);


  //para navegar a la pagina de empleados
  const navigate = useNavigate();
  
  //busca si el tipRate esta deshabilitado

  const isTipRateDisabled =  ['waiter', 'dinning room manager'].includes(employee.JobTitle) ? false : true;
  
  
  //obtiene el empleado por id si no hay deja formulario vacio, llena el empleado inicial para evaluar si hayu cambios
  useEffect(() => {
    const getEmployee = async () => {
      const data = await get('Employee', id);
      if (data === "No such document!") {
        toast.error(data);
        setInitialEmployee({ Dob: { seconds: 0}, Area: '', Name: '', JobTitle : '', Country: '', TipRate: 0, HireDate: { seconds: 0 }, Status: true, UserName: '' })
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }else {
        if (data == undefined) {
          setInitialEmployee({ Dob: { seconds: 0}, Area: '', Name: '', JobTitle : '', Country: '', TipRate: 0, HireDate: { seconds: 0 }, Status: true, UserName: '' })
          setIsConfirmEnabled(false);

        }else {
          setEmployee(data);
          setInitialEmployee(data);
          setIsConfirmEnabled(true);
        }
        
      }

    }
    getEmployee();

  }, [id]);

  //obtiene los nombres de los paises
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://api.countrylayer.com/v2/all?access_key=4c54a5d5b613129d00c8d71180b9b2f') //falta e
        const data = await response.json();
        if (data.error) {
          console.log("Error fetching countries")
        } else {
          setCountryNames(data);
        }
      } catch (error) {
        console.error("Error fetching countries: ", error);
      }

    }
    fetchCountries();
  }, []);

  //valida si es valido el empleado cada que cambia
  useEffect(() => {
    isValid(employee);
  }, [employee]);

  //crear empleado
  const createEmployee = async (employee) => {
    const response = await create('Employee', employee);
    if (response === "Document written") {
      toast.success("Employee created");
      navigate('/');
    } else {
      toast.error("Error creating employee");
    }
  }

  //actualizar empleado
  const updateEmployee = async (employee) => {
    const response = await update('Employee', id, employee);
    if (response === "Document successfully updated!") {
      toast.success("Employee updated");
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      toast.error("Error updating employee");
    }
  }

  //envio de formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id) {
      createEmployee(employee);
    } else {
      updateEmployee(employee);
    }
  }
  //maneja el cambio de area
  const handleAreaChange = (event) => {
    setEmployee({...employee, Area: event.target.value, JobTitle: ''});

  };

  //maneja el cambio de nombre
  const handlenameChange = (event) => {
    setEmployee({...employee, Name: event.target.value});
  };

  //maneja el cambio trabajo
  const handleJobChange = (event) => {
    setEmployee({...employee, JobTitle: event.target.value});
  };

  //maneja el cambio de pais
  const handleCountryChange = (event) => {
    setEmployee({...employee, Country: event.target.value});
  };

  //maneja el cambio de tipRate
  const handleTipRateChange = (event) => {
    setEmployee({...employee, TipRate: event.target.value});
  };
  //maneja el cambio de status
  const handleStatusChange = (event) => {
    setEmployee({...employee, Status: event.target.checked});
  }

  //maneja cambio de nombre de usuario
  const handleUserNameameChange = (event) => { 
    setEmployee({...employee, UserName: event.target.value});
  }

  //maneja cambio de fecha de nacimiento
  const handleDobChange = (event) => {
    setEmployee({...employee, Dob: {seconds: toTimestamp(new Date(event.target.value))} })
  }

  //valida que todos los valores sean validos y habilita el boton de confirmar
  const isValid = (employee) => {
    let isValid = true;
    if (/[^a-zA-Z0-9\s]/.test(employee.Name)) {
      isValid = false;
      toast.error('Name must not have any special characters');
    }
    if (getAge(employee.Dob.seconds) < 18) {
      isValid = false;
      toast.error('Employee must be at least 18 years old');
    }
    if (employee.TipRate < 0.000000001 || employee.TipRate > 100) {
      isValid = false;
      toast.error('Tip Rate must be between 0 and 100');
    }

    if (employee.UserName === '' || employee.Name === '' || employee.Dob.seconds === 0 || employee.Area === '' || employee.JobTitle === '' || employee.Country === '' || employee.TipRate === 0 || employee.HireDate.seconds === 0) {
      isValid = false;
      toast.error('All fields are required');
    } 

    if (isValid) {
      setIsConfirmEnabled(true);
    } else {
      setIsConfirmEnabled(false);
    }
  }

  const handleCancel = (event) => {
    setIsOpen(false);
    navigate('/');
  }

  const handleOpen = () => {
    if (employee !== initialEmployee) {
      setIsOpen(true);
    } else {
      navigate('/');
    }
  };


  return (
    <>
      <Box component="form" onSubmit={handleSubmit}  sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: "#BCCCDC"}}>
          <Grid container spacing={3} sx={{
              width: '50%', 
              backgroundColor: '#E2E8F0', 
              padding: '20px', 
              borderRadius: '8px', 
            }}>
            <FormGrid size={{ xs: 12 }}>
              <FormLabel htmlFor="Name" required>
                Name
              </FormLabel>
              <OutlinedInput
                id="fullName"
                name="Name"
                type="name"
                placeholder="John jones"
                required
                size="small"
                onChange={handlenameChange}
                value={employee.Name}
                disabled={isView}
              />
            </FormGrid>
            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel htmlFor="Area" required >
                Area
              </FormLabel>
              <Select
                size="small"
                labelId="area"
                id="area"
                value={employee.Area}  
                label="Area"
                onChange={handleAreaChange}
                disabled={isView}
              >
                <MenuItem value={'services'}>Services</MenuItem>
                <MenuItem value={'kitchen'}>kitchen</MenuItem>
              </Select>
            </FormGrid>
            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel htmlFor="Dob" required >
                Date of Birth
              </FormLabel>
              <OutlinedInput
                id="dob"
                name="adob"
                type="date"
                required
                size="small"
                value={toDate(employee.Dob.seconds)}
                onChange={handleDobChange}
                disabled={isView}
              />  
            </FormGrid>
            <FormGrid size={{ xs: 12, md: 6 }}>
              <CustomComboBox nombreArea={employee.Area ? employee.Area :"kitchen" } label={"Job Title"} value={employee.JobTitle} onChange={handleJobChange} disabled={isView}/>
            </FormGrid>
            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel htmlFor="UserName" required>
                User Name
              </FormLabel>
              <OutlinedInput
                id="username"
                name="UserName"
                type="name"
                placeholder="John jones 3"
                required
                size="small"
                onChange={handleUserNameameChange}
                value={employee.UserName}
                disabled={isView}
              />
            </FormGrid>
            <FormGrid size={{ xs: 6 }}>
              <FormLabel htmlFor="country" required>
                Country
              </FormLabel>
              <Select
                size="small"
                labelId="country"
                id="country"
                value={employee.Country}  
                label="Area"
                onChange={handleCountryChange}
                disabled={isView}
              >
               {countryNames.map((country) => { 
                return(<MenuItem key = {country.name} value={country.name}>{country.name}</MenuItem>)
               })}
              </Select>
            </FormGrid>
            <FormGrid size={{ xs: 6 }}>
              <FormLabel htmlFor="tipRate" required>
                Tip Rate
              </FormLabel>
              <OutlinedInput
                id="TipRate"
                name="TipRate"
                type="number"
                required
                size="small"
                value={employee.TipRate}
                onChange={handleTipRateChange}  
                disabled={isTipRateDisabled || isView}
              />
            </FormGrid>
            <FormGrid size={{ xs: 6 }}>
              <FormLabel htmlFor="hireDate" required>
                Hire Date
              </FormLabel>
              <OutlinedInput
                id="hireDate"
                name="hireDate"
                type="date"
                required
                size="small"
                value={toDate(employee.HireDate.seconds)}
                onChange={(e) => setEmployee({...employee, HireDate: {seconds: toTimestamp(new Date(e.target.value))} })}
                disabled={isView}
              />  
            </FormGrid>
            <FormGrid size={{ xs: 6 }}>
              <FormLabel htmlFor="country" required>
                Status
              </FormLabel>
              <Switch  checked={employee.Status} onChange={handleStatusChange} disabled={isView}/>
              
            </FormGrid>
            <Button
              disabled={!isConfirmEnabled || isView}
              type="submit"
              variant="contained"
            >
              Confirmar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleOpen}
            >
              {isView? "Regresar" : "Cancelar"}
            </Button>
          </Grid>
      </Box>
      <ModalConfirm isOpen={isOpen} setIsOpen={setIsOpen} handleReturn={handleCancel}/>
      <Toaster />
    </>
  );
}