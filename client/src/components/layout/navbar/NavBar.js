import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import "./NavBar.css"

import logo from './logo-nav.png'

import authService from './../../../service/auth.service'


export default class extends Component {

    constructor(props) {
        super(props)
        this.authService = new authService()
    }

    logoutUser = () => {
        this.authService
            .logout()
            .then(() => this.props.setTheUser(null))
            .catch(err => console.log('ERRORR!!:', err))
    }

    render() {
        return (
            <Navbar variant="dark" expand="lg" className="nav-bar" >
                <Link to="/profile">
                    <Navbar.Brand>
                        <img
                            alt="Logotipo"
                            src={logo}
                            width="45"
                            height="55"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {!this.props.loggedInUser && <Link className="nav-link" to="/register">Registro</Link>}
                        {!this.props.loggedInUser && <Link className="nav-link" to="/login">Acceso</Link>}
                        {this.props.loggedInUser && <Link className="nav-link" to="/all-projects">Explorar</Link>}
                        {this.props.loggedInUser && <Link className="nav-link" to="/projects/new">Nuevo proyecto</Link>}
                        <Link className="nav-link" to="/profile" > Hola, {this.props.loggedInUser ? this.props.loggedInUser.username : 'pequeño kraken'}</Link>
                        {this.props.loggedInUser && <Link to="/logout" className="nav-link" onClick={this.logoutUser}>Cerrar sesión</Link>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}