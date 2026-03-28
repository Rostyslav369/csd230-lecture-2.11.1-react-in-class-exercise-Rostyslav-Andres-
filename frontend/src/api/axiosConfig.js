import axios from 'axios';

const api = axios.create({
    baseURL: '/api'
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const currentPath = window.location.pathname;

        if (
            error.response &&
            (error.response.status === 401 || error.response.status === 403) &&
            currentPath !== '/login'
        ) {
            localStorage.removeItem('token');
            window.location.href = '/login?expired=true';
        }

        return Promise.reject(error);
    }
);

export default api;