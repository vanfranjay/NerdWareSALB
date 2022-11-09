import { Divider, Grid, MenuItem, Select } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import "../css/usuario.css";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Button from "@mui/material/Button";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "start",
  color: theme.palette.text.secondary,
}));

const RegistrarTorneo = () => {
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
      <form>
        <div className="cuandroContentRegisterTorneo">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Item className="fondoColor">
                <TextField
                  required
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                  }}
                  id="standard-required"
                  label="Invitacion para"
                  fullWidth
                  defaultValue="Equipos y clubes de maxi basquet"
                  variant="standard"
                />
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item className="fondoColor">
                <TextField
                  required
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                  }}
                  id="standard-required1"
                  label="Nombre del Torneo"
                  fullWidth
                  defaultValue=""
                  variant="standard"
                />
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item className="fondoColor">
                <TextField
                  required
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                  }}
                  id="standard-required5"
                  label="Lugar"
                  fullWidth
                  defaultValue=""
                  variant="standard"
                />
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item className="fondoColor">
                <TextField
                  required
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                  }}
                  id="standard-required2"
                  label="Fecha de inicio"
                  fullWidth
                  defaultValue=""
                  variant="standard"
                />
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item className="fondoColor">
                <TextField
                  required
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                  }}
                  id="standard-required3"
                  label="Fecha de finalización"
                  fullWidth
                  defaultValue=""
                  variant="standard"
                />
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item className="fondoColor">
                <FormControl
                  fullWidth
                  sx={{
                    input: { color: "#fff" },
                    label: { color: "#fff" },
                    select: { color: "#fff" },
                    option: { color: "#000" },
                  }}
                >
                  <InputLabel variant="standard" htmlFor="uncontrolled-native1">
                    Select
                  </InputLabel>
                  <NativeSelect
                    inputProps={{
                      name: "age",
                      id: "uncontrolled-native1",
                    }}
                  >
                    <option value={40}>Internacional</option>
                    <option value={50}>Nacional</option>
                    <option value={60}>inter-departamental</option>
                  </NativeSelect>
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item className="fondoColor">
                <FormControl
                  fullWidth
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                    select: { color: "white" },
                    option: { color: "#000" },
                  }}
                >
                  <InputLabel variant="standard" htmlFor="uncontrolled-native1">
                    Rama
                  </InputLabel>
                  <NativeSelect
                    inputProps={{
                      name: "age",
                      id: "uncontrolled-native1",
                    }}
                  >
                    <option value={40}>Femenino</option>
                    <option value={50}>Masculino</option>
                    <option value={60}>Femenino/Masculino</option>
                  </NativeSelect>
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item className="fondoColor">
                <FormControl
                  fullWidth
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                    select: { color: "white" },
                    option: { color: "#000" },
                  }}
                >
                  <InputLabel variant="standard" htmlFor="uncontrolled-native1">
                    Caracter del evento
                  </InputLabel>
                  <NativeSelect
                    inputProps={{
                      name: "age",
                      id: "uncontrolled-native1",
                    }}
                  >
                    <option value={40}>Internacional</option>
                    <option value={50}>Nacional</option>
                    <option value={60}>Inter-departamental</option>
                  </NativeSelect>
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
                  required
                  type="number"
                  id="standard-required4"
                  label="Costo de preinscripción ($)"
                  fullWidth
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
                  required
                  type="date"
                  id="standard-required4"
                  label="Fecha inicio de preinscripción:"
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
                  required
                  type="date"
                  id="standard-required4"
                  label="Fecha fin de preinscripción:"
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
                  required
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                  }}
                  type="number"
                  id="standard-required4"
                  label="Costo de inscripción ($)"
                  fullWidth
                  defaultValue=""
                  variant="standard"
                />
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item className="fondoColor">
                <TextField
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                  }}
                  type="date"
                  id="standard-required4"
                  label="Fecha inicio de inscripción:"
                  fullWidth
                  defaultValue=""
                  variant="standard"
                />
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item className="fondoColor">
                <TextField
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                  }}
                  type="date"
                  id="standard-required4"
                  label="Fecha fin de inscripción:"
                  fullWidth
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
                  required
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                  }}
                  type="text"
                  id="standard-required6"
                  label="Nombre completo"
                  fullWidth
                  defaultValue=""
                  variant="standard"
                />
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item className="fondoColor">
                <TextField
                  required
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                  }}
                  type="number"
                  id="standard-required7"
                  label="Telefono"
                  fullWidth
                  defaultValue=""
                  variant="standard"
                />
              </Item>
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container spacing={2} className="contentBtnRegisterCancelar">
            <Grid item xs={6} md={6} align="end" >
              <Button
                className="botonHabilitadoAceptar"
                onClick={() => {
                  {
                  }
                }}
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
