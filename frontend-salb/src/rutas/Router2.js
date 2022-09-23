import {Routes, Route, Navigate} from 'react-router-dom';	
import LogIn from '../componentes/LogIn';
import BarraNavegacion from '../componentes/BarraNavegacion';
import Fotos from '../componentes/Fotos';

const Router2 = ()=>{
    return (
        <>
        <BarraNavegacion/>
        <div className='container'>    
            <Routes>
                <Route path="/login" element={<LogIn/>}/>
                <Route path="/fotos" element={<Fotos/>}/>
                <Route path="/" element={<Navigate to='LogIn'/>}/>
                <Route/>
                <Route/>
            </Routes>
        </div>
        </>
    )
}

export default Router2;