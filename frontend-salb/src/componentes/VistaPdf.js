import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import logo from "../imagenes/logoLigaBasket1.png";
import registrar from "../imagenes/registrarse.JPG";
import FormularioRegistrarse from "../imagenes/formularioRegistro.JPG";
import registrarEquipo from "../imagenes/registrarEquipo.JPG";
import registrarVoucher from "../imagenes/registrarVoucher.JPG";
import correoVerificación from "../imagenes/correoVerificación.JPG";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    color: "#000",
  },
  section: {
    margin: 20,
    padding: 20,
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
});

const VistaPdf = (torneo) => {
  const convocatoria = torneo.torneos;

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
    else{
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
      {convocatoria ? (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Image style={{ width: "10%" }} src={logo} />
              <Text style={{ textAlign: "center" }}>
                {convocatoria.Nombre_Torneo}
              </Text>
            </View>
            <View style={styles.section}>
              <Text>Invitación para: {convocatoria.Invitacion}</Text>
              <Text>De: Comite Organizador</Text>
              <Text> </Text>
              <Text>
                Saludos, por medio de la presente quedan cordialmente invitados
                al {convocatoria.Nombre_Torneo}, Cochabamba- Bolivia{" "}
                {obtenerAño(convocatoria.Fecha_Ini_Torneo)}. El cual se
                realizará en la ciudad/región de {convocatoria.Lugar_Evento}{" "}
                desde el {obtenerDia(convocatoria.Fecha_Ini_Torneo)}{" "}
                {obtenerDiaNumero(convocatoria.Fecha_Ini_Torneo)} de{" "}
                {obtenerMes(convocatoria.Fecha_Ini_Torneo)} del{" "}
                {obtenerAño(convocatoria.Fecha_Ini_Torneo)} al{" "}
                {obtenerDia(convocatoria.Fecha_Fin_Torneo)}{" "}
                {obtenerDiaNumero(convocatoria.Fecha_Fin_Torneo)} de{" "}
                {obtenerMes(convocatoria.Fecha_Fin_Torneo)} del{" "}
                {obtenerAño(convocatoria.Fecha_Fin_Torneo)}, comprenderá las
                siguientes categorías: {convocatoria.Categoria}, en la rama{" "}
                {convocatoria.Rama}.
              </Text>
              <Text> </Text>
              <Text>
                El costo de la preinscripción es de US $
                {convocatoria.MontoPreinscripcion} dólares por equipo hasta el{" "}
                {obtenerDiaNumero(convocatoria.Fecha_Fin_Preinscripcion)} de{" "}
                {obtenerMes(convocatoria.Fecha_Fin_Preinscripcion)} del
                presente, pasada esta fecha el costo será de US $
                {convocatoria.MontoInscripcion} dólares por equipo.
              </Text>
              <Text> </Text>
              <Text>
                El evento es de carácter {convocatoria.Caracter}, hasta el
                momento han manifestado interés por participar equipos
                provenientes no sólo de Bolivia, sino también Argentina y otros
                países de Sud América.
              </Text>
              <Text> </Text>
              <Text break style={{paddingTop: "40px"}}>
                Para realizar la preinscripción/inscripción, sólo tiene que
                seguir los siguientes pasos:
              </Text>
              <Text> </Text>
              <Text>
                1er paso: debe ingresar a la pagina web, a la sección
                registrarse.
              </Text>
              <Text> </Text>
              <Image src={registrar} />
              <Text> </Text>
              <Text>
                Una vez ingresado en la pestaña registrarse, procederemos a
                llenar el formulario:
              </Text>
              <Text> </Text>
              <Image src={FormularioRegistrarse} />
              <Text> </Text>
              <Text break style={{paddingTop: "40px"}}>
                2do paso: procederemos a iniciar sesión y en el partado registra
                voucher, registraremos la boleta de pago que se realizo
                previamente, la boleta de pago tiene que ser ESCANEADO para
                luego ser subido en el formulario registrarVoucher.
              </Text>
              <Text> </Text>
              <Image src={registrarVoucher} />
              <Text> </Text>
              <Text>
                3er paso: Esperarmos a que el Responsable nos habilite para
                poder registrar nuestro respectivo equipo, se nos notificará
                mediante un sms por e-mail.
              </Text>
              <Text> </Text>
              <Image src={correoVerificación} />
              <Text> </Text>
              <Text break style={{paddingTop: "40px"}}>
                4to paso: un vez habilitados volveremos a ingresar a la pagia
                web del torneo, y en la sección registrar equipo, podremos
                proceder a registrar nuestro repectivo equipo.
              </Text>
              <Text> </Text>
              <Image src={registrarEquipo} />
              <Text> </Text>
              <Text style={{paddingTop: "40px"}}>
                Sin más que agregar y esperando contar con su valiosa presencia.
              </Text>
              <Text> </Text>
              <Text>Cordialmente:</Text>
              <Text>{convocatoria.Responsable}</Text>
              <Text>Telf. {convocatoria.Telefono}</Text>
            </View>
          </Page>
        </Document>
      ) : (
        "Cargando..."
      )}
    </>
  );
};

export default VistaPdf;
