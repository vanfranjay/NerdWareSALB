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
import { Link, NavLink } from 'react-router-dom';
import '../css/usuario.css';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import GroupsIcon from '@mui/icons-material/Groups';

export const mainListItems = (

  <React.Fragment>
    <div className='cuadroOpciones'>
      <div className='menuOpcionesUsuario'>
        <NavLink to="registrar-voucher" className='nombreMenuOpciones'>
          <div className='contenedorIcono'>
            <AppRegistrationIcon className='colorIcono' />
          </div>
          <div className='nombreOpcionesMenu'>
            Registrar Voucher
          </div>
        </NavLink>
      </div>
      <div className='menuOpcionesUsuario'>
        <NavLink to="registrar-equipo" className='nombreMenuOpciones'>
          <div className='contenedorIcono'>
            <SportsBasketballIcon className='colorIcono' />
          </div>
          <div className='nombreOpcionesMenu'>
            Registrar Equipo
          </div>
        </NavLink>
      </div>
      <div className='menuOpcionesUsuario'>
        <NavLink to="registrar-jugador" className='nombreMenuOpciones'>
          <div className='contenedorIcono'>
            <GroupsIcon className='colorIcono' />
          </div>
          <div className='nombreOpcionesMenu'>
            Registrar Jugador
          </div>
        </NavLink>
      </div>
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