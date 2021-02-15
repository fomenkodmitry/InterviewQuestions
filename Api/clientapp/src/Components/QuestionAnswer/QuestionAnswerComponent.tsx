import {makeStyles} from '@material-ui/core/styles';
import {Fab, Grid} from "@material-ui/core";
import {Container} from "@material-ui/core";
import React, {useEffect} from "react";
import {QuestionAnswerList} from "./QuestionAnswerList";
import {fetchQuestionAnswer} from "./QuestionAnswerThunk";
import {useAppDispatch} from "../../Store/Store";
import {connect} from "react-redux";
import {QuestionAnswerTypeList} from "./QuestionAnswerType";
import AddIcon from '@material-ui/icons/Add';
import {useHistory} from "react-router-dom";

//если export default, то не нужно использовать скобки
function QuestionAnswer(props : any) {
    const useStyles = makeStyles((theme) => ({
        cardGrid: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(8),
            flexGrow: 1,
            wordBreak: "break-all"
        },
        fab: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
    }));
    
    const classes = useStyles();
    const dispatch = useAppDispatch()
    
    const getQuestions = (programmingLanguage: string) => {
        dispatch(fetchQuestionAnswer(programmingLanguage))
    };
    //заполняем стор первичными данными с помощью хука для сайд действий
    useEffect(() => {
        getQuestions("All")
    }, []);

    //истрия переходов + редирект
    let history = useHistory();
    function create() {
        history.push("/question-create");
    }
    
    return (
        <Container className={classes.cardGrid}>
            <Grid container>
                <QuestionAnswerList items={props.questionAnswers}/>
            </Grid>
            <Fab color="secondary" className={classes.fab} onClick={create}>
                <AddIcon />
            </Fab>
        </Container>
    );
}

const mapStateToProps = (state: { questionAnswers: QuestionAnswerTypeList; }) => ({
    questionAnswers: state.questionAnswers
})
// подключение компонента к стору
export default connect(mapStateToProps)(QuestionAnswer)