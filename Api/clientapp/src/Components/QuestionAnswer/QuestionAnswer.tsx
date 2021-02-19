﻿import {makeStyles} from '@material-ui/core/styles';
import {Fab, Grid} from "@material-ui/core";
import {Container} from "@material-ui/core";
import React, {useEffect} from "react";
import {QuestionAnswerList} from "./QuestionAnswerList";
import {useAppDispatch} from "../../Store/Store";
import {connect} from "react-redux";
import AddIcon from '@material-ui/icons/Add';
import {useHistory} from "react-router-dom";
import {fetchQuestionAnswerThunk} from "../../Thunk/QuestionAnswerThunk";
import {StoreProps} from "../../Type/Props";
import {QuestionFilterType} from "../../Type/QuestionAnswerType";

//если export default, то не нужно использовать скобки
function QuestionAnswer(props: StoreProps) {
    const useStyles = makeStyles((theme) => ({
        cardGrid: {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(8),
            flexGrow: 1,
            paddingLeft: 1,
        },
        fab: {
            position: 'fixed',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
    }));

    const classes = useStyles();
    const dispatch = useAppDispatch()

    const getQuestions = (filter? : QuestionFilterType) => {
        dispatch(fetchQuestionAnswerThunk(filter))
    };
    //заполняем стор первичными данными с помощью хука для сайд действий
    useEffect(() => {
        getQuestions()
    }, []);

    //истрия переходов + редирект
    let history = useHistory();

    function create() {
        history.push("/question-create");
    }

    return (
        <Container className={classes.cardGrid}>
            <Grid container>
                <QuestionAnswerList {...props}/>
            </Grid>
            <Fab color="secondary" className={classes.fab} onClick={create}>
                <AddIcon/>
            </Fab>
        </Container>
    );
}


//можно получать уже готовые стейты
const mapStateToProps = (state: StoreProps) => ({
    programmingLanguages: state.programmingLanguages,
    questionAnswers: state.questionAnswers
})

// подключение компонента к стору
export default connect(mapStateToProps)(QuestionAnswer)