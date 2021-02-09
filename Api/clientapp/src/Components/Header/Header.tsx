import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {Link} from "@material-ui/core";
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

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

    return (
        <AppBar className={classes.backgroundColorBar} position="relative">
            <Toolbar>
                <QuestionAnswerIcon/>
                <Typography variant="h6" className={classes.title}>
                    .NET Interview questions
                </Typography>
                <Link href="#" color="inherit">Home</Link>
            </Toolbar>
        </AppBar>
    );
}