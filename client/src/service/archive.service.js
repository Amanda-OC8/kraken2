import axios from 'axios'

export default class ArchiveService {

    constructor() {
        this.api = axios.create({
            // baseURLLocal: 'http://localhost:5000/api/',
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    getAllArchives = (project_id, folder_id)=> this.api.get(`/archive/all/project/${project_id}/${folder_id}`)
    getArchive = (project_id, folder_id, archive_id) => this.api.get(`/archive/${archive_id}/project/${project_id}/${folder_id}`)
    newArchive = (project_id, folder_id, archive) => this.api.post(`/archive/new/project/${project_id}/${folder_id}`, archive)
    editArchive = (project_id, folder_id, archive_id, archive) => this.api.put(`/archive/${archive_id}/edit/project/${project_id}/${folder_id}`, archive)
    deleteArchive = (project_id, folder_id, archive_id) => this.api.delete(`/archive/${archive_id}/delete/project/${project_id}/${folder_id}`)
}