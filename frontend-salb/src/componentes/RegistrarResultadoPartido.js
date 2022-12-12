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
import { DataGrid, useGridApiContext } from '@mui/x-data-grid';

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

    function setPuntos(params) {
        var jugadoresActualizados = [];
        var object = params.row;
        object.puntos = params.value;
        var jugadoresAll = jugadores;
        jugadoresAll.forEach(function (item) {
            if (item.id === object.id) {
                jugadoresActualizados.push(object);
            } else {
                jugadoresActualizados.push(item);
            }
        });
        jugadores = jugadoresActualizados;
        const [puntos] = params.value;
        params.row.puntos = params.value;
        return { ...params.row };
    }

    function setFaltas(params) {
        var jugadoresActualizados = [];
        var object = params.row;
        object.faltas = params.value;
        var jugadoresAll = jugadores;
        jugadoresAll.forEach(function (item) {
            if (item.id === object.id) {
                jugadoresActualizados.push(object);
            } else {
                jugadoresActualizados.push(item);
            }
        });
        jugadores = jugadoresActualizados;
        const [faltas] = params.value;
        params.row.faltas = params.value;
        return { ...params.row };
    }

    const columns = [
        { field: 'jugador', headerName: 'Jugador', width: 250, editable: false },
        { field: 'puntos', headerName: 'Puntos', width: 130, editable: true, valueSetter: setPuntos },
        { field: 'faltas', headerName: 'Faltas', width: 130, editable: true, valueSetter: setFaltas },

    ];

    const [open, setOpen] = React.useState(false);
    const [alertColor, setAlertColor] = useState('');
    const [alertContent, setAlertContent] = useState('');

    const TORNEOS_URL = configData.TORNEOS_API_URL || "http://127.0.0.1:8000/api/torneos";
    const PARTIDOS_URL = configData.PARTIDOS_API_URL || "http://127.0.0.1:8000/api/rol_partidos";
    const EQUIPOS_URL = configData.EQUIPOS_API_URL || "http://127.0.0.1:8000/api/equipos";
    const CATEGORIAS_URL = configData.CATEGORIAS_API_URL || "http://127.0.0.1:8000/api/categorias";
    const JUGADOR_EQUIPO_URL = configData.JUGADOR_EQUIPO_API_URL || "http://127.0.0.1:8000/api/jugeq1";
    const PARTIDO_EQUIPO_URL = configData.PARTIDO_EQUIPO_API_URL || "http://127.0.0.1:8000/api/pareq";

    const [categorias, setCategorias] = useState([]);
    const [torneo, setTorneo] = useState([]);
    const [torneoID, setTorneoID] = useState([]);
    //const [partido, setPartido] = useState([]);
    const [partidos, setPartidos] = useState([]);
    const [fechaFinTorneo, setFechaFinTorneo] = useState([]);
    const [equipos, setEquipos] = useState([]);
    const [jugadoresRes, setJugadoresRes] = useState([]);
    const [jugadoresEquipoGan, setJugadoresEquipoGan] = useState([]);
    const [jugadoresEquipoPer, setJugadoresEquipoPer] = useState([]);
    const [equiposPartidoSel, setEquiposPartidoSel] = useState([]);
    const [selectedPartido, setSelectedPartido] = useState([]);
    const [partidosFinalizados, setPartidosFinalizados] = useState([]);


    var jugadores = jugadoresEquipoGan.concat(jugadoresEquipoPer);

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const processRowUpdate = React.useCallback(
        async (newRow) => {
            // Make the HTTP request to save in the backend
            //const response = await mutateRow(newRow);
            //setSnackbar({ children: 'User successfully saved', severity: 'success' });
            //return response;
            console.log("new row updated: " + newRow);
        }
    );

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

    const cargarEquiposPartido = async (idPartido) => {

        console.log("Selected Partido id: " + idPartido);
        var selectedPartido = partidos ? partidos.find(equipo => equipo.id === idPartido) : null;

        console.log("Selected Partido: " + selectedPartido);

        var equipos = [];

        if (selectedPartido != null) {

            equipos.push({ Nombre_Equipo: selectedPartido.EquipoA, Cod_Partido: idPartido });
            equipos.push({ Nombre_Equipo: selectedPartido.EquipoB, Cod_Partido: idPartido });

            setEquiposPartidoSel(equipos);

            console.log("Equipos: " + JSON.stringify(equipos));
        }



    }

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
        await axios.get(EQUIPOS_URL)
            .then(response => {
                console.log("Equipos: " + JSON.stringify(response.data));
                setEquipos(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const getCategorias = async () => {
        await axios.get(CATEGORIAS_URL)
            .then(response => {
                setCategorias(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const getPartidos = async () => {
        await axios.get(PARTIDOS_URL)
            .then(response => {
                var partidos = filtrarPartidos(response.data);
                console.log("Partidos: " + JSON.stringify(partidos));
                setPartidos(partidos);
            }).catch(error => {
                console.log(error);
            })
    }

    const filtrarPartidos = async (partidos) => {
        var partidosJugados = partidos.filter(partido => new Date(partido.Fecha) < new Date());
        setPartidosFinalizados(partidosJugados);
        return partidosJugados;
    }

    const getJugadores = async (equipoID) => {
        const response = await fetch(JUGADOR_EQUIPO_URL + '/' + equipoID, {
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
        await axios.get(JUGADOR_EQUIPO_URL + '/' + equipoID)
            .then(response => {
                console.log("Jugadores Equipo response: " + JSON.stringify(response.data));
                setJugadoresRes(response.data);
                console.log("Jugadores Equipo response 2: " + JSON.stringify(jugadoresRes));

            }).catch(error => {
                console.log(error);
            })
    }

    const formValidationSchema = Yup.object({
        partido: Yup
            .string('Ingrese el Equipo ganador')
            .required('Equipo Ganador es requerido'),
        horaFinal: Yup
            .date()
            .nullable()
            .required('Hora Final es requerido'),
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

    });

    const { handleSubmit, resetForm, handleChange, values, touched, errors, handleBlur, setFieldValue } = useFormik({
        initialValues: {
            equipoGanador: '',
            equipoPerdedor: '',
            horaFinal: null,
            puntosEquipoGanador: '',
            puntosEquipoPerdedor: ''
        },

        validationSchema: formValidationSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            registrarResPartido();
            //registrarResPartidoJugadores();

            setSubmitting(true);
            setTimeout(() => {
                //resetForm();
                setSubmitting(false);
            }, 4000);
        },
    });

    // Realiza un POST al API de crear Boleta en backend

    const postRegistrarResPartido = async (datos) => {
        const response = await fetch(PARTIDO_EQUIPO_URL, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response;
    }

    const postRegistrarResPartidoJugs = async (datos) => {
        const response = await fetch(JUGADOR_EQUIPO_URL, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response;
    }

    const registrarResPartido = async () => {

        var formatedFechaPartido = values.fechaPartido.format('YYYY-MM-DD');
        var formatedHoraInicial = values.horaInicial.format('HH:mm');
        var formatedHoraFinal = values.horaFinal.format('HH:mm');

        console.log("Selected Partido: " + values.partido)

        const datosPartido = {
            "E_Ganador": values.equipoGanador,
            "E_Perdedor": values.equipoPerdedor,
            "Puntos_Ganador": values.puntosEquipoGanador,
            "Puntos_Perdedor": values.puntosEquipoPerdedor,
            "Categoria": "+35",
            "Lugar": values.partido,
            "Cancha": "",
            "Cod_EquipoG": 2,
            "Cod_EquipoP": 4,
            "Hora_Inicio": "",
            "Hora_Final": formatedHoraFinal,
            "Fecha_Partido": formatedFechaPartido
        };

        var datosJugadores = jugadoresEquipoGan.concat(jugadoresEquipoPer);

        console.log("Partido datos: " + JSON.stringify(datosPartido));

        console.log("Jugadores datos: " + JSON.stringify(datosJugadores));

        if (values.equipoGanador !== values.equipoPerdedor) {

            const resRegResPar = await postRegistrarResPartido(datosPartido);
            const resRegResParJugs = await postRegistrarResPartidoJugs(datosJugadores);

            if (resRegResPar.status === 200 && resRegResParJugs.status === 200) {
                setAlertColor("success");
                setAlertContent("Resultados de Partido registrado exitosamente");
                setOpen(true);
                setJugadoresEquipoGan([]);
                setJugadoresEquipoPer([]);
                borrar();
            }

            if (resRegResPar.status === 400) {
                var errorRes = await resRegResPar.json();
                console.log("Error Response---" + JSON.stringify(errorRes));

                if (errorRes.ErrorMessage === "Ponga el mayor puntaje al equipo ganador") {
                    setAlertColor("error");
                    setAlertContent("Ponga el mayor puntaje al equipo ganador");
                    setOpen(true);
                }
                if (errorRes.ErrorMessage === "El resultado del partido ya se guardo anteriormente") {
                    setAlertColor("error");
                    setAlertContent("El resultado del partido ya se guardo anteriormente");
                    setOpen(true);
                }
            }
        } else {
            setAlertColor("error");
            setAlertContent("Los equipos no pueden ser iguales");
            setOpen(true);
        }
    }

    const handleChangePartido = (event) => {
        setSelectedPartido(event.target.value);
    };

    function borrar() {
        setSelectedPartido([]);
        document.getElementByName("partido").value = "";
        return resetForm();

    }

    useEffect(() => {
        getPartidos();
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
                                }}>Partido</InputLabel>
                            <Select
                                required
                                id="partido"
                                name="partido"
                                label="Partido"
                                sx={{
                                    '& .MuiInputBase-input': {
                                        color: 'white'

                                    },
                                    '& .MuiSelect-iconStandard': {
                                        color: 'white'
                                    }
                                }}
                                onChange={(e) => {
                                    handleChangePartido(e);
                                    cargarEquiposPartido(e.target.value);
                                }}


                                error={touched.partido && Boolean(errors.partido)}
                                helperText={touched.partido && errors.partido}
                            >
                                {partidosFinalizados ? partidosFinalizados.map(({ id, EquipoA, EquipoB, Fecha, Hora }, index) => (
                                    <MenuItem key={index} value={id}>
                                        {EquipoA} vs {EquipoB} - {Fecha} - {Hora}
                                    </MenuItem>
                                )) : []}
                            </Select>

                            {touched.partido && errors.partido ? (
                                <FormHelperText
                                    sx={{ color: "#d32f2f", marginLeft: "!important" }}
                                >
                                    {touched.partido && errors.partido}
                                </FormHelperText>
                            ) : null}

                        </FormControl>
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
                                value={values.equipoGanador}
                                error={touched.equipoGanador && Boolean(errors.equipoGanador)}
                                helperText={touched.equipoGanador && errors.equipoGanador}
                            >
                                {equiposPartidoSel ? equiposPartidoSel.map(({ Nombre_Equipo, Cod_Partido }, index) => (
                                    <MenuItem key={index} value={Nombre_Equipo}>
                                        {Nombre_Equipo}
                                    </MenuItem>
                                )) : []}
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
                                {selectedPartido ? equiposPartidoSel.map(({ Nombre_Equipo, Cod_Partido }, index) => (
                                    <MenuItem key={index} value={Nombre_Equipo}>
                                        {Nombre_Equipo}
                                    </MenuItem>
                                )) : []}
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
                                processRowUpdate={processRowUpdate}
                                experimentalFeatures={{ newEditingApi: true }}
                                rows={jugadoresEquipoGan ? jugadoresEquipoGan : []}
                                columns={columns}
                            />
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
                                processRowUpdate={processRowUpdate}
                                experimentalFeatures={{ newEditingApi: true }}
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