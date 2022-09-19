import {Buffer} from 'buffer';
import ApiService, {LOGGED_USER, TOKEN} from "./ApiService";
import StorageService from './StorageService';

export class AuthenticationService extends ApiService{

    constructor() {
        super('');
        this.storageService = new StorageService();
        const token = this.storageService.getItem(TOKEN);

        this.registerToken(token);
    }

    async login(username, password) {
        const userDetails = {
            username,
            password
        };

        return this.post("/login", userDetails)
            .then((response) => {
                const user = response.data.user;
                const token = response.data.token;

                this.storageService.setItem(
                    TOKEN,
                    token
                );
                this.storageService.setItem(LOGGED_USER, user);
                this.registerToken(token);

                return user;
            })
            .catch(error=>null);
    }
    logout() {
        this.storageService.removeItem(TOKEN);
        this.storageService.removeItem(LOGGED_USER);

        return this.post('/logout');
    }

    #parseJwt(token) {
        const base64Url = token.split(".")[1];

        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

        const jsonPayload = decodeURIComponent(
            Buffer.from(base64, "base64")
                .toString("binary")
                .split("")
                .map((c) => {
                    return (
                        "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join("")
        );

        return JSON.parse(jsonPayload);
    }

    async isValidToken() {
        return this.post("/isValidToken", {
                token: this.storageService.getItem(TOKEN),
                user: this.storageService.getItem(LOGGED_USER)
            })
            .then((response) => {
                return response.data.valid;
            })
            .catch((error) => false);
    }

    getLoggedUser() {
        return this.storageService.getItem(LOGGED_USER);
    }

    getToken() {
        return this.storageService.getItem(TOKEN);
    }

    async isAuthenticated() {
        const user = this.getLoggedUser();
        const token = this.getToken();

        if(!user || !token) {return false;}

        return this.isValidToken();
    }
    registerToken(token) {
        if(token) {
            this.httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
    }
}

export default AuthenticationService;