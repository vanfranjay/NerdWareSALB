import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import "../css/styleRegistro.css";
import Button from "@mui/material/Button";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import "../css/styleRegistro.css";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
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

import { Container, Stack } from "@mui/system";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { useFormik, useField, useFormikContext } from "formik";
import * as Yup from "yup";

import configData from "../config/config.json";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import "moment/locale/es";

const Registrarse = () => {

  const DELEGADO_URL = configData.DELEGADO_API_URL || "http://127.0.0.1:8000/api/delegados";
  const TORNEOS_URL = configData.TORNEOS_API_URL || "http://127.0.0.1:8000/api/torneos";

  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
  const FILE_SIZE = 7340032; // 7MB de tamaño del archivo
  const phoneRegExp = /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/;
  const [open, setOpen] = React.useState(false);
  const [alertColor, setAlertColor] = useState("");
  const [alertContent, setAlertContent] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [selectedFileFotoDNI, setSelectedFileFotoDNI] = useState();
  const [selectedFileFotoPerfil, setSelectedFileFotoPerfil] = useState();
  const [torneos, setTorneos] = useState([]);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const navigate = useNavigate();

  function delayAndGo(e) {
    setTimeout(() => navigate("/login"), 3000);
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const getTorneos = async () => {
    await axios.get(TORNEOS_URL)
      .then(response => {
        setTorneos(response.data);
        console.log("Torneos: " + JSON.stringify(response.data));
      }).catch(error => {
        console.log(error);
      })
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const formValidationSchema = Yup.object({
    nombre: Yup.string("Ingrese el Nombre")
      .min(2, "Nombre debe ser mínimo 2 caracteres")
      .max(80, "Nombre debe ser máximo 80 caracteres")
      .matches(/^[A-Za-z\s]*$/, "El nombre solo debe tener letras y espacios")
      .required("Nombre es requerido"),
    apellido: Yup.string("Ingrese los Apellidos")
      .min(2, "Apellidos debe ser mínimo 2 caracteres")
      .max(80, "Apellidos debe ser máximo 80 caracteres")
      .matches(/^[A-Za-z\s]*$/, "El apellido solo debe tener letras y espacios")
      .required("Apellidos es requerido"),
    telefono: Yup.string("Ingrese el teléfono")
      .min(7, "Telefono debe ser mínimo 7 caracteres")
      .max(30, "Telefono debe ser máximo 30 caracteres")
      .required("Telefono es requerido")
      .matches(phoneRegExp, "El Telefono no es válido"),
    email: Yup.string()
      .required("El Correo electrónico es requerido")
      .min(6, "El Correo electrónico debe contener al menos 6 caracteres")
      .max(256, "La Contraseña debe contener máximo 256 caracteres")
      .matches(
        /^(?=.{2,}@)[0-9a-z]+(?:\.[0-9a-z]+)*@[a-z0-9]{2,}(?:\.[a-z]{2,})+$/,
        "El correo debe seguir el formato mínimo: us@bo.co"
      ),
    password: Yup.string()
      .required("La Contraseña es requerido")
      .min(8, "La Contraseña debe contener al menos 8 caracteres")
      .max(127, "La Contraseña debe contener máximo 127 caracteres")
      .matches(
        /(?!.* )(?!.*[-_,.#$%&:;'?¡!"{}()¿°|[@^~+*¬<>])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,15})/,
        "La contraseña debe tener al menos una letra Mayúscula y una letra minúscula"
      ),
    confirmPassword: Yup.string()
      .required("Confirmar Contraseña es requerido")
      .min(8, "Confirmar Contraseña debe contener al menos 8 caracteres")
      .max(127, "Confirmar Contraseña debe contener máximo 127 caracteres")
      .matches(
        /(?!.* )(?!.*[-_,.#$%&:;'?¡!"{}()¿°|[@^~+*¬<>])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,15})/,
        "La contraseña debe tener al menos una letra Mayúscula y una letra minúscula"
      )
      .oneOf(
        [Yup.ref("password")],
        "El valor no coincide con el campo Contraseña"
      ),
    dni: Yup.string()
      .required("DNI es requerido")
      .min(5, "DNI debe ser mínimo 5 caracteres")
      .max(30, "DNI debe ser máximo 30 caracteres"),
    direccion: Yup.string()
      .max(350, "Direccion del participante debe ser máximo 350 caracteres")
      .required("Direccion del participante es requerido"),
    fotoPerfil: Yup.mixed()
      .nullable()
      .required("Foto de Perfil es requerido")
      .test(
        "fileSize",
        "El tamaño del archivo sobre pasa los 7MB",
        (value) => !value || (value && value.size <= FILE_SIZE)
      )
      .test(
        "fileType",
        "El tipo de archivo no es permitido",
        (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
      ),
    fotoDNI: Yup.mixed()
      .nullable()
      .required("Foto de DNI es requerido")
      .test(
        "fileSize",
        "El tamaño del archivo sobre pasa los 7MB",
        (value) => !value || (value && value.size <= FILE_SIZE)
      )
      .test(
        "fileType",
        "El tipo de archivo no es permitido",
        (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
      ),
    torneo: Yup
      .string('Ingrese el torneo')
      .required('Torneo es requerido'),
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
      nombre: "",
      apellido: "",
      telefono: "",
      email: "",
      password: "",
      confirmPassword: "",
      dni: "",
      direccion: "",
      fotoPerfil: undefined,
      fotoDNI: undefined,
      torneo: ""
    },

    validationSchema: formValidationSchema,

    onSubmit: (values, { setSubmitting, resetForm }) => {
      registrarUsuario();

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

  // Realiza un POST al API de crear Delegado en backend

  const postDelegado = async (datos) => {
    const res = await axios
      .post(DELEGADO_URL, {
        ...datos,
      })
      .then(function (response) {
        console.log(response);
        return response;
      })
      .catch(function (error) {
        console.log(error);
        return error.response;
      });
    console.log("Response Delegado: " + JSON.stringify(res));
    return res;
  }

  const registrarUsuario = async () => {

    if (await existeFotosDuplicadas(values.fotoDNI, values.fotoPerfil)) {
      setAlertColor("error");
      setAlertContent(configData.MENSAJE_REGISTRO_DELEGADO_FOTOS_DUPLICADAS);
      setOpen(true);

    } else {

      var imageFotoPerfilURL = "";
      var imageFotoDNIURL = "";

      if ((selectedFileFotoPerfil && values.fotoPerfil) && (selectedFileFotoDNI && values.fotoDNI)) {
        imageFotoPerfilURL = await postImageToServerExt(selectedFileFotoPerfil);
        imageFotoDNIURL = await postImageToServerExt(selectedFileFotoDNI);
      }

      console.log("Torneo: " + values.torneo);
      var selectedTorneo = torneos.find(torneo => torneo.Nombre_Torneo === values.torneo);
      console.log("Torneo ID: " + selectedTorneo.id);

      const datos = {
        CI: values.dni,
        Nombre: values.nombre,
        Apellido: values.apellido,
        Telefono: values.telefono,
        Contraseña: values.password,
        Contraseña_confirmed: values.confirmPassword,
        Correo: values.email,
        Foto_Perfil: imageFotoPerfilURL,
        Foto_DNI: imageFotoDNIURL,
        Cod_Torneo: selectedTorneo.id
      };

      console.log("Delegado: " + JSON.stringify(datos));



      var response = await postDelegado(datos);

      if (response.status === 200) {
        console.log("Sucess Response--->" + response.status);
        setAlertColor("success");
        setAlertContent(configData.MENSAJE_REGISTRO_USUARIO_CON_EXITO);
        setOpen(true);
        borrar();
        delayAndGo();
      }

      if (response.status === 400) {
        var errorRes = response.data;
        console.log("Error Response---" + JSON.stringify(errorRes));

        if (errorRes.errorCode === "23505") {
          setAlertColor("error");
          setAlertContent(configData.MENSAJE_REGISTRO_DELEGADO_CON_DNI_DUPLICADO);
          setOpen(true);
        }
      }
    }
  };

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const existeFotosDuplicadas = async (fotoDNI, fotoPerfil) => {
    var fotoDNIData = await toBase64(fotoDNI);
    var fotoPerfilData = await toBase64(fotoPerfil);
    var iguales = Object.is(fotoDNIData, fotoPerfilData);
    console.log("Son iguales---->", iguales);
    return iguales;
  }

  function borrar() {
    document.getElementById("fotoPerfil").value = "";
    document.getElementById("fotoDNI").value = "";
    return resetForm();
  }

  useEffect(() => {
    getTorneos();
  }, [])

  return (
    <Grid justifyItems="center" className="contentRegistrarse">
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
      <Typography
        variant="h3"
        align="center"
        color="#ffff"
        sx={{
          input: { color: "white" },
        }}
      >
        Registro
      </Typography>
      <br></br>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <TextField
              InputLabelProps={{
                style: { color: "#ffff" },
              }}
              sx={{
                color: "white",
                "& .MuiInputBase-root": { color: "white" },
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
                style: { color: "#ffff" },
              }}
              sx={{
                color: "white",
                "& .MuiInputBase-root": { color: "white" },
              }}
              required
              id="apellido"
              name="apellido"
              label="Apellido(s)"
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
            <TextField
              InputLabelProps={{
                style: { color: "#ffff" },
              }}
              required
              variant="standard"
              id="telefono"
              name="telefono"
              label="Teléfono"
              /*defaultCountry={'bo'}
              regions={['south-america']}*/
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.telefono}
              error={touched.telefono && Boolean(errors.telefono)}
              helperText={touched.telefono && errors.telefono}
              sx={{
                color: "white",
                "& .MuiInputBase-root": { color: "white" },
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
                style: { color: "#ffff" },
              }}
              sx={{
                color: "white",
                "& .MuiInputBase-root": { color: "white" },
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
            <FormControl
              fullWidth
              required
              variant="standard"
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
                Contraseña
              </InputLabel>
              <Input
                required
                fullWidth
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
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
            <FormControl
              fullWidth
              required
              variant="standard"
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
                Confirmar Contraseña
              </InputLabel>
              <Input
                required
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      sx={{
                        ".MuiSvgIcon-root ": {
                          fill: "white !important",
                        },
                        "& .MuiInputBase-input": {
                          color: "white",
                        },
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
              required
              id="dni"
              name="dni"
              label="DNI/CI"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.dni}
              error={touched.dni && Boolean(errors.dni)}
              helperText={touched.dni && errors.dni}
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
              required
              id="direccion"
              name="direccion"
              label="Dirección"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.direccion}
              error={touched.direccion && Boolean(errors.direccion)}
              helperText={touched.direccion && errors.direccion}
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
                    setSelectedFileFotoDNI(file);
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
                label: { color: "#ffff" },
                input: { color: "#ffff" },
                svg: { color: "#ffff" },
                width: "100%",
              }}
            />
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
                    setSelectedFileFotoPerfil(file);
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
                label: { color: "#ffff" },
                input: { color: "#ffff" },
                svg: { color: "#ffff" },
                width: "100%",
              }}
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
                }}>Torneo</InputLabel>
              <Select
                id="torneo"
                name="torneo"
                label="Torneo"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.torneo}
                error={touched.torneo && Boolean(errors.torneo)}
                helperText={touched.torneo && errors.torneo}
                sx={{
                  '& .MuiInputBase-input': {
                    color: 'white'

                  },
                  '& .MuiSelect-iconStandard': {
                    color: 'white'
                  }
                }}
              >

                {torneos.map(({ id, Nombre_Torneo }, index) => (
                  <MenuItem key={index} value={Nombre_Torneo}>
                    {Nombre_Torneo}
                  </MenuItem>
                ))}
              </Select>
              {touched.torneo && errors.torneo ? (
                <FormHelperText
                  sx={{ color: "#d32f2f", marginLeft: "!important" }}
                >
                  {touched.torneo && errors.torneo}
                </FormHelperText>
              ) : null}
            </FormControl>
          </Grid>

        </Grid>
        <Stack
          m={5}
          direction="row"
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            type="submit"
            sx={{ width: "25%" }}
          >
            Registrar
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={borrar}
            sx={{ width: "25%" }}
          >
            Cancelar
          </Button>
        </Stack>
      </form>
    </Grid>
  );
};

export default Registrarse;
