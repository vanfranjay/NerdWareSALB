import React, { useState } from "react";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { InputLabel } from "@mui/material";
import { Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Container, Stack } from "@mui/system";
import { useFormik, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import configData from "../config/config.json";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import UserDelegado from "./UserDelegado";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "../css/logIn.css";
import Usuario from "./Usuario";
import { useEffect } from "react";
import App from "../App";

const Login = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [alertColor, setAlertColor] = useState("");
  const [alertContent, setAlertContent] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usuarioLogin, setUsuarioLogin] = useState([]);
  const LOGIN_URL = configData.LOGIN_API_URL || "http://127.0.0.1:8000/api/login";

  const getUser = (datoUsuario) => {
    const datosUser = datoUsuario[0];
    return datosUser;
  };

  function enviar() {
    return (<App hola="Hola" />);
  }

  //return {
  //  getUser,
  //};

  useEffect(() => {
    console.log("usuarioLogin");
  }, [usuarioLogin]);


  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formValidationSchema = Yup.object().shape({
    Correo: Yup.string()
      .required("El Correo electrónico es requerido")
      .min(6, "El Correo electrónico debe contener al menos 6 caracteres")
      .max(256, "La Contraseña debe contener máximo 256 caracteres")
      .matches(
        /^(?=.{2,}@)[0-9a-z]+(?:\.[0-9a-z]+)*@[a-z0-9]{2,}(?:\.[a-z]{2,})+$/,
        "El correo debe seguir el formato mínimo: us@bo.co"
      ),
    Contraseña: Yup.string()
      .required("La Contraseña es requerido")
      .min(8, "La Contraseña debe contener al menos 8 caracteres")
      .max(127, "La Contraseña debe contener máximo 127 caracteres")
      .matches(
        /(?!.* )(?!.*[-_,.#$%&:;'?¡!"{}()¿°|[@^~+*¬<>])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,15})/,
        "La contraseña debe tener al menos una letra Mayúscula y una letra minúscula"
      ),
  });

  const {
    handleSubmit,
    resetForm,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues: {
      Correo: "",
      Contraseña: "",
    },

    validationSchema: formValidationSchema,

    onSubmit: (values, { setSubmitting, resetForm }) => {
      //login();
      try {
        const resultado = axios
          .post(LOGIN_URL, {
            ...values,
          })
          .then(function (response) {
            console.log("Response Status:" + response.status);
            if (response.status === 200) {
              const datosUsuario = [...response.data];
              console.log("Usuario Response: " + JSON.stringify(...datosUsuario));
              const datoUsuario = { ...datosUsuario };
              var idUser = datosUsuario ? datoUsuario[0].id : null;
              localStorage.setItem('userID', idUser);
              var nameUser = datoUsuario ? datoUsuario[0].Nombre : null;
              var lastNameUser = datoUsuario ? datoUsuario[0].Apellido : null;
              localStorage.setItem('nameUser', nameUser + " " + lastNameUser);

              setUsuarioLogin(datoUsuario[0]);
              getUser(datoUsuario);
              enviar();
              resetForm();

              setAlertColor("success");
              setAlertContent("Se han valido exitosamente sus credenciales");
              setOpen(true);
              setTimeout(() => navigate("/usuario"), 3000);
            }

            if (response.status === 400) {
              setAlertColor("error");
              setAlertContent("El correo o contraseña no son correctos");
              setOpen(true);
            }


            //const mensaje = response.data.errorMessage;
            //setUsuarioLogin(datosUsuario);
            //console.log(...usuarioLogin);
            //if(usuarioLogin.length === 0){
            //  console.log("error al loguear");
            //}
            //else{
            //
            //}
            //console.log(mensaje);
            //mensajeLogin = mensaje;
            //console.log(mensajeLogin);
            //mensaje = response.data;
            //console.log(mensaje);
          })
          .catch((err) => {
            console.log("API error ↓");
            console.log(err);

            if (err.response.data.error) {
              console.log(err.response.data.error);
            }
            setAlertColor("error");
            setAlertContent("El correo o contraseña no son correctos");
            setOpen(true);
          });


        //smsLogin(mensajeLogin);
        //setSubmitting(true);
        //setTimeout(() => {
        //  resetForm();
        //  setSubmitting(false);
        //}, 2000);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <Grid justifyItems="center" className="contentLogin">
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity={alertColor} onClose={handleClose}>
            {alertContent}
          </Alert>
        </Snackbar>
        <br></br>
        <br></br>
        <Typography
          variant="h3"
          align="center"
          color="#ffff"
          sx={{
            input: { color: "white" },
          }}
        >
          ¡Bienvenido!
        </Typography>
        <br></br>
        <form onSubmit={handleSubmit}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Stack m={3} direction="column" width={500} spacing={6}>
              <TextField
                required
                id="Correo"
                name="Correo"
                label="Correo electrónico"
                InputLabelProps={{
                  style: { color: "#ffff" },
                }}
                sx={{
                  color: "white",
                  "& .MuiInputBase-root": { color: "white" },
                }}
                fullWidth
                autoComplete="off"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Correo}
                error={touched.Correo && Boolean(errors.Correo)}
                helperText={touched.Correo && errors.Correo}
              />

              <FormControl
                variant="standard"
                required
                sx={{ "& .MuiInputBase-input": { color: "white" } }}
              >
                <InputLabel
                  sx={{
                    color: "white",
                    "& .MuiInputLabel-root": {
                      color: "white",
                    },
                    "& .MuiFormLabelroot": {
                      color: "white",
                    },
                  }}
                >
                  Password
                </InputLabel>
                <Input
                  required
                  fullWidth
                  id="Contraseña"
                  name="Contraseña"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.Contraseña}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        sx={{
                          ".MuiSvgIcon-root ": {
                            fill: "white !important",
                          },
                          "& .MuiInputBase-input": {
                            color: "white",
                          },
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {touched.Contraseña && errors.Contraseña ? (
                  <FormHelperText
                    sx={{ color: "#d32f2f", marginLeft: "!important" }}
                  >
                    {touched.Contraseña && errors.Contraseña}
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
                  sx={{ width: "50%" }}
                >
                  Iniciar Sesión
                </Button>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Grid>
    </>
  )
};

export default Login;
