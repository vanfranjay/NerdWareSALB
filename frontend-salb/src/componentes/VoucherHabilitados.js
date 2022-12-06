import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import "../css/styleVaucherHabilitadosRechazados.css";
import axios from "axios";
import { useState, useEffect } from "react";
import configData from "../config/config.json";

const VoucherHabilitados = () => {
  const BOLETAS_URL = configData.BOLETAS_API_URL || "http://127.0.0.1:8000/api/boletas";
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  //console.log("Loading...");
  const fetchData = async () => {
    const resultado = await axios.get(BOLETAS_URL);
    setSolicitudes([...resultado.data]);
    //console.log(resultado.data);
  };

  return (
    <div className="container centrear">
      {solicitudes.map((solicitud, index) => {
        if (solicitud.Estado == 1) {
          return (
            <>
              <List
                sx={{
                  width: "100%",
                  height: "75px",
                  maxWidth: 600,
                  bgcolor: "background.paper",
                }}
                className="listGrupo"
              >
                <ListItem
                  alignItems="flex-start"
                  className="vaucherHabilitados"
                >
                  {/*<div className="numeroEnLista">{index + 1}</div>*/}
                  {/*<div className="generalidades">
                    <ListItemAvatar>
                      <Avatar
                        alt="Foto Perfil"
                        src={solicitud.Foto_Perfil}
                      />
                    </ListItemAvatar>
                  </div>*/}
                  <div className="generalidades nombreUsuarioVoucher">
                    <ListItemText>
                      {solicitud.Nombre} {solicitud.Apellido}
                    </ListItemText>
                  </div>
                </ListItem>
                <Divider variant="inset" component="li" className="divisor" />
              </List>
            </>
          );
        }
      })}
    </div>
  );
};
export default VoucherHabilitados;
