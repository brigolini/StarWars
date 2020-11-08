import React, {useCallback, useState} from "react";
import {AppBar, IconButton, Toolbar} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ResponsiveDrawer from "./menu-drawer";

const MenuBar = ()=>{
    const [open,setOpen] = useState(false);
    const handleCloseMenu = useCallback(()=>setOpen(false),[setOpen]);
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={()=>setOpen(prevState => !prevState)}>
                    <MenuIcon/>
                    <ResponsiveDrawer open={open} onClose={handleCloseMenu}/>
                </IconButton>
            </Toolbar>
        </AppBar>
    )

}

export default MenuBar;
