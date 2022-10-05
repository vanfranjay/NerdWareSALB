import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SelectCategoria from '../componentes/SelectCategoria';
import '../css/usuario.css';

const RegistrarEquipo = () => {
  return (
    <>
      <div>
        <form>
          <h4 className='texto'>Equipo: </h4>
          <fieldset className='registrarEquipo'>
            <div>
              <TextField
                required
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
                label="Teléfono/Celular: "
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
              <TextField
                required
                id="filled-required"
                label="Rol: "
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
                label="Dni: "
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
                label="Comprobante de pago"
                InputLabelProps={{ shrink: true }}
                sx={{
                    label: { color: '#ffff' },
                    input: { color: '#ffff' },
                    svg: { color: '#ffff' }
                }}
              />
            </div>
            <div className='contenedorBtnAñadirParticipante'>
              <Button variant="contained" className='btnAñadir'>Añadir</Button>
            </div>
            <div className='contenedorBtnCancelarParticipante'>
              <Button variant="contained" className='btnCancelar'>Cancelar</Button>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  )
}

export default RegistrarEquipo