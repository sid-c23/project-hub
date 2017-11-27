import React, { Component } from 'react';
import {Grid} from 'semantic-ui-react';
class ProjectCreate extends Component {

  createProject(event) {
    event.preventDefault();
    const projectName = this.nameInput.value
    const dateDue = this.dateInput.value
    this.props.addProject(projectName, dateDue)
    this.createForm.reset()
  }

  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          <h1>Create a New Project</h1>
          <form className="ui form" ref={(form) => this.createForm = form} onSubmit={this.createProject.bind(this)}>
            <div className="field">
              <label>Project Name:</label>
              <input type="text" name="projectName" placeholder="Unique and Related Name" ref={(input) => this.nameInput = input}/>
            </div>
            <div className="field">
              <label>Date Due:</label>
              <input type="date" name="projectDueDate" ref={(input) => this.dateInput = input}/>
            </div>

            <button className="ui button primary" type="submit">Create Project!</button>
            <h1>Code: 11536</h1>
            <p>Give the above code to your partners so you can communicate. Happy creating!</p>
          </form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default ProjectCreate;
