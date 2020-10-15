import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import characterService from '../../../service/character.service'
import BaseCard from "../../shared/cards/BaseCard"
import Spinner from "../../shared/spinner/Spinner"


class AllCharacters extends Component {
    constructor(props) {
        super(props)
        this.state = {
            characters: []
        }
        this.characterService = new characterService()
    }

    componentDidMount = () => this.loadAllCharacters()

    loadAllCharacters = () => {
        this.characterService
            .getAllCharacters(this.props.match.params.project_id)
            .then(response => this.setState({ characters: response.data }))
            .catch(err => console.log('Error:', err))
    }

    render() {

        return (

            <Container>
                {!this.state.characters.length && <Spinner />}

                <Row className="justify-content-md-center">
                    {this.state.characters.map(elm => <BaseCard key={elm._id} title={elm.name + " " + elm.surname} description={elm.background} id={elm._id} projectId={elm.originProject._id} typeCard="character" />)}
                </Row>
            </Container>

        )
    }
}

export default AllCharacters