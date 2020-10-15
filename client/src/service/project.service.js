import axios from 'axios'

export default class ProjectService {

    constructor() {
        this.api = axios.create({
            // baseURLLocal: 'http://localhost:5000/api/',
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    getProject = project_id => this.api.get(`/project/${project_id}`)
    newProject = project => this.api.post('/project/new', project)
    editProject = (project_id, project) => this.api.put(`/project/${project_id}/edit`, project)
    deleteProject = project_id => this.api.delete(`/project/${project_id}/delete`)
    getAllProjects = () => this.api.get('/project/all')
    // getTimeline = project_id => this.api.get(`/timeline/project/${project_id}`)
    // editTimeline = project_id => this.api.put(`/timeline/edit/project/${project_id}`)
    // addTimeline = project_id => this.api.post(`/timeline/new/project/${project_id}`)
    getStory = project_id => this.api.get(`/project/story/${project_id}`)

}