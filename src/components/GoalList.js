import React, { Component } from 'react';
import { goalRef } from '../firebase';
import { setGoals } from '../actions';
import { connect } from 'react-redux';
import GoalItem from './GoalItem';

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

    render() {
        console.log('this.props.goals', this.props.goals);
        return (
            <div>
                {this.props.goals.map((goal, index) => {
                    return (
                        //!<div key={index}> {goal.title}</div>
                        <GoalItem key={index} goals={goal}/>
                    )

                })
                }
            </div >
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