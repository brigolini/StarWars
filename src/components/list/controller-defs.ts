import {ColDef} from "@material-ui/data-grid";
import {SWAPIEndpoint} from "../../api/generic/generic-api";

type MenuDefs = {titulo:string,rota:SWAPIEndpoint};

interface ControllerDefs {
    columnData: ColDef[],
    menu: MenuDefs;
}
const controllerData: Map<string, ControllerDefs> = new Map();
controllerData.set('people', {
    columnData: [
        {field: 'name', headerName: 'Nome', width: 170},
        {field: 'mass', headerName: 'Massa', width: 90},
        {field: 'hair_color', headerName: 'Cor do Cabelo', width: 170},
        {field: 'skin_color', headerName: 'Cor da Pele', width: 170},
        {field: 'eye_color', headerName: 'Cor do Olho', width: 170},
        {field: 'gender', headerName: 'Sexo', width: 150},
    ],
    menu: {titulo:'Pessoas',rota:'people'}
})

controllerData.set("films", {
    columnData: [
        {field: 'title', headerName: 'Título', width: 170},
        {field: 'director', headerName: 'Diretor', width: 170},
        {field: 'hair_color', headerName: 'Produtor', width: 170},
    ],
    menu: {titulo:'Filmes',rota:'films'}
})


export const getColumnData = (controller: SWAPIEndpoint): ColDef[] | null => {
    let coluna = controllerData.get(controller);
    if (!coluna) return null;
    return coluna.columnData;
}

export const getControllerNames = (): MenuDefs[] => {

    const data = controllerData;
    let controllers: any = [];
    data.forEach(controller => {
        controllers = [...controllers, controller.menu]
    })
    return controllers;
}

