import React from "react";
import {SWAPIEndpoint} from "../../api/generic/generic-api";
import {useParams} from "react-router-dom";
import {People} from "../../api/schemas/people";
import {List} from "../list/list"
import {Film} from "../../api/schemas/films";

export interface URLParam {
    page?: string;
    controller:SWAPIEndpoint;
}
export const RoteadorLista = ()=>{
    const {controller, page} = useParams<URLParam>();
    switch (controller) {
        case "people":
            return <List<People> controller={controller} page={page} />;
        case "films":
            return <List<Film> controller={controller} page={page}/>
        default: return null;
    }

}
