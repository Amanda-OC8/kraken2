import axios from 'axios'

export default class ProjectService {

    constructor() {
        this.api = axios.create({
            // baseURLLocal: 'http://localhost:5000/api/',
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    getTree = project_id => this.api.get(`/common/tree/${project_id}`)
    getWiki = project_id => this.api.get(`/common/wiki-elements/${project_id}`)  
}