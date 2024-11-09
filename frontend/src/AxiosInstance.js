import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://nits-7-0.onrender.com/api'
});

export default axiosInstance;
