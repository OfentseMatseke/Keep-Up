import axios from "axios";
const BASE_ENDPOINT = process.env.API_KEY;

 // Set config defaults
const http = axios.create({
    baseURL: BASE_ENDPOINT
});

http.interceptors.response.use(null,error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedError)
    {
        console.log('Unexpected Error - ',error.message);
    }
    return Promise.reject(error);
})
export {http } ;