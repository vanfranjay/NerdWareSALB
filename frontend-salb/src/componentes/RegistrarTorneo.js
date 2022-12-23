import React, { useState, useEffect } from "react";
import { Divider, Grid, MenuItem, Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import "../css/usuario.css";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Button from "@mui/material/Button";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Field, Formik, Form, ErrorMessage } from "formik";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import configData from "../config/config.json";
import { Container, Stack } from '@mui/system';

//Setup for Moment
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment, { now } from "moment";
import "moment/locale/es";

const CATEGORIAS_URL =
  configData.CATEGORIAS_API_URL || "http://127.0.0.1:8000/api/categorias";
const TORNEOS_URL =
  configData.TORNEOS_API_URL || "http://127.0.0.1:8000/api/torneos";

//const ITEM_HEIGHT = 48;
//const ITEM_PADDING_TOP = 8;
//const MenuProps = {
//  PaperProps: {
//    style: {
//      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//      width: 250,
//    },
//  },
//};
//
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "start",
  color: theme.palette.text.secondary,
}));

const registrarCategorias = async (categorias) => {
  categorias.forEach(function (item, index) {
    const { data } = axios.post(CATEGORIAS_URL, {
      Categoria: item,
    });
  });
};

const postRegistrarTorneo = async (datos) => {
  console.log("Send Torneo: " + JSON.stringify(datos));
  const response = await fetch(TORNEOS_URL, {
    method: 'POST',
    body: JSON.stringify(datos),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response;
}

const postRegistrarCategorias = async (datos) => {
  const response = await fetch(CATEGORIAS_URL, {
    method: 'POST',
    body: JSON.stringify(datos),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response;
}

const RegistrarTorneo = () => {
  var userID = localStorage.getItem('userID');
  const [open, setOpen] = React.useState(false);
  const [alertColor, setAlertColor] = useState('');
  const [alertContent, setAlertContent] = useState('');
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const [formularioNoEnviado, setFormularioNoEnviado] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [torneos, setTorneos] = useState([]);
  const [fechaTorneoValida, setFechaTorneoValida] = useState([]);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

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

  const getTorneos = async () => {
    await axios.get(TORNEOS_URL)
      .then(response => {
        setTorneos(response.data);
        console.log("Torneos: " + JSON.stringify(response.data));
      }).catch(error => {
        console.log(error);
      })
  }

  var today = new Date();

  // `getDate()` devuelve el día del mes (del 1 al 31)
  var day = today.getDate();

  // `getMonth()` devuelve el mes (de 0 a 11)
  var month = today.getMonth() + 1;

  // `getFullYear()` devuelve el año completo
  var year = today.getFullYear();

  // muestra la fecha de hoy en formato `MM/DD/YYYY`
  const fechaActual = `${year}-${month}-${day}`;
  //console.log(fechaActual);

  function sumarDias(fecha, dias) {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

  const enviarTorneoData = async (torneoData, resetForm) => {

    const data = {
      Campeon: torneoData.Campeon,
      Subcampeon: torneoData.Subcampeon,
      Fecha_Ini_Convocatoria: torneoData.Fecha_Ini_Preinscripcion,
      Fecha_Fin_Convocatoria: torneoData.Fecha_Fin_Inscripcion,
      Invitacion: torneoData.Invitacion,
      Nombre_Torneo: torneoData.Nombre_Torneo,
      Lugar_Evento: torneoData.Lugar_Evento,
      Fecha_Ini_Torneo: torneoData.Fecha_Ini_Torneo,
      Fecha_Fin_Torneo: torneoData.Fecha_Fin_Torneo,
      Categoria: torneoData.Categoria,
      Rama: torneoData.Rama,
      Caracter: torneoData.Caracter,
      MontoPreinscripcion: torneoData.MontoPreinscripcion,
      Fecha_Ini_Preinscripcion: torneoData.Fecha_Ini_Preinscripcion,
      Fecha_Fin_Preinscripcion: torneoData.Fecha_Fin_Preinscripcion,
      MontoInscripcion: torneoData.MontoInscripcion,
      Fecha_Ini_Inscripcion: torneoData.Fecha_Ini_Inscripcion,
      Fecha_Fin_Inscripcion: torneoData.Fecha_Fin_Inscripcion,
      Telefono: torneoData.Telefono,
      Responsable: torneoData.Responsable,
      Canchas_Disponibles: torneoData.Canchas_Disponibles
    }

    var categoriasData = [];

    //console.log("Existe Nombre de Torneo:" + torneo.Nombre_Torneo === data.Nombre_Torneo);
    //console.log("Existe Fechas:" + torneo.Fecha_Ini_Torneo === data.Fecha_Fin_Torneo);
    var existeTorneo = torneos.some(torneo => ((torneo.Nombre_Torneo == data.Nombre_Torneo) || esValidoFechas(data, torneo)));
    console.log("Existe Torneo:" + existeTorneo);
    if (!existeTorneo) {
      const responseTorneo = await postRegistrarTorneo(data);
      var torneo = await responseTorneo.json();

      if (responseTorneo.status === 201) {

        setAlertColor("success");
        setAlertContent("Torneo registrado exitosamente");
        setOpen(true);
        var categoriasSelected = torneoData.Categoria;
        var categoriasData = [];
        console.log("Categorias seleccionadas:" + categoriasSelected);
        categoriasSelected.forEach((categoria) => {

          categoriasData.push({
            Categoria: categoria,
            Cod_Torneo: torneo.id
          });

        });
        console.log("Categorias Data:" + JSON.stringify(categoriasData));

        categoriasData.forEach((categoria) => {
          postRegistrarCategorias(categoria);
        });
        resetForm();
        //setFormularioEnviado(true);

      }

      if (responseTorneo.status === 400) {
        if (torneo.Message === "La fecha Inicio de Torneo, conincide con el toreno actual") {
          setAlertColor("error");
          setAlertContent("La Fecha Inicio y Fin de torneo, coincide con las fechas torneo actual");
          setOpen(true);
        }
      }
    } else {
      setAlertColor("error");
      setAlertContent("Ya existe un torneo con el mismo nombre y rango de fechas registrado");
      setOpen(true);
    }
  }

  const esValidoFechas = (newTorneo, createdTorneo) => {

    var dateNewIniTorneo = moment(newTorneo.Fecha_Ini_Torneo);
    var dateNewFinTorneo = moment(newTorneo.Fecha_Fin_Torneo);

    var dateCreatedIniTorneo = moment(createdTorneo.Fecha_Ini_Torneo);
    var dateCreatedFinTorneo = moment(createdTorneo.Fecha_Fin_Torneo);

    var existeFechaIni = moment(dateNewIniTorneo).isBetween(dateCreatedIniTorneo, dateCreatedFinTorneo, undefined, '[]');
    var existeFechaFin = moment(dateNewFinTorneo).isBetween(dateCreatedIniTorneo, dateCreatedFinTorneo, undefined, '[]');
    return existeFechaIni || existeFechaFin;
  };

  //const [torneo, setTorneo] = useState({
  //  Campeon: "Bolivar",
  //  Subcampeon: "hola",
  //  FechaActual_Ini_Convocatoria: "2022-10-15",
  //  Fecha_Fin_Convocatoria: "2022-11-30",
  //  Invitacion: "",
  //  Nombre_Torneo: "",
  //  Lugar_Evento: "",
  //  Fecha_Ini_Torneo: "",
  //  Fecha_Fin_Torneo: "",
  //  Categoria: [],
  //  Rama: "",
  //  Caracter: "",
  //  MontoPreinscripcion: "",
  //  Fecha_Ini_Preinscripcion: "",
  //  Fecha_Fin_Preinscripcion: "",
  //  MontoInscripcion: "",
  //  Fecha_Ini_Inscripcion: "",
  //  Fecha_Fin_Inscripcion: "",
  //  Telefono: "",
  //  Responsable: "",
  //});

  //const registerTorneo = async (event) => {
  //  event.preventDefault();
  //  try {
  //    const { data } = await axios.post("http://127.0.0.1:8000/api/torneos", {
  //      ...torneo,
  //      Categoria: torneo.Categoria.join(","),
  //    });
  //    console.log(data);
  //    //reiniciar();
  //  } catch (error) {
  //    console.log(error);
  //  }
  //};
  //const reiniciar = () => {
  //  valores({
  //    Campeon: "Bolivar",
  //    Subcampeon: "hola",
  //    Fecha_Ini_Convocatoria: "2022-10-15",
  //    Fecha_Fin_Convocatoria: "2022-11-30",
  //    Invitacion: "",
  //    Nombre_Torneo: "",
  //    Lugar_Evento: "",
  //    Fecha_Ini_Torneo: "",
  //    Fecha_Fin_Torneo: "",
  //    Categoria: [],
  //    Rama: "",
  //    Caracter: "",
  //    MontoPreinscripcion: "",
  //    Fecha_Ini_Preinscripcion: "",
  //    Fecha_Fin_Preinscripcion: "",
  //    MontoInscripcion: "",
  //    Fecha_Ini_Inscripcion: "",
  //    Fecha_Fin_Inscripcion: "",
  //    Telefono: "",
  //    Responsable: "",
  //  });
  //};

  //const handleChanges = (event) => {
  //  const {
  //    target: { value },
  //  } = event;
  //  setTorneo(
  //    {
  //      ...torneo,
  //      Categoria: typeof value === "string" ? value.split(",") : value,
  //    }
  //    // On autofill we get a stringified value.
  //  );
  //};

  /**
  function borrar() {
    document.getElementById("logoEquipo").value = "";
    return resetForm();
  }
  */


  useEffect(() => {

    getCategorias();
    getTorneos();

  }, [])

  return (
    <>

      <Typography
        variant="h5"
        align="center"
        color="#ffff"
        sx={{
          input: { color: "white" },
        }}
      >
        ¡Registrar Torneo!
      </Typography>
      <hr className="hr" />
      <Formik
        initialValues={{
          Campeon: "",
          Subcampeon: "",
          Fecha_Ini_Convocatoria: "",
          Fecha_Fin_Convocatoria: "",
          Invitacion: "",
          Nombre_Torneo: "",
          Lugar_Evento: "",
          Fecha_Ini_Torneo: "",
          Fecha_Fin_Torneo: "",
          Categoria: [],
          Rama: "",
          Caracter: "",
          MontoPreinscripcion: "",
          Fecha_Ini_Preinscripcion: "",
          Fecha_Fin_Preinscripcion: "",
          MontoInscripcion: "",
          Fecha_Ini_Inscripcion: "",
          Fecha_Fin_Inscripcion: "",
          Telefono: "",
          Responsable: "",
          Canchas_Disponibles: "",
        }}
        validate={(valores) => {
          let errores = {};

          var f1 = new Date(valores.Fecha_Ini_Torneo);
          var f2 = new Date(valores.Fecha_Fin_Torneo);
          var f3 = new Date(valores.Fecha_Ini_Preinscripcion);
          var f4 = new Date(valores.Fecha_Fin_Preinscripcion);
          var f5 = new Date(valores.Fecha_Ini_Inscripcion);
          var f6 = new Date(valores.Fecha_Fin_Inscripcion);
          f1.setHours(0, 0, 0, 0);
          f2.setHours(0, 0, 0, 0);
          f3.setHours(0, 0, 0, 0);
          f4.setHours(0, 0, 0, 0);
          f5.setHours(0, 0, 0, 0);
          f6.setHours(0, 0, 0, 0);

          // validacion Nombre_Torneo
          if (!valores.Nombre_Torneo) {
            errores.Nombre_Torneo = "Por favor ingresa un nombre de torneo";
          } else if (!/^[a-zA-ZÀ-ÿ\s0-9]{1,40}$/.test(valores.Nombre_Torneo)) {
            errores.Nombre_Torneo =
              "El nombre del Torneo solo puede contener letras y espacios";
          }
          // validaciones para Categoria
          if (valores.Categoria.length === 0) {
            errores.Categoria =
              "Por favor seleccione la categoria o las categorias para el torneo";
          }
          // validacion de Fecha_Ini_Torneo
          if (!valores.Fecha_Ini_Torneo) {
            errores.Fecha_Ini_Torneo =
              "Por favor seleccione una fecha de inicio del torneo";
          } else if (f1.getTime() > f2.getTime()) {
            errores.Fecha_Ini_Torneo =
              "La fecha de inico del evento tiene que ser menor a la fecha de finalización del torneo";
          } else if (f1.getTime() <= f3.getTime()) {
            errores.Fecha_Ini_Torneo =
              "La fecha de inicio del evento tiene que ser mayor a la fecha de inico de preinscripción";
          } else if (f1.getTime() <= f4.getTime()) {
            errores.Fecha_Ini_Torneo =
              "La fecha de inicio del evento tiene que ser mayor a la fecha de fin de preinscripción";
          } else if (f1.getTime() <= f5.getTime()) {
            errores.Fecha_Ini_Torneo =
              "La fecha de inicio del evento tiene que ser mayor a la fecha de inico de inscripción";
          } else if (f1.getTime() <= f6.getTime()) {
            errores.Fecha_Ini_Torneo =
              "La fecha de inicio del evento tiene que ser mayor a la fecha de fin de inscripción";
          } else if (valores.Fecha_Ini_Torneo < fechaActual) {
            errores.Fecha_Ini_Torneo = "Fecha inicio de torneo invalido";
          }
          // validacion de Fecha_Fin_Torneo
          if (!valores.Fecha_Fin_Torneo) {
            errores.Fecha_Fin_Torneo =
              "Por favor seleccione una fecha de fin del torneo";
          } else if (!valores.Fecha_Ini_Torneo) {
            errores.Fecha_Fin_Torneo =
              "Por favor establesca una fecha de inicio del torneo";
          } else if (f2.getTime() < sumarDias(f1, 5).getTime()) {
            errores.Fecha_Fin_Torneo =
              "El torneo tiene que tener una duración minima de 5 dias";
          } else if (f2.getTime() <= f3.getTime()) {
            errores.Fecha_Fin_Torneo =
              "La fecha de finalización del evento tiene que ser mayor a la fecha de inicio de preinscripción";
          } else if (f2.getTime() <= f4.getTime()) {
            errores.Fecha_Fin_Torneo =
              "La fecha de finalización del evento tiene que ser mayor a la fecha de fin de preinscripción";
          } else if (f2.getTime() <= f5.getTime()) {
            errores.Fecha_Fin_Torneo =
              "La fecha de finalización del evento tiene que ser mayor a la fecha de inicio de inscripción";
          } else if (f2.getTime() <= f6.getTime()) {
            errores.Fecha_Fin_Torneo =
              "La fecha de finalización del evento tiene que ser mayor a la feha fin de inscripción";
          }
          // validación para caracter del evento
          if (!valores.Caracter) {
            errores.Caracter = "Por favor seleccione el caracter del evento";
          }
          // validacion de Lugar_Evento
          if (!valores.Lugar_Evento) {
            errores.Lugar_Evento = "Por favor ingresa el lugar del evento";
          } else if (!/^[a-zA-ZÀ-ÿ\s-./]{1,40}$/.test(valores.Lugar_Evento)) {
            errores.Lugar_Evento =
              "El lugar del evento solo puede contener letras, espacios, - y /";
          }
          // validación para Rama
          if (!valores.Rama) {
            errores.Rama = "Por favor seleccione una rama";
          }
          // validacion Invitacion
          if (!valores.Invitacion) {
            errores.Invitacion = "Por favor ingresa una invitación para";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,100}$/.test(valores.Invitacion)) {
            errores.Invitacion =
              "La invitación solo puede contener letras y espacios";
          }
          // validación para Responsable
          if (!valores.Responsable) {
            errores.Responsable =
              "Por favor ingresa el nombre del responsable del evento";
          } else if (!/^[a-zA-ZÀ-ÿ\s.]{1,40}$/.test(valores.Responsable)) {
            errores.Responsable =
              "El nombre del responsable solo puede contener letras y espacios";
          }
          // validación para Telefono
          if (!valores.Telefono) {
            errores.Telefono =
              "Por favor ingresa el número telefónico del responsable";
          } else if (!/^\d{7,20}$/.test(valores.Telefono)) {
            errores.Telefono =
              "El teléfono solo puede contener números y tiene que tener un mínimo de 7 digitos";
          }


          // validación para MontoPreinscripcion
          if (!valores.MontoPreinscripcion) {
            errores.MontoPreinscripcion =
              "Por favor ingresa un monto de pre-inscripción";
          } else if (
            !/^\d{1,40}\.?\d{0,2}$/.test(valores.MontoPreinscripcion)
          ) {
            errores.MontoPreinscripcion =
              'El monto pre-inscripción solo puede contener una secuencia de numeros seguido de un "." y 2 decimales';
          }
          // validación para MontoInscripcion
          if (!valores.MontoInscripcion) {
            errores.MontoInscripcion =
              "Por favor ingresa el monto de inscripción";
          } else if (!/^\d{1,40}\.?\d{0,2}$/.test(valores.MontoInscripcion)) {
            errores.MontoInscripcion =
              "El monto de inscripción solo puede contener números";
          }

          // validacion de Fecha_Ini_Preinscripcion
          if (!valores.Fecha_Ini_Preinscripcion) {
            errores.Fecha_Ini_Preinscripcion =
              "Por favor seleccione una fecha de pre-inscripción del torneo";
          } else if (f3.getTime() > f4.getTime()) {
            errores.Fecha_Ini_Preinscripcion =
              "La fecha de inicio de preinscripción tiene que ser menor a la fecha de fin de pre-inscripción";
          } else if (f3.getTime() >= f1.getTime()) {
            errores.Fecha_Ini_Preinscripcion =
              "La fecha de inicio de preinscripción tiene que ser menor a la fecha de inicio del torneo";
          } else if (f3.getTime() >= f2.getTime()) {
            errores.Fecha_Ini_Preinscripcion =
              "La fecha de inicio de preinscripción tiene que ser menor a la feha fin de torneo";
          } else if (f3.getTime() >= f5.getTime()) {
            errores.Fecha_Ini_Preinscripcion =
              "La fecha de inicio de preinscripción tiene que ser menor a la feha fin de inscripción";
          } else if (f3.getTime() >= f6.getTime()) {
            errores.Fecha_Ini_Preinscripcion =
              "La fecha de inicio de preinscripción tiene que ser menor a la fecha fin de inscripción";
          } else if (valores.Fecha_Ini_Preinscripcion < fechaActual) {
            errores.Fecha_Ini_Preinscripcion =
              "Fecha inicio de preinscripción invalido";
          }
          // validacion de Fecha_Fin_Preinscripcion
          if (!valores.Fecha_Fin_Preinscripcion) {
            errores.Fecha_Fin_Preinscripcion =
              "Por favor seleccione una fecha de fin de pre-inscripción del torneo";
          } else if (!valores.Fecha_Ini_Preinscripcion) {
            errores.Fecha_Fin_Preinscripcion =
              "Por favor establesca una fecha de inicio de pre-inscripción";
          } else if (sumarDias(f3, 1).getTime() > f4.getTime()) {
            errores.Fecha_Fin_Preinscripcion =
              "La fecha de fin de preinscripción del torneo tiene que ser mayor a la fecha de inicio de pre-inscripción, por lo menos con 1 dia";
          } else if (f4.getTime() >= f1.getTime()) {
            errores.Fecha_Fin_Preinscripcion =
              "La fecha de fin de preinscripción del torneo tiene que ser menor a la fecha de inico del torneo";
          } else if (f4.getTime() >= f2.getTime()) {
            errores.Fecha_Fin_Preinscripcion =
              "La fecha de fin de preinscripción del torneo tiene que ser menor a la fecha fin del torneo";
          } else if (f4.getTime() >= f5.getTime()) {
            errores.Fecha_Fin_Preinscripcion =
              "La fecha de fin de preinscripción del torneo tiene que ser menor a la fecha inicio de inscripción";
          } else if (f4.getTime() >= f6.getTime()) {
            errores.Fecha_Fin_Preinscripcion =
              "La fecha de fin de preinscripción del torneo tiene que ser menor a la fecha fin de inscripción";
          }
          // validacion de Fecha_Ini_Inscripcion
          if (!valores.Fecha_Ini_Inscripcion) {
            errores.Fecha_Ini_Inscripcion =
              "Por favor seleccione una fecha inscripción del evento";
          } else if (f5.getTime() > f6.getTime()) {
            errores.Fecha_Ini_Inscripcion =
              "La fecha de inicio de inscripción tiene que ser menor a la fecha de fin de inscripción";
          } else if (f5.getTime() >= f1.getTime()) {
            errores.Fecha_Ini_Inscripcion =
              "La fecha de inicio de inscripción tiene que ser menor a la fecha de inicio del torneo";
          } else if (f5.getTime() >= f2.getTime()) {
            errores.Fecha_Ini_Inscripcion =
              "La fecha de inicio de inscripción tiene que ser menor a la fecha fin del torneo";
          } else if (f5.getTime() <= f3.getTime()) {
            errores.Fecha_Ini_Inscripcion =
              "La fecha de inicio de inscripción tiene que ser mayor a la fecha de inicio de preinscripción";
          } else if (f5.getTime() <= f4.getTime()) {
            errores.Fecha_Ini_Inscripcion =
              "La fecha de inicio de inscripción tiene que ser mayor a la fecha fin de preinscripción";
          } else if (valores.Fecha_Ini_Inscripcion < fechaActual) {
            errores.Fecha_Ini_Inscripcion =
              "Fecha inicio de inscripción invalido";
          }
          // validacion de Fecha_Fin_Inscripcion
          if (!valores.Fecha_Fin_Inscripcion) {
            errores.Fecha_Fin_Inscripcion =
              "Por favor seleccione una fecha de fin de inscripción del torneo";
          } else if (!valores.Fecha_Ini_Inscripcion) {
            errores.Fecha_Fin_Inscripcion =
              "Por favor establesca una fecha de inicio de inscripción";
          } else if (sumarDias(f5, 1).getTime() > f6.getTime()) {
            errores.Fecha_Fin_Inscripcion =
              "La fecha de fin de inscripción del torneo tiene que ser mayor a la fecha de inicio de inscripción, por lo menos con 1 día";
          } else if (f6.getTime() >= f1.getTime()) {
            errores.Fecha_Fin_Inscripcion =
              "La fecha de fin de inscripción del torneo tiene que ser menor a la fecha de inicio del torneo";
          } else if (f6.getTime() >= f2.getTime()) {
            errores.Fecha_Fin_Inscripcion =
              "La fecha de fin de inscripción del torneo tiene que ser menor a la fecha fin del torneo";
          } else if (f6.getTime() <= f3.getTime()) {
            errores.Fecha_Fin_Inscripcion =
              "La fecha de fin de inscripción del torneo tiene que ser mayor a la fecha inicio de preinscripción";
          } else if (f6.getTime() <= f4.getTime()) {
            errores.Fecha_Fin_Inscripcion =
              "La fecha de fin de inscripción del torneo tiene que ser mayor a la fecha fin de preinscripción";
          }
          // validacion de MontoPreinscripcion
          if (!valores.MontoPreinscripcion) {
            errores.MontoPreinscripcion =
              "Por favor seleccione un monto de preinscripción";
          } else if (valores.MontoInscripcion && (valores.MontoPreinscripcion >= valores.MontoInscripcion)) {
            errores.MontoPreinscripcion =
              "El monto de preinscripción no puede ser mayor o igual al monto de inscripción";
          }
          // validacion de MontoInscripcion
          if (!valores.MontoInscripcion) {
            errores.MontoInscripcion =
              "Por favor seleccione un monto de inscripción";
          } else if (valores.MontoInscripcion <= valores.MontoPreinscripcion) {
            errores.MontoInscripcion =
              "El monto de inscripción no puede ser menor o igual al monto de preinscripción";
          }
          // validacion de Canchas_Disponibles
          if (!valores.Canchas_Disponibles) {
            errores.Canchas_Disponibles =
              "Por favor seleccione la cantidad de canchas deportivas disponibles para el torneo";
          } else if (!/^[1-9]\d*$/.test(valores.Canchas_Disponibles)) {
            errores.Canchas_Disponibles =
              "El número ingresado no puede ser cero";
          }

          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          try {
            enviarTorneoData(valores, resetForm);
            console.log("Es Formulario Enviado: " + formularioEnviado);

            if (formularioEnviado) {
              console.log("Formulario enviado IF: " + formularioEnviado);

              //setFormularioEnviado(false);
            }
            //setTimeout(() => setFormularioEnviado(false), 3000);
          } catch (error) {
            console.log(error);
          }

          //const registrarTorneo = async () => {
          //  const resultado = await axios.get(
          //    TORNEOS_URL
          //  );
          //  if (resultado.data.length === 0) {
          //    try {
          //      //registrarCategorias(valores.Categoria);
          //      const { data } = axios.post(
          //        TORNEOS_URL,
          //        {
          //          ...valores,
          //          Categoria: valores.Categoria.join(","),
          //        }
          //      );
          //      resetForm();
          //      setFormularioEnviado(true);
          //      setTimeout(() => setFormularioEnviado(false), 3000);
          //    } catch (error) {
          //      console.log(error);
          //    }
          //  } else {
          //    setFormularioNoEnviado(true);
          //    setTimeout(() => setFormularioNoEnviado(false), 3000);
          //  }
          //};
          //registrarTorneo();
        }}
      /*const
    reiniciar={({ resetForm }) => {
        resetForm();
      }}*/
      >
        {({ handleSubmit, values, errors, touched, handleChange, handleBlur, resetForm }) => (
          <Form>
            <Snackbar open={open}
              autoHideDuration={5000}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert severity={alertColor} onClose={handleClose}>
                {alertContent}
              </Alert>
            </Snackbar>
            <div className="cuandroContentRegisterTorneo">
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Item className="fondoColor">
                    <TextField
                      sx={{
                        input: { color: "white" },
                        label: { color: "white" },
                      }}
                      id="standard-required1"
                      label="Nombre del Torneo: *"
                      name="Nombre_Torneo"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.Nombre_Torneo}
                      fullWidth
                      defaultValue=""
                      variant="standard"
                    />
                  </Item>
                  <ErrorMessage
                    name="Nombre_Torneo"
                    component={() => (
                      <Grid
                        style={{ color: "#FF0000", fontSize: "16px" }}
                        item
                        xs={12}
                        md={12}
                        fullWidth
                      >
                        {errors.Nombre_Torneo}
                      </Grid>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Item className="fondoColor">
                    <FormControl
                      variant="standard"
                      fullWidth
                      sx={{
                        input: { color: "#fff" },
                        label: { color: "#fff" },
                        select: { color: "#fff" },
                        option: { color: "#000" },
                        div: { color: "#fff" },
                      }}
                    >
                      <InputLabel id="demo-multiple-checkbox-label">
                        Categoria(as): *
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        name="Categoria"

                        onBlur={handleBlur}
                        value={values.Categoria}
                        onChange={handleChange}

                        renderValue={(selected) => selected.join(", ")}

                      >
                        <MenuItem value={"+35"}>+35</MenuItem>
                        <MenuItem value={"35"}>35</MenuItem>
                        <MenuItem value={"+40"}>+40</MenuItem>
                        <MenuItem value={"40"}>40</MenuItem>
                        <MenuItem value={"+45"}>+45</MenuItem>
                        <MenuItem value={"45"}>45</MenuItem>
                        <MenuItem value={"+50"}>+50</MenuItem>
                        <MenuItem value={"50"}>50</MenuItem>
                        <MenuItem value={"+55"}>+55</MenuItem>
                      </Select>
                    </FormControl>
                  </Item>
                  <ErrorMessage
                    name="Categoria"
                    component={() => (
                      <Grid
                        style={{ color: "#FF0000", fontSize: "16px" }}
                        item
                        xs={12}
                        md={12}
                        fullWidth
                      >
                        {errors.Categoria}
                      </Grid>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Item className="fondoColor">
                    <TextField
                      type="date"
                      id="standard-required9"
                      label="Fecha de Inicio: *"
                      name="Fecha_Ini_Torneo"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.Fecha_Ini_Torneo}
                      fullWidth
                      defaultValue=" "
                      variant="standard"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{
                        input: { color: "#fff" },
                        label: { color: "#fff" },
                      }}
                    />
                  </Item>
                  <ErrorMessage
                    name="Fecha_Ini_Torneo"
                    component={() => (
                      <Grid
                        style={{ color: "#FF0000", fontSize: "16px" }}
                        item
                        xs={12}
                        md={12}
                        fullWidth
                      >
                        {errors.Fecha_Ini_Torneo}
                      </Grid>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Item className="fondoColor">
                    <TextField
                      type="date"
                      id="standard-required10"
                      label="Fecha de Finalización: *"
                      name="Fecha_Fin_Torneo"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.Fecha_Fin_Torneo}
                      fullWidth
                      defaultValue=" "
                      variant="standard"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{
                        input: { color: "#fff" },
                        label: { color: "#fff" },
                      }}
                    />
                  </Item>
                  <ErrorMessage
                    name="Fecha_Fin_Torneo"
                    component={() => (
                      <Grid
                        style={{ color: "#FF0000", fontSize: "16px" }}
                        item
                        xs={12}
                        md={12}
                        fullWidth
                      >
                        {errors.Fecha_Fin_Torneo}
                      </Grid>
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Item className="fondoColor">
                    <FormControl
                      variant="standard"
                      fullWidth
                      sx={{
                        input: { color: "#fff" },
                        label: { color: "#fff" },
                        select: { color: "#fff" },
                        option: { color: "#000" },
                        div: { color: "#fff" },
                      }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Carácter del Evento: *
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="caracter del evento"
                        name="Caracter"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.Caracter}
                      >
                        <MenuItem value={"Internacional"}>
                          Internacional
                        </MenuItem>
                        <MenuItem value={"Nacional"}>Nacional</MenuItem>
                        <MenuItem value={"Inter-departamental"}>
                          Inter-departamental
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Item>
                  <ErrorMessage
                    name="Caracter"
                    component={() => (
                      <Grid
                        style={{ color: "#FF0000", fontSize: "16px" }}
                        item
                        xs={12}
                        md={12}
                        fullWidth
                      >
                        {errors.Caracter}
                      </Grid>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Item className="fondoColor">
                    <TextField
                      sx={{
                        input: { color: "white" },
                        label: { color: "white" },
                      }}
                      id="standard-required5"
                      label="Lugar del Evento: *"
                      fullWidth
                      defaultValue=""
                      name="Lugar_Evento"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.Lugar_Evento}
                      variant="standard"
                    />
                  </Item>
                  <ErrorMessage
                    name="Lugar_Evento"
                    component={() => (
                      <Grid
                        style={{ color: "#FF0000", fontSize: "16px" }}
                        item
                        xs={12}
                        md={12}
                        fullWidth
                      >
                        {errors.Lugar_Evento}
                      </Grid>
                    )}
                  />
                </Grid>


                <Grid item xs={12} md={6}>
                  <Item className="fondoColor">
                    <FormControl
                      variant="standard"
                      fullWidth
                      sx={{
                        input: { color: "#fff" },
                        label: { color: "#fff" },
                        select: { color: "#fff" },
                        option: { color: "#000" },
                        div: { color: "#fff" },
                      }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Rama: *
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="Rama"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.Rama}
                        label="Rama"
                      >
                        <MenuItem value={"Femenina"}>Femenina</MenuItem>
                        <MenuItem value={"Masculino"}>Masculino</MenuItem>
                      </Select>
                    </FormControl>
                  </Item>
                  <ErrorMessage
                    name="Rama"
                    component={() => (
                      <Grid
                        style={{ color: "#FF0000", fontSize: "16px" }}
                        item
                        xs={12}
                        md={12}
                        fullWidth
                      >
                        {errors.Rama}
                      </Grid>
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Item
                    className="fondoColor"
                    sx={{
                      input: { color: "white" },
                      label: { color: "white" },
                    }}
                  >
                    <TextField
                      sx={{
                        input: { color: "white" },
                        label: { color: "white" },
                        value: { color: "white" },
                      }}
                      id="standard-required"
                      label="Invitación Para: *"
                      name="Invitacion"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.Invitacion}
                      fullWidth
                      defaultValue="Equipos y clubes de maxi basquet"
                      variant="standard"
                    />
                  </Item>
                  <ErrorMessage
                    name="Invitacion"
                    component={() => (
                      <Grid
                        style={{ color: "#FF0000", fontSize: "16px" }}
                        item
                        xs={12}
                        md={12}
                        fullWidth
                      >
                        {errors.Invitacion}
                      </Grid>
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Item className="fondoColor">
                    <TextField
                      sx={{
                        input: { color: "white" },
                        label: { color: "white" },
                      }}
                      type="number"
                      id="standard-required7"
                      label="Canchas disponibles: *"
                      fullWidth
                      name="Canchas_Disponibles"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.Canchas_Disponibles}
                      defaultValue=""
                      variant="standard"
                    />
                  </Item>
                  <ErrorMessage
                    name="Canchas_Disponibles"
                    component={() => (
                      <Grid
                        style={{ color: "#FF0000", fontSize: "16px" }}
                        item
                        xs={12}
                        md={12}
                        fullWidth
                      >
                        {errors.Canchas_Disponibles}
                      </Grid>
                    )}
                  />
                </Grid>
              </Grid>
            </div>
            <Typography
              className="tituloPreInsRes"
              variant="h5"
              align="center"
              color="#ffff"
              sx={{
                input: { color: "white" },
              }}
            >
              Pre-inscripción
            </Typography>
            <hr className="hr" />
            <div className="cuandroContentRegisterTorneo">
              <Grid container spacing={2}>

                <Grid item xs={12} md={6}>
                  <Item className="fondoColor">
                    <TextField
                      type="date"
                      id="standard-required4"
                      label="Fecha Inicio de Preinscripción: *"
                      fullWidth
                      name="Fecha_Ini_Preinscripcion"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.Fecha_Ini_Preinscripcion}
                      defaultValue=" "
                      variant="standard"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{
                        input: { color: "#fff" },
                        label: { color: "#fff" },
                      }}
                    />
                  </Item>
                  <ErrorMessage
                    name="Fecha_Ini_Preinscripcion"
                    component={() => (
                      <Grid
                        style={{ color: "#FF0000", fontSize: "16px" }}
                        item
                        xs={12}
                        md={12}
                        fullWidth
                      >
                        {errors.Fecha_Ini_Preinscripcion}
                      </Grid>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Item className="fondoColor">
                    <TextField
                      type="date"
                      id="standard-required4"
                      label="Fecha Fin de Preinscripción: *"
                      name="Fecha_Fin_Preinscripcion"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.Fecha_Fin_Preinscripcion}
                      fullWidth
                      defaultValue=" "
                      variant="standard"
                      sx={{
                        input: { color: "#fff" },
                        label: { color: "#fff" },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Item>
                  <ErrorMessage
                    name="Fecha_Fin_Preinscripcion"
                    component={() => (
                      <Grid
                        style={{ color: "#FF0000", fontSize: "16px" }}
                        item
                        xs={12}
                        md={12}
                        fullWidth
                      >
                        {errors.Fecha_Fin_Preinscripcion}
                      </Grid>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Item className="fondoColor">
                    <TextField
                      type="number"
                      id="standard-required4"
                      label="Costo de Preinscripción ($): *"
                      fullWidth
                      name="MontoPreinscripcion"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.MontoPreinscripcion}
                      defaultValue=""
                      variant="standard"
                      sx={{
                        input: { color: "#fff" },
                        label: { color: "#fff" },
                      }}
                    />
                  </Item>
                  <ErrorMessage
                    name="MontoPreinscripcion"
                    component={() => (
                      <Grid
                        style={{ color: "#FF0000", fontSize: "16px" }}
                        item
                        xs={12}
                        md={12}
                        fullWidth
                      >
                        {errors.MontoPreinscripcion}
                      </Grid>
                    )}
                  />
                </Grid>
              </Grid>
            </div>
            <Typography
              className="tituloPreInsRes"
              variant="h5"
              align="center"
              color="#ffff"
              sx={{
                input: { color: "white" },
                label: { color: "white" },
              }}
            >
              Inscripción
            </Typography>
            <hr className="hr" />
            <div className="cuandroContentRegisterTorneo">
              <Grid container spacing={2}>

                <Grid item xs={12} md={6}>
                  <Item className="fondoColor">
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{
                        input: { color: "white" },
                        label: { color: "white" },
                      }}
                      type="date"
                      id="standard-required4"
                      label="Fecha Inicio de Inscripción: *"
                      fullWidth
                      name="Fecha_Ini_Inscripcion"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.Fecha_Ini_Inscripcion}
                      defaultValue=""
                      variant="standard"
                    />
                  </Item>
                  <ErrorMessage
                    name="Fecha_Ini_Inscripcion"
                    component={() => (
                      <Grid
                        style={{ color: "#FF0000", fontSize: "16px" }}
                        item
                        xs={12}
                        md={12}
                        fullWidth
                      >
                        {errors.Fecha_Ini_Inscripcion}
                      </Grid>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Item className="fondoColor">
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{
                        input: { color: "white" },
                        label: { color: "white" },
                      }}
                      type="date"
                      id="standard-required4"
                      label="Fecha Fin de Inscripción: *"
                      fullWidth
                      name="Fecha_Fin_Inscripcion"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.Fecha_Fin_Inscripcion}
                      defaultValue=""
                      variant="standard"
                    />
                  </Item>
                  <ErrorMessage
                    name="Fecha_Fin_Inscripcion"
                    component={() => (
                      <Grid
                        style={{ color: "#FF0000", fontSize: "16px" }}
                        item
                        xs={12}
                        md={12}
                        fullWidth
                      >
                        {errors.Fecha_Fin_Inscripcion}
                      </Grid>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Item className="fondoColor">
                    <TextField
                      sx={{
                        input: { color: "white" },
                        label: { color: "white" },
                      }}
                      type="number"
                      id="standard-required4"
                      label="Costo de Inscripción ($): *"
                      name="MontoInscripcion"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.MontoInscripcion}
                      fullWidth
                      defaultValue=""
                      variant="standard"
                    />
                  </Item>
                  <ErrorMessage
                    name="MontoInscripcion"
                    component={() => (
                      <Grid
                        style={{ color: "#FF0000", fontSize: "16px" }}
                        item
                        xs={12}
                        md={12}
                        fullWidth
                      >
                        {errors.MontoInscripcion}
                      </Grid>
                    )}
                  />
                </Grid>
              </Grid>
            </div>
            <Typography
              className="tituloPreInsRes"
              variant="h5"
              align="center"
              color="#ffff"
              sx={{
                input: { color: "white" },
                label: { color: "white" },
              }}
            >
              Responsable
            </Typography>
            <hr className="hr" />
            <div className="cuandroContentRegisterTorneo">
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Item className="fondoColor">
                    <TextField
                      sx={{
                        input: { color: "white" },
                        label: { color: "white" },
                      }}
                      type="text"
                      id="standard-required6"
                      label="Nombre Completo: *"
                      fullWidth
                      name="Responsable"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.Responsable}
                      defaultValue=""
                      variant="standard"
                    />
                  </Item>
                  <ErrorMessage
                    name="Responsable"
                    component={() => (
                      <Grid
                        style={{ color: "#FF0000", fontSize: "16px" }}
                        item
                        xs={12}
                        md={12}
                        fullWidth
                      >
                        {errors.Responsable}
                      </Grid>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Item className="fondoColor">
                    <TextField
                      sx={{
                        input: { color: "white" },
                        label: { color: "white" },
                      }}
                      type="number"
                      id="standard-required7"
                      label="Teléfono: *"
                      fullWidth
                      name="Telefono"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.Telefono}
                      defaultValue=""
                      variant="standard"
                    />
                  </Item>
                  <ErrorMessage
                    name="Telefono"
                    component={() => (
                      <Grid
                        style={{ color: "#FF0000", fontSize: "16px" }}
                        item
                        xs={12}
                        md={12}
                        fullWidth
                      >
                        {errors.Telefono}
                      </Grid>
                    )}
                  />
                </Grid>
              </Grid>
            </div>
            <div>
              <Stack m={5}
                direction="row"
                spacing={3}
                justifyContent="center"
                alignItems="center">

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={handleSubmit}
                  sx={{ width: '25%' }}
                >Registrar

                </Button>

                <Button
                  variant="contained"
                  color="warning"
                  sx={{ width: '25%' }}
                  type="reset"
                >Cancelar
                </Button>

              </Stack>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegistrarTorneo;
