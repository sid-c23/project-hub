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
        projects: {},
        todos: {}
      },
      todos: {},
      messages: {},
      codes: {},

    }
  }


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
    //const usrProjects = {...this.state.userData.projects}
    const userData = { ...this.state.userData }
    userData["projects"][id] = true
    //console.log(userData)
    //usrProjects[id] = true
    codes[projCode] = id
    this.setState({
      projects,
      userData,
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

  addTodo(message, dateDue, projectID) {
    const id = Date.now()
    const stateCopy = { ...this.state }

    stateCopy["todos"][id] = {
      message: message,
      dateDue: dateDue,
      projectID: projectID
    }
    stateCopy["userData"]["todos"][id] = true
    if (stateCopy["projects"][projectID]["todos"]) {

    } else {
      stateCopy["projects"][projectID]["todos"] = {}
    }
    stateCopy["projects"][projectID]["todos"][id] = true
    this.setState(stateCopy)
  }

  addMessage(message, projectID) {
    const timeVal = new Date()
    const date = (timeVal.getMonth() + 1) + "/" + (timeVal.getDate()) + "/" + (timeVal.getFullYear())
    const time = (timeVal.getHours() % 12) + ":" + (timeVal.getMinutes())
    const name = (this.state.currentUser.displayName) ? this.state.currentUser.displayName : this.state.currentUser.email
    const stateCopy = { ...this.state}
    const timestamp = Date.now()
    //console.log(stateCopy)
    if(stateCopy["messages"][projectID]) {
      stateCopy["messages"][projectID][timestamp] = {
        "name": name,
        "message": message,
        "date": date,
        "time": time
      }
    } else {
      stateCopy["messages"][projectID] = {}
      stateCopy["messages"][projectID][timestamp] = {
        "name": name,
        "message": message,
        "date": date,
        "time": time
      }
    }

    this.setState(stateCopy)
  }


  changeTotalState() {
    this.setState({
      currentUser: {},
      projects: {},
      userData: {
        projects: {},
        todos: {}
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
            projects: {},
            todos: {}
          }
        })
        this.codeRef = base.syncState('codes', {
          context: this,
          state: 'codes'
        })
        this.messagesRef = base.syncState('messages', {
          context: this,
          state: 'messages',
          defaultValue: {}
        })

        this.projectsRef = base.syncState(`projects`, {
          context: this,
          state: 'projects'
        })
        this.todosRef = base.syncState('todos', {
          context: this,
          state: 'todos',
          defaultValue: {}
        })
        //console.log(this.state);
      } else {
        //base.reset()
        this.setState({
          isAuthenticated: false,
          currentUser: {},
          projects: {},
          userData: {
            projects: {},
            todos: {}
          },
          todos: {},
          messages: {},
          codes: {}
        })
      }
    })

    //console.log(this.state)
  }


  componentWillUpdate(nextProps, nextState) {

    console.log(nextState);
    const usrTodos = nextState.userData.todos
    if(usrTodos) {

    } else {
      nextState.userData.todos = {}
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.projectsRef)
    base.removeBinding(this.userRef)
    base.removeBinding(this.codesRef)
    base.removeBinding(this.messagesRef)
    base.removeBinding(this.todosRef)
    this.removeAuthListener()


  }


  render() {

    const isAuthenticated = this.state.isAuthenticated

    return (
      <div className="ui container">
        <BrowserRouter>
          <div>
            <Navigation currentUser={this.state.currentUser} isAuthenticated={isAuthenticated} joinProject={this.joinProject.bind(this)}/>

            <Route exact path="/login" render={ (props) => (
              <Login isAuthenticated={isAuthenticated} { ...props } />
            )} />
            <Route exact path="/logout" render={ (props) => {
              return <Logout changeTotalState={this.changeTotalState.bind(this)} {...props} />
            }} />
            <Route exact path="/dashboard" render={ (props) => {return (
              <Dashboard todos={this.state.todos} user={this.state.userData} isAuthenticated={isAuthenticated} projects={this.state.projects} { ...props} />
            )}} />
            <Route exact path="/dashboard/create" render={ (props) => (
              <ProjectCreate isAuthenticated={isAuthenticated} addProject={this.addProject.bind(this)} {...props} />
            )} />
            <Route
              exact path="/dashboard/projects/:projectID"
              render={ (props) => {
                const id = props.match.params.projectID
                const project = this.state.projects[id]
                return (project ?  <ProjectView todos={this.state.todos} isAuthenticated={isAuthenticated} addTodo={this.addTodo.bind(this)} addMessage={this.addMessage.bind(this)} project={project} {...props} projectMessages={this.state["messages"][id]}/>
                : <h1>Whoops! No Project Found!</h1>)
              }} />
              <Route path="/" render={ (props) => <Redirect to="/login" { ...props } />} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
