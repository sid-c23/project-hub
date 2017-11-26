import React, { Component } from 'react';
import Navigation from './components/Navigation';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Login from './components/Login';
import { app, base } from './base';
import Logout from './components/Logout';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: null,
      isAuthenticated: false,
    }
  }

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged( (user) => {
      if (user) {
        this.setState({
          isAuthenticated: true
        })
      } else {
        this.setState({
          isAuthenticated: false
        })
      }
    })
  }

  componentWillUnmount() {
    this.removeAuthListener()
  }

  render() {
    return (
      <div className="ui container">
        <BrowserRouter>
          <div>
            <Navigation currentUser={this.state.currentUser} isAuthenticated={this.state.isAuthenticated}/>
            <Route exact path="/" render={ (props) => <Redirect to="/login" { ...props } />} />
            <Route path="/login" render={ (props) => (
              <Login isAuthenticated={this.state.isAuthenticated} { ...props } />
            )} />
            <Route path="/logout" component={Logout} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
