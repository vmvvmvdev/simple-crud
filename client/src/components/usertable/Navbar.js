import React, {Component} from 'react';
import AuthService from '../../sevices/AuthService';
import {Link, withRouter} from 'react-router-dom';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.logout = this.logout.bind(this);
    }
    logout() {
        AuthService
            .logout()
            .then(isSuc => { if (isSuc) { this.props.history.push('/login'); } })
    }
    render() {
        return (
            <nav>
                <ul>
                    <li>
                        <Link onClick={this.logout} to="/">Logout</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default withRouter(Navbar);