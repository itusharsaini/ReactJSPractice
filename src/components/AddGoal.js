import React, { Component } from 'react';
import { goalRef } from '../firebase';
import { connect } from 'react-redux';

import '../Styles/AddGoal.css';

class AddGoal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
    }

    addGoal() {
        console.log('this', this);
        const { title } = this.state;
        const { email } = this.props.user;
        goalRef.push({ email, title });
    }


    render() {
        return (
            <div className="goal-main-div col-12 col-s-12 col-xs-12">
                <fieldset>
                <legend>Add new goal</legend>
                    <input
                        type="text"
                        placeholder="Add a goal"
                        className="col-12 col-s-12 col-xs-12 inp-field"
                        onChange={event => this.setState({ title: event.target.value })}
                    />
                    <button className="col-2 col-xs-2 col-s-12 submit-btn"
                        type="button"
                        onClick={() => this.addGoal()}
                    >
                        Submit
           </button>
                </fieldset>

            </div>
        )
    }
}
function mapStateToProps(state) {
    const { user } = state;
    return { user }
}
export default connect(mapStateToProps, null)(AddGoal);