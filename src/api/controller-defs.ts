import {ColDef} from "@material-ui/data-grid";
import {SWAPIEndpoint} from "./generic/generic-api";

type MenuDefs = {titulo:string,rota:SWAPIEndpoint};

interface ControllerDefs {
    columnData: ColDef[],
    detailData:string[],
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
    detailData:['name','mass','hair_color','skin_color','eye_color','gender'],
    menu: {titulo:'Pessoas',rota:'people'}
})

controllerData.set("films", {
    columnData: [
        {field: 'title', headerName: 'Título', width: 170},
        {field: 'director', headerName: 'Diretor', width: 170},
        {field: 'producer', headerName: 'Produtor', width: 170},
    ],
    detailData:['title','director','producer','opening_crawl'],
    menu: {titulo:'Filmes',rota:'films'}
})

controllerData.set("vehicles", {
    columnData: [
        {field: 'name', headerName: 'Nome', width: 170},
        {field: 'model', headerName: 'Modelo', width: 170},
        {field: 'manufacturer', headerName: 'Manufatura', width: 170},
    ],
    detailData:['name','model','manufacturer','consumables'],
    menu: {titulo:'Veículos',rota:'vehicles'}
})

controllerData.set("starships", {
    columnData: [
        {field: 'name', headerName: 'Nome', width: 170},
        {field: 'model', headerName: 'Modelo', width: 170},
        {field: 'manufacturer', headerName: 'Manufatura', width: 170},
    ],
    detailData:['name','model','manufacturer','consumables','hyperdrive_rating'],
    menu: {titulo:'Espaçonaves',rota:'starships'}
})

controllerData.set("species", {
    columnData: [
        {field: 'name', headerName: 'Nome', width: 170},
        {field: 'classification', headerName: 'Classificação', width: 170},
        {field: 'designation', headerName: 'Designação', width: 170},
    ],
    detailData:['name','classification','designation','verage_lifespan','eye_colors'],
    menu: {titulo:'Espécies',rota:'species'}
})

controllerData.set("planets", {
    columnData: [
        {field: 'name', headerName: 'Nome', width: 170},
        {field: 'rotation_period', headerName: 'Período de Rotaçao', width: 170},
        {field: 'orbital_period', headerName: 'Período de Órbita', width: 170},
    ],
    detailData:['name','rotation_period','orbital_period','gravity','climate'],
    menu: {titulo:'Planetas',rota:'planets'}
})


export const getColumnData = (controller: SWAPIEndpoint): ColDef[] | null => {
    let coluna = controllerData.get(controller);
    if (!coluna) return null;
    return coluna.columnData;
}

export const getDetailData = (controller: SWAPIEndpoint): string[] | null => {
    let coluna = controllerData.get(controller);
    if (!coluna) return null;
    return coluna.detailData;
}

export const getControllerNames = (): MenuDefs[] => {

    const data = controllerData;
    let controllers: any = [];
    data.forEach(controller => {
        controllers = [...controllers, controller.menu]
    })
    return controllers;
}

