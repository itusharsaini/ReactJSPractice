/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { firebaseApp } from '../firebase';
import logo from './logo.svg';
import './Register.css';

//!RegExp for email validation
const validEmailRegex = RegExp(/([a-z]+(?:[\.\w-]+)*@[a-z](?:[\w-]+\.){1,2}[a-z]{2,4})/gi);
const validPassRegex = RegExp(/^(?=.*\d)(?=.*\W)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm);

class Register extends Component {
    //!setting states for validations
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            email: null,
            password: null,
            //!For custom error span
            errors: {
                email: '',
                password: '',
                confirmPass: '',
            },
            error:{
                message: ''
            }
        };
    }

    //!Verify email password
    validation(){
        //console.log('validation state', this.state);
        const { email, password, confirmPass } = this.state;
        //const testEmail = validEmailRegex.test(this.state.email);
        //console.log('testEmail ',testEmail);
        //const testPassword = validPassRegex.test(this.state.password);
        //console.log('testPassword ',testPassword);
        /*if(testEmail && testPassword){
            if(password === confirmPass){
                this.signUp(email,confirmPass);
            }else{
                this.setState({errors:{confirmPass: 'Password doesn\'t match...'}});
            }
        }else if(!testEmail){
            this.setState({errors:{email: 'The email address is badly formatted.'}});
        }else  if(!testPassword){
            this.setState({errors:{password: 'The password is badly formatted.'}});
           
        }else{
            console.error('none');
        }*/        
        if(password === confirmPass){
            this.setState({errors:{password: ''}});
            this.setState({errors:{confirmPass: ''}});
            if(validPassRegex.test(confirmPass)){
                console.log('SUCCESSFULLY REGISTERED');
                this.signUp(email,confirmPass);
            }else{
                console.log('FAILED TO REGISTER');
                this.setState({errors:{password: 'Please choose a stronger password.'}});
            }
        }else{
            this.setState({errors:{confirmPass: 'Password doesn\'t match...'}});
        }

    }

    //!Signup to firebase
    signUp(email, confirmPass){
        console.log('this state', this.state);
       // const { email, password } = this.state;
        firebaseApp.auth().createUserWithEmailAndPassword(email, confirmPass)
        .catch(error => {
            console.error('ERROR ',error);
            this.setState({error});
            console.log('this error mssg state', this.state.error);
        });
    }

    render() {
        return (
            <div className="Register col-12 col-s-12 col-xs-12">
                <form className="form col-5 col-s-5 col-xs-5" method='POST'>
                    <div className="imgTag">
                        <img src={logo} height="40" width="70" alt="Logo"></img>
                    </div>
                    <div className="inputDiv col-12 col-s-12 col-xs-12">
                        <div className="fullNameDiv">Full Name</div>
                        <input name="fullName" className="col-12 col-s-12 col-xs-12" placeholder="John Doe" type="text" onChange={event => this.setState({fullName : event.target.value})} noValidate required></input>

                        <div className="emailDiv">Email</div>
                        <input name="email" className="col-12 col-s-12 col-xs-12" placeholder="johndoe12@domain.com" type="email" onChange={event => this.setState({email : event.target.value})} noValidate required></input>
                        <div className='error  col-5 col-s-5 col-xs-5'>
                            {this.state.error.message === "The email address is badly formatted." &&
                                <span>{this.state.error.message}</span>}
                            {this.state.errors.email && 
                                <span>{this.state.errors.email}</span>}
                        </div>

                        <div className="passDiv">Choose Password</div>
                        <input name="password" className="col-12 col-s-12 col-xs-12 " placeholder="Must atleast 6 characters long..." type="password" onChange={event => this.setState({password : event.target.value})} minLength="8" maxLength="32" noValidate required></input>
                        <div className='error  col-5 col-s-5 col-xs-5'>
                            {this.state.error.message === "Password should be at least 6 characters" &&
                                <span>{this.state.error.message}</span>}
                            {this.state.errors.password &&
                            <span>{this.state.errors.password}</span>}
                        </div>

                        <div className="passDiv" >Confirm Password</div>
                        <input name="confirmPass" className="col-12 col-s-12 col-xs-12 " placeholder="Confirm Password" type="password" onChange={event => this.setState({confirmPass: event.target.value})} minLength="8" noValidate required></input>
                        <div className='error  col-5 col-s-5 col-xs-5'>
                            {this.state.errors.confirmPass &&
                                <span>{this.state.errors.confirmPass}</span>}
                        </div>
                        <div className="error  col-5 col-s-5 col-xs-5">
                            {this.state.error.message === "The email address is already in use by another account." && 
                            <span>{this.state.error.message}</span>}
                        </div>
                    </div>
                    
                    <hr></hr>
                    <div className=" button-div col-12 col-s-12 col-xs-12">
                        <span className="btn-span">
                            <button type="button" onClick={() => this.validation()}>Register
                            </button>
                        </span>

                        <span className="btn-span">
                            <button  onClick={() => { window.location = '/' }} type="button">Login
                                
                            </button>
                        </span>
                    </div>
                </form>
            </div>
        )
    }
}
export default Register;