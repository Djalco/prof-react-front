import apiClient from './api.service';
import { API_ENDPOINTS } from '../config/api.config';

class EtudiantService {
    async getAll() {
        return apiClient.get(API_ENDPOINTS.ETUDIANTS);
    }

    async getById(id) {
        return apiClient.get(`${API_ENDPOINTS.ETUDIANTS}/${id}`);
    }

    async create(data) {
        return apiClient.post(API_ENDPOINTS.ETUDIANTS, data);
    }

    async update(id, data) {
        return apiClient.put(`${API_ENDPOINTS.ETUDIANTS}/${id}`, data);
    }

    async remove(id) {
        return apiClient.delete(`${API_ENDPOINTS.ETUDIANTS}/${id}`);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new EtudiantService();