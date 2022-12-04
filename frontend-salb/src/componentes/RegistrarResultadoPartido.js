import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Grid } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { Typography } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import '../css/styleRegistro.css';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';

//import MaterialTable from "material-table";


import { Container, Stack } from '@mui/system';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { useFormik, useField, useFormikContext } from "formik";
import * as Yup from "yup";

import configData from "../config/config.json";

//Setup for Datepicker
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from "moment";
import "moment/locale/es";


const RegistrarResultadoPartido = () => {



    const columns = [
        { field: 'jugador', headerName: 'Jugador', width: 250, editable: false },
        { field: 'puntos', headerName: 'Puntos', width: 130, editable: true },
        { field: 'faltas', headerName: 'Faltas', width: 130, editable: true },

    ];

    const defaultRows = [
        { id: 1, jugador: 'Marcela Flores', puntos: 0, faltas: 0 },
        { id: 2, jugador: 'Camila Soliz', puntos: 0, faltas: 0 },
        { id: 3, jugador: 'Daniela Sandoval', puntos: 0, faltas: 0 },
        { id: 4, jugador: 'Vivian Fiorilo', puntos: 0, faltas: 0 },
        { id: 5, jugador: 'Luciana Perez', puntos: 0, faltas: 0 },
    ];

    const [open, setOpen] = React.useState(false);
    const [alertColor, setAlertColor] = useState('');
    const [alertContent, setAlertContent] = useState('');

    const registrarPartidoURL = "http://127.0.0.1:8000/api/rol_partidos";
    const equiposURL = "http://127.0.0.1:8000/api/equipos";
    const categoriasURL = "http://127.0.0.1:8000/api/categorias";
    const jugadoresEquipoURL = "http://127.0.0.1:8000/api/jugeq1/";
    const [categorias, setCategorias] = useState([]);
    const [torneo, setTorneo] = useState([]);
    const [torneoID, setTorneoID] = useState([]);
    const [fechaFinTorneo, setFechaFinTorneo] = useState([]);
    const [equipos, setEquipos] = useState([]);
    const [jugadoresRes, setJugadoresRes] = useState([]);
    const [jugadoresEquipoGan, setJugadoresEquipoGan] = useState([]);
    const [jugadoresEquipoPer, setJugadoresEquipoPer] = useState([]);


    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const getRowsEquipGan = async (nombreEquipo) => {
        var selectedEquipo = equipos.find(equipo => equipo.Nombre_Equipo === nombreEquipo);
        console.log("Equipo ID: " + selectedEquipo.id);
        var jugs = await getJugadores(selectedEquipo.id);

        var jugadores = [];

        console.log("Jugadores Equipo:" + jugs);
        jugs.forEach((jugador) => {
            jugadores.push({
                id: jugador.id,
                jugador: jugador.Nombre + ' ' + jugador.Apellido,
                puntos: 0,
                faltas: 0
            });
        });
        setJugadoresEquipoGan(jugadores);
    }

    const getRowsEquipPer = async (nombreEquipo) => {
        var selectedEquipo = equipos.find(equipo => equipo.Nombre_Equipo === nombreEquipo);
        console.log("Equipo ID: " + selectedEquipo.id);
        var jugs = await getJugadores(selectedEquipo.id);

        var jugadores = [];

        console.log("Jugadores Equipo:" + jugs);
        jugs.forEach((jugador) => {
            jugadores.push({
                id: jugador.id,
                jugador: jugador.Nombre + ' ' + jugador.Apellido,
                puntos: 0,
                faltas: 0
            });
        });
        setJugadoresEquipoPer(jugadores);
    }

    const getTorneo = async () => {
        await axios.get(configData.TORNEO_API_URL)
            .then(response => {
                //setTorneo(response.data);
                setFechaFinTorneo(response.data[0].Fecha_Fin_Torneo);
                setTorneoID(response.data[0].id)
                console.log("Torneo: " + JSON.stringify(response.data));
            }).catch(error => {
                console.log(error);
            })
    }

    const getEquipos = async () => {
        await axios.get(equiposURL)
            .then(response => {
                console.log("Equipos: " + JSON.stringify(response.data));
                setEquipos(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const getCategorias = async () => {
        await axios.get(categoriasURL)
            .then(response => {
                setCategorias(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const getJugadores = async (equipoID) => {
        const response = await fetch(jugadoresEquipoURL + equipoID, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        var res = await response.json();
        console.log("Jugadores response: " + JSON.stringify(res));
        return res;
    }

    const getJugadoresEquipo = async (equipoID) => {
        await axios.get(jugadoresEquipoURL + equipoID)
            .then(response => {
                console.log("Jugadores Equipo response: " + JSON.stringify(response.data));
                setJugadoresRes(response.data);
                console.log("Jugadores Equipo response 2: " + JSON.stringify(jugadoresRes));

            }).catch(error => {
                console.log(error);
            })
    }

    const formValidationSchema = Yup.object({
        equipoGanador: Yup
            .string('Ingrese el Equipo ganador')
            .required('Equipo Ganador es requerido'),
        equipoPerdedor: Yup
            .string('Ingrese el equipo B')
            .required('Equipo Perdedor es requerido'),

        puntosEquipoGanador: Yup
            .number('Ingrese los Puntos Equipo Ganador')
            .min(0, 'Puntos Equipo Ganador debe ser mínimo 0')
            .max(200, "Puntos Equipo Ganador debe ser máximo 200")
            .required('Puntos Equipo Ganador es requerido'),
        puntosEquipoPerdedor: Yup
            .number('Ingrese los Puntos Equipo Perdedor')
            .min(0, 'Puntos Equipo Perdedor debe ser mínimo 0')
            .max(200, "Puntos Equipo Perdedor debe ser máximo 200")
            .required('Puntos Equipo Perdedor es requerido'),
        horaInicial: Yup
            .date()
            .nullable()
            .required('Hora Inicial es requerido'),
        horaFinal: Yup
            .date()
            .nullable()
            .required('Hora Final es requerido'),
        fechaPartido: Yup
            .date()
            .nullable()
            .required('Fecha de partido es requerido'),
        lugar: Yup
            .string('Ingrese el Lugar')
            .min(2, 'Lugar debe ser mínimo 2 caracteres')
            .max(255, "Lugar debe ser máximo 255 caracteres")
            .required('Lugar es requerido'),
        categoria: Yup
            .string('Ingrese la categoria')
            .required('Categoria es requerido'),
        observaciones: Yup
            .string('Ingrese las observaciones')
            .min(2, 'Observaciones debe ser mínimo 2 caracteres')
            .max(255, "Observaciones debe ser máximo 255 caracteres")

    });

    const { handleSubmit, resetForm, handleChange, values, touched, errors, handleBlur, setFieldValue } = useFormik({
        initialValues: {
            equipoGanador: '',
            equipoPerdedor: '',
            categoria: '',
            lugar: '',
            observaciones: '',
            fechaPartido: null,
            horaInicial: null,
            horaFinal: null,
            puntosEquipoGanador: '',
            puntosEquipoPerdedor: ''
        },

        validationSchema: formValidationSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            registrarPartido();

            setSubmitting(true);
            setTimeout(() => {
                //resetForm();
                setSubmitting(false);
            }, 4000);
        },
    });

    // Realiza un POST al API de crear Boleta en backend

    const postPartido = async (url, datos) => {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response;
    }

    // Construimos una Boleta con los datos introducidos

    const registrarPartido = async () => {

        var formatedFechaPartido = values.fechaPartido.format('YYYY-MM-DD');
        var formatedHoraInicial = values.horaPartido.format('HH:mm');
        var formatedHoraFinal = values.horaFinal.format('HH:mm');

        const datos = {
            "Equipo_Ganador": values.equipoGanador,
            "Equipo_Perdedor": values.equipoPerdedor,
            "Categoria": values.categoria,
            "Lugar": values.lugar,
            "Hora_Inicial": formatedHoraInicial,
            "Hora_Final": formatedHoraFinal,
            "Fecha": formatedFechaPartido,
            "Puntos_Equipo_Ganador": 0,
            "Puntos_Equipo_Perdedor": 0,
            "Jugadores": []
        };

        console.log("Partido: ------> " + JSON.stringify(datos));
        // Validar fechas

        if (values.equipoGanador !== values.equipoPerdedor) {

            const respuestaJson = await postPartido(registrarPartidoURL, datos);

            console.log("Response:------> " + respuestaJson.status);
            if (respuestaJson.status === 201) {

                setAlertColor("success");
                setAlertContent("Partido registrado exitosamente");
                setOpen(true);
                borrar();
            }

            if (respuestaJson.status === 400) {
                var errorRes = await respuestaJson.json();
                console.log("Error Response---" + JSON.stringify(errorRes));

                if (errorRes.errorCode === "23505") {
                    setAlertColor("error");
                    setAlertContent("El partido ya fue registrado");
                    setOpen(true);
                }
            }
        } else {
            setAlertColor("error");
            setAlertContent("Los equipos no pueden ser iguales");
            setOpen(true);
        }
    }

    function borrar() {
        return resetForm();
    }

    useEffect(() => {
        getEquipos();
        getCategorias();
        getTorneo();

    }, [])

    return (
        <Grid justifyItems='center'>
            <Snackbar open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity={alertColor} onClose={handleClose}>
                    {alertContent}
                </Alert>
            </Snackbar>

            <Typography variant="h3"
                align='center'
                color="#ffff"
                sx={{
                    input: { color: 'white' }
                }}>
                Registrar Resultados de Partido
            </Typography>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            <form onSubmit={handleSubmit}>

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
                                }}>Equipo Ganador</InputLabel>
                            <Select
                                required
                                id="equipoGanador"
                                name="equipoGanador"
                                label="Equipo Ganador"
                                sx={{
                                    '& .MuiInputBase-input': {
                                        color: 'white'

                                    },
                                    '& .MuiSelect-iconStandard': {
                                        color: 'white'
                                    }
                                }}
                                onChange={(e) => {
                                    handleChange(e);
                                    getRowsEquipGan(e.target.value);
                                }}
                                onBlur={handleBlur}
                                value={values.equipoGanador}
                                error={touched.equipoGanador && Boolean(errors.equipoGanador)}
                                helperText={touched.equipoGanador && errors.equipoGanador}
                            >
                                {equipos.map(({ id, Nombre_Equipo }, index) => (
                                    <MenuItem key={index} value={Nombre_Equipo}>
                                        {Nombre_Equipo}
                                    </MenuItem>
                                ))}
                            </Select>

                            {touched.equipoGanador && errors.equipoGanador ? (
                                <FormHelperText
                                    sx={{ color: "#d32f2f", marginLeft: "!important" }}
                                >
                                    {touched.equipoGanador && errors.equipoGanador}
                                </FormHelperText>
                            ) : null}

                        </FormControl>
                    </Grid>
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
                                }}>Equipo Perdedor</InputLabel>
                            <Select
                                required
                                id="equipoPerdedor"
                                name="equipoPerdedor"
                                label="Equipo Perdedor"
                                sx={{
                                    '& .MuiInputBase-input': {
                                        color: 'white'

                                    },
                                    '& .MuiSelect-iconStandard': {
                                        color: 'white'
                                    }
                                }}
                                onChange={(e) => {
                                    handleChange(e);
                                    getRowsEquipPer(e.target.value);
                                }}
                                onBlur={handleBlur}
                                value={values.equipoPerdedor}
                                error={touched.equipoPerdedor && Boolean(errors.equipoPerdedor)}
                                helperText={touched.equipoPerdedor && errors.equipoPerdedor}
                            >
                                {equipos.map(({ id, Nombre_Equipo }, index) => (
                                    <MenuItem key={index} value={Nombre_Equipo}>
                                        {Nombre_Equipo}
                                    </MenuItem>
                                ))}
                            </Select>

                            {touched.equipoPerdedor && errors.equipoPerdedor ? (
                                <FormHelperText
                                    sx={{ color: "#d32f2f", marginLeft: "!important" }}
                                >
                                    {touched.equipoPerdedor && errors.equipoPerdedor}
                                </FormHelperText>
                            ) : null}

                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            type="number"
                            id="puntosEquipoGanador"
                            name="puntosEquipoGanador"
                            label="Puntos Equipo Ganador"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.puntosEquipoGanador}
                            error={touched.puntosEquipoGanador && Boolean(errors.puntosEquipoGanador)}
                            helperText={touched.puntosEquipoGanador && errors.puntosEquipoGanador}
                            InputLabelProps={{
                                style: { color: '#ffff' },
                            }}
                            sx={{
                                color: 'white',
                                '& .MuiInputBase-root': { color: 'white' }
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            type="number"
                            id="puntosEquipoPerdedor"
                            name="puntosEquipoPerdedor"
                            label="Puntos Equipo Perdedor"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.puntosEquipoPerdedor}
                            error={touched.puntosEquipoPerdedor && Boolean(errors.puntosEquipoPerdedor)}
                            helperText={touched.puntosEquipoPerdedor && errors.puntosEquipoPerdedor}
                            InputLabelProps={{
                                style: { color: '#ffff' },
                            }}
                            sx={{
                                color: 'white',
                                '& .MuiInputBase-root': { color: 'white' }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <TimePicker
                                label="Hora Inicial"
                                value={values.horaInicial}
                                onChange={(value) => setFieldValue("horaInicial", value, true)}
                                renderInput={(params) => {
                                    return <TextField {...params}
                                        variant="standard"
                                        fullWidth
                                        required
                                        onBlur={handleBlur}
                                        error={touched.horaInicial && Boolean(errors.horaInicial)}
                                        helperText={touched.horaInicial && errors.horaInicial}
                                        InputLabelProps={{ style: { color: 'white' } }}
                                        sx={{
                                            '.MuiSvgIcon-root ': {
                                                fill: "white !important",

                                            },
                                            '& .MuiInputBase-input': {
                                                color: 'white'

                                            }
                                        }}
                                    />;
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <TimePicker
                                label="Hora Final"
                                value={values.horaFinal}
                                onChange={(value) => setFieldValue("horaFinal", value, true)}
                                renderInput={(params) => {
                                    return <TextField {...params}
                                        variant="standard"
                                        fullWidth
                                        required
                                        onBlur={handleBlur}
                                        error={touched.horaFinal && Boolean(errors.horaFinal)}
                                        helperText={touched.horaFinal && errors.horaFinal}
                                        InputLabelProps={{ style: { color: 'white' } }}
                                        sx={{
                                            '.MuiSvgIcon-root ': {
                                                fill: "white !important",

                                            },
                                            '& .MuiInputBase-input': {
                                                color: 'white'

                                            }
                                        }}
                                    />;
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DesktopDatePicker
                                label="Fecha"
                                inputFormat="DD/MM/YYYY"
                                value={values.fechaPartido}
                                onChange={(value) => setFieldValue("fechaPartido", value, true)}
                                minDate={moment(new Date())}
                                maxDate={moment(new Date(fechaFinTorneo))}
                                renderInput={(params) => {
                                    return <TextField {...params}
                                        variant="standard"
                                        fullWidth
                                        required
                                        onBlur={handleBlur}
                                        error={touched.fechaPartido && Boolean(errors.fechaPartido)}
                                        helperText={touched.fechaPartido && errors.fechaPartido}
                                        InputLabelProps={{ style: { color: 'white' } }}
                                        sx={{
                                            '.MuiSvgIcon-root ': {
                                                fill: "white !important",
                                            },
                                            '& .MuiInputBase-input': {
                                                color: 'white'

                                            }
                                        }}
                                    />;
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="lugar"
                            name="lugar"
                            label="Lugar"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lugar}
                            error={touched.lugar && Boolean(errors.lugar)}
                            helperText={touched.lugar && errors.lugar}
                            multiline
                            InputLabelProps={{
                                style: { color: "#ffff" },
                            }}
                            sx={{
                                color: "white",
                                "& .MuiInputBase-root": { color: "white" },
                            }}
                        />
                    </Grid>


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

                                id="categoria"
                                name="categoria"
                                label="Categoria"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.categoria}
                                error={touched.categoria && Boolean(errors.categoria)}
                                helperText={touched.categoria && errors.categoria}
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
                            {touched.categoria && errors.categoria ? (
                                <FormHelperText
                                    sx={{ color: "#d32f2f", marginLeft: "!important" }}
                                >
                                    {touched.categoria && errors.categoria}
                                </FormHelperText>
                            ) : null}
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="observaciones"
                            name="observaciones"
                            label="Observaciones"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.observaciones}
                            error={touched.observaciones && Boolean(errors.observaciones)}
                            helperText={touched.observaciones && errors.observaciones}
                            multiline
                            InputLabelProps={{
                                style: { color: "#ffff" },
                            }}
                            sx={{
                                color: "white",
                                "& .MuiInputBase-root": { color: "white" },
                            }}
                        />
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6"
                            align='left'
                            color="#ffff"
                            sx={{
                                input: { color: 'white' }
                            }}>
                            Jugadores Equipo Ganador
                        </Typography>
                        <br></br>
                        <div style={{ height: 300, width: '100%' }}>
                            <DataGrid
                                sx={{
                                    color: 'white',
                                    '& .MuiDataGrid-columnHeaderTitle': { color: 'orange' },
                                    '& .MuiDataGrid-cellContent': { color: 'white' }
                                }}
                                rows={jugadoresEquipoGan ? jugadoresEquipoGan : []}
                                columns={columns} />
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6"
                            align='left'
                            color="#ffff"
                            sx={{
                                input: { color: 'white' }
                            }}>
                            Jugadores Equipo Perdedor
                        </Typography>
                        <br></br>
                        <div style={{ height: 300, width: '100%', }}>
                            <DataGrid
                                sx={{
                                    color: 'white',
                                    '& .MuiDataGrid-columnHeaderTitle': { color: 'orange' },
                                    '& .MuiDataGrid-cellContent': { color: 'white' }
                                }}
                                rows={jugadoresEquipoPer ? jugadoresEquipoPer : []}
                                columns={columns} />
                        </div>
                    </Grid>
                </Grid>

                <Stack m={9}
                    direction="row"
                    spacing={3}
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        type="submit"
                        sx={{ width: '25%' }}
                    >Registrar
                    </Button>
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={borrar}
                        sx={{ width: '25%' }}
                    >Cancelar
                    </Button>
                </Stack>
            </form >
        </Grid >

    );
}

export default RegistrarResultadoPartido;