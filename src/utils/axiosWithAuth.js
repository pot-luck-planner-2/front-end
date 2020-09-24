import axios from 'axios';

export const axioswithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create ({
       baseURL: 'https://cors-anywhere.herokuapp.com/https://prettypoppinpotlucks.herokuapp.com',
       headers: {
            Authorization: token
        }
    });
};

export default axioswithAuth;
