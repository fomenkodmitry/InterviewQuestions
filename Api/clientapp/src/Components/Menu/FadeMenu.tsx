import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useAppDispatch} from "../../Store/Store";
import {fetchProgrammingLanguageThunk} from "../../Thunk/ProgrammingLanguageThunk";
import {fetchQuestionAnswerThunk} from "../../Thunk/QuestionAnswerThunk";
import {connect} from "react-redux";
import {StoreProps} from "../../Type/Props";
import {QuestionFilterType} from "../../Type/QuestionAnswerType";
import {changeProgrammingLanguageIdAction} from "../../Reducer/ValueReducer";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
    fade: {
        color: '#FFFFFF',
        flexGrow: 1,
        paddingLeft: theme.spacing(2)
    },

}));

function FadeMenu(props: StoreProps) {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const classes = useStyles();

    const dispatch = useAppDispatch()

    //update store onlick
    const getQuestions = (filter? : QuestionFilterType) => {
        dispatch(fetchQuestionAnswerThunk(filter))
        handleClose()
        dispatch(changeProgrammingLanguageIdAction(filter?.programmingLanguageId))
    };

    const getLanguages = () => {
        dispatch(fetchProgrammingLanguageThunk())
    };

    useEffect(() => {
        getLanguages()
    }, [])
    
    let filter : QuestionFilterType = {}
    return (
        <div>
            <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick} className={classes.fade}>
                <Hidden mdDown>Selected language:&nbsp;</Hidden> {props.programmingLanguages?.find(p => p.id == props.values?.programmingLanguageId)?.name ?? "All"}
            </Button>
            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                {props?.programmingLanguages?.map(item => (
                    <MenuItem key={item.id} onClick={() =>{
                        filter.programmingLanguageId = item.id
                        filter.searchText = props.values?.searchText
                        getQuestions(filter)  
                    } }>{item.name}</MenuItem>
                ))}
                <MenuItem key={"all"} onClick={() => getQuestions()}>All</MenuItem>
            </Menu>
        </div>
    );
}
//можно получать уже готовые стейты
const mapStateToProps = (state: StoreProps) => ({
    programmingLanguages: state.programmingLanguages,
    questionAnswers: state.questionAnswers,
    values : state.values
})

// подключение компонента к стору
export default connect(mapStateToProps)(FadeMenu)