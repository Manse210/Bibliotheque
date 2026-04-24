import api from '../api';

const authService = {
    login: async (credentials) => {
        const response = await api.post('/login', credentials);
        if (response.data.token) {
            localStorage.setItem('user_token', response.data.token);
        }
        return response.data;
    },

    logout: async () => {
        await api.post('/logout');
        localStorage.removeItem('user_token');
    },

    getCurrentUser: async () => {
        const response = await api.get('/user');
        return response.data;
    }
};

export default authService;
