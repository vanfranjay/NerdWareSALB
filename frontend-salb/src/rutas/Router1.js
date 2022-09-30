import {Routes, Route} from 'react-router-dom';	
import Router2 from './Router2';
import Usuario from '../componentes/Usuario';
import UserDelegado from '../componentes/UserDelegado';
import Router3 from './Router3';
import listItems from '../componentes/listItems';

const Router1 = ()=>{
    return (
        <>
        <Routes>
            <Route path="/usuario/*" element={<UserDelegado/>}/>
            <Route path='/*' element={<Router2/>}/>
            <Route/>
        </Routes>
        </>
    )
}

export default Router1;