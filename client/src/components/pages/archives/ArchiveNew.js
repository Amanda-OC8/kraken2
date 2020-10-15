import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

import { Editor } from "@tinymce/tinymce-react"

import archiveService from "../../../service/archive.service"

class ArchiveNew extends Component {
    constructor(props) {
        super(props)
        this.state = {
            originProject: this.props.match.params.project_id,
            parentFolder: this.props.match.params.folder_id,
            name: "",
            description: "Comienza tu historia",
            owner: props.theUser._id,
            isPublic: false,
        }
        this.archiveService = new archiveService()
    }

    handleFormSubmit = e => {

        e.preventDefault()

        this.archiveService.newArchive(this.props.match.params.project_id, this.props.match.params.folder_id, this.state)
            .then(response => console.log(response))
            .catch(err => console.log('Error:', { err }))

        this.setState({
            originProject: this.props.match.params.project_id,
            parentFolder: this.props.match.params.folder_id,
            name: "",
            description: "",
            owner: this.props.match.params.user_id,
            isPublic: false,
        })
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
        
        return (
            <Container>
                <Row>
                    <Col>
                        <Form onSubmit={this.handleFormSubmit}>
                            <h2>Da vida al Kraken</h2>
                            
                            <Form.Group>
                                <Form.Label>Nombre*</Form.Label>
                                <Form.Control required type="text" name="name" value={this.state.name} onChange={this.handleInputChange}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Puedes escribir aquí*</Form.Label>
                                <Editor
                                    required
                                    name="description"
                                    value= {this.state.description}
                                    init={{
                                    height: 500,
                                    menubar: false,
                                    }}
                                    onEditorChange={this.handleChange}
                                />
                                <br />
                                <input className="btn-shape btn-dark-mode-config" type="submit" value="Submit" />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ArchiveNew