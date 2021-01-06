/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import {
    Grid,
    Paper,
    Button,
    TextField,
    Typography,
    makeStyles,

    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
} from '@material-ui/core';

import {
    Save as SaveIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Replay as ReplayIcon,
} from '@material-ui/icons'

import Title from './Title'

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));

const request = async (path, config) => {
    config.headers = {
        "Accept": "Application/json",
        "Content-Type": "Application/json"
    };

    const res = await fetch(path, config);
    return await res.json();
}

const Form = props => {
    const {
        onSubmit, onInput, edit, genero, classes, setEdit
    } = props;
    return (
        <form onSubmit={onSubmit}>
            <Grid
                container
                spacing={4}
                direction="column"
                alignItems="stretch"
            >
                <Grid item xs={12} sm={12}>
                    <TextField
                        fullWidth
                        id="nombre"
                        name="nombre"
                        label="Nombre"
                        required={!edit}
                        helperText={edit ? genero.nombre : null}
                        autoComplete="given-name"
                        onInput={e => onInput(e)}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        fullWidth
                        id="descripcion"
                        name="descripcion"
                        label="Descripción"
                        helperText={edit ? genero.descripcion : null}
                        autoComplete="family-name"
                        onInput={e => onInput(e)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        size="small"
                        type="submit"
                        color="primary"
                        variant="contained"
                        className={classes.button}
                        style={edit ? { backgroundColor: "green" } : {}}
                        startIcon={<SaveIcon />}
                    >Guardar</Button>
                    <Button
                        type="reset"
                        variant="contained"
                        color="default"
                        onClick={() => setEdit(false)}
                        size="small"
                        className={classes.button}
                        startIcon={< ReplayIcon />}
                    >Limpiar</Button>
                </Grid>
            </Grid>
        </form>
    );
}

const DataTable = props => {
    const {
        data, setEdit, setGenero, onDelete
    } = props;

    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell size="small"><strong>ID</strong></TableCell>
                    <TableCell><strong>Nombre</strong></TableCell>
                    <TableCell><strong>Descripción</strong></TableCell>
                    <TableCell size="small"><strong>Acción</strong></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    data.map((row) => (
                        <TableRow
                            id={row.id}
                            key={row.id}
                            onMouseOver={() => {
                                document
                                    .getElementById(row.id)
                                    .style.backgroundColor = "#ebf5fc"
                            }}
                            onMouseLeave={() => {
                                document
                                    .getElementById(row.id)
                                    .style.backgroundColor = "inherit"
                            }}
                        >
                            <TableCell size="small"><strong>{row.id}</strong></TableCell>
                            <TableCell>{row.nombre}</TableCell>
                            <TableCell>{row.descripcion}</TableCell>
                            <TableCell align="center" size="small" >
                                <Grid container direction="row" alignItems="center">
                                    <Grid item>
                                        <a href="#" alt="#"
                                            onClick={() => {
                                                setEdit(true);
                                                setGenero(row);
                                            }}
                                            title="edit"><EditIcon style={{ color: "green" }} />
                                        </a>
                                    </Grid>
                                    <Grid item>
                                        <a
                                            href="#" alt="#"
                                            style={{ color: "indianred" }}
                                            onClick={() => onDelete(row.id)}
                                            title="delete"><DeleteIcon />
                                        </a>
                                    </Grid>
                                </Grid>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
}

export const GeneroView = () => {
    const classes = useStyles();

    const [data, setData] = React.useState([]);
    const [edit, setEdit] = React.useState(false);
    const [state, setState] = React.useState(true);
    const [genero, setGenero] = React.useState({});

    const URL = "http://localhost:8080/api/generos";

    const onSubmit = (event) => {
        event.preventDefault();

        request(`${URL}/${edit ? genero.id : ""}`, {
            method: edit ? "PUT" : "POST",
            body: JSON.stringify(genero)
        })
            .then(_ => setState(true))
            .catch(err => console.error(err));
    }

    const onInput = e => {
        let { target: { name, value } } = e;
        genero[name] = value;
        setGenero(genero);
    }

    const onDelete = id => {
        request(`${URL}/${id}`, { method: "DELETE" })
            .then(_ => setState(true))
            .catch(err => console.log(err));
    }

    React.useEffect(() => {
        if (state) {
            setState(false);
            request(URL, { method: "GET" })
                .then(data => setData(data))
                .catch(err => console.error(err));
        }
    }, [state]);

    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom color="primary">
                <strong>GESTIONAR GÉNERO</strong>
            </Typography>
            <Grid
                container
                spacing={5}
                direction="row"
                alignItems="flex-start"
            >
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paper}>
                        <Title>
                            {edit ? "Editar " : "Crear "}Género
                        </Title>
                        <Form
                            classes={classes}
                            edit={edit} genero={genero}

                            setEdit={setEdit}
                            onInput={onInput} onSubmit={onSubmit}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Paper className={classes.paper}>
                        <Title>Ver Géneros</Title>
                        <DataTable
                            data={data}
                            onDelete={onDelete}
                            setEdit={setEdit} setGenero={setGenero}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment >
    );
}