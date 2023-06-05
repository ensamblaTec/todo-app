import axios from 'axios';

export default axios.create(
    {
        baseURL: 'ec2-44-210-90-241.compute-1.amazonaws.com:8000/api/v1', // Base route to send request
        responseType: 'json',
        timeout: 5000,
    }
)