import clsx from 'clsx';
import React from 'react';

import { AutorView } from './AutorView';
import { GeneroView } from './GeneroView';
import { SolicitudView } from './SolicitudView';
import { UbicacionView } from './UbicacionView';

import { useStyles } from './styles'

import {
    CssBaseline,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Container,
    // Link,
    ListItem,
    ListItemText,
    ListItemIcon,
} from '@material-ui/core'

import {
    Dashboard as DashboardIcon,
    ShoppingCart as ShoppingCartIcon,
    People as PeopleIcon,
    BarChart as BarChartIcon,
    Layers as LayersIcon,
    Menu as MenuIcon,
    ChevronLeft as ChevronLeftIcon,
    VerifiedUserSharp as VerifiedUserSharpIcon
} from '@material-ui/icons'

// function Copyright() {
//     return (
//         <Typography variant="body2" color="textSecondary" align="center">
//             {'Copyright © '}
//             <Link color="inherit" href="https://material-ui.com/">
//                 Your Website
//       </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

const MyAppBar = (props) => {
    const { open, classes, handleDrawerOpen } = props;
    return (
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    UNISIB - Admin
          </Typography>
                <IconButton color="inherit">
                    <Typography
                        component="h1"
                        variant="h6"
                    >
                        Cari
                    </Typography>
                    <Divider />
                    <VerifiedUserSharpIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

const IconItem = props => {
    const { icon, title, setChild, child } = props;
    return (
        <ListItem button onClick={() => setChild(child)}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={title} />
        </ListItem>
    );
}

const MenuList = props => {
    const { setChild } = props;
    return (
        <div>
            <IconItem
                title="Inicio"
                icon={<DashboardIcon />}
                setChild={setChild}
                child={<SolicitudView />}
            />
            <IconItem
                icon={<ShoppingCartIcon />}
                title="Solicitudes"
                setChild={setChild}
                child={(<SolicitudView />)}
            />
            <IconItem
                title="Autores"
                icon={<PeopleIcon />}
                setChild={setChild}
                child={<AutorView />}
            />
            <IconItem
                title="Generos"
                icon={<BarChartIcon />}
                setChild={setChild}
                child={<GeneroView />}
            />
            <IconItem
                title="Ubicaciones"
                icon={<LayersIcon />}
                child={<UbicacionView />}
                setChild={setChild}
            />
        </div>
    );
}

const SideBar = (props) => {
    const { open, classes, handleDrawerClose, setChild } = props;
    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
        >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                <MenuList setChild={setChild} />
            </List>
            <Divider />
        </Drawer>
    );
};

const Content = (props) => {
    const { classes, child } = props;
    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                {child}
            </Container>
        </main>
    );
}

export default function Dashboard() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const [open, setOpen] = React.useState(false);
    const [child, setChild] = React.useState(<AutorView />);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <MyAppBar
                open={open}
                handleDrawerOpen={handleDrawerOpen}
                classes={classes}
            />
            {/** */}
            <SideBar
                open={open}
                classes={classes}
                handleDrawerClose={handleDrawerClose}
                setChild={setChild}
            />
            {/** */}
            <Content
                child={child}
                classes={classes}
                fixedHeightPaper={fixedHeightPaper}
            />
        </div>
    );
}