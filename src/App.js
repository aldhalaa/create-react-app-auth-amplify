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
        success: completeRequest,
        error: function ajaxError(jqXHR, textStatus, errorThrown) {
            console.error('Response: ', jqXHR.responseText);
            alert('An error occured:\n' + jqXHR.responseText);
        }
    });
  }
}

export default withAuthenticator(App, true);
