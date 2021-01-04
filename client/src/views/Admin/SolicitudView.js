import React from 'react';

import {
    Link,
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
    makeStyles,
} from '@material-ui/core';

import Title from './Title';

const url = "http://localhost:8000/api/solicitudes";

//const preventDefault = event => event.preventDefault();

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

const fetchData = async () => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

const DataTable = (props) => {
    const { rows } = props;
    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>Registro</TableCell>
                    <TableCell>Estudiante</TableCell>
                    <TableCell>fechaSolicitud</TableCell>
                    <TableCell>NombreLibro</TableCell>
                    <TableCell>ImagenLibro</TableCell>
                    <TableCell>CantidadDias</TableCell>
                    <TableCell>Estado Solicitud</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    rows.map((row) => (
                        <TableRow key={`${row.libroID}${row.solicitudID}`}>
                            <TableCell>{row.registro}</TableCell>
                            <TableCell>{row.nombre}</TableCell>
                            <TableCell>{row.fechaSolicitud}</TableCell>
                            <TableCell>{row.nombreLibro}</TableCell>
                            <TableCell>{row.ImagenLibro}</TableCell>
                            <TableCell>{row.cantidadDias}</TableCell>
                            <TableCell>{row.estado}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
}

export const SolicitudView = () => {
    const classes = useStyles();
    const [data, setData] = React.useState([]);
    const [reload, setReload] = React.useState(false);

    React.useEffect(() => {
        if (reload) {
            setReload(false);
            fetchData()
                .then(data => setData(data))
                .catch(err => console.error(err));
        }
    }, [reload]);

    return (
        <React.Fragment>
            <Title>Ver Solicitudes</Title>
            <DataTable rows={data} />
            <div className={classes.seeMore}>
                <Link color="primary" href="#" onClick={() => setReload(true)}>
                    See more orders
                </Link>
            </div>
        </React.Fragment>
    );
}