import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';

const formSchema = yup.object().shape(
    {
        username: yup
            .string()
            .required('Must be a valid username')
            .min(6,'Username is required'),
        password: yup
            .string()
            .required('Password is required')
            .min(6, 'Password is too short'),
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

    const validate = e => {
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
        e.preventDefault();
        axios
            .post('https://prettypoppinpotlucks.herokuapp.com/api/login', formState)
            .then((res) => {
                console.log(res);

                localStorage.set('token', res.data.token)
                history.push('/')
            })
            .catch((err) => console.log(err));
    };

    const handleChange = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
        validate(e);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input
                    id='username'
                    type='text'
                    name='username'
                    value= {formState.username}
                    onChange={handleChange}
                    placeholder='Username'
                />
                {errorState.username.length > 0 ? <p>{errorState.username}</p> : null}
                <label htmlFor='password'>Password:</label>
                <input
                    id='password'
                    type='password'
                    name='password'
                    value= {formState.password}
                    onChange={handleChange}
                    placeholder='Password'
                />
                {errorState.password.length > 0 ? <p>{errorState.password}</p> : null}
                <button>Login</button>
            </form>
        </div>
    );
};

export default LoginForm;