import React, { Component } from 'react';
import { firebaseApp } from '../firebase';
import './App.css';
import { connect } from 'react-redux';
import { Navbar } from 'react-bootstrap';


function signOut() {
  firebaseApp.auth().signOut();
}

function mapStateToProps(state) {
  console.log('state', state);
  return {}
}

const navbar = (
  <div className="container" >
    <div className="header">
      <h2 className="wlc-header">
        Logo
        <a href="#">Contact</a>
          <a href="#">About</a>
            <button className="logout-btn"
              onClick={() => signOut()}> Logout
            </button>
      </h2>
    </div>
  </div>
);

class App extends Component {
  render() {
    return navbar
  }
}


export default connect(mapStateToProps, null)(App);
