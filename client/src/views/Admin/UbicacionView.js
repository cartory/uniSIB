/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';

import {
    Grid,
    Paper,
    Button,
    TextField,

    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
    Typography,

    makeStyles,
} from '@material-ui/core'

import {
    Save as SaveIcon,
    Edit as EditIcon,
    Replay as ReplayIcon,
    Delete as DeleteIcon,
} from '@material-ui/icons'

import Title from './Title';

const URL = "http://localhost:8000/api/ubicaciones";

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

const DataTable = props => {
    const { data, editMode, setState } = props;

    const onDelete = id => {
        fetch(`${URL}/${id}`, { method: "DELETE" })
            .then(_ => setState(true))
            .catch(err => console.error(err));
    }

    return (
        <Table size="small" >
            <TableHead>
                <TableRow>
                    <TableCell size="small"><strong>ID</strong></TableCell>
                    <TableCell align="center"><strong>Tipo</strong></TableCell>
                    <TableCell align="center" ><strong>Nombre</strong></TableCell>
                    <TableCell align="center"><strong>Descripción</strong></TableCell>
                    <TableCell align="center"><strong>Ubis</strong></TableCell>
                    <TableCell align="center" ><strong>Ubi</strong></TableCell>
                    <TableCell align="center" size="small"><strong>Acción</strong></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    data.map(row => (
                        <TableRow
                            id={row.id}
                            key={row.id}
                            onMouseOver={() => {
                                document
                                    .getElementById(row.id)
                                    .style.backgroundColor = "lightblue"
                            }}
                            onMouseLeave={() => {
                                document
                                    .getElementById(row.id)
                                    .style.backgroundColor = "inherit"
                            }}
                        >
                            <TableCell size="small"><strong>{row.id}</strong></TableCell>
                            <TableCell align="center" >{row.tipo}</TableCell>
                            <TableCell align="center">{row.nombre}</TableCell>
                            <TableCell align="center">{row.descripcion}</TableCell>
                            <TableCell align="center">{row.ubicaciones}</TableCell>
                            <TableCell align="center" >{row.ubicacion ?? " - "}</TableCell>
                            <TableCell align="center" size="small">
                                <Grid container direction="row">
                                    <Grid item title="edit">
                                        <a
                                            href="#" alt="#"
                                            style={{ color: "green" }}
                                            onClick={() => editMode(row)}
                                        >
                                            <EditIcon />
                                        </a>
                                    </Grid>
                                    <Grid item>
                                        <a
                                            href="#" alt="#"
                                            style={{ color: "indianred" }}
                                            onClick={() => onDelete(row.id)}
                                        >
                                            <DeleteIcon />
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

const Form = props => {
    const {
        classes,
        edit = false, ubi,
        setUbi, setState, setEdit
    } = props;

    const onSubmit = event => {
        event.preventDefault();

        fetch(`${URL}/${edit ? ubi.id : ""}`, {
            method: edit ? "PUT" : "POST",
            headers: {
                "Accept": "Application/json",
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(ubi)
        })
            .then(_ => setState(true))
            .catch(err => console.error(err))
    }

    const onInput = target => {
        const { name, value } = target;
        ubi[name] = value;
        setUbi(ubi);
    }

    return (
        <form onSubmit={onSubmit}>
            <Grid
                container
                spacing={3}
                direction="row"
                alignContent="center"
                alignItems="stretch"
            >
                <Grid item xs={12} sm={12}>
                    <TextField
                        fullWidth
                        name="nombre"
                        label="Nombre"
                        autoComplete="given-name"
                        required={!edit}
                        helperText={edit ? ubi.nombre : null}
                        onInput={e => onInput(e.target)}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        fullWidth
                        required={!edit}
                        name="nacionalidad"
                        label="Nacionalidad"
                        autoComplete="family-name"
                        helperText={edit ? ubi.tipo : null}
                        onInput={e => onInput(e.target)}
                    />
                </Grid>
                <Grid item>
                    <Button
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={edit ? { backgroundColor: "green" } : {}}
                        className={classes.button}
                        startIcon={<SaveIcon />}
                    >Guardar</Button>
                    <Button
                        type="reset"
                        variant="contained"
                        onClick={() => setEdit(false)}
                        size="large"
                        className={classes.button}
                        startIcon={< ReplayIcon />}
                    >Limpiar</Button>
                </Grid>
            </Grid>
        </form>
    );
}

export const UbicacionView = props => {
    const classes = useStyles();

    const [ubi, setUbi] = React.useState({});
    const [data, setData] = React.useState([]);

    const [edit, setEdit] = React.useState(false);
    const [state, setState] = React.useState(true);

    const editMode = row => {
        setEdit(true);
        setUbi(row);
    }

    React.useEffect(() => {
        if (state) {
            setState(false);
            fetch(URL)
                .then(async res => setData(await res.json()))
                .catch(err => console.error(err))
        }
    }, [state]);

    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom color="primary">
                <strong>GESTIONAR UBICACIÓN</strong>
            </Typography>
            <Grid
                container
                direction="row"
                spacing={5}
                alignItems="flex-start"
            >
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paper}>
                        <Title>
                            {edit ? "Editar " : "Crear "}Ubicación
                        </Title>
                        <Form
                            classes={classes}
                            edit={edit} ubi={ubi}
                            setEdit={setEdit}
                            setAutor={setUbi}
                            setState={setState}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Paper className={classes.paper}>
                        <Title>Ver Ubicaciones</Title>
                        <DataTable
                            data={data}
                            setState={setState}
                            editMode={editMode}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment >
    );
}