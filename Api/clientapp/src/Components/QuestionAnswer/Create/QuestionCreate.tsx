import {Form} from 'react-final-form';
import {
    TextField,
    Checkboxes,
    Radios,
    Select,
    DatePicker,
    TimePicker,
} from 'mui-rff';
import {
    Typography,
    Paper,
    Link,
    Grid,
    Button,
    CssBaseline,
    MenuItem, GridSize,
} from '@material-ui/core';
// Picker
import DateFnsUtils from '@date-io/date-fns';
import {makeStyles} from "@material-ui/core/styles";
import {ReactElement} from "react";

const onSubmit = async (values: any) => {
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(300);
    window.alert(JSON.stringify(values));
};

const validate = (values: { firstName: any; lastName: any; email: any; }) => {
    const errors: any = {};
    if (!values.firstName) {
        errors.firstName = 'Required';
    }
    if (!values.lastName) {
        errors.lastName = 'Required';
    }
    if (!values.email) {
        errors.email = 'Required';
    }
    return errors;
};

interface Fields {
    size: GridSize,
    field: ReactElement
}

type FieldsList = Fields[]

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
                name="Programming language"
                label="Select a language"
                formControlProps={{margin: 'none'}}
            >
                <MenuItem value="London">London</MenuItem>
                <MenuItem value="Paris">Paris</MenuItem>
                <MenuItem value="Budapest">A city with a very long Name</MenuItem>
            </Select>
        ),
    },
];

export function QuestionCreate() {

    const useStyles = makeStyles((theme) => ({
        Form: {
            padding: 16,
            margin: 'auto',
            maxWidth: 600,
            paddingTop: theme.spacing(8),
        }
    }));

    const classes = useStyles();
    return (
        <div className={classes.Form}>
            <Form
                onSubmit={onSubmit}
                initialValues={{employed: true, stooge: 'larry'}}
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
                        <pre>{JSON.stringify(values)}</pre>
                    </form>
                )}
            />
        </div>
    );
}