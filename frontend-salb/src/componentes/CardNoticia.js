import PropTypes from "prop-types";
//import { Container, Card, Form, Row, Col, Modal, Image } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
//import dateFormat, { masks } from "dateformat";
//import TextTruncate from 'react-text-truncate';
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import './../comunidad/Publicacion.css';

import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';


function CardNoticia({ codigo, fecha, imagen, titulo, descripcion, link }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const theme = useTheme();

    return (
        <Card sx={{ display: 'flex' }}>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {titulo}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {descripcion}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 1 }}>
                    <QueryBuilderRoundedIcon>
                    </QueryBuilderRoundedIcon>
                    {fecha}
                </Box>
            </Box>
            <CardMedia
                component="img"
                display="flex"
                sx={{ width: 200, height: 128 }}
                image="https://i.blogs.es/0c7fe5/1366_2000/500_333.jpg"

            />
        </Card>
    );
}

CardNoticia.propTypes = {
    codigo: PropTypes.string.isRequired,
    fecha: PropTypes.string,
    imagen: PropTypes.string,
    titulo: PropTypes.string,
    descripcion: PropTypes.string,
    link: PropTypes.string,
};

export default CardNoticia;