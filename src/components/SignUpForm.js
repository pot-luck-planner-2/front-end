import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    name: yup
        .string()
        .required('Name is a required field.')
        .min(2, 'Must be a valid name.'),
    username: yup
        .string()
        .required('Username is a required field.')
        .min(6, 'Username is too short.'),
    password: yup
        .string()
        .required('A password is required.')
        .min(6, 'Password selected is too short.'),
    email: yup
        .string()
        .required('Email is a required field.')
        .email('Must be a valid email address.'),
    phone: yup
        .string()
        .required('Phone is a required field.')
        .min(10, 'Must be a valid phone number.'),
});

const SignUpForm = () => {
    const [formState, setFormState] = useState({
        email: '',
        name: '',
        username: '',
        password: '',
        phone: '',
    })

    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        formSchema.isValid(formState)
            .then(valid => {
                setButtonDisabled(!valid);
            });
    }, [formState]);

    const [errorState, setErrorState] = useState({
        email: '',
        name: '',
        username: '',
        password: '',
        phone: '',
    })

    const validateChange = e => {
        yup 
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then((valid) => {
                setErrorState({
                    ...errorState, 
                    [e.target.name]: '',
                });
            })
            .catch((err) => {
                console.log(err.errors);
                setErrorState({
                    ...errorState,
                    [e.target.name]: err.errors[0],
                });
            });
    };

    const handleChange = e => {
        e.persist();
        validateChange(e);
        setFormState({
            ...formState,
            [e.target.name] : e.target.value,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log(formState);
        axios
            .post('https://prettypoppinpotlucks.herokuapp.com/api/register', formState)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Name:</label>
                <input
                    id='name'
                    type='text'
                    name='name'
                    value= {formState.name}
                    onChange={handleChange}
                    placeholder='Name'
                />
                {errorState.name.length > 0 ? <p>{errorState.name}</p> : null}
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
                <label htmlFor='name'>Email:</label>
                <input
                    id='email'
                    type='text'
                    name='email'
                    value= {formState.email}
                    onChange={handleChange}
                    placeholder='Email'
                />
                {errorState.name.length > 0 ? <p>{errorState.name}</p> : null}
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
                <label htmlFor='phone'>Phone Number:</label>
                <input
                    id='phone'
                    type='tel'
                    name='phone'
                    value= {formState.phone}
                    onChange={handleChange}
                    placeholder='Phone'
                />
                {errorState.password.length > 0 ? <p>{errorState.password}</p> : null}
                <button id='submit' disabled={buttonDisabled}>Register</button>
            </form>
        </div>
    );
};

export default SignUpForm; 