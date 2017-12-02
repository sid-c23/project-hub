import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
// import ProjectView from './ProjectView';
class Dashboard extends Component {





  render() {

    const projects = this.props.projects
    //console.log(this.props);
    const todos = this.props.todos
    const usrTodos = this.props.user.todos
    const todosKeys = Object.keys(todos)
    const usrTodosKeys = Object.keys(usrTodos)

    const mappedTodos = (todosKeys.length === 0) ? (<tr></tr>) : (
      usrTodosKeys.map( (id) => {
        const todo = todos[id]
        return (
            <tr key={id}>
              <td>{projects[todo["projectID"]]["projectName"]}</td>
              <td>{todo.message}</td>
              <td>{todo.dateDue}</td>
            </tr>
        )
      })
    )




    // console.log(this.props.userProjects)
    // console.log(projects);
    const projectsKeys = Object.keys(projects)
    const usrProjectKeys = Object.keys(this.props.user.projects)
    const mappedProjects = (projectsKeys.length === 0) ? (<div></div>) : (
      usrProjectKeys.map( (id) => {
        const project = projects[id]
        return (
          <div className="ui card fluid" key={id}>
            <div className="content">
              <div className="header"><Link to={"/dashboard/projects/" + id}>{project["projectName"]}</Link></div>
              <div className="meta">
                Due {project["dateDue"]} | {Object.keys(project["members"]).length} members

              </div>
              <p>Share this code with your group members: <b>{project["code"]}</b></p>
            </div>
          </div>
        )

      })
    )



    if (!this.props.isAuthenticated) {
      return (
        <Redirect to="/login" />
      )
    }

    return (
      <Grid>
        <Grid.Column width={7}>
          <h1>Your To-Do's</h1>
          <table className="ui celled table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>To-Do Message</th>
                <th>Date Due</th>
              </tr>
            </thead>
            <tbody>
              {mappedTodos}
            </tbody>
          </table>

        </Grid.Column>
        <Grid.Column width={2}>
        </Grid.Column>
        <Grid.Column width={7}>
          <h1>Your Projects</h1>
          {mappedProjects}
          <br/>
          <br/>
          <br/>
          <Link to="/dashboard/create" className="ui button primary fluid">Create a Project</Link>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Dashboard;
