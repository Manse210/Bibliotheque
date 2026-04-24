import api from '../api';

const lecteurService = {
    getAll: async (page = 1) => {
        const response = await api.get(`/lecteurs?page=${page}`);
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/lecteurs/${id}`);
        return response.data;
    },

    create: async (lecteurData) => {
        const response = await api.post('/lecteurs', lecteurData);
        return response.data;
    },

    update: async (id, lecteurData) => {
        const response = await api.put(`/lecteurs/${id}`, lecteurData);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/lecteurs/${id}`);
        return response.data;
    }
};

export default lecteurService;
