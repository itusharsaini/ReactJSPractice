import React, { Component } from 'react';
import { firebaseApp } from '../firebase';
import './App.css';
import { connect } from 'react-redux';

import AddGoal from './AddGoal';
import GoalList from './GoalList';
import CompletedGoalList from './CompletedGoalList'


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
            <button
          className="logout-btn"
          onClick={() => signOut()}>
          Logout
            </button>
      </h2>
      <AddGoal />
      <hr />
      <h4>Goals</h4>
      <GoalList />
      <hr />
      <h4>Completed Goals</h4>
      <CompletedGoalList />
      <hr />
    </div>
  </div>
);

class App extends Component {
  render() {
    return navbar
  }
}


export default connect(mapStateToProps, null)(App);
