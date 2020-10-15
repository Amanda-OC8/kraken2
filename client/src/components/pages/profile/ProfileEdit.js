import React, { Component } from 'react'


import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import profileService from '../../../service/profile.service'


class ProfileEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.profileService = new profileService()
    }

    componentDidMount = () => {

        this.profileService
            .getProfile()
            .then(response => this.setState(response.data[1]))
            .catch(err => console.log('Error:', err))
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        e.preventDefault()

        this.profileService
            .editProfile(this.state)
            .then(() => {
                this.props.closeModal()
                this.props.refreshList()
            })
            .catch(err => console.log('Error!!', { err }))
    }




    render() {
        console.log(this.state)
        return (

            <Form onSubmit={this.handleFormSubmit}>
                <Form.Group>
                    <Form.Label>Nombre de usuario</Form.Label>
                    <Form.Control type="text" name="username" value={this.state.username} placeholder={this.state.username} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={this.state.email} placeholder={this.state.email} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Biografía</Form.Label>
                    <Form.Control type="text" name="bio" value={this.state.bio} placeholder={this.state.bio} onChange={this.handleInputChange} />
                </Form.Group>

                <Button variant='dark' className='btn-shape btn-dark-mode-config' type="submit">Editar</Button>
            </Form>
        )
    }
}

export default ProfileEdit
