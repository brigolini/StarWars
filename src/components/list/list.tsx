import React from "react";
import {ColDef, DataGrid, ObjectWithId, PageChangeParams, RowParams} from '@material-ui/data-grid';
import {useList} from "./use-list";
import {useHistory} from "react-router-dom";
import {getColumnData} from "./controller-defs";
import {URLParam} from "../roteador/roteador-lista";

export function List <T extends ObjectWithId>(props:URLParam) {
    const {page,controller} = props;
    const history = useHistory();
    let columnData = getColumnData(controller);
    const {data, isLoading, pageData} = useList<T>(page,controller);
    if (!columnData) return null;
    const columns: ColDef[] = columnData;
    const handlePageChange = (param: PageChangeParams) => {
        history.push(`/list/${controller}/${param.page}`);
    };
    if (!page) return null;
    const paginaAtual = parseInt(page);
    if (!data) return null;

    const handleRowClick = (param: RowParams) => {
        
    };

    return (
        <DataGrid autoHeight rows={data} rowCount={pageData?.totalRegistros} loading={isLoading} columns={columns}
                  page={paginaAtual} autoPageSize onRowClick={handleRowClick} onPageChange={handlePageChange} paginationMode={'server'}/>
    );

}
