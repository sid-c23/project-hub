import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Menu } from "semantic-ui-react";

class Navigation extends Component {
  render() {
    return (
      <Menu>
        <Menu.Item
          name="Project Hub"
          header
          onClick={(props) => <Redirect to="/" { ...props}/>}>
          Project Hub
        </Menu.Item>
        <Menu.Item
          position="right"
          name="Log In"
          onClick={(props) => <Redirect to="/login" { ...props} />}>
          Log In
        </Menu.Item>
      </Menu>
    );
  }
}

export default Navigation;
