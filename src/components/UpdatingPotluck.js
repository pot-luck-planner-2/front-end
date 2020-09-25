import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

import axiosWithAuth from '../utils/axiosWithAuth';
import PotLuckForm from './PotLuckForm';
import PotLuckContext from '../contexts/PotLuckContext';

import styled from "styled-components";

const host_id= Number(localStorage.getItem('userID'));

const initialPotLuck = {
    name: '',
    location: '',
    date: '',
    host_id: host_id
}

const UpdatingPotLuck = () => {
    const { potLucks, setPotLucks } = useContext(PotLuckContext);
    const [potLuckEdit, setPotLuckEdit] = useState(initialPotLuck);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        axiosWithAuth()
            .get('/api/potlucks')
            .then((res) => {
                setPotLucks(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    const handleChange = e => {
        e.persist();
        setPotLuckEdit({ ...potLuckEdit, [e.target.name]: e.target.value});
    };

    const editPotLuck = (potLuck) => {
        
        setEditing(!editing);
        setPotLuckEdit({id: potLuck.id, name: potLuck.name, location: potLuck.location, date: potLuck.date, host_id:host_id});
        console.log(potLuck);
    }

    const saveEdit = () => {
        console.log(potLuckEdit)
        setEditing(false);

        potLuckEdit.date = potLuckEdit.date.split('T')[0];
        console.log(potLuckEdit)

        axiosWithAuth()
            .put(`/api/potlucks/${potLuckEdit.id}`, potLuckEdit)
            .then((res) => {
                console.log('Edit put response:', res.data)
            })
            .catch((err) => {
                console.log('Edit put error:', err)
            })
    }

    const deletePotLuck = e => {
        axiosWithAuth()
            .delete(`/api/potlucks/${potLuckEdit.id}`)
            .then((res) => {
                console.log('delete res:', res);
            })
            .catch(err => console.log('delete err:', err));
    }

    return (
        <Container>
            <PotLuckForm/>
                {potLucks.map((potLuck) => (
                    <Potluck key={potLuck.id} onClick={() => editPotLuck(potLuck)}>
                        <div>
                            <h3>{potLuck.name}</h3>
                            <h4>{potLuck.location}</h4>
                            <h4>{potLuck.date.split('T')[0]}</h4>
                            <button onClick={() => editPotLuck(potLuck)}>
                                Edit
                            </button>
                        </div>
                    </Potluck>
                ))}
            { editing && (
            <EditForm>
                <form>
                    <h2>Edit a Potluck</h2>
                    <label>Name - Add a memorable name to your potluck.
                        <input
                            type='text'
                            name='name'
                            id='name'
                            value={ potLuckEdit.name } 
                            onChange={ handleChange }
                        />
                    </label>
                    <label> Location - Enter the address of the potluck.
                    <input
                        type='text'
                        name='location'
                        id='location'
                        value={ potLuckEdit.location } 
                        onChange= { handleChange }
                    />
                    </label>
                    <label> Date - When will your potluck take place?
                    <input
                        type='text'
                        name='date'
                        id='date'
                        value={ potLuckEdit.date.split('T')[0] }
                        onChange= { handleChange }
                    />
                    </label>       
                    <button onClick= { () => {saveEdit()} }>Submit Changes</button>
                    <button onClick={deletePotLuck}>
                            Delete
                        </button>
                </form>
            </EditForm>
            )}
        </Container>
    )
}

export default UpdatingPotLuck;

const Container = styled.div`
    display: flex: 
    flex-direction: row;
    flex-wrap: wrap;
`

const EditForm = styled.div`
    background-color: lightblue;
    margin: 1rem;
    border: .2rem solid black;
    border-radius: .5rem;
    float: right;

    h2 {
        text-align: center;
    }

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
        color: black;
        font-size: 1rem;
        font-weight: bolder;
        border: .2rem solid black;
        border-radius: .5rem;
        max-width: 25vw;
        margin: .5rem;
        padding: .5rem;
`

const Potluck = styled.div`
        display: flex;
        flex-direction: column;
        width: 50vw;
        float: left;
        align-items: center;

        h3, h4 {
            text-align: center;
        }

        div {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: .2rem solid black;
            border-radius: .5rem;
            min-width: 40vw;
            max-width: 40vw;
            margin: 1rem;
            padding: 1rem;
        }

        button {
            background-color: white;
            color: black;
            font-size: 1rem;
            font-weight: bolder;
            border: .2rem solid black;
            border-radius: .5rem;
            max-width: 25vw;
            margin: .5rem;
            padding: .5rem;
`