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
import Grid from '@mui/material/Grid';
import equipo from "../imagenes/basquet.webp";
import Avatar from '@mui/material/Avatar';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container className="cardEquipoJugadores">
      <Grid xs={12} sm={6} md={4} xl={3} spacing={2} variant="outlined" onClick={handleClickOpen}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image={equipo}
            alt="green iguana"
          />
          <Avatar alt="Remy Sharp" src={equipo} className="fotoJugador"/>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" className="nombreJugador">
              Fulano Fulanes
            </Typography>
            <Typography variant="body2" color="text.secondary" className="contenidoCardJugador">
              Equipo: Los fulanos
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Mas detalles...</Button>
          </CardActions>
        </Card>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
