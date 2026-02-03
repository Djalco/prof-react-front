import apiClient from './api.service';
import { API_ENDPOINTS } from '../config/api.config';

class AuthService {
    async login(credentials) {
        return apiClient.post(API_ENDPOINTS.AUTH, credentials);
    }
}

const authService = new AuthService();
export default authService;
