import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

const endpoint = 'https://hlul1l52j3.execute-api.ap-northeast-2.amazonaws.com/Prod/ec2'

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
      fetch(endpoint, requestOptions)
          .then(response => response.json())
          .catch(error => {
              console.error('There was an error!', error);
          });
    });
    e.preventDefault();
  }
}

export default withAuthenticator(App, true);
