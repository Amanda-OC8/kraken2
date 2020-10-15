import React, { Component } from 'react'



import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ProfileEdit from './ProfileEdit'


import ProfileService from "../../../service/profile.service"
import BaseCard from "../../shared/cards/BaseCard"
import Spinner from "../../shared/spinner/Spinner"



import '../../App.css'
import '../modal/Modal.css'
import './Profile.css'

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            profile: {},
            showModal: false,
            ownProjects: [],
            errorMessage: ""
        }
        this.profileService = new ProfileService()
    }



    handleModal = showModal => {
        this.setState({ showModal })
    }

    componentDidMount = () => {
        this.loadProfile()
        this.loadOwnProjects()
    }

    loadProfile = () => {

        this.profileService
            .getProfile()
            .then(response => {
                this.setState({ ...this.state, profile: response.data[1] })
            })
            .catch(err => {
                this.setState({ errorMessage: err.message })
            })
    }

    loadOwnProjects = () => {
        this.profileService
            .getOwnProjects()
            .then(response => this.setState({ ...this.state, ownProjects: response.data }))
            .catch(err => console.log('Error:', err))
    }

    render() {

        return (

            <>
                {!this.state.profile.username && <Spinner />}
                <Container>
                    <Row className="align-items-center justify-content-center ">
                        <Col md={{ span: 6 }}>
                            <h1 className="profile-title">Estás en tu perfil {this.state.profile.username}</h1>
                        </Col>
                        <Col md={{ span: 6 }}>
                            <Button variant='dark' onClick={() => this.handleModal(true)} className='btn-shape btn-dark-mode-config' size="lg">Editar perfil</Button>
                        </Col>
                        <Col md={{ span: 12 }} style={{ marginTop: '20px' }}>
                            <p className="profile-title">Email: <span className="profile-p">{this.state.profile.email}</span></p>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <p className="bio profile-title">Bio: <span className="profile-p">{this.state.profile.bio}</span></p>
                        </Col>
                    </Row>
               

                </Container>

                <Container>
                    <h3>Tus proyectos</h3>

                    <Row className="justify-content-md-center">
                        {this.state.ownProjects.map(elm => <BaseCard key={elm._id} author={elm.owner.username} title={elm.title} description={elm.synopsis} id={elm._id} typeCard="project" />)}
                    </Row>
                </Container>

                <Modal show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar perfil</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ProfileEdit {...this.props} closeModal={() => this.handleModal(false)} refreshList={this.loadProfile} />
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default Profile