import {Form} from 'react-final-form';
import {TextField} from 'mui-rff';
import {Paper, Grid, Button, MenuItem, GridSize} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import React, {ReactElement, useEffect} from "react";
import {useSnackbar, VariantType} from "notistack";
import {useAppDispatch} from "../../Store/Store";
import {StoreProps} from "../../Type/Props";
import {LoginType, TokenType} from "../../Type/AuthType";
import {authThunk} from "../../Thunk/AuthThunk";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {setIsAuthAction} from "../../Action/ValueAction";

const validate = (values: LoginType) => {
    const errors: any = {};
    if (!values.email) {
        errors.question = 'Required';
    }
    if (!values.password) {
        errors.tagIds = 'Required';
    }
    return errors;
};

interface Fields {
    size: GridSize,
    field: ReactElement
}

type FieldsList = Fields[]

const useStyles = makeStyles((theme) => ({
    Form: {
        padding: 16,
        margin: 'auto',
        maxWidth: 600,
        paddingTop: theme.spacing(6),
    }
}));

function Auth(props?: StoreProps) {

    const formFields: FieldsList = [
        {
            size: 12,
            field: <TextField name="email" label="email" margin="none"/>,
        },
        {
            size: 12,
            field: <TextField name="password" type="password" label="Password" margin="none"/>,
        }
    ];

    const classes = useStyles();

    //истрия переходов + редирект
    let history = useHistory();

    function home() {
        history.push("/");
    }
    
    const dispatch = useAppDispatch()
    //ToDo отрефакторить обработку ошибок и вынести её глобально
    const createQuestion = (value: LoginType) => {
        dispatch(authThunk(value))
            .then(res => {
                if (typeof res.payload != 'number') {
                    const tokenRes = res.payload as TokenType;
                    return handleVariant('success', tokenRes.authToken)
                }
                return handleVariant('error')
            })
    }

    const {enqueueSnackbar} = useSnackbar();

    const handleVariant = (variant: VariantType, token? : string) => {
        if (variant == 'success') {
            enqueueSnackbar('This is a success!', {variant});
            dispatch(setIsAuthAction(true))
            localStorage.token = token;
            home()
        } else {
            enqueueSnackbar('Error!', {variant});
        }
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
        </div>
    );
}

const mapStateToProps = (state: StoreProps) => ({
    values: state.values
})

// подключение компонента к стору
export default connect(mapStateToProps)(Auth)