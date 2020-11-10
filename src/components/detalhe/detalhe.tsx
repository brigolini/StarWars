import React from "react";
import {useDetalhe} from "./use-detalhe";
import {People} from "../../api/schemas/people";
import {Field} from "./field";
import {SWAPIEndpoint} from "../../api/generic/generic-api";
import {getDetailData} from "../../api/controller-defs";
import {Button, CircularProgress, Grid} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import TelaErro from "../erro/tela-erro";

interface DetalheProps {
    id: number;
    controller: SWAPIEndpoint;
}

const Detalhe = (props:DetalheProps) => {
    const {id,controller} = props;
    const {isLoading, result,error} = useDetalhe<People>(id, controller);
    const history = useHistory();
    if (isLoading) return <div className={'centralizado'}><CircularProgress/></div>

    const colunas = getDetailData(controller);
    if (!colunas) return null;
    const handleClick=()=>{
        history.goBack();
    }

    if (error) {
        history.push('/erro/Não conseguimos acessar os nossos servidores')
        return <TelaErro/>;
    }
    if (!result) return null;
    return (
        <>
            <Grid container direction={"column"} spacing={2} alignItems={"stretch"}>
            {Object.entries(result)
                .filter(item => {
                    const [key] = item;
                    return colunas?.find(campo=>campo===key)
                })
                .map((item) => {
                const [key, value] = item;
                    return <Grid key={key} item><Field nome={key} valor={value}/></Grid>
            })}
            <Grid item className={'centralizado'}>
                <Button variant={"outlined"} onClick={handleClick}>Voltar</Button>
            </Grid>
            </Grid>
        </>
    )

}

export default Detalhe;
