import React from "react";
import ConvocatoriaDetalladaTorneo from "./ConvocatoriaDetalladaTorneo";
import ConvocatoriaTorneo from "./ConvocatoriaTorneo";
import VistaPdf from "./VistaPdf";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { PDFViewer } from "@react-pdf/renderer";
import "../css/convocatoria.css";

const Inicio = () => {
  const [torneos, setTorneos] = useState([]);

  React.useEffect(() => {
    obtenerTorneo();
  }, []);

  //console.log("Loading...");
  const obtenerTorneo = async () => {
    const resultado = await axios.get("http://127.0.0.1:8000/api/torneos");
    setTorneos([...resultado.data]);
  };

  return (
    <div className="contentConvocatoria">
      <ConvocatoriaTorneo />
      {/*<ConvocatoriaDetalladaTorneo/>

      <PDFViewer style={{ width: "100%", height: "90vh" }}>
        <VistaPdf torneos={torneos[0]} />
      </PDFViewer>*/}
    </div>
  );
};

export default Inicio;
