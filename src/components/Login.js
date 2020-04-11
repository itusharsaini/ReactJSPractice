/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import logo from './logo.png';
import { firebaseApp } from '../firebase';
import './Login.css';
import { browserHistory } from 'react-router';


//!RegExp for email validation
const validEmailRegex = RegExp(/(^([^\d\sA-Z]))([^\s])([a-z]+(?:[\.\w\d-]+)?@[a-z](?:[\w-]+\.){1,2}[a-z]{2,4})/g);

//!Validation function returs boolean
/*function validateForm(errors) {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}*/

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', error: { message: '' } };
    }

    /*handleChange = (event) => {
        console.log('called',this.state.errors.email);
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'email':
                errors.email = validEmailRegex.test(value) && value === "tushar@gmail.com" ? '' : 'Invalid Email !' ;
                break;
            case 'password':
                errors.password = value === "Tushar123@" ? '' : 'Invalid Password !';
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value });
    }*/

    //!SignIn to firebase
    signIn() {
        console.log('this state', this.state);
        const { email, password } = this.state;
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .catch(error => {
                console.error('ERROR ', error);
                this.setState({ error });
                console.log('this error mssg state', this.state.error);
            });
    }

    /*handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm(this.state.errors)) {
            //alert('Valid');
            //this.setState({ isValid: true });
            console.info('Valid Form');
            window.location = '/app';
        } else {
            //alert('Invalid');
            console.error('Invalid Form');
        }
    }*/

    render() {
        //const { errors } = this.state;
        return (
            <div className="Login  col-12 col-s-12 col-xs-12">
                <form className="form col-2 col-s-5 col-xs-5">
                    <div className="imgTag">
                        <img src={logo} height="30" alt="Logo"></img>
                    </div>

                    <div className="inputDiv col-12 col-s-12 col-xs-12 ">
                        <div className="emailDiv">Email</div>
                        <input name="email" className="email col-12 col-s-12 col-xs-12" placeholder="johndoe12@domain.com" type="email" onChange={event => this.setState({ email: event.target.value })} noValidate required></input>

                        <div className="passDiv" >Password</div>
                        <input name="password" className="password col-12 col-s-12 col-xs-12" placeholder="Password" type="password" onChange={event => this.setState({ password: event.target.value })} minLength="8" maxLength="32" noValidate required></input>
                        <div className='error  col-6 col-s-6 col-xs-5'>
                            {this.state.error.message &&
                                <p>{this.state.error.message}</p>}
                        </div>

                    </div>
                    <hr></hr>
                    <div className="button-div col-12 col-s-12 col-xs-12">
                        <span className="btn-span col-xs-12">
                            <button className="col-xs-12" type="button" onClick={() => this.signIn()}>Login
                            </button>
                        </span>
                        <span className="btn-span col-xs-12">
                            <button className="col-xs-12" onClick={() => {browserHistory.push('/register') }} type="button">Register
                            </button>
                        </span>

                    </div>
                </form>
            </div>

        );
    }
}
export default Login;