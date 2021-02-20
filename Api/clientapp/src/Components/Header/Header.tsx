import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import FadeMenu from "../Menu/FadeMenu";
import {useHistory} from "react-router-dom";
import {useLocation} from "react-router-dom";
import Search from "../Input/Search";
import React from "react";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'flex',
    },
    backgroundColorBar: {
        background: '#323234'
    },
    back: {
        display: 'flex',
        float: 'right'
    },
    mainIcon: {
        [theme.breakpoints.down('md')]: {
            flexGrow: 1,
            float: 'left'
        },
    }
}));

export function Header() {

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
                <div className={classes.title}>
                    <QuestionAnswerIcon onClick={home}/>
                    <Hidden smDown>
                        <Typography variant="h6" onClick={home}>
                            Interview questions
                        </Typography>
                    </Hidden>
                </div>
                {location.pathname == "/" && <Search/>}
                {location.pathname == "/" && <FadeMenu/>}
                {
                    location.pathname == "/question-create" &&
                    <div className={classes.back}>
                        <ArrowBackIcon onClick={home}/>
                        <Typography onClick={home}>Back</Typography>
                    </div>
                }
            </Toolbar>
        </AppBar>
    );
}