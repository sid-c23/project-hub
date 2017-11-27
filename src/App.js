import React, { Component } from 'react';
import Navigation from './components/Navigation';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Login from './components/Login';
import { app, base } from './base';
import Logout from './components/Logout';
import Dashboard from './components/Dashboard';
import ProjectCreate from './components/ProjectCreate';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      projects: {}
    }
  }

  addProject(projectName, dateDue, creatorID, members, todos) {
    const projects = {...this.state.projects}

    const id = Date.now()

    projects[id] = {
      projectName,
      dateDue,
      creatorID,
      members,
      todos,
      dateCreated: id
    }
    this.setState({
      projects
    })

  }

  componentWillMount() {
    this.projectsRef = base.syncState('projects', {
      context: this,
      state: 'projects'
    })
    this.removeAuthListener = app.auth().onAuthStateChanged( (user) => {
      if (user) {
        this.setState({
          isAuthenticated: true
        })
      } else {
        this.setState({
          isAuthenticated: false
        })
      }
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.projectsRef)
    this.removeAuthListener()
  }

  render() {
    return (
      <div className="ui container">
        <BrowserRouter>
          <div>
            <Navigation currentUser={this.state.currentUser} isAuthenticated={this.state.isAuthenticated}/>
            <Route exact path="/" render={ (props) => <Redirect to="/login" { ...props } />} />
            <Route exact path="/login" render={ (props) => (
              <Login isAuthenticated={this.state.isAuthenticated} { ...props } />
            )} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/dashboard" render={ (props) => (
              <Dashboard isAuthenticated={this.state.isAuthenticated} projects={this.state.projects} { ...props} />
            )} />
            <Route exact path="/dashboard/projects/create" render={ (props) => (
              <ProjectCreate isAuthenticated={this.state.isAuthenticated} addProject={this.addProject.bind(this)} />
            )} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
