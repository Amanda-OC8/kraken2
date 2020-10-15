import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import folderService from '../../../service/folder.service'

class FolderNew extends Component {
    constructor(props) {
        super(props)
        this.state = {
            originProject: this.props.match.params.project_id,
            name: "",
            owner: this.props.theUser._id,
            isPublic: false,
        }
        this.folderService = new folderService()
    }

  

handleInputChange = e => {
    let { name, value } = e.target

    if (name === "isPublic") {
        value = e.target.checked
    }
    this.setState({ [name]: value })
}

handleFormSubmit = e => {
    console.log(this.state, this.props.match.params.project_id)

    e.preventDefault()

    this.folderService.newFolder(this.props.match.params.project_id, this.state)
        .then(response => console.log(response))
        .catch(err => console.log('Error:', { err }))

    
    this.setState({
        originProject: this.props.match.params.project_id,
        name: "",
        owner: this.props.theUser._id,
        isPublic: false
    })
}

render() {
    console.log(this.state)
    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={{ span: 8 }}>
                    <h2>Nueva carpeta</h2>
                    <h5>Los campos con asteriscos con obligatorios</h5>
                    <Form onSubmit={this.handleFormSubmit}>
                        <Form.Group>
                            <Form.Label>Nombre*</Form.Label>
                            <Form.Control required type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Check name="isPublic" value={this.state.isPublic} onChange={this.handleInputChange} label="¿Deseas que la carpeta sea pública?">
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

export default FolderNew