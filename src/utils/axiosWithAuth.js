import axios from 'axios';

export const axioswithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create ({
        baseURl: 'https://prettypoppinpotlucks.herokuapp.com/',
        headers: {
            Authorization: token
        }
    });
};

export default axioswithAuth;
