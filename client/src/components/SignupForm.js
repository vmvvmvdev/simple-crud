import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import AuthService from '../sevices/AuthService';

import './Form.css'

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password1: '',
            password2: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log(event);
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit() {

        const {email, password1, password2} = this.state;

        if ( password1!==password2 ) {
            return alert('passwords confirm fail');
        }

        const userParams = {
            email,
            password:password1
        };

        if (Object.values(userParams).some(value=>value==='')) {
            return alert('all fields must be filled');
        }
        
        const signUpRes = await fetch('/api/auth/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userParams)
        });

        console.log(signUpRes);
        if(signUpRes.status === 409) {
            return alert('email already exists');
        }

        const resJson = await signUpRes.json();

        if(resJson) {
            AuthService.isAuthenticated = true;
            this.props.history.push('/prefference');
        }
        
    }

    render() {
        return (
            <div className="container">
                <h1>Sign Up</h1>
                <p>Please fill in this htmlForm to create an account.</p>
                <hr/>

                <label htmlFor="email">
                    <b>Email</b>
                </label>
                <input
                    value={this.state.email}
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Enter Email"
                    name="email"
                    required/>

                <label htmlFor="password1">
                    <b>Password</b>
                </label>
                <input
                    value={this.state.password1}
                    onChange={this.handleChange}
                    type="password"
                    placeholder="Enter Password"
                    name="password1"
                    required/>

                <label htmlFor="password2">
                    <b>Repeat Password</b>
                </label>
                <input
                    value={this.state.password2}
                    onChange={this.handleChange}
                    type="password"
                    placeholder="Repeat Password"
                    name="password2"
                    required/>

                <button onClick={this.handleSubmit} type="submit" className="btn">Sign Up</button>
            </div>
        );
    }
}

export default withRouter(SignUpForm);