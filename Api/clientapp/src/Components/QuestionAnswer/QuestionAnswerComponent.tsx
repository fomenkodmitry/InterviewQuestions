import {makeStyles} from '@material-ui/core/styles';
import {Grid} from "@material-ui/core";
import {Container} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {QuestionAnswerList} from "./QuestionAnswerList";
import {fetchQuestionAnswer} from "./QuestionAnswerThunk";
import {useAppDispatch} from "../../Store/Store";
import {connect} from "react-redux";
import {QuestionAnswerTypeList} from "./QuestionAnswerType";

//если export default, то не нужно использовать скобки
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
    //заполняем стор первичными данными
    useEffect(() => {
        getQuestions("Nothing")
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
// подключение компонента к стору
export default connect(mapStateToProps)(QuestionAnswer)