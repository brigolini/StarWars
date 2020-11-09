import React, {ChangeEvent, useEffect, useState} from "react";
import {Button, TextField, Grid} from "@material-ui/core";
import {useDebounce} from "use-debounce";

interface BuscaProps {
    onChange: (valor: string) => void;
    disabled: boolean;
}

const Busca = (props: BuscaProps) => {
    const [text, setText] = useState('');
    const [search] = useDebounce<string>(text, 500);
    const {onChange,disabled} = props;
    useEffect(() => {
        onChange(search);
    }, [onChange,search])

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setText(event.target.value);
    };

    const handleClick = () => {
        setText('');
    }

    return (
        <>
            <Grid container direction={"row"} alignItems={"center"} justify={"space-around"}>
                <Grid item>
                    <TextField id="busca" label="Pesquise" onChange={handleChange} value={text} size={"medium"} disabled={disabled}/>
                </Grid>
                <Grid item>
                    <Button onClick={handleClick} variant={"contained"} disabled={disabled}>Limpar</Button>
                </Grid>
            </Grid>
        </>
    )

}

export default Busca;
