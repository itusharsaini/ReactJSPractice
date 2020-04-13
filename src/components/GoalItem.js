import React, { Component } from 'react';
import { connect } from 'react-redux';
import { completeGoalRef, goalRef } from '../firebase';

import '../Styles/GoalItem.css';

class GoalItem extends Component {

    completeGoal() {
        const { email } = this.props.user;
        const { title, serverKey } = this.props.goals;
        //console.log('email', email, 'title', title, 'serverKey',serverKey);
        goalRef.child(serverKey).remove();
        completeGoalRef.push({ email, title });
    }


    render() {
        const { email, title } = this.props.goals;
        return (
            <div>
                <code> {title} </code>
                <em> {email} </em>
                <button
                    className="comp-btn"
                    onClick={() => this.completeGoal()}
                >
                    Complete
                            </button>

            </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return {
        user
    };
}
export default connect(mapStateToProps, null)(GoalItem);