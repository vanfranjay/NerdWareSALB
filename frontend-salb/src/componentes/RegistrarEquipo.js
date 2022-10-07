import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SelectCategoria from '../componentes/SelectCategoria';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../css/usuario.css';

const RegistrarEquipo = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <div>
        <form>
          <h4 className='texto'>Equipo: </h4>
          <fieldset className='registrarEquipo'>
            <div>
              <TextField
                required
                type="text"
                id="filled-required"
                label="Nombre equipo: "
                defaultValue=""
                variant="filled"
                sx={{
                  label: { color: '#ffff' },
                  input: { color: '#ffff' },
                  svg: { color: '#ffff' }
                }}
              />
            </div>
            <div>
              <SelectCategoria/>
            </div>
          </fieldset>
          <h4 className='texto'>Participantes: </h4>
          <fieldset className='registrarParticipantes'>
            <div>
              <TextField
                required
                id="filled-required"
                label="Nombre: "
                className='inputRegistrarEquipo'
                defaultValue=""
                variant="filled"
                sx={{
                  label: { color: '#ffff' },
                  input: { color: '#ffff' },
                  svg: { color: '#ffff' }
                }}
              />
            </div>
            <div>
              <TextField
                required
                id="filled-required"
                label="Apellido: "
                className='inputRegistrarEquipo'
                defaultValue=""
                variant="filled"
                sx={{
                  label: { color: '#ffff' },
                  input: { color: '#ffff' },
                  svg: { color: '#ffff' }
                }}
              />
            </div>
            <div>
              <TextField
                required
                id="filled-required"
                label="Fecha de Nacimiento: "
                className='inputRegistrarEquipo'
                defaultValue=""
                variant="filled"
                type="date"
                sx={{
                  label: { color: '#ffff' },
                  input: { color: '#ffff' },
                  svg: { color: '#ffff' }
                }}
              />
            </div>
            <div>
              <TextField
                required
                type="number"
                id="filled-required"
                label="Teléfono/Celular: "
                className='inputRegistrarEquipo'
                defaultValue=""
                variant="filled"
                sx={{
                  label: { color: '#ffff' },
                  input: { color: '#ffff' },
                  svg: { color: '#ffff' }
                }}
              />
            </div>
            <div>
              <TextField
                required
                id="filled-required"
                label="E-mail: "
                className='inputRegistrarEquipo'
                type="email"
                defaultValue=""
                variant="filled"
                sx={{
                  label: { color: '#ffff' },
                  input: { color: '#ffff' },
                  svg: { color: '#ffff' }
                }}
              />
            </div>
            <div>
               <Box sx={{ minWidth: 120}}>
               <FormControl fullWidth className='inputRegistrarEquipo'>
                 <InputLabel id="demo-simple-select-label" className='selectCategoria'>Rol</InputLabel>
                 <Select
                   labelId="demo-simple-select-label"
                   id="demo-simple-select"
                   value={age}
                   label="Categoria"
                   onChange={handleChange}
                   className='selectValor'
                 >
                   <MenuItem value={10}>Arbitro</MenuItem>
                   <MenuItem value={20}>Entrenador</MenuItem>
                   <MenuItem value={30}>Jugador(ra)</MenuItem>
                 </Select>
               </FormControl>
             </Box>
            </div>
            
            <div>
              <TextField
                required
                id="filled-required"
                label="Dni: "
                className='inputRegistrarEquipo'
                defaultValue=""
                variant="filled"
                sx={{
                  label: { color: '#ffff' },
                  input: { color: '#ffff' },
                  svg: { color: '#ffff' }
                }}
              />
            </div>
            <div>
              <TextField
                id="filled-multiline-static"
                label="Dirección"
                className='inputRegistrarEquipo'
                multiline
                rows={2}
                defaultValue=""
                variant="filled"
                sx={{
                  label: { color: '#ffff' },
                  input: { color: '#ffff' },
                  svg: { color: '#ffff' }
                }}  
              />
            </div>
            <div>
              <TextField
                name="upload-photo"
                type="file"
                label="Foto del Dni: "
                className='inputRegistrarEquipo'
                InputLabelProps={{ shrink: true }}
                sx={{
                    label: { color: '#ffff' },
                    input: { color: '#ffff' },
                    svg: { color: '#ffff' }/*},
                    "& .MuiInputBase-input": {
                        width: "460px" // Set your height here.
                    }*/
                }}
              />
            </div>
            
            <div>
              <TextField
                name="upload-photo"
                type="file"
                label="Foto del participante"
                className='inputRegistrarEquipo'
                InputLabelProps={{ shrink: true }}
                sx={{
                    label: { color: '#ffff' },
                    input: { color: '#ffff' },
                    svg: { color: '#ffff' }
                }}
              />
            </div>
            <div className='contenedorBtnAñadirParticipante'>
              <Button variant="contained" className='btnAñadir' type='submit'>Añadir</Button>
            </div>
            <div className='contenedorBtnCancelarParticipante'>
              <Button variant="contained" className='btnCancelar' type='reset'>Cancelar</Button>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  )
}

export default RegistrarEquipo