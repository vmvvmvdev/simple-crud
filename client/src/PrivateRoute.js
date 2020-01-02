import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import AuthService from './sevices/AuthService';

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
		AuthService.isAuthenticated ? (
			<Component {...props}/>
		) : (
			<Redirect to={{
				pathname: '/login',
				state: { from: props.location }
			}}/>
		)
	)}/>
)

export default PrivateRoute;