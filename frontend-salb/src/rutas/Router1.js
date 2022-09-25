import {Routes, Route} from 'react-router-dom';	
import Router2 from './Router2';
import Usuario from '../componentes/Usuario';
import Dashboard from '../componentes/UserDelegado';

const Router1 = ()=>{
    return (
        <>
        <Routes>
            <Route path="/usuario" element={<Dashboard/>}/>
            <Route path='/*' element={<Router2/>}/>
            <Route/>
        </Routes>
        </>
    )
}

export default Router1;