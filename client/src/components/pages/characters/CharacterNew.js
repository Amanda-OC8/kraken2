import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import characterService from "../../../service/character.service"

class CharacterNew extends Component {
    constructor(props) {
        super(props)
        this.state = {
            originProject: this.props.match.params.project_id,
            name: "",
            surname: "",
            genre: "",
            age: "",
            background: "",
            rolHistory: "",
            occupation: "",
            physicalDescription: [],
            personality: [],
            habits: [],

            owner: props.theUser._id,
            isPublic: false,
        }

        this.character = new characterService()
      


    }

    handleInputChange = e => {
        let { name, value } = e.target
        if (name === "physicalDescription") {
            value = e.target.value.split(",")
        }
        if (name === "personality") {
            value = e.target.value.split(",")
        }
        if (name === "habits") {
            value = e.target.value.split(",")
        }
        if (name === "isPublic") {
            value = e.target.checked
        }

        this.setState({ [name]: value })
        console.log(this.state)
    }

    handleFormSubmit = e => {

        e.preventDefault()

        this.character.newCharacter(this.props.match.params.project_id, this.state)
            .then(response => console.log(response))
            .catch(err => console.log('Error:', { err }))

        this.setState({
            name: "",
            surname: "",
            genre: "",
            age: "",
            background: "",
            rolHistory: "",
            occupation: "",
            notes: "",
            physicalDescription: "",
            personality: "",
            habits: "",

            owner: this.props.theUser._id,
            isPublic: false,
        })
        this.props.history.push(`/projects/${this.props.match.params.project_id}/all-characters`)
    }

    render() {

        return (
            <Container>
                <Row className="justify-content-center">
                    <Col md={{ span: 8 }}>
                        <h2>Nuevo Personaje</h2>
                        <h5>Los campos con asteriscos con obligatorios</h5>
                        <Form onSubmit={this.handleFormSubmit}>
                            <Form.Group>
                                <Form.Label>Nombre*</Form.Label>
                                <Form.Control required type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control type="text" name="surname" value={this.state.surname} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Género</Form.Label>
                                <Form.Control type="text" name="genre" value={this.state.genre} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Edad* </Form.Label>
                                <Form.Control required type="number" name="age" value={this.state.age} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Trasfondo*</Form.Label>
                                <Form.Control type="text" name="background" value={this.state.background} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Rol del Personaje</Form.Label>
                                <Form.Control type="text" name="rolHistory" value={this.state.rolHistory} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Ocupación</Form.Label>
                                <Form.Control type="text" name="occupation" value={this.state.occupation} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Notas</Form.Label>
                                <Form.Control type="text" name="notes" value={this.state.notes} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Descripción Física, separados por comas (ej: alta, fuerte, hermoso...)</Form.Label>
                                <Form.Control type="text" name="physicalDescription" value={this.state.physicalDescription} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Personalidad, separados por comas (ej: cabezota, arrogante, empático...)</Form.Label>
                                <Form.Control type="text" name="personality" value={this.state.personality} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Hábitos y costumbres, separados por comas (ej: Entrenar, pescar, fumar en pipa...)</Form.Label>
                                <Form.Control type="text" name="habits" value={this.state.habits} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Check name="isPublic" value={this.state.isPublic} onChange={this.handleInputChange} label="¿Deseas que el proyecto sea público?">
                                </Form.Check>
                                <Form.Label> Podrás cambiarlo en cualquier momento. </Form.Label>
                            </Form.Group>

                            <Button variant="dark" type="submit">Crear</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default withRouter(CharacterNew)