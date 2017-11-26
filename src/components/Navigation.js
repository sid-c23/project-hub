import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";

class Navigation extends Component {
  render() {

    const rightMenu = (this.props.isAuthenticated ) ? (
      <div className="right item">
        <div >
          <Link to="/profile"><Icon name="user circle outline large" aria-label="View Profile"></Icon></Link>
        </div>
        <div>
          <Link to="/logout"> <Icon name="log out large" aria-label="Log Out"></Icon></Link>
        </div>
      </div>
    ) : (
      null
    )

    return (
    <div className="ui menu">
      <div className="item header">
        <Link to="/">Project Hub</Link>
      </div>
      { rightMenu }
    </div>
  )
  }
}

export default Navigation;
