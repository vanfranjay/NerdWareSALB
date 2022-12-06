import { Grid } from "@mui/material";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "../css/usuario.css";

const ListaTorneos = () => {
  const TORNEOS_URL = process.env.TORNEOS_API_URL || "http://127.0.0.1:8000/api/torneos";
  const [torneos, setTorneos] = useState([]);
  const [eliminarTorneo, setEliminarTorneo] = useState(false);

  useEffect(() => {
    obtenerTorneo();
  }, []);

  //console.log("Loading...");
  const obtenerTorneo = async () => {
    const resultado = await axios.get(TORNEOS_URL);
    setTorneos([...resultado.data]);
    //console.log(...resultado.data);
  };
  function deletPost(id) {
    axios.delete(`${TORNEOS_URL}/${id}`);
    obtenerTorneo();
    setEliminarTorneo(true);
    setTimeout(() => setEliminarTorneo(false), 3000);
  }
  return (
    <>
      <Grid container spacing={2}>
        {torneos.map((torneo, index) => {
          return (
            <>
              <Grid item xs={1} sm={1} className="nroLista">
                {index + 1}
              </Grid>
              <Grid item xs={10} sm={10} className="listaTorneo">
                {torneo.Nombre_Torneo}
              </Grid>
              <Grid item xs={1} sm={1}>
                <DeleteIcon
                  onClick={() => {
                    deletPost(torneo.id);
                    obtenerTorneo();
                  }}
                  className="colorIcono btnDelete"
                />
              </Grid>
            </>
          );
        })}
        {eliminarTorneo && (
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
              Torneo eliminado!
            </h2>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default ListaTorneos;
