import {makeStyles} from '@material-ui/core/styles';
import {Grid} from "@material-ui/core";
import {Container} from "@material-ui/core";
import {QuestionAnswerType} from "./QuestionAnswerType";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {QuestionAnswerList} from "./QuestionAnswerList";

export type TQuestionAnswerTypeList = QuestionAnswerType[]

export function QuestionAnswer() {
    const useStyles = makeStyles((theme) => ({
        cardGrid: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(8),
            flexGrow: 1,
            wordBreak: "break-all"
        },
        root: {
            flexGrow: 1,
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
    }));
    
    const classes = useStyles();
    const [questionAnswers, setQuestionAnswerList] = useState<TQuestionAnswerTypeList>([]);

    useEffect(() => {
        // Use [] as second argument in useEffect for not rendering each time
        axios.get<TQuestionAnswerTypeList>('https://localhost:5001/api/QuestionAnswer')
            .then((response) => {
                setQuestionAnswerList(response.data);
            });
    }, []);
    return (
        <Container className={classes.cardGrid}>
            <Grid container>
                <QuestionAnswerList items={questionAnswers}/>
            </Grid>
        </Container>
    );
}