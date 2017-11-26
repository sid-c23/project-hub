import React, { Component } from 'react';
import {Loader } from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';
import { app } from '../base';

class Logout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }
  }

  componentWillMount() {
    app.auth().signOut()
      .then((user) => {
        this.setState({
          redirect: true
        })
      })
  }

  render() {

      if (this.state.redirect === true) {
        return <Redirect to="/login" />
      } else {
        return <Loader active/>
      }

  }
}

export default Logout;
