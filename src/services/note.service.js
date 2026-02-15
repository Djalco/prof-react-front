const { API_ENDPOINTS } = require("../config/api.config");
const { default: apiClient } = require("./api.service");

class NoteService {
    async create(data){
        return apiClient.post(API_ENDPOINTS.NOTES, data);
    }
    
    async saveBulk(data) {
        // Envoie l'objet { notes: [...] } à ton API
        return apiClient.post(`${API_ENDPOINTS.NOTES}/bulk`, data);
    }
    
}
const noteService = new NoteService();
export default noteService;