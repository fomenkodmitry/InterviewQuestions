import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import FadeMenu from "../Menu/FadeMenu";
import {useHistory} from "react-router-dom";
import {useLocation} from "react-router-dom";

export function Header() {

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
    const classes = useStyles();

    //истрия переходов + редирект
    let history = useHistory();

    function home() {
        history.push("/");
    }

    // текущий путь
    const location = useLocation();

    return (
        <AppBar className={classes.backgroundColorBar} position="relative">
            <Toolbar>
                <QuestionAnswerIcon/>
                <Typography variant="h6" className={classes.title} onClick={home}>
                    Interview questions
                </Typography>
                {location.pathname == "/" && <FadeMenu/>}
            </Toolbar>
        </AppBar>
    );
}