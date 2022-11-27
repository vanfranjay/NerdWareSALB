import React from "react";
import RegistrarTorneo from "./RegistrarTorneo";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ListaTorneos from "./ListaTorneos";
import '../css/usuario.css';

const TabRegistrarTorneo = () => {
  const [value, setValue] = React.useState("10");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return(
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" className="contentBarraRegisterTorneo">
            <Tab className="colorTabSeccionSolicitudes" label="Registrar" value="10" />
            <Tab className="colorTabSeccionSolicitudes" label="Lista de Torneos" value="11" />
          </TabList>
        </Box>
        <TabPanel value="10">
          <RegistrarTorneo/>
        </TabPanel>
        <TabPanel value="11">
          <ListaTorneos/>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default TabRegistrarTorneo;
