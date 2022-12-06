import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import CardEquipo from './CardEquipo';
import axios from "axios";
import "../css/styleNavBar.css";
import configData from "../config/config.json";

const ListaEquipos = () => {

    const EQUIPOS_URL = process.env.EQUIPOS_API_URL || "http://127.0.0.1:8000/api/equipos"
    const CATEGORIAS_URL = process.env.CATEGORIAS_API_URL || "http://127.0.0.1:8000/api/categorias"

    const [equipos, setEquipos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const getEquipos = async () => {
        await axios.get(EQUIPOS_URL)
            .then(response => {
                setEquipos(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const getCategorias = async () => {
        await axios.get(CATEGORIAS_URL)
            .then(response => {
                console.log("Categorias: " + response.data);
                setCategorias(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    function getCategoria(categoriaID) {
        return categorias ? categorias.find(categoria => categoria.id === categoriaID).Categoria : "";
    }

    useEffect(() => {
        getCategorias();
        getEquipos();
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
                Equipos
            </Typography>
            <br></br>

            <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={3}
                columns={{ xs: 4, sm: 8, md: 12 }}>

                {Array.from(equipos).map(({ id, Nombre_Equipo, Logo, NumJug, Cod_Categoria }) => (

                    <Grid key={id} item xs={4}>
                        <CardEquipo codigo={id} nombreEquipo={Nombre_Equipo} logo={Logo} numJug={NumJug} categoria={categorias ? getCategoria(Cod_Categoria) : []} />
                    </Grid>
                ))}
            </Grid>

            <br></br>
        </div>
    );

}

export default ListaEquipos;
