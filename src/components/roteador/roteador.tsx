import React from "react";
import {SWAPIEndpoint} from "../../api/generic/generic-api";
import {useParams} from "react-router-dom";
import {People} from "../../api/schemas/people";
import {Lista} from "../lista/lista"
import Detalhe from "../detalhe/detalhe";
import {useHistory} from "react-router-dom";
import {Film} from "../../api/schemas/films";
import {Vehicle} from "../../api/schemas/vehicle";
import {Planet} from "../../api/schemas/planet";
import {Specie} from "../../api/schemas/specie";
import {Starship} from "../../api/schemas/starship";
import TelaErro from "../erro/tela-erro";



export interface URLParam {
    page?: string;
    controller:SWAPIEndpoint;
    id?:string;
}
export const Roteador = (props:{lista:boolean})=>{
    const {controller, page,id} = useParams<URLParam>();
    const {lista} = props;
    const pageNumber = page?parseInt(page):0;
    const idNumber = id?parseInt(id):0;
    const history = useHistory();
    switch (controller) {
        case "people":
            return lista?<Lista<People> controller={controller} page={pageNumber} />:<Detalhe controller={controller} id={idNumber}/>;
        case "films":
            return lista?<Lista<Film> controller={controller} page={pageNumber}/>:<Detalhe controller={controller} id={idNumber}/>
        case "vehicles":
            return lista?<Lista<Vehicle> page={pageNumber} controller={controller}/>:<Detalhe controller={controller} id={idNumber}/>
        case "planets":
            return lista?<Lista<Planet> page={pageNumber} controller={controller}/>:<Detalhe controller={controller} id={idNumber}/>
        case "species":
            return lista?<Lista<Specie> page={pageNumber} controller={controller}/>:<Detalhe controller={controller} id={idNumber}/>
        case "starships":
            return lista?<Lista<Starship> page={pageNumber} controller={controller}/>:<Detalhe controller={controller} id={idNumber}/>
        default: {
            history.push('/erro/Rota não encontrada')
            return <TelaErro/>
        }

    }
}
