import {Drawer, List, ListItem, ListItemText} from "@material-ui/core";
import React from "react";
import {getControllerNames} from "../../api/controller-defs";
import {useHistory} from "react-router-dom";

const MenuList = () => {
    const controllers = getControllerNames();
    const history = useHistory();
    return (<div role="presentation">
        <List>
            {controllers.map((controller, index) => (
                <ListItem button key={controller.titulo} onClick={()=>{history.push(`/list/${controller.rota}/1`)}}>
                    <ListItemText primary={controller.titulo}/>
                </ListItem>
            ))}
        </List>
    </div>)
};

type MenuDrawerProps = { open: boolean, onClose: () => void };
const MenuDrawer = (props: MenuDrawerProps) => {
    const {open, onClose} = props;
    return (
        <Drawer anchor={"left"} variant={"temporary"} open={open} onClose={onClose}>
            <MenuList/>
        </Drawer>
    )

}

export default MenuDrawer;

