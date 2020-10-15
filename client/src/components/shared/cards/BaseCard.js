import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import NavLink from 'react-bootstrap/NavLink'
import Collapse from 'react-bootstrap/Collapse'
import "./ProjectCard.css"
import "../buttons/button.css"

class ProjectCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showMore: false,
            description: this.props.description
        }
    }

    showMoreText = () => this.setState({ showMore: !this.state.showMore })

    render() {

        let shortDescription = this.state.description.slice(0, 100)
        return (
            <Col md={{ span: 4 }} className="justifiy-content-center">
                <Card className="dark-mode">
                    <Card.Body >
                        <Card.Title>
                            <h3>{this.props.title}</h3>
                            <hr></hr>
                            {this.props.author && <h5>Responsable: {this.props.author}</h5>}
                        </Card.Title>
                        {this.state.description.length > 100 ? (
                            <Card.Text>
                                <Collapse in={!this.state.showMore}><div>{shortDescription}</div></Collapse>

                                {!this.state.showMore && <NavLink onClick={this.showMoreText} className="show-more">Leer más </NavLink>}
                                {this.state.showMore && <NavLink onClick={this.showMoreText} className="show-more">Leer menos </NavLink>}

                                <Collapse in={this.state.showMore}>
                                    <span>{this.state.description}</span>
                                </Collapse>

                            </Card.Text>
                        ) : (<Card.Text>{this.state.description}</Card.Text>)
                        }


                        {this.props.typeCard === "project" && <Link className="btn-shape btn-dark-mode-config" to={`/projects/${this.props.id}/details`}>Detalles</Link>}
                        {this.props.typeCard === "character" && <Link className="btn-shape btn-dark-mode-config" to={`/projects/${this.props.projectId}/character/${this.props.id}/details`}>Detalles</Link>}
                        {this.props.typeCard === "archive" && <Link className="btn-shape btn-dark-mode-config" to={`/projects/${this.props.projectId}/${this.props.folderId}/archive/${this.props.archiveId}/details`}>Detalles</Link>}


                    </Card.Body>
                </Card>
            </Col>
        );

    }
}
export default ProjectCard

