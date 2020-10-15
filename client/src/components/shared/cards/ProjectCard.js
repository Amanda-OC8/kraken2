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
            synopsis: this.props.synopsis
        }
    }

    showMoreText = () => this.setState({ showMore: !this.state.showMore })

    render() {
        
        let shortSynopsis = this.state.synopsis.slice(0, 100)
        return (
            <Col md={{ span: 4 }} className="justifiy-content-center">
                <Card className="dark-mode">
                    <Card.Body >
                        <Card.Title>
                            <h3>{this.props.title}</h3>
                            <hr></hr>
                            <h5>Responsable: {this.props.author}</h5>
                        </Card.Title>
                        {this.state.synopsis.length > 100 ? (
                            <Card.Text>
                                <Collapse in={!this.state.showMore}><span>{shortSynopsis}</span></Collapse>

                                {!this.state.showMore && <NavLink onClick={this.showMoreText} className="show-more">Leer la sinopsis completa </NavLink>}
                                {this.state.showMore && <NavLink onClick={this.showMoreText} className="show-more">Leer menos </NavLink>}

                                <Collapse in={this.state.showMore}>
                                    <span>{this.state.synopsis}</span>
                                </Collapse>

                            </Card.Text>
                        ) : (<Card.Text>{this.state.synopsis}</Card.Text>)
                        }

                      
                        <Link className="btn-shape btn-dark-mode-config" to={`/projects/${this.props.id}/details`}>Detalles</Link>
                    </Card.Body>
                </Card>
            </Col>
        );

    }
}
export default ProjectCard

