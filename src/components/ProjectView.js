import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
class ProjectView extends Component {
  render() {

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
          <h1>Chat</h1>
          <div className="chat-window">
            <div className="chat-messages ui feed">
              <div className="event">
                <div className="content">
                  <div class="content">
                    <div class="summary">
                      <a>Joe Henderson</a> posted on his page
                      <div class="date">
                        3 days ago
                      </div>
                    </div>
                    <div class="extra text">
                      Ours is a life of constant reruns. We're always circling back to where we'd we started, then starting all over again. Even if we don't run extra laps that day, we surely will come back for more of the same another day soon.
                    </div>
                    <div class="meta">
                      <a class="like">
                        <i class="like icon"></i> 5 Likes
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="chat-input ui form">
              <input type="text" placeholder="Talk to group members here!"/>
            </div>
          </div>
        </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default ProjectView;
