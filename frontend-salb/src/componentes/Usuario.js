import React from 'react';
import logo from '../imagenes/user1.png';
import {Link} from 'react-router-dom';
import '../css/NavBarVerticalUser.css'

const Usuario = () => {
    return (
        <>
        <nav className="navbar navbar-expand-lg bg-light nav">
          <div class="container-fluid columnaBarra">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse contenedorFotoUsuario" id="navbarTogglerDemo01">
              <img class="logoLigaBasket fotoUsuario" src={logo} alt="Foto de perfil" />
              <ul class="navbar-nav me-auto mb-2 mb-lg-0 opcionesNavBarUser">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link disabled">Disabled</a>
                  </li>
                  <div>
                    <p>notificación</p>
                  </div>
                  <div className='opcionesUser'>
                    <p>conf</p>
                  </div>
                </ul>
            </div>
          </div>
        </nav>
        </>
    );
}

export default Usuario;
