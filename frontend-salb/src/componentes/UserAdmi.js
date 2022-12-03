import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import '../css/usuario.css';
import { mainListItemsAdmi } from './ListItemsAdmi';
import logo from '../imagenes/user1.png';
import RegistrarVoucher from './RegistrarVoucher';
import { Routes, Route, Navigate, useParams, NavLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import RegistrarEquipo from './RegistrarEquipo';
import SolicitudDelegados from './SolicitudDelegados';
import SolicitudesRechazadas from './SolicitudesRechazadas';
import ListaSolicitantes from './ListaSolicitantes';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LabTabs from './tabSeccionSolicitudes';
import RegistrarTorneo from './RegistrarTorneo';
import TabRegistrarTorneo from './TabRegistrarTorneo';
import RegistrarPartido from './RegistrarPartido';

const ocultar = document.getElementById('imgUser');
const text = document.getElementById('imgUser');

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const opens = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" className='fondoBarraLateralUser' open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            {/** Boton del icono */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon className='iconoMenu' />
            </IconButton >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {/*<label className='nombreUserDelegado'>Fulano Fulanes</label>*/}
              {/*Dashboard Titulo de la Página */}
            </Typography>
            {/* Icono de la campana */}
            {/*<IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>*/}
            <div className='avatarUser'>
              <Avatar
                className='avatarFotoUsuario'
                alt="Cindy Baker" src=""
                id="basic-button"
                aria-controls={opens ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={opens ? 'true' : undefined}
                onClick={handleClick}>
                <img id='imgUser' className="imagenUser" src={logo} alt="Foto Perfil" />
              </Avatar>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={opens}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {/*<MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>*/}
                <MenuItem onClick={handleClose} className='optionMenuUser'>Cerrar Sesión</MenuItem>
              </Menu>
            </div>
            {/* ________________________________ */}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          {/** icono cuando se despliega la barra vertical */}
          <div className='cuadroFoto fondoBarraLateralUser'>
            {/*<div className='cuadro1'>
                <img id='imgUser' className="imagenUser" src={logo} alt="Foto Perfil"/>
            </div>*/}
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon className='colorIcono hoverColorIcono' />
              </IconButton>
            </Toolbar>
          </div>
          {/**__________________________________ */}

          {/*<Divider />   Es un <hr/>*/}
          <List component="nav" className='fondoBarraLateralUser contenedorBarraLateral'>
            {mainListItemsAdmi}     {/* aqui se anda exportando los botones de la lista de item lisItem.js* */}
            <Divider sx={{ my: 1 }} />
            {/*secondaryListItems*/}
          </List>
        </Drawer>
        <Box
          component="main" className='colorFondoUser'
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          {/**_______________Contenedor principal______________ */}
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <div className='container'>
              <Routes>
                <Route path="solicitante" element={<LabTabs />} />
                <Route path="registrar-torneo" element={<TabRegistrarTorneo />} />
                <Route path="registrar-partido" element={<RegistrarPartido />} />
                <Route path="/" element={<Navigate to='Solicitante' />} />
              </Routes>
            </div>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}