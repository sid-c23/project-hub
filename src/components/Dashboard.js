import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
// import ProjectView from './ProjectView';
class Dashboard extends Component {

  render() {
    // const mappedTodos = this.props.todos.map( (todo) => (
    //   <tr>
    //     <td>{todo.projectID}</td>
    //     <td>{todo.todo}</td>
    //     <td>{todo.dateDue}</td>
    //   </tr>
    // ))
    // const projects = this.props.projects
    // const projectsKeys = Object.keys(projects)
    // const mappedProjects = projectsKeys.map( (id) => {
    //   const project = projects[id]
    //   return <ProjectView key={id} projectName={project["projectName"]} creatorID={project["creatorID"]} numPeople={Object.keys(project["members"]).length} dateDue={project["dateDue"]} />
    //
    // })
    const projects = this.props.projects
    const projectsKeys = Object.keys(projects)
    const mappedProjects = projectsKeys.map( (id) => {
      const project = projects[id]
      return (
        <div className="ui card fluid" key={id}>
          <div className="content">
            <div className="header">{project["projectName"]}</div>
            <div className="meta">
              Due {project["dateDue"]} | {Object.keys(project["members"]).length} members
            </div>
          </div>
        </div>
      )

    })

    return (
      <Grid>
        <Grid.Column width={7}>
          <h1>All To-Do's</h1>
          <table className="ui celled table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>To-Do Message</th>
                <th>Date Due</th>
              </tr>
            </thead>
            <tbody>

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
          <Link to="/dashboard/projects/create" className="ui button primary fluid">Create a Project</Link>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Dashboard;