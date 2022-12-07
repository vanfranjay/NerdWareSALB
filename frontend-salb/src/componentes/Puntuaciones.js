import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import axios from "axios";
import "../css/styleNavBar.css";
//import configData from "../config/config.json";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import configData from "../config/config.json";

const Puntuaciones = () => {

    const PUNTUACIONES_URL = configData.PUNTUACIONES_API_URL || "http://127.0.0.1:8000/api/tota/";
    const CATEGORIAS_URL = configData.CATEGORIAS_API_URL || "http://127.0.0.1:8000/api/categorias";
    const [puntuaciones, setPuntuaciones] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [categoria, setCategoria] = useState([]);

    const getCategorias = async () => {
        await axios.get(CATEGORIAS_URL)
            .then(response => {
                setCategorias(response.data);
                setTimeout(() => getPuntuaciones(response.data[0].Categoria), 100);
            }).catch(error => {
                console.log(error);
            })
    }

    const getPuntuaciones = async (categoriaID) => {
        await axios.get(PUNTUACIONES_URL + categoriaID)
            .then(response => {
                setPuntuaciones(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const handleChange = (event) => {
        setCategoria(event.target.value);
        getPuntuaciones(event.target.value);
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
                Puntuaciones
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
            <br></br>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Equipo</TableCell>
                            <TableCell align="right">PJ</TableCell>
                            <TableCell align="right">G</TableCell>
                            <TableCell align="right">P</TableCell>
                            <TableCell align="right">Pts+</TableCell>
                            <TableCell align="right">Pts-</TableCell>
                            <TableCell align="right">Dif</TableCell>
                            <TableCell align="right">Pts</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {puntuaciones.map((puntuacion) => (
                            <TableRow
                                key={puntuacion.Nombre_Equipo}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <SportsBasketballIcon>
                                    </SportsBasketballIcon>
                                    &nbsp;
                                    {puntuacion.Nombre_Equipo}
                                </TableCell>
                                <TableCell align="right">{puntuacion.Partidos_Jugados}</TableCell>
                                <TableCell align="right">{puntuacion.Partidos_Ganados}</TableCell>
                                <TableCell align="right">{puntuacion.Partidos_Perdidos}</TableCell>
                                <TableCell align="right">{puntuacion.Puntos_F}</TableCell>
                                <TableCell align="right">{puntuacion.Puntos_C}</TableCell>
                                <TableCell align="right">{puntuacion.Dif}</TableCell>
                                <TableCell align="right">{puntuacion.Puntos}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br></br>
        </div>
    );

}

export default Puntuaciones;
