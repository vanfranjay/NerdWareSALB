import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SelectCategoria from '../componentes/SelectCategoria';
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
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
//Setup for Datepicker
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from "moment";
import "moment/locale/es";
import axios from "axios";
import configData from "../config/config.json";

const RegistrarEquipo = () => {

  const navigate = useNavigate();
  var userID = localStorage.getItem('userID');
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "application/pdf"];
  const FILE_SIZE = 7340032; // 7MB de tamaño del archivo
  const phoneRegExp = /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/;

  const [selectedFile, setSelectedFile] = useState();

  const [open, setOpen] = React.useState(false);
  const [alertColor, setAlertColor] = useState('');
  const [alertContent, setAlertContent] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [categoriasTorneo, setCategoriasTorneo] = useState([]);
  const [delegado, setDelegado] = useState([]);
  const [torneos, setTorneos] = useState([]);

  const EQUIPOS_URL = configData.EQUIPOS_API_URL || "http://127.0.0.1:8000/api/equipos";
  const TORNEOS_URL = configData.TORNEOS_API_URL || "http://127.0.0.1:8000/api/torneos";
  const DELEGADO_URL = configData.DELEGADO_API_URL || "http://127.0.0.1:8000/api/delegados";
  const DEC_BOLETA_DELEGADO_URL = configData.BOLETA_DELEGADO_API_URL || "http://127.0.0.1:8000/api/delbol/";
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
        setCategorias(filtrarCategoriasDelTorneo(response.data));
      }).catch(error => {
        console.log(error);
      })
  }

  const getTorneos = async () => {
    await axios.get(TORNEOS_URL)
      .then(response => {
        setTorneos(response.data);
        console.log("Torneos: " + JSON.stringify(response.data));
      }).catch(error => {
        console.log(error);
      })
  }

  const filtrarCategoriasDelTorneo = async (categoriasData) => {
    console.log('User ID: ' + userID);
    const resDelegado = await getDelegado(DELEGADO_URL + '/' + userID);
    var delegado = await resDelegado.json();

    var filteredCategorias = categoriasData.filter(categoria => categoria.Cod_Torneo == delegado.Cod_Torneo);

    setCategoriasTorneo(filteredCategorias);
    console.log("Categorias Filtradas : " + JSON.stringify(filteredCategorias));
    return filteredCategorias;
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const formValidationSchema = Yup.object({
    nombreEquipo: Yup
      .string('Ingrese el Nombre del equipo')
      .min(2, 'Nombre del equipo debe ser mínimo 2 caracteres')
      .max(30, "Nombre del equipo debe ser máximo 30 caracteres")
      .required('Nombre del equipo es requerido'),
    categoriaEquipo: Yup
      .string('Ingrese la categoria del equipo')
      .required('Categoria del equipo es requerido'),
    entrenador: Yup
      .string('Ingrese el Entrenador')
      .min(2, 'Entrenador debe ser mínimo 2 caracteres')
      .max(30, "Entrenador debe ser máximo 30 caracteres")
      .required('Entrenador es requerido'),
    logoEquipo: Yup.mixed()
      .nullable()
      .test("fileSize",
        "El tamaño del archivo sobre pasa los 7MB",
        value => !value || (value && value.size <= FILE_SIZE))
      .test(
        "fileType",
        "El tipo de archivo no es permitido",
        value => !value || (value && SUPPORTED_FORMATS.includes(value.type))),
  });

  const { handleSubmit, resetForm, handleChange, values, touched, errors, handleBlur, setFieldValue } = useFormik({
    initialValues: {
      nombreEquipo: '',
      categoriaEquipo: '',
      entrenador: '',
      logoEquipo: undefined

    },

    validationSchema: formValidationSchema,

    onSubmit: (values, { setSubmitting, resetForm }) => {
      registrarEquipo();

      setSubmitting(true);
      setTimeout(() => {
        //resetForm();
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

  const postImageToServerExt = async () => {
    var imageData = await toBase64(selectedFile);
    var imageToSend = imageData.replace(/^data:image\/[a-z]+;base64,/, "");

    var formdata = new FormData();
    formdata.append("image", imageToSend);

    var imagePosted =
      await axios
        .post(
          `https://api.imgbb.com/1/upload?key=c035e32600d4b0aa7ea07ae391739374`,
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

  // Realiza un POST al API de crear Boleta en backend

  const postEquipo = async (url, datos) => {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response;
  }

  const registrarEquipo = async () => {

    //var comprobantePagoFile = await toBase64(selectedFile);
    var imageURL = "";
    if (selectedFile && values.logoEquipo) {
      imageURL = await postImageToServerExt();
    }

    var selectedCategoria = categoriasTorneo.find(categoria => categoria.Categoria === values.categoriaEquipo);
    console.log("Categoria ID: " + selectedCategoria);

    const datos = {
      "Nombre_Equipo": values.nombreEquipo,
      "Logo": imageURL ? imageURL : "",
      "Entrenador": values.entrenador,
      "Partidos_Jugados": 0,
      "Partidos_Ganados": 0,
      "Partidos_Perdidos": 0,
      "Cod_Categoria": selectedCategoria.id,
      "Cod_Partidos": null,
      "Cod_Delegado": 1
    };
    console.log("Equipo: ------> " + JSON.stringify(datos));

    const resDelegadoVouchers = await getDelegado(DELEGADO_URL + '/' + userID);
    const responseVouchersDisp = await resDelegadoVouchers.json();

    console.log("Contador voucher delegado: " + responseVouchersDisp.Contador);

    if (responseVouchersDisp.Contador > 0) {

      // Hacemos el post de Equipo 
      const respuestaJson = await postEquipo(EQUIPOS_URL, datos);

      //Validadando si se envio correctamente o hubo algun fallo
      console.log("Response:------> " + respuestaJson.status);
      if (respuestaJson.status === 200) {
        const resIncVoucherDelegado = decVoucherDelegado(DEC_BOLETA_DELEGADO_URL + userID);
        setAlertColor("success");
        setAlertContent("Se registro el equipo exitosamente");
        setOpen(true);
        borrar();
        var equipo = await respuestaJson.json();
      }

      if (respuestaJson.status === 400) {
        var errorRes = await respuestaJson.json();
        console.log("Error Response---" + JSON.stringify(errorRes));

        var mensajeDeDuplicado = "El equipo ya fue registrado en la misma categoria seleccionada"

        if (errorRes.ErrorMessage === mensajeDeDuplicado) {
          setAlertColor("error");
          setAlertContent(mensajeDeDuplicado);
          setOpen(true);
        }
      }
    } else {
      setAlertColor("error");
      setAlertContent("No tiene vouchers disponibles para registrar un equipo");
      setOpen(true);
      borrar();
    }

  }

  const getDelegado = async (url) => {
    const response = await fetch(url, {
      method: 'GET',
      //body: JSON.stringify(datos),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response;
  }

  const decVoucherDelegado = async (url) => {
    const response = await fetch(url, {
      method: 'PUT',
      //body: JSON.stringify(datos),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response;
  }

  function borrar() {
    document.getElementById("logoEquipo").value = "";
    return resetForm();
  }

  useEffect(() => {
    getCategorias();
    getTorneos();
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
          Registrar Equipo
        </Typography>
        <br>
        </br>
        <br>
        </br>
        <form>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                type="text"
                id="nombreEquipo"
                name="nombreEquipo"
                label="Nombre del equipo"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nombreEquipo}
                error={touched.nombreEquipo && Boolean(errors.nombreEquipo)}
                helperText={touched.nombreEquipo && errors.nombreEquipo}
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
                  }}>Categoria</InputLabel>
                <Select

                  id="categoriaEquipo"
                  name="categoriaEquipo"
                  label="Categoria"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.categoriaEquipo}
                  error={touched.categoriaEquipo && Boolean(errors.categoriaEquipo)}
                  helperText={touched.categoriaEquipo && errors.categoriaEquipo}
                  sx={{
                    '& .MuiInputBase-input': {
                      color: 'white'

                    },
                    '& .MuiSelect-iconStandard': {
                      color: 'white'
                    }
                  }}
                >
                  {categoriasTorneo ? categoriasTorneo.map(({ id, Categoria }, index) => (
                    <MenuItem key={index} value={Categoria}>
                      {Categoria}
                    </MenuItem>
                  )) : []}
                </Select>
                {touched.categoriaEquipo && errors.categoriaEquipo ? (
                  <FormHelperText
                    sx={{ color: "#d32f2f", marginLeft: "!important" }}
                  >
                    {touched.categoriaEquipo && errors.categoriaEquipo}
                  </FormHelperText>
                ) : null}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                type="text"
                id="entrenador"
                name="entrenador"
                label="Entrenador"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.entrenador}
                error={touched.entrenador && Boolean(errors.entrenador)}
                helperText={touched.entrenador && errors.entrenador}
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
                id="logoEquipo"
                name="logoEquipo"
                type="file"
                label="Logo"
                variant="standard"
                onChange={({ currentTarget }) => {
                  const file = currentTarget.files[0];
                  const reader = new FileReader();
                  if (file) {
                    reader.onloadend = () => {
                      setSelectedFile(file)
                    };
                    reader.readAsDataURL(file);
                    setFieldValue("logoEquipo", file);
                  }
                }}
                onBlur={handleBlur}
                error={touched.logoEquipo && Boolean(errors.logoEquipo)}
                helperText={touched.logoEquipo && errors.logoEquipo}
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
          <br></br>
          <br></br>
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

export default RegistrarEquipo