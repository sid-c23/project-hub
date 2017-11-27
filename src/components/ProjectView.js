import React, { Component } from 'react';

class ProjectView extends Component {
  render() {
    const { projectName, creatorID, numPeople, dateDue} = this.props;
    return (
      <div className="ui card">
        <div className="content">
          <div className="header">{projectName}</div>
          <div className="meta">
            Due {dateDue} | {numPeople} members
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectView;
