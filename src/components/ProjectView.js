import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import MapMessages from './MapMessages';
import {Redirect} from 'react-router-dom'
class ProjectView extends Component {


  messageSubmit(e) {
    e.preventDefault()
    //console.log(this);
    const message = this.messageInput.value
    this.props.addMessage(message, this.props.match.params.projectID)
    this.messageForm.reset()
  }

  render() {
    if (!this.props.isAuthenticated) {
      return (
        <Redirect to="/login" />
      )
    }
    const projectMessages = this.props.projectMessages
    const mappedMessages = (projectMessages) ? ( <MapMessages messagesObj={projectMessages} />) : (<div><h3>Say something to your group members!</h3></div>)

    const project = this.props.project
    return (
      <Grid>
      <Grid.Row>
      <Grid.Column width={6}>
        <h3 className="ui header" style={{textAlign: "center"}}>Code: {project.code}</h3>
      </Grid.Column>
        <Grid.Column width={4}>
          <h1 className="ui header" style={{textAlign: "center"}}>{project.projectName}</h1>
        </Grid.Column>
        <Grid.Column width={6}>
          <h3 className="ui header" style={{textAlign: "center"}}>Due: {project.dateDue}</h3>
        </Grid.Column>
      </Grid.Row>
      <Grid.Column width={16}><div className="ui divider"></div></Grid.Column>
        <Grid.Row>
        <Grid.Column width={7}>
          <h1>Todos</h1>
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

          <div className="chat-window"  style={{boxShadow: "0 2px 10px rgba(0,0,0,.2)", height: "500px", overflowY: "auto"}}>
            <div className="chat-messages ui feed" style={{padding: "20px"}}>
              <h1>Chat</h1>
              {mappedMessages}
            </div>
            <div className="chat-input" style={{padding: "20px"}}>
            <form className="ui form" onSubmit={this.messageSubmit.bind(this)} ref={ (form) => this.messageForm = form}>
            <input type="text" placeholder="Talk to group members here!" ref={ (input) => this.messageInput = input}/>
            </form>
            </div>
          </div>
        </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default ProjectView;
