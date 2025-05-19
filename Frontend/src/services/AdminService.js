import axios from "axios";

const ADMIN_AUTH_BASE_URL = "http://localhost:8080/admin"

export async function authAdmin(admin) {
    return axios.post(ADMIN_AUTH_BASE_URL + '/login', admin)
        .then(response => {
            if (response.data.token) {
                sessionStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
}