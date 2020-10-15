import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import NavLink from 'react-bootstrap/NavLink'
import Collapse from 'react-bootstrap/Collapse'
import "./ProjectCard.css"
import "../buttons/button.css"

class CharacterCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showMore: false,
            background: this.props.background
        }
    }

    showMoreText = () => this.setState({ showMore: !this.state.showMore })

    render() {
        console.log(this.props)
        let shortBackground = this.state.background.slice(0, 100)
        return (
            <Col md={{ span: 4 }} className="justifiy-content-center">
                <Card className="dark-mode">
                    <Card.Body >
                        <Card.Title>
                            <h3>{this.props.completeName}</h3>
                            <hr></hr>
                        </Card.Title>
                        {this.state.background.length > 100 ? (
                            <Card.Text>
                                <Collapse in={!this.state.showMore}><span>{shortBackground}</span></Collapse>

                                {!this.state.showMore && <NavLink onClick={this.showMoreText} className="show-more">Leer el trasfondo completo </NavLink>}
                                {this.state.showMore && <NavLink onClick={this.showMoreText} className="show-more">Leer menos </NavLink>}

                                <Collapse in={this.state.showMore}>
                                    <span>{this.state.background}</span>
                                </Collapse>

                            </Card.Text>
                        ) : (<Card.Text>{this.state.background}</Card.Text>)
                        }

                      
                        <Link className="btn-shape btn-dark-mode-config" to={`/projects/${this.props.projectId}/${this.props.id}/character/details`}>Detalles</Link>
                    </Card.Body>
                </Card>
            </Col>
        );
    }
}

export default CharacterCard