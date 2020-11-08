import React from "react";
import MenuBar from "./menu/menu-bar";
import "../styles.css"
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {RoteadorLista} from "./roteador/roteador-lista";

export const App = () => {
    return (
        <>
                <BrowserRouter>
                    <MenuBar/>
                    <Switch>
                        <Route path={'/list/:controller/:page'} render={()=><RoteadorLista/>} />
                        <Route path={'/detail/:idController/:idItem'}/>
                    </Switch>
                </BrowserRouter>
        </>
    )

}
