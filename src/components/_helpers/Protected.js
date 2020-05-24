import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from "../../App";

const Protected = ({ component: Component, ...rest }) => {
    const { state } = useContext(AuthContext);
    return (
        <Route {...rest} render={props => {
            return (
                state.isLoggedIn
                    ? <Component {...props} />
                    : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )
        }} />
    )
};

export default Protected;

