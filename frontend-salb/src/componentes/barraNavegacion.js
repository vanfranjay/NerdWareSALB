import React from 'react';
import '../css/styleNavBar.css';
import logo from '../imagenes/logoLigaBasket1.png';
import {Link, NavLink} from 'react-router-dom';


const BarraNavegacion = () => {
    return(
        <div className='contenedorPrincipalNavBar'>
            <div className='cuadroLogoBasquet'>
                <img className="logoLigaBasket" src={logo} alt="logo de la liga de basquet" />
            </div>
            <div className='inicarSesionRegistrarse'>
                <label className='nombreLigaBasquet'>LIGA MAXI BASQUET</label>
                <div className='contenedorBtnLogin'>
                    <button className='btnLogin'>
                        <NavLink className='registrarse' to="/registrarse">REGISTRARSE</NavLink>
                    </button>
                </div>
                <div className='contenedorBtnLogin'>
                    <button className='btnLogin'>
                        <NavLink className='iniciarSesion' to="/login">INICIAR SESIÓN</NavLink>
                    </button>
                </div>
            </div>
            <nav class="navbar navbar-expand-lg bg-light fondoNavBar tamañoFondo">
                <div class="container-fluid tamañoFondo">

                    
                    <button class="navbar-toggler menuDespliegue" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse tamañoFondo" id="navbarNavAltMarkup">
                        <div class="navbar-nav menuOpciones tamañoFondo">
                            <NavLink className="nav-link colorLetra contenedorLetrasNavBar" to="/estadisticas">ESTADISTICAS</NavLink>
                            <NavLink className="nav-link colorLetra contenedorLetrasNavBar" to="/fotos">FOTOS</NavLink>
                            <NavLink className="nav-link colorLetra contenedorLetrasNavBar" to="/equipos">EQUIPOS</NavLink>
                            <NavLink className="nav-link colorLetra contenedorLetrasNavBar" to="/juegos">JUEGOS</NavLink>
                            <NavLink className="nav-link colorLetra contenedorLetrasNavBar" to="/noticias">NOTICIAS</NavLink>
                            <NavLink className="nav-link colorLetra contenedorLetrasNavBar" to="/en-vivo">EN VIVO</NavLink>
                            <NavLink className="nav-link colorLetra contenedorLetrasNavBar" to="/sobre-nosotros">SOBRE NOSOTROS</NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default BarraNavegacion;