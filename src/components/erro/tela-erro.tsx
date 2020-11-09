import React from "react";
import {useHistory, useParams} from "react-router-dom";
import './tela-erro.css'
import {Button} from "@material-ui/core";

interface ErroParam {
    motivo:string
}
const TelaErro = () => {

    const {motivo} = useParams<ErroParam>();
    const history = useHistory();

    return (
        <div className={'conteiner'}>
            <div className={'box'}>
                <div><span className={"spanMessage"}>{motivo}<span role="img" aria-label="Emoji triste">😢</span></span></div>
                <div><Button size={'large'} variant="outlined"
                             style={{backgroundColor: '#AB61E5', color: "white", fontWeight: 'bold', width: '15em'}}
                             onClick={() => {
                                 history.push('/')
                             }}>
                    Voltar
                </Button></div>
            </div>
        </div>
    )

}

export default TelaErro
