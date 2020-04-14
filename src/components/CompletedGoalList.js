import React, { Component } from 'react';
import { completeGoalRef } from '../firebase';
import { connect } from 'react-redux';
import { setCompleteGoal } from '../actions';

import '../Styles/CompletedGoalList.css';

class CompletedGoalList extends Component {
    componentDidMount() {
        completeGoalRef.on('value', snap => {
            let completeGoals = [];
            snap.forEach(completeGoal => {
                const { email, title } = completeGoal.val();
                completeGoals.push({ email, title });
            })
            this.props.setCompleteGoal(completeGoals);
        })
    }

    clearCompleted() {
        completeGoalRef.set([]);
    }

    render() {
        return (
            <div className="comp-goal-container">
                <fieldset>
                    <legend> Completed Goals</legend>
                    <table>
                        <thead>
                            <tr>
                                <th>Sr.No.</th>
                                <th>Title</th>
                                <th>Submitted by</th>
                            </tr>
                        </thead>
                        {this.props.completeGoals.map((completedGoal, index) => {
                           //const { email, title } = this.props.completeGoals;
                            return (
                                <tbody key={index}>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{completedGoal.title}</td>
                                        <td><em>{completedGoal.email}</em></td>
                                    </tr>
                                </tbody>
                            )
                        })
                        }
                    </table>
                    <button
                        className="clr-btn"
                        onClick={() => this.clearCompleted()}
                    >
                        Clear All
                    </button>
                </fieldset>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { completeGoals } = state;
    return {
        completeGoals
    }
}

export default connect(mapStateToProps, { setCompleteGoal })(CompletedGoalList);