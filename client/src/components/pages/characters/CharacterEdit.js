import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


import characterService from "../../../service/character.service"

class CharacterEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.characterService = new characterService()

    }

    componentDidMount = () => {

        this.characterService
            .getCharacter(this.props.match.params.project_id, this.props.match.params.character_id)
            .then(response => this.setState(response.data))
            .catch(err => console.log('Error:', err))
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

    }

    handleFormSubmit = e => {

        e.preventDefault()

        this.setState({ originProject: this.props.match.params.project_id, owner: this.props.theUser._id, isPublic: false })
        this.characterService
            .editCharacter(this.props.match.params.project_id, this.props.match.params.character_id, this.state)
            .then(() => {
                console.log(this.props)
                this.props.closeModal()
                this.props.refreshList()
            })
            .catch(err => console.log('Error:', { err }))


    }



    render() {

        return (
            <Container>
                <Row className="justify-content-center">
                    <Col md={{ span: 12 }}>
                        <h2>Editar Personaje</h2>
                        <h5>Los campos con asteriscos con obligatorios</h5>
                        <Form onSubmit={this.handleFormSubmit}>
                            <Form.Group>
                                <Form.Label>Nombre*</Form.Label>
                                <Form.Control required type="text" name="name" value={this.state.name} placeholder={this.state.name} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control type="text" name="surname" value={this.state.surname} placeholder={this.state.surname} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Género</Form.Label>
                                <Form.Control type="text" name="genre" value={this.state.genre} placeholder={this.state.genre} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Edad* </Form.Label>
                                <Form.Control required type="number" name="age" value={this.state.age} placeholder={this.state.age} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Trasfondo*</Form.Label>
                                <Form.Control type="text" name="background" value={this.state.background} placeholder={this.state.background} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Rol del Personaje</Form.Label>
                                <Form.Control type="text" name="rolHistory" value={this.state.rolHistory} placeholder={this.state.rolHistory} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Ocupación</Form.Label>
                                <Form.Control type="text" name="occupation" value={this.state.occupation} placeholder={this.state.occupation} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Notas</Form.Label>
                                <Form.Control type="text" name="notes" value={this.state.notes} placeholder={this.state.notes} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Descripción Física, separados por comas (ej: alta, fuerte, hermoso...)</Form.Label>
                                <Form.Control type="text" name="physicalDescription" value={this.state.physicalDescription} placeholder={this.state.physicalDescription} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Personalidad, separados por comas (ej: cabezota, arrogante, empático...)</Form.Label>
                                <Form.Control type="text" name="personality" value={this.state.personality} placeholder={this.state.personality} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Hábitos y costumbres, separados por comas (ej: Entrenar, pescar, fumar en pipa...)</Form.Label>
                                <Form.Control type="text" name="habits" value={this.state.habits} placeholder={this.state.habits} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Check name="isPublic" value={this.state.isPublic} onChange={this.handleInputChange} label="¿Deseas que el proyecto sea público?">
                                </Form.Check>
                                <Form.Label> Podrás cambiarlo en cualquier momento. </Form.Label>
                            </Form.Group>

                            <Button className='btn-shape btn-dark-mode-config' type="submit">Editar</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default CharacterEdit