import axios from 'axios';
const baseURL = "https://api.themoviedb.org/3/";
export const initialParams = {
        language: 'en-US'
};
const options = {
        baseURL,
        headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTc3ODNlMTUwNjRhZjU0ZTc2ZjVjZTcwNmVmMmRjYSIsInN1YiI6IjY1ZTYxNzFiYmU3ZjM1MDE2M2IzMzQzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wxkqHUml8YBANueJ3D_FtPUaDDR17Ker1qTULroebH0`
        },
};

const axiosClient = axios.create(options);

export default axiosClient;
