import React, {useCallback, useEffect, useState} from "react";
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ResponsiveDrawer from "./menu-drawer";
import {useLocation} from "react-router-dom";
import {URLParam} from "../roteador/roteador";
import {getControllerNames} from "../../api/controller-defs";

const MenuBar = () => {
    const [open, setOpen] = useState(false);
    const [titulo, setTitulo] = useState('');
    const location = useLocation<URLParam>();
    const handleCloseMenu = useCallback(() => setOpen(false), [setOpen]);

    useEffect(() => {
        let pathName = location.pathname;
        const tipo = pathName.indexOf('detail')>=0?'Detalhes':pathName.indexOf('list')>=0?'Listagem':'';
        const tela = getControllerNames().find(controller =>pathName.indexOf(controller.rota)>=0);
        if (location)
            setTitulo(`${tipo} ${tela?tela.titulo:''}`);
    }, [location])
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu"
                            onClick={() => setOpen(prevState => !prevState)}>
                    <MenuIcon/>
                    <ResponsiveDrawer open={open} onClose={handleCloseMenu}/>
                </IconButton>
                <Typography variant="h6">
                    {titulo}
                </Typography>
            </Toolbar>

        </AppBar>
    )

}

export default MenuBar;
