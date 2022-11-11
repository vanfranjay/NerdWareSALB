import React from 'react';
import logo from '../imagenes/user1.png';
import { Link } from 'react-router-dom';
import '../css/NavBarVerticalUser.css'

const Usuario = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light nav">
        <div className="container-fluid columnaBarra">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse contenedorFotoUsuario" id="navbarTogglerDemo01">
            <img className="logoLigaBasket fotoUsuario" src={logo} alt="Foto de perfil" />
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 opcionesNavBarUser">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">Disabled</a>
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
