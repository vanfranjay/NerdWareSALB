import React from "react";
import "../css/styleNavBar.css";
import logo from "../imagenes/LogoLMB1.png";
import { Link, NavLink } from "react-router-dom";
import { Stack, Box } from "@mui/system";
import { Grid } from "@mui/material";
//import Tab from "@mui/material/Tab";

const BarraNavegacion = () => {
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
      <nav className="navbar navbar-expand-lg bg-light fondoNavBar tamañoFondo">
        <div className="container-fluid tamañoFondo">
          <button
            className="navbar-toggler menuDespliegue"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse tamañoFondo"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav  tamañoFondo">

              <Stack
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                rowSpacing={2}
                columnSpacing={2}
                columns={14}
                spacing={5}
              >

                <Grid item xs={6} sm={3} >
                  {/*<NavLink className="nav-link colorLetra contenedorLetrasNavBar" to="/estadisticas">ESTADISTICAS</NavLink>
                            <NavLink className="nav-link colorLetra contenedorLetrasNavBar" to="/fotos">FOTOS</NavLink>*/}

                  <NavLink

                    className="nav-link colorLetra contenedorLetrasNavBar"
                    to="/convocatoria"
                  >
                    CONVOCATORIA
                  </NavLink>
                </Grid>

                <Grid item xs={6} sm={3}>
                  <NavLink

                    className="nav-link colorLetra contenedorLetrasNavBar"
                    to="/jugadores"
                  >
                    JUGADORES
                  </NavLink>

                </Grid>

                <Grid item xs={6} sm={3}>
                  <NavLink
                    className="nav-link colorLetra contenedorLetrasNavBar"
                    to="/equipos"
                  >
                    EQUIPOS
                  </NavLink>
                </Grid>

                <Grid item xs={6} sm={3}>
                  <NavLink
                    className="nav-link colorLetra contenedorLetrasNavBar"
                    to="/partidos"
                  >
                    PARTIDOS
                  </NavLink>
                </Grid>

                <Grid item xs={6} sm={3}>
                  <NavLink
                    className="nav-link colorLetra contenedorLetrasNavBar"
                    to="/puntuaciones"
                  >
                    PUNTUACIONES
                  </NavLink>
                </Grid>

                <Grid item xs={6} sm={3}>
                  <NavLink
                    className="nav-link colorLetra contenedorLetrasNavBar"
                    to="/estadisticas"
                  >
                    ESTADISTICAS
                  </NavLink>
                </Grid>

                <Grid item xs={6} sm={3}>
                  {/*<NavLink className="nav-link colorLetra contenedorLetrasNavBar" to="/juegos">JUEGOS</NavLink>
                            <NavLink className="nav-link colorLetra contenedorLetrasNavBar" to="/en-vivo">EN VIVO</NavLink>
                            <NavLink className="nav-link colorLetra contenedorLetrasNavBar" to="/sobre-nosotros">SOBRE NOSOTROS</NavLink>*/}
                  <NavLink
                    className="nav-link colorLetra contenedorLetrasNavBar"
                    to="/noticias"
                  >
                    NOTICIAS
                  </NavLink>
                </Grid>
                {/*<NavLink className="nav-link colorLetra contenedorLetrasNavBar" to="/noticias">JUGADORES</NavLink>*/}
              </Stack>

            </div>
          </div>
        </div>
      </nav >
    </div >
  );
};

export default BarraNavegacion;
