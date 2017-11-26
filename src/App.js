import React, { Component } from 'react';
import Navigation from './components/Navigation';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Login from './components/Login';
import { base } from './base';

class App extends Component {

  render() {
    return (
      <div className="ui container">
        <BrowserRouter>
          <div>
            <Navigation />
            <Route exact path="/" render={ (props) => <Redirect to="/login" { ...props } />} />
            <Route path="/login" component={Login} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
