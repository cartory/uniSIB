/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import {
    Fab,
    Grid,
    Paper,
    Button,
    Select,
    TextField,
    Typography,
    InputLabel,
    MenuItem,
    Snackbar,
    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,

    makeStyles,
    FormControl,
} from '@material-ui/core';

import {
    Alert
} from '@material-ui/lab'

import {
    Save as SaveIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Replay as ReplayIcon,
} from '@material-ui/icons';

import Title from './utils/Title';
import { EstudianteController } from '../controllers/estudianteController'

const URL = "http://localhost:8000/api/estudiantes";

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

const controller = new EstudianteController();

const DataTable = props => {
    const [open, setOpen] = React.useState(false);
    const { data, setState, editMode } = props;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    }

    return (
        <>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell size="small" ><strong>ID</strong></TableCell>
                        <TableCell><strong>Cédula</strong></TableCell>
                        <TableCell><strong>Registro</strong></TableCell>
                        <TableCell><strong>Nombre</strong></TableCell>
                        <TableCell><strong>Correo</strong></TableCell>
                        <TableCell><strong>Sexo</strong></TableCell>
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
                                <TableCell size="small" ><strong>{row.id}</strong></TableCell>
                                <TableCell>{row.cedula}</TableCell>
                                <TableCell>{row.registro}</TableCell>
                                <TableCell>{row.nombre}</TableCell>
                                <TableCell>{row.correo}</TableCell>
                                <TableCell align="center" >
                                    <Fab
                                        disabled
                                        size="small"
                                        variant="round"
                                        style={{
                                            color: "black",
                                            backgroundColor: row.sexo ? "lightblue" : "lightpink"
                                        }}
                                    >{row.sexo ? "M" : "F"}
                                    </Fab>
                                </TableCell>
                                <TableCell align="center" size="small">
                                    <Grid container direction="row">
                                        <Grid item title="edit">
                                            <a
                                                title="edit"
                                                href="#" alt="#"
                                                style={{ color: "green" }}
                                                onClick={() => editMode(row)}
                                            >
                                                <EditIcon />
                                            </a>
                                        </Grid>
                                        <Grid item title="delete">
                                            <a
                                                title="delete"
                                                href="#" alt="#"
                                                style={{ color: "indianred" }}
                                                onClick={async () => await controller.onDelete(
                                                    row.id, [setOpen, setState]
                                                )}
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
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert
                    color="error"
                    elevation={0}
                    variant="standard"
                    onClose={handleClose}
                >
                    Eliminado Correctamente
                </Alert>
            </Snackbar>
        </>
    );
}

/**
 * FORM COMPONENT
 * @param {*} props 
 */

const Form = props => {
    const [open, setOpen] = React.useState(false);
    const {
        classes,
        edit = false, estudiante,
        setEstudiante, setState, setEdit,
    } = props;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    }

    return (
        <>
            <form onSubmit={event => {
                event.preventDefault();
                controller.onSubmit([
                    setState, setOpen
                ], estudiante, edit)
            }}>
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
                            helperText={edit ? estudiante.nombre : null}
                            onInput={e => controller.onInput(
                                e.target, estudiante, setEstudiante
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            name="correo"
                            label="Correo"
                            autoComplete="given-name"
                            helperText={estudiante["correo"]}
                            onInput={e => controller.onInput(
                                e.target, estudiante, setEstudiante
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            required={!edit}
                            name="registro"
                            type="number"
                            label="registro"
                            autoComplete="given-name"
                            helperText={estudiante["registro"]}
                            onInput={e => controller.onInput(
                                e.target, estudiante, setEstudiante
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl>
                            <TextField
                                fullWidth
                                type="number"
                                required={!edit}
                                name="cedula"
                                label="Cédula"
                                autoComplete="family-name"
                                helperText={edit ? estudiante.cedula : null}
                                onInput={event => controller.onInput(
                                    event.target, estudiante, setEstudiante
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="max-width">Sexo</InputLabel>
                        <FormControl fullWidth>
                            <Select
                                required={!edit}
                                name="sexo"
                                onChange={event => controller.onInput(
                                    event.target, estudiante, setEstudiante
                                )}
                                defaultValue=""
                            >
                                <MenuItem key={1} value={true}>M</MenuItem>
                                <MenuItem key={0} value={false}>F</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button
                            size="small"
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
                            onClick={() => {
                                setEdit(false)
                                setEstudiante({})
                            }}
                            size="small"
                            className={classes.button}
                            startIcon={< ReplayIcon />}
                        >Limpiar</Button>
                    </Grid>
                </Grid>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                >
                    <Alert
                        color={edit ? "success" : "info"}
                        elevation={0}
                        variant="standard"
                        onClose={handleClose}
                    >
                        Guardado Correctamente
                    </Alert>
                </Snackbar>
            </form>
        </>
    );
}

/**
 * AUTOR VIEW 
 * @param {*} props 
 */

export const EstudianteView = props => {
    const classes = useStyles();

    const [data, setData] = React.useState([]);
    const [estudiante, setEstudiante] = React.useState({});

    const [edit, setEdit] = React.useState(false);
    const [state, setState] = React.useState(true);


    const editMode = row => {
        setEdit(true);
        setEstudiante(row);
    }

    React.useEffect(() => {
        if (state) {
            setState(false);
            fetch(URL)
                .then(async res => setData(await res.json()))
                .catch(err => console.error(err));
        }
    }, [state])

    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom color="primary">
                <strong>GESTIONAR ESTUDIANTE</strong>
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
                            {edit ? "Editar " : "Crear "}Estudiante
                        </Title>
                        <Form
                            classes={classes}
                            edit={edit} estudiante={estudiante}
                            setEdit={setEdit}
                            setEstudiante={setEstudiante}
                            setState={setState}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Paper className={classes.paper}>
                        <Title>Ver Estudiantes</Title>
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