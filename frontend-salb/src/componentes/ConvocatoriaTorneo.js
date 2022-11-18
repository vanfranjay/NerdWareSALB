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

const ConvocatoriaTorneo = () => {
  const [torneos, setTorneos] = useState([]);

  useEffect(() => {
    obtenerTorneo();
  }, []);

  //console.log("Loading...");
  const obtenerTorneo = async () => {
    const resultado = await axios.get("http://127.0.0.1:8000/api/torneos");
    setTorneos([...resultado.data]);
    console.log(resultado.data);
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
    const date = new Date(fecha);
    const dia = date.getDate() + 1;
    if (dia == 32) {
      return 1;
    } else {
      return dia;
    }
  }

  function obtenerMes(fecha) {
    const date = new Date(fecha);
    const mesActual = date.getMonth() + 1;
    switch (mesActual) {
      case 1:
        return "Enero";
      case 2:
        return "Febrero";
      case 3:
        return "Marzo";
      case 4:
        return "Abril";
      case 5:
        return "Mayo";
      case 6:
        return "Junio";
      case 7:
        return "Julio";
      case 8:
        return "Agosto";
      case 9:
        return "Septiembre";
      case 10:
        return "Octubre";
      case 11:
        return "Noviembre";
      case 12:
        return "Diciembre";
    }
  }

  return (
    <Grid container spacing={0} className="containtPadre">
      {torneos.map((torneo, index) => {
        return (
          <Grid item xs={12} className="portadaTorneo" key={index}>
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
            <Grid container  className="contentCaracteristicas">
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
                className="contectCaracteristicasConvocatoria"
              >
                <h5 align="center">Pre-inscripción:</h5>
                <h6>
                  <b>Fecha pre-inscripción:</b>{" "}
                  {obtenerDia(torneo.Fecha_Ini_Preinscripcion)}{" "}
                  {obtenerDiaNumero(torneo.Fecha_Ini_Preinscripcion)} de{" "}
                  {obtenerMes(torneo.Fecha_Ini_Preinscripcion)} al{" "}
                  {obtenerDia(torneo.Fecha_Fin_Preinscripcion)}{" "}
                  {obtenerDiaNumero(torneo.Fecha_Fin_Preinscripcion)} de{" "}
                  {obtenerMes(torneo.Fecha_Fin_Preinscripcion)}
                </h6>
                <h6>
                  <b>Costo de pre-inscripción:</b> {torneo.MontoPreinscripcion}$
                </h6>
                <h5 align="center">Inscripción:</h5>
                <h6>
                <b>Fecha inscripción:</b>{" "}
                  {obtenerDia(torneo.Fecha_Ini_Inscripcion)}{" "}
                  {obtenerDiaNumero(torneo.Fecha_Ini_Inscripcion)} de{" "}
                  {obtenerMes(torneo.Fecha_Ini_Inscripcion)} al{" "}
                  {obtenerDia(torneo.Fecha_Fin_Inscripcion)}{" "}
                  {obtenerDiaNumero(torneo.Fecha_Fin_Inscripcion)} de{" "}
                  {obtenerMes(torneo.Fecha_Fin_Inscripcion)}
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
                  <b>Lugar del evento:</b> {torneo.Lugar_Evento}
                </h6>
                <h6>
                  <b>Fecha del evento: </b> del {torneo.Fecha_Ini_Torneo} al{" "}
                  {torneo.Fecha_Fin_Torneo}
                </h6>
              </Grid>
            </Grid>
            <Grid item xs={12} className="fondoMasDetalles">
              <p className="masDetalles">
                Para mas detalles, descarga el archivo adjunto:{" "}
              </p>
              <PDFDownloadLink
                document={<VistaPdf torneos={torneos[0]} />}
                fileName={`${torneo.Nombre_Torneo}.pdf`}
              >
                <Button>Descargar</Button>
              </PDFDownloadLink>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ConvocatoriaTorneo;
