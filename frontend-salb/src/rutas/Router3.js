import { Topic } from '@mui/icons-material';
import React from 'react'
import {Routes, Route, Navigate, useParams, NavLink} from 'react-router-dom';
import UserDelegado from '../componentes/UserDelegado';


const Router3 = () => {
  return (
    <>
    <UserDelegado/>
    {/*<h2>Este es el Panel de control de </h2>
    <NavLink to="prueba">Prueba</NavLink>*/}
    <div>
      <Routes>
        <Route path="prueba" element={<>Hola</>}/>
      </Routes>
    </div>
    </>
  )
}

export default Router3