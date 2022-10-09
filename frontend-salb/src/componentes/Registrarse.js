import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import '../css/styleRegistro.css';

const Registrarse = () => {
    return (
      <div className='contenedorFormRegistro'>
        <form className='formularioRegistro'>
          <div className='nombreRegistro centreado'>
            <input type='text' placeholder='Nombre' className='nombre diseñoCuadroRegistro' required></input>
          </div>
          <div className='apellidoRegistro centreado'>
            <input type='text' placeholder='Apellido' className='apellido diseñoCuadroRegistro' required></input>
          </div>
          <div className='telefonoRegistro centreado'>
            <input type='tel' placeholder='Teléfono' className='nombre diseñoCuadroRegistro' required></input>
          </div>
          <div className='direccionRegistro centreado'>
            <input type='email' placeholder='Email' className='nombre diseñoCuadroRegistro' required></input>
          </div>
          <div className='direccionRegistro centreado'>
            <input type='password' placeholder='contraseña' className='nombre diseñoCuadroRegistro' required></input>
          </div>
          <div className='direccionRegistro centreado'>
            <input type='password' placeholder='confirmación de contraseña' className='nombre diseñoCuadroRegistro' required></input>
          </div>
          <div className='fotoCarnetRegistro centreado'>
            <Button variant="contained" component="label" className='botonFormRegistro'>
              Foto Perfil
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </div>
          <div className='fotoPerfilRegistro centreado'>
            <Button variant="contained" component="label" className='botonFormRegistro'>
              Foto carnet
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </div>
          <div className='registroForm centreado'>
            <Button variant="contained" className='botonFormRegistro' type='submit'>Registrarse</Button>
          </div>
          <div className='cancelarRegistroForm centreado'>
            <Button variant="contained" className='botonFormRegistro'>Cancelar</Button>
          </div>
        </form>
      </div>
    );
}

export default Registrarse;
