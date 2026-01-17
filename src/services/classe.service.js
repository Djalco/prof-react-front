import apiClient from './api.service';
import { API_ENDPOINTS } from '../config/api.config';

class ClasseService {
    
    async getAll() {
        return apiClient.get(API_ENDPOINTS.CLASSES);
    }

    async getById(id) {
        return apiClient.get(`${API_ENDPOINTS.CLASSES}/${id}`); 
    }

    async create(data) {
        return apiClient.post(API_ENDPOINTS.CLASSES, data);
    }

    async update(id, data) {
        return apiClient.put(`${API_ENDPOINTS.CLASSES}/${id}`, data);
    }

    async remove(id) {
        return apiClient.delete(`${API_ENDPOINTS.CLASSES}/${id}`);
    }

    async assignProfs(classeId, profIds) {
        return apiClient.post(`${API_ENDPOINTS.CLASSES}/${classeId}/profs`, { profIds });
    }

    async getProfs(classeId) {
        return apiClient.get(`${API_ENDPOINTS.CLASSES}/${classeId}/profs`);
    }

    async getClassesByProf(profId) {
        return apiClient.get(`/profs/${profId}/classes`);
    }

    async getEtudiants(classeId) {
        return apiClient.get(`${API_ENDPOINTS.CLASSES}/${classeId}/etudiants`);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ClasseService();