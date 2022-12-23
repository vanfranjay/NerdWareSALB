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
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import { orange } from "@mui/material/colors";
import moment from "moment";
import "moment/locale/es";

function CardPartido({ codigo, fecha, hora, equipoA, equipoB, estado, puntosGan, puntosPer, eqGanador, eqPerdedor }) {

    var diaPartido = moment(fecha).format('D');
    var mesPartido = moment(fecha).format('MMMM');
    var horaPartido = hora.substring(0, 5);

    var puntosGanador = puntosGan !== 0 ? puntosGan : "";
    var puntosPerdedor = puntosPer !== 0 ? puntosPer : "";

    return (
        <div>
            <Card sx={{ display: 'flex', width: "700px" }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', width: "350px", position: 'relative' }}>
                    <CardMedia
                        component="img"
                        display="flex"
                        sx={{ width: "700px", background: 'orange' }}

                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: '50%',
                            top: 25,
                            left: "30%",
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                            padding: '10px',
                        }}
                    >
                        <Typography variant="h5"><b>{diaPartido}</b> {mesPartido}</Typography>
                        <Typography variant="body2" sx={{
                            position: 'absolute',
                            bottom: 50,
                            top: 40,
                            left: "6%",
                            width: '100%',
                            color: 'white',
                            padding: '10px',
                        }}>Hrs. {horaPartido}</Typography>

                        <Typography variant="body2" sx={{
                            position: 'absolute',
                            bottom: 60,
                            top: 60,
                            left: "6%",
                            width: '100%',
                            color: 'white',
                            padding: '10px',
                        }}>{estado}</Typography>
                    </Box>

                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', width: "350px" }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>

                        <Typography variant="h5" color="text.secondary" component="div">
                            <SportsBasketballIcon>
                            </SportsBasketballIcon>
                            &nbsp;
                            &nbsp;
                            <b>{equipoA === eqGanador ? puntosGanador : puntosPerdedor}</b>
                            &nbsp;
                            &nbsp;
                            {equipoA}
                            &nbsp;
                            &nbsp;
                            
                        </Typography>
                        <br></br>
                        <Typography variant="h5" color="text.secondary" component="div">
                            <SportsBasketballIcon>
                            </SportsBasketballIcon>
                            &nbsp;
                            &nbsp;
                            <b>{equipoB === eqGanador ? puntosGanador : puntosPerdedor}</b>
                            &nbsp;
                            &nbsp;
                            {equipoB}
                            &nbsp;
                            &nbsp;
                        </Typography>
                    </CardContent>

                </Box>


            </Card>

        </div>
    );
}

CardPartido.propTypes = {
    codigo: PropTypes.number.isRequired,
    fecha: PropTypes.string,
    hora: PropTypes.string,
    equipoA: PropTypes.string,
    equipoB: PropTypes.string,
    estado: PropTypes.string,
    puntosGan: PropTypes.number,
    puntosPer: PropTypes.number,
    eqGanador: PropTypes.string,
    eqPerdedor: PropTypes.string
};

export default CardPartido;