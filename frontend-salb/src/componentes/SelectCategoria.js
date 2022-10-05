import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../css/usuario.css';

export default function BasicSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" className='selectCategoria'>Categoria</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Categoria"
          onChange={handleChange}
          className='selectValor'
        >
          <MenuItem value={10}>25 años-35 años</MenuItem>
          <MenuItem value={20}>36 años-45 años</MenuItem>
          <MenuItem value={30}>46 años-55 años</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
