import React, { Component } from 'react';
import { goalRef, completeGoalRef } from '../firebase';
import { setGoals } from '../actions';
import { connect } from 'react-redux';

import tick from '../assets/tick.png';
import '../Styles/GoalList.css';

let testList = [];
class GoalList extends Component {

    componentDidMount() {
        goalRef.on('value', snap => {
            let goals = [];
            snap.forEach(goal => {
                //let goalObject = goal.val();
                const { email, title } = goal.val();
                const serverKey = goal.key;
                //console.log('goalObject', goalObject);
                //goals.push(goalObject);
                goals.push({ email, title, serverKey });
                //console.log('goal',goal);
            })
            console.log('goals', goals);
            this.props.setGoals(goals);
        })

    }

    completeGoal = (event) => {
        const rowIndex = event.target.parentNode.parentNode.rowIndex;
        //console.log('testtList', testList[rowIndex-1]);
        const { email, title, serverKey } = testList[rowIndex - 1];
        //console.log('email', email, 'title', title, 'serverKey',serverKey);
        goalRef.child(serverKey).remove();
        completeGoalRef.push({ email, title });
    }

    render() {
        console.log('this.props.goals', this.props.goals);
        return (
            <div>
                <fieldset>
                    <legend>Goals(pending/new)</legend>
                    <table>
                        <thead>
                            <tr>
                                <th>Sr.No.</th>
                                <th>Title</th>
                                <th>Submitted by</th>
                                <th>Mark Complete</th>
                            </tr>
                        </thead>
                        {this.props.goals.map((goal, index) => {
                            testList.push({ email: goal.email, title: goal.title, serverKey: goal.serverKey });
                            return (
                                //!<div key={index}> {goal.title}</div>
                                <tbody key={index}>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{goal.title}</td>
                                        <td><em>{goal.email}</em></td>
                                        <td className="btn-row">
                                            <button
                                                className="comp-btn"
                                                onClick={this.completeGoal}
                                            >   
                                                <i className="fa fa-check-circle"></i>
                                                Complete
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })
                        }
                    </table>
                </fieldset>
            </div>
        )
    }
}

function mapToStateToProps(state) {
    const { goals } = state;
    return {
        goals
    }
}
export default connect(mapToStateToProps, { setGoals })(GoalList);