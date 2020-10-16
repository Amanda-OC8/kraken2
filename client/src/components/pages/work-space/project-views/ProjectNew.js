import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'



import projectService from "../../../../service/project.service"

class ProjectNew extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            genre: "",
            tagLines: "",
            type: "",
            synopsis: "",
            owner: props.theUser._id,
            isPublic: false,
            createdProject: false
        }

        this.project = new projectService()
        this.genreList = ["Fantasía", "Terror", "Ciencia-Ficción", "Space Opera", "Romance", "Aventura", "Erótico", "FanFiction", "Histórico", "Misterio", "Religioso/Espiritual", "Sátira/Humor", "Suspense", "Otro (Cuéntanos más en la sinopsis)"]
        this.typeList = ["World-Building", "Novela", "Juego de Rol", "Guión de Viddeojuego", "Guión para Cómic", "Guión de Serie/Película", "Guión de Teatro", "Relato/s"]
    }

    handleInputChange = e => {
        
        let { name, value } = e.target

        if (name === "isPublic") {
            value = e.target.checked
        }
        if (name === "tagLines") {
            value = e.target.value.split(",")
        }

        this.setState({ [name]: value })
    }







    handleFormSubmit = e => {
       
        e.preventDefault()

        let { title, genre, tagLines, type, synopsis, owner, isPublic } = this.state
        this.setState({createdProject: true})

        this.project.newProject({ title, genre, tagLines, type, synopsis, owner, isPublic })
            .then(response => console.log(response))
            .catch(err => console.log('Error:', { err }))

        this.setState({
            title: "",
            genre: "",
            tagLines: "",
            type: "",
            synopsis: "",
            owner: this.props.theUser._id,
            isPublic: false,
            createdProject: true
        })
        this.props.history.push('/all-projects')
    }

    render() {

        return (
            <Container>
                <Row className="justify-content-center">
                    <Col md={{ span: 8 }}>
                        <h2>Nuevo proyecto</h2>
                        <h5>Los campos con asteriscos son obligatorios</h5>
                        <Form onSubmit={this.handleFormSubmit}>
                            <Form.Group>
                                <Form.Label>Nombre del Proyecto*</Form.Label>
                                <Form.Control required type="text" name="title" value={this.state.title} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Género*</Form.Label>
                                <Form.Control required as="select" custom name="genre" value={this.state.genre} onChange={this.handleInputChange}>
                                    <option>---Selecciona</option>
                                    {this.genreList.map((elm, index) => <option key={index} value={elm}> {elm} </option>)}
                                </Form.Control>
                            </Form.Group>

 
                            <Form.Group>
                                <Form.Label>Tags separados por comas* (ej: comedia, viajes en el tiempo...)</Form.Label>
                                <Form.Control required type="text" name="tagLines" value={this.state.tagLines} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Tipo de proyecto*</Form.Label>
                                <Form.Control required as="select" custom name="type" value={this.state.type} onChange={this.handleInputChange}>
                                    <option>---Selecciona</option>
                                    {this.typeList.map((elm, index) => <option key={index} value={elm} > {elm} </option>)}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Sinopsis o resumen*</Form.Label>
                                <Form.Control required as="textarea" rows="5" name="synopsis" value={this.state.synopsis} onChange={this.handleInputChange}>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Check name="isPublic" value={this.state.isPublic} onChange={this.handleInputChange} label="¿Deseas que el proyecto sea público?">
                                </Form.Check>
                                <Form.Label> Podrás cambiarlo en cualquier momento.</Form.Label>
                            </Form.Group>

                            <Button className="btn-shape btn-dark-mode-config" variant="dark" type="submit">Crear</Button>
                            
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default withRouter(ProjectNew)