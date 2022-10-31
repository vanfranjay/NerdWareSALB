import { Routes, Route } from 'react-router-dom';
import Router2 from './rutas/Router2';
import Usuario from './componentes/Usuario';
import UserDelegado from './componentes/UserDelegado';
import UserAdmi from './componentes/UserAdmi';
import Router3 from './rutas/Router3';
import listItems from './componentes/listItems';
import { useState } from 'react';
import { ProtectedRoute } from './rutas/ProtectedRoute';

function App() {

  const [user, setUser] = useState(null)

  const login = () => {
    //request done
    setUser({
      id: 1,
      name: 'John',
      roles: ['admi']
    })
    const logout = () => setUser(null)
  }

  return (
    <>
      <Routes>
        //primera manera
        <Route element={<ProtectedRoute isAllowed={!!user && user.roles.includes('delegado')} />}> //  !!user = user ? true: false
          //rutas con el mismo nivel solo es necesario arrastrarlo aqui
          <Route path='/home/*' element={<UserDelegado />} />
        </Route>
        //segunda manera
        <Route path="/admi/*" element={
          <ProtectedRoute isAllowed={!!user && user.roles.includes('admi')}>
            <UserAdmi />
          </ProtectedRoute>
        } />
        <Route path='/*' element={<Router2 />} />
        <Route />
      </Routes>
    </>
  );
}

export default App;
