import React from 'react';
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
import { styled } from '@mui/material/styles';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

//Setup for Datepicker
//For Moment.js
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const RegistrarVoucher = () => {

    return (
        <Grid>
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
            <Grid container spacing={3}>

                <Grid item xs={12} sm={6}>
                    <TextField
                        InputLabelProps={{
                            style: { color: '#fff' },
                        }}
                        sx={{
                            input: { color: 'white' },
                            '& .MuiInput-underline:before': { borderBottomColor: '#E2770E' },
                            '& .MuiInput-underline:after': { borderBottomColor: '#E2770E' },
                        }}
                        required
                        id="numTrans"
                        name="numTrans"
                        label="Número de transacción"
                        color="warning"
                        fullWidth
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl required fullWidth>
                        <InputLabel htmlFor="filled-adornment-amount">Monto</InputLabel>
                        <Select
                            variant="standard"
                            sx={{
                                color: "#ffff",
                                "& .MuiInputLabel-root": {
                                    color: '#ffff'
                                },
                                "& .MuiFormLabel-colorPrimary": {
                                    color: '#ffff'
                                },
                                "& label": {
                                    "&.Mui-focused": {
                                        color: '#ffff'
                                    }
                                }
                            }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Monto"
                        >
                            <MenuItem value={200}>$ 200</MenuItem>
                            <MenuItem value={250}>$ 250</MenuItem>
                            <MenuItem value={300}>$ 300</MenuItem>
                        </Select>
                        <FormHelperText sx={{
                            color: "#ffff",
                            "& .MuiInputLabel-root": {
                                color: '#ffff'
                            }
                        }}>
                            Ingrese el monto del comprobante de pago</FormHelperText>
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
                            id="fechaDep"
                            name="fechaDep"
                            label="Fecha de Deposito"
                            openTo="year"
                            views={['year', 'month', 'day']}
                            inputFormat="DD/MM/YYYY"
                            /*value={value}*/
                            /*onChange={handleChange}*/
                            fullWidth
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    sx={{
                                        label: { color: '#ffff' },
                                        input: { color: '#ffff' },
                                        svg: { color: '#ffff' },
                                        "& .MuiInputBase-input": {
                                            width: "460px" // Set your height here.
                                        }
                                    }}
                                />
                            )}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <br></br>
                    <TextField
                        name="upload-photo"
                        type="file"
                        label="Comprobante de pago"
                        InputLabelProps={{ shrink: true }}
                        sx={{
                            label: { color: '#ffff' },
                            input: { color: '#ffff' },
                            svg: { color: '#ffff' },
                            "& .MuiInputBase-input": {
                                width: "460px" // Set your height here.
                            }
                        }}
                    />
                    <FormHelperText sx={{
                        color: "#ffff",
                        "& .MuiInputLabel-root": {
                            color: '#ffff'
                        }
                    }}>
                        Solo archivos de imagen y PDF son permitidos</FormHelperText>
                </Grid>
            </Grid>

            <Stack m={5}
                direction="row"
                spacing={3}
                display="flex"
                justifyContent="center"
                alignItems="center">
                <Button variant="contained" className='botonFormRegistroVoucher'>Registrar</Button>
                <Button variant="contained" className='botonFormRegistroVoucher'>Cancelar</Button>
            </Stack>
        </Grid>
    );
}

export default RegistrarVoucher;
