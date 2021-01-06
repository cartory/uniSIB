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

    Select,
    MenuItem,
    InputLabel,

    makeStyles,
} from '@material-ui/core'

import {
    Save as SaveIcon,
    Edit as EditIcon,
    Remove as RemoveIcon,
    Replay as ReplayIcon,
    Delete as DeleteIcon,
} from '@material-ui/icons'

import Title from './Title';

const URL = "http://localhost:8080/api/ubicaciones";

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
                    <TableCell><strong>Tipo</strong></TableCell>
                    <TableCell><strong>Nombre</strong></TableCell>
                    <TableCell><strong>Descripción</strong></TableCell>
                    <TableCell><strong>Ubi</strong></TableCell>
                    <TableCell align="center"><strong>Ubis</strong></TableCell>
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
                            <TableCell>
                                <Fab
                                    disabled
                                    size="small"
                                    variant="contained"
                                    style={{
                                    }}
                                >{row.tipo}
                                </Fab>
                            </TableCell>
                            <TableCell>{row.nombre}</TableCell>
                            <TableCell>{row.descripcion}</TableCell>
                            <TableCell>{
                                <Fab
                                    disabled
                                    size="small"
                                    variant="contained"
                                    style={{
                                    }}
                                >{row.ubicacion ?? <RemoveIcon />}
                                </Fab>
                            }
                            </TableCell>
                            <TableCell align="center">{row.ubicaciones}</TableCell>
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
        edit = false, ubi, ubis,
        setUbi, setState, setEdit
    } = props;

    const tipos = [
        "Universidad", "Facultad", "Sección", "Librero", "Estante"
    ];

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
                        required={!edit}
                        name="nombre"
                        label="Nombre"
                        autoComplete="given-name"
                        helperText={edit ? ubi.nombre : null}
                        onInput={e => onInput(e.target)}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        fullWidth
                        name="descripcion"
                        label="Descripción"
                        autoComplete="family-name"
                        helperText={edit ? ubi.tipo : null}
                        onInput={e => onInput(e.target)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="max-width">Tipo Ubicación</InputLabel>
                    <Select
                        required
                        fullWidth
                        name="tipo"
                        defaultValue=''
                        onChange={event => onInput(event.target)}
                    >
                        {tipos.map(tipo => (
                            <MenuItem key={tipo} alignItems="center" value={tipo}>{tipo}</MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="max-width">Pertenece a</InputLabel>
                    <Select
                        fullWidth
                        name="ubicacionID"
                        defaultValue={ubi["id"] ?? ''}
                        onChange={event => onInput(event.target)}
                    >
                        <MenuItem key={0} value={0}>Ninguna</MenuItem>
                        {ubis.map(ubi => (
                            <MenuItem key={ubi.id} value={ubi.id}>{ubi.nombre}</MenuItem>
                        ))}
                    </Select>
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
                            setUbi={setUbi}
                            setEdit={setEdit}
                            setAutor={setUbi}
                            setState={setState}
                            ubis={data.filter(row => ubi.id !== row.id)}
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