import apiClient from './api.service';

class ProfAuthService {
    async login(credentials) {
        // Utilise l'endpoint d'authentification des profs
        return apiClient.post('/profs/auth', credentials);
    }
}

export default new ProfAuthService();
