import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import projectService from "../../../../service/project.service"
import BaseCard from "../../../shared/cards/BaseCard"
import Spinner from "../../../shared/spinner/Spinner"

import SearchBar from '../../../layout/navbar/SearchBar'

import Search from './search.svg'

class AllProjects extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [],
            searchValue: null
        }
        this.projectService = new projectService()
    }

    componentDidMount = () => {

        this.loadAllProjects()
    }

    loadAllProjects = () => {
        this.projectService
            .getAllProjects()
            .then(response => this.setState({ projects: response.data, filterProjects: response.data }))
            .catch(err => console.log('Error:', err))
    }

    // SearchBar de todos los proyectos
    searchProjects = (searchValue) => this.setState({ searchValue })

    getFilterProjects = () => {
        const { projects, searchValue } = this.state
        const expresion = new RegExp(searchValue, 'i')
        return searchValue ? projects.filter(elm => elm.title.match(expresion)) : projects
    }



    render() {

        const filterProjects = this.getFilterProjects();

        return (

            <Container>
                {!this.state.projects.length && <Spinner />}
                    <h1>Aquí puedes ver todos los proyectos publicados.</h1>
                <Row className="justify-content-md-center row">
                    <Col className="m-auto" md={{ span: 12 }}>
                    <img className="search-img" src={Search} alt="Lupa" />                          
                        <SearchBar searchProjects={this.searchProjects} />
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    {filterProjects.map(elm => <BaseCard key={elm._id} author={elm.owner.username} title={elm.title} description={elm.synopsis} id={elm._id} typeCard="project"/>)}
                </Row>

            </Container>

        )
    }
}
export default AllProjects