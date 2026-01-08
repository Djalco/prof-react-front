import axios from 'axios';
const rootURL = 'http://localhost:8080/api/v1';

class ProfService{
    getAll(){
        return axios.get(rootURL+"/profs")
    }
    getById(id){
        return axios.get(rootURL + "/profs/" + id)
    }
    update(id,data){
        return axios.put(rootURL + "/profs/" + id,data)
    }
    create(data) {
        return axios.post(rootURL + "/profs",data)
    }
    remove(id){
        return axios.delete(rootURL + "/profs/"+id)
    }

}

export default new ProfService();