import React from 'react';
import '../css/ListaSolicitantes.css';
import Button from '@mui/material/Button';

const ListaSolicitantes = () => {
    return(
            <div class="accordion" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header tituloEncabezadoListaAcordeon" id="heading">
          <button class="accordion-button collapsed encabezadoListaAcordeon" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
            <label className='textoTitulo'>Fulano fulanes</label>
          </button>
        </h2>
        <div id="collapse1" class="accordion-collapse collapse" aria-labelledby="heading1" data-bs-parent="#accordionExample">
          <div class="accordion-body bodyAcordeon">
            <div className='labelCuadroAcordeon'>
              <label className='texto'>Fecha de deposito:</label>
            </div>
            <div className='inputCuadroAcordeon'>
              <input className='inputNumero texto' type='text' readOnly value={12345689}></input>
            </div>
            <div className='labelCuadroAcordeon'>
              <label className='texto'>Monto de deposito:</label> 
            </div>
            <div className='inputCuadroAcordeon'>
              <input className='inputNumero texto' type='text' readOnly value={12345689}></input>
            </div>
            <div className='labelCuadroAcordeon'>
              <label className='texto'>Número de Transferencia:</label>
            </div>
            <div className='inputCuadroAcordeon'>
              <input  className='inputNumero texto' type='text' readOnly value={12345689}></input>
            </div>
            <div className='cuadroImagenAcordeon'>
              <a href='#'>Descargar Voucher</a>
            </div>
            <div className='cuadroBotonesAcordeon'>
              <div className='centreadoBoton'>
                <Button variant="contained" className='botonSolicitantesHabilitar'>Habilitar</Button> 
              </div>
              <div className='centreadoBoton'>
                <Button variant="contained" className='botonSolicitantesRechazar'>Rechazar</Button> 
              </div>
              <div className='centreadoBoton'>
                <Button variant="contained" className='botonSolicitantes'>Guardar</Button> 
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header tituloEncabezadoListaAcordeon" id="heading">
          <button class="accordion-button collapsed encabezadoListaAcordeon" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
            <label className='textoTitulo'>Fulano fulanes</label>
          </button>
        </h2>
        <div id="collapse2" class="accordion-collapse collapse" aria-labelledby="heading2" data-bs-parent="#accordionExample">
          <div class="accordion-body bodyAcordeon">
            <div className='labelCuadroAcordeon'>
              <label className='texto'>Fecha de deposito:</label>
            </div>
            <div className='inputCuadroAcordeon'>
              <input className='inputNumero texto' type='text' readOnly value={12345689}></input>
            </div>
            <div className='labelCuadroAcordeon'>
              <label className='texto'>Monto de deposito:</label> 
            </div>
            <div className='inputCuadroAcordeon'>
              <input className='inputNumero texto' type='text' readOnly value={12345689}></input>
            </div>
            <div className='labelCuadroAcordeon'>
              <label className='texto'>Número de Transferencia:</label>
            </div>
            <div className='inputCuadroAcordeon'>
              <input  className='inputNumero texto' type='text' readOnly value={12345689}></input>
            </div>
            <div className='cuadroImagenAcordeon'>
              <a href='#'>Descargar Voucher</a>
            </div>
            <div className='cuadroBotonesAcordeon'>
              <div className='centreadoBoton'>
                <Button variant="contained" className='botonSolicitantesHabilitar'>Habilitar</Button> 
              </div>
              <div className='centreadoBoton'>
                <Button variant="contained" className='botonSolicitantesRechazar'>Rechazar</Button> 
              </div>
              <div className='centreadoBoton'>
                <Button variant="contained" className='botonSolicitantes'>Guardar</Button> 
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header tituloEncabezadoListaAcordeon" id="heading">
          <button class="accordion-button collapsed encabezadoListaAcordeon" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
            <label className='textoTitulo'>Fulano fulanes</label>
          </button>
        </h2>
        <div id="collapse3" class="accordion-collapse collapse" aria-labelledby="heading3" data-bs-parent="#accordionExample">
          <div class="accordion-body bodyAcordeon">
            <div className='labelCuadroAcordeon'>
              <label className='texto'>Fecha de deposito:</label>
            </div>
            <div className='inputCuadroAcordeon'>
              <input className='inputNumero texto' type='text' readOnly value={12345689}></input>
            </div>
            <div className='labelCuadroAcordeon'>
              <label className='texto'>Monto de deposito:</label> 
            </div>
            <div className='inputCuadroAcordeon'>
              <input className='inputNumero texto' type='text' readOnly value={12345689}></input>
            </div>
            <div className='labelCuadroAcordeon'>
              <label className='texto'>Número de Transferencia:</label>
            </div>
            <div className='inputCuadroAcordeon'>
              <input  className='inputNumero texto' type='text' readOnly value={12345689}></input>
            </div>
            <div className='cuadroImagenAcordeon'>
              <a href='#'>Descargar Voucher</a>
            </div>
            <div className='cuadroBotonesAcordeon'>
              <div className='centreadoBoton'>
                <Button variant="contained" className='botonSolicitantesHabilitar'>Habilitar</Button> 
              </div>
              <div className='centreadoBoton'>
                <Button variant="contained" className='botonSolicitantesRechazar'>Rechazar</Button> 
              </div>
              <div className='centreadoBoton'>
                <Button variant="contained" className='botonSolicitantes'>Guardar</Button> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
};

export default ListaSolicitantes;