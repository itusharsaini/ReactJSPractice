import React, { Component } from 'react';
import { firebaseApp } from '../firebase';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {

  signOut() {
    firebaseApp.auth().signOut();
  }
  render() {
    return (
      <div className="container">
        <div className="header">
          <h4>
            <button className="btn btn-danger"
              onClick={() => this.signOut()}
            > Logout
           </button>
          </h4>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('state', state);
  return {}
}

export default connect(mapStateToProps, null)(App);
