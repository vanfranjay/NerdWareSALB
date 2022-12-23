import { Routes, Route, Navigate } from "react-router-dom";
import LogIn from "../componentes/LogIn";
import BarraNavegacion from "../componentes/barraNavegacion";
import Fotos from "../componentes/Fotos";
import Estadisticas from "../componentes/Estadisticas";
import Equipos from "../componentes/Equipos";
import ListaEquipos from "../componentes/ListaEquipos";
import Juegos from "../componentes/Juegos";
import Noticias from "../componentes/Noticias";
import EnVivo from "../componentes/EnVivo";
import SobreNosotros from "../componentes/SobreNosotros";
import Registrarse from "../componentes/Registrarse";
import RegistrarJugador from "../componentes/RegistrarJugador";
import Jugadores from "../componentes/Jugadores";
import Inicio from "../componentes/Inicio";
import Partidos from "../componentes/Partidos";
import Puntuaciones from "../componentes/Puntuaciones";

const Router2 = () => {
  return (
    <>
      <BarraNavegacion />
      <div className="container">
        <Routes>
          <Route path="/convocatoria" element={<Inicio />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/fotos" element={<Fotos />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
          <Route path="/jugadores" element={<Jugadores />} />
          <Route path="/equipos" element={<ListaEquipos />} />
          <Route path="/partidos" element={<Partidos />} />
          <Route path="/puntuaciones" element={<Puntuaciones />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
          <Route path="/juegos" element={<Juegos />} />
          <Route path="/noticias" element={<Noticias />} />
          {/*<Route path="/jugadores" element={<Noticias />} />*/}
          <Route path="/en-vivo" element={<EnVivo />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/registrarse" element={<Registrarse />} />
          {/*<Route path="/usuario/registrar-jugador" element={<RegistrarJugador />} />*/}
          <Route path="/*" element={<Navigate to="logIn" />} />
          <Route />
          <Route />
        </Routes>
      </div>
    </>
  );
};

export default Router2;
