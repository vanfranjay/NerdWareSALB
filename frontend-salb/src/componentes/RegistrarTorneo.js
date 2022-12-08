import { Divider, Grid, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import configData from "../config/config.json";

const CATEGORIAS_URL = configData.CATEGORIAS_API_URL || "http://127.0.0.1:8000/api/categorias";
const TORNEOS_URL = configData.TORNEOS_API_URL || "http://127.0.0.1:8000/api/torneos";
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

const RegistrarTorneo = () => {
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const [formularioNoEnviado, setFormularioNoEnviado] = useState(false);
  //const [torneo, setTorneo] = useState({
  //  Campeon: "Bolivar",
  //  Subcampeon: "hola",
  //  Fecha_Ini_Convocatoria: "2022-10-15",
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
          Campeon: "Bolivar",
          Subcampeon: "hola",
          Fecha_Ini_Convocatoria: "2022-10-15",
          Fecha_Fin_Convocatoria: "2022-11-30",
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

          // validacion Invitacion
          if (!valores.Invitacion) {
            errores.Invitacion = "Por favor ingresa una invitación para";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,100}$/.test(valores.Invitacion)) {
            errores.Invitacion =
              "La invitación solo puede contener letras y espacios";
          }
          // validacion Nombre_Torneo
          if (!valores.Nombre_Torneo) {
            errores.Nombre_Torneo = "Por favor ingresa un nombre de torneo";
          } else if (!/^[a-zA-ZÀ-ÿ\s0-9]{1,40}$/.test(valores.Nombre_Torneo)) {
            errores.Nombre_Torneo =
              "El nombre del Torneo solo puede contener letras y espacios";
          }
          // validacion de Lugar_Evento
          if (!valores.Lugar_Evento) {
            errores.Lugar_Evento = "Por favor ingresa el lugar del evento";
          } else if (!/^[a-zA-ZÀ-ÿ\s-./]{1,40}$/.test(valores.Lugar_Evento)) {
            errores.Lugar_Evento =
              "El lugar del evento solo puede contener letras, espacios, - y /";
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
            errores.Telefono = "El teléfono solo puede contener números";
          }
          // validación para Rama
          if (!valores.Rama) {
            errores.Rama = "Por favor seleccione una rama";
          }
          // validación para caracter del evento
          if (!valores.Caracter) {
            errores.Caracter = "Por favor seleccione el caracter del evento";
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
          // validaciones para Categoria
          if (valores.Categoria.length === 0) {
            errores.Categoria =
              "Por favor seleccione la categoria o las categorias para el evento";
          }
          // validacion de Fecha_Ini_Torneo
          if (!valores.Fecha_Ini_Torneo) {
            errores.Fecha_Ini_Torneo =
              "Por favor seleccione una fecha de inicio del evento";
          } else if (f1.getTime() > f2.getTime()) {
            errores.Fecha_Ini_Torneo =
              "La fecha de inico del evento tiene que ser menor a la fecha de finalización del evento";
          }
          // validacion de Fecha_Fin_Torneo
          if (!valores.Fecha_Fin_Torneo) {
            errores.Fecha_Fin_Torneo =
              "Por favor seleccione una fecha de fin del evento";
          } else if (!valores.Fecha_Ini_Torneo) {
            errores.Fecha_Fin_Torneo =
              "Por favor establesca una fecha de inicio del evento";
          } else if (f1.getTime() > f2.getTime()) {
            errores.Fecha_Fin_Torneo =
              "La fecha de finalización del evento tiene que ser mayor a la fecha de inicio del evento";
          }
          // validacion de Fecha_Ini_Preinscripcion
          if (!valores.Fecha_Ini_Preinscripcion) {
            errores.Fecha_Ini_Preinscripcion =
              "Por favor seleccione una fecha de pre-inscripción del evento";
          } else if (f3.getTime() > f4.getTime()) {
            errores.Fecha_Ini_Preinscripcion =
              "La fecha de inicio de pre-inscripción tiene que ser menor a la fecha de fin de pre-inscripción";
          }
          // validacion de Fecha_Fin_Preinscripcion
          if (!valores.Fecha_Fin_Preinscripcion) {
            errores.Fecha_Fin_Preinscripcion =
              "Por favor seleccione una fecha de fin de pre-inscripción del evento";
          } else if (!valores.Fecha_Ini_Preinscripcion) {
            errores.Fecha_Fin_Preinscripcion =
              "Por favor establesca una fecha de inicio de pre-inscripción";
          } else if (f3.getTime() > f4.getTime()) {
            errores.Fecha_Fin_Preinscripcion =
              "La fecha de fin de pre-inscripción del evento tiene que ser mayor a la fecha de inicio de pre-inscripción";
          }
          // validacion de Fecha_Ini_Inscripcion
          if (!valores.Fecha_Ini_Inscripcion) {
            errores.Fecha_Ini_Inscripcion =
              "Por favor seleccione una fecha inscripción del evento";
          } else if (f5.getTime() > f6.getTime()) {
            errores.Fecha_Ini_Inscripcion =
              "La fecha de inicio de inscripción tiene que ser menor a la fecha de fin de inscripción";
          }
          // validacion de Fecha_Fin_Inscripcion
          if (!valores.Fecha_Fin_Inscripcion) {
            errores.Fecha_Fin_Inscripcion =
              "Por favor seleccione una fecha de fin de inscripción del evento";
          } else if (!valores.Fecha_Ini_Inscripcion) {
            errores.Fecha_Fin_Inscripcion =
              "Por favor establesca una fecha de inicio de inscripción";
          } else if (f5.getTime() > f6.getTime()) {
            errores.Fecha_Fin_Inscripcion =
              "La fecha de fin de inscripción del evento tiene que ser mayor a la fecha de inicio de inscripción";
          }

          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          const registrarTorneo = async () => {
            const resultado = await axios.get(
              TORNEOS_URL
            );
            if (resultado.data.length === 0) {
              try {
                //registrarCategorias(valores.Categoria);
                const { data } = axios.post(
                  TORNEOS_URL,
                  {
                    ...valores,
                    Categoria: valores.Categoria.join(","),
                  }
                );
                resetForm();
                setFormularioEnviado(true);
                setTimeout(() => setFormularioEnviado(false), 3000);
              } catch (error) {
                console.log(error);
              }
            } else {
              setFormularioNoEnviado(true);
              setTimeout(() => setFormularioNoEnviado(false), 3000);
            }
          };
          registrarTorneo();
        }}
      /*const
      reiniciar={({ resetForm }) => {
        resetForm();
      }}*/
      >
        {({ values, errors, touched, handleChange, handleBlur, resetForm }) => (
          <Form>
            <div className="cuandroContentRegisterTorneo">
              <Grid container spacing={2}>
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
                      <InputLabel id="demo-multiple-checkbox-label">
                        Categoria(as): *
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        name="Categoria"
                        /*onChange={handleChange}*/
                        onBlur={handleBlur}
                        value={values.Categoria}
                        onChange={handleChange}
                        /*input={<OutlinedInput label="Name" />}*/
                        renderValue={(selected) => selected.join(", ")}
                      /*MenuProps={MenuProps}*/
                      >
                        <MenuItem value={"+30"}>+30</MenuItem>
                        <MenuItem value={"+35"}>+35</MenuItem>
                        <MenuItem value={"+40"}>+40</MenuItem>
                        <MenuItem value={"+45"}>+45</MenuItem>
                        <MenuItem value={"+50"}>+50</MenuItem>
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
                        <MenuItem value={"Femenina/Masculino"}>
                          Femenina/Masculino
                        </MenuItem>
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
              <Grid
                container
                spacing={2}
                className="contentBtnRegisterCancelar"
              >
                <Grid item xs={6} md={6} align="end">
                  <Button className="botonHabilitadoAceptar" type="submit">
                    Registrar
                  </Button>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Button type="reset" className="botonHabilitadoCancelar">
                    Cancelar
                  </Button>
                </Grid>
                {formularioEnviado && (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    align="center"
                    style={{ color: "#fff", marginTop: "20px" }}
                  >
                    <h2
                      style={{
                        background: "#009c05",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        fontSize: "16px",
                      }}
                    >
                      Registro exitoso del torneo!
                    </h2>
                  </Grid>
                )}
                {formularioNoEnviado && (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    align="center"
                    style={{ color: "#fff", marginTop: "20px" }}
                  >
                    <h2
                      style={{
                        background: "red",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        fontSize: "16px",
                      }}
                    >
                      No se puede registrar el torneo por que ya hay un torneo
                      activo!
                    </h2>
                  </Grid>
                )}
              </Grid>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegistrarTorneo;
