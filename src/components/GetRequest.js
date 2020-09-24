import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axioswithAuth from '../utils/axiosWithAuth';


const GetRequest = () => {
    const [potLuck, setPotLucks] = useState([]);

    useEffect(() => {
        axioswithAuth()
            .get('/api/potlucks')
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return(
        <h1>Hello</h1>
    )
}

export default GetRequest;

