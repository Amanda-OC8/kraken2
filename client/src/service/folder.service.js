import axios from 'axios'

export default class FolderService {

    constructor() {
        this.api = axios.create({
            // baseURLLocal: 'http://localhost:5000/api/',
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    getAllFolders = project_id => this.api.get(`/folder/allfolders/project/${project_id}`)
    getFolder = (project_id, folder_id) => this.api.get(`/folder/${folder_id}/project/${project_id}`)
    newFolder = (project_id, folder) => this.api.post(`/folder/new/project/${project_id}`, folder)
    editFolder = (project_id, folder_id, folder) => this.api.put(`/folder/${folder_id}/edit/project/${project_id}`, folder)
    deleteFolder = (project_id, folder_id) => this.api.delete(`/folder/${folder_id}/delete/project/${project_id}`)
}