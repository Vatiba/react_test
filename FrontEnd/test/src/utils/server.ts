import axios from 'axios';

export const baseUrl = 'http://localhost:3001';

export const axiosInstance = axios.create({
   baseURL: baseUrl,
   timeout: 10000,
})
