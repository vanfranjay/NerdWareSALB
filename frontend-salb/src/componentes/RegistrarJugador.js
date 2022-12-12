import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SelectCategoria from './SelectCategoria';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { FormHelperText, Grid } from '@mui/material';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';
import '../css/usuario.css';
import { useFormik, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import { Container, Stack } from '@mui/system';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
//Setup for Datepicker
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from "moment";
import "moment/locale/es";
import axios from "axios";
import configData from "../config/config.json";
import { useNavigate } from "react-router-dom";

const RegistrarJugador = () => {

    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
    const FILE_SIZE = 7340032; // 7MB de tamaño del archivo
    const phoneRegExp = /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/;
    const navigate = useNavigate();

    const [selectedFileFotoDNI, setSelectedFileFotoDNI] = useState();
    const [selectedFileFotoParticipante, setSelectedFileFotoParticipante] = useState();

    const [open, setOpen] = React.useState(false);
    const [alertColor, setAlertColor] = useState('');
    const [alertContent, setAlertContent] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [equipos, setEquipos] = useState([]);

    var maxFechaNac = moment().subtract(18, "years").format("YYYY-MM-DD");

    var codEquipo = localStorage.getItem("equipoId");
    var codCategoria = localStorage.getItem("categoriaId");
    var categoriaEquipo = localStorage.getItem("categoriaValue");

    const EQUIPOS_URL = configData.EQUIPOS_API_URL || "http://127.0.0.1:8000/api/equipos";
    const JUGADORES_URL = configData.JUGADORES_API_URL || "http://127.0.0.1:8000/api/jugadores";
    const EQUIPO_DELEGADO_URL = configData.EQUIPO_DELEGADO_API_URL || "http://127.0.0.1:8000/api/deleq/";
    const JUGADOR_EQUIPO_URL = "http://127.0.0.1:8000/api/jugeq/";
    const CATEGORIAS_URL = configData.CATEGORIAS_API_URL || "http://127.0.0.1:8000/api/categorias";

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const getCategorias = async () => {
        await axios.get(CATEGORIAS_URL)
            .then(response => {
                setCategorias(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const getEquipos = async () => {
        await axios.get(EQUIPOS_URL)
            .then(response => {
                setEquipos(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const formValidationSchema = Yup.object({

        equipo: Yup
            .string('Ingrese el equipo')
            .required('Equipo es requerido'),
        nombreParticipante: Yup
            .string('Ingrese el Nombre del participante')
            .min(2, 'Nombre del participante debe ser mínimo 2 caracteres')
            .max(50, "Nombre del participante debe ser máximo 50 caracteres")
            .matches(/^[A-Za-z\s]*$/, "El nombre solo debe tener letras y espacios")
            .required('Nombre del participante es requerido'),
        apellidoParticipante: Yup
            .string('Ingrese el Apellido del participante')
            .min(2, 'Nombre del equipo debe ser mínimo 2 caracteres')
            .max(50, "Nombre del equipo debe ser máximo 50 caracteres")
            .matches(/^[A-Za-z\s]*$/, "El nombre solo debe tener letras y espacios")
            .required('Nombre del equipo es requerido'),
        fechaNacParticipante: Yup
            .date()
            .nullable()
            .required('Fecha de nacimiento es requerido'),
        telefonoParticipante: Yup
            .string("Ingrese el teléfono")
            .required('Telefono del participante es requerido')
            .matches(phoneRegExp, 'El Telefono no es válido')
            .min(7, 'Telefono del participante debe ser mínimo 7 caracteres')
            .max(20, "Telefono del participante debe ser máximo 20 caracteres"),
        emailParticipante: Yup
            .string()
            .nullable(),
        rolParticipante: Yup
            .string('Ingrese el rol del participante'),
        dniParticipante: Yup
            .string()
            .required('DNI del participante es requerido')
            .min(5, 'DNI del participante debe ser mínimo 5 caracteres')
            .max(30, "DNI del participante debe ser máximo 30 caracteres"),
        direccionParticipante: Yup
            .string()
            .min(4, 'Direccion del participante debe ser mínimo 4 caracteres')
            .max(150, "Direccion del participante debe ser máximo 150 caracteres")
            .required('Direccion del participante es requerido'),
        fotoDNIParticipante: Yup.mixed()
            .nullable()
            .required('Foto del DNI del participante es requerido')
            .test("fileSize",
                "El tamaño del archivo sobre pasa los 7MB",
                value => !value || (value && value.size <= FILE_SIZE))
            .test(
                "fileType",
                "El tipo de archivo no es permitido",
                value => !value || (value && SUPPORTED_FORMATS.includes(value.type))),
        fotoParticipante: Yup.mixed()
            .nullable()
            .required('Foto del participante es requerido')
            .test("fileSize",
                "El tamaño del archivo sobre pasa los 7MB",
                value => !value || (value && value.size <= FILE_SIZE))
            .test(
                "fileType",
                "El tipo de archivo no es permitido",
                value => !value || (value && SUPPORTED_FORMATS.includes(value.type)))

    });

    const { handleSubmit, resetForm, handleChange, values, touched, errors, handleBlur, setFieldValue } = useFormik({
        initialValues: {
            equipo: "",
            nombreParticipante: "",
            apellidoParticipante: "",
            fechaNacParticipante: null,
            telefonoParticipante: "",
            emailParticipante: "",
            rolParticipante: "",
            dniParticipante: "",
            direccionParticipante: "",
            fotoDNIParticipante: undefined,
            fotoParticipante: undefined
        },

        validationSchema: formValidationSchema,

        onSubmit: (values, { setSubmitting, resetForm }) => {
            registrarJugador();

            setSubmitting(true);
            setTimeout(() => {
                //resetForm();
                setSubmitting(false);
            }, 4000);
        },
    });

    // Guardamos la imagen en el server imgbb.com
    const postImageToServerExt = async (image) => {
        var imageData = await toBase64(image);
        var imageToSend = imageData.replace(/^data:image\/[a-z]+;base64,/, "");

        var formdata = new FormData();
        formdata.append("image", imageToSend);

        var imagePosted =
            await axios
                .post(
                    configData.IMGBB_API_URL + configData.IMAGEBB_API_KEY,
                    formdata,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                )
                .then((response) => {
                    console.log("API response ↓");
                    console.log(response);
                    return response;
                })
                .catch((err) => {
                    console.log("API error ↓");
                    console.log(err);

                    if (err.response.data.error) {
                        console.log(err.response.data.error);
                    }
                });

        var responseImage = imagePosted.data.data.url;
        console.log("Image Enviada: " + responseImage);
        return responseImage;
    };

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    // Realiza un POST al API de crear Boleta en backend
    const postJugador = async (url, datos) => {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response;
    }

    const incJugadorEquipo = async (url) => {
        const response = await fetch(url, {
            method: 'GET',
            //body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response;
    }

    const tieneEquiposRegDelegado = async (delegadoID) => {
        const response = await fetch(EQUIPO_DELEGADO_URL + delegadoID, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }

    const registrarJugador = async () => {

        const resDelegadoEquipos = await tieneEquiposRegDelegado(1);

        if (esValidoEdadJugador(values.fechaNacParticipante, values.categoria) && (resDelegadoEquipos.status === 200)) {

            if (await existeFotosDuplicadas(values.fotoDNIParticipante, values.fotoParticipante)) {
                setAlertColor("error");
                setAlertContent("Las fotos no pueden ser duplicadas");
                setOpen(true);

            } else {

                var imageFotoParticipanteURL = "";
                var imageFotoDNIURL = "";

                if ((selectedFileFotoParticipante && values.fotoParticipante) && (selectedFileFotoDNI && values.fotoDNIParticipante)) {
                    imageFotoParticipanteURL = await postImageToServerExt(selectedFileFotoParticipante);
                    //imageFotoDNIURL = await postImageToServerExt(selectedFileFotoDNI);
                }

                var selectedCategoria = categorias.find(categoria => categoria.Categoria === values.categoria);
                console.log("Categoria ID: " + selectedCategoria);
                var formatedFechaNac = values.fechaNacParticipante.format('YYYY-MM-DD');

                var selectedEquipo = equipos.find(equipo => equipo.Nombre_Equipo === values.equipo);
                console.log("Equipo ID: " + selectedEquipo);

                const datos = {
                    "DNI": parseInt(values.dniParticipante),
                    "Nombre": values.nombreParticipante,
                    "Apellido": values.apellidoParticipante,
                    "Telefono": values.telefonoParticipante,
                    "Foto": imageFotoParticipanteURL,
                    "Foto_DNI": imageFotoDNIURL,
                    "Rol": values.rolParticipante,
                    "Fecha_Nacimiento": formatedFechaNac,
                    "Cod_Equipo": selectedEquipo.id,
                    "Cod_Categoria": selectedCategoria.id,
                    "Asistencia": 0,
                    "Faltas": 0,
                    "Puntos": 0,
                    "Rebotes": 0,
                    "Pases": 0,
                    "Dobles": 0,
                    "Triples": 0
                };

                console.log("Jugador: ------> " + JSON.stringify(datos));

                // Hacemos el post de Equipo 
                const respuestaJson = await postJugador(JUGADORES_URL, datos);

                //Validadando si se envio correctamente o hubo algun fallo
                console.log("Response:------> " + respuestaJson.status);
                if (respuestaJson.status === 200) {
                    const resIncJugEquipo = await incJugadorEquipo(JUGADOR_EQUIPO_URL + selectedEquipo.id);
                    setAlertColor("success");
                    setAlertContent("Se registro al jugador exitosamente");
                    setOpen(true);
                    localStorage.setItem('jugadoresReg', parseInt(localStorage.getItem('jugadoresReg')) + 1);
                    borrar();
                }

                if (respuestaJson.status === 400) {
                    var errorRes = await respuestaJson.json();
                    console.log("Error Response---" + JSON.stringify(errorRes));

                    if (errorRes.errorCode === "23505") {
                        setAlertColor("error");
                        setAlertContent("El DNI del participante ya fue registrado");
                        setOpen(true);
                    }
                }
            }
        } else {
            if (resDelegadoEquipos.status === 400) {
                setAlertColor("error");
                setAlertContent("No tiene equipos registrados");
                setOpen(true);
                borrar();
            } else {
                mostrarErrorEdad();
            }
        }
    }

    const existeFotosDuplicadas = async (fotoDNI, fotoPerfil) => {
        var fotoDNIData = await toBase64(fotoDNI);
        var fotoPerfilData = await toBase64(fotoPerfil);
        var iguales = Object.is(fotoDNIData, fotoPerfilData);
        console.log("Son iguales---->", iguales);
        return iguales;
    }

    const esValidoEdadJugador = (fechaNacimiento, categoriaEquipo) => {

        var edadJugador = moment().diff(fechaNacimiento, 'years');

        console.log("Edad Jugador: " + edadJugador);
        if (categoriaEquipo.includes('+')) {
            console.log("Categoria start with +: " + categoriaEquipo.includes('+'));
            var categoria = categoriaEquipo.replace('+', '');
            categoria = parseInt(categoria);
            console.log("Categoria Parsed: " + categoria);
            console.log("La edad es mayor a la categoria: " + (edadJugador > categoria));
            return edadJugador > categoria;
        } else {
            categoria = parseInt(categoriaEquipo);
            console.log("Categoria Parsed: " + categoria);
            console.log("La edad es igual a la categoria: " + (edadJugador === categoria));
            return edadJugador === categoria;
        }
    }

    const mostrarErrorEdad = () => {
        setAlertColor("error");
        setAlertContent("La edad del participante no pertenece al rango de la categoria de equipo");
        setOpen(true);
    }

    function delayAndGo(e) {
        setTimeout(() => navigate("/registrar-equipo"), 3000);
    }




    function borrar() {
        document.getElementById("fotoDNIParticipante").value = "";
        document.getElementById("fotoParticipante").value = "";
        return resetForm();
    }

    useEffect(() => {
        getCategorias();
        getEquipos();
    }, [])

    return (
        <>
            <div>
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
                    Registrar Jugador
                </Typography>
                <br>
                </br>
                <br>
                </br>
                <form>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={1}>
                    </Stack>
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
                                    }}>Equipo</InputLabel>
                                <Select

                                    id="equipo"
                                    name="equipo"
                                    label="Equipo"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.equipo}
                                    error={touched.equipo && Boolean(errors.equipo)}
                                    helperText={touched.equipo && errors.equipo}
                                    sx={{
                                        '& .MuiInputBase-input': {
                                            color: 'white'

                                        },
                                        '& .MuiSelect-iconStandard': {
                                            color: 'white'
                                        }
                                    }}
                                >
                                    {equipos.map(({ id, Nombre_Equipo, Categoria }, index) => (
                                        <MenuItem key={index} value={Nombre_Equipo}>
                                            {Nombre_Equipo} {Categoria}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {touched.equipo && errors.equipo ? (
                                    <FormHelperText
                                        sx={{ color: "#d32f2f", marginLeft: "!important" }}
                                    >
                                        {touched.equipo && errors.equipo}
                                    </FormHelperText>
                                ) : null}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl variant="standard" fullWidth>
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
                                        }}>Rol</InputLabel>
                                    <Select
                                        id='rolParticipante'
                                        name="rolParticipante"
                                        label="Categoria"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.rolParticipante}
                                        error={touched.rolParticipante && Boolean(errors.rolParticipante)}
                                        helperText={touched.rolParticipante && errors.rolParticipante}
                                        sx={{
                                            '& .MuiInputBase-input': {
                                                color: 'white'

                                            },
                                            '& .MuiSelect-iconStandard': {
                                                color: 'white'
                                            }
                                        }}
                                    >
                                        <MenuItem value={0} >Ninguna</MenuItem>
                                        <MenuItem value={10} >Alero</MenuItem>
                                        <MenuItem value={20}>Pivot</MenuItem>
                                        <MenuItem value={30}>Armador</MenuItem>
                                    </Select>
                                    {touched.rolParticipante && errors.rolParticipante ? (
                                        <FormHelperText
                                            sx={{ color: "#d32f2f", marginLeft: "!important" }}
                                        >
                                            {touched.rolParticipante && errors.rolParticipante}
                                        </FormHelperText>
                                    ) : null}
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="nombreParticipante"
                                name="nombreParticipante"
                                label="Nombre"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.nombreParticipante}
                                error={touched.nombreParticipante && Boolean(errors.nombreParticipante)}
                                helperText={touched.nombreParticipante && errors.nombreParticipante}
                                sx={{
                                    label: { color: '#ffff' },
                                    input: { color: '#ffff' },
                                    svg: { color: '#ffff' }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField

                                id="apellidoParticipante"
                                name="apellidoParticipante"
                                label="Apellido"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.apellidoParticipante}
                                error={touched.apellidoParticipante && Boolean(errors.apellidoParticipante)}
                                helperText={touched.apellidoParticipante && errors.apellidoParticipante}
                                sx={{
                                    label: { color: '#ffff' },
                                    input: { color: '#ffff' },
                                    svg: { color: '#ffff' }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DesktopDatePicker
                                    id="fechaNacParticipante"
                                    name="fechaNacParticipante"
                                    label="Fecha de nacimiento "
                                    inputFormat="DD/MM/YYYY"
                                    value={values.fechaNacParticipante}

                                    maxDate={moment({ maxFechaNac })}
                                    onChange={(value) => setFieldValue("fechaNacParticipante", value, true)}

                                    renderInput={(params) => {
                                        return <TextField {...params}
                                            variant="standard"
                                            fullWidth
                                            onBlur={handleBlur}
                                            error={touched.fechaNacParticipante && Boolean(errors.fechaNacParticipante)}
                                            helperText={touched.fechaNacParticipante && errors.fechaNacParticipante}
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

                                id="telefonoParticipante"
                                name="telefonoParticipante"
                                label="Celular/Teléfono"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.telefonoParticipante}
                                error={touched.telefonoParticipante && Boolean(errors.telefonoParticipante)}
                                helperText={touched.telefonoParticipante && errors.telefonoParticipante}
                                sx={{
                                    label: { color: '#ffff' },
                                    input: { color: '#ffff' },
                                    svg: { color: '#ffff' }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="emailParticipante"
                                name="emailParticipante"
                                label="Correo electrónico"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.emailParticipante}
                                error={touched.emailParticipante && Boolean(errors.emailParticipante)}
                                helperText={touched.emailParticipante && errors.emailParticipante}
                                sx={{
                                    label: { color: '#ffff' },
                                    input: { color: '#ffff' },
                                    svg: { color: '#ffff' }
                                }}
                            />
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <TextField

                                id="dniParticipante"
                                name="dniParticipante"
                                label="DNI/CI"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.dniParticipante}
                                error={touched.dniParticipante && Boolean(errors.dniParticipante)}
                                helperText={touched.dniParticipante && errors.dniParticipante}
                                sx={{
                                    label: { color: '#ffff' },
                                    input: { color: '#ffff' },
                                    svg: { color: '#ffff' }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField

                                id="direccionParticipante"
                                name="direccionParticipante"
                                label="Dirección"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.direccionParticipante}
                                error={touched.direccionParticipante && Boolean(errors.direccionParticipante)}
                                helperText={touched.direccionParticipante && errors.direccionParticipante}
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
                            <TextField

                                id="fotoDNIParticipante"
                                name="fotoDNIParticipante"
                                type="file"
                                label="Foto de DNI"
                                variant="standard"
                                onChange={({ currentTarget }) => {
                                    const file = currentTarget.files[0];
                                    const reader = new FileReader();
                                    if (file) {
                                        reader.onloadend = () => {
                                            setSelectedFileFotoDNI(file)
                                        };
                                        reader.readAsDataURL(file);
                                        setFieldValue("fotoDNIParticipante", file);
                                    }
                                }}
                                onBlur={handleBlur}
                                error={touched.fotoDNIParticipante && Boolean(errors.fotoDNIParticipante)}
                                helperText={touched.fotoDNIParticipante && errors.fotoDNIParticipante}
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    label: { color: '#ffff' },
                                    input: { color: '#ffff' },
                                    svg: { color: '#ffff' },
                                    width: '100%',
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField

                                id="fotoParticipante"
                                name="fotoParticipante"
                                type="file"
                                label="Foto de perfil"
                                variant="standard"
                                onChange={({ currentTarget }) => {
                                    const file = currentTarget.files[0];
                                    const reader = new FileReader();
                                    if (file) {
                                        reader.onloadend = () => {
                                            setSelectedFileFotoParticipante(file)
                                        };
                                        reader.readAsDataURL(file);
                                        setFieldValue("fotoParticipante", file);
                                    }
                                }}
                                onBlur={handleBlur}
                                error={touched.fotoParticipante && Boolean(errors.fotoParticipante)}
                                helperText={touched.fotoParticipante && errors.fotoParticipante}
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    label: { color: '#ffff' },
                                    input: { color: '#ffff' },
                                    svg: { color: '#ffff' },
                                    width: '100%',
                                }}
                            />
                        </Grid>


                    </Grid>
                    <Stack m={5}
                        direction="row"
                        spacing={3}
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
                            type="reset"
                        >Cancelar
                        </Button>

                    </Stack>

                    <div>
                        <table id="tabla" className="table table-dark"></table>
                    </div>
                </form>
            </div>
        </>
    )
}

export default RegistrarJugador