import apiClient from './api.service';
import { authUtils } from '../utils/auth';

class EtudiantAuthService {
    async login(email, nom) {
        const response = await apiClient.post('/etudiants/auth', { email, nom });
        
        if (response.data.status === 'success') {
            const { token, userId, nom: etudiantNom, prenom, email: etudiantEmail, role } = response.data;
            
            // Stocker le token
            authUtils.setToken(token);
            
            // Stocker les informations de l'étudiant
            localStorage.setItem('userId', userId);
            localStorage.setItem('userName', `${etudiantNom} ${prenom}`);
            localStorage.setItem('userEmail', etudiantEmail);
            localStorage.setItem('userRole', role);
        }
        
        return response;
    }
}

const etudiantAuthService = new EtudiantAuthService();
export default etudiantAuthService;