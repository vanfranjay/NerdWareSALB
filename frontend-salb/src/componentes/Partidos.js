import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import CardPartido from './CardPartido';
import axios from "axios";
import "../css/styleNavBar.css";
import configData from "../config/config.json";
import moment from "moment";
import "moment/locale/es";


const Partidos = () => {

    const PARTIDOS_URL = configData.PARTIDOS_API_URL || "http://127.0.0.1:8000/api/rol_partidos";
    const PARTIDOS_FINALIZADOS_URL = configData.PARTIDOS_FINALIZADOS_API_URL || "http://127.0.0.1:8000/api/partidos";
    const [partidos, setPartidos] = useState([]);
    const [partidosFins, setPartidosFins] = useState([]);
    const [partidosCompletos, setPartidosCompletos] = useState([]);
    const [equipos, setEquipos] = useState([]);


    const getPartidosFinalizados = async () => {
        await axios.get(PARTIDOS_FINALIZADOS_URL)
            .then(response => {
                setPartidosFins(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const getPartidos = async () => {
        await axios.get(PARTIDOS_URL)
            .then(response => {
                setPartidos(response.data);
                filterPartidos(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const filterPartidos = async (partidosIn) => {
        getPartidosFinalizados();

        var resParFins = await axios.get(PARTIDOS_FINALIZADOS_URL)
            .then(response => {
                setPartidosFins(response.data);
                return response.data;
            }).catch(error => {
                console.log(error);
            })

        var partidosFin = [];

        partidosIn.forEach((partido) => {

            var partidoFinalizado = resParFins.find(part => (part.Fecha_Partido === partido.Fecha) && (part.Hora_Inicio === partido.Hora));
            partidosFin.push({
                id: partido.id,
                Fecha: partido.Fecha,
                Hora: partido.Hora,
                EquipoA: partido.EquipoA,
                EquipoB: partido.EquipoB,
                Lugar: partido.Lugar,
                Cancha: partido.Cancha,
                Estado: partidoFinalizado ? "Finalizado" : "",
                Puntos_Ganador: partidoFinalizado ? partidoFinalizado.Puntos_Ganador : 0,
                Puntos_Perdedor: partidoFinalizado ? partidoFinalizado.Puntos_Perdedor : 0,
                Equipo_Ganador: partidoFinalizado ? partidoFinalizado.E_Ganador : "",
                Equipo_Perdedor: partidoFinalizado ? partidoFinalizado.E_Perdedor : "",
            });
        });

        setPartidosCompletos(partidosFin);
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

                {Array.from(partidosCompletos).map(({ id, Fecha, Hora, EquipoA, EquipoB, Estado, Puntos_Ganador, Puntos_Perdedor, Equipo_Ganador, Equipo_Perdedor }) => (

                    <Grid key={id} item xs={4}>
                        <CardPartido codigo={id} fecha={Fecha} hora={Hora} equipoA={EquipoA} equipoB={EquipoB} estado={Estado} puntosGan={Puntos_Ganador} puntosPer={Puntos_Perdedor} eqGanador={Equipo_Ganador} eqPerdedor={Equipo_Perdedor} />
                    </Grid>

                ))}

            </Grid>

            <br></br>
        </div>
    );

}

export default Partidos;
