import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import CardNoticia from './CardNoticia';
import axios from "axios";
import "../css/styleNavBar.css";
import configData from "../config/config.json";

const Noticias = () => {

    const NOTICIAS_URL = configData.NOTICIAS_API_URL || "http://127.0.0.1:8000/api/noticias";
    const [noticias, setNoticias] = useState([]);

    const getNoticias = async () => {
        await axios.get(NOTICIAS_URL)
            .then(response => {
                setNoticias(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getNoticias();
    }, [])

    return (
        <div className='contentNoticias'>
            <br></br>
            <br></br>
            <Typography variant="h3"
                align='center'
                color="#ffff"
                sx={{
                    input: { color: 'white' }
                }}>
                Noticias & Eventos
            </Typography>
            <br></br>

            <Grid

                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={3}>

                {Array.from(noticias).map(({ Cod_Noticia, Fecha, Imagen, Titulo, Descripcion, Link }) => (

                    <Grid key={Cod_Noticia} item xs={4}>
                        <CardNoticia codigo={Cod_Noticia} fecha={Fecha} imagen={Imagen} titulo={Titulo} descripcion={Descripcion} link={Link} />
                    </Grid>

                ))}

            </Grid>

            <br></br>
        </div>



    );

}

export default Noticias;
