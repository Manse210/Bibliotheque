import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('user_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercepteur pour gérer les erreurs globales (ex: 401)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Optionnel : Rediriger vers login ou vider le storage
            localStorage.removeItem('user_token');
            // window.location.href = '/login'; 
        }
        return Promise.reject(error);
    }
);

export default api;
