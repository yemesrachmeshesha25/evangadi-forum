import axios from 'axios';

const axiosBase = axios.create({
    // baseURL: 'http://localhost:5500/api'
    baseURL: "https://evangadi-backend-deploy-xt7c.onrender.com/api"
})

export default axiosBase