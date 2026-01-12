import apiClient from './api.service';
import { API_ENDPOINTS } from '../config/api.config';

class ProfService {
    async getAll() {
        return apiClient.get(API_ENDPOINTS.PROFS);
    }

    async getById(id) {
        return apiClient.get(`${API_ENDPOINTS.PROFS}/${id}`);
    }

    async create(data) {
        return apiClient.post(API_ENDPOINTS.PROFS, data);
    }

    async update(id, data) {
        return apiClient.put(`${API_ENDPOINTS.PROFS}/${id}`, data);
    }

    async remove(id) {
        return apiClient.delete(`${API_ENDPOINTS.PROFS}/${id}`);
    }

    async assignClasses(profId, classeIds) {
        return apiClient.post(`${API_ENDPOINTS.PROFS}/${profId}/classes`, { classeIds });
    }

    async getClasses(profId) {
        return apiClient.get(`${API_ENDPOINTS.PROFS}/${profId}/classes`);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProfService();
