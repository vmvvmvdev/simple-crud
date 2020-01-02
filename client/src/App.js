import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";

import PrivateRoute from './PrivateRoute';

import './App.css';

import SignUpForm from './components/SignupForm';
import SigninForm from './components/SigninForm';
import UserTable from './components/usertable/Table';

import AuthService from './sevices/AuthService';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoginIn: false,
            checkLogin: true
        }

    }

    componentDidMount() {
        AuthService
            .checkLogin()
            .then(res => {
                this.setState({isLoginIn: res, checkLogin: false});
            })
    }

    render() {

        const homeRedirect = this.state.isLoginIn
            ? <Redirect to='/prefference'/>
            : <Redirect to='/login'/>;

        if (!this.state.checkLogin) {
            return (
                <Router>
                    <div>

                        <Switch>
                            <Route path="/register">
                                <SignUpForm/>
                            </Route>
                            <Route path="/login">
                                <SigninForm/>
                            </Route>
                            <PrivateRoute path="/prefference" component={UserTable}/>
                            <Route path="/">
                                {homeRedirect}
                            </Route>
                        </Switch>
                    </div>
                </Router>
            );
        } else {
            return (
                <div>Loading...</div>
            );
        }
    }
}



export default App;
