import { Form } from 'react-final-form';
import { TextField } from 'mui-rff';
import { Field } from 'react-final-form'

interface FormData {
    hello: string;
}

interface MyFormProps {
    initialValues: FormData;
}

export function QuestionCreate(props: MyFormProps) {
    const { initialValues } = props;

    // yes, this can even be async!
    async function onSubmit(values: FormData) {
        console.log(values);
    }

    // yes, this can even be async!
    async function validate(values: FormData) {
        if (!values.hello) {
            return { hello: 'Saying hello is nice.' };
        }
        return;
    }

    return (
        <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            validate={validate}
            render={({ handleSubmit}) => (
                <form onSubmit={handleSubmit} noValidate>
                    <TextField label="Hello world" name="hello" required={true} />
                    <pre>че</pre>
                </form>
            )}
        />
    );
}