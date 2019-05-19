import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:3000/user/",
    headers:{
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
});
export default instance;