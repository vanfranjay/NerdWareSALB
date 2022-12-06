import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import axios from "axios";
import "../css/styleNavBar.css";
import configData from "../config/config.json";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import PersonIcon from '@mui/icons-material/Person';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';

const Estadisticas = () => {

    const puntosURL = process.env.PUNTOS_API_URL || "http://127.0.0.1:8000/api/puntos/";
    const faltasURL = process.env.FALTAS_API_URL || "http://127.0.0.1:8000/api/faltas/";
    const categoriasURL = process.env.CATEGORIAS_API_URL || "http://127.0.0.1:8000/api/categorias";
    const [categorias, setCategorias] = useState([]);
    const [puntos, setPuntos] = useState([]);
    const [faltas, setFaltas] = useState([]);
    const [categoria, setCategoria] = useState([]);

    const getCategorias = async () => {
        await axios.get(categoriasURL)
            .then(response => {
                setCategorias(response.data);
                setTimeout(() => getEstadisticasData(response.data[0].Categoria), 100);
            }).catch(error => {
                console.log(error);
            })
    }

    const getEstadisticasData = async (categoriaID) => {
        getPuntos(categoriaID);
        getFaltas(categoriaID);
    }

    const getPuntos = async (categoriaID) => {
        await axios.get(puntosURL + categoriaID)
            .then(response => {
                setPuntos(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const getFaltas = async (categoriaID) => {
        await axios.get(faltasURL + categoriaID)
            .then(response => {
                setFaltas(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const handleChange = (event) => {
        setCategoria(event.target.value);
        getEstadisticasData(event.target.value);
    };

    useEffect(() => {
        getCategorias();
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
                Estadisticas
            </Typography>
            <br></br>

            <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                    <FormControl variant="standard" fullWidth required>
                        <InputLabel
                            InputLabelProps={{
                                style: { color: '#ffff' },
                            }}
                            sx={{
                                color: 'white',
                                '& .MuiInputLabel-root': {
                                    color: 'white'
                                },
                                '& .MuiFormLabelroot': {
                                    color: 'white'
                                }
                            }}>Categoria</InputLabel>
                        <Select
                            required
                            id="categoria"
                            name="categoria"
                            label="Categoria"
                            value={categoria}
                            onChange={handleChange}
                            sx={{
                                '& .MuiInputBase-input': {
                                    color: 'white'

                                },
                                '& .MuiSelect-iconStandard': {
                                    color: 'white'
                                }
                            }}
                        >
                            {categorias.map(({ id, Categoria }, index) => (
                                <MenuItem key={index} value={Categoria}>
                                    {Categoria}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <br></br>
            <Typography variant="h5"
                align='center'
                color="#ffff"
                sx={{
                    input: { color: 'white' }
                }}>
                Puntos
            </Typography>
            <br></br>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Jugador</TableCell>
                            <TableCell align="right">Equipo</TableCell>
                            <TableCell align="right">Puntos</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {puntos.map((puntosJugador) => (
                            <TableRow
                                key={puntosJugador.Nombre}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <PersonIcon>
                                    </PersonIcon>
                                    &nbsp;
                                    {puntosJugador.Nombre}
                                    &nbsp;
                                    {puntosJugador.Apellido}
                                </TableCell>
                                <TableCell align="right">{puntosJugador.Nombre_Equipo}</TableCell>
                                <TableCell align="right">{puntosJugador.Puntos}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br></br>
            <Typography variant="h5"
                align='center'
                color="#ffff"
                sx={{
                    input: { color: 'white' }
                }}>
                Faltas
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Jugador</TableCell>
                            <TableCell align="right">Equipo</TableCell>
                            <TableCell align="right">Faltas</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {faltas.map((faltasJugador) => (
                            <TableRow
                                key={faltasJugador.Nombre}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <PersonIcon>
                                    </PersonIcon>
                                    &nbsp;
                                    {faltasJugador.Nombre}
                                    &nbsp;
                                    {faltasJugador.Apellido}
                                </TableCell>
                                <TableCell align="right">{faltasJugador.Nombre_Equipo}</TableCell>
                                <TableCell align="right">{faltasJugador.Faltas}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

}

export default Estadisticas;
