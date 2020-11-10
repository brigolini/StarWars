import React, {useCallback, useEffect, useState} from "react";
import {AppBar, Breadcrumbs, IconButton, Link, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ResponsiveDrawer from "./menu-drawer";
import {useLocation} from "react-router-dom";
import {URLParam} from "../roteador/roteador";
import {getControllerNames, MenuDefs} from "../../api/controller-defs";

type TiposTelaType = 'Detalhes' | 'Listagem' | '';
const MenuBar = () => {
    const [open, setOpen] = useState(false);
    const [tela, setTela] = useState<MenuDefs | undefined>();
    const [tipo, setTipo] = useState<TiposTelaType>('');
    const location = useLocation<URLParam>();
    const handleCloseMenu = useCallback(() => setOpen(false), [setOpen]);

    useEffect(() => {
        if (location) {
            let pathName = location.pathname;
            setTipo(pathName.indexOf('detail') >= 0 ? 'Detalhes' : pathName.indexOf('list') >= 0 ? 'Listagem' : '');
            setTela(getControllerNames().find(controller => pathName.indexOf(controller.rota) >= 0));
        }
    }, [location])
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu"
                            onClick={() => setOpen(prevState => !prevState)}>
                    <MenuIcon/>
                    <ResponsiveDrawer open={open} onClose={handleCloseMenu}/>
                </IconButton>
                <Breadcrumbs className={'breadCrumb'}>
                    <Typography variant="h6" className={'breadCrumb'}>
                        <Link color="inherit" href="/">
                            Inicio
                        </Link>
                    </Typography>
                    <Typography variant="h6" className={'breadCrumb'}>
                        {tipo} {tela ? tela.titulo : ""}
                    </Typography>

                </Breadcrumbs>
            </Toolbar>

        </AppBar>
    )

}

export default MenuBar;
