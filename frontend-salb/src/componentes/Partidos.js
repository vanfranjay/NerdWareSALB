import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import CardEquipo from './CardEquipo';
import axios from "axios";
import "../css/styleNavBar.css";
import configData from "../config/config.json";

const Partidos = () => {

    const baseUrl = "http://127.0.0.1:8000/api/equipos";
    const [equipos, setEquipos] = useState([]);
    const [categorias, setCategorias] = useState([]);


    useEffect(() => {

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

            <br></br>
        </div>
    );

}

export default Partidos;
