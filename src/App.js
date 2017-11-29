import React, { Component } from 'react';
import Navigation from './components/Navigation';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Login from './components/Login';
import { app, base } from './base';
import Logout from './components/Logout';
import Dashboard from './components/Dashboard';
import ProjectCreate from './components/ProjectCreate';
import ProjectView from './components/ProjectView';

class App extends Component {
  constructor(props) {

    super(props)
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      projects: {},
      userData: {
        projects: {}
      },
      todos: {},
      messages: {},
      codes: {}
    }
  }

  // createUser(user) {
  //
  //   this.setState({
  //     user: {
  //       name: (user["displayName"]) ? user["diplayName"] : "",
  //       email: user["email"],
  //       todos: {
  //
  //       },
  //       projects: {
  //
  //       }
  //     }
  //   })
  // }

  addProject(projectName, dateDue) {

    const projects = {...this.state.projects}
    const currentUsrID = this.state.currentUser.uid
    const codes = {...this.state.codes}
    const id = Date.now()
    const projCode = (Math.round(Math.random() * (99999 - 1234 + 1) + 1234))
    projects[id] = {
      projectName,
      dateDue,
      creator: currentUsrID,
      members: {},
      todos: {},
      dateCreated: id,
      code: projCode
    }
    projects[id]["members"][currentUsrID] = true

    const usrProjects = {...this.state.userData.projects}
    usrProjects[id] = true
    codes[projCode] = id
    this.setState({
      projects,
      userData: {
        projects: usrProjects
      },
      codes

    })

  }

  joinProject(code) {

    const codeProjectID = this.state.codes[code]
    if (codeProjectID) {
      const projMembers = this.state.projects[codeProjectID]["members"]
      const user = this.state.currentUser.uid

      if(projMembers[user]) {
        return;
      } else {
        projMembers[user] = true
      }

      const usrProjects = this.state.userData.projects

      if(usrProjects[codeProjectID]) {
        return;
      } else {
        usrProjects[codeProjectID] = true
      }

      const stateCopy = { ...this.state}

      stateCopy["projects"][codeProjectID]["members"] = projMembers
      stateCopy["userData"]["projects"] = usrProjects

      this.setState(stateCopy)
    }
  }

  changeTotalState() {
    this.setState({
      currentUser: {},
      projects: {},
      userData: {
        projects: {}
      },
      todos: {},
      messages: {},
      codes: {}
    })
  }

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged( (user) => {
      if (user) {
        this.setState({
          isAuthenticated: true,
          currentUser: user
        })
        this.userRef = base.syncState(`userData/${user.uid}`, {
          context: this,
          state: 'userData',
          defaultValue: {
            projects: {}
          }
        })
        this.codeRef = base.syncState('codes', {
          context: this,
          state: 'codes'
        })

        this.projectsRef = base.syncState(`projects`, {
          context: this,
          state: 'projects'
        })

      } else {
        //base.reset()
        this.setState({
          isAuthenticated: false,
          currentUser: {},
          projects: {},
          userData: {
            projects: {}
          },
          todos: {},
          messages: {},
          codes: {}
        })
      }
    })
    //console.log(this.state)
  }




  componentWillUnmount() {
    base.removeBinding(this.projectsRef)
    base.removeBinding(this.userRef)
    base.removeBinding(this.codesRef)
    this.removeAuthListener()


  }

  render() {

    const isAuthenticated = this.state.isAuthenticated

    return (
      <div className="ui container">
        <BrowserRouter>
          <div>
            <Navigation currentUser={this.state.currentUser} isAuthenticated={isAuthenticated} joinProject={this.joinProject.bind(this)}/>
            <Route exact path="/" render={ (props) => <Redirect to="/login" { ...props } />} />
            <Route exact path="/login" render={ (props) => (
              <Login isAuthenticated={isAuthenticated} { ...props } />
            )} />
            <Route exact path="/logout" render={ (props) => {
              return <Logout changeTotalState={this.changeTotalState.bind(this)} {...props} />
            }} />
            <Route exact path="/dashboard" render={ (props) => {return (
              <Dashboard userProjects={this.state.userData.projects} isAuthenticated={isAuthenticated} projects={this.state.projects} { ...props} />
            )}} />
            <Route exact path="/dashboard/projects/create" render={ (props) => (
              <ProjectCreate isAuthenticated={isAuthenticated} addProject={this.addProject.bind(this)} />
            )} />
            <Route
              exact
              path="/dashboard/projects/:projectID"
              render={ (props) => {
                const project = this.state.projects[props.match.params.projectID]
                return (project ?  <ProjectView isAuthenticated={isAuthenticated} project={project} {...props}/>
                : <h1>Whoops! No Project Found!</h1>)
              }} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
