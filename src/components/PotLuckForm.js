import React, { useState, useEffect } from 'react';
import * as yup from 'yup';

import Axios from 'axios';
import axioswithAuth from '../utils/axiosWithAuth';

import styled from "styled-components";

const formSchema = yup.object().shape({
    name: yup.string().required('Please create a Potluck Name'),
    location: yup.string().required('Please enter a Potluck location'),
    date: yup.string().required('Please enter a date for the Potluck'),
});

const PotLuckForm = () => {
    const [potLuckState, setPotLuckState] = useState({
        name: '',
        location: '',
        date: '',
        host_id: ''
    });

    const [errorState, setErrorState] = useState({
        name: '',
        location: '',
        date: '',
        host_id: ''
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        formSchema.isValid(potLuckState).then((valid) => {
            setButtonDisabled(!valid);
        });
    }, [potLuckState]);

    const validate = e => {
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

    const formSubmit = e => {
        e.preventDefault();
        console.log('created a new potluck')

        axioswithAuth()
        .post('/potlucks', potLuckState)
        .then((res) => {
            setPotLuckState(res.data);
        })
        .catch((err) => console.log(err))
    };

    const handleChange = e => {
        e.persist();
        validate(e);
        setPotLuckState({ ...potLuckState, [e.target.name]: e.target.value});
    };

    return (
        <PotLuck>
            <form onSubmit={ formSubmit }>
                <label>Name - Add a memorable name to your potluck.
                    <input 
                        type='text'
                        name='name'
                        id='name'
                        value={ potLuckState.name } 
                        onChange={ handleChange }
                    />
                    { errorState.name.length > 0 ? <p>{ errorState.name }</p> : null}
                </label>
                <label>Location - Identify where the potluck will be located (i.e Davidson, North Carolina).
                    <input 
                        type='text'
                        name='location'
                        id='location'
                        value={ potLuckState.location } 
                        onChange={ handleChange }
                    />
                    { errorState.location.length > 0 ? <p>{ errorState.location }</p> : null}
                </label>
                <label>Date - When will your potluck take place?
                    <input 
                        type='date'
                        name='date'
                        id='date'
                        value={ potLuckState.date }
                        onChange={ handleChange }
                    />
                    { errorState.date.length > 0 ? <p>{ errorState.date }</p> : null}
                </label>
                <button type='submit' disabled= { buttonDisabled }>
                    Create a Potluck
                </button>
            </form>
        </PotLuck>
    );
};

export default PotLuckForm;

const PotLuck = styled.div`
    background-color: green;
    margin: 1rem;
    border: .2rem solid black;
    border-radius: .5rem;

    form  {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    label {
        margin: .5rem;
        display: flex;
        flex-direction: column;
        font-size: 1.2rem;
        font-weight: bolder;
        max-width: 60vw
    }
    
    input {
        margin: .5rem;
    }

    button {
        background-color: white;
        color: green;
        font-size: 1rem;
        font-weight: bolder;
        border: .2rem solid black;
        border-radius: .2rem;
        max-width: 25vw;
        margin: .5rem;
        padding: .5rem;

    }
`