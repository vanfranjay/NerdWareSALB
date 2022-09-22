import logo from './logo.svg';
import './App.css';
import BarraNavegacion from './componentes/BarraNavegacion';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Fotos from './componentes/Fotos';
import LogIn from './componentes/LogIn';

function App() {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <BarraNavegacion/>
          <div className='container'>
            <Routes>
              <Route path='/fotos' element={<Fotos/>}/>
              <Route path='/login' element={<LogIn/>}/>
            </Routes>
          </div>
        </BrowserRouter>
        
      </div>
    </div>
  );
}

export default App;
