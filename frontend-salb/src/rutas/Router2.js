import {Routes, Route, Navigate} from 'react-router-dom';	
import LogIn from '../componentes/LogIn';
import BarraNavegacion from '../componentes/BarraNavegacion';
import Fotos from '../componentes/Fotos';
import Estadisticas from '../componentes/Estadisticas';
import Equipos from '../componentes/Equipos';
import Juegos from '../componentes/Juegos';
import Noticias from '../componentes/Noticias';
import EnVivo from '../componentes/EnVivo';
import SobreNosotros from '../componentes/SobreNosotros';
import Registrarse from '../componentes/Registrarse';
import Jugadores from '../componentes/Jugadores';

const Router2 = ()=>{
    return (
        <>
        <BarraNavegacion/>
        <div className='container'>    
            <Routes>
                <Route path="/login" element={<LogIn/>}/>
                <Route path="/fotos" element={<Fotos/>}/>
                <Route path="/estadisticas" element={<Estadisticas/>}/>
                <Route path="/equipos" element={<Equipos/>}/>
                <Route path="/juegos" element={<Juegos/>}/>
                <Route path="/noticias" element={<Noticias/>}/>
                <Route path="/en-vivo" element={<EnVivo/>}/>
                <Route path="/sobre-nosotros" element={<SobreNosotros/>}/>
                <Route path="/registrarse" element={<Registrarse/>}/>
                <Route path="/*" element={<Navigate to='LogIn'/>}/>
                <Route/>
                <Route/>
            </Routes>
        </div>
        </>
    )
}

export default Router2;