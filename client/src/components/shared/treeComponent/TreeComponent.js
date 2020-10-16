import React, { Component } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'


import Collapse from 'react-bootstrap/Collapse'
import NavLink from 'react-bootstrap/NavLink'
import Modal from 'react-bootstrap/Modal'

import Add from './add.svg'
import Edit from './edit-color.svg'
import Delete from './delete.svg'
import FolderNew from '../../pages/folders/FolderNew'
import FolderEdit from '../../pages/folders/FolderEdit'
import './TreeComponent.css'

import commonService from '../../../service/common.service'
import characterService from '../../../service/character.service'
import folderService from '../../../service/folder.service'
import archiveService from '../../../service/archive.service'

class TreeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            treeComponent: [],
            components: [],
            showMoreCharac: false,
            showMoreFolders: false,
            showMoreArchives: false,
            showModalNewFolder: false,
            showModalEditFolder: false,
            showModalDeleteAlert: false,
            selectFolder: "",
            deleteType: "",
            firstDeleteId: "",
            secondDeleteId: ""

        }
        this.commonService = new commonService()
        this.characterService = new characterService()
        this.folderService = new folderService()
        this.archiveService = new archiveService()


    }

    componentDidMount = () => this.loadCommon()

    loadCommon = () => {

        this.commonService
            .getTree(this.props.match.params.project_id)
            .then(response => this.setState({ components: response.data }))
            .catch(err => console.log('Error:', err))

    }


    deleteCharacter = (character_id) => {

        this.characterService
            .deleteCharacter(this.props.match.params.project_id, character_id)
            .then(() => console.log("borrado"))
            .catch(err => console.log('Error:', err))

        this.loadCommon()
        this.handleModalDeleteAlert(false)
        this.setState({ firstDeleteId: "", secondtDeleteId: ""})
    }

    deleteFolder = (folder_id) => {

        this.folderService
            .deleteFolder(this.props.match.params.project_id, folder_id)
            .then(() => console.log("borrado"))
            .catch(err => console.log('Error:', err))

        this.loadCommon()
        this.handleModalDeleteAlert(false)
        this.setState({ firstDeleteId: "", secondtDeleteId: "" })
    }

    deleteArchive = (folder_id, archive_id) => {

        this.archiveService
            .deleteArchive(this.props.match.params.project_id, folder_id, archive_id)
            .then(() => console.log("borrado"))
            .catch(err => console.log('Error:', err))

        this.loadCommon()
        this.handleModalDeleteAlert(false)
        this.setState({ firstDeleteId: "", secondtDeleteId: "" })

    }

    showMoreTextCharac = () => this.setState({ showMoreCharac: !this.state.showMoreCharac })
    showMoreTextFolders = () => this.setState({ showMoreFolders: !this.state.showMoreFolders })
    showMoreTextArchives = () => this.setState({ showMoreArchives: !this.state.showMoreArchives })


    handleModalNewFolder = showModalNewFolder => this.setState({ showModalNewFolder })
    handleModalEditFolder = (showModalEditFolder, folderid) => { this.setState({ showModalEditFolder, selectFolder: folderid }) }

    handleModalDeleteAlert = (showModalDeleteAlert, type, firstId, secondId) => { this.setState({ showModalDeleteAlert, deleteType: type, firstDeleteId: firstId, secondDeleteId: secondId }) }


    createNode = () => {
        let tree = { characters: [], folders: [], nested: [], archives: [] }

        this.state.components.map(elm => elm.map(subelm => {

            if (subelm.model === "Character") {

                tree.characters.push({ name: `${subelm.name} ${subelm.surname}`, id: subelm._id })

            } else if (subelm.model === "Folder") {

                if (subelm.archives.length) {

                    subelm.archives.map(arElm => arElm.parentFolder === subelm._id ? tree.archives.push({ name: arElm.name, id: arElm._id }) : null)
                }

                if (tree.archives.length) {
                    tree.nested.push({ parent: { name: subelm.name, id: subelm._id }, nested: tree.archives })
                } else {
                    tree.folders.push({ name: subelm.name, id: subelm._id })
                }
                tree.archives = []
            }

        }))

        return tree


    }


    render() {
        let treeC = {}
        let existTree = false
        let hasCharacters = false
        let hasFolders = false
        let hasArchives = false
        if (this.state.components.length !== 0) {
            treeC = this.createNode()
            existTree = true
            if (treeC.characters.length) {
                hasCharacters = true
            }
            if (treeC.folders.length) {
                hasFolders = true
            }
            if (treeC.archives.length) {
                hasArchives = true
            }
           


        }
        
        console.log(treeC)

        return (
            <>

                <ul>
                    {hasCharacters && <h4><Link className="tree-link" to={`/projects/${this.props.match.params.project_id}/all-characters`}>Personajes</Link> <Link to={`/projects/${this.props.match.params.project_id}/character/new`}><img className="image" src={Add} alt="Añadir"></img></Link></h4>}

                    {!hasCharacters && <h4>Personajes  <Link to={`/projects/${this.props.match.params.project_id}/character/new`}><img className="image" src={Add} alt="Añadir"></img></Link></h4>}
                    
                    {!this.state.showMoreCharac && <NavLink onClick={this.showMoreTextCharac} className="show-more">Mostrar todos</NavLink>}
                    {this.state.showMoreCharac && <NavLink onClick={this.showMoreTextCharac} className="show-more">Ocultar todos</NavLink>}
                    <Collapse in={this.state.showMoreCharac}>
                        <span>
                            {existTree && treeC.characters.map((elm, index) => <li key={index}><Link className="tree-link" to={`/projects/${this.props.match.params.project_id}/character/${elm.id}/details`}>{elm.name}</Link>

                                <Link to={`/projects/${this.props.match.params.project_id}/${elm.id}/character/edit`}><img className="image" src={Edit} alt="Editar" /></Link>

                                <Link onClick={() => this.handleModalDeleteAlert(true, "character", elm.id, null)}><img className="image" src={Delete} alt="Eliminar"></img></Link></li>)}
                        </span>
                    </Collapse>


                    <br />
                    <h4>Carpetas<Link onClick={() => this.handleModalNewFolder(true)}><img className="image" src={Add} alt="Añadir"></img></Link></h4>
                    {!this.state.showMoreFolders && <NavLink onClick={this.showMoreTextFolders} className="show-more">Mostrar todas</NavLink>}
                    {this.state.showMoreFolders && <NavLink onClick={this.showMoreTextFolders} className="show-more">Ocultar todas</NavLink>}

                    <Collapse in={this.state.showMoreFolders}>
                        <span>
                            {existTree && treeC.folders.map((elm, index) => <li key={index}><Link className="tree-link" to={`/projects/${this.props.match.params.project_id}/folder/${elm.id}/details`}>{elm.name}</Link>
                                <Link to={`/projects/${this.props.match.params.project_id}/folder/${elm.id}/archive/new`}><img className="image" src={Add} alt="Añadir"></img></Link>
                                <Link onClick={() => this.handleModalEditFolder(true, elm.id)}><img className="image" src={Edit} alt="Editar" /></Link>
                                
                                <Link onClick={() => this.handleModalDeleteAlert(true, "folder", elm.id, null)}><img className="image" src={Delete} alt="Eliminar"></img></Link></li>)}


                            {existTree && treeC.nested.map((elm, index) => <li key={index}><Link className="tree-link" to={`/projects/${this.props.match.params.project_id}/folder/${elm.parent.id}/details`}>{elm.parent.name}</Link> <Link to={`/projects/${this.props.match.params.project_id}/folder/${elm.parent.id}/archive/new`}><img className="image" src={Add} alt="Añadir"></img></Link>
                                
                                <Link onClick={() => this.handleModalEditFolder(true, elm.parent.id)}><img className="image" src={Edit} alt="Editar" /></Link>
                                <Link onClick={() => this.handleModalDeleteAlert(true, "folder", elm.parent.id, null)}><img className="image" src={Delete} alt="Eliminar"></img></Link></li>)}

                        </span>
                    </Collapse>
                    <br />
                    
                    <h4>Archivos</h4>
                    {!this.state.showMoreArchives && <NavLink onClick={this.showMoreTextArchives} className="show-more">Mostrar todos</NavLink>}
                    {this.state.showMoreArchives && <NavLink onClick={this.showMoreTextArchives} className="show-more">Ocultar todos</NavLink>}
                    <Collapse in={this.state.showMoreArchives}>
                        <span>
                            {existTree &&
                                <ul>
                                    {treeC.nested.map(elm => elm.nested ? elm.nested.map((subelm, index) => <li key={index}>{elm.parent.name}: <Link className="tree-link" to={`/projects/${this.props.match.params.project_id}/folder/${elm.parent.id}/archive/${subelm.id}/details`}>{subelm.name}</Link>

                                        <Link to={`/projects/${this.props.match.params.project_id}/folder/${elm.parent.id}/${subelm.id}/archive/edit`}><img className="image" src={Edit} alt="Editar" /></Link>
                                        <Link onClick={() => this.handleModalDeleteAlert(true, "archive", elm.parent.id, subelm.id)}><img className="image" src={Delete} alt="Eliminar"></img></Link></li>) : null)}
                                </ul>}
                        </span>
                    </Collapse>
                </ul>

                <Modal show={this.state.showModalNewFolder} onHide={() => this.handleModalNewFolder(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Crear nueva carpeta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FolderNew {...this.props} closeModal={() => this.handleModalNewFolder(false)} refreshList={this.loadCommon} />
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.showModalEditFolder} onHide={() => this.handleModalEditFolder(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar la carpeta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FolderEdit{...this.props} folder_id={this.state.selectFolder} closeModal={() => this.handleModalEditFolder(false)} refreshList={this.loadCommon} />
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.showModalDeleteAlert} onHide={() => this.handleModalDeleteAlert(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>¡Cuidado vas a borrar!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Vas a borrar este elemento y sus elementos hijos, ¿es lo que quieres hacer?

                        {this.state.deleteType === "character" && <Link className="btn-shape btn-dark-mode-warning" onClick={() => this.deleteCharacter(this.state.firstDeleteId)}> Sí </Link>}
                        {this.state.deleteType === "folder" && <Link className="btn-shape btn-dark-mode-warning" onClick={() => this.deleteFolder(this.state.firstDeleteId)}>Sí</Link>}
                        {this.state.deleteType === "archive" && <Link className="btn-shape btn-dark-mode-warning" onClick={() => this.deleteArchive(this.state.firstDeleteId, this.state.secondDeleteId)}> Sí </Link>}


                        <Link className="btn-shape btn-dark-mode-config" onClick={() => this.handleModalDeleteAlert(false)}>No</Link>

                    </Modal.Body>
                </Modal>








            </>
        )
    }
}

export default TreeComponent