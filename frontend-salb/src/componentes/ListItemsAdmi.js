import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {Link, NavLink} from 'react-router-dom';
import '../css/usuario.css';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PersonOffIcon from '@mui/icons-material/PersonOff';

export const mainListItemsAdmi = (

  <React.Fragment>
    <div className='cuadroOpciones'>
      
        <NavLink to="solicitante" className='nombreMenuOpciones'>
          <div className='contenedorIcono'>
            <FactCheckIcon className='colorIcono' />
          </div>
          <div className='nombreOpcionesMenu'>
            Solicitantes de preinscripción
          </div>
        </NavLink>
      
      
        <NavLink to="rechazado" className='nombreMenuOpciones'>
            <div className='contenedorIcono'>
              <PersonOffIcon className='colorIcono' />
            </div>
            <div className='nombreOpcionesMenu'>
              Rechazados
            </div>
        </NavLink>
      
    </div>
    {/**
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>
*/}
  </React.Fragment>
);

{/**
export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset className='fondoBarraLateralUser'>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
); 
*/}