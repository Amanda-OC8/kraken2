import React, { Component } from 'react'

import projectService from '../../../../service/project.service'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

class StoryDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            story: []
        }
        this.projectService = new projectService()
    }

    componentDidMount = () => {
        this.projectService
            .getStory(this.props.match.params.project_id)
            .then(response => this.setState({ story: response.data[0] }))
            .catch(err => console.log('Error:', err))
    }

    render() {
        console.log(this.state)
        let project = this.state.project
        let ownArchive = false

        if (project !== undefined) {
            project = this.state.project._id

            ownArchive = (project === this.props.theProject._id)

        }

        let user = this.state.owner
        let ownProject = false

        if (user !== undefined) {
            user = this.state.owner._id

            ownProject = (user === this.props.theUser._id)

        }

        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col className="m-auto" md={{ span: 8 }} >
                        
                        <h2>{this.state.story.name}</h2>
                        {/* {ownProject && (<div><h4>Archivos Relacionados: </h4><p>{this.state.relatedArchives}</p></div>)} */}
                        <div dangerouslySetInnerHTML={{ __html: this.state.story.description }}></div>

                    </Col>

                </Row>
                <Row>
                    <Col md={{ span: 3 }}>   <Link className="btn-shape btn-dark-mode-config" to={`/projects/${this.props.match.params.project_id}/details`}>Volver al proyecto</Link> </Col>
                    <Col md={{ span: 3 }}>   <Link className="btn-shape btn-dark-mode-config" to={`/projects/story/${this.props.match.params.project_id}/edit/${this.state.story._id}`}>Editar historia</Link> </Col>
                    <Col md={{ span: 3 }}> <Link className="btn-shape btn-dark-mode-config" to={`/profile`}>Volver a tu perfil</Link> </Col>
                </Row>

            </Container>
        )
    }
}

export default StoryDetails