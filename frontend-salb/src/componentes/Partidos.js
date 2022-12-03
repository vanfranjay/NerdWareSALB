import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import CardPartido from './CardPartido';
import axios from "axios";
import "../css/styleNavBar.css";
import configData from "../config/config.json";

const Partidos = () => {

    const baseUrl = "http://127.0.0.1:8000/api/rol_partidos";
    const [partidos, setPartidos] = useState([]);


    const getPartidos = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setPartidos(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        getPartidos();
    }, [])

    return (
        <div className='contentEquipos'>
            <br></br>
            <br></br>

            <Typography variant="h3"
                align='center'
                color="#ffff"
                sx={{
                    input: { color: 'white' }
                }}>
                Partidos
            </Typography>
            <br></br>

            <Grid

                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={3}>

                {Array.from(partidos).map(({ id, Fecha, Hora, EquipoA, EquipoB }) => (

                    <Grid key={id} item xs={4}>
                        <CardPartido codigo={id} fecha={Fecha} hora={Hora} equipoA={EquipoA} equipoB={EquipoB} />
                    </Grid>

                ))}

            </Grid>

            <br></br>
        </div>
    );

}

export default Partidos;
