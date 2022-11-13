import { Divider, Grid, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import "../css/usuario.css";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Button from "@mui/material/Button";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "start",
  color: theme.palette.text.secondary,
}));

const RegistrarTorneo = () => {
  const [torneo, setTorneo] = useState({
    Campeon: "Bolivar",
    Subcampeon: "hola",
    Fecha_Ini_Convocatoria: "2022-10-15",
    Fecha_Fin_Convocatoria: "2022-11-30",
    Invitacion: "",
    Nombre_Torneo: "",
    Lugar_Evento: "",
    Fecha_Ini_Torneo: "",
    Fecha_Fin_Torneo: "",
    Categoria: "",
    Rama: "",
    Caracter: "",
    MontoPreinscripcion: "",
    Fecha_Ini_Preinscripcion: "",
    Fecha_Fin_Preinscripcion: "",
    MontoInscripcion: "",
    Fecha_Ini_Inscripcion: "",
    Fecha_Fin_Inscripcion: "",
    Telefono: "",
    Responsable: "",
  });

  const registerTorneo = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("http://127.0.0.1:8000/api/torneos", {
        ...torneo,
      });
      console.log(data);
      setTorneo({
        Campeon: "Bolivar",
        Subcampeon: "hola",
        Fecha_Ini_Convocatoria: "2022-10-15",
        Fecha_Fin_Convocatoria: "2022-11-30",
        Invitacion: "",
        Nombre_Torneo: "",
        Lugar_Evento: "",
        Fecha_Ini_Torneo: "",
        Fecha_Fin_Torneo: "",
        Categoria: "",
        Rama: "",
        Caracter: "",
        MontoPreinscripcion: "",
        Fecha_Ini_Preinscripcion: "",
        Fecha_Fin_Preinscripcion: "",
        MontoInscripcion: "",
        Fecha_Ini_Inscripcion: "",
        Fecha_Fin_Inscripcion: "",
        Telefono: "",
        Responsable: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Typography
        variant="h5"
        align="center"
        color="#ffff"
        sx={{
          input: { color: "white" },
        }}
      >
        ¡Registrar Torneo!
      </Typography>
      <hr className="hr" />
      <form onSubmit={registerTorneo}>
        <div className="cuandroContentRegisterTorneo">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Item className="fondoColor">
                <TextField
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                  }}
                  required
                  id="standard-required"
                  label="Invitacion para: "
                  name="Invitacion"
                  onChange={(e) =>
                    setTorneo({ ...torneo, Invitacion: e.target.value })
                  }
                  value={torneo.Invitacion}
                  fullWidth
                  defaultValue="Equipos y clubes de maxi basquet"
                  variant="standard"
                />
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item className="fondoColor">
                <TextField
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                  }}
                  id="standard-required1"
                  required
                  label="Nombre del Torneo: "
                  onChange={(e) =>
                    setTorneo({ ...torneo, Nombre_Torneo: e.target.value })
                  }
                  value={torneo.Nombre_Torneo}
                  name="Nombre_Torneo"
                  fullWidth
                  defaultValue=""
                  variant="standard"
                />
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item className="fondoColor">
                <TextField
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                  }}
                  id="standard-required5"
                  required
                  label="Lugar del evento: "
                  onChange={(e) =>
                    setTorneo({ ...torneo, Lugar_Evento: e.target.value })
                  }
                  value={torneo.Lugar_Evento}
                  fullWidth
                  defaultValue=""
                  name="Lugar_Evento"
                  variant="standard"
                />
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item className="fondoColor">
                <TextField
                  type="date"
                  id="standard-required9"
                  label="Fecha de inicio: "
                  name="Fecha_Ini_Torneo"
                  required
                  onChange={(e) =>
                    setTorneo({ ...torneo, Fecha_Ini_Torneo: e.target.value })
                  }
                  value={torneo.Fecha_Ini_Torneo}
                  fullWidth
                  defaultValue=" "
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    input: { color: "#fff" },
                    label: { color: "#fff" },
                  }}
                />
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item className="fondoColor">
                <TextField
                  type="date"
                  id="standard-required10"
                  label="Fecha de finalización: "
                  required
                  name="Fecha_Fin_Torneo"
                  onChange={(e) =>
                    setTorneo({ ...torneo, Fecha_Fin_Torneo: e.target.value })
                  }
                  value={torneo.Fecha_Fin_Torneo}
                  fullWidth
                  defaultValue=" "
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    input: { color: "#fff" },
                    label: { color: "#fff" },
                  }}
                />
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item className="fondoColor">
                <FormControl
                  variant="standard"
                  fullWidth
                  sx={{
                    input: { color: "#fff" },
                    label: { color: "#fff" },
                    select: { color: "#fff" },
                    option: { color: "#000" },
                    div: { color: "#fff" },
                  }}
                >
                  <InputLabel id="demo-simple-select-label" required>
                    Categorias: 
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={torneo.Categoria}
                    label="Categoria"
                    required
                    onChange={(e) =>
                      setTorneo({ ...torneo, Categoria: e.target.value })
                    }
                  >
                    <MenuItem value={"Femenino"}>25+</MenuItem>
                    <MenuItem value={"Masculino"}>35+</MenuItem>
                    <MenuItem value={"Femenino/Masculino"}>45+</MenuItem>
                  </Select>
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item className="fondoColor">
                <FormControl
                  variant="standard"
                  fullWidth
                  sx={{
                    input: { color: "#fff" },
                    label: { color: "#fff" },
                    select: { color: "#fff" },
                    option: { color: "#000" },
                    div: { color: "#fff" },
                  }}
                >
                  <InputLabel id="demo-simple-select-label" required>Rama: </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={torneo.Rama}
                    label="Rama"
                    onChange={(e) =>
                      setTorneo({ ...torneo, Rama: e.target.value })
                    }
                  >
                    <MenuItem value={"Femenino"}>Femenino</MenuItem>
                    <MenuItem value={"Masculino"}>Masculino</MenuItem>
                    <MenuItem value={"Femenino/Masculino"}>
                      Femenino/Masculino
                    </MenuItem>
                  </Select>
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item className="fondoColor">
                <FormControl
                  variant="standard"
                  fullWidth
                  required
                  sx={{
                    input: { color: "#fff" },
                    label: { color: "#fff" },
                    select: { color: "#fff" },
                    option: { color: "#000" },
                    div: { color: "#fff" },
                  }}
                >
                  <InputLabel id="demo-simple-select-label">
                    Caracter del Evento: 
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="caracter del evento"
                    onChange={(e) =>
                      setTorneo({ ...torneo, Caracter: e.target.value })
                    }
                    value={torneo.Caracter}
                  >
                    <MenuItem value={"Femenino"}>Internacional</MenuItem>
                    <MenuItem value={"Masculino"}>Nacional</MenuItem>
                    <MenuItem value={"Femenino/Masculino"}>
                      Inter-departamental
                    </MenuItem>
                  </Select>
                </FormControl>
              </Item>
            </Grid>
          </Grid>
        </div>
        <Typography
          className="tituloPreInsRes"
          variant="h5"
          align="center"
          color="#ffff"
          sx={{
            input: { color: "white" },
          }}
        >
          Pre-inscripción
        </Typography>
        <hr className="hr" />
        <div className="cuandroContentRegisterTorneo">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Item className="fondoColor">
                <TextField
                  type="number"
                  id="standard-required4"
                  label="Costo de preinscripción ($): "
                  fullWidth
                  name="MontoPreinscripcion"
                  required
                  onChange={(e) =>
                    setTorneo({
                      ...torneo,
                      MontoPreinscripcion: e.target.value,
                    })
                  }
                  value={torneo.MontoPreinscripcion}
                  defaultValue=""
                  variant="standard"
                  sx={{
                    input: { color: "#fff" },
                    label: { color: "#fff" },
                  }}
                />
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item className="fondoColor">
                <TextField
                  type="date"
                  id="standard-required4"
                  label="Fecha inicio de preinscripción: "
                  required
                  fullWidth
                  name="Fecha_Ini_Preinscripcion"
                  onChange={(e) =>
                    setTorneo({
                      ...torneo,
                      Fecha_Ini_Preinscripcion: e.target.value,
                    })
                  }
                  value={torneo.Fecha_Ini_Preinscripcion}
                  defaultValue=" "
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    input: { color: "#fff" },
                    label: { color: "#fff" },
                  }}
                />
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item className="fondoColor">
                <TextField
                  type="date"
                  id="standard-required4"
                  label="Fecha fin de preinscripción: "
                  required
                  name="Fecha_Fin_Preinscripcion"
                  onChange={(e) =>
                    setTorneo({
                      ...torneo,
                      Fecha_Fin_Preinscripcion: e.target.value,
                    })
                  }
                  value={torneo.Fecha_Fin_Preinscripcion}
                  fullWidth
                  defaultValue=" "
                  variant="standard"
                  sx={{
                    input: { color: "#fff" },
                    label: { color: "#fff" },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Item>
            </Grid>
          </Grid>
        </div>
        <Typography
          className="tituloPreInsRes"
          variant="h5"
          align="center"
          color="#ffff"
          sx={{
            input: { color: "white" },
            label: { color: "white" },
          }}
        >
          Inscripción
        </Typography>
        <hr className="hr" />
        <div className="cuandroContentRegisterTorneo">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Item className="fondoColor">
                <TextField
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                  }}
                  type="number"
                  id="standard-required4"
                  label="Costo de inscripción ($): "
                  required
                  name="MontoInscripcion"
                  onChange={(e) =>
                    setTorneo({ ...torneo, MontoInscripcion: e.target.value })
                  }
                  value={torneo.MontoInscripcion}
                  fullWidth
                  defaultValue=""
                  variant="standard"
                />
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item className="fondoColor">
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                  }}
                  type="date"
                  id="standard-required4"
                  label="Fecha inicio de inscripción: "
                  required
                  fullWidth
                  name="Fecha_Ini_Inscripcion"
                  onChange={(e) =>
                    setTorneo({
                      ...torneo,
                      Fecha_Ini_Inscripcion: e.target.value,
                    })
                  }
                  value={torneo.Fecha_Ini_Inscripcion}
                  defaultValue=""
                  variant="standard"
                />
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item className="fondoColor">
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                  }}
                  type="date"
                  id="standard-required4"
                  label="Fecha fin de inscripción: "
                  required
                  onChange={(e) =>
                    setTorneo({
                      ...torneo,
                      Fecha_Fin_Inscripcion: e.target.value,
                    })
                  }
                  value={torneo.Fecha_Fin_Inscripcion}
                  fullWidth
                  name="Fecha_Fin_Inscripcion"
                  defaultValue=""
                  variant="standard"
                />
              </Item>
            </Grid>
          </Grid>
        </div>
        <Typography
          className="tituloPreInsRes"
          variant="h5"
          align="center"
          color="#ffff"
          sx={{
            input: { color: "white" },
            label: { color: "white" },
          }}
        >
          Responsable
        </Typography>
        <hr className="hr" />
        <div className="cuandroContentRegisterTorneo">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Item className="fondoColor">
                <TextField
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                  }}
                  type="text"
                  id="standard-required6"
                  label="Nombre completo: "
                  required
                  fullWidth
                  name="Responsable"
                  onChange={(e) =>
                    setTorneo({ ...torneo, Responsable: e.target.value })
                  }
                  value={torneo.Responsable}
                  defaultValue=""
                  variant="standard"
                />
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item className="fondoColor">
                <TextField
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                  }}
                  type="number"
                  id="standard-required7"
                  label="Telefono: "
                  required
                  fullWidth
                  name="Telefono"
                  onChange={(e) =>
                    setTorneo({ ...torneo, Telefono: e.target.value })
                  }
                  value={torneo.Telefono}
                  defaultValue=""
                  variant="standard"
                />
              </Item>
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container spacing={2} className="contentBtnRegisterCancelar">
            <Grid item xs={6} md={6} align="end">
              <Button
                className="botonHabilitadoAceptar"
                type="submit"
                autoFocus
              >
                Registrar
              </Button>
            </Grid>
            <Grid item xs={6} md={6}>
              <Button
                className="botonHabilitadoCancelar"
                onClick={() => {
                  {
                  }
                }}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </div>
      </form>
    </>
  );
};

export default RegistrarTorneo;
