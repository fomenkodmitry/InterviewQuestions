import {makeStyles} from '@material-ui/core/styles';
import {Fab, Grid} from "@material-ui/core";
import {Container} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {useHistory} from "react-router-dom";
import QuestionAnswerList from "./QuestionAnswerList";

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

//если export default, то не нужно использовать скобки
export default function QuestionAnswer() {

    const classes = useStyles();
    
    return (
        <Container className={classes.cardGrid}>
            <Grid container>
                <QuestionAnswerList/>
            </Grid>
        </Container>
    );
}