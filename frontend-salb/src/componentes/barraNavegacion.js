import React from 'react';
import '../css/styleNavBar.css';
import logo from '../imagenes/Logo1SinFondo.png';
const BarraNavegacion = () => {
    return(
        <div className='contenedorPrincipalNavBar'>
            <div className='cuadroLogoBasquet'>
                <img class="logoLigaBasket" src={logo} alt="logo de la liga de basquet" />
            </div>
            <div className='inicarSesionRegistrarse'>
                <label className='nombreLigaBasquet'>LIGA MAXI BASQUET</label>
                <a className='registrarse'>REGISTRARSE</a>
                <a className='iniciarSesion'>INICIAR SESIÓN</a>
            </div>
            <nav class="navbar navbar-expand-lg bg-light fondoNavBar tamañoFondo">
                <div class="container-fluid tamañoFondo">

                    
                    <button class="navbar-toggler menuDespliegue" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse tamañoFondo" id="navbarNavAltMarkup">
                        <div class="navbar-nav menuOpciones tamañoFondo">
                            <a class="nav-link active colorLetra contenedorLetrasNavBar" aria-current="page" href="#">ESTADISTICAS</a>
                            <a class="nav-link colorLetra contenedorLetrasNavBar" href="#">FOTOS</a>
                            <a class="nav-link colorLetra contenedorLetrasNavBar" href="#">EQUIPOS</a>
                            <a class="nav-link colorLetra contenedorLetrasNavBar" href="#">JUEGOS</a>
                            <a class="nav-link colorLetra contenedorLetrasNavBar" href="#">NOTICIAS</a>
                            <a class="nav-link colorLetra contenedorLetrasNavBar" href="#">EN VIVO</a>
                            <a class="nav-link colorLetra contenedorLetrasNavBar" href="#">SOBRE NOSOTROS</a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default BarraNavegacion;