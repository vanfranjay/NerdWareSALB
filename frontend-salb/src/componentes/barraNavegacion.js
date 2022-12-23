import React from "react";
import "../css/styleNavBar.css";
import logo from "../imagenes/LogoLMB1.png";
import { Link, NavLink } from "react-router-dom";
import { Stack, Box } from "@mui/system";
import { Grid } from "@mui/material";
//import Tab from "@mui/material/Tab";
//import * as React from "react";
import AppBar from "@mui/material/AppBar";
//import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

const pages = [
  "convocatoria",
  "jugadores",
  "equipos",
  "partidos",
  "puntuaciones",
  "estadisticas",
  "noticias",
];

const BarraNavegacion = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className="contenedorPrincipalNavBar">
      <div className="cuadroLogoBasquet">
        <img
          className="logoLigaBasket"
          src={logo}
          alt="logo de la liga de basquet"
        />
      </div>
      <div className="inicarSesionRegistrarse">
        <label className="nombreLigaBasquet"></label>
        <div className="contenedorBtnLogin">
          <button className="btnLogin btn default">
            <NavLink className="iniciarSesion" to="/login">
              Iniciar Sesión
            </NavLink>
          </button>
        </div>
        <div className="contenedorBtnLogin">
          <button className="btnLogin btn default">
            <NavLink className="registrarse" to="/registrarse">
              Registrarse
            </NavLink>
          </button>
        </div>
      </div>
      <div>
        <AppBar position="static" style={{background: "none", boxShadow: "none"}}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <NavLink className="nav-link" to={page}>
                          {page}
                        </NavLink>
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
                justifyContent="center"
                alignItems="center">
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <NavLink className="nav-link" to={page}>
                      {page}
                    </NavLink>
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    </div>
  );
};

export default BarraNavegacion;
