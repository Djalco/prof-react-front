import apiClient from './api.service';
import { API_ENDPOINTS } from '../config/api.config';

class MatiereService {
    async getAll() {
        return apiClient.get(API_ENDPOINTS.MATIERES);
    }

    async getById(id) {
        return apiClient.get(`${API_ENDPOINTS.MATIERES}/${id}`);
    }

    async create(data) {
        return apiClient.post(API_ENDPOINTS.MATIERES, data);
    }

    async update(id, data) {
        return apiClient.put(`${API_ENDPOINTS.MATIERES}/${id}`, data);
    }

    async remove(id) {
        return apiClient.delete(`${API_ENDPOINTS.MATIERES}/${id}`);
    }
}

const matiereService = new MatiereService();
export default matiereService;