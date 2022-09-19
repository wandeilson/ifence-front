import axios from "axios";
import StorageService from "./StorageService";

export const TOKEN = 'token';
export const LOGGED_USER = 'loggedUser';
class ApiService {

    #httpCliente;

    constructor(endpoint) {
        this.endpoint = endpoint;
        this.storageService = new StorageService();

        const token = this.storageService.getItem(TOKEN);

        this.httpClient = axios.create(
            {
                baseURL: `http://${process.env.REACT_APP_BACKEND_URL}:8080/api/`,
                withCredentials: true,
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                    "Content-Type": "application/json",
                }
            }
        );
    }

    post(url, body, config) {
        url = this.builUrl(url);
        return this.httpClient.post(url, body, config);
    }

    put(url, body, config) {
        url = this.builUrl(url);
        return this.httpClient.put(url, body, config);
    }
    patch(url, body, config) {
        url = this.builUrl(url);
        return this.httpClient.patch(url, body, config);
    }

    delete(url, config) {
        url = this.builUrl(url);
        return this.httpClient.delete(url, config);
    }

    get(url, body, config) {
        url = this.builUrl(url);
        return this.httpClient.get(url, body, config);
    }

    builUrl(url) {
        return `${this.endpoint}${url}`;
    }

}

export default ApiService;