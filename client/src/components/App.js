import React, { Component } from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import Login from './pages/login/Login'
// import Signup from './pages/register/Signup'
import Profile from './pages/profile/Profile'
import NavBar from './layout/navbar/NavBar'
import Footer from './layout/footer/Footer'
import Register from './pages/register/Register'

import authService from './../service/auth.service'
import projectService from './../service/project.service'
import profileService from './../service/profile.service'



import './App.css'
import Welcome from './pages/welcome/Welcome'


import AllProjects from './pages/work-space/project-views/AllProjects'
import ProjectDetails from './pages/work-space/project-views/ProjectDetails'
import ProjectNew from './pages/work-space/project-views/ProjectNew'

import AllCharacters from './pages/characters/AllCharacters'
import CharacterDetail from './pages/characters/CharacterDetail'
import CharacterNew from './pages/characters/CharacterNew'

import ArchiveDetails from './pages/archives/ArchiveDetails'
import ArchiveNew from './pages/archives/ArchiveNew'
import AllArchivesInFolder from './pages/archives/AllArchivesInFolder'
import ArchiveEdit from './pages/archives/ArchiveEdit'

import StoryDetails from './pages/work-space/project-views/StoryDetails'



class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedInUser: undefined
    }
    this.authService = new authService()
    this.projectService = new projectService()
    this.profileService = new profileService()

  }
  componentDidMount = () => this.fetchUser()

  setTheUser = user => this.setState({ loggedInUser: user }, () => console.log('El usuario es', this.state.loggedInUser))

  fetchUser = () => {
    this.authService
      .isLoggedIn()
      .then(response => this.setState({ loggedInUser: response.data }))
      .catch(err => this.setState({ loggedInUser: null }))

  }

  render() {


      return (

        <>
          <NavBar setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />

          <Switch />
          <main>

            <Route path="/" exact render={() => !this.state.loggedInUser ? <Welcome setTheUser={this.setTheUser} /> : <Redirect to="/all-projects" />} />
            <Route path="/register" render={props => <Register setTheUser={this.setTheUser} {...props} />} />
            <Route path="/login" render={props => <Login setTheUser={this.setTheUser} {...props} />} />
            <Route path="/profile" render={props => !this.state.loggedInUser ? <Login setTheUser={this.setTheUser} {...props} />: <Profile theUser={this.state.loggedInUser} {...props} />} />

            <Route path="/logout" render={() => <Welcome setTheUser={this.setTheUser} />} />


            <Route path="/all-projects" render={props => <AllProjects theUser={this.state.loggedInUser} {...props} />} />
            <Route path="/projects/:project_id/details" exact render={props => <ProjectDetails theUser={this.state.loggedInUser} {...props} />} />
            <Route path="/projects/new" render={props => <ProjectNew theUser={this.state.loggedInUser} {...props} />} />
            
            <Route path="/projects/:project_id/all-characters" render={props => <AllCharacters theUser={this.state.loggedInUser} {...props} />} />
            <Route path="/projects/:project_id/character/:character_id/details" exact render={props => <CharacterDetail theUser={this.state.loggedInUser} showModal={false} {...props} />} />
            <Route path="/projects/:project_id/character/new" render={props => <CharacterNew theUser={this.state.loggedInUser} {...props} />} />
           
            <Route path="/projects/:project_id/folder/:folder_id/details" render={props => <AllArchivesInFolder theUser={this.state.loggedInUser} {...props} />} />

            <Route path="/projects/:project_id/folder/:folder_id/archive/:archive_id/details" exact render={props => <ArchiveDetails theUser={this.state.loggedInUser} {...props} />} />
            <Route path="/projects/:project_id/folder/:folder_id/archive/new" exact render={props => <ArchiveNew theUser={this.state.loggedInUser} {...props} />} />
            <Route path="/projects/:project_id/folder/:folder_id/:archive_id/archive/edit" exact render={props => <ArchiveEdit theUser={this.state.loggedInUser} {...props} />} />

            <Route path="/projects/story/:project_id" exact render={props => <StoryDetails theUser={this.state.loggedInUser} {...props} />} />

          </main>
          <Switch />
          <Footer />
        </>
      );

    
  }
}

export default App;
