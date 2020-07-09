import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="ec2-start">
            Begin an Ec2 Instance
          </label>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <button>
            Start Ec2 Instance
          </button>
        </form>
          
        </header>
      </div>
    );
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  
  handleSubmit(e) {
    console.log("submitting:" + this.state.value)
    Auth.currentSession().then(token => {
      console.log("token:" + token);
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ Ec2Instance:  this.state.value }),
          headers: {
              Authorization: token.getIdToken().getJwtToken()
          },
      };
      fetch('https://indi5hwb64.execute-api.ca-central-1.amazonaws.com/prod/ec2', requestOptions)
          .then(response => response.json())
          .catch(error => {
              console.error('There was an error!', error);
          });
      e.preventDefault();
    });
    /*
    $.ajax({
        method: 'POST',
        url: "https://indi5hwb64.execute-api.ca-central-1.amazonaws.com/prod" + '/ec2',
        headers: {
            Authorization: "test"
        },
        data: JSON.stringify({
            Ec2Instance: e.target.value
        }),
        contentType: 'application/json',
        error: function ajaxError(jqXHR, textStatus, errorThrown) {
            console.error('Response: ', jqXHR.responseText);
            alert('An error occured:\n' + jqXHR.responseText);
        }
    });
    */
    console.log("session:" + Auth);
  }
}

export default withAuthenticator(App, true);
