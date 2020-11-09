import React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Grid, Typography} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface FieldProps {
    nome: string,
    valor: string
}

export const Field = (props:FieldProps) => {
    const {nome,valor} = props;
    return (
        <Grid item xs={12}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{nome}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {valor}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            {/*<Paper>{nome} = {valor}</Paper>*/}
        </Grid>
    )
}
