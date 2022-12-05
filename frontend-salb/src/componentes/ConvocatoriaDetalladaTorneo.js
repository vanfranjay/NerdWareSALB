import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import React from "react";
import "../css/inicio.css";
import registrar from "../imagenes/registrarse.JPG";
import FormularioRegistrarse from "../imagenes/formularioRegistro.JPG";
import registrarEquipo from "../imagenes/registrarEquipo.JPG";
import registrarVoucher from "../imagenes/registrarVoucher.JPG";
import correoVerificación from "../imagenes/correoVerificación.JPG";
import logo from "../imagenes/logoLigaBasket1.png";

const ConvocatoriaDetalladaTorneo = () => {
  const TORNEOS_URL = process.env.TORNEOS_API_URL || "http://127.0.0.1:8000/api/torneos";
  const [torneos, setTorneos] = useState([]);

  useEffect(() => {
    obtenerTorneo();
  }, []);

  //console.log("Loading...");
  const obtenerTorneo = async () => {
    const resultado = await axios.get(TORNEOS_URL);
    setTorneos([...resultado.data]);
    console.log(resultado.data);
  };
  function obtenerAño(fecha) {
    const date = new Date(fecha);
    const añoActual = date.getFullYear();
    return añoActual;
  }
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
    <Grid container>
      {torneos.map((torneo, index) => {
        return (
          <Grid item xs={12} className="fondoDetalleConvocatoria">
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <img
                  src={logo}
                  alt="logo de la liga maxi basquet"
                  className="imgPasosParaParticipar"
                />
              </Grid>
              <Grid item xs={10}>
                <b>
                  <h1 align="center">{torneo.Nombre_Torneo}</h1>
                </b>
              </Grid>
            </Grid>
            <h2 className="invitacionPara">
              <b>Invitación para: {torneo.Invitacion}</b>
            </h2>
            <h2>
              <b>De: Comite Organizador</b>
            </h2>
            <p>
              Saludos, por medio de la presente quedan cordialmente invitados al{" "}
              {torneo.Nombre_Torneo}, Cochabamba- Bolivia{" "}
              {obtenerAño(torneo.Fecha_Ini_Torneo)}. El cual se realizará en la
              ciudad/región de {torneo.Lugar_Evento} desde el{" "}
              {obtenerDia(torneo.Fecha_Ini_Torneo)}{" "}
              {obtenerDiaNumero(torneo.Fecha_Ini_Torneo)} al{" "}
              {obtenerDia(torneo.Fecha_Fin_Torneo)}{" "}
              {obtenerDiaNumero(torneo.Fecha_Fin_Torneo)} de{" "}
              {obtenerMes(torneo.Fecha_Fin_Torneo)} del{" "}
              {obtenerAño(torneo.Fecha_Fin_Torneo)}, comprenderá las siguientes
              categorías: {torneo.Categoria}, en la rama {torneo.Rama}.<br />
              El costo de la preinscripción es de US $
              {torneo.MontoPreinscripcion} dólares por equipo hasta el{" "}
              {obtenerDiaNumero(torneo.Fecha_Fin_Preinscripcion)} de{" "}
              {obtenerMes(torneo.Fecha_Fin_Preinscripcion)} del presente, pasada
              esta fecha el costo será de US ${torneo.MontoInscripcion} dólares
              por equipo.
              <br />
              El evento es de carácter {torneo.Caracter}, hasta el momento han
              manifestado interés por participar equipos provenientes no sólo de
              Bolivia, sino también Argentina y otros países de Sud América.
              <br />
              <br />
              Para realizar la preinscripción/inscripción, sólo tiene que seguir
              los siguientes pasos:
              <br />
              <b>1er paso:</b> debe ingresar a la pagina web, a la sección
              registrarse.
              <br />
              <br />
              <Grid item xs={12}>
                <img
                  src={registrar}
                  alt="imagen de registrar"
                  className="imgPasosParaParticipar"
                />
              </Grid>
              <br />
              Una vez ingresado en la pestaña registrarse, procederemos a llenar
              formulario:
              <br />
              <br />
              <Grid item xs={12}>
                <img
                  className="imgPasosParaParticipar"
                  src={FormularioRegistrarse}
                  alt="formulario registrarse en formulario"
                />
              </Grid>
              <br />
              <br />
              <b>2do paso: </b>procederemos a iniciar sesión y en el partado
              registra voucher, registraremos la boleta de pago que se realizo
              previamente, la boleta de pago tiene que ser ESCANEADO para luego
              ser subido en el formulaio registrarVoucher.
              <br />
              <br />
              <Grid item xs={12}>
                <img
                  src={registrarVoucher}
                  alt="registrar voucher"
                  className="imgPasosParaParticipar"
                />
              </Grid>
              <br />
              <br />
              <b>3er paso: </b>Esperarmos a que el Responsable nos habilite para
              poder registrar nuestro respectivo equipo, se nos notificará
              mediante un sms por e-mail.
              <br />
              <br />
              <Grid item xs={12}>
                <img
                  src={correoVerificación}
                  alt="correo de verificación"
                  className="imgPasosParaParticipar"
                />
              </Grid>
              <br />
              <br />
              <b>4to paso: </b>un vez habilitados volveremos a ingresar a la
              pagia web del torneo, y en la sección registrar equipo, podremos
              proceder a registrar nuestro repectivo equipo.
              <br />
              <br />
              <Grid item xs={12}>
                <img
                  src={registrarEquipo}
                  alt="registrar equipo"
                  className="imgPasosParaParticipar"
                />
              </Grid>
              <br />
              <br />
              Sin más que agregar y esperando contar con su valiosa presencia.
              <br />
              Cordialmente: <br />
              <b>{torneo.Responsable}</b>
              <br />
              Telf. {torneo.Telefono}
            </p>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ConvocatoriaDetalladaTorneo;
