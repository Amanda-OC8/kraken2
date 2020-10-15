import axios from 'axios'

export default class ProfileService {

    constructor() {
        this.api = axios.create({
            // baseURLLocal: 'http://localhost:5000/api/',
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    getProfile = () => this.api.get(`/profile`)
    editProfile = profile => this.api.put(`/profile/edit`, profile)
    getOwnProjects = () => this.api.get(`/profile/own-projects`)
}