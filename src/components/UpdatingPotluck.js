import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

import axiosWithAuth from '../utils/axiosWithAuth';
import PotLuckFrom from './PotLuckForm';
import PotLuckContext from '../contexts/PotLuckContext'

const initialPotLuck = {
    name: '',
    location: '',
    date: '',
    id: Date.now()
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

    const editPotLuck = (potLuck) => {
        setEditing(true);
        setPotLuckEdit(potLuck);
    }

    const saveEdit = e => {
        e.preventDefault();

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
                setPotLucks(potLuckEdit);
                setEditing(false);
            })
            .catch(err => console.log('delete err:', err));
    }

    return (
        <div>
            <PotLuckFrom/>
            <ul>
                {potLucks.map((potLuck) => (
                    <li key={potLuckEdit.id} onClick={() => editPotLuck(potLuck)}>
                        <div>
                            <h3>{potLuck.name}</h3>
                            <h4>{potLuck.location}</h4>
                            <h4>{potLuck.date}</h4>
                        </div>
                        <button onClick={saveEdit}>
                            Edit
                        </button>
                        <button onClick={deletePotLuck}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UpdatingPotLuck;

