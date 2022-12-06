import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "../css/inicio.css";
import fondo from "../imagenes/fondoTorneo.jpg";
import { Button, Grid } from "@mui/material";
import axios from "axios";
import logo from "../imagenes/LogoLMB2.png";
import imgFondo from "../imagenes/balonEnLlamas.png";
import ConvocatoriaDetalladaTorneo from "./ConvocatoriaDetalladaTorneo";
import { PDFDownloadLink } from "@react-pdf/renderer";
import VistaPdf from "./VistaPdf";
import configData from "../config/config.json";

const ConvocatoriaTorneo = () => {
  const TORNEOS_URL = configData.TORNEOS_API_URL || "http://127.0.0.1:8000/api/torneos";
  const [torneos, setTorneos] = useState([]);

  useEffect(() => {
    obtenerTorneo();
  }, []);

  //console.log("Loading...");
  const obtenerTorneo = async () => {
    const resultado = await axios.get(TORNEOS_URL);
    setTorneos([...resultado.data]);
    //console.log(resultado.data);
  };

  function obtenerDia(fecha) {
    let date = new Date(fecha);
    let day = date.getDay() + 1;
    switch (day) {
      case 1:
        return "Lunes";
      case 2:
        return "Martes";
      case 3:
        return "Miercoles";
      case 4:
        return "Jueves";
      case 5:
        return "Viernes";
      case 6:
        return "Sabado";
      case 7:
        return "Domingo";
    }
  }
  function obtenerDiaNumero(fecha) {
    const valor = fecha;
    if (fecha == `${obtenerAño(fecha)}-${obtenerMesNumero(fecha) + 1}-01`) {
      return 1;
    } else {
      const date = new Date(fecha);
      const dia = date.getDate() + 1;
      //console.log(valor);
      if (dia == 32) {
        return 1;
      } else {
        return dia;
      }
    }
  }

  function obtenerMesNumero(fecha) {
    const date = new Date(fecha);
    const mesActual = date.getMonth() + 1;
    return mesActual;
  }
  function obtenerMes(fecha) {
    if (fecha == `${obtenerAño(fecha)}-01-01`) {
      return "Enero";
    } else if (fecha == `${obtenerAño(fecha)}-01-${obtenerDiaNumero(fecha)}`) {
      return "Enero";
    } else if (fecha == `${obtenerAño(fecha)}-02-01`) {
      return "Febrero";
    } else if (fecha == `${obtenerAño(fecha)}-02-${obtenerDiaNumero(fecha)}`) {
      return "Febrero";
    } else if (fecha == `${obtenerAño(fecha)}-03-01`) {
      return "Marzo";
    } else if (fecha == `${obtenerAño(fecha)}-03-${obtenerDiaNumero(fecha)}`) {
      return "Marzo";
    } else if (fecha == `${obtenerAño(fecha)}-04-01`) {
      return "Abril";
    } else if (fecha == `${obtenerAño(fecha)}-04-${obtenerDiaNumero(fecha)}`) {
      return "Abril";
    } else if (fecha == `${obtenerAño(fecha)}-05-01`) {
      return "Mayo";
    } else if (fecha == `${obtenerAño(fecha)}-05-${obtenerDiaNumero(fecha)}`) {
      return "Mayo";
    } else if (fecha == `${obtenerAño(fecha)}-06-01`) {
      return "Junio";
    } else if (fecha == `${obtenerAño(fecha)}-06-${obtenerDiaNumero(fecha)}`) {
      return "Junio";
    } else if (fecha == `${obtenerAño(fecha)}-07-01`) {
      return "Julio";
    } else if (fecha == `${obtenerAño(fecha)}-07-${obtenerDiaNumero(fecha)}`) {
      return "Julio";
    } else if (fecha == `${obtenerAño(fecha)}-08-01`) {
      return "Agosto";
    } else if (fecha == `${obtenerAño(fecha)}-08-${obtenerDiaNumero(fecha)}`) {
      return "Agosto";
    } else if (fecha == `${obtenerAño(fecha)}-09-01`) {
      return "Septiembre";
    } else if (fecha == `${obtenerAño(fecha)}-09-${obtenerDiaNumero(fecha)}`) {
      return "Septiembre";
    } else if (
      fecha == `${obtenerAño(fecha)}-${obtenerMesNumero(fecha) + 1}-01`
    ) {
      switch (obtenerMesNumero(fecha) + 1) {
        case 10:
          return "Octubre";
        case 11:
          return "Noviembre";
        case 12:
          return "Diciembre";
      }
    }
    else {
      const date = new Date(fecha);
      const mesActual = date.getMonth() + 1;
      switch (mesActual) {
        case 10:
          return "Octubre";
        case 11:
          return "Noviembre";
        case 12:
          return "Diciembre";
      }
    }
    console.log(fecha);
  }

  function obtenerAño(fecha) {
    const date = new Date(fecha);
    const añoActual = date.getFullYear();
    if (fecha == `${añoActual + 1}-01-01`) {
      return añoActual + 1;
    } else {
      return añoActual;
    }
  }

  return (
    <>
      {torneos.map((torneo, index) => {
        return (
          <>
            <Grid container spacing={0} className="containtPadre" key={index}>
              <Grid item xs={12}>
                <h2 align="center" style={{ color: "#fff" }}>
                  Convocatoria para el: {torneo.Nombre_Torneo}
                </h2>
                <hr className="hrConvocatoriaTorneo harEncabezado" />
              </Grid>
              <Grid item xs={12} className="portadaTorneo">
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <img
                      className="logoLigaMaxiBasquet"
                      src={logo}
                      alt="logo liga maxi basquet"
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <h1 align="center" className="tituloTorneo">
                      {torneo.Nombre_Torneo}
                    </h1>
                  </Grid>
                </Grid>
                <hr className="hrConvocatoriaTorneo" />
                <Grid item xs={12}>
                  <h2 align="center" className="basquetbol">
                    BASQUETBOL
                  </h2>
                </Grid>
                <Grid item xs={12} className="contentRama" align="center">
                  <h3 align="center" className="basquetbol1">
                    Rama: {torneo.Rama}
                  </h3>
                </Grid>
                <Grid container className="contentCaracteristicas">
                  <Grid item xs={12} sm={6}>
                    <img
                      className="imgConvocatoria"
                      src={imgFondo}
                      alt="imagen de balon de fuego"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    className="contectCaracteristicasConvocatoria espacio"
                  >
                    <h5 align="center">Pre-inscripción:</h5>
                    <h6>
                      <b>Fecha pre-inscripción:</b>{" "}
                      {obtenerDia(torneo.Fecha_Ini_Preinscripcion)}{" "}
                      {obtenerDiaNumero(torneo.Fecha_Ini_Preinscripcion)} de{" "}
                      {obtenerMes(torneo.Fecha_Ini_Preinscripcion)} al{" "}
                      {obtenerDia(torneo.Fecha_Fin_Preinscripcion)}{" "}
                      {obtenerDiaNumero(torneo.Fecha_Fin_Preinscripcion)} de{" "}
                      {obtenerMes(torneo.Fecha_Fin_Preinscripcion)} del{" "}
                      {obtenerAño(torneo.Fecha_Fin_Preinscripcion)}
                    </h6>
                    <h6>
                      <b>Costo de pre-inscripción:</b>{" "}
                      {torneo.MontoPreinscripcion}$
                    </h6>
                    <h5 align="center">Inscripción:</h5>
                    <h6>
                      <b>Fecha inscripción:</b>{" "}
                      {obtenerDia(torneo.Fecha_Ini_Inscripcion)}{" "}
                      {obtenerDiaNumero(torneo.Fecha_Ini_Inscripcion)} de{" "}
                      {obtenerMes(torneo.Fecha_Ini_Inscripcion)} al{" "}
                      {obtenerDia(torneo.Fecha_Fin_Inscripcion)}{" "}
                      {obtenerDiaNumero(torneo.Fecha_Fin_Inscripcion)} de{" "}
                      {obtenerMes(torneo.Fecha_Fin_Inscripcion)} del{" "}
                      {obtenerAño(torneo.Fecha_Fin_Preinscripcion)}
                    </h6>
                    <h6>
                      <b>Costo de inscripción:</b> {torneo.MontoInscripcion}$
                    </h6>
                    <h5 align="center">Carateristicas</h5>
                    <h6>
                      <b>Categoría:</b> {torneo.Categoria}
                    </h6>
                    <h6>
                      <b>Invitación para:</b> {torneo.Invitacion}
                    </h6>
                    <h6>
                      <b>Lugar del torneo:</b> {torneo.Lugar_Evento}
                    </h6>
                    <h6>
                      <b>Fecha del torneo:</b>{" "}
                      {obtenerDia(torneo.Fecha_Ini_Torneo)}{" "}
                      {obtenerDiaNumero(torneo.Fecha_Ini_Torneo)} de{" "}
                      {obtenerMes(torneo.Fecha_Ini_Torneo)} al{" "}
                      {obtenerDia(torneo.Fecha_Fin_Torneo)}{" "}
                      {obtenerDiaNumero(torneo.Fecha_Fin_Torneo)} de{" "}
                      {obtenerMes(torneo.Fecha_Fin_Torneo)} del{" "}
                      {obtenerAño(torneo.Fecha_Fin_Torneo)}
                    </h6>
                  </Grid>
                </Grid>
                <Grid item xs={12} className="fondoMasDetalles">
                  <p className="masDetalles">
                    Para mas detalles, descarga el archivo adjunto:{" "}
                  </p>
                  <PDFDownloadLink
                    document={<VistaPdf torneos={torneos[index]} />}
                    fileName={`${torneo.Nombre_Torneo}.pdf`}
                  >
                    <Button>Descargar</Button>
                  </PDFDownloadLink>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <hr className="hrConvocatoriaTorneo harEncabezado" />
              </Grid>
            </Grid>
          </>
        );
      })}
    </>
  );
};

export default ConvocatoriaTorneo;
