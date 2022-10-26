import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ListaSolicitantes from './ListaSolicitantes';
import VoucherHabilitados from './VoucherHabilitados';
import VoucherRechazados from './VoucherRechazados';
import {Routes, Route, Navigate, useParams, NavLink} from 'react-router-dom';
import "../css/styleVaucherHabilitadosRechazados.css";
import Alerta from "./Alerta";
import EmailHabilitado from './EmailHabilitado';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab className="colorTabSeccionSolicitudes" label="Pendientes" value="1" />
            <Tab className="colorTabSeccionSolicitudes" label="Habilitados" value="2" />
            <Tab className="colorTabSeccionSolicitudes" label="Rechazados" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <ListaSolicitantes/>
        </TabPanel>
        <TabPanel value="2">
          <VoucherHabilitados/>
        </TabPanel>
        <TabPanel value="3">
          {<VoucherRechazados/>}
        </TabPanel>
      </TabContext>
    </Box>
  );
}