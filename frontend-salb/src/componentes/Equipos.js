import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import equipo from "../imagenes/basquet.webp";
import "../css/equipo.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Jugadores from "./Jugadores";
import axios from "axios";
import { useState, useEffect } from "react";

export default function MediaCard() {
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  //console.log("Loading...");
  const fetchData = async () => {
    const resultado = await axios.get("http://127.0.0.1:8000/api/equipos");
    setEquipos([...resultado.data]);
    console.log(resultado.data);
  };
  
  return (
    <div className="contendorSelectEquipo">
      <Card sx={{ maxWidth: 400 }} className="cardEquipo">
        <CardMedia
          component="img"
          height="140"
          image={equipo}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Equipos de la Liga Maxi Basquet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel
                id="demo-simple-select-standard-label"
                className="nombreEquipoSelect"
              >
                Seleccionar Equipo
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={age}
                onChange={handleChange}
                label="Age"
                className="selectEquipo"
              >
                {equipos.map(equipo=>(
                  <MenuItem key={equipo.id} value={equipo.id}>{equipo.Nombre}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Typography>
        </CardContent>
        <CardActions className="seleccionarEquipo">
          <Button size="small">
            Seleccionar
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
