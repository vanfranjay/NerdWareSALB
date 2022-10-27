import React, { useState } from "react";
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
import { Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import '../css/styleRegistro.css';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


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


const RegistrarVoucher = () => {

    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "application/pdf"];
    const FILE_SIZE = 7340032; // 7MB de tamaño del archivo


    //Obtener fechas de convocatoria de backend
    var fechaIniConvocatotia = "2022-10-01";

    const [open, setOpen] = React.useState(false);
    const [alertColor, setAlertColor] = useState('');
    const [alertContent, setAlertContent] = useState('');

    const postVoucherURL = configData.REGISTER_VOUCHER_API_URL;

    const [selectedFile, setSelectedFile] = useState();

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    const formValidationSchema = Yup.object({
        numTransaccion: Yup
            .string('Ingrese el Número de transacción')
            .min(4, 'Número de transacción debe ser mínimo 4 caracteres')
            .max(30, "Número de transacción debe ser máximo 30 caracteres")
            .required('Número de transacción es requerido'),
        monto: Yup
            .string('Ingrese el monto de depósito')
            .required('Monto es requerido'),
        fechaDeposito: Yup
            .date()
            .nullable()
            .required('Fecha de depósito es requerido'),
        comprobantePago: Yup.mixed()
            .nullable()
            .required('Comprobante de pago es requerido')
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
            numTransaccion: '',
            monto: '',
            fechaDeposito: null,
            comprobantePago: undefined,
        },

        validationSchema: formValidationSchema,

        onSubmit: (values, { setSubmitting, resetForm }) => {
            registrarVoucher();

            setSubmitting(true);
            setTimeout(() => {
                resetForm();
                setSubmitting(false);
            }, 4000);
        },
    });

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    // Realiza un POST al API de crear Boleta en backend

    const postVoucher = async (url, datos) => {
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

    const registrarVoucher = async () => {

        var comprobantePagoFile = await toBase64(selectedFile);
        var formatedFechaDeposito = values.fechaDeposito.format('YYYY-MM-DD');

        const datos = {
            "N_Transaccion": values.numTransaccion,
            "Monto": values.monto,
            "Fecha_Registro": formatedFechaDeposito,
            "Comprobante": comprobantePagoFile,
            // TODO: Sacar el ID del delegado que esta logeado
            "Cod_Delegado": null
        };
        console.log("Voucher: ------> " + JSON.stringify(datos));
        // Validar fechas

        if (esFechaValida(formatedFechaDeposito) && esMontoValido(formatedFechaDeposito, values.monto)) {

            const respuestaJson = await postVoucher(postVoucherURL, datos);

            //Validadando si se envio correctamente o hubo algun fallo
            console.log("Response:------> " + respuestaJson.status);
            if (respuestaJson.status === 200) {

                setAlertColor("success");
                setAlertContent(configData.MENSAJE_CREACION_DE_BOLETA_CON_EXITO);
                setOpen(true);
                borrar();
                //enviarCorreo(dataEmail);
            }

            if (respuestaJson.status === 400) {
                var errorRes = await respuestaJson.json();
                console.log("Error Response---" + JSON.stringify(errorRes));

                if (errorRes.errorCode === "23505") {
                    setAlertColor("error");
                    setAlertContent(configData.MENSAJE_CREACION_DE_BOLETA_CON_NUM_TRANS_DUPLICADA);
                    setOpen(true);
                }
            }
        }
    }

    const esFechaValida = (fechaDeposito) => {
        var esValido = moment(fechaDeposito).isBetween(configData.FECHA_INICIO_CONVOCATORIA, configData.FECHA_FIN_CONVOCATORIA, undefined, '[]');
        if (!esValido) {
            borrar();
            setAlertColor("error");
            setAlertContent(configData.MENSAJE_FECHA_DE_DEPOSITO_FUERA_DEL_RANGO_DE_CONVOCATORIA);
            setOpen(true);
        }
        return esValido;
    }

    const esMontoValido = (fechaDeposito, monto) => {
        var esValidoPreIns = moment(fechaDeposito).isBetween(configData.FECHA_INI_PREINSCRIPCION, configData.FECHA_FIN_PREINSCRIPCION, undefined, '[]');
        var esValidoIns = moment(fechaDeposito).isBetween(configData.FECHA_INI_INSCRIPCION, configData.FECHA_FIN_INSCRIPCION, undefined, '[]');

        if (esValidoPreIns) {
            if (configData.MONTO_PREINSCRIPCION === monto) {
                return true;
            }
            mostrarErrorMonto();
            return false;
        }
        if (esValidoIns) {
            if (configData.MONTO_INSCRIPCION === monto) {
                return true;
            }
            mostrarErrorMonto();
            return false;
        }
    }

    const mostrarErrorMonto = () => {
        borrar();
        setAlertColor("error");
        setAlertContent(configData.MENSAJE_MONTO_INVALIDO);
        setOpen(true);
    }

    const enviarCorreo = async () => {

        var dataEmail = {
            service_id: configData.EMAILJS_SERVICE_ID,
            template_id: configData.EMAILJS_TEMPLATE_ID,
            user_id: configData.EMAILJS_USER_ID,
            accessToken: configData.EMAILJS_ACCESS_TOKEN,
            template_params: {
                //Envia correo al Admin de la liga
                to: configData.EMAIL_ADMIN_LMB
            }
        };

        const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: 'POST',
            body: JSON.stringify(dataEmail),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const res = await response.headers;
        console.log("Correo response full: " + res);
        return res;

    }

    function borrar() {
        document.getElementById("comprobantePago").value = "";
        return resetForm();
    }

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
                Registrar Voucher
            </Typography>
            <br>
            </br>
            <br>
            </br>
            <form onSubmit={handleSubmit}>

                <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            InputLabelProps={{
                                style: { color: '#ffff' },
                            }}

                            sx={{
                                color: 'white',
                                '& .MuiInputBase-root': { color: 'white' }
                            }}
                            required
                            id="numTransaccion"
                            name="numTransaccion"
                            label="Número de transacción"

                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.numTransaccion}
                            error={touched.numTransaccion && Boolean(errors.numTransaccion)}
                            helperText={touched.numTransaccion && errors.numTransaccion}


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
                                }}>Monto</InputLabel>
                            <Select
                                required
                                id="monto"
                                name="monto"
                                label="Monto"
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
                                value={values.monto}
                                error={touched.monto && Boolean(errors.monto)}
                                helperText={touched.monto && errors.monto}
                            >
                                <MenuItem value="">Ninguno </MenuItem>
                                <MenuItem value={configData.MONTO_PREINSCRIPCION}>$ 200</MenuItem>
                                <MenuItem value={configData.MONTO_INSCRIPCION}>$ 250</MenuItem>
                            </Select>

                            {touched.monto && errors.monto ? (
                                <FormHelperText
                                    sx={{ color: "#d32f2f", marginLeft: "!important" }}
                                >
                                    {touched.monto && errors.monto}
                                </FormHelperText>
                            ) : null}

                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <br></br>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DesktopDatePicker
                                label="Fecha de deposito"
                                inputFormat="DD/MM/YYYY"
                                value={values.fechaDeposito}
                                onChange={(value) => setFieldValue("fechaDeposito", value, true)}
                                minDate={moment(configData.FECHA_INICIO_CONVOCATORIA)}
                                maxDate={moment(new Date())}
                                renderInput={(params) => {
                                    return <TextField {...params}
                                        variant="standard"
                                        fullWidth
                                        required
                                        onBlur={handleBlur}
                                        error={touched.fechaDeposito && Boolean(errors.fechaDeposito)}
                                        helperText={touched.fechaDeposito && errors.fechaDeposito}
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
                        <br></br>
                        <TextField
                            variant="standard"
                            required
                            id="comprobantePago"
                            name="comprobantePago"
                            type="file"
                            label="Comprobante de pago"
                            onChange={({ currentTarget }) => {
                                const file = currentTarget.files[0];
                                const reader = new FileReader();
                                if (file) {
                                    reader.onloadend = () => {
                                        setSelectedFile(file)
                                    };
                                    reader.readAsDataURL(file);
                                    setFieldValue("comprobantePago", file);
                                }
                            }}
                            onBlur={handleBlur}
                            error={touched.comprobantePago && Boolean(errors.comprobantePago)}
                            helperText={touched.comprobantePago && errors.comprobantePago}
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
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        type="submit"
                    >Registrar
                    </Button>
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={borrar}
                    >Cancelar
                    </Button>
                </Stack>
            </form>
        </Grid>

    );
}

export default RegistrarVoucher;