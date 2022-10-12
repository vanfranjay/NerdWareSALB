import React from "react";
import "../css/ListaSolicitantes.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState, useEffect } from "react";

const ListaSolicitantes = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resultado = await axios.get(
        "http://127.0.0.1:8000/api/boletas"
      );
      setSolicitudes([...resultado.data]);
      console.log(resultado.data);
    };
    fetchData();
  }, []);

  return (
    <div class="accordion" id="accordionExample">
      {solicitudes.map((solicitud, index)=>{
        return(
          <div className="accordion-item" key={index}>
            <h2
              className="accordion-header tituloEncabezadoListaAcordeon"
              id="heading"
            >
              <button
                className="accordion-button collapsed encabezadoListaAcordeon"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${solicitud.Cod_Boleta}`}
                aria-expanded="true"
                aria-controls={`collapse${solicitud.Cod_Boleta}`}
              >
                <label className="textoTitulo">
                  {solicitud.Cod_Boleta}
                </label>
              </button>
            </h2>
            <div
              id={`collapse${solicitud.Cod_Boleta}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading${solicitud.Cod_Boleta}`}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body bodyAcordeon">
                <div className="labelCuadroAcordeon">
                  <label className="texto">Fecha de deposito:</label>
                </div>
                <div className="inputCuadroAcordeon">
                  <input
                    className="inputNumero texto"
                    type="text"
                    readOnly
                    value={solicitud.Fecha_Registro}
                  ></input>
                </div>
                <div className="labelCuadroAcordeon">
                  <label className="texto">Monto de deposito:</label>
                </div>
                <div className="inputCuadroAcordeon">
                  <input
                    className="inputNumero texto"
                    type="text"
                    readOnly
                    value={solicitud.Monto}
                  ></input>
                </div>
                <div className="labelCuadroAcordeon">
                  <label className="texto">Número de Transferencia:</label>
                </div>
                <div className="inputCuadroAcordeon">
                  <input
                    className="inputNumero texto"
                    type="text"
                    readOnly
                    value={solicitud.N_Transaccion}
                  ></input>
                </div>
                <div className="cuadroImagenAcordeon">
                  <a href="#" value={556632}>
                    Descargar Voucher
                  </a>
                </div>
                <div className="cuadroBotonesAcordeon">
                  <div className="centreadoBoton">
                    <Button
                      variant="contained"
                      className="botonSolicitantesHabilitar"
                    >
                      Habilitar
                    </Button>
                  </div>
                  <div className="centreadoBoton">
                    <Button
                      variant="contained"
                      className="botonSolicitantesRechazar"
                    >
                      Rechazar
                    </Button>
                  </div>
                  <div className="centreadoBoton">
                    <Button variant="contained" className="botonSolicitantes">
                      Guardar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })
      }
    </div>
  );
};

export default ListaSolicitantes;