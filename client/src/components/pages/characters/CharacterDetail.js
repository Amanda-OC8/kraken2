import React, { Component } from 'react'

import characterService from "../../../service/character.service"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

import CharacterEdit from './CharacterEdit'

import './CharacterDetail.css'

class CharacterDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            character: {},
            showModal: this.props.showModal
        }
        this.characterService = new characterService()
    }

    handleModal = showModal => {
        this.setState({ showModal })
    }

    componentDidMount = () => {

        this.loadCharacter()
    }

    loadCharacter = () => {
        this.characterService
            .getCharacter(this.props.match.params.project_id, this.props.match.params.character_id)
            .then(response => {
                this.setState({ character: response.data })
            })

            .catch(err => console.log('Error:', err))
    }

    deleteCharacter = () => {
        this.characterService
            .deleteCharacter(this.props.match.params.project_id, this.props.match.params.character_id)
            .then(response => this.setState(response.data))
            .catch(err => console.log('Error:', err))
    }

    render() {
        let project = this.state.project
        let ownCharacter = false
        let physicalDescription = ""
        let personality = ""
        let habits = ""
        

        if (project !== undefined) {
            project = this.state.project._id
            console.log(this.state.character)
            ownCharacter = (project === this.props.theProject._id)
            physicalDescription = this.state.character.physicalDescription.join()
            personality = this.state.character.personality.join()
            habits = this.state.character.habits.join()

        }

        let user = this.state.character.owner
        let ownProject = false

        if (user !== undefined) {
            user = this.state.character.owner._id

            ownProject = (user === this.props.theUser._id)

        }


        return (
            <>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col className="m-auto" md={{ span: 8 }} >
                            
                            <h2>{this.state.character.name} {this.state.character.surname}</h2>


                            <Table responsive borderless={true}   >
                                <tbody>
                                    <tr>
                                        <td className="charac-title">Género: </td>
                                        <td>{this.state.character.genre}</td>
                                        <td className="charac-title">Edad: </td>
                                        <td>{this.state.character.age}</td>
                                        
                                    </tr>
                            </tbody>
                            </Table>
                            <Table responsive borderless={true} size="sm">
                                <tbody>
                                    <tr>
                                        <td className="charac-title">Descripción física:</td>
                                        <td>{this.state.character.physicalDescription}</td>
                                    </tr>
                                    <tr>
                                        <td className="charac-title">Personalidad:</td>
                                        <td colSpan="3">{this.state.character.personality}</td>
                                    </tr>
                                    <tr>
                                        <td className="charac-title">Costumbres:</td>
                                        <td colSpan="3">{this.state.character.habits}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            {ownProject && (<div><h4>Notas: </h4><p>{this.state.character.notes}</p></div>)}
                            <h3>Trasfondo</h3>
                            <p>{this.state.character.background}</p>

                        </Col>
                        <Col md={{ span: 2 }}>


                            {ownProject ? (

                                <Dropdown>
                                    <Dropdown.Toggle className="btn-shape btn-dark-mode-config fixed" variant="dark">Acciones</Dropdown.Toggle>
                                    <Dropdown.Menu className="drop-toggle">

                                        <Dropdown.Item><Link onClick={() => this.handleModal(true)} className='nav-link link-drop' >Editar personajes</Link></Dropdown.Item>

                                        <Dropdown.Item><Link className="nav-link link-drop warning-drop" to={`/projects/${this.props.match.params.project_id}/all-characters/`} onClick={() => this.deleteCharacter()}>Borrar personaje</Link> </Dropdown.Item>
                                        <Dropdown.Item><Link className="nav-link link-drop" to={`/projects/${this.props.match.params.project_id}/all-characters/`}>Volver a todos los personajes</Link> </Dropdown.Item>
                                        <Dropdown.Item><Link className="nav-link link-drop" to={`/profile`}>Volver a tu perfil</Link> </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            ) : null}
                        </Col>

                    </Row>
                </Container>
                <Modal show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar personaje</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CharacterEdit {...this.props} closeModal={() => this.handleModal(false)} refreshList={this.loadCharacter} />
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default CharacterDetail