import React, { Component } from 'react';

class PopupView extends Component {

  formSubmit(e) {
    e.preventDefault()
    const projCode = this.codeInput.value
    this.props.joinProject(projCode)


  }

  render() {
    return (
      <div>
        <h4 className="header">Join a Project</h4>
        <form className="ui form" onSubmit={this.formSubmit.bind(this)} ref={(form) => this.joinForm = form}>
          <input type="text" placeholder="Enter the project code:" ref={ (input) => this.codeInput = input}/>
          <input type="submit" value="Join Project!" className="ui primary button"/>
        </form>
      </div>
    );
  }
}

export default PopupView;
