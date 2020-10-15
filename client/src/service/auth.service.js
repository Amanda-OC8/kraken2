import axios from 'axios'

export default class AuthService {

    constructor() {
        this.api = axios.create({
            // baseURLLocal: 'http://localhost:5000/api/',
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    signup = user => this.api.post('/auth/signup', user)
    login = user => this.api.post('/auth//login', user)
    logout = () => this.api.post('/auth//logout')
    isLoggedIn = () => this.api.get('/auth//loggedin')
}