import axios from 'axios';
import { API_BASE_URL } from '../config/api.config';
import { authUtils } from '../utils/auth';

// Configuration globale axios
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Intercepteur pour ajouter le token à chaque requête
apiClient.interceptors.request.use(
    (config) => {
        const token = authUtils.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercepteur pour gérer les erreurs d'authentification
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            authUtils.removeToken();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;
