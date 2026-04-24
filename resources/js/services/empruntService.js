import api from '../api';

const empruntService = {
    getAll: async (page = 1) => {
        const response = await api.get(`/emprunts?page=${page}`);
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/emprunts/${id}`);
        return response.data;
    },

    create: async (empruntData) => {
        const response = await api.post('/emprunts', empruntData);
        return response.data;
    },

    update: async (id, empruntData) => {
        const response = await api.put(`/emprunts/${id}`, empruntData);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/emprunts/${id}`);
        return response.data;
    },

    returnBook: async (id) => {
        const response = await api.post(`/emprunts/${id}/retour`);
        return response.data;
    }
};

export default empruntService;
