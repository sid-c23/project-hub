import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Navigation extends Component {
  render() {

    const rightMenu = (this.props.isAuthenticated ) ? (
      <div className="right item">
        <div >
          <Link to="/profile"><i className="icon user circle outline large" aria-label="View Profile"></i></Link>
        </div>
        <div>
          <Link to="/logout"> <i className="icon log out large" aria-label="Log Out"></i></Link>
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
