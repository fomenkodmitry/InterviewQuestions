import Button from '@material-ui/core/Button';
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useAppDispatch} from "../../Store/Store";
import {fetchTagsThunk} from "../../Thunk/TagsThunk";
import {fetchQuestionAnswerThunk} from "../../Thunk/QuestionAnswerThunk";
import {connect} from "react-redux";
import {StoreProps} from "../../Type/Props";
import {QuestionFilterType} from "../../Type/QuestionAnswerType";
import {changeTagIdsAction, getTagIdsAction} from "../../Reducer/ValueReducer";
import {Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    dialog: {
        color: '#FFFFFF',
        flexGrow: 1,
        paddingLeft: theme.spacing(2)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
}));

function FadeMenu(props: StoreProps) {

    const classes = useStyles();

    const dispatch = useAppDispatch()

    //update store onlick
    const getQuestions = (filter? : QuestionFilterType) => {
        dispatch(fetchQuestionAnswerThunk(filter))
        dispatch(changeTagIdsAction(filter?.tagIds))
    };

    const getLanguages = () => {
        dispatch(fetchTagsThunk())
    };

    useEffect(() => {
        getLanguages()
    }, [])
    let filter : QuestionFilterType = {}

    const handleChangeMultiple = (event: React.ChangeEvent<{ value: unknown }>) => {
        const { options } = event.target as HTMLSelectElement;
        const value: string[] = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        filter.tagIds = value
        getQuestions(filter);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <Button className={classes.dialog} onClick={handleClickOpen}>Open tags</Button>
            <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Please select tags</DialogTitle>
                <DialogContent>
                    <form className={classes.container}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink htmlFor="select-multiple-native">
                                Native
                            </InputLabel>
                            <Select
                                multiple
                                native
                                value={props.values?.tagIds}
                                onChange={handleChangeMultiple}
                                inputProps={{
                                    id: 'select-multiple-native',
                                }}
                            >
                                {props?.tags?.map(item => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
//можно получать уже готовые стейты
const mapStateToProps = (state: StoreProps) => ({
    tags: state.tags,
    questionAnswers: state.questionAnswers,
    values : state.values
})

// подключение компонента к стору
export default connect(mapStateToProps)(FadeMenu)