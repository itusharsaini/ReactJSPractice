import React, { Component } from 'react';
import { completeGoalRef } from '../firebase';
import { connect } from 'react-redux';
import { setCompleteGoal } from '../actions';

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

    clearCompleted(){
        completeGoalRef.set([]);
    }


    render() {

        return (
            <div>
                {this.props.completeGoals.map((completedGoal, index) => {
                    const { email, title } = this.props.completeGoals;
                    return (
                        <div key={index}>
                            <span> Title: <code>{completedGoal.title}</code></span>
                            <span> Submitted by: <code>{completedGoal.email}</code></span>

                        </div>
                    )

                })
                }
                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => this.clearCompleted()}
                >
                    Clear All
                </button>
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