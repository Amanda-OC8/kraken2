import React, { Component } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import Modal from 'react-bootstrap/Modal'

import ProjectEdit from './ProjectEdit'
import TreeComponent from '../../../shared/treeComponent/TreeComponent'
import TreeComponentLector from '../../../shared/treeComponent/TreeComponentLector'

import '../../modal/Modal.css'
import '../../../App.css'

import projectService from "../../../../service/project.service"


class ProjectDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: {},
            showModal: false, 
            projectLoaded: false
        }

        this.projectService = new projectService()
    }
    handleModal = showModal => {
        this.setState({ showModal })
    }


    componentDidMount = () => {

        this.loadProject()
    }

    loadProject = () => {
        this.projectService
            .getProject(this.props.match.params.project_id)
            .then(response => {
                this.setState({ projects: response.data, projectLoaded: true })
            })
            .catch(err => console.log('Error:', err))
    }

    deleteProject = () => {
        this.projectService
            .deleteProject(this.props.match.params.project_id)
            .then(response => this.setState(response.data))
            .catch(err => console.log('Error:', err))
    }

    render() {

        let user = this.state.projects.owner
        let ownProject = false
        let tagLines = ""

        if (user !== undefined) {
            user = this.state.projects.owner._id

            ownProject = (user === this.props.theUser._id)
            
        }
        
        if (this.state.projectLoaded) {
            tagLines = this.state.projects.tagLines.join()
            
        }

        return (
            <>
                <Container>
                    
                    <Row className="justify-content-md-center">
                        <Col md={{ span: 2 }}>
                                <Dropdown>
                                    <Dropdown.Toggle className="btn-shape btn-dark-mode-config" variant="dark">Acciones</Dropdown.Toggle>
                                    <Dropdown.Menu className="drop-toggle">

                                        <Dropdown.Item><Link className="nav-link link-drop" onClick={() => this.handleModal(true)}  >Editar proyecto</Link></Dropdown.Item>

                                        <Dropdown.Item><Link className="nav-link link-drop warning-drop" to="/all-projects" onClick={() => this.deleteProject()}>Borrar proyecto</Link> </Dropdown.Item>
                                        <Dropdown.Item><Link className="nav-link link-drop" to={`/all-projects`}>Volver a todos los proyectos</Link> </Dropdown.Item>
                                        <Dropdown.Item><Link className="nav-link link-drop" to={`/profile`}>Volver a tu perfil</Link> </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                        </Col>


                        <Col md={{ span: 8 }} >
                            <h2>{this.state.projects.title}</h2>
                            <h4>Género: {this.state.projects.genre}</h4>
                            <Row >
                                <Col md={{ span: 4 }}> <p>Taglines: {tagLines}</p> </Col>
                                <Col md={{ span: 4, offset: 4 }}> <p>Tipo de proyecto: {this.state.projects.type}</p> </Col>
                            </Row>
                            <h3>Sinópsis/resumen</h3>
                            <p>{this.state.projects.synopsis}</p>
                            <Link className="btn-shape btn-dark-mode-config" to={`/projects/story/${this.props.match.params.project_id}`}>Ver historia</Link>
                        </Col>

                        <Col className="m-auto" md={{ span: 2 }} >
                            <h2>Árbol contenido</h2>
                            {ownProject && < TreeComponent {...this.props} />}
                            {!ownProject && < TreeComponentLector {...this.props} />}

                        </Col>

                    </Row>

                </Container >

                <Modal show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar perfil</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ProjectEdit {...this.props} closeModal={() => this.handleModal(false)} refreshList={this.loadProject} />
                    </Modal.Body>
                </Modal>
            </>

        )
    }
}
export default ProjectDetails