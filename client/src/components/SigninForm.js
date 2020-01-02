import React, {Component} from 'react';

import {Link, withRouter} from 'react-router-dom';

import AuthService from '../sevices/AuthService';

import './Form.css'

class SigninForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isRedirect:false
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

     
        const {email, password} = this.state;

        try {
            const isSignInSucc = await AuthService.login(email, password);
            console.log(isSignInSucc);
            if (isSignInSucc) {
              this.props.history.push('/prefference');
            } else {
                alert('username or password is incorrect ')
            }
        } catch (error) {
            console.log(error);
        }

    }

    render() {

  
        return (
            <div className="container">
                <h1>Sign In</h1>
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

                <label htmlFor="password">
                    <b>Password</b>
                </label>
                <input
                    value={this.state.password}
                    onChange={this.handleChange}
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    required/>
                <div>
                    <button onClick={this.handleSubmit} type="submit" className="btn">Sign In</button>
                </div>

                <p>
                    <Link to="/register">
                        Don't Have an Account? Sign Up</Link>
                </p>
            </div>
        );
    }
}

export default withRouter(SigninForm);