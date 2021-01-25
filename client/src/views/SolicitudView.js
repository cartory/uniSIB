/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';

import {
    Fab,
    Grid,
    Paper,
    Button,

    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
    Typography,

    Snackbar,
    Select,
    Checkbox,
    MenuItem,
    InputLabel,

    makeStyles,
    ButtonGroup,
    IconButton,
    FormControl,
    FormControlLabel,
} from '@material-ui/core'

import {
    Alert as MuiAlert
} from '@material-ui/lab'

import {
    Favorite,
    FavoriteBorder,
    Save as SaveIcon,
    Check,
    Close,
    Replay as ReplayIcon,
    HourglassEmpty,
} from '@material-ui/icons'

import Title from './utils/Title';
import { SolicitudController } from '../controllers/solicitudController';


const context = React.createContext();

const ROOT = "http://localhost:8000/api";
const URL = "http://localhost:8000/api/solicitudes";
const controller = new SolicitudController();

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

const DataTable = (props) => {
    const { data } = React.useContext(context);
    const [text, setText] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const handleClick = async (text, row) => {
        row.estado = text.split(" ")[1].toLocaleLowerCase();
        try {
            await fetch(`${URL}/estado`, {
                method: "POST",
                headers: {
                    "Accept": "Application/json",
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify(row)
            })
            setText(text);
            setOpen(true);
        } catch (error) {
            console.error(error);
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;

        setOpen(false);
    }

    const getDateDiffIndays = (date) => {
        let dateDifference = Date.now() - date;
        console.log(dateDifference);
        let differenceInDays = dateDifference / (1000 * 3600 * 24);
        return parseInt(differenceInDays);
    }

    return (
        <>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Estudiante</strong></TableCell>
                        <TableCell align="center"><strong>Registro</strong></TableCell>
                        <TableCell align="center"><strong>fechaSolicitud</strong></TableCell>
                        <TableCell align="center"><strong>Libros</strong></TableCell>
                        <TableCell align="center"><strong>Dias</strong></TableCell>
                        <TableCell align="center"><strong>Estado</strong></TableCell>
                        <TableCell align="center"><strong>OPT</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map((row) => (
                            <TableRow
                                id={row.id}
                                key={row.id}
                                onMouseOver={() => {
                                    document.getElementById(row.id)
                                        .style.backgroundColor = "#ebf5fc";
                                }}
                                onMouseLeave={() => {
                                    document.getElementById(row.id)
                                        .style.backgroundColor = "inherit";
                                }}
                            >
                                <TableCell>{row.estudiante}</TableCell>
                                <TableCell align="center">{row.registro}</TableCell>
                                <TableCell align="center">{row.fechaSolicitud.split("T")[0]}</TableCell>
                                <TableCell align="center">{row.libros}</TableCell>
                                <TableCell align="center">{
                                    row.cantidadDias - getDateDiffIndays(Date.parse(row.fechaSolicitud))
                                }</TableCell>
                                <TableCell align="center">
                                    <Fab
                                        disabled
                                        size="small"
                                        variant="extended"
                                        style={{ color: "black" }}
                                    >
                                        {row.estado}
                                    </Fab>
                                </TableCell>
                                <TableCell align="center">
                                    <ButtonGroup size="small">
                                        <IconButton
                                            color="primary"
                                            children={<HourglassEmpty />}
                                            title="pendiente"
                                            hidden
                                            onClick={() => { handleClick("Estado Pendiente", row) }}
                                        />
                                        <IconButton
                                            style={{ color: "green" }}
                                            children={<Check />}
                                            title="aceptar"
                                            onClick={() => handleClick("Estado Aceptado", row)}
                                        />
                                        <IconButton
                                            style={{ color: "darkred" }}
                                            children={<Close />}
                                            title="rechazar"
                                            onClick={() => handleClick("Estado Rechazado", row)}
                                        />
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {text}
                </Alert>
            </Snackbar>
        </>
    );
}
// 
const LibroTable = props => {
    const { libros, solicitados, setSolicitados } = React.useContext(context);

    return (
        <Table size="small" >
            <TableHead>
                <TableRow>
                    {/* <TableCell size="small"><strong>ID</strong></TableCell> */}
                    <TableCell><strong>Libro</strong></TableCell>
                    <TableCell><strong>Autor</strong></TableCell>
                    <TableCell align="center"><strong>Género</strong></TableCell>
                    <TableCell align="center"><strong>Cantidad</strong></TableCell>
                    <TableCell><strong>Add</strong></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    libros.map(row => (
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
                            <TableCell size="small"><strong>{row.titulo}</strong></TableCell>
                            <TableCell size="small"><strong>{row.autor}</strong></TableCell>
                            <TableCell size="small" align="center">
                                <Fab
                                    disabled
                                    size="small"
                                    variant="extended"
                                    style={{ color: "black" }}
                                >
                                    {row.genero}
                                </Fab>
                            </TableCell>
                            <TableCell size="small" align="center"><strong>{row.cantidad}</strong></TableCell>
                            <TableCell align="center" size="small">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="checkedH"
                                            icon={<FavoriteBorder />}
                                            checkedIcon={<Favorite />}
                                            onChange={event => {
                                                if (event.target.checked) {
                                                    if (!solicitados.includes(row.id)) {
                                                        solicitados.push(row.id)
                                                        setSolicitados(solicitados);
                                                    }
                                                } else {
                                                    let index = solicitados.indexOf(row.id);
                                                    if (index > -1) {
                                                        solicitados.splice(index, 1);
                                                        setSolicitados(solicitados);
                                                    }
                                                }
                                            }}
                                        />
                                    }
                                />
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
}

const Form = props => {
    const dias = [
        1, 7, 15, 30,
    ];

    const {
        model, setModel, edit, setEdit,
        estudiantes, classes, solicitados, setState
    } = React.useContext(context);

    return (
        <form onSubmit={async event => {
            if (solicitados.length > 0) {
                model["librosID"] = solicitados;
                await controller.onSubmit([
                    setState
                ], model, edit)
            }
        }}>
            <Grid
                container
                spacing={3}
                direction="row"
                alignContent="center"
                alignItems="stretch"
            >
                <Grid item xs={12} sm={12}>
                    <InputLabel htmlFor="max-width">Cantidad Dias</InputLabel>
                    <FormControl fullWidth>
                        <Select
                            required={!edit}
                            name="cantidadDias"
                            defaultValue={model["cantidad"] ?? ""}
                            onChange={event => controller.onInput(
                                event.target, model, setModel
                            )}
                        >
                            {dias.map(tipo => (
                                <MenuItem key={tipo} alignItems="center" value={tipo}>{tipo}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <InputLabel htmlFor="max-width">Estudiante</InputLabel>
                    <FormControl fullWidth>
                        <Select
                            required={!edit}
                            name="estudianteID"
                            defaultValue={model["estudianteID"] ?? ''}
                            onChange={event => controller.onInput(
                                event.target, model, setModel
                            )}
                        >
                            {estudiantes.map(e => (
                                <MenuItem key={e.id} alignItems="center" value={e.id}>{e.nombre}</MenuItem>
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
                            setModel({})
                            delete model.id;
                            setEdit(false);
                        }}
                        size="small"
                        className={classes.button}
                        startIcon={< ReplayIcon />}
                    >Limpiar</Button>
                </Grid>
            </Grid>
        </form>
    );
}

export const SolicitudView = props => {
    const classes = useStyles();

    const [edit, setEdit] = React.useState(false);
    const [state, setState] = React.useState(true);

    const [data, setData] = React.useState([]);
    const [libros, setLibros] = React.useState([]);
    const [solicitados, setSolicitados] = React.useState([]);
    const [model, setModel] = React.useState({});
    const [estudiantes, setEstudiantes] = React.useState([]);

    React.useEffect(() => {
        fetch(`${ROOT}/libros`)
            .then(async res => setLibros(await res.json()))
            .catch(err => console.error(err));

        fetch(`${ROOT}/estudiantes`)
            .then(async res => setEstudiantes(await res.json()))
            .catch(err => console.error(err));
    }, []);

    React.useEffect(() => {
        if (state) {
            fetch(URL)
                .then(async res => {
                    const json = await res.json();
                    setData(json);
                })
                .catch(err => console.error(err))
        }
    }, [state]);

    return (
        <context.Provider value={{
            classes: useStyles(),
            edit, data, libros, estudiantes, model, solicitados,
            setEdit, setData, setLibros, setEstudiantes, setState, setModel, setSolicitados
        }}
        >
            <React.Fragment>
                <Typography variant="h4" gutterBottom color="primary">
                    <strong>SOLICITAR PRÉSTAMO</strong>
                </Typography>
                <Grid
                    container
                    direction="row"
                    spacing={5}
                    justify="center"
                    alignItems="stretch"
                >
                    <Grid item xs={12} sm={5}>
                        <Paper className={classes.paper}>
                            <Title>
                                {edit ? "Editar " : "Crear "}Solicitud
                        </Title>
                            <Form />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Paper className={classes.paper}>
                            <Title>Libros Disponibles</Title>
                            <LibroTable />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Paper className={classes.paper}>
                            <Title>Ver solicitudes</Title>
                            <DataTable />
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment >
        </context.Provider>
    );
}