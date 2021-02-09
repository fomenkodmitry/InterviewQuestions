import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import {FadeMenu} from "../Menu/FadeMenu";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    backgroundColorBar: {
        background: '#323234'
    }
}));

export function Header() {

    const classes = useStyles();

    return (
        <AppBar className={classes.backgroundColorBar} position="relative">
            <Toolbar>
                <QuestionAnswerIcon/>
                <Typography variant="h6" className={classes.title}>
                    Interview questions
                </Typography>
                <FadeMenu/>
            </Toolbar>
        </AppBar>
    );
}