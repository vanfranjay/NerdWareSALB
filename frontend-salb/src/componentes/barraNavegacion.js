import React from 'react';
import '../css/styleNavBar.css';
import logo from '../imagenes/logoLigaBasket1.png';
import {Link} from 'react-router-dom';


const BarraNavegacion = () => {
    return(
        <div className='contenedorPrincipalNavBar'>
            <div className='cuadroLogoBasquet'>
                <img class="logoLigaBasket" src={logo} alt="logo de la liga de basquet" />
            </div>
            <div className='inicarSesionRegistrarse'>
                <label className='nombreLigaBasquet'>LIGA MAXI BASQUET</label>
                <Link className='registrarse' to="/register">REGISTRARSE</Link>
                <Link className='iniciarSesion' to="/login">INICIAR SESIÓN</Link>
            </div>
            <nav class="navbar navbar-expand-lg bg-light fondoNavBar tamañoFondo">
                <div class="container-fluid tamañoFondo">

                    
                    <button class="navbar-toggler menuDespliegue" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse tamañoFondo" id="navbarNavAltMarkup">
                        <div class="navbar-nav menuOpciones tamañoFondo">
                            <a class="nav-link active colorLetra contenedorLetrasNavBar" aria-current="page" href="#">ESTADISTICAS</a>
                            <Link class="nav-link colorLetra contenedorLetrasNavBar" to="/fotos">FOTOS</Link>
                            <Link class="nav-link colorLetra contenedorLetrasNavBar" to="/equipos">EQUIPOS</Link>
                            <Link class="nav-link colorLetra contenedorLetrasNavBar" to="/juegos">JUEGOS</Link>
                            <Link class="nav-link colorLetra contenedorLetrasNavBar" to="/noticias">NOTICIAS</Link>
                            <Link class="nav-link colorLetra contenedorLetrasNavBar" to="/en-vivo">EN VIVO</Link>
                            <Link class="nav-link colorLetra contenedorLetrasNavBar" to="/sobre-nosotros">SOBRE NOSOTROS</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default BarraNavegacion;