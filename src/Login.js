import React, { Component } from 'react';
import avatar from './avatar.png';
import logo from './logo.svg';
import './Login.css';

const validEmailRegex =
    RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false)
    );
    return valid;
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: null, password: null, errors: { email: '', password: '' } };
    }

    handleChange(event) {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'email':
                errors.email = validEmailRegex.test(value) ? '' : 'Enter a valid email !';
                break;
            case 'password':
                errors.password = value.length < 8 ? 'Password must be 8 characters long !' : '';
                break;
        }

        this.setState({ errors, [name]: value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm(this.state.errors)) {
            console.info('Valid Form')
        } else {
            console.error('Invalid Form')
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="Login col-s-12">
                <form className="form" onSubmit={() => this.handleSubmit()}>
                    <div className="innerFormDiv col-s-4">

                        <div className="imgTag">
                            <img src={logo} height="40" width="70"></img>
                        </div>

                        <div className="inputDiv">
                            <div class="col-s-12 emailDiv">Email</div>
                            <input name="email" class="col-s-12" placeholder="johndoe12@domain.com" type="email" onChange={this.handleChange} noValidate></input>
                            {errors.email.length > 0 &&
                                <span className='error'>{errors.email}</span>}

                            <div class="col-s-12 passDiv" >Password</div>
                            <input name="password" class="col-s-12" placeholder="Password" type="password" onChange={this.handleChange} minLength="8" maxLength="32" noValidate></input>
                            {errors.password.length > 0 &&
                                <span className='error'>{errors.password}</span>}
                        </div>

                        <div>
                            <button class="col-s-12 container-two" type="Submit">Login
                                <div className="fill-two"></div>
                            </button>
                            <button class="col-s-12 container-two" type="button">Register
                                <div className="fill-two"></div>
                            </button>
                        </div>
                    </div>
                </form>
            </div >

        );
    }
}
export default Login;