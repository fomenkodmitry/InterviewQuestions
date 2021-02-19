import SearchIcon from "@material-ui/icons/Search";
import {InputBase} from "@material-ui/core";
import {fade, makeStyles} from "@material-ui/core/styles";
import {QuestionFilterType} from "../../Type/QuestionAnswerType";
import {fetchQuestionAnswerThunk} from "../../Thunk/QuestionAnswerThunk";
import {useAppDispatch} from "../../Store/Store";
import React, {useEffect} from "react";
import {changeSearchTextAction, getProgrammingLanguageIdAction, getSearchTextAction} from "../../Reducer/ValueReducer";
import {StoreProps} from "../../Type/Props";
import {connect} from "react-redux";

function Search(props : StoreProps) {
   const useStyles = makeStyles((theme) => ({
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }))
    const classes = useStyles()
    
    const dispatch = useAppDispatch()
    const getQuestions = (filter? : QuestionFilterType) => {
        dispatch(fetchQuestionAnswerThunk(filter))
    };
    const getProgrammingLanguageId = () => {
        dispatch(getProgrammingLanguageIdAction)
    };

    const setSearchText = (value? : string) => {
        dispatch(changeSearchTextAction(value))
    };
    const getSearchText = () => {
        dispatch(getSearchTextAction())
    };
    useEffect(() => {
        getSearchText()
        getProgrammingLanguageId()
    }, []);
    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if(e.target.value.length < 3 && props?.values?.searchText == undefined)
            return;
        if(e.target.value.length == 0 && props?.values?.searchText != undefined) {
            const filter : QuestionFilterType = {
                programmingLanguageId : props?.values?.programmingLanguageId
            }
            getQuestions(filter);
            return;            
        }
        if(e.target.value.length >= 3) {
            getProgrammingLanguageId()
            const filter : QuestionFilterType = {
                searchText : e.target.value,
                programmingLanguageId : props.values?.programmingLanguageId
            }
            setSearchText(e.target.value)
            getQuestions(filter)
        }

    }
    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon/>
            </div>
            <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{'aria-label': 'search'}}
                onChange={handleChange}
            />
        </div>
    )
}
//можно получать уже готовые стейты
const mapStateToProps = (state: StoreProps) => ({
    values : state.values
})

// подключение компонента к стору
export default connect(mapStateToProps)(Search)