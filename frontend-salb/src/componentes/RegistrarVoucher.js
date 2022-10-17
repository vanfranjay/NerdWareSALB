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
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

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
    const FILE_SIZE = 7340032; // 7MB

    var fechaIniConvocatotia = "2022-10-01";
    var fechaFinConvocatoria = "2022-11-30";

    const postVoucherURL = configData.REGISTER_VOUCHER_API_URL;

    const [selectedFile, setSelectedFile] = useState();

    const formValidationSchema = Yup.object({
        numTransaccion: Yup
            .string('Ingrese el Número de transacción')
            .min(4, 'Número de transacción debe ser minímo de 4 caracteres')
            .max(30, "Número de transacción debe ser minímo de 30 caracteres")
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

    // Hacer un POST al backend para crear una Actividad
    const postVoucher = async (url, datos) => {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        //const res = await response.json();
        //console.log("Register Voucher: " + res);
        return await response;
    }

    // Construimos un voucher con los datos introducidos

    const registrarVoucher = async () => {

        var comprobantePagoFile = await toBase64(selectedFile)
        let mensajeRegistroVoucher = "";
        let statusResponse = "";

        const datos = {
            "N_Transaccion": values.numTransaccion,
            "Monto": values.monto,
            "Fecha_Registro": values.fechaDeposito.format('YYYY-MM-DD'),
            "Comprobante": null,
            "Cod_Delegado": 1
        };
        console.log("Voucher: " + JSON.stringify(datos));
        const respuestaJson = await postVoucher(postVoucherURL, datos);
        console.log("Register Voucher Response: " + respuestaJson);

        //Validando la respuesta de registrar un voucher;

        console.log("Iniciando el envio de correo.....");
        var dataEmail = {
            service_id: 'service_rhd9g4o',
            template_id: 'template_li99o64',
            user_id: 'l9yCJ7wruQUXvwxgB',
            accessToken: "isLW0B12iQCMbBHyeexwj",
            template_params: {
                to: "nerdware.es@gmail.com"
            }
        };
        enviarCorreo(dataEmail);

        /*
        if (respuestaJson.statusCode == 201) {
            statusResponse = "success";
            mensajeRegistroVoucher = "Solicitud de preinscripción enviada exitosamente";
            
            var data = {
                service_id: 'service_rhd9g4o',
                template_id: 'template_li99o64',
                user_id: 'l9yCJ7wruQUXvwxgB',
                template_params: {
                    'transaccionID': values.transaccionID,
                    
                }
            };
           
        } else if (respuestaJson.statusCode == 200) {
            statusResponse = "error";
            mensajeRegistroVoucher = "El número de transacción ya fue registrado";
        }
        */

    }

    const enviarCorreo = async (datos) => {

        const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: 'POST',
            body: JSON.stringify(datos),
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
                                <MenuItem value={200}>$ 200</MenuItem>
                                <MenuItem value={250}>$ 250</MenuItem>
                                <MenuItem value={300}>$ 300</MenuItem>
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
                                minDate={moment(fechaIniConvocatotia)}
                                maxDate={moment(fechaFinConvocatoria)}
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
