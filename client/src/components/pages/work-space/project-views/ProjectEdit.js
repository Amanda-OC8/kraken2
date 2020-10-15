import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import projectService from "../../../../service/project.service"

class ProjectEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.projectService = new projectService()
    }

    componentDidMount = () => {
        this.projectService
            .getProject(this.props.match.params.project_id)
            .then(response => this.setState(response.data))
            .catch(err => console.log('Error:', err))
    }

    handleInputChange = e => {
        let { name, value } = e.target
        if (name === "tagLines") {
            value = e.target.value.split(",")
        }
        if (name === "isPublic") {
            value = e.target.checked
        }

        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {

        e.preventDefault()

        this.setState({ owner: this.props.theUser._id })
        this.projectService
            .editProject(this.props.match.params.project_id, this.state)
            .then(() => {
                console.log(this.props)
                this.props.closeModal()
                this.props.refreshList()
            })
            .catch(err => console.log('Error:', { err }))
    }

    render() {
        console.log(this.state)
        const genreList = ["Fantasía", "Terror", "Ciencia-Ficción", "Space Opera", "Romance", "Aventura", "Erótico", "FanFiction", "Histórico", "Misterio", "Religioso/Espiritual", "Sátira/Humor", "Suspense", "Otro (Cuéntanos más en la sinopsis"]
        const typeList = ["World-Building", "Novela", "Juego de Rol", "Guión de Viddeojuego", "Guión para Cómic", "Guión de Serie/Película", "Guión de Teatro", "Relato/s"]
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col md={{ span: 12 }}>
                        <h2>Editar proyecto</h2>
                        <h5>Los campos con asteriscos son obligatorios</h5>
                        <Form onSubmit={this.handleFormSubmit}>
                            <Form.Group>
                                <Form.Label>Nombre del Proyecto*</Form.Label>
                                <Form.Control required type="text" name="title" value={this.state.title} placeholder={this.state.title} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Género*</Form.Label>
                                <Form.Control required as="select" custom name="genre" value={this.state.genre} placeholder={this.state.genre} onChange={this.handleInputChange}>
                                    <option>---Selecciona</option>
                                    {genreList.map(elm => <option value={elm} > {elm} </option>)}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Tags separados por comas* (ej: comedia, viajes en el tiempo...)</Form.Label>
                                <Form.Control required type="text" name="tagLines" value={this.state.tagLines} placeholder={this.state.tagLines} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Tipo de proyecto*</Form.Label>
                                <Form.Control required as="select" custom name="type" value={this.state.type} placeholder={this.state.type} onChange={this.handleInputChange}>
                                    <option>---Selecciona</option>
                                    {typeList.map(elm => <option value={elm} > {elm} </option>)}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Sinopsis o resumen*</Form.Label>
                                <Form.Control required as="textarea" rows="5" name="synopsis" value={this.state.synopsis} placeholder={this.state.synopsis} onChange={this.handleInputChange}>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Check name="isPublic" value={this.state.isPublic} onChange={this.handleInputChange} label="¿Deseas que el proyecto sea público?">
                                </Form.Check>
                                <Form.Label> Podrás cambiarlo en cualquier momento.</Form.Label>
                            </Form.Group>

                            <Button className="btn-shape btn-dark-mode-config" variant="dark" type="submit">Editar</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default ProjectEdit