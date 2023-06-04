import axios from 'axios';

export default axios.create(
    {
        baseURL: 'http://localhost:8000/api/v1', // Base route to send request
        responseType: 'json',
        timeout: 5000,
    }
)