import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react';
//import dateFormat, { masks } from "dateformat";
//import TextTruncate from 'react-text-truncate';

import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CardActions from "@mui/material/CardActions";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";


function CardNoticia({ codigo, fecha, imagen, titulo, descripcion, link }) {

    const [show, setShow] = useState(false);

    //const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);

    const theme = useTheme();

    const [open, setOpen] = React.useState(false);
    //const [idNoticia, setIdNoticia] = React.useState(-1);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div
            onClick={() => {
                {
                    handleClickOpen();
                }
            }}>

            <Card sx={{ display: 'flex', width: "750px" }}>

                <Box sx={{ display: 'flex', flexDirection: 'column', width: "550px" }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            {titulo}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {descripcion}
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 1 }}>
                        <QueryBuilderRoundedIcon>
                        </QueryBuilderRoundedIcon>
                        {fecha}
                    </Box>

                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', width: "200px" }}>
                    <CardMedia
                        component="img"
                        display="flex"
                        sx={{ width: 200 }}
                        image={imagen}

                    />
                </Box>

            </Card>
            <div>
                <Dialog

                    open={open}
                    onClose={handleClose}
                    aria-labelledby={`alert-dialog-title${codigo}`}
                    aria-describedby={`alert-dialog-description${codigo}`}
                >
                    <Grid xs={12}>
                        <DialogContentText>
                            <img
                                src={imagen}
                                className="fotoPerfilJugador"
                            />
                        </DialogContentText>
                        <DialogTitle
                            id={`alert-dialog-title${codigo}`}
                            className="NombrePerfilJugador"
                        >
                            {titulo}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText
                                id={`alert-dialog-description${codigo}`}
                                className="colorLetraDetallesJugador"
                            >
                                {descripcion}

                                <br>
                                </br>
                                <QueryBuilderRoundedIcon>
                                </QueryBuilderRoundedIcon>
                                {fecha}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Disagree</Button>
                        </DialogActions>
                    </Grid>
                </Dialog>
            </div>

        </div>
    );
}

CardNoticia.propTypes = {
    codigo: PropTypes.string.isRequired,
    fecha: PropTypes.string,
    imagen: PropTypes.string,
    titulo: PropTypes.string,
    descripcion: PropTypes.string,
    link: PropTypes.string,
};

export default CardNoticia;