﻿import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useAppDispatch} from "../../Store/Store";
import {fetchProgrammingLanguage} from "../../Thunk/ProgrammingLanguageThunk";
import {fetchQuestionAnswer} from "../../Thunk/QuestionAnswerThunk";
import {connect} from "react-redux";
import {ProgrammingLanguageListProps, ProgrammingLanguageTypeList} from "../../Type/ProgrammingLanguageType";
import {QuestionAnswerTypeList} from "../../Type/QuestionAnswerType";

function FadeMenu(props: ProgrammingLanguageListProps) {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const useStyles = makeStyles((theme) => ({
        fade: {
            color: '#FFFFFF'
        }
    }));
    const classes = useStyles();

    const dispatch = useAppDispatch()

    //update store onlick
    const getQuestions = (programmingLanguageId?: string) => {
        dispatch(fetchQuestionAnswer(programmingLanguageId))
        handleClose()
        let lang = programmingLanguageId ? props.programmingLanguages?.find(p => p.id == programmingLanguageId)?.name : "All"
        setLanguage(lang)
    };

    const getLanguages = () => {
        dispatch(fetchProgrammingLanguage())
    };

    useEffect(() => {
        getLanguages()
    }, [])

    //хук состояния для локального хранения
    const [language, setLanguage] = useState<string | undefined>("All");
    console.log(props)
    return (
        <div>
            <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick} className={classes.fade}>
                Selected language: {language}
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
                    <MenuItem id={item.id} onClick={() => getQuestions(item.id)}>{item.name}</MenuItem>
                ))}
                <MenuItem onClick={() => getQuestions()}>All</MenuItem>
            </Menu>
        </div>
    );
}
//можно получать уже готовые стейты
const mapStateToProps = (state: { programmingLanguages: ProgrammingLanguageTypeList; questionAnswers: QuestionAnswerTypeList }) => ({
    programmingLanguages: state.programmingLanguages,
    questionAnswers: state.questionAnswers
})

// подключение компонента к стору
export default connect(mapStateToProps)(FadeMenu)