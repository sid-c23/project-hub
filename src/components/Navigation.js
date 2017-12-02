import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Popup } from 'semantic-ui-react';
import PopupView from './PopupView';
class Navigation extends Component {
  render() {

    const rightMenu = (this.props.isAuthenticated ) ? (
      <div className="right item">
        <div>
          <Popup
            on="click"
            trigger={<a className="item"><i className="icon plus"></i>Join Project</a>}
            content={<PopupView joinProject={this.props.joinProject}/>}
          />
        </div>
        <div >
          <Link to="/profile" className="item"><i className="icon user circle outline large" aria-label="View Profile"></i> {this.props.currentUser.email}</Link>
        </div>
        <div>
          <Link to="/logout" className="item"><i className="icon log out large" aria-label="Log Out"></i></Link>
        </div>
      </div>
    ) : (
      null
    )

    return (
    <div className="ui menu">
      <div className="item header">
        <Link to="/dashboard">Project Hub</Link>
      </div>
      { rightMenu }
    </div>
  )
  }
}

export default Navigation;
