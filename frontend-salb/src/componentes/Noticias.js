import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import CardNoticia from './CardNoticia';
import axios from "axios";

const Noticias = () => {

    const baseUrl = "http://127.0.0.1:8000/api/noticias";
    const [noticias, setNoticias] = useState([]);

    const getNoticias = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setNoticias(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        getNoticias();
    }, [])

    return (
        <div>
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
