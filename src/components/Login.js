import React, { Component } from 'react';
import { Form, Grid, Message, Button } from 'semantic-ui-react';
import { app, googleProvider } from '../base';
import { Redirect } from 'react-router-dom';

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      wrongAuth: false,
      invalidCreds: null

    }
  }


  loginWithCreds(event) {
    event.preventDefault()
    const email = this.emailInput.value;
    const password = this.passInput.value;

    app.auth().fetchProvidersForEmail(email)
      .then((providers) => {
        if(providers.length==0) {
          //create user
          return app.auth().createUserWithEmailAndPassword(email, password)
        } else if (providers.indexOf("password") == -1) {
          //used google
          this.setState({
            wrongAuth: true
          })
          this.loginForm.reset()
        } else {
          //sign in
          return app.auth().signInWithEmailAndPassword(email, password)
        }
      })
      .then((user) => {
        if (user && user.email) {
          this.loginForm.reset()
          this.setState({
            redirect: true
          })
        }
      })
      .catch((err) => {
        this.setState({
          invalidCreds: err.message
        })
      })
  }






  loginWithGoogle() {
    app.auth().signInWithPopup(googleProvider)
      .then((res, err) => {
        if (err) console.log(err)
        else {
          this.setState({
              redirect: true,
              wrongAuth: false
          })
        }
      })
  }

  render() {
    if(this.state.redirect || this.props.isAuthenticated) {
      return (
        <Redirect to="/dashboard" />
      )
    }
    return (
      <Grid>
        <Grid.Column width={4}>
        </Grid.Column>
        <Grid.Column width={8}>
          {this.state.wrongAuth ? (<Message warning>
            <Message.Header>Whoops!</Message.Header>
            <p>You may have used a different authentication method to register. Try the other type!</p>
          </Message>) : (null)}
          {this.state.invalidCreds ? (
            <Message error>
              <Message.Header>Something Went Wrong!</Message.Header>
              <p>{this.state.invalidCreds}</p>
            </Message>
          ) : (
            null
          )}
          <Button fluid color="olive" onClick={this.loginWithGoogle.bind(this)}>Log In with Google</Button><br/>
          <form className="ui form" onSubmit={this.loginWithCreds.bind(this)} ref={(form) => this.loginForm = form}>
            <Message info>
              <Message.Header>Don't have an account? We got you covered:</Message.Header>
              <p>Even if you don't have an account, this form will create one for you using the credentials you specified.</p>
            </Message>
            <div className="field">
              <label>Email:</label>
              <input type="email" placeholder="youremail@email.com" name="email" ref={(input) => this.emailInput = input}/>
            </div>
            <div className="field">
              <label>Password:</label>
              <input type="password" name="password" placeholder="supersecretpasswordhere"ref={(input) => this.passInput = input}/>
            </div>
            <Button type="submit" fluid color="blue">Log In/Register</Button>
          </form>
        </Grid.Column>
        <Grid.Column width={4}>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
