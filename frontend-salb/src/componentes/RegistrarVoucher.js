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

import { Container, Stack } from '@mui/system';
import { makeStyles } from '@mui/material/styles';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { useFormik, useField, useFormikContext } from "formik";
import * as Yup from "yup";

import { ThemeProvider, createTheme } from '@mui/material/styles';

import configData from "../config/config.json";


//Setup for Datepicker
//For Moment.js
import momentTimezone from "moment-timezone";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { parseNonNullablePickerDate } from "@mui/x-date-pickers/internals";

const theme = createTheme({
    components: {
        MuiSelect: {
            styleOverrides: {
                root: {
                    label: {
                        padding: 'initial',
                        color: '#ffff'
                    },
                }
            },
        },
        MuiDatePicker: {
            styleOverrides: {
                root: {
                    backgroundColor: 'red',
                },
            },
        },
    },
});


const RegistrarVoucher = () => {

    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "application/pdf"];

    const postVoucherURL = configData.REGISTER_VOUCHER_API_URL;

    const [selectedFile, setSelectedFile] = useState();

    const [monto, setMonto] = React.useState('');
    const [selectedDate, handleDateChange] = useState(null);

    const timeZoneFromServer = "America/La_Paz";
    const { moment } = new AdapterMoment({ instance: momentTimezone });
    const dateWithTimeZone = moment().tz(timeZoneFromServer);

    const [value, setValue] = React.useState(null);


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
            .required('Fecha de depósito es requerido'),
        comprobantePago: Yup.mixed()
            .nullable()
            .required('Comprobante de pago es requerido')
            .test(
                "fileType",
                "El tipo de archivo no es permitido",
                value => !value || (value && SUPPORTED_FORMATS.includes(value.type))
            )

    });

    const { handleSubmit, resetForm, handleChange, values, touched, errors, handleBlur, setFieldValue } = useFormik({
        initialValues: {
            numTransaccion: '',
            monto: '',
            fechaDeposito: '',
            comprobantePago: undefined,
        },

        validationSchema: formValidationSchema,

        onSubmit: (values, { setSubmitting, resetForm }) => {
            registrarVoucher()

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
        const res = await response.json();
        return res;
    }

    // Construir una actividad con los datos introducidos

    const registrarVoucher = async () => {

        var comprobantePagoFile = await toBase64(selectedFile)

        const datos = {
            "numTrans": values.numTransaccion,
            "monto": values.monto,
            "fechaDeposito": values.fechaDeposito,
            "comprobPago": comprobantePagoFile
        };
        console.log("Voucher: " + JSON.stringify(datos));
        const respuestaJson = await postVoucher(postVoucherURL, datos);
        console.log("Register Voucher Response: " + respuestaJson);
        window.location = window.location.href;
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
                                '& .MuiInputBase-root': { color: 'white' },
                                '& .MuiInput-underline:before': { borderBottomColor: '#E2770E' },
                                '& .MuiInput-underline:after': { borderBottomColor: '#E2770E' },
                            }}
                            required
                            id="numTransaccion"
                            name="numTransaccion"

                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.numTransaccion}
                            error={touched.numTransaccion && Boolean(errors.numTransaccion)}
                            helperText={touched.numTransaccion && errors.numTransaccion}

                            label="Número de transacción"
                            color="warning"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>

                        <FormControl variant="standard" fullWidth required>

                            <InputLabel
                                sx={{
                                    color: 'white',
                                    '& .MuiFormLabel-root': {
                                        color: 'white',
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'white',
                                    }
                                }}>Monto</InputLabel>
                            <ThemeProvider theme={theme}>
                                <Select
                                    required
                                    id="monto"
                                    name="monto"
                                    label="Monto"
                                    sx={{

                                        color: 'white',
                                        '& .MuiInputBase-input': {
                                            color: 'white',
                                            label: { color: 'white' },
                                            borderBottom: '2px solid #E2770E',
                                        },
                                        '& .MuiSelect-iconStandard': {
                                            color: 'white',

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
                            </ThemeProvider>
                        </FormControl>

                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <br></br>
                        <LocalizationProvider dateAdapter={AdapterMoment}
                            sx={{
                                input: { color: 'white' }
                            }}>
                            <DesktopDatePicker
                                variant="inline"
                                required
                                id="fechaDeposito"
                                name="fechaDeposito"
                                label="Fecha de Depósito"
                                inputFormat="DD/MM/YYYY"
                                /*value={selectedDate ? moment(selectedDate) : null}*/
                                value={values.fechaDeposito}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        sx={{
                                            label: { color: '#ffff' },
                                            input: { color: '#ffff' },
                                            svg: { color: '#ffff' }
                                        }}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <br></br>
                        <TextField
                            id="comprobantePago"
                            name="comprobantePago"
                            type="file"
                            label="Comprobante de pago"
                            accept=".png,.jpg,.jpeg,.pdf"
                            onChange={({ currentTarget }) => {
                                const file = currentTarget.files[0];
                                const reader = new FileReader();
                                if (file) {
                                    reader.onloadend = () => {
                                        setSelectedFile(file)
                                    };
                                    reader.readAsDataURL(file);
                                    setFieldValue("file", file);
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
                                width: '100%'

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
                        fullWidth
                        onClick={handleSubmit}
                        type="submit"
                    >Registrar
                    </Button>
                    <Button
                        variant="contained"
                        fullWidth
                        className='botonFormRegistroVoucher'
                        onClick={borrar}
                    >Cancelar
                    </Button>
                </Stack>
            </form>



        </Grid>
    );
}

export default RegistrarVoucher;
