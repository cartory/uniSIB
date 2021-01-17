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

import { Alert } from '@material-ui/lab'
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers'

import DateFnsUtils from '@date-io/date-fns'

import {
    Save as SaveIcon,
    Edit as EditIcon,
    Remove as RemoveIcon,
    Replay as ReplayIcon,
    Delete as DeleteIcon,
} from '@material-ui/icons'

import Title from './utils/Title';

const URL = "http://localhost:8000/api/libros";
const ROOT = "http://localhost:8000/api";

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
    const [open, setOpen] = React.useState(false);
    const { data, editMode, setState } = props;

    const onDelete = async id => {
        try {
            await fetch(`${URL}/${id}`, { method: "DELETE" });
            setState(true);
            setOpen(true);
        } catch (error) {
            console.error(error);
        }
    }

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
                        <TableCell><strong>Título</strong></TableCell>
                        <TableCell><strong>Sinopsis</strong></TableCell>
                        <TableCell><strong>Publicación</strong></TableCell>
                        <TableCell align="center"><strong>Cantidad</strong></TableCell>
                        <TableCell align="center"><strong>Género</strong></TableCell>
                        <TableCell align="center"><strong>Autor</strong></TableCell>
                        <TableCell align="center"><strong>Ubi</strong></TableCell>
                        <TableCell size="small" align="center"><strong>Acción</strong></TableCell>
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
                                <TableCell>{row.titulo}</TableCell>
                                <TableCell>{row.sinopsis}</TableCell>
                                <TableCell>{row.fechaPublicacion.split("T")[0]}</TableCell>
                                <TableCell align="center">{
                                    <Fab
                                        disabled
                                        size="small"
                                        variant="extended"
                                        style={{
                                            color: "black"
                                        }}
                                    >{row.cantidad ?? <RemoveIcon />}
                                    </Fab>
                                }
                                </TableCell>
                                <TableCell align="center">{row.genero}</TableCell>
                                <TableCell align="center">{row.autor}</TableCell>
                                <TableCell align="center">{row.ubi}</TableCell>
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
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert
                    color="warning"
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

const Form = props => {
    const [open, setOpen] = React.useState(false);
    const [ubis, setUbis] = React.useState([]);
    const [autores, setAutores] = React.useState([]);
    const [generos, setGeneros] = React.useState([]);

    const [selectedDate, setSelectedDate] = React.useState(new Date());

    React.useEffect(() => {
        fetch(`${ROOT}/ubicaciones`)
            .then(async res => setUbis(await res.json()))
            .catch(err => console.error(err));

        fetch(`${ROOT}/autores`)
            .then(async res => setAutores(await res.json()))
            .catch(err => console.error(err));

        fetch(`${ROOT}/generos`)
            .then(async res => setGeneros(await res.json()))
            .catch(err => console.error(err));
    }, []);

    const {
        classes,
        edit = false, ubi,
        setUbi, setState, setEdit
    } = props;

    const onSubmit = async event => {
        event.preventDefault();
        try {
            fetch(`${URL}/${edit ? ubi.id : ""}`, {
                method: edit ? "PUT" : "POST",
                headers: {
                    "Accept": "Application/json",
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify(ubi)
            });
            setState(true);
            setOpen(true);
        } catch (error) {
            console.error(error);
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    }

    const onInput = target => {
        const { name, value } = target;
        ubi[name] = value;
        setUbi(ubi);
        console.log(ubi);
    }

    return (
        <>
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
                            required={!edit}
                            name="titulo"
                            label="Titulo"
                            autoComplete="given-name"
                            helperText={ubi["titulo"]}
                            onInput={e => onInput(e.target)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="max-width">Publicación</InputLabel>
                        <FormControl fullWidth>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    required
                                    disableToolbar

                                    variant="inline"
                                    format="yyyy/MM/dd"
                                    name="fechaPublicacion"
                                    value={selectedDate}
                                    onChange={date => {
                                        setSelectedDate(selectedDate);
                                        ubi["fechaPublicacion"] = date.toISOString().split("T")[0];
                                    }}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="max-width">Cantidad</InputLabel>
                        <FormControl fullWidth>
                            <TextField
                                fullWidth
                                type="number"
                                name="cantidad"
                                required={!edit}
                                autoComplete="given-name"
                                helperText={ubi["cantidad"]}
                                onInput={e => onInput(e.target)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="max-width">Género</InputLabel>
                        <FormControl fullWidth>
                            <Select
                                required={!edit}
                                fullWidth
                                name="generoID"
                                defaultValue={ubi["generoID"] ?? ""}
                                onChange={event => onInput(event.target)}
                            >
                                {generos.map(genero => (
                                    <MenuItem key={genero.id} alignItems="center" value={genero.id}>{genero.nombre}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="max-width">Ubicación</InputLabel>
                        <FormControl fullWidth>
                            <Select
                                required={!edit}
                                fullWidth
                                name="ubicacionID"
                                defaultValue={ubi["ubicacionID"] ?? ""}
                                onChange={event => onInput(event.target)}
                            >
                                {ubis.map(ubi => (
                                    <MenuItem key={ubi.id} alignItems="center" value={ubi.id}>{ubi.nombre}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <InputLabel htmlFor="max-width">Autor</InputLabel>
                        <FormControl fullWidth>
                            <Select
                                required={!edit}
                                fullWidth
                                name="autorID"
                                defaultValue={ubi["autorID"] ?? ''}
                                onChange={event => onInput(event.target)}
                            >
                                {autores.map(e => (
                                    <MenuItem key={e.id} alignItems="center" value={e.id}>{e.nombre}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            multiline
                            margin="none"
                            name="sinopsis"
                            label="Sinopsis"
                            autoComplete="family-name"
                            helperText={ubi["sinopsis"]}
                            onInput={e => onInput(e.target)}
                        />
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
                                delete ubi.id
                                setEdit(false)
                            }}
                            size="small"
                            className={classes.button}
                            startIcon={< ReplayIcon />}
                        >Limpiar</Button>
                    </Grid>
                </Grid>
            </form>
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
        </>
    );
}

export const PLibro = props => {
    const classes = useStyles();

    const [libro, setLibro] = React.useState({});
    const [data, setData] = React.useState([]);

    const [edit, setEdit] = React.useState(false);
    const [state, setState] = React.useState(true);

    const editMode = row => {
        setEdit(true);
        let date = row["fechaPublicacion"];
        row["fechaPublicacion"] = date.split("T")[0];
        setLibro(row);
        console.log(row);
    }

    React.useEffect(() => {
        if (state) {
            setLibro({});
            setState(false);
            fetch(URL)
                .then(async res => setData(await res.json()))
                .catch(err => console.error(err));
        }
    }, [state]);

    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom color="primary">
                <strong>GESTIONAR LIBRO</strong>
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
                            {edit ? "Editar " : "Crear "}Libro
                        </Title>
                        <Form
                            classes={classes}
                            edit={edit} ubi={libro}
                            setUbi={setLibro}
                            setEdit={setEdit}
                            setState={setState}
                            ubis={data.filter(row => libro.id !== row.id)}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Paper className={classes.paper}>
                        <Title>Ver Libros</Title>
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