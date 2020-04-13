import React, { Component } from 'react';
import { connect } from 'react-redux';
import { completeGoalRef, goalRef } from '../firebase';

class GoalItem extends Component {

    completeGoal() {
        const { email } = this.props.user;
        const { title, serverKey } = this.props.goals;
        //console.log('email', email, 'title', title, 'serverKey',serverKey);
        goalRef.child(serverKey).remove();
        completeGoalRef.push({email,title});
    }


    render() {
        const { email, title } = this.props.goals;
        return (
            <div>
                <span> Title: <code>{title}</code></span>
                <span> Submitted by: <code>{email}</code></span>
                <button
                    className="btn btn-sm btn-primary"
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