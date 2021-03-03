import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import FadeMenu from "../Menu/FadeMenu";
import {useHistory} from "react-router-dom";
import {useLocation} from "react-router-dom";
import Search from "../Input/Search";
import React, {useEffect} from "react";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Hidden from '@material-ui/core/Hidden';
import Auth from "../Auth/Auth";
import {StoreProps} from "../../Type/Props";
import {connect} from "react-redux";
import {useAppDispatch} from "../../Store/Store";
import {getIsAuthAction} from "../../Action/ValueAction";
import {Container, Fab} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

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
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

function Header(props?: StoreProps) {

    const classes = useStyles();

    const dispatch = useAppDispatch()

    const getIsAuth = () => {
        dispatch(getIsAuthAction())
    };

    useEffect(() => {
        getIsAuth()
    }, [])

    //истрия переходов + редирект
    let history = useHistory();

    function home() {
        history.push("/");
    }

    function auth() {
        history.push("/auth");
    }
    function create() {
        history.push("/question-create");
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
                    (location.pathname == "/question-create" || location.pathname == "/auth") &&
                    <div className={classes.back}>
                        <ArrowBackIcon onClick={home}/>
                        <Typography onClick={home}>Back</Typography>
                    </div>
                }
                {
                    (location.pathname == "/" && !props?.values.isAuth) &&
                    <Typography onClick={auth}>Auth</Typography>
                }
            </Toolbar>
            {
                (location.pathname == "/" && props?.values.isAuth) &&
                <Fab color="secondary" className={classes.fab} onClick={create}>
                    <AddIcon/>
                </Fab>
            }
        </AppBar>
    );
}

//можно получать уже готовые стейты
const mapStateToProps = (state: StoreProps) => ({
    values: state.values
})

// подключение компонента к стору
export default connect(mapStateToProps)(Header)