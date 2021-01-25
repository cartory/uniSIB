/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';

import {
    Fab,
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
    Snackbar,

    Select,
    MenuItem,
    InputLabel,

    makeStyles,
    FormControl,
} from '@material-ui/core'

import {
    Save as SaveIcon,
    Edit as EditIcon,
    Remove as RemoveIcon,
    Replay as ReplayIcon,
    Delete as DeleteIcon,
} from '@material-ui/icons'

import {
    Alert as MuiAlert
} from '@material-ui/lab'

import Title from './utils/Title';
import { GeneroController } from '../controllers/generoController'

const URL = "http://localhost:8000/api/generos";
const controller = new GeneroController();

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

const Alert = props => {
    return (
        <MuiAlert
            color="info"
            elevation={0} variant="standard" {...props}
        />
    );
}

const DataTable = props => {
    const [open, setOpen] = React.useState("");
    const { data, editMode, setState } = props;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;

        setOpen(false);
    }

    return (
        <>
            <Table size="small" >
                <TableHead>
                    <TableRow>
                        <TableCell size="small"><strong>ID</strong></TableCell>
                        <TableCell><strong>Nombre</strong></TableCell>
                        <TableCell><strong>Descripción</strong></TableCell>
                        <TableCell align="center"><strong>SGénero</strong></TableCell>
                        <TableCell align="center"><strong>SubGéneros</strong></TableCell>
                        <TableCell size="small"><strong>Acción</strong></TableCell>
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
                                <TableCell align="center">
                                    <Fab
                                        disabled
                                        size="small"
                                        variant="extended"
                                        style={{
                                            color: "black"
                                        }}
                                    >
                                        {row.genero ?? <RemoveIcon />}
                                    </Fab>
                                </TableCell>
                                <TableCell align="center">
                                    <Fab
                                        disabled
                                        size="small"
                                        variant="extended"
                                        style={{
                                            color: "black"
                                        }}
                                    >
                                        {row.generos}
                                    </Fab>
                                </TableCell>
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
                                                onClick={() => controller.onDelete(row.id, [
                                                    setOpen, setState
                                                ])}
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
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" color="error">
                    {"Eliminado Correctamente"}
                </Alert>
            </Snackbar>
        </>
    );
}

const Form = props => {
    const [open, setOpen] = React.useState(false);
    const {
        classes,
        edit = false, genero, generos,
        setGenero, setState, setEdit
    } = props;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;

        setOpen(false);
    }

    return (
        <>
            <form onSubmit={event => {
                event.preventDefault();
                controller.onSubmit([setOpen, setState], genero, edit)
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
                            required={!edit}
                            name="nombre"
                            label="Nombre"
                            autoComplete="given-name"
                            helperText={genero["nombre"]}
                            onInput={e => controller.onInput(
                                e.target, genero, setGenero
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            multiline
                            name="descripcion"
                            label="Descripción"
                            autoComplete="family-name"
                            helperText={genero["descripcion"]}
                            onInput={e => controller.onInput(
                                e.target, genero, setGenero
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="max-width">SubGénero</InputLabel>
                        <FormControl fullWidth>
                            <Select
                                fullWidth
                                name="generoID"
                                defaultValue={genero["generoID"] ?? "0"}
                                onChange={event => controller.onInput(
                                    event.target, genero, setGenero
                                )}
                            >
                                <MenuItem key={0} value={0}>Ninguna</MenuItem>
                                {generos.map(genero => (
                                    <MenuItem key={genero.id} value={genero.id}>{genero.nombre}</MenuItem>
                                ))}
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
                                setGenero({})
                                setEdit(false)
                            }}
                            size="small"
                            className={classes.button}
                            startIcon={< ReplayIcon />}
                        >Limpiar</Button>
                    </Grid>
                </Grid>
            </form>
            <Snackbar open={open} autoHideDuration={3000} onClose={(event, reason) => {
                if (reason === 'clickaway') return;
                setOpen(false);
            }}>
                <Alert onClose={handleClose} severity="success" color={edit ? "success" : "info"}>
                    {"Guardado Correctamente"}
                </Alert>
            </Snackbar>
        </>
    );
}

export const GeneroView = props => {
    const classes = useStyles();

    const [genero, setGenero] = React.useState({});
    const [data, setData] = React.useState([]);

    const [edit, setEdit] = React.useState(false);
    const [state, setState] = React.useState(true);

    const editMode = row => {
        setEdit(true);
        setGenero(row);
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
                <strong>GESTIONAR GÉNERO</strong>
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
                            {edit ? "Editar " : "Crear "}Género
                        </Title>
                        <Form
                            classes={classes}
                            edit={edit} genero={genero}
                            setGenero={setGenero}
                            setEdit={setEdit}
                            setState={setState}
                            generos={data.filter(row => genero.id !== row.id)}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Paper className={classes.paper}>
                        <Title>Ver Género</Title>
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