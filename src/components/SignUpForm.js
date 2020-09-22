import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormFeedback, Alert, Spinner } from 'reactstrap';

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
    const history = useHistory();

    const [formState, setFormState] = useState({
        email: '',
        name: '',
        username: '',
        password: '',
        phone: '',
    })

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);

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
                // console.log(err.errors);
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
        setLoading(true);
        setServerError('');
        e.preventDefault();
        console.log(formState);
        axios
            .post('https://prettypoppinpotlucks.herokuapp.com/api/register', formState)
            .then(() => {
                history.pushState('/login');
            })
            .catch((err) => {
                setLoading(false);
                console.log(err.response);
                if(err.response.status === 409){
                    setServerError(err.response.data.message);
                }
                if(err.response.status === 500){
                    setServerError('Issue connecting to server, try again later.');
                }
            })
    }

    return (
        <div style={{ margin: '0 auto', width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '500px' }}>
                {serverError && <Alert color='danger'>{serverError}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input 
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder="ex. John Doe" 
                            onChange={handleChange}
                            value={formState.name}
                            invalid={errorState.name.length > 0}
                        />
                        {errorState.name.length > 0 ? (
                            <FormFeedback>{errorState.name}</FormFeedback>
                        ) : null}
                    </FormGroup>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input 
                            type="text" 
                            name="username" 
                            id="username" 
                            placeholder="ex. johndoe"
                            onChange={handleChange}
                            value={formState.username}
                            invalid={errorState.username.length > 0}
                        />
                        {errorState.username.length > 0 ? (
                            <FormFeedback>{errorState.username}</FormFeedback>
                        ) : null}
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="example@email.com" 
                            onChange={handleChange}
                            value={formState.email}
                            invalid={errorState.email.length > 0}
                        />
                        {errorState.email.length > 0 ? (
                            <FormFeedback>{errorState.email}</FormFeedback>
                        ) : null}
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input 
                            type="password" 
                            name="password" 
                            id="password"
                            onChange={handleChange}
                            value={formState.password}
                            invalid={errorState.password.length > 0}                
                        />
                        {errorState.password.length > 0 ? (
                            <FormFeedback>{errorState.password}</FormFeedback>
                        ) : null}
                    </FormGroup>
                    <FormGroup>
                        <Label for="phone">Phone Number</Label>
                        <Input 
                            type="tel" 
                            name="phone" 
                            id="phone" 
                            placeholder="123-456-9999" 
                            onChange={handleChange}
                            value={formState.phone}
                            invalid={errorState.phone.length > 0}
                        />
                        {errorState.phone.length > 0 ? (
                            <FormFeedback>{errorState.phone}</FormFeedback>
                        ) : null}
                    </FormGroup>
                    <Button disabled={buttonDisabled}>
                        Submit
                        {loading && <Spinner color="primary" size='sm' style={{ marginLeft: '10px' }}/>}
                    </Button>                    
                </Form>
            </div>
        </div>
    );
};

export default SignUpForm; 