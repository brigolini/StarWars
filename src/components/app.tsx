import React from "react";
import MenuBar from "./menu/menu-bar";
import "../styles.css"
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Roteador} from "./roteador/roteador";
import TelaErro from "./erro/tela-erro";
import TelaPrincipal from "./principal/tela-principal";

export const App = () => {
    return (
        <>
            <BrowserRouter>
                <MenuBar/>
                <Switch>
                    <Route path={'/'} exact component={TelaPrincipal}/>
                    <Route path={'/list/:controller/:page'} render={() => <Roteador lista/>}/>
                    <Route path={'/detail/:controller/:id'} render={() => <Roteador lista={false}/>}/>
                    <Route path={'/erro/:motivo'} component={TelaErro}/>
                </Switch>
            </BrowserRouter>
        </>
    )

}
