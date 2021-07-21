import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { login } from '../store/actions/userActionsCreators';

interface Values {
    email: string;
    password: string
}

interface Errors {
    email?: string;
    password?: string
}


export const Login = () => {

    const dispatch = useDispatch()

    const initialValues = { email: '', password: '' }

    const validate = (values: Values) => {
        console.log("MyForm ~ values", values)
        const errors: Errors = {};
        if (!values.email) {
            errors.email = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address';
        }
        if (values.password.length < 8) {
            errors.password = 'too short pass'
        }
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(values.password)) {
            errors.password = 'the password should contain at least one number and one capital letter'
        }

        return errors;
    }

    const onSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        console.log('submittes');
        dispatch(login(values))
        window.location.hash = '/info'
    }


    return <div className="login">

        <h1>Login</h1>
        <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={onSubmit}
        >
            <Form className="flex column">
                <label htmlFor="email">Email</label>
                <Field id="email" type="email" label="Email" name="email" />
                <ErrorMessage name="email" component="div" className="error email"/>
                <label htmlFor="password">Password</label>
                <Field id="password" type="password" name="password" label="password" />
                <ErrorMessage name="password" component="div" className="error password"/>
                {/* <Button type="submit" color="primary" variant="contained">Submit</Button> */}
                <button type="submit" >
                    Login
                </button>
            </Form>
        </Formik>
    </div>
};
