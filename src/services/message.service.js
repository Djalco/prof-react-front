import apiClient from './api.service';
import { API_ENDPOINTS } from '../config/api.config';

class MessageService {
    async getAll() {
        return apiClient.get(API_ENDPOINTS.MESSAGES);
    }

    async create(data) {
        return apiClient.post(API_ENDPOINTS.MESSAGES, data);
    }
}

const messageService = new MessageService();
export default messageService;