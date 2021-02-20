import {Form} from 'react-final-form';
import {
    TextField,
    Select,
} from 'mui-rff';
import {
    Paper,
    Grid,
    Button,
    MenuItem, GridSize, Snackbar,
} from '@material-ui/core';

import {makeStyles} from "@material-ui/core/styles";
import React, {ReactElement, useEffect} from "react";
import {createQuestionThunk} from "../../../Thunk/CreateQuestionThunk";
import {useAppDispatch} from "../../../Store/Store";
import {QuestionCreateType} from "../../../Type/QuestionAnswerType";
import {connect} from "react-redux";
import {StoreProps} from "../../../Type/Props";
import {fetchTagsThunk} from "../../../Thunk/TagsThunk";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const validate = (values: QuestionCreateType) => {
    const errors: any = {};
    if (!values.question) {
        errors.question = 'Required';
    }
    if (!values.answer) {
        errors.answer = 'Required';
    }
    if (!values.tagIds) {
        errors.tagIds = 'Required';
    }
    return errors;
};

interface Fields {
    size: GridSize,
    field: ReactElement
}

type FieldsList = Fields[]

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    Form: {
        padding: 16,
        margin: 'auto',
        maxWidth: 600,
        paddingTop: theme.spacing(6),
    }
}));

function QuestionCreate(props : StoreProps) {

    const formFields: FieldsList = [
        {
            size: 12,
            field: <TextField name="question" multiline label="Question" margin="none"/>,
        },
        {
            size: 12,
            field: <TextField name="answer" multiline label="Answer" margin="none"/>,
        },
        {
            size: 12,
            field: (
                <Select
                    name="tagIds"
                    label="Select a language"
                    formControlProps={{margin: 'none'}}
                    multiple
                >
                    {props?.tags?.map(item => (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>))}
                </Select>
            ),
        },
    ];

    const classes = useStyles();

    const dispatch = useAppDispatch()

    const createQuestion = (value : QuestionCreateType) => {
        dispatch(createQuestionThunk(value)).then(() => handleClick())
    };
    const getLanguages = () => {
        dispatch(fetchTagsThunk())
    };

    useEffect(() => {
        getLanguages()
    }, [])

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    
    return (
        <div className={classes.Form}>
            <Form
                onSubmit={createQuestion}
                initialValues={{}}
                validate={validate}
                render={({handleSubmit, form, submitting, pristine, values}) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <Paper style={{padding: 16}}>
                            <Grid container alignItems="flex-start" spacing={2}>
                                {formFields.map((item, idx) => (
                                    <Grid item xs={item.size} key={idx}>
                                        {item.field}
                                    </Grid>
                                ))}
                                <Grid key={"button"} item style={{ marginTop: 16 }}>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        onClick={() => form.reset()}
                                        disabled={submitting || pristine}
                                    >
                                        Reset
                                    </Button>
                                </Grid>
                                <Grid key={"submit"} item style={{marginTop: 16}}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={submitting}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </form>
                )}
             />
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Question creation successful!
                </Alert>
            </Snackbar>
        </div>
    );
}

const mapStateToProps = (state: StoreProps) => ({
    tags: state.tags,
})

// подключение компонента к стору
export default connect(mapStateToProps)(QuestionCreate)