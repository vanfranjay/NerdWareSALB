import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react';

import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import equipo from "../imagenes/defLogoEquipo.png";

function CardEquipo({ codigo, nombreEquipo, logo, numJug, categoria }) {

    return (
        <div>

            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="250"
                    image={logo ? logo : equipo}
                    sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}

                />
                <CardContent>
                    <Typography gutterBottom align="center" variant="h5" component="div">
                        {nombreEquipo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <b>Categoria:</b> {categoria}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <b>Numero de Jugadores:</b> {numJug}
                    </Typography>
                </CardContent>

            </Card>

        </div>
    );
}

CardEquipo.propTypes = {
    codigo: PropTypes.number.isRequired,
    nombreEquipo: PropTypes.string,
    logo: PropTypes.string,
    numJug: PropTypes.number,
    categoria: PropTypes.string
};

export default CardEquipo;