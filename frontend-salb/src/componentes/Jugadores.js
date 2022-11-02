import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import equipo from "../imagenes/basquet.webp";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { useState, useEffect } from "react";
import "../css/equipo.css";
import { Box } from "@mui/material";

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const [idJugador, setIdJugador] = React.useState(-1);

  const handleClickOpen = (idJugador) => {
    setOpen(true);
    setIdJugador(idJugador);
  };

  const handleClose = () => {
    setOpen(false);
    setIdJugador(-1);
  };

  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    fetchGamer();
  }, []);

  //console.log("Loading...");
  const fetchGamer = async () => {
    const resultado = await axios.get("http://127.0.0.1:8000/api/jugadores");
    setJugadores([...resultado.data]);
    console.log(resultado.data);
  };
  function calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    return edad;
  }
  return (
    <Grid container className="cardEquipoJugadores">
      {jugadores.map((jugador, index) => {
        return (
          <>
            <div
              /*xs={12}
              sm={6}
              md={4}
              xl={3}
              container*/
              /*spacing={2}*/
              variant="outlined"
              onClick={() => {
                {
                  handleClickOpen(jugador.id);
                }
              }}
              className="cardJugadores"
            >
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={equipo}
                  alt="green iguana"
                />

                <CardContent>
                  <Avatar
                    alt={`Foto del usuario" ${jugador.Nombre} ${jugador.Apellido}`}
                    src={equipo}
                    className="fotoJugador"
                  />
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="nombreJugador"
                  >
                    {jugador.Nombre} {jugador.Apellido}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="contenidoCardJugador"
                  >
                    <b>Equipo:</b> Los fulanos
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Mas detalles...</Button>
                </CardActions>
              </Card>
            </div>

            <Dialog
              open={open && idJugador === jugador.id}
              /*onClose={handleClose}*/
              aria-labelledby={`alert-dialog-title${jugador.id}`}
              aria-describedby={`alert-dialog-description${jugador.id}`}
            >
              <Grid xs={12}>
                <DialogContentText>
                  <img
                    src={equipo}
                    alt={`foto de Perfil de ${jugador.Nombre} ${jugador.Apellido}`}
                    className="fotoPerfilJugador"
                  />
                </DialogContentText>
                <DialogTitle
                  id={`alert-dialog-title${jugador.id}`}
                  className="NombrePerfilJugador"
                >
                  {jugador.Nombre} {jugador.Apellido}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText
                    id={`alert-dialog-description${jugador.id}`}
                    className="colorLetraDetallesJugador"
                  >
                    <b>Nombre:</b> {jugador.Nombre}
                    <br />
                    <b>Apellido:</b> {jugador.Apellido}
                    <br />
                    <b>Edad:</b> {calcularEdad(jugador.Fecha_Nacimiento)} años
                    <br />
                    <b>Equipo:</b> Por definir
                    <br />
                    <b>Categoría:</b> por definir
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cerrar</Button>
                </DialogActions>
              </Grid>
            </Dialog>
          </>
        );
      })}
    </Grid>
  );
}
