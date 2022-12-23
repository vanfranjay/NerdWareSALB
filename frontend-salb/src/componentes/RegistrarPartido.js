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


const RegistrarPartido = () => {
    var userID = localStorage.getItem('userID');
    const [open, setOpen] = React.useState(false);
    const [alertColor, setAlertColor] = useState('');
    const [alertContent, setAlertContent] = useState('');
    const [torneo, setTorneo] = useState([]);
    const [torneoID, setTorneoID] = useState([]);
    const [fechaFinTorneo, setFechaFinTorneo] = useState([]);
    const [equipos, setEquipos] = useState([]);
    const [equiposCategoriaSel, setEquiposCategoriaSel] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [categoriasTorneo, setCategoriasTorneo] = useState([]);
    const [categoria, setCategoria] = useState([]);

    const EQUIPOS_URL = configData.EQUIPOS_API_URL || "http://127.0.0.1:8000/api/equipos";
    const TORNEOS_URL = configData.TORNEOS_API_URL || "http://127.0.0.1:8000/api/torneos";
    const PARTIDOS_URL = configData.PARTIDOS_API_URL || "http://127.0.0.1:8000/api/rol_partidos";
    const CATEGORIAS_URL = configData.CATEGORIAS_API_URL || "http://127.0.0.1:8000/api/categorias";
    const DELEGADO_URL = configData.DELEGADO_API_URL || "http://127.0.0.1:8000/api/delegados";

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const getTorneo = async () => {
        await axios.get(TORNEOS_URL)
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
        await axios.get(EQUIPOS_URL + '/' + userID)
            .then(response => {
                setEquipos(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const getDelegado = async (url) => {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response;
    }

    const getCategorias = async () => {
        await axios.get(CATEGORIAS_URL)
            .then(response => {
                setCategorias(filtrarCategoriasDelTorneo(response.data));
            }).catch(error => {
                console.log(error);
            })
    }

    const filtrarCategoriasDelTorneo = async (categoriasData) => {
        const resDelegado = await getDelegado(DELEGADO_URL + '/' + userID);
        var delegado = await resDelegado.json();

        var filteredCategorias = categoriasData.filter(categoria => categoria.Cod_Torneo == delegado.Cod_Torneo);

        setCategoriasTorneo(filteredCategorias);
        console.log("Categorias Filtradas : " + JSON.stringify(filteredCategorias));
        return filteredCategorias;
    }


    const formValidationSchema = Yup.object({
        categoria: Yup
            .string('Ingrese la categoria')
            .required('Categoria es requerido'),
        equipoA: Yup
            .string('Ingrese el equipo A')
            .required('Equipo A es requerido'),
        equipoB: Yup
            .string('Ingrese el equipo B')
            .required('Equipo B es requerido'),
        fechaPartido: Yup
            .date()
            .nullable()
            .required('Fecha de partido es requerido'),
        horaPartido: Yup
            .date()
            .nullable()
            .required('Hora del partido es requerido'),
        lugar: Yup
            .string('Ingrese el Lugar')
            .min(2, 'Lugar debe ser mínimo 2 caracteres')
            .max(30, "Lugar debe ser máximo 30 caracteres")
            .required('Lugar es requerido'),
        cancha: Yup
            .string('Ingrese el Número de Cancha')
            .required('Número de Cancha es requerido'),


    });

    const { handleSubmit, resetForm, handleChange, values, touched, errors, handleBlur, setFieldValue } = useFormik({
        initialValues: {
            categoria: '',
            equipoA: '',
            equipoB: '',
            fechaPartido: null,
            horaPartido: null,
            lugar: '',
            cancha: 0
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
        var formatedHoraPartido = values.horaPartido.format('HH:mm');

        var selectedCategoria = categoriasTorneo.find(categoria => categoria.Categoria === values.categoria);
        console.log("Categoria ID: " + selectedCategoria);

        const datos = {
            "Fecha": formatedFechaPartido,
            "Hora": formatedHoraPartido,
            "EquipoA": values.equipoA,
            "EquipoB": values.equipoB,
            "Cod_Torneo": torneoID,
            "Lugar": values.lugar,
            "Cancha": values.cancha,
            "Cod_Categoria": selectedCategoria.id
        };

        console.log("Partido: ------> " + JSON.stringify(datos));
        // Validar fechas

        var date = moment(values.fechaPartido);
        var time = moment(values.horaPartido, 'HH:mm');

        date.set({
            hour: time.get('hour'),
            minute: time.get('minute'),
            second: time.get('second')
        });

        var esHoraMayor = moment(date) > new Date();
        if ((values.equipoA !== values.equipoB) && esHoraMayor) {

            const respuestaJson = await postPartido(PARTIDOS_URL, datos);

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

                var errorFechaEquipoA = "El equipo A seleccionado ya tiene un partido programado en la fecha seleccionada"

                if (errorRes.errorMessage === errorFechaEquipoA) {
                    setAlertColor("error");
                    setAlertContent(errorFechaEquipoA);
                    setOpen(true);
                }

                var errorFechaEquipoB = "El equipo B seleccionado ya tiene un partido programado en la fecha seleccionada"
                if (errorRes.errorMessage === errorFechaEquipoB) {
                    setAlertColor("error");
                    setAlertContent(errorFechaEquipoB);
                    setOpen(true);
                }

                var errorCancha = "La cancha seleccionada ya esta ocupada en la hora solicitada"
                if (errorRes.errorMessage === errorCancha) {
                    setAlertColor("error");
                    setAlertContent(errorCancha);
                    setOpen(true);
                }
            }
        } else {
            if (!esHoraMayor) {
                setAlertColor("error");
                setAlertContent("La hora debe ser mayor a la actual");
                setOpen(true);
            } else {
                setAlertColor("error");
                setAlertContent("Los equipos no pueden ser iguales");
                setOpen(true);
            }

        }
    }

    const getEquiposPorCategoria = (categoria) => {

        console.log("Categoria: ", categoria);

        getEquipos();
        var equiposCategoria = equipos.filter(equipo => equipo.Categoria === categoria);

        console.log("Categorias filtered: ", equiposCategoria);
        setEquipos(equiposCategoria);

        setEquiposCategoriaSel(equiposCategoria);

    };

    const handleChangeCategoria = (event) => {
        setCategoria(event.target.value);
        setEquiposCategoriaSel(null);
        getEquiposPorCategoria(event.target.value);
    };

    function borrar() {
        return resetForm();
    }

    useEffect(() => {
        getCategorias();
        getTorneo();
        getEquipos();
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
                Registrar Partido
            </Typography>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            <form onSubmit={handleSubmit}>

                <Grid container spacing={5}>

                    <Grid item xs={12} sm={6} >
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
                                value={values.categoria}
                                onChange={(e) => {
                                    setFieldValue("categoria", e.target.value);
                                    handleChangeCategoria(e);
                                }}
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
                                {categoriasTorneo ? categoriasTorneo.map(({ id, Categoria }, index) => (
                                    <MenuItem key={index} value={Categoria}>
                                        {Categoria}
                                    </MenuItem>
                                )) : []}
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
                    <Grid item xs={12} sm={6} >
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
                                }}>Equipo A</InputLabel>
                            <Select
                                required
                                id="equipoA"
                                name="equipoA"
                                label="Equipo A"
                                sx={{
                                    '& .MuiInputBase-input': {
                                        color: 'white'

                                    },
                                    '& .MuiSelect-iconStandard': {
                                        color: 'white'
                                    }
                                }}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.equipoA}
                                error={touched.equipoA && Boolean(errors.equipoA)}
                                helperText={touched.equipoA && errors.equipoA}
                            >
                                {equiposCategoriaSel ?
                                    equiposCategoriaSel.map(({ id, Nombre_Equipo }, index) => (
                                        <MenuItem key={index} value={Nombre_Equipo}>
                                            {Nombre_Equipo}
                                        </MenuItem>
                                    ))
                                    : []}
                            </Select>

                            {touched.equipoA && errors.equipoA ? (
                                <FormHelperText
                                    sx={{ color: "#d32f2f", marginLeft: "!important" }}
                                >
                                    {touched.equipoA && errors.equipoA}
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
                                }}>Equipo B</InputLabel>
                            <Select
                                required
                                id="equipoB"
                                name="equipoB"
                                label="Equipo B"
                                sx={{
                                    '& .MuiInputBase-input': {
                                        color: 'white'

                                    },
                                    '& .MuiSelect-iconStandard': {
                                        color: 'white'
                                    }
                                }}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.equipoB}
                                error={touched.equipoB && Boolean(errors.equipoB)}
                                helperText={touched.equipoB && errors.equipoB}
                            >
                                {equiposCategoriaSel ?
                                    equiposCategoriaSel.map(({ id, Nombre_Equipo }, index) => (
                                        <MenuItem key={index} value={Nombre_Equipo}>
                                            {Nombre_Equipo}
                                        </MenuItem>
                                    ))
                                    : []}
                            </Select>

                            {touched.equipoB && errors.equipoB ? (
                                <FormHelperText
                                    sx={{ color: "#d32f2f", marginLeft: "!important" }}
                                >
                                    {touched.equipoB && errors.equipoB}
                                </FormHelperText>
                            ) : null}

                        </FormControl>
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
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <TimePicker
                                label="Hora"
                                value={values.horaPartido}
                                onChange={(value) => setFieldValue("horaPartido", value, true)}
                                renderInput={(params) => {
                                    return <TextField {...params}
                                        variant="standard"
                                        fullWidth
                                        required
                                        onBlur={handleBlur}
                                        error={touched.horaPartido && Boolean(errors.horaPartido)}
                                        helperText={touched.horaPartido && errors.horaPartido}
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
                            type="text"
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
                            id="cancha"
                            name="cancha"
                            label="Numero de Cancha"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.cancha}
                            error={touched.cancha && Boolean(errors.cancha)}
                            helperText={touched.cancha && errors.cancha}
                            InputLabelProps={{
                                style: { color: '#ffff' },
                            }}
                            sx={{
                                color: 'white',
                                '& .MuiInputBase-root': { color: 'white' }
                            }}
                        />
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
            </form>
        </Grid>

    );
}

export default RegistrarPartido;