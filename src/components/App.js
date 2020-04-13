import React, { Component } from 'react';
import { firebaseApp } from '../firebase';
import '../Styles/App.css';
import { connect } from 'react-redux';

import avatar from '../assets/avatar.png';

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
        <img src={avatar} height="80" alt="avatar" />
        <button
          className="btn btn-sm btn-dark logout-btn"
          onClick={() => signOut()}>
          Logout
            </button>
      </h2>
      <hr />

      <fieldset>

        <legend>Goal Summary</legend>

        <AddGoal />

        <GoalList />

        <div>Completed Goals</div>
        <CompletedGoalList />

      </fieldset>

    </div>
  </div>
);

class App extends Component {
  render() {
    return navbar
  }
}


export default connect(mapStateToProps, null)(App);
