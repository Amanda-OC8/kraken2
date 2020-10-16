import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


import { Editor } from "@tinymce/tinymce-react"

import projectService from "../../../../service/project.service"

class ArchiveEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.projectService = new projectService()


    }



    componentDidMount = () => {

        this.projectService
            .getStory(this.props.match.params.project_id)
            .then(response => this.setState( response.data[0]))
            .catch(err => console.log('Error:', err))
    }

    handleFormSubmit = e => {

        e.preventDefault()

        this.projectService
            .editStory(this.props.match.params.project_id, this.props.match.params.story_id,  this.state)
            .then(response => console.log(response))
            .catch(err => console.log('Error:', { err }))

        
        this.props.history.push(`/projects/story/${this.props.match.params.project_id}/`)
    }

    handleInputChange = e => {
        let { name, value } = e.target

        this.setState({ [name]: value })
        console.log(this.state)
    }

    handleChange = (e) => {
        this.setState({ description: e });
    }

    render() {
        console.log(this.state)
        return (
            <Container>
                <Row>
                    <Col>
                        <Form onSubmit={this.handleFormSubmit}>
                            <h2>Da vida al Kraken</h2>

                            <Form.Group>
                                <Form.Label>Nombre*</Form.Label>
                                <Form.Control required type="text" name="name" value={this.state.name} placeholder={this.state.name} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Puedes escribir aquí*</Form.Label>
                                <Editor
                                    required
                                    name="description"
                                    value={this.state.description}
                                    init={{
                                        height: 500,
                                        menubar: false,
                                    }}
                                    onEditorChange={this.handleChange}

                                />
                                <br />



                                <Button variant='dark' className='btn-shape btn-dark-mode-config' type="submit">Editar</Button>


                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withRouter(ArchiveEdit)