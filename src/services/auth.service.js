import apiClient from './api.service';
import { API_ENDPOINTS } from '../config/api.config';

class AuthService {
    async login(credentials) {
        return apiClient.post(API_ENDPOINTS.AUTH, credentials);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();
