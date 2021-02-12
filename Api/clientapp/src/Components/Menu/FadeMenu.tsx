import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useAppDispatch} from "../../Store/Store";
import {fetchQuestionAnswer} from "../QuestionAnswer/QuestionAnswerThunk";

export function FadeMenu() {
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
    
    //update store onlick
    const dispatch = useAppDispatch()
    const getQuestions = (programmingLanguage: string) => {
        dispatch(fetchQuestionAnswer(programmingLanguage))
        handleClose()
    };
    
    return (
        <div>
            <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick} className={classes.fade}>
                Select language
            </Button>
            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={() => getQuestions("Csharp")}>.NET</MenuItem>
                <MenuItem onClick={() => getQuestions("Sql")}>SQL</MenuItem>
                <MenuItem onClick={() => getQuestions("Nothing")}>All</MenuItem>
            </Menu>
        </div>
    );
}