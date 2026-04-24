import api from '../api';

const livreService = {
    getAll: async (page = 1) => {
        const response = await api.get(`/livres?page=${page}`);
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/livres/${id}`);
        return response.data;
    },

    create: async (livreData) => {
        const response = await api.post('/livres', livreData);
        return response.data;
    },

    update: async (id, livreData) => {
        const response = await api.put(`/livres/${id}`, livreData);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/livres/${id}`);
        return response.data;
    }
};

export default livreService;
