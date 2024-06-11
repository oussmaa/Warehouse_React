// src/components/ProtectedRoute.js

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
 

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route 
        {...rest}
        render={props => 
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to="/" />
            )
        }
    />
);
export const isAuthenticated = () => {
    // Replace 'token' with the key you use for storing your token
    alert("ousssama")
    const token = localStorage.getItem('token');
    return token !== null;
};
export default ProtectedRoute;
