import React, { Component } from 'react';
import { Form, Grid, Message, Button } from 'semantic-ui-react';

class Login extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column width={4}>
        </Grid.Column>
        <Grid.Column width={8}>
          <Form >
            <Message info>
              <Message.Header>Don't have an account? We got you covered:</Message.Header>
              <p>Even if you don't have an account, this form will create one for you using the credentials you specified.</p>
            </Message>
            <Form.Field>
              <label>Email:</label>
              <input type="text" placeholder="youremail@email.com"/>
            </Form.Field>
            <Form.Field>
              <label>Password:</label>
              <input type="password" placeholder="supersecretpasswordhere"/>
            </Form.Field>
            <Button type="submit" fluid color="blue">Log In/Register</Button>
          </Form>
        </Grid.Column>
        <Grid.Column width={4}>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
