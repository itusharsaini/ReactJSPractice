import React, { Component } from 'react';
import { goalRef, completeGoalRef } from '../firebase';
import { setGoals } from '../actions';
import { connect } from 'react-redux';


import tick from '../assets/tick.png';
import '../Styles/GoalList.css';

let emailList = new Map();
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
        console.log('eventClick', event.rowIndex);
        const { email,title, serverKey } = emailList.get(event.target.rowIndex);
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
                        <tr>
                            <th>Sr.No.</th>
                            <th>Title</th>
                            <th>Submitted by</th>
                            <th>Mark Complete</th>
                        </tr>

                        {this.props.goals.map((goal, index) => {
                            emailList.set(index, [ goal.email, goal.title, goal.serverKey ]);
                            console.log('map', emailList);
                            return (
                                //!<div key={index}> {goal.title}</div>
                                <tr>
                                    <td>{index}</td>
                                    <td>{goal.title}</td>
                                    <td><em>{goal.email}</em></td>
                                    <td className="btn-row">
                                        <button
                                            className="comp-btn"
                                            onClick={this.completeGoal}
                                        >
                                            <img className="tick-logo" src={tick} height="20" alt="Complete" />
                                        </button>
                                    </td>
                                </tr>
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