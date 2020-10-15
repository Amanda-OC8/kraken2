import axios from 'axios'

export default class CharacterService {

    constructor() {
        this.api = axios.create({
            // baseURLLocal: 'http://localhost:5000/api/',
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    getAllCharacters = project_id => this.api.get(`/character/allcharacters/project/${project_id}`)
    getCharacter = (project_id, character_id) => this.api.get(`/character/${character_id}/project/${project_id}`)
    newCharacter = (project_id, character) => this.api.post(`/character/new/project/${project_id}`, character)
    editCharacter = (project_id, character_id, character) => this.api.put(`/character/${character_id}/edit/project/${project_id}`, character)
    deleteCharacter = (project_id, character_id) => this.api.delete(`/character/${character_id}/delete/project/${project_id}`)
}