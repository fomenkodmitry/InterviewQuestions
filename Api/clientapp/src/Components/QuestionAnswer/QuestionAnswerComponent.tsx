import {makeStyles} from '@material-ui/core/styles';
import {Grid} from "@material-ui/core";
import {Container} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {QuestionAnswerList} from "./QuestionAnswerList";
import {fetchQuestionAnswer} from "./QuestionAnswerThunk";
import {useAppDispatch} from "../../Store/Store";
import {connect} from "react-redux";
import {QuestionAnswerTypeList} from "./QuestionAnswerType";

//if export default, then not use brackets
function QuestionAnswer(props : any) {
    const useStyles = makeStyles((theme) => ({
        cardGrid: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(8),
            flexGrow: 1,
            wordBreak: "break-all"
        }
    }));
    
    const classes = useStyles();
    const dispatch = useAppDispatch()
    
    const getQuestions = (programmingLanguage: string) => {
        dispatch(fetchQuestionAnswer(programmingLanguage))
    };
    
    useEffect(() => {
        // Use [] as second argument in useEffect for not rendering each time
        getQuestions("")
    }, []);

    return (
        <Container className={classes.cardGrid}>
            <Grid container>
                <QuestionAnswerList items={props.questionAnswers}/>
            </Grid>
        </Container>
    );
}

const mapStateToProps = (state: { questionAnswers: QuestionAnswerTypeList; }) => ({
    questionAnswers: state.questionAnswers
})

export default connect(mapStateToProps)(QuestionAnswer)