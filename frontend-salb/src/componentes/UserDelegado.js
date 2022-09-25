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
import { mainListItems, secondaryListItems } from './listItems';
import logo from '../imagenes/user1.png';

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
              <MenuIcon className='iconoMenu'/>
            </IconButton >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard {/* Titulo de la Página */}
            </Typography>
            {/* Icono de la campana */}
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            {/* ________________________________ */}
            </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
        {/** icono cuando se despliega la barra vertical */}
        <div className='cuadroFoto fondoBarraLateralUser'>
            <div className='cuadro1'>
                <img id='imgUser' class="imagenUser" src={logo} alt="Foto Perfil"/>
            </div>
            <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon className='colorIcono hoverColorIcono'/>
            </IconButton>
          </Toolbar>
        </div>
{/**__________________________________ */}

          {/*<Divider />   Es un <hr/>*/}
          <List component="nav" className='fondoBarraLateralUser contenedorBarraLateral'>
            {mainListItems}
            <Divider sx={{ my: 1 }}/>
            {secondaryListItems}
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
          <Grid container spacing={3} className="container">
            <p>Aqui vendra el contenido del usuario delegado o admi Aqui vendra el contenido del usuario delegado o admi
            Aqui vendra el contenido del usuario delegado o admi Aqui vendra el contenido del usuario delegado o admi
            Aqui vendra el contenido del usuario delegado o admi Aqui vendra el contenido del usuario delegado o admi
            
            </p>
              {/* Contenido del primer deposito principal */}
              {/*<Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  {/*<Chart />*/}
                {/*</Paper>
              </Grid>*/}
              {/* Recent Deposits contenedor lateral*/}
              {/*<Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                ></Paper>*/}
                  {/*<Deposits />*/}
                {/*</Paper>
              </Grid>*/}
              {/* Recent Orders contenedor de pie de pagina*/}
              {/*<Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {/*<Orders />*/}
                {/*</Paper>
              </Grid>*/}
            </Grid>
            {/**texto de pie de pagina */}
            {/*<Copyright sx={{ pt: 4 }} />*/}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}