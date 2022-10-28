import React, { useState } from "react";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import "../css/styleRegistro.css";
import Button from '@mui/material/Button';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { Paper } from '@mui/material';
import '../css/styleRegistro.css';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
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
import { MuiTelInput } from 'mui-tel-input';
import MuiPhoneNumber from 'material-ui-phone-number-2'
import axios from "axios";

import { Container, Stack } from '@mui/system';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { useFormik, useField, useFormikContext } from "formik";
import * as Yup from "yup";

import configData from "../config/config.json";

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from "moment";
import "moment/locale/es";

const Registrarse = () => {

  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
  const FILE_SIZE = 7340032; // 7MB de tamaño del archivo

  const [open, setOpen] = React.useState(false);
  const [alertColor, setAlertColor] = useState('');
  const [alertContent, setAlertContent] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const formValidationSchema = Yup.object({
    nombre: Yup
      .string('Ingrese el Nombre')
      .min(2, 'Nombre debe ser mínimo 2 caracteres')
      .max(80, "Nombre debe ser máximo 80 caracteres")
      .required('Nombre es requerido'),
    apellido: Yup
      .string('Ingrese los Apellidos')
      .min(2, 'Apellidos debe ser mínimo 2 caracteres')
      .max(80, "Apellidos debe ser máximo 80 caracteres")
      .required('Apellidos es requerido'),
    telefono: Yup
      .string()
      .min(5, 'Telefono debe ser mínimo 5 caracteres')
      .max(20, "Telefono debe ser máximo 20 caracteres")
      .required('Telefono es requerido'),
    email: Yup.string()
      .required("El Correo electrónico es requerido")
      .min(6, "El Correo electrónico debe contener al menos 6 caracteres")
      .max(256, "La Contraseña debe contener máximo 256 caracteres")
      .matches(/^(?=.{2,}@)[0-9a-z]+(?:\.[0-9a-z]+)*@[a-z0-9]{2,}(?:\.[a-z]{2,})+$/, "El correo debe seguir el formato mínimo: us@bo.co"),
    password: Yup.string()
      .required("La Contraseña es requerido")
      .min(8, "La Contraseña debe contener al menos 8 caracteres")
      .max(127, "La Contraseña debe contener máximo 127 caracteres")
      .matches(/(?!.* )(?!.*[-_,.#$%&:;'?¡!"{}()¿°|[@^~+*¬<>])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,15})/, "La contraseña debe tener al menos una letra Mayúscula y una letra minúscula"),
    confirmPassword: Yup.string()
      .required("Confirmar Contraseña es requerido")
      .min(8, "Confirmar Contraseña debe contener al menos 8 caracteres")
      .max(127, "Confirmar Contraseña debe contener máximo 127 caracteres")
      .matches(/(?!.* )(?!.*[-_,.#$%&:;'?¡!"{}()¿°|[@^~+*¬<>])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,15})/, "La contraseña debe tener al menos una letra Mayúscula y una letra minúscula")
      .oneOf([Yup.ref('password')], 'El valor no coincide con el campo Contraseña'),
    fotoPerfil: Yup.mixed()
      .nullable()
      .required('Foto de Perfil es requerido')
      .test("fileSize",
        "El tamaño del archivo sobre pasa los 7MB",
        value => !value || (value && value.size <= FILE_SIZE))
      .test(
        "fileType",
        "El tipo de archivo no es permitido",
        value => !value || (value && SUPPORTED_FORMATS.includes(value.type))),
    fotoDNI: Yup.mixed()
      .nullable()
      .required('Foto de DNI es requerido')
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
      nombre: '',
      apellido: '',
      telefono: '',
      email: '',
      password: '',
      confirmPassword: '',
      fotoPerfil: undefined,
      fotoDNI: undefined,
    },

    validationSchema: formValidationSchema,

    onSubmit: (values, { setSubmitting, resetForm }) => {
      registrarUsuario();

      setSubmitting(true);
      setTimeout(() => {
        resetForm();
        setSubmitting(false);
      }, 4000);
    },
  });

  const registrarUsuario = async () => {
    const datos = {
      Nombre: values.nombre,
      Apellido: values.apellido,
      Telefono: values.telefono,
      Contraseña: values.password,
      Contraseña_confirmed: values.confirmPassword,
      Correo: values.email,
      Foto_Perfil: null,
      Foto_DNI: null
    };
    //e.preventDefault(); //evitar que se actualice la pantalla
    console.log("Delegado: " + JSON.stringify(datos));

    const res = await axios.post(configData.REGISTER_DELEGADO_API_URL, {
      ...datos,
    })
      .then(function (response) {
        console.log(response);
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log("Response: " + JSON.stringify(res));
    borrar();

    if (res.status === 201) {
      setAlertColor("success");
      setAlertContent(configData.MENSAJE_REGISTRO_USUARIO_CON_EXITO);
      setOpen(true);
      borrar();
    }

  };

  function borrar() {
    document.getElementById("fotoPerfil").value = "";
    document.getElementById("fotoDNI").value = "";
    return resetForm();
  }

  return (
<<<<<<< HEAD
    <div className="contenedorFormRegistro">
      <form onSubmit={crearDelegado} className="formularioRegistro">
        <div className="nombreRegistro centreado">
          <input
            type="text"
            placeholder="Nombre"
            value={delegado.Nombre}
            onChange={(e) => {
              setDelegado({ ...delegado, Nombre: e.target.value });
            }}
            className="nombre diseñoCuadroRegistro"
            required
          ></input>
        </div>
        <div className="apellidoRegistro centreado">
          <input
            type="text"
            placeholder="Apellido"
            value={delegado.Apellido}
            onChange={(e) => {
              setDelegado({ ...delegado, Apellido: e.target.value });
            }}
            className="apellido diseñoCuadroRegistro"
            required
          ></input>
        </div>
        <div className="telefonoRegistro centreado">
          <input
            type="tel"
            placeholder="Teléfono"
            value={delegado.Telefono}
            onChange={(e) => {
              setDelegado({ ...delegado, Telefono: e.target.value });
            }}
            className="nombre diseñoCuadroRegistro"
            required
          ></input>
        </div>
        <div className="direccionRegistro centreado">
          <input
            type="email"
            placeholder="Email"
            value={delegado.Correo}
            onChange={(e) => {
              setDelegado({ ...delegado, Correo: e.target.value });
            }}
            className="nombre diseñoCuadroRegistro"
            required
          ></input>
        </div>
        <div className="direccionRegistro centreado">
          <input
            type="password"
            placeholder="contraseña"
            value={delegado.Contraseña}
            onChange={(e) => {
              setDelegado({ ...delegado, Contraseña: e.target.value });
            }}
            className="nombre diseñoCuadroRegistro"
            required
          ></input>
        </div>
        <div className="direccionRegistro centreado">
          <input
            type="password"
            placeholder="confirmación de contraseña"
            value={delegado.Contraseña_confirmed}
            onChange={(e) => {
              setDelegado({
                ...delegado,
                Contraseña_confirmed: e.target.value,
              });
            }}
            className="nombre diseñoCuadroRegistro"
            required
          ></input>
        </div>
        <div className="fotoCarnetRegistro centreado">
          <TextField
            
            id="F_DNI"
            name="upload-photo"
          type="file"
            label="Foto Perfil "
            className="inputRegistrarEquipo"
            InputLabelProps={{ shrink: true }}
            sx={{
              label: { color: "#ffff" },
              input: { color: "#ffff" },
              svg: { color: "#ffff" } /*},
                    "& .MuiInputBase-input": {
                        width: "460px" // Set your height here.
                    }*/,
            }}
          />
        </div>
        <div className="fotoPerfilRegistro centreado">
          {/*<Button
            variant="contained"
            component="label"
            className="botonFormRegistro"
          >
            Foto carnet
            <input hidden accept="image/*" multiple type="file" />
          </Button>*/}
          <TextField
            
            id="F_DNI2"
            name="upload-photo"
            type="file"
            label="Foto del Dni "
            className="fotoDniPerfil"
            InputLabelProps={{ shrink: true }}
            sx={{
              label: { color: "#ffff" },
              input: { color: "#ffff" },
              svg: { color: "#ffff" } /*},
                    "& .MuiInputBase-input": {
                        width: "460px" // Set your height here.
                    }*/,
            }}
          />
        </div>
        <div className="registroForm centreado">
=======
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
      <Typography variant="h3"
        align='center'
        color="#ffff"
        sx={{
          input: { color: 'white' }
        }}>
        Registro
      </Typography>
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
              id="nombre"
              name="nombre"
              label="Nombre"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.nombre}
              error={touched.nombre && Boolean(errors.nombre)}
              helperText={touched.nombre && errors.nombre}
            />
          </Grid>
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
              id="apellido"
              name="apellido"
              label="Apellido"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.apellido}
              error={touched.apellido && Boolean(errors.apellido)}
              helperText={touched.apellido && errors.apellido}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <MuiPhoneNumber
              InputLabelProps={{
                style: { color: '#ffff' },
              }}
              required
              defaultCountry="bo" regions={'south-america'}
              id="telefono"
              name="telefono"
              label="Telefono"
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.telefono}
              error={touched.telefono && Boolean(errors.telefono)}
              helperText={touched.telefono && errors.telefono}
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
                    },
                    color: 'white',
                    '& .MuiInputBase-root': { color: 'white' },
                    '& svg': { height: '2em', }
                  }}
                />;
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              name="email"
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
              value={values.email}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}

            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="standard" sx={{ '& .MuiInputBase-input': { color: 'white' } }} >
              <InputLabel
                sx={{
                  color: 'white',
                  '& .MuiInputLabel-root': {
                    color: 'white'
                  },
                  '& .MuiFormLabelroot': {
                    color: 'white'
                  }
                }}>Contraseña</InputLabel>
              <Input
                required
                fullWidth
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
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
              {touched.password && errors.password ? (
                <FormHelperText
                  sx={{ color: "#d32f2f", marginLeft: "!important" }}
                >
                  {touched.password && errors.password}
                </FormHelperText>
              ) : null}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="standard" sx={{ '& .MuiInputBase-input': { color: 'white' } }} >
              <InputLabel
                sx={{
                  color: 'white',
                  '& .MuiInputLabel-root': {
                    color: 'white'
                  },
                  '& .MuiFormLabelroot': {
                    color: 'white'
                  }
                }}>Confirmar Contraseña</InputLabel>
              <Input
                required
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      sx={{
                        '.MuiSvgIcon-root ': {
                          fill: "white !important",
                        },
                        '& .MuiInputBase-input': {
                          color: 'white'
                        }
                      }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {touched.confirmPassword && errors.confirmPassword ? (
                <FormHelperText
                  sx={{ color: "#d32f2f", marginLeft: "!important" }}
                >
                  {touched.confirmPassword && errors.confirmPassword}
                </FormHelperText>
              ) : null}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              variant="standard"
              required
              id="fotoPerfil"
              name="fotoPerfil"
              type="file"
              label="Foto de Perfil"
              onChange={({ currentTarget }) => {
                const file = currentTarget.files[0];
                const reader = new FileReader();
                if (file) {
                  reader.onloadend = () => {
                    setSelectedFile(file)
                  };
                  reader.readAsDataURL(file);
                  setFieldValue("fotoPerfil", file);
                }
              }}
              onBlur={handleBlur}
              error={touched.fotoPerfil && Boolean(errors.fotoPerfil)}
              helperText={touched.fotoPerfil && errors.fotoPerfil}
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
              variant="standard"
              required
              id="fotoDNI"
              name="fotoDNI"
              type="file"
              label="Foto de DNI"
              onChange={({ currentTarget }) => {
                const file = currentTarget.files[0];
                const reader = new FileReader();
                if (file) {
                  reader.onloadend = () => {
                    setSelectedFile(file)
                  };
                  reader.readAsDataURL(file);
                  setFieldValue("fotoDNI", file);
                }
              }}
              onBlur={handleBlur}
              error={touched.fotoDNI && Boolean(errors.fotoDNI)}
              helperText={touched.fotoDNI && errors.fotoDNI}
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
>>>>>>> 630f6da193f493a5470fde8bd5495ee36f9a5b75
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            type="submit"
          >Registrar
          </Button>
<<<<<<< HEAD
        </div>
        <div className="cancelarRegistroForm centreado">
          <Button
            variant="contained"
            className="botonFormRegistro"
            onClick={reset}
          >
            Cancelar
=======
          <Button
            variant="contained"
            color="warning"
            onClick={borrar}
          >Cancelar
>>>>>>> 630f6da193f493a5470fde8bd5495ee36f9a5b75
          </Button>
        </Stack>
      </form>
    </Grid>
  );
};

export default Registrarse;
