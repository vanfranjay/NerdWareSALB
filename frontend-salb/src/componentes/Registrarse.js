import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import "../css/styleRegistro.css";
import axios from "axios";

const Registrarse = () => {
  const [delegado, setDelegado] = React.useState({
    Nombre: "",
    Apellido: "",
    Telefono: "",
    Contraseña: "",
    Contraseña_confirmed: "",
    Correo: "",
    Foto_Perfil: "fotoPerfil.png",
    Foto_DNI: "fotoDni.png",
  });
  const crearDelegado = async (e) => {
    e.preventDefault(); //evitar que se actualice la pantalla
    const res = await axios.post("http://127.0.0.1:8000/api/delegados", {
      ...delegado,
    });
    console.log(res.data);
    setDelegado({
      Nombre: "",
      Apellido: "",
      Telefono: "",
      Contraseña: "",
      Contraseña_confirmed: "",
      Correo: "",
      Foto_Perfil: "fotoPerfil.png",
      Foto_DNI: "fotoDni.png",
    });
  };

  const reset = () => {
    setDelegado({
      Nombre: "",
      Apellido: "",
      Telefono: "",
      Contraseña: "",
      Contraseña_confirmed: "",
      Correo: "",
      Foto_Perfil: "",
      Foto_DNI: "",
    });
  };

  return (
    <div className="contenedorFormRegistro">
      <form onSubmit={crearDelegado} className="formularioRegistro">
        <div className="nombreRegistro centreado">
          <input
            type="text"
            placeholder="Nombre"
            value={delegado.Nombre}
            onChange={(e) => {
              setDelegado({ ...delegado, Nombre: e.target.value });
            }}
            className="nombre diseñoCuadroRegistro"
            required
          ></input>
        </div>
        <div className="apellidoRegistro centreado">
          <input
            type="text"
            placeholder="Apellido"
            value={delegado.Apellido}
            onChange={(e) => {
              setDelegado({ ...delegado, Apellido: e.target.value });
            }}
            className="apellido diseñoCuadroRegistro"
            required
          ></input>
        </div>
        <div className="telefonoRegistro centreado">
          <input
            type="tel"
            placeholder="Teléfono"
            value={delegado.Telefono}
            onChange={(e) => {
              setDelegado({ ...delegado, Telefono: e.target.value });
            }}
            className="nombre diseñoCuadroRegistro"
            required
          ></input>
        </div>
        <div className="direccionRegistro centreado">
          <input
            type="email"
            placeholder="Email"
            value={delegado.Correo}
            onChange={(e) => {
              setDelegado({ ...delegado, Correo: e.target.value });
            }}
            className="nombre diseñoCuadroRegistro"
            required
          ></input>
        </div>
        <div className="direccionRegistro centreado">
          <input
            type="password"
            placeholder="contraseña"
            value={delegado.Contraseña}
            onChange={(e) => {
              setDelegado({ ...delegado, Contraseña: e.target.value });
            }}
            className="nombre diseñoCuadroRegistro"
            required
          ></input>
        </div>
        <div className="direccionRegistro centreado">
          <input
            type="password"
            placeholder="confirmación de contraseña"
            value={delegado.Contraseña_confirmed}
            onChange={(e) => {
              setDelegado({
                ...delegado,
                Contraseña_confirmed: e.target.value,
              });
            }}
            className="nombre diseñoCuadroRegistro"
            required
          ></input>
        </div>
        <div className="fotoCarnetRegistro centreado">
        <TextField
                required
                id='F_DNI'
                name="upload-photo"
                type="file"
                label="Foto Perfil "
                className='inputRegistrarEquipo'
                InputLabelProps={{ shrink: true }}
                sx={{
                    label: { color: '#ffff' },
                    input: { color: '#ffff' },
                    svg: { color: '#ffff' }/*},
                    "& .MuiInputBase-input": {
                        width: "460px" // Set your height here.
                    }*/
                }}
              />
        </div>
        <div className="fotoPerfilRegistro centreado">
          {/*<Button
            variant="contained"
            component="label"
            className="botonFormRegistro"
          >
            Foto carnet
            <input hidden accept="image/*" multiple type="file" />
          </Button>*/}
          <TextField
                required
                id='F_DNI'
                name="upload-photo"
                type="file"
                label="Foto del Dni "
                className='fotoDniPerfil'
                InputLabelProps={{ shrink: true }}
                sx={{
                    label: { color: '#ffff' },
                    input: { color: '#ffff' },
                    svg: { color: '#ffff' }/*},
                    "& .MuiInputBase-input": {
                        width: "460px" // Set your height here.
                    }*/
                }}
              />
        </div>
        <div className="registroForm centreado">
          <Button
            variant="contained"
            className="botonFormRegistro"
            type="submit"
          >
            Registrarse
          </Button>
        </div>
        <div className="cancelarRegistroForm centreado">
          <Button variant="contained" className="botonFormRegistro" onClick={reset}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Registrarse;
