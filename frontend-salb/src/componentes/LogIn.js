import React, { useState } from "react";
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { InputLabel } from '@mui/material';
import { Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Container, Stack } from '@mui/system';
import { useFormik, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import configData from "../config/config.json";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import '../css/logIn.css';

const Login = () => {

  const [open, setOpen] = React.useState(false);
  const [alertColor, setAlertColor] = useState('');
  const [alertContent, setAlertContent] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formValidationSchema = Yup.object().shape({
    userEmail: Yup.string()
      .required("El Correo electrónico es requerido")
      .min(6, "El Correo electrónico debe contener al menos 6 caracteres")
      .max(256, "La Contraseña debe contener máximo 256 caracteres")
      .matches(/^(?=.{2,}@)[0-9a-z]+(?:\.[0-9a-z]+)*@[a-z0-9]{2,}(?:\.[a-z]{2,})+$/, "El correo debe seguir el formato mínimo: us@bo.co"),
    userPassword: Yup.string()
      .required("La Contraseña es requerido")
      .min(8, "La Contraseña debe contener al menos 8 caracteres")
      .max(127, "La Contraseña debe contener máximo 127 caracteres")
      .matches(/(?!.* )(?!.*[-_,.#$%&:;'?¡!"{}()¿°|[@^~+*¬<>])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,15})/, "La contraseña debe tener al menos una letra Mayúscula y una letra minúscula"),
  });

  const { handleSubmit, resetForm, handleChange, values, touched, errors, handleBlur, setFieldValue } = useFormik({
    initialValues: {
      userEmail: '',
      userPassword: ''
    },

    validationSchema: formValidationSchema,

    onSubmit: (values, { setSubmitting, resetForm }) => {
      //login();

      setSubmitting(true);
      setTimeout(() => {
        resetForm();
        setSubmitting(false);
      }, 4000);
    },
  });

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
      <br>
      </br>
      <br>
      </br>
      <Typography variant="h3"
        align='center'
        color="#ffff"
        sx={{
          input: { color: 'white' }
        }}>
        ¡Bienvenido!
      </Typography>
      <br>
      </br>
      <form onSubmit={handleSubmit}>
        <Box display="flex"
          justifyContent="center"
          alignItems="center">

          <Stack m={3}
            direction="column"
            width={500}
            spacing={6}
          >
            <TextField
              required
              id="userEmail"
              name="userEmail"
              label="Correo electrónico"
              InputLabelProps={{
                style: { color: '#ffff' },
              }}
              sx={{
                color: 'white',
                '& .MuiInputBase-root': { color: 'white' }
              }}
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.userEmail}
              error={touched.userEmail && Boolean(errors.userEmail)}
              helperText={touched.userEmail && errors.userEmail}

            />

            <FormControl variant="standard" required sx={{ '& .MuiInputBase-input': { color: 'white' } }} >
              <InputLabel
                sx={{
                  color: 'white',
                  '& .MuiInputLabel-root': {
                    color: 'white'
                  },
                  '& .MuiFormLabelroot': {
                    color: 'white'
                  }
                }}>Password</InputLabel>
              <Input
                required
                fullWidth
                id="userPassword"
                name="userPassword"
                type={showPassword ? 'text' : 'password'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.userPassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      sx={{
                        '.MuiSvgIcon-root ': {
                          fill: "white !important",
                        },
                        '& .MuiInputBase-input': {
                          color: 'white'
                        }
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {touched.userPassword && errors.userPassword ? (
                <FormHelperText
                  sx={{ color: "#d32f2f", marginLeft: "!important" }}
                >
                  {touched.userPassword && errors.userPassword}
                </FormHelperText>
              ) : null}
            </FormControl>

            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                type="submit"
                sx={{ width: '50%' }}
              >Iniciar Sesión
              </Button>
            </Stack>
          </Stack>
        </Box>
      </form>
    </Grid>

  );
}

export default Login;