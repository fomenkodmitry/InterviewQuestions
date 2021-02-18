import {Form} from 'react-final-form';
import {
    TextField,
    Select,
} from 'mui-rff';
import {
    Paper,
    Grid,
    Button,
    MenuItem, GridSize,
} from '@material-ui/core';

import {makeStyles} from "@material-ui/core/styles";
import {ReactElement, useEffect} from "react";
import {createQuestionThunk} from "../../../Thunk/CreateQuestionThunk";
import {useAppDispatch} from "../../../Store/Store";
import {QuestionCreateType} from "../../../Type/QuestionAnswerType";
import {connect} from "react-redux";
import {ProgrammingLanguageProps} from "../../../Type/Props";
import {fetchProgrammingLanguageThunk} from "../../../Thunk/ProgrammingLanguageThunk";


const validate = (values: QuestionCreateType) => {
    const errors: any = {};
    if (!values.question) {
        errors.question = 'Required';
    }
    if (!values.answer) {
        errors.answer = 'Required';
    }
    if (!values.programmingLanguageId) {
        errors.programmingLanguageId = 'Required';
    }
    return errors;
};

interface Fields {
    size: GridSize,
    field: ReactElement
}

type FieldsList = Fields[]

function QuestionCreate(props : ProgrammingLanguageProps) {

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
                    name="programmingLanguageId"
                    label="Select a language"
                    formControlProps={{margin: 'none'}}
                >
                    {props?.programmingLanguages?.map(item => (<MenuItem value={item.id}>{item.name}</MenuItem>))}
                </Select>
            ),
        },
    ];
    
    const useStyles = makeStyles((theme) => ({
        Form: {
            padding: 16,
            margin: 'auto',
            maxWidth: 600,
            paddingTop: theme.spacing(8),
        }
    }));

    const classes = useStyles();

    const dispatch = useAppDispatch()

    const createQuestion = (value : QuestionCreateType) => {
        dispatch(createQuestionThunk(value)).then(() => alert("success"))
    };
    const getLanguages = () => {
        dispatch(fetchProgrammingLanguageThunk())
    };

    useEffect(() => {
        getLanguages()
    }, [])
    
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
                                <Grid item style={{ marginTop: 16 }}>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        onClick={() => form.reset()}
                                        disabled={submitting || pristine}
                                    >
                                        Reset
                                    </Button>
                                </Grid>
                                <Grid item style={{marginTop: 16}}>
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
        </div>
    );
}

const mapStateToProps = (state: ProgrammingLanguageProps) => ({
    programmingLanguages: state.programmingLanguages,
})

// подключение компонента к стору
export default connect(mapStateToProps)(QuestionCreate)