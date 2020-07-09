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
          <input
            id="ec2-start"
          />
          <button>
            Start Ec2 Instance
          </button>
        </form>
          
        </header>
      </div>
    );
  }
  
  handleSubmit(e) {
    e.preventDefault();
    console.log("submitting:" + e.target.value)
    Auth.currentSession().then(token => {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ Ec2Instance: e.target.value }),
          headers: {
              Authorization: token.getIdToken().getJwtToken();
          },
      };
      fetch('https://indi5hwb64.execute-api.ca-central-1.amazonaws.com/prod/ec2', requestOptions)
          .then(response => response.json())
          .catch(error => {
              console.error('There was an error!', error);
          });
    };
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
