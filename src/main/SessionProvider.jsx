import { createContext, Component } from "react";
import {AuthenticationService} from "../services";

export const AuthContext = createContext({});
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

export default class SessionProvider extends Component {
    state = {
        loggedUser: null,
        loading: true
    }

    constructor(props) {
        super(props);

        this.authenticationService = new AuthenticationService();
        this.login = this.login.bind(this);
        this.start = this.start.bind(this);
        this.end = this.end.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
    }

    async componentDidMount() {
        const isAuthenticated = await this.authenticationService.isAuthenticated();
        if(isAuthenticated) {
            this.start();
        }

        this.setState({loading:false});
    }
    async login (username, password) {
        const user = await this.authenticationService.login(
            username,
            password
        );
        if(user) {
            this.start();

            return user;
        }
        return null;
    }

    start() {
        const loggedUser = this.authenticationService.getLoggedUser();
        const token = this.authenticationService.getToken();

        this.setState({loggedUser});
        this.authenticationService.registerToken(token);
    }

    end() {
        console.log('Encerrando Sessão');
        this.setState({loggedUser:null});
        this.authenticationService.logout();
    }

    isAuthenticated() {
        return this.state.loggedUser != null;
    }

    render() {
        if(this.state.loading){
            return false;
        }
        
        const context = {
            loggedUser: this.state.loggedUser,
            isAuthenticated: this.isAuthenticated(),
            start: this.start,
            end: this.end,
            login: this.login
        }

        return (
            <AuthProvider value={context}>
                {this.props.children}
            </AuthProvider>
        );
    }
}