import React, { Component } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

import archiveService from '../../../service/archive.service'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



class ArchiveDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.archiveService = new archiveService()
    }

    componentDidMount = () => {
        this.archiveService
            .getArchive(this.props.match.params.project_id, this.props.match.params.folder_id, this.props.match.params.archive_id)
            .then(response => this.setState(response.data))
            .catch(err => console.log('Error:', err))
    }

    deleteArchive = () => {
        this.archiveService
            .deleteArchive(this.props.match.params.project_id, this.props.match.params.archive_id)
            .then(response => this.setState(response.data))
            .catch(err => console.log('Error:', err))
    }

    render() {
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
                        {ownArchive && "Es mi personaje"}
                        <h2>{this.state.name}</h2>
                        {/* {ownProject && (<div><h4>Archivos Relacionados: </h4><p>{this.state.relatedArchives}</p></div>)} */}
                        <div dangerouslySetInnerHTML={{ __html: this.state.description }}></div>

                    </Col>

                </Row>
                <Row>
                    <Col md={{ span: 3 }}>   <Link className="btn-shape btn-dark-mode-config" to={`/projects/${this.props.match.params.project_id}/folder/${this.props.match.params.folder_id}/details/`}>Volver a todos los archivos</Link> </Col>
                    <Col md={{ span: 3 }}>   <Link className="btn-shape btn-dark-mode-config" to={`/projects/${this.props.match.params.project_id}/folder/${this.props.match.params.folder_id}/archive/${this.props.match.params.archive_id}/edit`}>Editar archivo</Link> </Col>
                    <Col md={{ span: 3 }}>   <Link className="btn-shape btn-dark-mode-config" to={`/projects/${this.props.match.params.project_id}/all-characters/`} onClick={() => this.deleteArchive()}>Borrar archivo</Link> </Col>
                    <Col md={{ span: 3 }}> <Link className="btn-shape btn-dark-mode-config" to={`/profile`}>Volver a tu perfil</Link> </Col>
                </Row>

            </Container>
        )
    }
}
{/* <Link to={`/projects/${this.props.match.params.project_id}/${elm.parent.id}/${subelm.id}/archive/edit`}><img className="image" src={Edit} alt="Editar" /></Link> */ }

export default ArchiveDetail