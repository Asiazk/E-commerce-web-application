// user service for communicationg with backend using axios
import axios from "axios"

const USER_API_BASE_URL = "http://localhost:8080/api/v1/users"
const AUTH_API_BASE_URL = "http://localhost:8080/api/auth"

class UserService {
    saveUser(user) {
        return axios.post(AUTH_API_BASE_URL + '/register', user);
    }

    getUsers() {
        return axios.get(USER_API_BASE_URL);
    }

    updateUser(user, id) {
        return axios.put(USER_API_BASE_URL + '/update/' + id, user)
    }

    async authUser(user) {
        return axios.post(AUTH_API_BASE_URL + '/login', user)
        .then(response => {
            if (response.data.token) {
                sessionStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    async getUserById(id) {
        return axios.get(USER_API_BASE_URL + "/" + id)
    }


}

export default new UserService();