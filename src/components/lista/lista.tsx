import React, {useMemo, useState} from "react";
import {ColDef, DataGrid, PageChangeParams, RowParams} from '@material-ui/data-grid';
import {useLista} from "./use-lista";
import {useHistory} from "react-router-dom";
import {getColumnData} from "../../api/controller-defs";
import {SWAPIEndpoint} from "../../api/generic/generic-api";
import {GenericSchema} from "../../api/schemas/generic-schema";
import Busca from "../busca/busca";
import {Grid, useMediaQuery} from "@material-ui/core";
import TelaErro from "../erro/tela-erro";
import { useTheme } from '@material-ui/core/styles';


export interface ListaProps {
    page: number;
    controller: SWAPIEndpoint;
}

export const Lista = <T extends GenericSchema>(props: ListaProps)=> {
    const {page, controller} = props;
    const history = useHistory();
    let columnData = getColumnData(controller);
    const [expressaoBusca, setExpressaoBusca] = useState("");
    const {data, isLoading, pageData, error} = useLista<T>(page, expressaoBusca, controller);
    const theme = useTheme();
    const mediaQuery = useMediaQuery(theme.breakpoints.up('sm'))

    const handleRowClick = useMemo(() => (param: RowParams) => {
        history.push(`/detail/${controller}/${param.data.id}`)
    }, [history, controller]);

    const handleSearchChange = (expressaoBusca: string) => {
        setExpressaoBusca(expressaoBusca);
    }

    if (!columnData) {
        history.push('/erro/Não estamos preparados para mostrar esse tipo de informação')
        return <TelaErro/>;
    }
    const columns: ColDef[] = mediaQuery?columnData:[columnData[0]];
    const handlePageChange = (param: PageChangeParams) => {
            history.push(`/list/${controller}/${param.page}`);
    };

    if (error) {
        history.push('/erro/Não conseguimos acessar os nossos servidores')
        return <TelaErro/>;
    }

    return (
        <>
            <Grid container direction={"column"} justify={"space-around"}>
                <Grid item>
                    <Busca onChange={handleSearchChange} disabled={page > 1}/>
                </Grid>
                <Grid item>
                    <div style={{ height: 400, width: '100%' }}>
                    <DataGrid autoHeight rows={data} rowCount={pageData?.totalRegistros}
                              loading={isLoading}
                              columns={columns}
                              page={page} pageSize={10} onRowClick={handleRowClick} onPageChange={handlePageChange}
                              paginationMode={'server'}/>
                    </div>
                </Grid>
            </Grid>
        </>
    );

}
