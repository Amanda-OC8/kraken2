import React, { Component } from 'react'

import Toast from 'react-bootstrap/Toast'

import './PopUpAlert.css'


export default class Alert extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: true
        }
    }

    render() {

        return (

            <Toast
                onClose={() => this.setState({ visible: false })} show={this.state.visible} delay={5000} autohide
                style={{ position: 'fixed', top: 20, left: 20 }}
            >
                <Toast.Header className="toast-content toast-title">
                   
                    <strong className="mr-auto">{this.props.title}</strong>
                </Toast.Header>
                <Toast.Body className="toast-content toast-title">{this.props.text}</Toast.Body>
            </Toast>
        )
    }
}