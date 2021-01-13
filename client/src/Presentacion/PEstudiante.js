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

    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,

    makeStyles,
    FormControl,
} from '@material-ui/core';

import {
    Save as SaveIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Replay as ReplayIcon,
} from '@material-ui/icons';

import Title from './utils/Title';

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

/**
 * DATATABLE COMPONENT
 * @param {*} props 
 */

const DataTable = props => {
    const { data, setState, editMode } = props;

    const onDelete = id => {
        fetch(`${URL}/${id}`, { method: "DELETE" })
            .then(_ => setState(true))
            .catch(e => console.error(e));
    }

    return (
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

/**
 * FORM COMPONENT
 * @param {*} props 
 */

const Form = props => {
    const {
        classes,
        edit = false, estudiante,
        setEstudiante, setState, setEdit,
    } = props;

    const onSubmit = event => {
        event.preventDefault();

        fetch(`${URL}/${edit ? estudiante.id : ""}`, {
            method: edit ? "PUT" : "POST",
            headers: {
                "Accept": "Application/json",
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(estudiante)
        })
            .then(async res => {
                setState(true)
                console.log(await res.json());
            })
            .catch(err => console.error(err))
    }

    const onInput = target => {
        const { name, value } = target;
        estudiante[name] = value;
        setEstudiante(estudiante);
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
                        helperText={edit ? estudiante.nombre : null}
                        onInput={e => onInput(e.target)}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        fullWidth
                        name="correo"
                        label="Correo"
                        autoComplete="given-name"
                        helperText={estudiante["correo"]}
                        onInput={e => onInput(e.target)}
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
                        onInput={e => onInput(e.target)}
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
                            onInput={event => onInput(event.target)}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="max-width">Sexo</InputLabel>
                    <FormControl fullWidth>
                        <Select
                            required={!edit}
                            name="sexo"
                            onChange={event => onInput(event.target)}
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

/**
 * AUTOR VIEW 
 * @param {*} props 
 */

export const PEstudiante = props => {
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