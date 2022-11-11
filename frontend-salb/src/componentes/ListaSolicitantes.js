import React, { useRef } from "react";
import "../css/ListaSolicitantes.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import { HourglassBottom } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import logo from "../imagenes/logoLigaBasket.JPG";
import emailjs from "@emailjs/browser";

const ListaSolicitantes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [delegado, setDelegado] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  //console.log("Loading...");
  const fetchData = async () => {
    const resultado = await axios.get("http://127.0.0.1:8000/api/boletas");
    setSolicitudes([...resultado.data]);
    console.log(resultado.data);
  };

  const updateDelegado = async (Cod_Boleta, Estado) => {
    try {
      const { data } = await axios.put(
        `http://127.0.0.1:8000/api/boletas/${Cod_Boleta}`,
        {
          Cod_Boleta,
          Estado,
        }
      );
      //console.log(data);
      alertaHabilitarClose();
      alertaRechazarClose();
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  /////////////////////////////////////////////////////
  const form = useRef();
  const sendEmail = () => {
    //e.preventDefault();

    emailjs
      .sendForm(
        "service_foa3h9f",
        "template_q705q4w",
        form.current,
        "4WSg3isl04tuai9Nn"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    //e.event.reset();
  };
  ////////////////////////////////////////////////////
  const formRechazado = useRef();
  const sendEmailRechazado = () => {
    //e.preventDefault();

    emailjs
      .sendForm(
        "service_foa3h9f",
        "template_q705q4w",
        form.current,
        "4WSg3isl04tuai9Nn"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    //e.event.reset();
  };
  /////////////////////////////////////////////////////

  ///////////////////////////////////////////////////// Dialogo para Habilitar
  const [open, setOpen] = React.useState(false);

  const alertaHabilitarOpen = () => {
    setOpen(true);
  };

  const alertaHabilitarClose = () => {
    setOpen(false);
  };
  ////////////////////////////////////////////////////// Dialogo para Rechazar
  const [opens, setOpens] = React.useState(false);
  const alertaREchazarOpen = () => {
    setOpens(true);
  };
  const alertaRechazarClose = () => {
    setOpens(false);
  };
  //////////////////////////////////////////////////////

  return (
    <div className="accordion" id="accordionExample">
      {solicitudes.map((solicitud, index) => {
        if (solicitud.Estado == 0) {
          return (
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
                    {solicitud.Nombre} {solicitud.Apellido}
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
                    <a href={solicitud.Comprobante} target="_blank" value={556632}>
                      <img
                        src={solicitud.Comprobante}
                        alt="Imagen voucher"
                        className="imagenVoucher"
                      />
                    </a>
                  </div>
                  <div className="cuadroBotonesAcordeon">
                    <div className="centreadoBoton">
                      <Button
                        className="botonSolicitantesHabilitar"
                        variant="outlined"
                        onClick={alertaHabilitarOpen}
                      >
                        Habilitar
                      </Button>
                    </div>
                    <div className="centreadoBoton">
                      <Button
                        variant="contained"
                        className="botonSolicitantesRechazar"
                        onClick={alertaREchazarOpen}
                      >
                        Rechazar
                      </Button>
                    </div>
                  </div>
                  <form ref={form} className="correoEnviar">
                    <label>Name</label>
                    <input
                      type="text"
                      name="user_name"
                      value={solicitud.Nombre}
                    />
                    <label>Email</label>
                    <input
                      type="email"
                      name="user_email"
                      value={solicitud.Correo}
                    />
                    <label>Message</label>
                    <textarea
                      name="message"
                      value={`Señor(a): ${solicitud.Nombre} ${solicitud.Apellido}, por este medio le queremos informar que su solicitud fue Habilitada`}
                    />
                    <input type="onSubmit" value="Send" />
                  </form>
                  <form ref={formRechazado} className="correoEnviar">
                    <label>Name</label>
                    <input
                      type="text"
                      name="user_name"
                      value={solicitud.Nombre}
                    />
                    <label>Email</label>
                    <input
                      type="email"
                      name="user_email"
                      value={solicitud.Correo}
                    />
                    <label>Message</label>
                    <textarea
                      name="message"
                      value={`Señor(a): ${solicitud.Nombre} ${solicitud.Apellido}, por este medio le queremos informar que su solicitud fue Rechazada. Por favor comuniquese con el administrador para mas información.`}
                    />
                    <input type="onSubmit" value="Send" />
                  </form>
                </div>
              </div>
              {/*Ventana de dialogo de Habilitar*/}
              <div>
                <Dialog
                  open={open}
                  onClose={alertaHabilitarClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle
                    id="alert-dialog-title"
                    className="cuadroTituloDialogo"
                  >
                    {"¿Está seguro de habilitar esta solicitud?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText
                      id="alert-dialog-description"
                      className="cuadroTituloDialogoContext"
                    >
                      Al aceptar se notificará por correo electrónico al
                      solicitante.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      className="botonHabilitadoCancelar"
                      onClick={alertaHabilitarClose}
                    >
                      Cancelar
                    </Button>
                    <Button
                      className="botonHabilitadoAceptar"
                      onClick={() => {
                        {
                          updateDelegado(solicitud.Cod_Boleta, 1);
                          sendEmail();
                        }
                      }}
                      autoFocus
                    >
                      Aceptar
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
              {/*Ventana de dialogo de Rechazar*/}
              <div>
                <Dialog
                  open={opens}
                  onClose={alertaRechazarClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle
                    id="alert-dialog-title"
                    className="cuadroTituloDialogoRechazar"
                  >
                    {"¿Está seguro de rechazar esta solicitud?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText
                      id="alert-dialog-description"
                      className="cuadroTituloDialogoContext"
                    >
                      Al aceptar se notificará por correo electrónico al
                      solicitante.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      className="botonHabilitadoCancelar"
                      onClick={alertaRechazarClose}
                    >
                      Cancelar
                    </Button>
                    <Button
                      className="botonHabilitadoAceptar"
                      onClick={() => {
                        {
                          updateDelegado(solicitud.Cod_Boleta, 3);
                          sendEmailRechazado();
                        }
                      }}
                      onSubmit={sendEmail}
                      autoFocus
                    >
                      Aceptar
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default ListaSolicitantes;
