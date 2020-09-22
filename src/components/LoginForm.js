import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';
import { Button, Form, FormGroup, Label, Input, FormFeedback, Alert } from 'reactstrap';

const formSchema = yup.object().shape(
    {
        username: yup
            .string()
            .required('Username is required'),
        password: yup
            .string()
            .required('Password is required')
    }
);

const LoginForm = () => {
    const history = useHistory();

    const[formState, setFormState] = useState({
        username: '',
        password: '',
    });

    const [errorState, setErrorState] = useState({
        username: '',
        password: '',
    }); 

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [serverError, setServerError] = useState('');

    useEffect(() => {
        formSchema.isValid(formState)
            .then(valid => {
                setButtonDisabled(!valid);
            });
    }, [formState]);

    const validateChange= e => {
        e.persist();
        yup 
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then((valid) => {
                setErrorState({
                    ...errorState, 
                    [e.target.name]: '',
                }); 
            })
            .catch((error) => {
                console.log(error.errors);
                setErrorState({
                    ...errorState,
                    [e.target.name]: error.errors[0],
                });
            });
    };

    const handleSubmit = e => {
        setServerError('');
        e.preventDefault();
        axios.post('https://prettypoppinpotlucks.herokuapp.com/api/login', formState)
        .then((res) => {
            console.log(res);

            localStorage.set('token', res.data.token)
            history.push('/')
        })
        .catch((err) => {
            if(err.response.status === 401){
                setServerError('Invalid credentials, please try again.');
            }
        });
    };

    const handleChange = e => {
        e.persist();
        validateChange(e);
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div style={{ margin: '0 auto', width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '500px' }}>
                {serverError && <Alert color='danger'>{serverError}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input 
                            type="text" 
                            name="username" 
                            id="username"
                            value={formState.username}
                            onChange={handleChange}
                            invalid={errorState.username.length > 0}
                        />
                        {errorState.username.length > 0 ? (
                            <FormFeedback>{errorState.username}</FormFeedback>
                        ) : null}
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input 
                            type="password" 
                            name="password" 
                            id="examplePassword"
                            value={formState.password}
                            onChange={handleChange}
                            invalid={errorState.password.length > 0}
                        />
                        {errorState.password.length > 0 ? (
                            <FormFeedback>{errorState.password}</FormFeedback>
                        ) : null}
                    </FormGroup>        
                    <Button disabled={buttonDisabled}>Sign in</Button>
                </Form>
            </div>
        </div>
    );
};

export default LoginForm;